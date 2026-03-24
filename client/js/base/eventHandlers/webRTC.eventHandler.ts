/**
 * @file webRTC.eventHandler.ts
 * @class webRTCEventHandler
 *
 * @description
 * Registers all WebRTC event listeners on the peer's RTCPeerConnection after a call is accepted
 * and a peer connection has been created. Called by webRtcService.startServices().
 * The call details to be forwarded with each event callback are provided at registration time
 * so that they are captured in the closure (rather than read from the store later).
 *
 * @staticMethods
 * - registerEvents(cParams, data, evsMap)
 *     Entry point. Parses callDetails then delegates to the three sub-registration methods.
 * - registerICECandidates(cParams, attachedCDetails, evMap)    [private]
 *     Sets pc.onicecandidate → fires ICE_CANDIDATE callback with (cParams, cDetails, candidate).
 * - registerDatachannelEvents(cParams, attachedCDetails, evMap) [private]
 *     Sets pc.ondatachannel → registers:
 *       - dataChannel.onopen    → DATACHANNEL_OPEN callback (cParams, cDetails, dataChannel)
 *       - dataChannel.onmessage → DATACHANNEL_MESSAGE callback (cParams, cDetails, parsedMsg)
 *       - dataChannel.onclose   → logs only (callback commented out)
 * - registerPeerConnectionEvents(cParams, attachedCDetails, evMap) [private]
 *     Sets pc.onconnectionstatechange → logs when state === "connected".
 * - getCallBack(eventName, eventsmap)    [private]
 *     Looks up a callback by event name from the eventsMap; returns no-op if not found.
 *
 * @param cParams           - commonParams carrying the peer's store (with active peerConnection)
 * @param data              - callDetails to attach to all event callbacks via closure
 * @param evsMap            - eventsMap supplying callbacks for ICE_CANDIDATE, DATACHANNEL_OPEN,
 *                            DATACHANNEL_MESSAGE
 *
 * @see webRtcService.startServices  - calls this after creating the RTCPeerConnection
 * @see constants.webRTC.events      - event name constants
 */
import { errorHandler } from "../errors/errors.js";
import {
  ICommonParams,
  ICallDetails,
  IEventsMap,
} from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { parserHelper } from "../helpers/helpers.js";
import { logger } from "../logs/logs.js";
import { fnVoidAnyArguments, fnVoidNoArguments } from "../types/types.js";

export class webRTCEventHandler {
  public static registerEvents(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails, //callDetails to attach to the webRTC events
    evsMap: IEventsMap.eventsMap
  ) {
    try {
      const parser = parserHelper;
      const attachedCDetails = parser.parseCallDetailsInterface(data);
      this.registerICECandidates(cParams, attachedCDetails, evsMap);
      this.registerDatachannelEvents(cParams, attachedCDetails, evsMap);
      this.registerPeerConnectionEvents(cParams, attachedCDetails, evsMap);
    } catch (error: unknown) {
      const method = this.registerEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static registerICECandidates(
    cParams: ICommonParams.commonParams,
    attachedCDetails: ICallDetails.callDetails,
    evMap: IEventsMap.eventsMap
  ) {
    try {
      const parser = parserHelper;
      const store = parser.parseStore(cParams.store);
      const pc = parser.parseRTCPeerConnection(store.peerConnection);
      pc.onicecandidate = (event) => {
        const evIce = constants.webRTC.events.ICE_CANDIDATE;
        const callback = this.getCallBack(evIce, evMap);
        if (callback) {
          callback(cParams, attachedCDetails, event.candidate);
        }
      };
    } catch (error: unknown) {
      const method = this.registerEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static registerDatachannelEvents(
    cParams: ICommonParams.commonParams,
    attachedCDetails: ICallDetails.callDetails,
    evMap: IEventsMap.eventsMap
  ) {
    const parser = parserHelper;
    const store = parser.parseStore(cParams.store);
    const pc = parser.parseRTCPeerConnection(store.peerConnection);

    const open = constants.webRTC.events.DATACHANNEL_OPEN;
    /* const close = constants.webRTC.events.DATACHANNEL_CLOSE; */
    const msg = constants.webRTC.events.DATACHANNEL_MESSAGE;

    pc.ondatachannel = (ev: unknown) => {
      const dataChannel = (ev as RTCDataChannelEvent).channel;

      dataChannel.onopen = () => {
        logger.log(this.name, "Ready to receive dChannel msgs");
        const callback = this.getCallBack(open, evMap);
        if (callback) {
          callback(cParams, attachedCDetails, dataChannel);
        }
      };

      dataChannel.onmessage = (ev) => {
        logger.log(this.name, "Message Received");
        const callback = this.getCallBack(msg, evMap);
        if (callback) {
          const msg = JSON.parse((ev as MessageEvent).data);
          callback(cParams, attachedCDetails, msg);
        }
      };

      dataChannel.onclose = (ev) => {
        logger.log(this.name, "Datachannel Closed", [ev]);
        /* const callback = this.getCallBack(close, evMap);
        if (callback) {
          //const msg = JSON.parse((ev as MessageEvent).data);
          callback(cParams, attachedCDetails, ev);
        } */
      };
    };
  }

  private static registerPeerConnectionEvents(
    cParams: ICommonParams.commonParams,
    attachedCDetails: ICallDetails.callDetails,
    evMap: IEventsMap.eventsMap
  ) {
    const parser = parserHelper;
    const store = parser.parseStore(cParams.store);
    const pc = parser.parseRTCPeerConnection(store.peerConnection);

    pc.onconnectionstatechange = (event: unknown) => {
      if (pc.connectionState === "connected") {
        logger.log(this.name, "succesfully connected with other peer", [event]);
      }
    };
  }

  private static getCallBack(
    eventName: string,
    eventsmap: IEventsMap.eventsMap
  ): fnVoidAnyArguments {
    const callbackevent = eventsmap.events.find((eventmap) => {
      return eventmap.eventName === eventName;
    });
    if (callbackevent) {
      return callbackevent.eventCallback;
    }

    return this.getNotDefinedCallback();
  }

  private static getNotDefinedCallback(): fnVoidNoArguments {
    const callback = () => {
      logger.log(this.name, "CallBack not defined");
    };
    return callback;
  }
}
