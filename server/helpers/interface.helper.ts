/**
 * @file interface.helper.ts
 * @class interfaceHelper
 *
 * @description
 * Utility for transforming server-internal class instances into the
 * serialisable interface types sent over Socket.IO.
 *
 * @staticMethods
 * - transformToIPeers(agents)
 *     Converts an array of peerAgent instances into an IPeers.peers interface
 *     object suitable for the AVAILABLE_AGENTS server notification. Each agent
 *     is mapped to IPeer.getPeer(id, name).
 *
 * @see availableAgentsRequest — calls transformToIPeers before emitting
 * @see availableForConnectionsNotification — calls transformToIPeers before broadcasting
 */
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
