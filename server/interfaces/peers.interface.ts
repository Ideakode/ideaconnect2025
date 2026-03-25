/**
 * @file peers.interface.ts  (server/interfaces)
 *
 * @description
 * Defines a peers interface as a list of peer objects. Currently unused in favour
 * of the shared IPeers interface; kept as a placeholder.
 *
 * @interface peers  { list: peer[] }
 * @functions
 * - getPeers(peers)  Constructs a peers object from a peer array.
 */
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
