import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";
import inforDialogText from "./infoDialog.text.js";
import references from "./infoDialog.references.js";
import infoDialogReferences from "./infoDialog.references.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export default class infoDialogElements {
  public static createInfoDialog(infoType: string): HTMLDivElement {
    /**
      <div class="info_dialog_container" id="info_dialog_container">
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
      const container = this.createInfoDialogContainer();
      const wrapper = this.createInfoDialogWrapper();
      const content = this.createInfoDialogContent(infoType);
      wrapper.appendChild(content);
      container.appendChild(wrapper);
      return container;
    } catch (error: unknown) {
      const method = this.createInfoDialog.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createInfoDialogContent(infoType: string): HTMLDivElement {
    /**
      <div class="dialog_content">
        <p class="dialog_title">Calling Rejected [calltype]...</p>
        <div class="dialog_image_container">
          <img src="./utils/images/dialogAvatar.png">
        </div>
        <p class="dialog_description"></p>
      </div>
    */

    const content = document.createElement("div") as HTMLDivElement;
    content.classList.add(references.classes.info_dialog_content);
    const title = this.createInfoDialogTitle(infoType);
    const desc = this.createInfoDialogDescription(infoType);
    const avatar = this.createInfoDialogAvatar();
    content.appendChild(title);
    content.appendChild(avatar);
    content.appendChild(desc);
    return content;
  }

  private static createInfoDialogAvatar(): HTMLDivElement {
    /* 
    <div class="dialog_image_container">
        <img src="./utils/images/dialogAvatar.png">
    </div>
    */
    const imgC = document.createElement("div") as HTMLDivElement;
    imgC.classList.add(references.classes.info_dialog_image_container);
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "./utils/images/dialogAvatar.png";
    imgC.appendChild(img);
    return imgC;
  }

  private static createInfoDialogTitle(infoType: string): HTMLParagraphElement {
    /* <p class="dialog_title">Calling Rejected [calltype]...</p> */
    const title = document.createElement("p") as HTMLParagraphElement;
    title.classList.add(references.classes.info_dialog_title);
    const text = inforDialogText.getTitle(infoType);
    title.innerHTML = text;
    return title;
  }
  private static createInfoDialogDescription(
    infoType: string
  ): HTMLParagraphElement {
    /* <p class="dialog_description">Dialog info Description...</p> */
    const desc = document.createElement("p") as HTMLParagraphElement;
    desc.classList.add(references.classes.info_dialog_description);
    const text = inforDialogText.getDescription(infoType);
    desc.innerHTML = text;
    return desc;
  }

  private static createInfoDialogWrapper(): HTMLDivElement {
    /**  <div class="dialog_wrapper"></div> */
    const wrapper = document.createElement("div") as HTMLDivElement;
    wrapper.classList.add(references.classes.info_dialog_wrapper);
    return wrapper;
  }

  private static createInfoDialogContainer(): HTMLDivElement {
    /* <div class="info_dialog_container" id="info_dialog_container"></div> */
    const infoC = document.createElement("div") as HTMLDivElement;
    infoC.classList.add(references.classes.info_dialog_container);
    infoC.id = references.IDs.info_dialog_container;
    return infoC;
  }

  private static getInfoDialogContainerIfExists(): HTMLDivElement | null {
    const elName = references.IDs.info_dialog_container;
    const elCont = document.getElementById(elName);
    return elCont ? (elCont as HTMLDivElement) : null;
  }
  private static getInfoDialogContainer(): HTMLDivElement {
    try {
      const elName = infoDialogReferences.IDs.info_dialog;
      const elCont = document.getElementById(elName);
      validatorHelper.checkHTMLElement(elCont, elName);
      const dialogC = elCont as HTMLDivElement;
      return dialogC;
    } catch (error: unknown) {
      const method = this.getInfoDialogContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static closeInfoDialog() {
    try {
      const dialog = this.getInfoDialogContainer();
      dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
    } catch (error: unknown) {
      const method = this.closeInfoDialog.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static closeInfoDialogIfOpen() {
    const dialog = this.getInfoDialogContainerIfExists();
    if (dialog) dialog.remove();
  }
}
