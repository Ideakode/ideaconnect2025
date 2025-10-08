export interface streams {
  local: MediaStream | null;
  remote: MediaStream | null;
  screenSharing: MediaStream | null;
}

export const getStreams = (
  local: MediaStream | null = null,
  remote: MediaStream | null = null,
  screenSharing: MediaStream | null = null
): streams => {
  const streams: streams = {
    local,
    remote,
    screenSharing,
  };
  return streams;
};
