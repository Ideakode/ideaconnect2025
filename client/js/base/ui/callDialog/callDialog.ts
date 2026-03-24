/**
 * @file callDialog.ts
 * @class callDialog
 *
 * @description
 * Public API for the call dialog UI component. Shown when an incoming or outgoing call
 * is in the ALERTING state. Delegates DOM work to callDialogElements and event binding
 * to callDialogEventHandler.
 *
 * The dialog is created dynamically and appended to a specified container element,
 * then removed (via closeCallDialogIfOpen) when the call is accepted, rejected, or
 * cancelled. Calling open* always closes any existing dialog first.
 *
 * @html
 * <div class="dialog_container" id="call_dialog">
 *   <div class="dialog_wrapper">
 *     <div class="dialog_content">
 *       <p class="dialog_title">...</p>
 *       <div class="dialog_image_container"><img dialogAvatar.png></div>
 *       <div class="dialog_button_container">
 *         [accept + reject buttons (incoming) | hangup button (outgoing)]
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * @staticMethods
 * - openIncomingCallDialog(cParams, cDetails, name, attachToId, fnAccept, fnReject)
 *     Creates the dialog with Accept + Reject buttons and registers their click handlers.
 * - openOutgoingCallDialog(cParams, cDetails, name, attachToId, fnHangUp)
 *     Creates the dialog with a HangUp button and registers its click handler.
 * - closeCallDialogIfOpen()
 *     Removes the dialog from the DOM if it exists. Safe to call when dialog is absent.
 *
 * @see callDialogElements     - (./callDialog.elements.ts) DOM creation and queries
 * @see callDialogEventHandler - (./callDialog.eventHandler.ts) button event registration
 */
import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { fnVoidAnyArguments } from "../../types/types.js";
import callDialogEH from "./callDialog.eventHandler.js";
import elements from "./callDialog.elements.js";

export class callDialog {
  /**
<div class="dialog_container" id="call_dialog">
  <div class="dialog_wrapper">
    <div class="dialog_content">
      <p class="dialog_title">Calling for [calltype]...</p>
        <div class="dialog_image_container">
          <img src="./utils/images/dialogAvatar.png">
        </div>
        <div class="dialog_button_container">
          <button class="dialog_reject_call_button">
            <img src="./utils/images/hangUp.png">
          </button>
        </div>
    </div>
  </div>
</div>
*/

  public static openIncomingCallDialog(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    name: string,
    attachToId: string,
    fnAccept: fnVoidAnyArguments | null, //(cParams: cParamIf, cDetails: cDetailsIf) => void | null,
    fnReject: fnVoidAnyArguments | null
  ) {
    //close dialog first if Open
    this.closeCallDialogIfOpen();
    try {
      const cType = cDetails.callType;
      const fromName = cDetails.callingPartyName
        ? cDetails.callingPartyName
        : "";
      const dialog = elements.createCallDialog(cType, fromName, true);
      const elToAttach = document.getElementById(attachToId);
      validatorHelper.checkHTMLElement(elToAttach, attachToId);
      (elToAttach as HTMLElement).appendChild(dialog);
      if (fnAccept)
        callDialogEH.registerAcceptCallButtonEvent(cParams, cDetails, fnAccept);
      if (fnReject)
        callDialogEH.registerRejectCallButtonEvent(cParams, cDetails, fnReject);
    } catch (error: unknown) {
      const method = this.openIncomingCallDialog.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static openOutgoingCallDialog(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    name: string,
    attachToId: string,
    fnHangUp: fnVoidAnyArguments | null
  ) {
    //close dialog first if Open
    this.closeCallDialogIfOpen();
    try {
      const cType = cDetails.callType;
      const dialog = elements.createCallDialog(cType, name, false);
      const elToAttach = document.getElementById(attachToId);
      validatorHelper.checkHTMLElement(elToAttach, attachToId);
      (elToAttach as HTMLElement).appendChild(dialog);
      if (fnHangUp)
        callDialogEH.registerHangUpCallButtonEvent(cParams, cDetails, fnHangUp);
    } catch (error: unknown) {
      const method = this.openOutgoingCallDialog.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  /* public static startCallDialog(
    cParams: cParamIf,
    cDetails: ICallDetails.callDetails,
    name: string,
    isOutgoing: boolean,
    attachToId: string,
    fnAccept: fnVoidAnyArguments | null, //(cParams: cParamIf, cDetails: cDetailsIf) => void | null,
    fnReject: fnVoidAnyArguments | null,
    fnHangUp: fnVoidAnyArguments | null
  ) {
    //close dialog first if Open
    this.closeCallDialogIfOpen();
    try {
      const cType = cDetails.callType;
      const dialog = elements.createCallDialog(cType, name, isOutgoing);
      const elToAttach = document.getElementById(attachToId);
      validatorHelper.checkHTMLElement(elToAttach, attachToId);
      (elToAttach as HTMLElement).appendChild(dialog);
      if (fnAccept)
        callDialogEH.registerAcceptCallButtonEvent(cParams, cDetails, fnAccept);
      if (fnReject)
        callDialogEH.registerRejectCallButtonEvent(cParams, cDetails, fnReject);
      if (fnHangUp)
        callDialogEH.registerHangUpCallButtonEvent(cParams, cDetails, fnHangUp);
    } catch (error: unknown) {
      errorHandler.propagateErrorUI(this, error, this.startCallDialog.name);
    }
  } */

  public static closeCallDialogIfOpen() {
    elements.closeCallDialogIfOpen();
  }
}
