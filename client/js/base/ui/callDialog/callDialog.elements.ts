/**
 * @file callDialog.elements.ts
 * @class callDialogElements
 *
 * @description
 * Handles all DOM creation and querying for the call dialog component.
 * Builds the full dialog structure from sub-elements and provides accessors for
 * each interactive button. Called exclusively by callDialog and callDialogEventHandler.
 *
 * @staticMethods — creation
 * - createCallDialog(cType, name, isIncoming): HTMLDivElement
 *     Builds the complete dialog tree (container → wrapper → content).
 * - getCallDialogContainer(): HTMLDivElement        (throws if absent)
 * - getCallDialogContainerIfExists(): HTMLDivElement | null  (null-safe)
 * - getAcceptCallButton(): HTMLButtonElement         (id: call_dialog_accept_call_button)
 * - getRejectCallButton(): HTMLButtonElement         (id: call_dialog_reject_call_button)
 * - getHangupCallButton(): HTMLButtonElement         (id: call_dialog_hang_up_call_button)
 * - closeCallDialog(): void                          (removes container; throws if absent)
 * - closeCallDialogIfOpen(): void                    (null-safe remove)
 *
 * Button rendering by direction:
 * - Incoming call: Accept button + Reject button
 * - Outgoing call: HangUp button only
 *
 * @see callDialogReferences  - (./callDialog.references.ts) id/class name constants
 * @see callDialogTexts       - (./callDialog.texts.ts) dialog title text helper
 */
import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";
import references from "./callDialog.references.js";
import callDialogText from "./callDialog.texts.js";

export default class callDialogElements {
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
          <button class="dialog_accept_call_button">
            <img src="./utils/images/acceptCall.png">
          </button>
          <button class="dialog_reject_call_button">
            <img src="./utils/images/rejectCall.png">
          </button>              
        </div>
      </div>
    </div>
  </div>
*/

  public static createCallDialog(
    cType: string,
    name: string,
    isIncoming: boolean
  ): HTMLDivElement {
    const dialogC = this.createCallDialogContainer();
    const wrapper = this.createCallDialogWrapper();
    const content = this.createCallDialogContent(cType, name, isIncoming);
    wrapper.appendChild(content);
    dialogC.appendChild(wrapper);

    return dialogC;
  }

  private static createCallDialogContainer(): HTMLDivElement {
    /* <div class="dialog_container" id="call_dialog"> */
    const dialogContainer = document.createElement("div") as HTMLDivElement;
    dialogContainer.classList.add(references.classes.call_dialog_container);
    dialogContainer.id = references.IDs.call_dialog_container;
    return dialogContainer;
  }

  private static createCallDialogWrapper(): HTMLDivElement {
    /**  <div class="dialog_wrapper"></div> */
    const wrapper = document.createElement("div") as HTMLDivElement;
    wrapper.classList.add(references.classes.call_dialog_wrapper);
    return wrapper;
  }

  private static createCallDialogContent(
    callType: string,
    name: string,
    isIncoming: boolean
  ): HTMLDivElement {
    /* 
  <div class="dialog_content">
    <p class="dialog_title">Calling for [calltype]...</p>
    <div class="dialog_image_container">
        <img src="./utils/images/dialogAvatar.png">
    </div>
    <div class="dialog_button_container">
      <button class="dialog_reject_call_button">
        <img src="./utils/images/hangUp.png">
      </button>
      <button class="dialog_accept_call_button">
        <img src="./utils/images/acceptCall.png">
      </button>
      <button class="dialog_reject_call_button">
        <img src="./utils/images/rejectCall.png">
      </button>              
    </div>
  </div>    
  */
    const content = document.createElement("div") as HTMLDivElement;
    content.classList.add(references.classes.call_dialog_content);
    const title = this.createCallDialogTitle(callType, name, isIncoming);
    const avatar = this.createCallDialogAvatar();
    const buttonC = this.createCallDialogButtons(isIncoming);

    content.appendChild(title);
    content.appendChild(avatar);
    content.appendChild(buttonC);
    return content;
  }

  private static createCallDialogTitle(
    ctype: string,
    name: string,
    isIncoming: boolean
  ): HTMLParagraphElement {
    /* <p class="dialog_title">Calling for [calltype]...</p> */
    const titleText = callDialogText.title(ctype, name, isIncoming);
    const title = document.createElement("p") as HTMLParagraphElement;
    title.classList.add(references.classes.call_dialog_title);
    title.innerHTML = titleText;
    return title;
  }

