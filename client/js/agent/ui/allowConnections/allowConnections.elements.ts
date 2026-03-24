/**
 * @file allowConnections.elements.ts
 * @class allowConnectionsElements
 *
 * @description
 * DOM creation and query layer for the allowConnections component.
 * Builds two checkbox rows (STRANGER + AGENT) and provides getters
 * for each checkbox div and its checkmark image element.
 *
 * @html
 * ```html
 * <div class="available_for_connections_container" id="available_for_connections_container">
 *   <div class="checkbox_container">
 *     <div class="checkbox_connection" id="allow_clients_checkbox">
 *       <img src="./utils/images/check.png" class="display_none" id="allow_clients_checkbox_img" />
 *     </div>
 *     <p class="checkbox_container_paragraph">Available for Client connections</p>
 *   </div>
 *   <div class="checkbox_container">
 *     <div class="checkbox_connection" id="allow_agents_checkbox">
 *       <img src="./utils/images/check.png" class="display_none" id="allow_agents_checkbox_img" />
 *     </div>
 *     <p class="checkbox_container_paragraph">Available for Agent Connections</p>
 *   </div>
 * </div>
 * ```
 *
 * @staticMethods
 * - getCheckbox(peerType)    — returns the checkbox div for STRANGER or AGENT
 * - getCheckboxImg(peerType) — returns the checkmark img for STRANGER or AGENT
 * - createAllowConnections() — builds and returns the full container
 *
 * @see allowConnectionsReferences — provides all id and class name constants
 * @see allowConnections           — facade that delegates to this class
 */
