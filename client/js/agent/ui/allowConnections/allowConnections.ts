/**
 * @file allowConnections.ts
 * @class allowConnections
 *
 * @description
 * Facade for the agent's availability checkboxes UI component. Provides two
 * checkboxes — one for stranger connections and one for agent connections —
 * allowing the agent to toggle their availability independently for each peer type.
 *
 * @staticMethods
 * - registerAllowConnectionsEvents(cParams, forPeers[]) — registers click listeners
 *   on each checkbox div for the specified peer types
 * - setAllowConnectionsCheckBox(allow, forPeer) — shows or hides the checkmark
 *   image based on the allow flag
 * - createAllowConnections() — builds and returns the full checkboxes container
 *
 * @see allowConnectionsElements   — DOM creation and queries
 * @see allowConnectionsEventHandler — wires click events to availableForConnections use case
 * @see uiAgentService.refreshAvailableForConnections — calls setAllowConnectionsCheckBox
 * @see uiAgentService.initializeUI — calls registerAllowConnectionsEvents + createAllowConnections
 */
import { ICommonParams } from "../../interfaces/interfaces.js";
import { errorHandler } from "../../errors/errors.js";
import { uiHelper } from "../../helpers/helpers.js";
import { allowConnectionsElements } from "./allowConnections.elements.js";
import { allowConnectionsEventHandler } from "./allowConnections.eventHandler.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class allowConnections {
  public static registerAllowConnectionsEvents(
    cParams: ICommonParams.commonParams,
    forPeers: string[]
  ): void {
    try {
      forPeers.forEach((forPeer: string) => {
        allowConnectionsEventHandler.registerEventCheckBox(cParams, forPeer);
      });
    } catch (error: unknown) {
      const method = this.registerAllowConnectionsEvents.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static setAllowConnectionsCheckBox(allow: boolean, forPeer: string) {
    // changing status of stranger checkbox
    try {
      const chkBxImg = allowConnectionsElements.getCheckboxImg(forPeer);
      if (allow) {
        uiHelper.showElement(chkBxImg);
      } else {
        uiHelper.hideElement(chkBxImg);
      }
    } catch (error: unknown) {
      const method = this.setAllowConnectionsCheckBox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createAllowConnections(): HTMLDivElement {
    const allowConn = allowConnectionsElements.createAllowConnections();
    return allowConn;
  }
}
