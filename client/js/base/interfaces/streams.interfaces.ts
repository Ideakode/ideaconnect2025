/**
 * @file streams.interfaces.ts
 * @namespace IStreams
 *
 * @description
 * Defines the `streams` interface that groups all media streams for an active WebRTC call.
 * Stored in storeClass._streams and set/cleared alongside the call lifecycle.
 *
 * @interface streams
 * - local         - The peer's own camera/microphone MediaStream. Null when no call is active.
 * - remote        - The remote peer's MediaStream received via WebRTC. Null until connected.
 * - screenSharing - The screen share MediaStream. Null when not sharing. (reserved for future use)
 *
 * @function getStreams(local?, remote?, screenSharing?)
 * Factory that constructs a streams object. All arguments default to null.
 * Called when setting up media for a new call.
 *
 * @see storeClass._streams  - holds the active streams instance during a call
 */
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
