/**
 * @file rootStranger.ts
 * @class rootStranger
 *
 * @description
 * Manages the root DOM container for the stranger UI. Creates the container
 * element and appends it to document.body during bootstrap. Exposes
 * accessors for the CSS class names and element IDs used throughout the UI.
 *
 * @staticMethods
 * - initializeRootElements()
 *     Creates the root container element via rootStrangerElements.createRootContainer
 *     and appends it to document.body. Called once by uiSSvc.initializeUI.
 *
 * - getClasses()
 *     Returns the CSS class name map from rootStrangerReferences.classes.
 *
 * - getIDs()
 *     Returns the DOM ID map from rootStrangerReferences.IDs.
 *     (root_container is used throughout to attach child views and dialogs)
 *
 * @see rootStrangerElements
 * @see rootStrangerReferences
 */
import { rootStrangerElements } from "./rootStranger.elements.js";
import { rootStrangerReferences } from "./rootStranger.references.js";
import { errorHandler } from "../../errors/errors.js";
import { logger } from "../../logs/logs.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class rootStranger {
  public static initializeRootElements() {
    logger.log(this.name, "initializeRootElements");

    try {
      const rootC = rootStrangerElements.createRootContainer();
      document.body.appendChild(rootC);
    } catch (error: unknown) {
      const method = this.initializeRootElements.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getClasses() {
    return rootStrangerReferences.classes;
  }
  public static getIDs() {
    return rootStrangerReferences.IDs;
  }
}
