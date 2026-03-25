/**
 * @file agent.interface.ts  (shared/interfaces)
 * @namespace IAgent (unused — duplicate of peer.interface.ts)
 *
 * @description
 * Duplicate of peer.interface.ts kept for historical reasons. Defines the
 * same { peerID, peerName } shape. Not currently referenced by any barrel —
 * use IPeer from peer.interface.ts instead.
 */
export interface peer {
  peerID: string;
  peerName: string;
}

export const getPeer = (peerID: string, peerName: string): peer => {
  const peerI: peer = {
    peerID: peerID,
    peerName: peerName,
  };
  return peerI;
};

export const isPeer = (data: unknown): data is peer => {
  return (
    (data as peer).peerID !== undefined && (data as peer).peerName !== undefined
  );
};

export const parsePeer = (data: unknown): peer | null => {
  let dataIF: peer | null = null;

  if (data !== null && data !== undefined) {
    if (isPeer(data)) {
      /* dataIF = getpeer(data.peerID, data.peerName); */
      dataIF = data as peer;
    }
  }
  return dataIF;
};
