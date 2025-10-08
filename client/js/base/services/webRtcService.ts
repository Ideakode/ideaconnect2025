import { errorHandler } from "../errors/errors.js";
import {
  validatorHelper,
  parserHelper,
  messageBuilder,
} from "../helpers/helpers.js";
import {
  ICommonParams,
  ICallDetails,
  IEventsMap,
} from "../interfaces/interfaces.js";

import * as constants from "../constants/constants.js";
import { store } from "../classes/classes.js";
import { logger } from "../logs/logs.js";
import { webRTCEventHandler } from "../eventHandlers/eventHandlers.js";
import { storeSvc, socketSvc } from "./services.js";

export class webRtcService {
  protected static readonly configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:13902",
      },
      {
        urls: "turn:relay1.expressturn.com:3478",
        username: "efXTZPXCVTjayFX8A5CNK",
        credential: "fo6wPmiinwcvztf6",
      },
    ],
  };

  protected static startServices(
    cParams: ICommonParams.commonParams,
    cDetailsToAttach: ICallDetails.callDetails,
    webRtcEM: IEventsMap.eventsMap
  ) {
    try {
      const parser = parserHelper;
      const validator = validatorHelper;
      const webRtcEvH = webRTCEventHandler;

      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStore(cParams.store);
      const pc = parser.parseRTCPeerConnection(store.peerConnection);
      webRtcEvH.registerEvents(cParams, cDetailsToAttach, webRtcEM);
      const chat = constants.callType.CHAT;
      if (cDetailsToAttach.callType === chat) {
        pc.createDataChannel(chat);
      }
    } catch (error: unknown) {
      const method = this.startServices.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static async startWebRtcOffer(incomingStore: store) {
    logger.log(this.name, "WebRTCHandler - startWebRtcOffer");

    try {
      const parser = parserHelper;
      const store = parser.parseStore(incomingStore);
      const socket = parser.parseSocket(storeSvc.getSocket(store));
      const cDetails = parser.parseCallDetailsInterface(
        storeSvc.getCurrentCallDetails(store)
      );
      const offer = await this.createSDPOffer(store);
      const msg = messageBuilder.buildWebRTCSignalingOffer(cDetails, offer);
      socketSvc.sendWebRTCSignaling(socket, msg);
    } catch (error: unknown) {
      const method = this.startWebRtcOffer.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static async startWebRtcAnswer(
    incomingStore: store,
    offer: RTCSessionDescriptionInit
  ) {
    logger.log(this.name, "WebRTCHandler - startWebRtcAnswer");

    try {
      const parser = parserHelper;
      const store = parser.parseStore(incomingStore);
      const socket = parser.parseSocket(storeSvc.getSocket(store));
      const cDetails = parser.parseCallDetailsInterface(
        storeSvc.getCurrentCallDetails(store)
      );
      const answer = await this.createSDPAnswer(store, offer);
      const msg = messageBuilder.buildWebRTCSignalingAnswer(cDetails, answer);
      socketSvc.sendWebRTCSignaling(socket, msg);
    } catch (error: unknown) {
      const method = this.startWebRtcAnswer.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  private static async createSDPOffer(
    storeData: store
  ): Promise<RTCSessionDescriptionInit> {
    try {
      const parser = parserHelper;
      const store = parser.parseStore(storeData);
      const pc = parser.parseRTCPeerConnection(
        storeSvc.getPeerConnection(store)
      );
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      return offer;
    } catch (error) {
      const method = this.createSDPOffer.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  private static async createSDPAnswer(
    storeData: store,
    remoteOffer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit> {
    try {
      const parser = parserHelper;
      const store = parser.parseStore(storeData);
      const pc = parser.parseRTCPeerConnection(
        storeSvc.getPeerConnection(store)
      );
      await pc.setRemoteDescription(remoteOffer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      return answer;
    } catch (error) {
      const method = this.createSDPAnswer.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static createPeerConnection() {
    return new RTCPeerConnection(this.configuration);
  }

  public static sendDataChannelMessage(
    cParams: ICommonParams.commonParams,
    message: string
  ) {
    try {
      const parser = parserHelper;
      const validator = validatorHelper;
      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStore(cParams.store);
      const dc = parser.parseRTCDataChannel(store.dataChannel);
      const stringifiedMessage = JSON.stringify(message);
      logger.log(this.name, "sending message" + stringifiedMessage);
      dc.send(stringifiedMessage);
    } catch (error: unknown) {
      const method = this.sendDataChannelMessage.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
