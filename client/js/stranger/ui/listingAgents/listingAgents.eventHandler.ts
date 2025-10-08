import listingAgentsElements from "./listingAgents.elements.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { errorHandler } from "../../errors/errors.js";
import { callRequest } from "../../useCases/call/call.js";

export default class listingAgentsEventHandler {
  public static registerAgentsListingEvents(
    cParams: ICommonParams.commonParams
  ) {
    try {
      const agentDiv = listingAgentsElements.getAgentsListDiv();
      const buttons = agentDiv.querySelectorAll("p > button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          callRequest.execute(
            cParams, //common Params ref
            (button as HTMLButtonElement).value, //type of call
            (button as HTMLButtonElement).id, //calledParty socketId,
            (button as HTMLButtonElement).name //calledParty name,
          );
        });
      });
    } catch (error: unknown) {
      const method = this.registerAgentsListingEvents.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
