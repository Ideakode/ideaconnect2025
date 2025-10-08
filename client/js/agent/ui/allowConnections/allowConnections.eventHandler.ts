import { ICommonParams } from "../../interfaces/interfaces.js";
import { availableForConnections } from "../../useCases/notification/notification.js";
import { errorHandler } from "../../errors/errors.js";
import { allowConnectionsElements } from "./allowConnections.elements.js";

export class allowConnectionsEventHandler {
  public static registerEventCheckBox(
    cParams: ICommonParams.commonParams,
    forPeer: string
  ) {
    try {
      const checkbox = allowConnectionsElements.getCheckbox(forPeer);
      checkbox.addEventListener("click", () => {
        availableForConnections.execute(cParams, forPeer);
      });
    } catch (error: unknown) {
      const method = this.registerEventCheckBox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
