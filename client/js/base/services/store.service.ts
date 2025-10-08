import { Socket } from "socket.io-client";
import { errorHandler } from "../errors/errors.js";
import { validatorHelper } from "../helpers/helpers.js";
import { store } from "../classes/classes.js";
import * as constants from "../constants/constants.js";
import { ICallDetails } from "../interfaces/interfaces.js";

export class storeService {
  public static setSocket(socket: Socket | null, store: store) {
    try {
      validatorHelper.checkStore(store);
      store.socket = socket;
    } catch (error: unknown) {
      const method = this.setSocket.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static getSocket(store: store): Socket | null {
    try {
      validatorHelper.checkStore(store);
    } catch (error: unknown) {
      const method = this.getSocket.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
    return store.socket;
  }

  public static getCurrentCallDetails(
    store: store
  ): ICallDetails.callDetails | null {
    try {
      validatorHelper.checkStore(store);
    } catch (error: unknown) {
      const method = this.getCurrentCallDetails.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
    return store.currentCallDetails;
  }

  public static setCallInProgress(
    store: store,
    cDetails: ICallDetails.callDetails
  ) {
    try {
      validatorHelper.checkStore(store);
      const progress = constants.callState.IN_PROGRESS;
      store.currentCallDetails = cDetails;
      store.callState = progress;
    } catch (error: unknown) {
      const method = this.setCallInProgress.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static setCallInRtcProgress(
    store: store,
    cDetails: ICallDetails.callDetails
  ) {
    try {
      validatorHelper.checkStore(store);
      validatorHelper.checkCall(store, cDetails);
      const rtcProgress = constants.callState.WEBRTC_PROGRESS;
      store.callState = rtcProgress;
    } catch (error: unknown) {
      const method = this.setCallInRtcProgress.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static setCallConnected(
    store: store,
    cDetails: ICallDetails.callDetails
  ) {
    try {
      validatorHelper.checkStore(store);
      validatorHelper.checkCall(store, cDetails);
      const callConnected = constants.callState.CONNECTED;
      store.callState = callConnected;
    } catch (error: unknown) {
      const method = this.setCallConnected.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static resetCall(store: store) {
    try {
      validatorHelper.checkStore(store);
      store.resetCurrentCallDetails();
      store.callState = constants.callState.IDLE;

      if (store.peerConnection !== null) {
        store.peerConnection.close();
        store.peerConnection = null;
      }
      if (store.dataChannel !== null) {
        store.dataChannel.close();
        store.dataChannel = null;
      }
      store.streams = null;
    } catch (error: unknown) {
      const method = this.resetCall.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static setPeerConnection(
    store: store,
    peerConn: RTCPeerConnection | null
  ) {
    try {
      validatorHelper.checkStore(store);
      store.peerConnection = peerConn;
    } catch (error: unknown) {
      const method = this.setPeerConnection.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static getPeerConnection(store: store): RTCPeerConnection | null {
    try {
      validatorHelper.checkStore(store);
    } catch (error: unknown) {
      const method = this.getPeerConnection.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
    return store.peerConnection;
  }
}
