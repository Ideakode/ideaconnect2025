/**
 * @file storeStranger.service.ts
 * @class storeStrangerService  (exported as storeSSvc)
 *
 * @description
 * Extends the base storeSvc with stranger-specific store operations.
 *
 * @staticMethods
 * - createStore()
 *     Instantiates and returns a new storeS (storeStrangerClass).
 *     Called once by strangerInitialization.
 *
 * - refreshAvailableAgents(store, data)
 *     Parses the incoming IPeers.peers data, validates the store and
 *     assigns the result to store.availableAgents.
 *     Called by the availableAgents use case.
 *
 * @see storeS
 * @see availableAgents use case
 */
import { storeSvc } from "../../base/services/services.js";
import { IPeers } from "../interfaces/interfaces.js";
import { parserSHelper, validatorSHelper } from "../helpers/helpers.js";
import { storeS } from "../classes/classes.js";
import { errorHandler } from "../errors/errors.js";

export class storeStrangerService extends storeSvc {
  public static refreshAvailableAgents(store: storeS, data: IPeers.peers) {
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      validator.checkStoreStranger(store);
      const agents = parser.parsePeersInterface(data);
      store.availableAgents = agents;
    } catch (error: unknown) {
      const method = this.refreshAvailableAgents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static createStore(): storeS {
    return new storeS();
  }
}
