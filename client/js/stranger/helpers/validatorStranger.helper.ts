import { validatorHelper } from "../../base/helpers/helpers.js";
import { errorHandler, errorBuilder } from "../errors/errors.js";
import { storeS } from "../classes/classes.js";

export default class validatorStrangerHelper extends validatorHelper {
  public static checkStoreStranger(data: unknown) {
    if (!this.isStoreStranger(data)) {
      const method = this.checkStoreStranger.name;
      const err = errorBuilder.storeSNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }

  private static isStoreStranger(data: unknown): data is storeS {
    return this.isStore(data) && (data as storeS).availableAgents !== undefined;
  }
}
