/**
 * @file callButtons.eventHandler.ts
 * @class callByttonEventHandler   (note: typo in class name — matches source)
 *
 * @description
 * Registers DOM click event listeners on in-call action buttons.
 *
 * @staticMethods
 * - registerFinishCallButtonEvent(cParams, cDetailsToAttach, btn, fnFinish)
 *     Attaches a click listener to the supplied button element.
 *     On click, calls fnFinish(cParams, cDetailsToAttach).
 *     cDetailsToAttach is captured via closure so it reflects the call state
 *     at registration time, not at click time.
 *
 * @see callButtons  - calls this after creating the finish-call button
 */
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
