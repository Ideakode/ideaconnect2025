/**
 * @file validator.helper.ts
 * @class validatorHelper
 *
 * @description
 * Provides type-guard checks and business-rule validations for all runtime objects used
 * across the application. Each public `check*` method throws a validatorErrorClass (via
 * errorHandler.throwError) if the check fails — it does not return a value.
 * Private `is*` methods perform the actual structural type guard and are used internally.
 *
 * @staticMethods — public checks (throw on failure)
 * - checkSocket(data)                               - Socket instance check
 * - checkRtcDataChannel(data)                       - RTCDataChannel instance check
 * - checkStore(data)                                - store shape check (all required properties)
 * - checkRTCPeerConnection(data)                    - RTCPeerConnection shape check
 * - checkRTCIceCandidate(data)                      - RTCIceCandidate shape check
 * - checkHTMLElement(el, elName?)                   - non-null HTMLElement instanceof check
 * - checkPeerType(peerType)                         - must be AGENT or STRANGER
 * - checkNamespace(nspc)                            - must be /agent or /stranger
 * - checkPeerUrlNamespace(nspc, peer)               - namespace and peerType must match
 * - checkCommonParamsInterface(data)                - ICommonParams.isCommonParams check
 * - checkCallDetailsInterface(data)                 - ICallDetails.isCallDetails check
 * - canPeerParticipateInCall(store)                 - composite check: store valid, socket valid,
 *                                                     callState is IDLE, currentCallDetails is null
 * - checkCallInSignalingState(store)                - throws if callState is CONNECTED
 * - checkCall(store, cDetails)                      - stored callId must match incoming callId
 *
 * @staticMethods — private type guards (return boolean, used internally)
 * - isSocket / isStore / isRTCPeerConnection / isDataChannel / isRtcIceCandidate
 *
 * @see errorBuilder    - constructs the specific error for each check failure
 * @see errorHandler    - throws the constructed error
 * @see parserHelper    - calls these checks before casting unknown values
 */
import { Socket } from "socket.io-client";
import { errorBuilder, errorTypes, errorHandler } from "../errors/errors.js";
import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import { store } from "../classes/classes.js";
import * as constants from "../constants/constants.js";

export class validatorHelper {
  protected static readonly errType = errorTypes.VALIDATOR;

