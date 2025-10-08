import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  classErrorClass,
  uiErrorClass,
  eventHandlerErrorClass,
} from "./classes/classes.js";

import { errorTypes } from "./errorTypes.js";
import { getBaseErrorInterface } from "./baseError.interface.js";

export class errorBuilder {
  public static readonly _error_if_not_valid = "Interface data is not valid";
  public static readonly _error_socket_not_valid = "Socket is not valid";
  public static readonly _error_store_not_valid = "Store is not valid";
  public static readonly _error_dataChannel_not_valid =
    "RTC DataChannel is not valid";
  public static readonly _error_callDetails_null = "callDetails is null";
  public static readonly _error_callDetails_differ = "callDetails differ";
  public static readonly _error_peerType_not_valid = "PeerType is not valid";
  public static readonly _error_namespace_not_valid = "Namespace is not valid";
  public static readonly _error_namespace_peer_differ =
    "Namespace and PeerType are different";
  public static readonly _error_rtc_not_valid =
    "RTCPeerConnection data is not valid";
  public static readonly _error_htmlEl_not_valid = "HTML element is not valid";
  public static readonly _error_rtcIce_not_valid =
    "RTC ICE candidate data is not valid";

  public static readonly _error_peer_not_idle = "Peer is not idle";
  public static readonly _error_callDetails_not_null =
    "Call Details are not null";

  public static readonly _error_peer_not_known =
    "Type of ConnectedPeer Not known.";

  public static readonly _error_peer_not_available_calls =
    "Peer is not available to receive calls";
  public static readonly _error_storeA_not_valid = "Store Agent is not valid";
  public static readonly _error_call_is_active_state =
    "Call is in active state";

  public static callIsActiveState(type: string, method: string) {
    const err = this._error_call_is_active_state;
    return this.createError(type, err, err, method);
  }

  public static agentNotAvailableCalls(
    type: string,
    method: string
  ): baseErrorClass {
    const err = this._error_peer_not_available_calls;
    return this.createError(type, err, err, method);
  }
  public static storeANotValid(
    type: string,
    method: string,
    rcvd: unknown
  ): baseErrorClass {
    const err = this._error_storeA_not_valid;
    const msg = "Received: " + JSON.stringify(rcvd);
    return this.createError(type, err, msg, method);
  }

  public static peerNotKnown(
    type: string,
    method: string,
    href: string
  ): baseErrorClass {
    const err = this._error_peer_not_known;
    const msg = "Window.HRef: " + href;
    return this.createError(type, err, msg, method);
  }

  public static peerNotIdle(
    type: string,
    method: string,
    state: string
  ): baseErrorClass {
    const err = this._error_peer_not_idle;
    const msg = "Peer tate: " + state;
    return this.createError(type, err, msg, method);
  }

  public static readonly _error_storeS_not_valid =
    "Store Stranger is not valid";

  public static storeSNotValid(
    type: string,
    method: string,
    rcvd: unknown
  ): baseErrorClass {
    const err = this._error_storeS_not_valid;
    const msg = "Received: " + JSON.stringify(rcvd);
    return this.createError(type, err, msg, method);
  }

  public static callDetailsNotNull(
    type: string,
    method: string,
    cDetails: unknown
  ): baseErrorClass {
    const err = this._error_callDetails_not_null;
    const msg = "Current value: " + JSON.stringify(cDetails);
    return this.createError(type, err, msg, method);
  }

  public static socketNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_socket_not_valid;
    const msg = "Received: " + JSON.stringify(received);

    return this.createError(type, err, msg, method);
  }
  public static dataChannelNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_socket_not_valid;
    const msg = "Received: " + JSON.stringify(received);

    return this.createError(type, err, msg, method);
  }
  public static storeNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_store_not_valid;
    const msg = "Received: " + JSON.stringify(received);

    return this.createError(type, err, msg, method);
  }

  public static callDetailsNull(type: string, method: string): baseErrorClass {
    const err = this._error_callDetails_null;

    return this.createError(type, err, err, method);
  }
  public static htmlElNotValid(
    type: string,
    method: string,
    elName: string
  ): baseErrorClass {
    const err = this._error_htmlEl_not_valid;
    const msg = "Element name: " + elName;

    return this.createError(type, err, msg, method);
  }
  public static rtcNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_rtc_not_valid;
    const msg = "Received: " + JSON.stringify(received);

    return this.createError(type, err, msg, method);
  }
  public static callDetailsDiffer(
    type: string,
    method: string,
    callIds: string[]
  ): baseErrorClass {
    const err = this._error_callDetails_differ;
    const msg = "Call IDs: " + callIds.toString();

    return this.createError(type, err, msg, method);
  }

  public static nspcNotValid(
    type: string,
    method: string,
    nspc: string
  ): baseErrorClass {
    const err = this._error_namespace_not_valid;
    const msg = "Namespace: " + nspc;

    return this.createError(type, err, msg, method);
  }
  public static nspcPeerDiffer(
    type: string,
    method: string,
    nspc: string,
    pType: string
  ): baseErrorClass {
    const err = this._error_namespace_peer_differ;
    const msg = "Namespace: " + nspc + " ** PeerType: " + pType;

    return this.createError(type, err, msg, method);
  }
  public static peerTypeNotValid(
    type: string,
    method: string,
    pType: string
  ): baseErrorClass {
    const err = this._error_peerType_not_valid;
    const msg = "Received: " + pType;

    return this.createError(type, err, msg, method);
  }

  public static ifDataNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_if_not_valid;
    const msg = "Received: " + JSON.stringify(received);
    return this.createError(type, err, msg, method);
  }
  public static rtcIceNotValid(
    type: string,
    method: string,
    received: unknown
  ): baseErrorClass {
    const err = this._error_rtcIce_not_valid;
    const msg = "Received: " + JSON.stringify(received);

    return this.createError(type, err, msg, method);
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
      case errorTypes.UI:
        return new uiErrorClass(errIF);
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
