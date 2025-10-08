export interface clientRequest {
  requestType: string;
  data?: unknown;
}

export const getClientRequest = (
  requestType: string,
  data: unknown = null
): clientRequest => {
  return {
    requestType: requestType,
    data: data,
  } as clientRequest;
};

export const isClientRequest = (data: unknown): data is clientRequest => {
  return (
    (data as clientRequest).data !== undefined &&
    (data as clientRequest).requestType !== undefined
  );
};

export const parseClientRequest = (data: unknown): clientRequest | null => {
  let dataIF: clientRequest | null = null;

  if (data !== null && data !== undefined) {
    if (isClientRequest(data)) {
      /* dataIF = getclientRequest(data.requestType, data.data); */
      dataIF = data as clientRequest;
    }
  }
  return dataIF;
};