  public static checkSocket(data: unknown) {
    if (!this.isSocket(data)) {
      const method = this.checkSocket.name;
      const err = errorBuilder.socketNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }
  public static checkRtcDataChannel(data: unknown) {
    if (!this.isDataChannel(data)) {
      const method = this.checkRtcDataChannel.name;
      const err = errorBuilder.dataChannelNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkPeerType(peerType: string) {
    const peerA = constants.peerTypes.AGENT;
    const peerS = constants.peerTypes.STRANGER;
    if (peerType !== peerA && peerType !== peerS) {
      const method = this.checkPeerType.name;
      const err = errorBuilder.peerTypeNotValid(this.errType, method, peerType);
      errorHandler.throwError(this.name, err);
    }
  }

  public static canPeerParticipateInCall(store: store) {
    const method = this.canPeerParticipateInCall.name;

    try {
      const idle = constants.callState.IDLE;
      //check if stranger is valid (has related socket and store)
      this.checkStore(store);
      this.checkSocket(store.socket);
      //check if any other call already connected or in progress

      const state = store.callState;
      if (state !== idle) {
        const err = errorBuilder.peerNotIdle(this.errType, method, state);
        errorHandler.throwError(this.name, err, false);
      }

      const cDetails = store.currentCallDetails;
      if (cDetails != null) {
        const err = errorBuilder.callDetailsNotNull(
          this.errType,
          method,
          cDetails
        );
        errorHandler.throwError(this.name, err, false);
      }
    } catch (error: unknown) {
      errorHandler.propagateErrorValidator(this.name, error, method);
    }
  }

  public static checkCallInSignalingState(store: store) {
    this.checkStore(store);
    const method = this.checkCallInSignalingState.name;
    if (store.callState === constants.callState.CONNECTED) {
      const err = errorBuilder.callIsActiveState(this.errType, method);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkCall(store: store, cDetails: ICallDetails.callDetails) {
    this.checkStore(store);
    const storedcDetails = store.currentCallDetails;
    const method = this.checkCall.name;

    if (storedcDetails === null) {
      const err = errorBuilder.callDetailsNull(this.errType, method);
      errorHandler.throwError(this.name, err);
    } else {
      const callid1 = storedcDetails.callId;
      const callid2 = cDetails.callId;
      if (callid1 !== callid2) {
        const callids = [callid1, callid2];
        const err = errorBuilder.callDetailsDiffer(
          this.errType,
          method,
          callids
        );
        errorHandler.throwError(this.name, err);
      }
    }
  }

  public static checkStore(data: unknown) {
    if (!this.isStore(data)) {
      const method = this.checkStore.name;
      const err = errorBuilder.storeNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkRTCPeerConnection(data: unknown) {
    if (!this.isRTCPeerConnection(data)) {
      const method = this.checkRTCPeerConnection.name;

      const err = errorBuilder.rtcNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkCommonParamsInterface(data: unknown) {
    if (!ICommonParams.isCommonParams(data)) {
      const method = this.checkCommonParamsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkCallDetailsInterface(data: unknown) {
    if (!ICallDetails.isCallDetails(data)) {
      const method = this.checkCallDetailsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkHTMLElement(el: unknown, elName: string = "") {
    if (el === null || el === undefined || !(el instanceof HTMLElement)) {
      const method = this.checkHTMLElement.name;
      const err = errorBuilder.htmlElNotValid(this.errType, method, elName);
      errorHandler.throwError(this.name, err);
    }
  }
  public static checkNamespace(nspc: string) {
    const nspcS = constants.socketIO.namespaces.STRANGER;
    const nspcA = constants.socketIO.namespaces.AGENT;
    if (nspc !== nspcA && nspc !== nspcS) {
      const method = this.checkNamespace.name;
      const err = errorBuilder.nspcNotValid(this.errType, method, nspc);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkPeerUrlNamespace(nspc: string, peer: string) {
    try {
      let valid = false;
      this.checkNamespace(nspc);
      this.checkPeerType(peer);
      const nspcA = constants.socketIO.namespaces.AGENT;
      const nspcS = constants.socketIO.namespaces.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      switch (nspc) {
        case nspcA:
          valid = peer === peerA;
          break;
        case nspcS:
          valid = peer === peerS;
      }
      if (!valid) {
        const method = this.checkPeerUrlNamespace.name;
        const err = errorBuilder.nspcPeerDiffer(
          this.errType,
          method,
          nspc,
          peer
        );
        errorHandler.throwError(this.name, err, false);
      }
    } catch (error: unknown) {
      const method = this.checkPeerUrlNamespace.name;
      errorHandler.propagateErrorValidator(this.name, error, method);
    }
  }

  public static checkRTCIceCandidate(data: unknown) {
    if (!this.isRtcIceCandidate(data)) {
      const method = this.checkRTCIceCandidate.name;
      const err = errorBuilder.rtcIceNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }
  private static isRtcIceCandidate(data: unknown): data is RTCIceCandidate {
    return (
      (data as RTCIceCandidate).candidate !== undefined &&
      (data as RTCIceCandidate).type !== undefined &&
      (data as RTCIceCandidate).address !== undefined &&
      (data as RTCIceCandidate).sdpMid !== undefined &&
      (data as RTCIceCandidate).component !== undefined &&
      (data as RTCIceCandidate).foundation !== undefined &&
      (data as RTCIceCandidate).port !== undefined &&
      (data as RTCIceCandidate).usernameFragment !== undefined
    );
  }

  protected static isStore(data: unknown): data is store {
    return (
      (data as store).currentCallDetails !== undefined &&
      (data as store).callState !== undefined &&
      (data as store).streams !== undefined &&
      (data as store).socket !== undefined &&
      (data as store).callState !== undefined &&
      (data as store).peerConnection !== undefined &&
      (data as store).dataChannel !== undefined
    );
  }

  private static isSocket(data: unknown): data is Socket {
    return (
      (data as Socket).id !== undefined &&
      (data as Socket).active !== undefined &&
      (data as Socket).connected !== undefined &&
      (data as Socket).disconnected !== undefined &&
      (data as Socket).io !== undefined
    );
  }

  private static isRTCPeerConnection(data: unknown): data is RTCPeerConnection {
    return (
      (data as RTCPeerConnection).canTrickleIceCandidates !== undefined &&
      (data as RTCPeerConnection).connectionState !== undefined &&
      (data as RTCPeerConnection).currentLocalDescription !== undefined &&
      (data as RTCPeerConnection).currentRemoteDescription !== undefined &&
      (data as RTCPeerConnection).iceConnectionState !== undefined &&
      (data as RTCPeerConnection).iceGatheringState !== undefined &&
      (data as RTCPeerConnection).localDescription !== undefined &&
      (data as RTCPeerConnection).signalingState !== undefined
    );
  }
  private static isDataChannel(data: unknown): data is RTCDataChannel {
    return (
      (data as RTCDataChannel).id !== undefined &&
      (data as RTCDataChannel).binaryType !== undefined &&
      (data as RTCDataChannel).label !== undefined &&
      (data as RTCDataChannel).negotiated !== undefined &&
      (data as RTCDataChannel).ordered !== undefined &&
      (data as RTCDataChannel).protocol !== undefined &&
      (data as RTCDataChannel).readyState !== undefined &&
      (data as RTCDataChannel).send !== undefined &&
      (data as RTCDataChannel).close !== undefined
    );
  }
}
