/**
 * @file root.elements.ts
 * @class rootElements
 *
 * @description
 * Handles DOM creation and querying for the root container — the top-level mounting point
 * into which all peer UI components (dashboard, dialogs, messenger, views) are appended.
 *
 * @html
 * <div class="root_container" id="root_container"></div>
 *
 * @staticMethods
 * - getRootContainer(): HTMLDivElement
 *     Queries the existing #root_container from the document. Throws uiErrorClass if absent.
 *     Used by peer-specific UI initializers (agent/stranger) to obtain the mount point.
 * - createRootContainer(): HTMLDivElement
 *     Creates a new <div class="root_container" id="root_container"> element.
 *     Called during initial DOM bootstrapping before any child components are appended.
 *
 * @see rootReferences  - (./root.references.ts) IDs.root_container and classes constants
 */
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
