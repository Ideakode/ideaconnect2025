import { Socket } from "socket.io";
import { validatorHelper } from "./helpers.js";
import {
  ICommonParams,
  IAllowConnections,
  ICallSignaling,
  IClientRequest,
  INotification,
  IWebRtcSignaling,
} from "../interfaces/interfaces.js";
import { errorBuilder, errorHandler, errorTypes } from "../errors/errors.js";

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
}
