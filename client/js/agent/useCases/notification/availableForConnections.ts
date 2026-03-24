/**
 * @file availableForConnections.ts
 * @class availableForConnections
 *
 * @description
 * Use case triggered when the agent clicks one of the availability checkboxes
 * (Allow Clients / Allow Agents). Reads the current flag from the store,
 * toggles it, then synchronizes UI, store, and server in that order.
 *
 * @flow
 * allowConnections (checkbox click) → availableForConnections.execute(cParams, forPeer)
 *   1. storeAgentService.getAllowConnectionStatus(forPeer, store)  — read current value
 *   2. uiAgentService.refreshAvailableForConnections(forPeer, !allow)  — update checkbox UI
 *   3. storeAgentService.setAllowConnectionStatus(forPeer, !allow, store)  — persist in store
 *   4. socketAgentService.notifyAgentAvailable(socket, !allow, forPeer)  — notify server
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see allowConnections.eventHandler — wires checkbox click → this use case
 * @see socketAgentService.notifyAgentAvailable — emits AGENT_AVAILABLE to server
 */
import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

//Agent toggled his available for Connection Flag
export class availableForConnections {
  public static execute(cParams: ICommonParams.commonParams, forPeer: string) {
    const className = "availableForConnections";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const allow = storeASvc.getAllowConnectionStatus(forPeer, store);

      //update ui
      uiASvc.refreshAvailableForConnections(forPeer, !allow);
      //update store
      storeASvc.setAllowConnectionStatus(forPeer, !allow, store);
      //notify Server
      socketASvc.notifyAgentAvailable(socket, !allow, forPeer);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
