/**
 * @file rootAgent.ts
 * @class rootAgent
 *
 * @description
 * Facade for the agent's root DOM container. Creates the outermost `<div id="root">`
 * and appends it to `document.body`. Exposes CSS class and ID registries through
 * `getClasses()` and `getIDs()`.
 *
 * @note
 * The dashboard, allowConnections, and totalStrangers sub-component creation
 * inside `initializeRootElements` is currently commented out — child components
 * are now assembled by the view layer instead. Also note that `getIDs()` currently
 * returns `rootAgentReferences.classes` (the same as `getClasses()`), which appears
 * to be a copy-paste bug — it should return `rootAgentReferences.IDs`.
 *
 * @staticMethods
 * - initializeRootElements() — creates root container and appends to document.body
 * - getClasses()             — returns rootAgentReferences.classes registry
 * - getIDs()                 — returns rootAgentReferences.classes (bug: should be .IDs)
 *
 * @see rootAgentElements   — extends root.rootElements; delegates DOM creation
 * @see rootAgentReferences — extends root.rootReferences; provides id/class constants
 * @see uiAgentService.initializeUI — calls initializeRootElements during bootstrap
 */

import { logger } from "../../logs/logs.js";
import { errorHandler } from "../../errors/errors.js";
import { rootAgentElements } from "./rootAgent.elements.js";
import { rootAgentReferences } from "./rooAgent.references.js";

export class rootAgent {  
  public static initializeRootElements(): string {
    logger.log(this.name, " initializeRootElements");
    try {
      
      const mainC = rootAgentElements.createRootContainer();
      document.body.appendChild(mainC);
      return this.getIDs().root_container;
      
    } catch (error: unknown) {
      const method = this.initializeRootElements.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static getClasses() {
    return rootAgentReferences.classes;
  }
  public static getIDs() {
    return rootAgentReferences.IDs;
  }
}
