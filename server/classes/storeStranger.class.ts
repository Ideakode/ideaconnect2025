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
