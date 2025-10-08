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
