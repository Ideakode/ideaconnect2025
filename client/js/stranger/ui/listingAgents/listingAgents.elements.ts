/**
 * @file listingAgents.elements.ts
 * @class listingAgentsElements
 *
 * @description
 * Manages all DOM creation and mutation for the agent listing component.
 * Builds the container structure:
 *   <div class="agents_container" id="agents_container">
 *     <p class="agents_container_title">Agents available - <span id="agents_count"/></p>
 *     <div class="agents_list" id="agents_list">
 *       <!-- one <p> per agent, each with CHAT / VIDEO / AUDIO call buttons -->
 *     </div>
 *   </div>
 *
 * @staticMethods
 * - createAgentListingContainer()
 *     Builds and returns the full container structure described above.
 *
 * - setAgentCountSpan(agentCount)
 *     Updates the #agents_count span text.
 *
 * - setAgentList(agents)
 *     Clears #agents_list and re-renders one entry per agent.
 *     Each entry has CHAT, VIDEO, and AUDIO call buttons with icon images.
 *
 * - getAgentCountSpan() / getAgentsListDiv() / getAgentListContainer()
 *     Queries and validates DOM elements by ID for live updates.
 *
 * @see listingAgentsReferences — ID and CSS class constants
 * @see listingAgentsTexts      — UI text strings
 */
import { listingAgentsReferences } from "./listingAgents.references.js";
import { listingAgentsTexts } from "./listingAgents.texts.js";
import * as constants from "../../constants/constants.js";
import { errorHandler } from "../../errors/errors.js";
import { validatorSHelper } from "../../helpers/helpers.js";
import { IPeer } from "../../interfaces/interfaces.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export default class listingAgentsElements {
  public static getAgentCountSpan(): HTMLSpanElement {
    try {
      const validator = validatorSHelper;
      const elName = listingAgentsReferences.IDs.agents_count;
      const span = document.getElementById(elName);
      validator.checkHTMLElement(span, elName);
      return span as HTMLSpanElement;
    } catch (error: unknown) {
      const method = this.getAgentCountSpan.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getAgentsListDiv(): HTMLDivElement {
    try {
      const validator = validatorSHelper;
      const elName = listingAgentsReferences.IDs.agents_list;
      const agentlistDiv = document.getElementById(elName);
      validator.checkHTMLElement(agentlistDiv, elName);
      return agentlistDiv as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getAgentsListDiv.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getAgentListContainer(): HTMLDivElement {
    try {
      const validator = validatorSHelper;
      const elName = listingAgentsReferences.IDs.agents_container;
      const agentC = document.getElementById(elName);
      validator.checkHTMLElement(agentC, elName);
      return agentC as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getAgentListContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static setAgentCountSpan(agentCount: string) {
    try {
      const agentCountSpan = this.getAgentCountSpan();
      agentCountSpan.innerText = "";
      agentCountSpan.innerText = agentCount;
    } catch (error: unknown) {
      const method = this.setAgentCountSpan.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static setAgentList(agents: IPeer.peer[]) {
    try {
      const agentlistDiv = this.getAgentsListDiv();
      agentlistDiv.innerHTML = "";
      agents.forEach((agent) => {
        agentlistDiv.appendChild(
          this.createAgentEntry(agent.peerID, agent.peerName)
        );
      });
    } catch (error: unknown) {
      const method = this.setAgentList.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static createAgentEntry(
    id: string,
    name: string
  ): HTMLParagraphElement {
    const p = document.createElement("p") as HTMLParagraphElement;
    p.innerHTML = name;
    p.id = id;

    p.appendChild(this.createButton(constants.callType.CHAT, id, name));
    p.appendChild(this.createButton(constants.callType.VIDEO, id, name));
    p.appendChild(this.createButton(constants.callType.AUDIO, id, name));

    return p;
  }

  private static createButton(
    callType: string,
    agentId: string,
    agentName: string
  ): HTMLButtonElement {
    const button = document.createElement("button") as HTMLButtonElement;
    button.classList.add(listingAgentsReferences.classes.connecting_button);
    button.id = agentId;
    button.name = agentName;
    button.value = callType;
    const img = window.document.createElement("img");
    if (callType === constants.callType.CHAT) {
      img.src = "./utils/images/thumbnail_chat.png";
    } else if (callType === constants.callType.VIDEO) {
      img.src = "./utils/images/thumbnail_video.png";
    } else if (callType === constants.callType.AUDIO) {
      img.src = "./utils/images/thumbnail_audio.png";
    }

    button.appendChild(img);
    return button;
  }

  public static createAgentListingContainer(): HTMLDivElement {
    /**
        <div class="agents_container">
                <p class="agents_container_title">Agents available - <span id="agents_count"></span></p>
                <div class="agents_list" id="agents_list"></div>                   
        </div> 
    */

    try {
      const containerDiv = this.createAgentsContainer();
      const titleParagraph = this.createTitleParagraph();
      const countSpan = this.createAgentCountSpan();
      const listDiv = this.createAgentListDiv();

      titleParagraph.appendChild(countSpan);
      containerDiv.appendChild(titleParagraph);
      containerDiv.appendChild(listDiv);

      return containerDiv;
    } catch (error: unknown) {
      const method = this.createAgentListingContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static createAgentsContainer(): HTMLDivElement {
    /* <div class="agents_container"></div> */
    const containerDiv = document.createElement("div") as HTMLDivElement;
    const cssClass = listingAgentsReferences.classes.agents_container;
    containerDiv.classList.add(cssClass);
    containerDiv.id = listingAgentsReferences.IDs.agents_container;
    return containerDiv;
  }

  private static createTitleParagraph(): HTMLParagraphElement {
    /* <p class="agents_container_title">>Agents - </p> */
    const paragraph = document.createElement("p") as HTMLParagraphElement;
    paragraph.innerHTML = listingAgentsTexts.containerTitle();
    const cssClass = listingAgentsReferences.classes.agents_container_title;
    paragraph.classList.add(cssClass);
    return paragraph;
  }

  private static createAgentCountSpan(): HTMLSpanElement {
    const countSpan = document.createElement("span") as HTMLSpanElement;
    countSpan.id = listingAgentsReferences.IDs.agents_count;
    return countSpan;
  }

  private static createAgentListDiv(): HTMLDivElement {
    const listDiv = document.createElement("div") as HTMLDivElement;
    listDiv.classList.add(listingAgentsReferences.classes.agents_list);
    listDiv.id = listingAgentsReferences.IDs.agents_list;
    return listDiv;
  }
}
