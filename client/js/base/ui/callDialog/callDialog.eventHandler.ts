/**
 * @file callDialog.eventHandler.ts
 * @class callDialogEventHandler
 *
 * @description
 * Registers DOM click event listeners on the call dialog's buttons.
 * Each method retrieves the button via callDialogElements, then attaches a click listener
 * that forwards (cParams, cDetails) to the provided callback use case function.
 *
 * @staticMethods
 * - registerAcceptCallButtonEvent(cParams, cDetails, fnAccept)
 *     Binds click on #call_dialog_accept_call_button → calls fnAccept(cParams, cDetails).
 * - registerRejectCallButtonEvent(cParams, cDetails, fnReject)
 *     Binds click on #call_dialog_reject_call_button → calls fnReject(cParams, cDetails).
 * - registerHangUpCallButtonEvent(cParams, cDetails, fnHangup)
 *     Binds click on #call_dialog_hang_up_call_button → calls fnHangup(cParams, cDetails).
 *
 * @see callDialog         - registers these handlers after opening the dialog
 * @see callDialogElements - provides the button element references
 */
import callDialogElements from "./callDialog.elements.js";
import { errorHandler } from "../../errors/errors.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";

import { fnVoidAnyArguments } from "../../types/types.js";

export default class callDialogEventHandler {
  public static registerRejectCallButtonEvent(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    fnReject: fnVoidAnyArguments
  ) {
    try {
      const btn = callDialogElements.getRejectCallButton();
      btn.addEventListener("click", () => {
        fnReject(cParams, cDetails);
      });
    } catch (error: unknown) {
      const method = this.registerRejectCallButtonEvent.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static registerAcceptCallButtonEvent(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    fnAccept: fnVoidAnyArguments
  ) {
    try {
      const btn = callDialogElements.getAcceptCallButton();
      btn.addEventListener("click", () => {
        fnAccept(cParams, cDetails);
      });
    } catch (error: unknown) {
      const method = this.registerAcceptCallButtonEvent.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static registerHangUpCallButtonEvent(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    fnHangup: fnVoidAnyArguments
  ) {
    try {
      const btn = callDialogElements.getHangupCallButton();
      btn.addEventListener("click", () => {
        fnHangup(cParams, cDetails);
      });
    } catch (error: unknown) {
      const method = this.registerHangUpCallButtonEvent.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
