import { errorHandler } from "../../errors/errors.js";
import { rootReferences } from "./root.references.js";
import { validatorHelper } from "../../helpers/helpers.js";

export class rootElements {
  public static getRootContainer(): HTMLDivElement {
    try {
      const elName = rootReferences.IDs.root_container;
      const rootContainer = document.getElementById(elName);
      validatorHelper.checkHTMLElement(rootContainer, elName);
      return rootContainer as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getRootContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createRootContainer(): HTMLDivElement {
    /* <div class="root_container" id="root_container"> */
    const rootC = document.createElement("div") as HTMLDivElement;
    rootC.classList.add(rootReferences.classes.root_container);
    rootC.id = rootReferences.IDs.root_container;
    return rootC;
  }
}
