import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";

import callButtonsReferences from "./callButtons.references.js";
export default class callButtonsElements {
  public static createFinishCallButton() {
    /**
  <div class="finish_call_button_container" id="finish_call_button_container">
    <button class="call_button_small" id="finish_call_button">
      <img src="./utils/images/hangUp.png">
    </button>
  </div>
  **/
    const cont = document.createElement("div") as HTMLDivElement;
    const css = callButtonsReferences.classes.finish_call_button_container;
    cont.classList.add(css);
    cont.id = callButtonsReferences.IDs.finish_call_button_container;
    const btn = document.createElement("button") as HTMLButtonElement;
    btn.classList.add(callButtonsReferences.classes.call_button_small);
    btn.id = callButtonsReferences.IDs.finish_call_button;
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/hangUp.png";
    btn.appendChild(img);
    cont.appendChild(btn);
    return cont;
  }

  public static getFinishCallButton(btnC: HTMLDivElement): HTMLButtonElement {
    try {
      const elName = callButtonsReferences.IDs.finish_call_button;
      const btn = btnC.querySelector("#" + elName);
      validatorHelper.checkHTMLElement(btn, elName);
      return btn as HTMLButtonElement;
    } catch (error: unknown) {
      const method = this.getFinishCallButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
