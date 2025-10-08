import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  classErrorClass,
  eventHandlerErrorClass,
} from "./classes/classes.js";
import { getBaseErrorInterface } from "./baseError.interface.js";
import { errorHandler } from "./error.handler.js";
import { errorTypes } from "./errorTypes.js";

export class errorBuilder {
  public static readonly _error_unkonwn =
    "Error not known. This state should never happen.";
  public static readonly _error_if_not_valid = "Interface data is not valid";
  public static readonly _error_peer_not_valid = "Peer Type is not valid";
  public static readonly _error_io_not_valid = "IO instance is not valid";
  public static readonly _error_socket_not_valid = "Socket is not valid";
  public static readonly _error_store_not_valid = "Store is not valid";
  public static readonly _error_storeA_not_valid = "Store Agent is not valid";
  public static readonly _error_storeS_not_valid =
    "Store Stranger is not valid";
  public static readonly _error_namespace_not_valid = "Namespace is not valid";
  public static readonly _error_peerA_not_in_store =
    "Peer Agent does not exist in store";
  public static readonly _error_peerS_not_in_store =
    "Peer Stranger does not exist in store";

  public static ifDataNotValid(
    type: string,
    method: string,
    received: unknown
  ) {
    const err = this._error_if_not_valid;
    const msg = "Received: " + JSON.stringify(received);
    return this.createError(type, err, msg, method);
  }

  public static unkonwn(type: string, method: string) {
    const err = this._error_unkonwn;
    return this.createError(type, err, err, method);
  }
  public static peerNotValid(type: string, method: string, peerType: string) {
    const err = this._error_peer_not_valid;
    const msg = "Received PeerType: " + peerType;
    return this.createError(type, err, msg, method);
  }

  public static peerANotInStore(type: string, method: string) {
    const err = this._error_peerA_not_in_store;
    return this.createError(type, err, err, method);
  }
  public static peerSNotInStore(type: string, method: string) {
    const err = this._error_peerS_not_in_store;
    return this.createError(type, err, err, method);
  }
  public static ioNotvalid(type: string, method: string) {
    const err = this._error_io_not_valid;

    return this.createError(type, err, err, method);
  }

  public static socketNotValid(type: string, method: string) {
    const err = this._error_socket_not_valid;
    return errorHandler.createError(type, err, err, method);
  }

  public static storeNotValid(type: string, method: string) {
    const err = this._error_store_not_valid;
    return errorHandler.createError(type, err, err, method);
  }
  public static storeANotValid(type: string, method: string) {
    const err = this._error_storeA_not_valid;
    return errorHandler.createError(type, err, err, method);
  }
  public static storeSNotValid(type: string, method: string) {
    const err = this._error_storeS_not_valid;
    return errorHandler.createError(type, err, err, method);
  }
  public static namespaceNotValid(type: string, method: string, nspc: string) {
    const err = this._error_storeS_not_valid;
    const msg = err + ". Received: " + nspc;
    return errorHandler.createError(type, err, msg, method);
  }
  private static createError(
    type: string,
    err: string,
    msg: string,
    method: string
  ): baseErrorClass {
    const errIF = getBaseErrorInterface(err, msg, method);
    switch (type) {
      case errorTypes.PARSER:
        return new parserErrorClass(errIF);
      case errorTypes.VALIDATOR:
        return new validatorErrorClass(errIF);
      case errorTypes.SERVICE:
        return new serviceErrorClass(errIF);
      case errorTypes.BASE:
        return new baseErrorClass(errIF);
      case errorTypes.USE_CASE:
        return new useCaseErrorClass(errIF);
      case errorTypes.EVENT_HANDLER:
        return new eventHandlerErrorClass(errIF);
      case errorTypes.CLASS:
        return new classErrorClass(errIF);
      default:
        return new baseErrorClass(errIF);
    }
  }
}
