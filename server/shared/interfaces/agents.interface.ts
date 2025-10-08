import { peer } from "./peer.interface.js";

export interface peers {
  peers: peer[];
}

export const getPeers = (data: peer[]): peers => {
  const peers: peers = {
    peers: data,
  };
  return peers;
};

export const isPeers = (data: unknown): data is peers => {
  return (data as peers).peers !== undefined;
};

export const parsePeers = (data: unknown): peers | null => {
  let dataIF: peers | null = null;

  if (data !== null && data !== undefined) {
    if (isPeers(data)) {
      /* dataIF = getpeersInterface(data.peers); */
      dataIF = data as peers;
    }
  }
  return dataIF;
};
