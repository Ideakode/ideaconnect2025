import { parserHelper } from "../../base/helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";
import { storeS } from "../classes/classes.js";
import { validatorSHelper } from "../helpers/helpers.js";

export default class parserStrangerHelper extends parserHelper {
  public static parseStoreStranger(storeS: unknown): storeS {
    try {
      validatorSHelper.checkStoreStranger(storeS);
      return storeS as storeS;
    } catch (error: unknown) {
      const method = this.parseStoreStranger.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }
}
