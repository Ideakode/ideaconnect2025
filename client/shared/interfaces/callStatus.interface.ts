export interface callStatus {
  status: string; //in here we set the status text (INVITE, CALL REJECTED, UNAVAILABLE, NOT FOUND...)
  statusCode?: string; // To do  - in here we set the status code of the status (for future implementation)
  additionalInfo?: string; // To do; in here we set the unknown additional information (for future implementation)
}

export const getCallStatus = (
  status: string,
  statusCode: string = "",
  additionalInfo: string = ""
): callStatus => {
  const callStatus: callStatus = {
    status: status,
    statusCode: statusCode,
    additionalInfo: additionalInfo,
  };
  return callStatus;
};

export const isCallStatus = (data: unknown): data is callStatus => {
  return (
    (data as callStatus).additionalInfo !== undefined &&
    (data as callStatus).status !== undefined &&
    (data as callStatus).statusCode !== undefined
  );
};

export const parseCallStatus = (data: unknown): callStatus | null => {
  let dataIF: callStatus | null = null;

  if (data !== null && data !== undefined) {
    if (isCallStatus(data)) {
      /* dataIF = getcallStatus(
        data.status,
        data.statusCode,
        data.additionalInfo
      ); */
      dataIF = data as callStatus;
    }
  }
  return dataIF;
};
