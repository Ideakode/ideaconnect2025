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
