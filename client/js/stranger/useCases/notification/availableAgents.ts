/**
 * @file availableAgents.ts
 * @class availableAgents
 *
 * @description
 * Use case invoked when the server delivers a fresh list of available agents
 * via a SERVER_NOTIFICATION(AVAILABLE_AGENTS) event.
 * Updates both the store and the UI so the stranger always sees
 * a current, clickable roster of agents.
 *
 * @staticMethods
 * - execute(cParams, data)
 *     1. Parses and validates cParams and the IPeers.peers data
 *     2. Calls storeSSvc.refreshAvailableAgents to persist the list
 *     3. Calls uiSSvc.refreshAvailableAgents to re-render the agent listing
 *
 * @see storeStrangerService.refreshAvailableAgents
 * @see uiStrangerService.refreshAvailableAgents
 * @see serverNotification  — caller
 */
import { storeSSvc, uiSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { ICommonParams, IPeers } from "../../interfaces/interfaces.js";

export class availableAgents {
  //when a new fresh list of available agents is received from the server:
  // Store is updated on the available agents list
  //Ui is updated with the fresh list and list events are refreshed

  public static execute(
    cParams: ICommonParams.commonParams,
    data: IPeers.peers
  ) {
    const className = "availableAgents";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      const agents = parser.parsePeersInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      //update store with fresh AvailableAgents List
      storeSSvc.refreshAvailableAgents(store, agents);
      //update UI so the fresh list becomes visible to the Stranger
      uiSSvc.refreshAvailableAgents(cParams);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
