import { errorHandler } from "../../errors/errors.js";
import callButtonsElements from "./callButtons.elements.js";
import btnEH from "./callButtons.eventHandler.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { fnVoidAnyArguments } from "../../types/types.js";

export class callButtons {
  public static createButton() {
    /*   try {
      const buttons = callButtonsElements.createButtons(chatButons);
      const elName = "main_container";
      const el = document.getElementById(elName);
      validatorHelper.checkHTMLElement(el, elName);
      const dash = el as HTMLDivElement;
      dash.appendChild(messenger);
    } catch (error:unknown) {
      errorHandler.propagateErrorUI(this, error, this.createButton.name);
    }
  } */
  }
  public static createFinishCallButton(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    fnEndCall: fnVoidAnyArguments | null
  ): HTMLDivElement {
    /* 
    <div class="finish_call_button_container" id="finish_call_button_container">
        <button class="call_button_small" id="finish_call_button">
          <img src="./utils/images/hangUp.png">
        </button>
    </div> 
    */
    try {
      const btnC = callButtonsElements.createFinishCallButton();
      if (fnEndCall) {
        const btn = callButtonsElements.getFinishCallButton(btnC);
        btnEH.registerFinishCallButtonEvent(cParams, cDetails, btn, fnEndCall);
      }
      return btnC;
    } catch (error: unknown) {
      const method = this.createFinishCallButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
