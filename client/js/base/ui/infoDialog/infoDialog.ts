/**
 * @file infoDialog.ts
 * @class infoDialog
 *
 * @description
 * Public API for the informational dialog UI component. Used to show brief status
 * notifications to the user (e.g. "Call Rejected", "Peer Busy") after a call signaling
 * event. The dialog auto-closes after a configurable delay (in seconds) and optionally
 * fires a callback (e.g. to reset the UI back to the default view).
 *
 * @html
 * <div class="info_dialog_container" id="info_dialog_container">
 *   <div class="dialog_wrapper">
 *     <div class="dialog_content">
 *       <p class="dialog_title">[title based on infoType]</p>
 *       <div class="dialog_image_container"><img dialogAvatar.png></div>
 *       <p class="dialog_description">[description based on infoType]</p>
 *     </div>
 *   </div>
 * </div>
 *
 * @staticMethods
 * - openInfoDialog(infoType, attachToId, clbk, delay?, store?)
 *     Creates the dialog DOM, appends it to the element identified by attachToId,
 *     then registers an auto-closure timer via infoDialogEventHandler.
 *     delay defaults to 1 second. clbk is called with store when the timer fires.
 * - closeInfoDialogIfOpen(): void
 *     Null-safe removal of the dialog. Called on any premature teardown.
 *
 * @see infoDialogElements     - (./infoDialog.elements.ts) DOM creation
 * @see infoDialogEventHandler - (./infoDialog.eventHandler.ts) auto-closure timer
 * @see infoDialogTexts        - (./infoDialog.text.ts) title and description text by infoType
 */
import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";
import { fnVoidStoreArgument } from "../../types/types.js";
import { store } from "../../classes/classes.js";
import elements from "./infoDialog.elements.js";
import infoDialogEventHandler from "./infoDialog.eventHandler.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class infoDialog {
  public static openInfoDialog(
    infoType: string,
    attachToId: string,
    clbk: fnVoidStoreArgument,
    delay: number = 1,
    store: store | null = null
  ) {
    /**
      <div class="info_dialog_container">
        <div class="dialog_wrapper">
          <div class="dialog_content">
            <p class="dialog_title">Calling Rejected [calltype]...</p>
            <div class="dialog_image_container">
              <img src="./utils/images/dialogAvatar.png">
            </div>
            <p class="dialog_description"></p>
          </div>
        </div>
      </div>
    */

    try {
      const infoDialog = elements.createInfoDialog(infoType);
      const elToAttach = document.getElementById(attachToId);
      validatorHelper.checkHTMLElement(elToAttach, attachToId);
      (elToAttach as HTMLElement).appendChild(infoDialog);
      infoDialogEventHandler.registeraDialogAutoClosureEvent(
        clbk,
        delay,
        store
      );
    } catch (error: unknown) {
      const method = this.openInfoDialog.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static closeInfoDialogIfOpen() {
    elements.closeInfoDialogIfOpen();
  }
}
