/**
 * @file peer.model.ts
 * @class peerModel
 *
 * @description
 * Placeholder model for peer persistence operations. Currently unused —
 * all peer state is managed in-memory by storeClass and its subclasses.
 * Intended for future database integration.
 *
 * @staticMethods
 * - getPeer(socketId, peers)     Finds a peer by socket ID in an array; returns peer or null.
 * - removePeer(socketId, peers)  Removes a peer from an array by socket ID; returns removed peer or null.
 *
 * @see storeClass — current in-memory implementation that supersedes this model
 */
import { peer } from "../classes/classes.js";

export default class peerModel {
  public static getPeer(socketId: string, peers: Array<peer>): peer | null {
    peers.forEach((peer) => {
      if (peer.id === socketId) {
        return peer;
      }
    });

    return null;
  }

  public static removePeer(socketId: string, peers: Array<peer>): peer | null {
    let found: peer | null = null;
    peers.forEach((peer, index) => {
      if (peer.id === socketId) {
        peers.splice(index, 1);
        found = peer;
      }
    });
    return found;
  }
}