import * as constants from "../../constants/constants.js";
import { validatorAHelper } from "../../helpers/helpers.js";
import { allowConnectionsReferences } from "./allowConnections.references.js";
import { allowConnectionsTexts } from "./allowConnections.texts.js";
import { errorHandler } from "../../errors/errors.js";
import { rootAgent } from "../ui.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class allowConnectionsElements {
  public static getCheckbox(peerType: string): HTMLDivElement {
    try {
      let elName: string = "";
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      if (peerType == peerA)
        elName = allowConnectionsReferences.IDs.allow_agents_checkbox;
      if (peerType == peerS)
        elName = allowConnectionsReferences.IDs.allow_clients_checkbox;

      const checkboxC = document.getElementById(elName);
      validatorAHelper.checkHTMLElement(checkboxC, elName);
      return checkboxC as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getCheckbox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getCheckboxImg(peerType: string): HTMLImageElement {
    try {
      let elName: string = "";
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      if (peerType === peerA)
        elName = allowConnectionsReferences.IDs.allow_agents_checkbox_img;
      if (peerType === peerS)
        elName = allowConnectionsReferences.IDs.allow_clients_checkbox_img;

      const chkBoxImg = document.getElementById(elName);
      validatorAHelper.checkHTMLElement(chkBoxImg, elName);
      return chkBoxImg as HTMLImageElement;
    } catch (error: unknown) {
      const method = this.getCheckboxImg.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createAllowConnections(): HTMLDivElement {
    /**
   <div class="available_for_connections_container" id="available_for_connections_container">
      <div class="checkbox_container">                    
          <div class="checkbox_connection" id="allow_clients_checkbox">                        
              <img src="./utils/images/check.png" class="display_none" id="allow_clients_checkbox_image" />                                                
          </div>
          <p class="checkbox_container_paragraph">Available for Client connections</p>
      </div>
      <div class="checkbox_container">                    
          <div class="checkbox_connection" id="allow_agents_checkbox">                        
              <img src="./utils/images/check.png" class="display_none" id="allow_agents_checkbox_image"/>                                                
          </div>
          <p class="checkbox_container_paragraph">Available for Agent Connections</p>
      </div>
    </div>  
    */
    const avaiC = this.createAllowConnectionsContainer();
    //add checkbox for Client
    const peerA = constants.peerTypes.AGENT;
    const peerS = constants.peerTypes.STRANGER;
    const chkboxS = this.createCheckBox(peerS);
    avaiC.appendChild(chkboxS);
    //add checkbox for Agents
    const chkboxA = this.createCheckBox(peerA);
    avaiC.appendChild(chkboxA);

    return avaiC;
  }

  private static createAllowConnectionsContainer(): HTMLDivElement {
    /* <div class="available_for_connections_container" id="available_for_connections_container"> */
    const cont = document.createElement("div") as HTMLDivElement;
    cont.classList.add(allowConnectionsReferences.classes.available_container);
    cont.id = allowConnectionsReferences.IDs.available_container;
    return cont;
  }

  private static createCheckBox(peerType: string): HTMLDivElement {
    /* 
  <div class="checkbox_container">                    
    <div class="checkbox_connection" id="allow_clients_checkbox">                        
      <img src="./utils/images/check.png" class="display_none" id="allow_clients_checkbox_image" />                                                
    </div>
    <p class="checkbox_container_paragraph">Available for Client connections</p>
  </div>
  OR
  <div class="checkbox_container">                    
    <div class="checkbox_connection" id="allow_agents_checkbox">                        
      <img src="./utils/images/check.png" class="display_none" id="allow_agents_checkbox_image"/>                                                
    </div>
    <p class="checkbox_container_paragraph">Available for Agent Connections</p>
  </div>
 */

    const boxCont = this.createCheckBoxContainer();
    const boxConn = this.createCheckBoxConnection(peerType);
    const label = this.createLabelParagraph(peerType);
    boxCont.appendChild(boxConn);
    boxCont.appendChild(label);
    return boxCont;
  }

  private static createCheckBoxContainer() {
    /* <div class="checkbox_container"></div> */
    const cont = document.createElement("div") as HTMLDivElement;
    cont.classList.add(allowConnectionsReferences.classes.checkbox_container);
    return cont;
  }
  private static createCheckBoxConnection(peerType: string): HTMLDivElement {
    /* 
  <div class="checkbox_connection" id="allow_clients_checkbox">                        
    <img src="./utils/images/check.png" class="display_none" id="allow_clients_checkbox_image" />                                                
  </div> 
  OR
  <div class="checkbox_connection" id="allow_agents_checkbox">                        
      <img src="./utils/images/check.png" class="display_none" id="allow_agents_checkbox_image"/>                                                
  </div>
  */
    const peerA = constants.peerTypes.AGENT;
    const peerS = constants.peerTypes.STRANGER;
    const boxConn = document.createElement("div") as HTMLDivElement;
    const cssClass = allowConnectionsReferences.classes.checkbox_connection;
    boxConn.classList.add(cssClass);
    const boxImg = this.createCheckBoxImage(peerType);

    switch (peerType) {
      case peerA:
        boxConn.id = allowConnectionsReferences.IDs.allow_agents_checkbox;
        break;
      case peerS:
        boxConn.id = allowConnectionsReferences.IDs.allow_clients_checkbox;
        break;
    }
    boxConn.appendChild(boxImg);
    return boxConn;
  }

  private static createCheckBoxImage(peerType: string): HTMLDivElement {
    /* <img src="./utils/images/check.png" class="display_none" id="allow_clients_checkbox_image" /> */
    const peerA = constants.peerTypes.AGENT;
    const peerS = constants.peerTypes.STRANGER;

    const boxImg = document.createElement("img") as HTMLImageElement;
    boxImg.src = "./utils/images/check.png";
    boxImg.classList.add(rootAgent.getClasses().display_none);

    switch (peerType) {
      case peerA:
        boxImg.id = allowConnectionsReferences.IDs.allow_agents_checkbox_img;
        break;
      case peerS:
        boxImg.id = allowConnectionsReferences.IDs.allow_clients_checkbox_img;
        break;
    }
    return boxImg;
  }
  private static createLabelParagraph(peerType: string): HTMLParagraphElement {
    const label = document.createElement("p") as HTMLParagraphElement;
    const css = allowConnectionsReferences.classes.checkbox_container_p;
    label.classList.add(css);
    label.innerHTML = allowConnectionsTexts.availableText(peerType);
    return label;
  }

  public createAgentCountSpan() {
    //to do
  }
}
