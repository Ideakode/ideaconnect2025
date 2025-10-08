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
