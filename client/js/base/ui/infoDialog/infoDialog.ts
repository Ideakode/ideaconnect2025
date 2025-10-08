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
