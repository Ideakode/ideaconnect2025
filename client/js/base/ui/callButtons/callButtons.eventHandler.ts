import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";

import { fnVoidAnyArguments } from "../../types/types.js";
import { errorHandler } from "../../errors/errors.js";

export default class callByttonEventHandler {
  public static registerFinishCallButtonEvent(
    cParams: ICommonParams.commonParams,
    cDetailsToAttach: ICallDetails.callDetails,
    btn: HTMLElement,
    fnFinish: fnVoidAnyArguments
  ) {
    try {
      btn.addEventListener("click", () => {
        fnFinish(cParams, cDetailsToAttach);
      });
    } catch (error) {
      const method = this.registerFinishCallButtonEvent.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
