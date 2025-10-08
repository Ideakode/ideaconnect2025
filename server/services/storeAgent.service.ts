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
