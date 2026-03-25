/**
 * @file parserStranger.helper.ts
 * @class parserStrangerHelper  (exported as parserSHelper)
 *
 * @description
 * Extends the base parserHelper with a stranger-specific parse method.
 * parseStoreStranger validates and casts an unknown value to storeS,
 * using validatorSHelper.checkStoreStranger internally.
 *
 * @staticMethods
 * - parseStoreStranger(storeS)
 *     Validates that storeS is a valid storeStrangerClass instance and
 *     returns it as storeS. Propagates errors through errorHandler.
 *
 * @see validatorSHelper.checkStoreStranger
 */
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
