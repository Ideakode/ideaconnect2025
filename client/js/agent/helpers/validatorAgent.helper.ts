import { errorBuilder, errorHandler } from "../errors/errors.js";
import { validatorHelper } from "../../base/helpers/helpers.js";
import { storeA } from "../classes/classes.js";

export default class validatorAgentHelper extends validatorHelper {
  public static canAgentReceiveCall(store: storeA) {
    const method = this.canAgentReceiveCall.name;

    try {
      this.canPeerParticipateInCall(store);
      validatorAgentHelper.checkStoreAgent(store);
      if (!store.availableForClients) {
        const err = errorBuilder.agentNotAvailableCalls(this.errType, method);
        errorHandler.throwError(this.name, err, false);
      }
    } catch (error: unknown) {
      errorHandler.propagateErrorValidator(this.name, error, method);
    }
  }

  private static isStoreAgent(data: unknown): data is storeA {
    return (
      this.isStore(data) &&
      (data as storeA).availableForAgents !== undefined &&
      (data as storeA).availableForClients !== undefined
    );
  }

  public static checkStoreAgent(data: unknown) {
    if (!this.isStoreAgent(data)) {
      const method = this.checkStoreAgent.name;
      const err = errorBuilder.storeNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }
}
