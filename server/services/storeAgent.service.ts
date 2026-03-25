/**
 * @file storeAgent.service.ts
 * @class storeAgentService  (exported as storeAS)
 *
 * @description
 * Stateless service layer for all agent store operations. All methods are static
 * and accept the storeA instance as a parameter so the service itself holds no
 * state. Validates the store before delegating to storeAgentClass methods.
 *
 * @staticMethods
 * - addAgent(agentId, storeA)
 *     Validates the store and calls storeA.addAgent; returns the new peerAgent.
 *
 * - removeAgent(agentId, storeA)
 *     Validates the store and calls storeA.removeAgent; returns true if removed.
 *
 * - setAvailbleStatus(storeA, data)
 *     Parses the allowConnections interface and calls storeA.setAgentAvailableStatus;
 *     returns true if the agent was found and updated.
 *
 * - getAvailableAgentsForStranger(storeA)
 *     Returns all agents whose allowConnectionFromStrangers flag is true.
 *
 * - getAgentIDs(storeA)
 *     Returns an array of all connected agent socket IDs.
 *
 * - getAgentById(storeA, id)
 *     Returns the peer with the given socket ID, or undefined.
 *
 * @see storeAgentClass — underlying store
 */
import { IAllowConnections } from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { peer, peerAgent, storeA } from "../classes/classes.js";
import { parserHelper, validatorHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";

export class storeAgentService {
  public static setAvailbleStatus(
    storeA: storeA,
    data: IAllowConnections.allowConnections
  ): boolean {
    try {
      //Available for connection from AGENTS
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      const allowC = parserHelper.parseAllowConnectionsInterface(data);
      const id = allowC.socketId;
      const allow = allowC.allow;
      const peerType = allowC.peerType;
      return storeA.setAgentAvailableStatus(id, allow, peerType) !== null;
    } catch (error: unknown) {
      const method = this.setAvailbleStatus.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static addAgent(agentId: string, storeA: storeA): peerAgent {
    try {
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      return storeA.addAgent(agentId, peerA);
    } catch (error: unknown) {
      const method = this.addAgent.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static removeAgent(agentId: string, storeA: storeA): boolean {
    try {
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      return storeA.removeAgent(agentId) != null;
    } catch (error: unknown) {
      const method = this.removeAgent.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static getAvailableAgentsForStranger(storeA: storeA): peerAgent[] {
    try {
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      return storeA.getAvailableAgents(constants.peerTypes.STRANGER);
    } catch (error: unknown) {
      const method = this.getAvailableAgentsForStranger.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static getAgentIDs(storeA: storeA): string[] {
    try {
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      return storeA.getPeersIDs();
    } catch (error: unknown) {
      const method = this.getAgentIDs.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static getAgentById(storeA: storeA, id: string): peer | undefined {
    try {
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkStore(storeA, peerA);
      return storeA.getPeer(id);
    } catch (error: unknown) {
      const method = this.getAgentById.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
