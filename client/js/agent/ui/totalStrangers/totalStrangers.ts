/**
 * @file totalStrangers.ts
 * @class totalStrangers
 *
 * @description
 * Facade for the agent's total strangers status display. Shows a live count
 * of strangers currently connected to the site, updated via server notifications.
 *
 * @staticMethods
 * - createStrangerStatus()          — builds and returns the status container element
 * - updateTotalStrangersBox(total)  — sets the inner text of the count span
 *
 * @see totalStrangerElements            — DOM creation and query layer
 * @see uiAgentService.refreshTotalStrangers — calls updateTotalStrangersBox
 * @see totalStrangers (use case)            — triggers this via uiAgentService
 * 
 * 
 * @html
 * ```html
 * <div class="stranger_current_status_container">
 *   <p class="stranger_container_paragraph">Status</p>
 *   <p class="stranger_container_paragraph">Clients connected:
 *     <span id="stranger_total_available"></span>
 *   </p>
 * </div>
 * ```
 * 
 */
import { logger } from "../../logs/logs.js";
import { errorHandler } from "../../errors/errors.js";
import totalStrangerElements from "./totalStrangers.elements.js";

export class totalStrangers {
  public static createStrangerStatus() {
    return totalStrangerElements.createStrangerStatus();
  }

  public static updateTotalStrangersBox(total: string) {
    logger.log(this.name, "updateTotalStrangersBox | " + total);
    try {
      // changing status of the Total Strangers connected box
      const spanEl = totalStrangerElements.getTotalStrangersSpan();
      spanEl.innerText = "";
      spanEl.innerText = total;
    } catch (error: unknown) {
      const method = this.updateTotalStrangersBox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
