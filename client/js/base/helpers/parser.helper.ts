import { Socket } from "socket.io-client";
import { store } from "../classes/classes.js";
import {
  ICommonParams,
  IPeer,
  IAllowConnections,
  ICallDetails,
  ICallSignaling,
  IPeers,
  IClientRequest,
  INotification,
  ITotal,
  IWebRtcSignaling,
} from "../interfaces/interfaces.js";
import { errorBuilder, errorTypes, errorHandler } from "../errors/errors.js";
import { validatorHelper } from "./validator.helper.js";

export class parserHelper {
  protected static readonly errType = errorTypes.PARSER;

  public static parseSocket(data: unknown): Socket {
    try {
      validatorHelper.checkSocket(data);
      return data as Socket;
    } catch (error: unknown) {
      const method = this.parseSocket.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }

  public static parseStore(store: unknown): store {
    try {
      validatorHelper.checkStore(store);
      return store as store;
    } catch (error: unknown) {
      const method = this.parseStore.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }

  public static parseRTCPeerConnection(data: unknown): RTCPeerConnection {
    try {
      validatorHelper.checkRTCPeerConnection(data);
      return data as RTCPeerConnection;
    } catch (error: unknown) {
      const method = this.parseRTCPeerConnection.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }

  public static parseRTCDataChannel(data: unknown): RTCDataChannel {
    try {
      validatorHelper.checkRtcDataChannel(data);
      return data as RTCDataChannel;
    } catch (error: unknown) {
      const method = this.parseRTCDataChannel.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }

  public static parseCommonParamsInterface(
    data: unknown
  ): ICommonParams.commonParams {
    const dataIF = ICommonParams.parseCommonParams(data);
    if (dataIF === null) {
      const method = this.parseCommonParamsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseCallSignalingInterface(
    data: unknown
  ): ICallSignaling.callSignaling {
    const dataIF = ICallSignaling.parseCallSignaling(data);
    if (dataIF === null) {
      const method = this.parseCallSignalingInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseCallDetailsInterface(
    data: unknown
  ): ICallDetails.callDetails {
    const dataIF = ICallDetails.parseCallDetails(data);
    if (dataIF === null) {
      const method = this.parseCallDetailsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }

    return dataIF;
  }

  public static parseNotificationInterface(
    data: unknown
  ): INotification.notification {
    const dataIF = INotification.parseNotification(data);
    if (dataIF === null) {
      const method = this.parseNotificationInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseAllowConnectionsInterface(
    data: unknown
  ): IAllowConnections.allowConnections {
    const dataIF = IAllowConnections.parseAllowConnections(data);
    if (dataIF === null) {
      const method = this.parseAllowConnectionsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseClientRequestInterface(
    data: unknown
  ): IClientRequest.clientRequest {
    const dataIF = IClientRequest.parseClientRequest(data);
    if (dataIF === null) {
      const method = this.parseClientRequestInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseWebRTCSignalingInterface(
    data: unknown
  ): IWebRtcSignaling.webRtcSignaling {
    const dataIF = IWebRtcSignaling.parseWebRtcSignaling(data);
    if (dataIF === null) {
      const method = this.parseWebRTCSignalingInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parsePeersInterface(data: unknown): IPeers.peers {
    const dataIF = IPeers.parsePeers(data);
    if (dataIF === null) {
      const method = this.parsePeersInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }
  public static parsePeerInterface(data: unknown): IPeer.peer {
    const dataIF = IPeer.parsePeer(data);

    if (dataIF === null) {
      const method = this.parsePeerInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }

  public static parseTotalInterface(data: unknown): ITotal.total {
    const dataIF = ITotal.parseTotal(data);
    if (dataIF === null) {
      const method = this.parseTotalInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
    return dataIF;
  }
  public static parseRtcIceCandidate(data: unknown): RTCIceCandidate {
    try {
      validatorHelper.checkRTCIceCandidate(data);
      return data as RTCIceCandidate;
    } catch (error: unknown) {
      const method = this.parseSocket.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }
}
