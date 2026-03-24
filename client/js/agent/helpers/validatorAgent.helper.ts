/**
 * @file validatorAgent.helper.ts
 * @class validatorAgentHelper
 *
 * @description
 * Agent-specific validator helper. Extends validatorHelper with additional checks that
 * apply business rules specific to the agent peer type. All base check methods are
 * inherited.
 *
 * @extends validatorHelper  - (client/js/base/helpers/validator.helper.ts)
 *
 * @staticMethods (agent-specific)
 * - checkStoreAgent(data)
 *     Throws validatorErrorClass if data is not a storeAgentClass instance
 *     (i.e. missing availableForClients or availableForAgents properties).
 *
 * - canAgentReceiveCall(store: storeA)
 *     Composite check combining:
 *       1. canPeerParticipateInCall(store) — callState must be IDLE, callDetails must be null
 *       2. checkStoreAgent(store)          — must be a valid agent store
 *       3. store.availableForClients must be true
 *     Throws validatorErrorClass on any failure. Called by callNewIncoming before
 *     accepting an inbound INVITE. On failure, useCaseErrors.sendBusyIfNeeded sends
 *     a BUSY response to the caller.
 *
 * @see storeAgentClass   - the type being guarded
 * @see errorBuilder.agentNotAvailableCalls - error thrown when availableForClients is false
 */
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
