/**
 * @file dashboard.elements.ts
 * @class dashboardElements
 *
 * @description
 * Handles all DOM creation and manipulation for the dashboard component.
 * Called exclusively by the dashboard facade class.
 *
 * @staticMethods
 * - createDashboard(peerType, name?): HTMLDivElement
 *     Assembles the full dashboard structure: container + logo + description + blur overlay.
 * - toggleDashboard(show): void
 *     Retrieves #dashboard_container and shows/hides it via uiHelper.
 * - setPeerName(name): void  /  getPeerNameSpan(): HTMLSpanElement
 *     Reads and writes the #agent_name span used to display the peer's name.
 *
 * Private builders (DOM construction helpers):
 * - createDashboardContainer()   → <div class="dashboard_container" id="dashboard_container">
 * - createDashboardLogo()        → <div class="logo_container"><img logoIdea.png></div>
 * - createDashboardDescription() → description paragraph with inline #agent_name span
 * - createDashboardBlur()        → <div class="dashboard_blur display_none" id="dashboard_blur">
 *
 * @see dashboardReferences  - (./dashboard.references.ts) DOM id/class name constants
 * @see dashboardTexts       - (./dashboard.texts.ts) description paragraph text
 * @see uiHelper             - showElement / hideElement
 */
import { errorHandler } from "../../errors/errors.js";
import { root } from "../ui.js";
import { uiHelper, validatorHelper } from "../../helpers/helpers.js";
import { dashboardReferences } from "./dashboard.references.js";
import { dashboardTexts } from "./dashboard.texts.js";

export class dashboardElements {
  /* 
<div class="dashboard_container" id="dashboard_container">
    <div class="logo_container">
        <img src="./utils/images/logoIdea.png">
    </div>
    <div class="description_container">
        <p class="description_container_paragraph">
            Connect with an Agent over a video, audio or chat call.                        
        </p>
    </div>                 
    <div class="dashboard_blur display_none" id="dashboard_blur"></div>
</div>
*/

  public static toggleDashboard(show: boolean) {
    try {
      const cont = this.getDashboardContainer();
      if (show) uiHelper.showElement(cont);
      else uiHelper.hideElement(cont);
    } catch (error: unknown) {
      const method = this.toggleDashboard.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  private static getDashboardContainer() {
    try {
      const elName = dashboardReferences.IDs.dash_cont;
      const cont = document.getElementById(elName);
      validatorHelper.checkHTMLElement(cont, elName);
      return cont as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getDashboardContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static createDashboard(peerType: string, name: string = "") {
    const dashC = this.createDashboardContainer();
    const logoC = this.createDashboardLogo();
    const dashDesc = this.createDashboardDescription(peerType, name);
    const dashBlur = this.createDashboardBlur();
    dashC.appendChild(logoC);
    dashC.appendChild(dashDesc);
    dashC.appendChild(dashBlur);
    return dashC;
  }

  private static createDashboardContainer(): HTMLDivElement {
    /* <div class="dashboard_container" id="dashboard_container"> */
    const dashC = document.createElement("div") as HTMLDivElement;
    dashC.classList.add(dashboardReferences.classes.dash_cont);
    dashC.id = dashboardReferences.IDs.dash_cont;
    return dashC;
  }
  private static createDashboardLogo(): HTMLDivElement {
    /*  
    <div class="logo_container">
        <img src="./utils/images/logoIdea.png">
    </div>
    */
    const logoC = document.createElement("div") as HTMLDivElement;
    logoC.classList.add(dashboardReferences.classes.dash_logo_cont);

    const logo = document.createElement("img") as HTMLImageElement;
    logo.src = "./utils/images/logoIdea.png";
    logoC.appendChild(logo);
    return logoC;
  }

  public static getPeerNameSpan() {
    try {
      const elName = dashboardReferences.IDs.agent_name;
      const el = document.getElementById(elName);
      validatorHelper.checkHTMLElement(el);
      return el as HTMLSpanElement;
    } catch (error: unknown) {
      const method = this.getPeerNameSpan.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static setPeerName(name: string) {
    try {
      const span = this.getPeerNameSpan();
      span.innerHTML = name;
    } catch (error) {
      const method = this.setPeerName.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static createDashboardDescription(
    peerType: string,
    name: string = ""
  ) {
    /* 
    <div class="description_container">
      <p class="description_container_paragraph">
       Hello <span id="agent_name">[Agent Name]</span>                      
      </p>
    </div>                 
    */
    const cont = document.createElement("div") as HTMLDivElement;
    cont.classList.add(dashboardReferences.classes.dash_desc_cont);
    const paragraph = document.createElement("p") as HTMLParagraphElement;
    paragraph.classList.add(dashboardReferences.classes.dash_desc_cont_p);
    const text = dashboardTexts.description(peerType, name);
    paragraph.innerHTML = text;

    const agentName = document.createElement("span") as HTMLSpanElement;
    agentName.classList.add(dashboardReferences.classes.description_name);
    agentName.id = dashboardReferences.IDs.agent_name;
    agentName.innerHTML = name;
    paragraph.appendChild(agentName);
    cont.appendChild(paragraph);
    return cont;
  }

  private static createDashboardBlur(): HTMLDivElement {
    /* <div class="dashboard_blur display_none" id="dashboard_blur"></div> */
    const blurC = document.createElement("div") as HTMLDivElement;
    blurC.classList.add(dashboardReferences.classes.dash_blur);
    blurC.classList.add(root.rootReferences.classes.display_none);
    blurC.id = dashboardReferences.IDs.dash_blur;
    return blurC;
  }
}
