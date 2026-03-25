/**
 * @file store.class.ts
 * @class storeClass  (exported as store)
 *
 * @description
 * Base in-memory store for connected peers. Holds a protected array of peer
 * objects and provides the fundamental CRUD operations used by both
 * storeAgentClass and storeStrangerClass.
 *
 * @methods
 * - addPeer(peer)       Appends a peer to the internal array and logs the addition.
 * - removePeer(id)      Removes the peer with the given socket ID; returns the removed
 *                       peer or null if not found.
 * - getPeer(id)         Returns the peer matching the given socket ID, or undefined.
 * - getPeersIDs()       Returns an array of all current peer socket IDs.
 * - get/set peers       Direct accessor for the internal _peers array.
 *
 * @see storeAgentClass   — extends store for agent-specific operations
 * @see storeStrangerClass — extends store for stranger-specific operations
 */
import { peer } from "./classes.js";
import { logger } from "../logs/logs.js";

export class storeClass {
  private readonly className = "store";

  protected _peers: peer[];

  constructor(peers: peer[] = []) {
    this._peers = peers;
  }

  public removePeer(id: string): peer | null {
    let found: peer | null = null;

    this._peers.forEach((peer, index) => {
      if ((peer as peer).id === id) {
        this._peers.splice(index, 1);
        found = peer;
        logger.log(this.className, "removePeer | ", [peer]);
      }
    });
    if (!found) {
      logger.log(this.className, "removePeer - Failed | Id: " + id);
    }

    return found;
  }

  public get peers(): peer[] {
    return this._peers;
  }
  public set peers(value: peer[]) {
    this._peers = value;
  }

  public addPeer(peer: peer) {
    this.peers.push(peer);
    logger.log(this.className, "addPeer | ", [peer]);
  }

  public getPeer(id: string): peer | undefined {
    let foundPeer: peer | undefined = undefined;
    foundPeer = this.peers.find((peer) => peer.id === id);

    return foundPeer;
  }

  public getPeersIDs(): string[] {
    const peerIDs: string[] = [];
    this.peers.forEach((element) => {
      peerIDs.push(element.id);
    });
    return peerIDs;
  }
}
