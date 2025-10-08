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
