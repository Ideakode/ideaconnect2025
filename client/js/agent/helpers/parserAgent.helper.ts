/**
 * @file parserAgent.helper.ts
 * @class parserAgentHelper
 *
 * @description
 * Agent-specific parser helper. Extends parserHelper with one additional method for
 * safely casting an unknown value to storeA (storeAgentClass). All base parse methods
 * are inherited and available to agent use cases via this class.
 *
 * @extends parserHelper  - (client/js/base/helpers/parser.helper.ts)
 *
 * @staticMethods (agent-specific)
 * - parseStoreAgent(storeA): storeA
 *     Calls validatorAgentHelper.checkStoreAgent to confirm the value has the agent-specific
 *     availableForClients / availableForAgents properties before casting.
 *     Throws parserErrorClass on failure.
 *
 * @see validatorAgentHelper  - provides checkStoreAgent used by this method
 */
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
