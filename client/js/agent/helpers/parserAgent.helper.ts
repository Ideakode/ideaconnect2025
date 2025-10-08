import { parserHelper } from "../../base/helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";
import { storeA } from "../classes/classes.js";
import { validatorAHelper } from "./helpers.js";

export default class parserAgentHelper extends parserHelper {
  public static parseStoreAgent(storeA: unknown): storeA {
    try {
      validatorAHelper.checkStoreAgent(storeA);
      return storeA as storeA;
    } catch (error: unknown) {
      const method = this.parseStoreAgent.name;
      errorHandler.propagateErrorParser(this.name, error, method);
    }
  }
}
