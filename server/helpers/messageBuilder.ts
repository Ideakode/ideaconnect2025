/**
 * @file messageBuilder.ts
 * @class messageBuilder
 *
 * @description
 * Factory class for constructing the structured message objects emitted over
 * Socket.IO. All methods are static and return fully-formed interface objects
 * ready to be passed to socketService emit helpers.
 *
 * @staticMethods
 * - buildCallSignaling(cDetails, msgType, routeTo)
 *     Constructs a callSignaling interface with the given call details, status
 *     type, and destination socket ID.
 *
 * - callSignalingNotFound(cDetails, routeTo)
 *     Convenience wrapper around buildCallSignaling with status NOT_FOUND.
 *
 * - buildWebRTCSignalingAnswer(cDetails, data)
 *     Builds a WebRTC ANSWER signaling message routed back to the calling party.
 *
 * - notification(type, data)
 *     Constructs a generic server notification with the given type and payload.
 *
 * - notificationPeerInfo(data)
 *     Convenience wrapper for a PEER_INFO server notification.
 *
 * - buildWebRtcSignaling(cDetails, mType, routeTo, data, callStatus?)
 *     Constructs a full webRtcSignaling interface with type, call details,
 *     route, status, and SDP/ICE data.
 *
 * @see socketService — consumes the built messages for emission
 */
import {
  callSignaling,
  webRTC,
  notificationTypes,
} from "../constants/constants.js";
import {
  ICallDetails,
  ICAllStatus,
  ICallSignaling,
  IRouteTo,
  IWebRtcSignaling,
  INotification,
  IPeer,
} from "../interfaces/interfaces.js";

export class messageBuilder {
  public static buildCallSignaling(
    cDetails: ICallDetails.callDetails,
    msgType: string,
    routeTo: string
  ) {
    const status = ICAllStatus.getCallStatus(msgType);
    const route = IRouteTo.getRouteTo(routeTo);
    const msg = ICallSignaling.getCallSignaling(cDetails, status, route);
    return msg;
  }

  public static callSignalingNotFound(
    cDetails: ICallDetails.callDetails,
    routeTo: string
  ): ICallSignaling.callSignaling {
    const notfound = callSignaling.NOT_FOUND;
    return this.buildCallSignaling(cDetails, notfound, routeTo);
  }

  public static buildWebRTCSignalingAnswer(
    cDetails: ICallDetails.callDetails,
    data: RTCIceCandidate | RTCSessionDescriptionInit
  ): IWebRtcSignaling.webRtcSignaling {
    const answer = webRTC.signaling.ANSWER;
    const routeTo = cDetails.callingPartyId;
    return this.buildWebRtcSignaling(cDetails, answer, routeTo, data);
  }

  public static notification(
    type: string,
    data: unknown
  ): INotification.notification {
    const notif = INotification.getNotification(type, data);
    return notif;
  }

  public static notificationPeerInfo(
    data: IPeer.peer
  ): INotification.notification {
    const type = notificationTypes.server.PEER_INFO;
    return this.notification(type, data);
  }

  public static buildWebRtcSignaling(
    cDetails: ICallDetails.callDetails,
    mType: string,
    routeTo: string,
    data: RTCIceCandidate | RTCSessionDescriptionInit,
    callStatus: string = callSignaling.INVITE
  ): IWebRtcSignaling.webRtcSignaling {
    const routeIF = IRouteTo.getRouteTo(routeTo);
    const statusIF = ICAllStatus.getCallStatus(callStatus);
    const rtcSig = IWebRtcSignaling.getWebRtcSignaling(
      mType,
      cDetails,
      routeIF,
      statusIF,
      data
    );
    return rtcSig;
  }
}
