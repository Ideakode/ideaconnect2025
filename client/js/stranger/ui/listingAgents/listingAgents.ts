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
