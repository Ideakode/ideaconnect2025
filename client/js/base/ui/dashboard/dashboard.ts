/**
 * @file dashboard.ts
 * @class dashboard
 *
 * @description
 * Public API for the dashboard UI component. Delegates all DOM work to dashboardElements.
 * The dashboard is the landing screen shown to a peer when no call is active.
 * It displays the IdeaConnect logo, a description paragraph, and (for agents) the agent's name.
 * A blur overlay (#dashboard_blur) is layered on top during a call to visually disable it.
 *
 * @html
 * <div class="dashboard_container" id="dashboard_container">
 *   <div class="logo_container"><img src="./utils/images/logoIdea.png"></div>
 *   <div class="description_container">
 *     <p class="description_container_paragraph">Hello <span id="agent_name">[name]</span></p>
 *   </div>
 *   <div class="dashboard_blur display_none" id="dashboard_blur"></div>
 * </div>
 *
 * @staticMethods
 * - createDashboard(peerType, name?): HTMLDivElement
 *     Builds and returns the complete dashboard DOM tree. Called once during initialization.
 *     peerType determines the description text (agent greeting vs stranger prompt).
 * - toggleDashboard(show): void
 *     Shows or hides the dashboard container using uiHelper.showElement / hideElement.
 * - setPeerName(name): void
 *     Updates the #agent_name span with the peer's registered name. Called after login/init.
 *
 * @see dashboardElements  - (./dashboard.elements.ts) performs actual DOM manipulation
 * @see dashboardTexts     - provides the description text based on peerType
 */
import { dashboardElements } from "./dashboard.elements.js";
import { errorHandler } from "../../errors/errors.js";

export class dashboard {
  /* 
<div class="dashboard_container" id="dashboard_container">
    <div class="logo_container">
        <img src="./utils/images/logoIdea.png">
    </div>
    <div>
        <div class="description_container">
            <p class="description_container_paragraph">
                Connect with an Agent over a video, audio or chat call.                        
            </p>
        </div>                 
    </div>
    <div class="dashboard_blur display_none" id="dashboard_blur"></div>
</div>
*/

  public static createDashboard(
    peerTYpe: string,
    name: string = ""
  ): HTMLDivElement {
    const dash = dashboardElements.createDashboard(peerTYpe, name);
    return dash;
  }

  public static toggleDashboard(show: boolean) {
    try {
      dashboardElements.toggleDashboard(show);
    } catch (error: unknown) {
      const method = this.toggleDashboard.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static setPeerName(name: string) {
    try {
      dashboardElements.setPeerName(name);
    } catch (error) {
      const method = this.setPeerName.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
