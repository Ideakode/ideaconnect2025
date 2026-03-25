/**
 * @file storeAgent.class.ts
 * @class storeAgentClass  (exported as storeA)
 *
 * @description
 * In-memory store for all currently connected agents. Extends storeClass
 * and specialises it for peerAgent objects. Manages agent lifecycle
 * (add/remove) and availability flags that determine which agents are
 * visible to strangers or to other agents.
 *
 * @methods
 * - addAgent(id, type)                      Creates a peerAgent with a randomly assigned
 *                                           display name, adds it to the store, and returns it.
 * - removeAgent(socketId)                   Removes the agent from the store; returns the
 *                                           removed peerAgent or null.
 * - getAvailableAgents(type)                Returns all agents whose availability flag
 *                                           matches the given peer type (STRANGER or AGENT).
 * - setAgentAvailableStatus(id, allow, peerType)  Updates allowConnectionFromStrangers or
 *                                                 allowConnectionFromAgents on the agent;
 *                                                 returns the updated peerAgent or null.
 *
 * @see storeClass      — base store implementation
 * @see peerAgentClass  — the peer type stored here
 * @see storeAgentService — service layer that operates on this store
 */

import * as constants from "../constants/constants.js";
import { peerAgent,store } from "./classes.js";
import { logger } from "../logs/logs.js";

export class storeAgentClass extends store {
  constructor(peers: peerAgent[] = []) {
    super(peers);
  }

  public getAvailableAgents(type: string) {
    const agentsAlow: peerAgent[] = [];
    const typeA = constants.peerTypes.AGENT;
    const typeS = constants.peerTypes.STRANGER;

    this._peers.forEach((peer) => {
      const agent = peer as peerAgent;
      if (type === typeS && agent.allowConnectionFromStrangers == true) {
        agentsAlow.push(agent);
      }
      if (type === typeA && agent.allowConnectionFromAgents == true) {
        agentsAlow.push(agent);
      }
    });
    return agentsAlow;
  }

  public addAgent(id: string, type: string): peerAgent {
    const randomNames: string[] = [
      "Linton Fernandes",
      "Tomas Fernandes",
      "Sandra Antunes",
      " Xavier Fernandes",
      "Pedro Albuquerque",
      "Silvia Pistolino",
      "Maria Madalena",
      "Doctor Stranger",
    ];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const peer = new peerAgent(id, type, name);
    this.addPeer(peer);
    return peer;
  }

  public removeAgent(socketId: string): peerAgent | null {
    let removedAgent: peerAgent | null = null;
    removedAgent = this.removePeer(socketId) as peerAgent;

    if (removedAgent) {
      logger.log(
        this.constructor.name,
        "removeAgent - executed | Agent Data: ",
        [removedAgent]
      );
    } else {
      logger.log(
        this.constructor.name,
        "removeAgent - Failed!!  Agent Id: " + socketId
      );
    }
    return removedAgent;
  }

  public setAgentAvailableStatus(
    id: string,
    allow: boolean,
    peerType: string
  ): peerAgent | null {
    const agent = this.getPeer(id) as peerAgent;
    if (agent) {
      switch (peerType) {
        case constants.peerTypes.STRANGER:
          agent.allowConnectionFromStrangers = allow;
          return agent;
        case constants.peerTypes.AGENT:
          agent.allowConnectionFromAgents = allow;
          return agent;
      }
    }
    return null;
  }
}
