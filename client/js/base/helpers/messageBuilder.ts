import { callSignaling, webRTC } from "../constants/constants.js";
import {
  IClientRequest,
  INotification,
  ICallDetails,
  ICAllStatus,
  ICallSignaling,
  IRouteTo,
  IWebRtcSignaling,
} from "../interfaces/interfaces.js";
import { callHelper } from "../helpers/helpers.js";

export class messageBuilder {
  public static buildClientRequest(
    requestType: string,
    data: unknown = ""
  ): IClientRequest.clientRequest {
    const msg = IClientRequest.getClientRequest(requestType, data);
    return msg;
  }

  public static buildClientNotification(
    notifType: string,
    data: unknown = ""
  ): INotification.notification {
    const msg = INotification.getNotification(notifType, data);
    return msg;
  }

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

  public static buildCallDetails(
    type: string,
    clgId: string,
    cldId: string,
    clgName: string = "",
    cldName: string = ""
  ): ICallDetails.callDetails {
    const callid = callHelper.generateCallId();
    const msg = ICallDetails.getCallDetails(
      callid,
      type,
      clgId,
      cldId,
      clgName,
      cldName
    );
    return msg;
  }

  public static buildCallSignalingInvite(
    type: string,
    clgId: string,
    cldId: string,
    routeTo: string,
    clgName: string = "",
    cldName: string = ""
  ): ICallSignaling.callSignaling {
    const cDetails = this.buildCallDetails(
      type,
      clgId,
      cldId,
      clgName,
      cldName
    );
    const invite = callSignaling.INVITE;
    return this.buildCallSignaling(cDetails, invite, routeTo);
  }

  public static buildCallSignalingCancel(
    cDetails: ICallDetails.callDetails
  ): ICallSignaling.callSignaling {
    const cancel = callSignaling.CANCEL;
    const cldId = cDetails.calledPartyId;
    return this.buildCallSignaling(cDetails, cancel, cldId);
  }
  public static buildCallSignalingAccept(
    cDetails: ICallDetails.callDetails,
    routeTo: string
  ): ICallSignaling.callSignaling {
    const accepted = callSignaling.CALL_ACCEPTED;
    return this.buildCallSignaling(cDetails, accepted, routeTo);
  }
  public static buildCallSignalingReject(
    cDetails: ICallDetails.callDetails,
    routeTo: string
  ): ICallSignaling.callSignaling {
    const reject = callSignaling.CALL_REJECTED;
    return this.buildCallSignaling(cDetails, reject, routeTo);
  }

  public static buildCallSignalingBusy(
    cDetails: ICallDetails.callDetails,
    routeTo: string
  ): ICallSignaling.callSignaling {
    const busy = callSignaling.CALL_BUSY;
    return this.buildCallSignaling(cDetails, busy, routeTo);
  }
  public static buildCallSignalingBye(
    cDetails: ICallDetails.callDetails,
    routeTo: string
  ): ICallSignaling.callSignaling {
    const bye = callSignaling.BYE;
    return this.buildCallSignaling(cDetails, bye, routeTo);
  }

  public static buildWebRTCSignalingIceCandidate(
    cDetails: ICallDetails.callDetails,
    data: RTCIceCandidate | RTCSessionDescriptionInit,
    toId: string
  ): IWebRtcSignaling.webRtcSignaling {
    const ice = webRTC.signaling.ICE_CANDIDATE;
    const routeTo = toId;
    return this.buildWebRtcSignaling(cDetails, ice, routeTo, data);
  }

  public static buildWebRTCSignalingOffer(
    cDetails: ICallDetails.callDetails,
    data: RTCIceCandidate | RTCSessionDescriptionInit
  ): IWebRtcSignaling.webRtcSignaling {
    const offer = webRTC.signaling.OFFER;
    const routeTo = cDetails.calledPartyId;
    return this.buildWebRtcSignaling(cDetails, offer, routeTo, data);
  }
  public static buildWebRTCSignalingAnswer(
    cDetails: ICallDetails.callDetails,
    data: RTCIceCandidate | RTCSessionDescriptionInit
  ): IWebRtcSignaling.webRtcSignaling {
    const answer = webRTC.signaling.ANSWER;
    const routeTo = cDetails.callingPartyId;
    return this.buildWebRtcSignaling(cDetails, answer, routeTo, data);
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
