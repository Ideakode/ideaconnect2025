/**
 * @file uiAgent.service.ts
 * @class uiAgentService
 *
 * @description
 * Orchestrates all UI operations for the agent. Acts as the single point of contact
 * between use cases and the agent's UI components, preventing use cases from importing
 * UI modules directly.
 *
 * @staticMethods
 * - initializeUI(cParams)
 *     Bootstrap: creates the root container, then registers click handlers for both
 *     allowConnections checkboxes (strangers and agents). Called once by agentInitialization.
 *
 * - refreshTotalStrangers(totalStrangers)
 *     Updates the #stranger_total_available span with the latest connected stranger count.
 *     Called by the totalStrangers use case.
 *
 * - setAgentName(name)
 *     Updates the #agent_name span in the dashboard. Called by the peerInfo use case.
 *
 * - refreshAvailableForConnections(forPeer, allow)
 *     Shows or hides the checkmark image inside the allowConnections checkbox for the given
 *     peer type. Called by availableForConnections use case before updating the store.
 *
 * - openIncomingCallDialog(cParams, cDetails)
 *     Opens the incoming call dialog attached to the root container, wiring
 *     callAccepted.execute and callRejected.execute as accept/reject callbacks.
 *
 * - closeIncomingCallDialog()
 *     Closes the call dialog if open. Called on rejection, cancellation, or not-found.
 *
 * - openInfoDialog(infoType, clback, delay?, store?)
 *     Opens an auto-closing info dialog attached to the root container.
 *     Used to show CANCEL / NOT_FOUND status messages after call events.
 *
 * @see ui.*  - all agent and base UI component modules
 */
import * as constants from "../constants/constants.js";
import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import * as ui from "../ui/ui.js";
import { errorHandler } from "../errors/errors.js";
import { logger } from "../logs/logs.js";
import { callRejected, callAccepted } from "../useCases/call/call.js";
import { storeA } from "../classes/classes.js";
import { fnVoidStoreArgument } from "../types/types.js";

export default class uiAgentService {
  public static initializeUI(cParams: ICommonParams.commonParams) {
    try {
      const peerS = constants.peerTypes.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      
      //create the rootContainer
      const rootContainerId =  ui.rootAgent.initializeRootElements(); 
      
      //create the default view
      ui.views.defaultView.create(rootContainerId);
      
      //register the events
      const forPeers = [peerS, peerA];
      ui.allowConnections.registerAllowConnectionsEvents(cParams, forPeers);

    } catch (error: unknown) {
      const method = this.initializeUI.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static refreshTotalStrangers(totalStrangers: string) {
    try {
      logger.log(this.name, "refreshTotalStrangers | Data: " + totalStrangers);
      ui.totalStrangers.updateTotalStrangersBox(totalStrangers);
    } catch (error: unknown) {
      const method = this.refreshTotalStrangers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static setAgentName(name: string) {
    try {
      logger.log(this.name, "setAgentName | Data: " + name);
      ui.dashboard.setPeerName(name);
    } catch (error: unknown) {
      const method = this.refreshTotalStrangers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static refreshAvailableForConnections(
    forPeer: string,
    allow: boolean
  ) {
    try {
      ui.allowConnections.setAllowConnectionsCheckBox(allow, forPeer);
    } catch (error: unknown) {
      const method = this.refreshAvailableForConnections.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static openIncomingCallDialog(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails
  ) {
    try {
      const mainC = ui.rootAgent.getIDs().root_container;
      const fnA = callAccepted.execute;
      const fnR = callRejected.execute;
      ui.callDialog.openIncomingCallDialog(
        cParams,
        cDetails,
        "",
        mainC,
        fnA,
        fnR
      );
    } catch (error: unknown) {
      const method = this.openIncomingCallDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static closeIncomingCallDialog() {
    try {
      ui.callDialog.closeCallDialogIfOpen();
    } catch (error: unknown) {
      const method = this.closeIncomingCallDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static openInfoDialog(
    infoType: string,
    clback: fnVoidStoreArgument,
    delay: number = 1,
    store: storeA | null = null
  ) {
    try {
      const attachToId = ui.rootAgent.getIDs().root_container;
      ui.infoDialog.openInfoDialog(infoType, attachToId, clback, delay, store);
    } catch (error: unknown) {
      const method = this.openInfoDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
