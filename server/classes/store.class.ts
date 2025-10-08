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
