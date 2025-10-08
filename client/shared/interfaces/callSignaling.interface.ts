import { callDetails } from "./callDetails.interface.js";
import { callStatus } from "./callStatus.interface.js";
import { routeTo } from "./routeTo.interface.js";

export interface callSignaling {
  callDetails: callDetails;
  callStatus: callStatus;
  routeTo: routeTo;
}

export const getCallSignaling = (
  callDetails: callDetails,
  callStatus: callStatus,
  routeTo: routeTo
): callSignaling => {
  return {
    callDetails: callDetails,
    callStatus: callStatus,
    routeTo: routeTo,
  } as callSignaling;
};

export const isCallSignaling = (data: unknown): data is callSignaling => {
  return (
    (data as callSignaling).callDetails !== undefined &&
    (data as callSignaling).callStatus !== undefined &&
    (data as callSignaling).routeTo !== undefined
  );
};

export const parseCallSignaling = (data: unknown): callSignaling | null => {
  let dataIF: callSignaling | null = null;

  if (data !== null && data !== undefined) {
    if (isCallSignaling(data)) {
      /*   dataIF = getcallSignaling(
        data.callDetails,
        data.callStatus,
        data.routeTo
      ); */
      dataIF = data as callSignaling;
    }
  }
  return dataIF;
};
