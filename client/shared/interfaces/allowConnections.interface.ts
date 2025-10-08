export interface allowConnections {
  socketId: string;
  allow: boolean;
  peerType: string;
}

export const getAllowConnections = (
  socketId: string,
  allow: boolean,
  peerType: string
): allowConnections => {
  const allowConnections: allowConnections = {
    socketId: socketId,
    allow: allow,
    peerType: peerType,
  };
  return allowConnections;
};

export const isAllowConnections = (data: unknown): data is allowConnections => {
  return (
    (data as allowConnections).allow !== undefined &&
    (data as allowConnections).peerType !== undefined &&
    (data as allowConnections).socketId !== undefined
  );
};

export const parseAllowConnections = (
  data: unknown
): allowConnections | null => {
  let dataIF: allowConnections | null = null;

  if (data !== null && data !== undefined) {
    if (isAllowConnections(data)) {
      /* dataIF = getAllowConnectionsInterface(
        data.socketId,
        data.allowConnections,
        data.peerType
      ); */
      dataIF = data as allowConnections;
    }
  }
  return dataIF;
};
