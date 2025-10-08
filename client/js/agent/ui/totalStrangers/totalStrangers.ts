import { logger } from "../../logs/logs.js";
import { errorHandler } from "../../errors/errors.js";
import totalStrangerElements from "./totalStrangers.elements.js";

export class totalStrangers {
  public static createStrangerStatus() {
    return totalStrangerElements.createStrangerStatus();
  }

  public static updateTotalStrangersBox(total: string) {
    logger.log(this.name, "updateTotalStrangersBox | " + total);
    try {
      // changing status of the Total Strangers connected box
      const spanEl = totalStrangerElements.getTotalStrangersSpan();
      spanEl.innerText = "";
      spanEl.innerText = total;
    } catch (error: unknown) {
      const method = this.updateTotalStrangersBox.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
