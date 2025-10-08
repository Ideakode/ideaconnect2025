import { peer } from "../classes/classes.js";

export interface peers {
  list: peer[];
}

export const getPeers = (peers: peer[]): peers => {
  const conPeers: peers = {
    list: peers,
  };
  return conPeers;
};
