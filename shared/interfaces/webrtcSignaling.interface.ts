import { callDetails } from "./callDetails.interface.js";
import { routeTo } from "./routeTo.interface.js";
import { callStatus } from "./callStatus.interface.js";

export interface webRtcSignaling {
  type: string;
  callDetails: callDetails;
  routeTo: routeTo;
  callStatus: callStatus;
  data: RTCIceCandidate | RTCSessionDescriptionInit;
}

export const getWebRtcSignaling = (
  type: string,
  callDetails: callDetails,
  routeTo: routeTo,
  callStatus: callStatus,
  data: RTCIceCandidate | RTCSessionDescriptionInit
): webRtcSignaling => {
  return {
    callDetails: callDetails,
    type: type,
    callStatus,
    routeTo: routeTo,
    data: data,
  } as webRtcSignaling;
};

export const isWebRtcSignaling = (data: unknown): data is webRtcSignaling => {
  return (
    (data as webRtcSignaling).callDetails !== undefined &&
    (data as webRtcSignaling).data !== undefined &&
    (data as webRtcSignaling).routeTo !== undefined &&
    (data as webRtcSignaling).type !== undefined &&
    (data as webRtcSignaling).callStatus !== undefined
  );
};

export const parseWebRtcSignaling = (data: unknown): webRtcSignaling | null => {
  let dataIF: webRtcSignaling | null = null;

  if (data !== null && data !== undefined) {
    if (isWebRtcSignaling(data)) {
      /*  dataIF = getwebRtcSignaling(
        data.webRTCSignalingType,
        data.callDetails,
        data.routeTo,
        data.callStatus,
        data.data
      ); */
      dataIF = data as webRtcSignaling;
    }
  }
  return dataIF;
};
