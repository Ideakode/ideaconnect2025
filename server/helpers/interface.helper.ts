import { peerAgent } from "../classes/classes.js";
import { IPeers, IPeer } from "../interfaces/interfaces.js";

export class interfaceHelper {
  public static transformToIPeers(agents: peerAgent[]): IPeers.peers {
    const availableAgents = IPeers.getPeers([]);

    if (agents.length > 0) {
      agents.forEach((agent) => {
        availableAgents.peers.push(
          IPeer.getPeer(agent.id, agent.name ? agent.name : "")
        );
      });
    }
    return availableAgents;
  }
}
