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
