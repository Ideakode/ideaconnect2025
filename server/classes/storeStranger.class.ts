/**
 * @file storeStranger.class.ts
 * @class storeStrangerClass  (exported as storeS)
 *
 * @description
 * In-memory store for all currently connected strangers. Extends storeClass
 * and specialises it for basic peer objects. Strangers do not have
 * availability flags — the store only tracks presence and provides a
 * count of connected strangers.
 *
 * @methods
 * - addStranger(id, type)        Creates a new peer and adds it to the store.
 * - removeStranger(socketId)     Removes the peer with the given socket ID;
 *                                returns the removed peer or null.
 * - getTotalStrangersConnected() Returns the current count of connected strangers.
 *
 * @see storeClass         — base store implementation
 * @see peerClass          — the peer type stored here
 * @see storeStrangerService — service layer that operates on this store
 */
import { store, peer} from "./classes.js";

export class storeStrangerClass extends store {
  constructor(peers: peer[] = []) {
    super(peers);
  }

  public addStranger(id: string, type: string) {
    this.addPeer(new peer(id, type));
  }
  public removeStranger(socketId: string): peer | null {
    let removedStranger: peer | null = null;

    removedStranger = this.removePeer(socketId) as peer;
    return removedStranger;
  }
  public getTotalStrangersConnected(): number {
    return this.peers.length;
  }
}
