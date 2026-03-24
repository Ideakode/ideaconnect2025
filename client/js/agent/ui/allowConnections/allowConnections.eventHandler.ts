/**
 * @file allowConnections.eventHandler.ts
 * @class allowConnectionsEventHandler
 *
 * @description
 * Event handler layer for the allowConnections component. Wires click
 * listeners to each checkbox div so the agent can toggle availability.
 *
 * @staticMethods
 * - registerEventCheckBox(cParams, forPeer) — attaches a click listener to the
 *   checkbox div for the given peer type; on click calls availableForConnections.execute
 *
 * @see allowConnectionsElements       — getCheckbox query used to locate the div
 * @see availableForConnections.execute — use case that toggles the availability flag
 * @see allowConnections.registerAllowConnectionsEvents — calls this per peer type
 */
import { ICommonParams } from "../../interfaces/interfaces.js";
import { availableForConnections } from "../../useCases/notification/notification.js";
import { errorHandler } from "../../errors/errors.js";
import { allowConnectionsElements } from "./allowConnections.elements.js";

export class allowConnectionsEventHandler {
  public static registerEventCheckBox(
    cParams: ICommonParams.commonParams,
    forPeer: string
  ) {
    try {
      const checkbox = allowConnectionsElements.getCheckbox(forPeer);
      checkbox.addEventListener("click", () => {
        availableForConnections.execute(cParams, forPeer);
      });
    } catch (error: unknown) {
      const method = this.registerEventCheckBox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
