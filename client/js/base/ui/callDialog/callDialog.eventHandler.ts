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
