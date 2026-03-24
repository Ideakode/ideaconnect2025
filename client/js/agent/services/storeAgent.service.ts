/**
 * @file storeAgent.service.ts
 * @class storeAgentService
 *
 * @description
 * Agent-specific store service. Extends storeService with methods for reading and writing
 * the agent's availability flags and for creating the agent's store instance.
 * All base store mutation methods are inherited.
 *
 * @extends storeService  - (client/js/base/services/store.service.ts)
 *
 * @staticMethods (agent-specific)
 * - createStore(): storeA
 *     Factory that instantiates a new storeAgentClass with all defaults (unavailable, idle).
 *     Called once by agentInitialization.execute().
 *
 * - getAllowConnectionStatus(peerType, storeA): boolean
 *     Returns availableForClients (peerType=STRANGER) or availableForAgents (peerType=AGENT).
 *     Used by agentConnected to read the current status before syncing with the server,
 *     and by availableForConnections before toggling.
 *
 * - setAllowConnectionStatus(peerType, value, storeAgent)
 *     Writes availableForClients or availableForAgents based on peerType.
 *     Called by availableForConnections after the UI checkbox is toggled.
 *
 * @see storeAgentClass  - the store type managed by this service
 */
import * as constants from "../constants/constants.js";
import { storeSvc } from "../../base/services/services.js";
import { errorHandler } from "../errors/errors.js";
import { validatorAHelper } from "../helpers/helpers.js";
import { storeA } from "../classes/classes.js";

export default class storeAgentService extends storeSvc {
  public static getAllowConnectionStatus(
    peerType: string,
    storeA: storeA
  ): boolean {
    try {
      let allow: boolean = false;
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      validatorAHelper.checkStoreAgent(storeA);
      if (peerType === peerS) {
        allow = storeA.availableForClients;
      } else if (peerType === peerA) {
        allow = storeA.availableForAgents;
      }
      return allow;
    } catch (error: unknown) {
      const method = this.getAllowConnectionStatus.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static setAllowConnectionStatus(
    peerType: string,
    value: boolean,
    storeAgent: storeA
  ) {
    try {
      const peerS = constants.peerTypes.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      validatorAHelper.checkStore(storeAgent);
      validatorAHelper.checkPeerType(peerType);
      if (peerType === peerS) {
        storeAgent.availableForClients = value;
      } else if (peerType === peerA) {
        storeAgent.availableForAgents = value;
      }
    } catch (error: unknown) {
      const method = this.setAllowConnectionStatus.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static createStore(): storeA {
    return new storeA();
  }
}
