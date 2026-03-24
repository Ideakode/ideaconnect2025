/**
 * @file parser.helper.ts
 * @class parserHelper
 *
 * @description
 * Provides safe parsing/casting functions that convert `unknown` values into their expected
 * typed counterparts. Each method first delegates to validatorHelper for the type guard check,
 * then casts the value. On failure it propagates a parserErrorClass via errorHandler.
 *
 * Two patterns are used:
 * 1. **Validate-then-cast** (for runtime objects): calls validatorHelper.check*,
 *    then returns the value cast to the expected type.
 * 2. **Interface parse** (for plain data objects): calls the interface's own parse* function
 *    (which returns T | null), then throws via errorBuilder.ifDataNotValid if null.
 *
 * @staticMethods
 * Validate-then-cast:
 * - parseSocket(data)              → Socket
 * - parseStore(store)              → store
 * - parseRTCPeerConnection(data)   → RTCPeerConnection
 * - parseRTCDataChannel(data)      → RTCDataChannel
 * - parseRtcIceCandidate(data)     → RTCIceCandidate
 *
 * Interface parse:
 * - parseCommonParamsInterface(data)       → ICommonParams.commonParams
 * - parseCallSignalingInterface(data)      → ICallSignaling.callSignaling
 * - parseCallDetailsInterface(data)        → ICallDetails.callDetails
 * - parseNotificationInterface(data)       → INotification.notification
 * - parseAllowConnectionsInterface(data)   → IAllowConnections.allowConnections
 * - parseClientRequestInterface(data)      → IClientRequest.clientRequest
 * - parseWebRTCSignalingInterface(data)    → IWebRtcSignaling.webRtcSignaling
 * - parsePeersInterface(data)              → IPeers.peers
 * - parsePeerInterface(data)               → IPeer.peer
 * - parseTotalInterface(data)              → ITotal.total
 *
 * @see validatorHelper  - performs the underlying type guard checks
 * @see errorBuilder     - constructs ifDataNotValid errors
 * @see errorHandler     - throws/propagates parserErrorClass on failure
 */
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