  private static createCallDialogAvatar(): HTMLDivElement {
    /* 
    <div class="dialog_image_container">
        <img src="./utils/images/dialogAvatar.png">
    </div>
     */
    const imgC = document.createElement("div") as HTMLDivElement;
    imgC.classList.add(references.classes.call_dialog_image_container);
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/dialogAvatar.png";
    imgC.appendChild(img);
    return imgC;
  }

  private static createCallDialogButtons(isIncoming: boolean): HTMLDivElement {
    /**    
    <div class="dialog_button_container">
      <button class="dialog_reject_call_button">
        <img src="./utils/images/hangUp.png">
      </button>
      <button class="dialog_accept_call_button">
        <img src="./utils/images/acceptCall.png">
      </button>
      <button class="dialog_reject_call_button">
        <img src="./utils/images/rejectCall.png">
      </button>
    </div>    
    */
    const btnC = this.createButtonContainer();
    if (isIncoming) {
      btnC.appendChild(this.createAcceptCallButton());
      btnC.appendChild(this.createRejectCallButton());
    } else {
      btnC.appendChild(this.createHangUpCallButton());
    }
    return btnC;
  }
  private static createButtonContainer(): HTMLDivElement {
    /* <div class="dialog_button_container"></div> */
    const btnC = document.createElement("div") as HTMLDivElement;
    btnC.classList.add(references.classes.call_dialog_button_container);
    return btnC;
  }

  private static createAcceptCallButton(): HTMLButtonElement {
    /* 
    <button class="dialog_accept_call_button">
     <img src="./utils/images/acceptCall.png">
    </button>
     */
    const btn = document.createElement("button") as HTMLButtonElement;
    btn.classList.add(references.classes.call_dialog_accept_call_button);
    btn.id = references.IDs.call_dialog_accept_call_button;
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/acceptCall.png";
    btn.appendChild(img);

    return btn;
  }

  private static createRejectCallButton(): HTMLButtonElement {
    /**    
    <button class="dialog_reject_call_button">
      <img src="./utils/images/rejectCall.png">
    </button>
    */
    const btn = document.createElement("button") as HTMLButtonElement;
    btn.classList.add(references.classes.call_dialog_reject_call_button);
    btn.id = references.IDs.call_dialog_reject_call_button;
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/rejectCall.png";
    btn.appendChild(img);

    return btn;
  }
  private static createHangUpCallButton(): HTMLButtonElement {
    /**    
    <button class="dialog_reject_call_button">
      <img src="./utils/images/hangUp.png">
    </button>
    */
    const btn = document.createElement("button") as HTMLButtonElement;
    btn.classList.add(references.classes.call_dialog_reject_call_button);
    btn.id = references.IDs.call_dialog_hang_up_call_button;
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/hangUp.png";
    btn.appendChild(img);

    return btn;
  }
  public static getCallDialogContainer(): HTMLDivElement {
    try {
      const elName = references.IDs.call_dialog_container;
      const dialogC = document.getElementById(elName);
      validatorHelper.checkHTMLElement(dialogC, elName);
      return dialogC as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getCallDialogContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static getCallDialogContainerIfExists(): HTMLDivElement | null {
    const elName = references.IDs.call_dialog_container;
    const dialogC = document.getElementById(elName);
    return dialogC ? (dialogC as HTMLDivElement) : null;
  }

  public static closeCallDialog() {
    try {
      const dialog = this.getCallDialogContainer();
      dialog.remove();
    } catch (error: unknown) {
      errorHandler.propagateErrorUI(
        this.name,
        error,
        this.closeCallDialog.name
      );
    }
  }
  public static closeCallDialogIfOpen() {
    const dialog = this.getCallDialogContainerIfExists();
    if (dialog !== null) dialog.remove();
  }

  public static getHangupCallButton(): HTMLButtonElement {
    try {
      const elName = references.IDs.call_dialog_hang_up_call_button;
      const btn = document.getElementById(elName);
      validatorHelper.checkHTMLElement(btn, elName);
      return btn as HTMLButtonElement;
    } catch (error: unknown) {
      errorHandler.propagateErrorUI(
        this.name,
        error,
        this.getHangupCallButton.name
      );
    }
  }

  public static getAcceptCallButton(): HTMLButtonElement {
    try {
      const elName = references.IDs.call_dialog_accept_call_button;
      const btn = document.getElementById(elName);
      validatorHelper.checkHTMLElement(btn, elName);
      return btn as HTMLButtonElement;
    } catch (error: unknown) {
      const method = this.getAcceptCallButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getRejectCallButton(): HTMLButtonElement {
    try {
      const elName = references.IDs.call_dialog_reject_call_button;
      const btn = document.getElementById(elName);
      validatorHelper.checkHTMLElement(btn, elName);
      return btn as HTMLButtonElement;
    } catch (error: unknown) {
      const method = this.getRejectCallButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
