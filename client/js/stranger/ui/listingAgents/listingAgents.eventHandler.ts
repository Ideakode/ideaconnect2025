/**
 * @file listingAgents.eventHandler.ts
 * @class listingAgentsEventHandler
 *
 * @description
 * Registers click event listeners on all call-type buttons in the agent list.
 * Each button carries the agent's socket ID (id), display name (name),
 * and call type (value). On click, callRequest.execute is invoked with
 * these values plus the current cParams context.
 *
 * @staticMethods
 * - registerAgentsListingEvents(cParams)
 *     Queries all <button> elements inside #agents_list > p and attaches
 *     a click listener to each one that calls callRequest.execute.
 *     Re-called every time the agent list is refreshed.
 *
 * @see callRequest  — use case invoked on button click
 * @see listingAgents.refreshAgents — caller
 */
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
