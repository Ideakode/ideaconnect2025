/**
 * @file listingAgents.ts
 * @class listingAgents
 *
 * @description
 * High-level coordinator for the agent listing UI component.
 * Delegates DOM operations to listingAgentsElements and event binding
 * to listingAgentsEventHandler.
 *
 * @staticMethods
 * - refreshAgents(cParams)
 *     Reads the availableAgents list from the store, updates the agent count
 *     span and the agent list div, then re-registers click events on all
 *     call buttons. Called by uiSSvc.refreshAvailableAgents.
 *
 * - createAgentListContainer()
 *     Delegates to listingAgentsElements.createAgentListingContainer to build
 *     the full container HTML structure. Called by defaultView.create.
 *
 * - closeAgentListing() / showAgentListing()
 *     Hide or show the agents_container element.
 *
 * @see listingAgentsElements   — DOM creation and query
 * @see listingAgentsEventHandler — click event registration
 */
import listingAgentsElements from "./listingAgents.elements.js";
import listingAgentsEventHandler from "./listingAgents.eventHandler.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { errorHandler } from "../../errors/errors.js";
import { parserSHelper, uiHelper } from "../../helpers/helpers.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class listingAgents {
  public static refreshAgents(cParams: ICommonParams.commonParams): void {
    try {
      const parser = parserSHelper;
      const store = parser.parseStoreStranger(cParams.store);
      listingAgentsElements.setAgentCountSpan(
        store.availableAgents.peers.length.toString()
      );
      listingAgentsElements.setAgentList(store.availableAgents.peers);
      listingAgentsEventHandler.registerAgentsListingEvents(cParams);
    } catch (error: unknown) {
      const method = this.refreshAgents.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createAgentListContainer(): HTMLDivElement {
    return listingAgentsElements.createAgentListingContainer();
  }
  public static closeAgentListing() {
    const cont = listingAgentsElements.getAgentListContainer();
    uiHelper.hideElement(cont);
  }
  public static showAgentListing() {
    const cont = listingAgentsElements.getAgentListContainer();
    uiHelper.showElement(cont);
  }
}
