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
