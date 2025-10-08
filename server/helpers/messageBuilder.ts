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
