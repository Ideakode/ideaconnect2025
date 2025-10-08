import * as constants from "../constants/constants.js";
import { storeS } from "../classes/classes.js";
import { errorHandler } from "../errors/errors.js";
import { validatorHelper } from "../helpers/helpers.js";

export class storeStrangerService {
  public static getTotalConnectedStrangers(storeS: storeS): number {
    try {
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkStore(storeS, peerS);
      return storeS.peers.length;
    } catch (error: unknown) {
      const method = this.getTotalConnectedStrangers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static addStranger(id: string, storeS: storeS) {
    try {
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkStore(storeS, peerS);
      storeS.addStranger(id, peerS);
    } catch (error: unknown) {
      const method = this.addStranger.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static removeStranger(id: string, storeS: storeS): boolean {
    try {
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkStore(storeS, peerS);
      return storeS.removeStranger(id) != null;
    } catch (error: unknown) {
      const method = this.removeStranger.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static getStrangerIDs(storeS: storeS): string[] {
    try {
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkStore(storeS, peerS);
      return storeS.getPeersIDs();
    } catch (error: unknown) {
      const method = this.getStrangerIDs.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
