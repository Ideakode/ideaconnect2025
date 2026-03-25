/**
 * @file uiStranger.service.ts
 * @class uiStrangerService  (exported as uiSSvc)
 *
 * @description
 * Orchestrates all UI operations for the stranger. Acts as the single
 * point of contact between use cases and the stranger's UI components,
 * preventing use cases from importing UI modules directly.
 *
 * @staticMethods
 * - initializeUI()
 *     Bootstrap: creates the root container, then creates the default view
 *     (agent listing) inside it. Called once by strangerInitialization.
 *
 * - refreshAvailableAgents(cParams)
 *     Delegates to listingAgents.refreshAgents to re-render the agent list
 *     from the latest store data. Called by the availableAgents use case.
 *
 * - openCallDialog(cParams, cDetails, nameA, fnHangup)
 *     Opens the outgoing call dialog attached to the root container, passing
 *     callHangedUp.execute as the hangup callback.
 *
 * - closeCallDialog()
 *     Closes the call dialog if one is currently open.
 *
 * - openInfoDialog(infoType, clback, delay?, store?)
 *     Opens an auto-closing info dialog for call status messages
 *     (REJECTED, CANCELLED, NOT_FOUND, BUSY). Calls clback when it closes.
 *
 * - closeInfoDialog()
 *     Closes the info dialog if one is open.
 *
 * - getChatMessageText()
 *     Returns the current text in the messenger input. Called by sendChatMessage.
 *
 * - switchToDefaultView()
 *     Destroys the chat view and shows the default (agent listing) view.
 *     Called by callEnded.
 *
 * - switchToChatView(cParams, cDetailsToAttach, fnSendMsg, fnEndCall)
 *     Hides the default view, destroys any existing chat view, and creates
 *     a new chat view with the messenger and end-call button. Called by callAccepted.
 *
 * - refreshChatView(cParams)
 *     Refreshes the messenger state (e.g. call state label). Called by dataChannelOpen.
 *
 * @see ui.*  — all stranger and base UI component modules
 */
import { errorHandler } from "../errors/errors.js";
import { validatorSHelper } from "../helpers/helpers.js";
import { storeS } from "../classes/classes.js";
import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import * as ui from "../ui/ui.js";
import { fnVoidAnyArguments, fnVoidStoreArgument } from "../types/types.js";

export default class uiStrangerService {
  public static initializeUI() {
    try {
      ui.rootStranger.initializeRootElements();
      const attachToId = ui.rootStranger.getIDs().root_container;
      ui.views.defaultView.create(attachToId);
    } catch (error: unknown) {
      const method = this.initializeUI.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static refreshAvailableAgents(cParams: ICommonParams.commonParams) {
    try {
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      ui.listingAgents.refreshAgents(cParams);
    } catch (error: unknown) {
      const method = this.refreshAvailableAgents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static openCallDialog(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    nameA: string,
    fnHangup: fnVoidAnyArguments
  ) {
    try {
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      validator.checkCallDetailsInterface(cDetails);
      const mainC = ui.rootStranger.getIDs().root_container;
      ui.callDialog.openOutgoingCallDialog(
        cParams,
        cDetails,
        nameA,
        mainC,
        fnHangup
      );
    } catch (error: unknown) {
      const method = this.openCallDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static closeCallDialog() {
    try {
      ui.callDialog.closeCallDialogIfOpen();
    } catch (error: unknown) {
      const method = this.closeCallDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static openInfoDialog(
    infoType: string,
    clback: fnVoidStoreArgument,
    delay: number = 1,
    store: storeS | null = null
  ) {
    try {
      const attachToId = ui.rootStranger.getIDs().root_container;
      ui.infoDialog.openInfoDialog(infoType, attachToId, clback, delay, store);
    } catch (error: unknown) {
      const method = this.openInfoDialog.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static closeInfoDialog() {
    ui.infoDialog.closeInfoDialogIfOpen();
  }

  public static getChatMessageText(): string {
    try {
      return ui.messenger.getChatMessageText();
    } catch (error) {
      const method = this.getChatMessageText.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static switchToDefaultView() {
    try {
      ui.views.chatView.destroy();
      ui.views.defaultView.show();
      /*   ui.callButtons.delete;
      ui.rootStranger.showDefaultView(); */
    } catch (error) {
      const method = this.switchToDefaultView.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static switchToChatView(
    cParams: ICommonParams.commonParams,
    cDetailsToAttach: ICallDetails.callDetails,
    fnSendMsg: fnVoidAnyArguments | null,
    fnEndCall: fnVoidAnyArguments | null
  ) {
    try {
      const attachToId = ui.rootStranger.getIDs().root_container;
      ui.views.defaultView.hide();
      ui.views.chatView.destroyIfExists();
      this.closeCallDialog();
      ui.views.chatView.create(
        cParams,
        cDetailsToAttach,
        attachToId,
        fnSendMsg,
        fnEndCall
      );
    } catch (error: unknown) {
      const method = this.switchToChatView.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static refreshChatView(cParams: ICommonParams.commonParams) {
    ui.views.chatView.refresh(cParams);
  }
}
