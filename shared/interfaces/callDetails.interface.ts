export interface callDetails {
  callId: string;
  callType: string;
  callingPartyId: string;
  calledPartyId: string;
  callingPartyName: string;
  calledPartyName: string;
}

export const getCallDetails = (
  callId: string,
  callType: string,
  callingPartyId: string,
  calledPartyId: string,
  callingPartyName: string = "",
  calledPartyName: string = ""
): callDetails => {
  const callDetailsInterface: callDetails = {
    callId: callId,
    callType: callType,
    callingPartyId: callingPartyId,
    calledPartyId: calledPartyId,
    callingPartyName: callingPartyName,
    calledPartyName: calledPartyName,
  };
  return callDetailsInterface;
};

export const isCallDetails = (data: unknown): data is callDetails => {
  return (
    (data as callDetails).callId !== undefined &&
    (data as callDetails).callType !== undefined &&
    (data as callDetails).calledPartyId !== undefined &&
    (data as callDetails).callingPartyId !== undefined &&
    (data as callDetails).callingPartyName !== undefined &&
    (data as callDetails).calledPartyName !== undefined
  );
};
export const parseCallDetails = (data: unknown): callDetails | null => {
  let dataIF: callDetails | null = null;

  if (data !== null && data !== undefined) {
    if (isCallDetails(data)) {
      /*   dataIF = getCallDetailsInterface(
        data.callId,
        data.callType,
        data.callingPartyId,
        data.calledPartyId,
        data.callingPartyName,
        data.calledPartyName
      ); */
      dataIF = data as callDetails;
    }
  }
  return dataIF;
};
