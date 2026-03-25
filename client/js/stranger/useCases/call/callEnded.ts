/**
 * @file callEnded.ts
 * @class callEnded
 *
 * @description
 * Use case invoked when the stranger ends an active call from the chat view.
 * Switches the UI back to the default view, resets the call in the store,
 * and sends a BYE call-signaling message to the server.
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     1. Validates cParams and call details
 *     2. uiSSvc.switchToDefaultView
 *     3. storeSSvc.resetCall
 *     4. Builds a BYE message and sends via socketSSvc.sendCallSignaling
 *
 * @see chatView  — end-call button wires callEnded.execute
 * @see messageBuilder.buildCallSignalingBye
 */
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserSHelper,
  validatorSHelper,
  messageBuilder,
} from "../../helpers/helpers.js";
import { storeSSvc, uiSSvc, socketSSvc } from "../../services/services.js";

export class callEnded {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callEnded";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(cParams.store.socket);
      validator.checkCall(store, cDetails);
      uiSSvc.switchToDefaultView();
      storeSSvc.resetCall(store);
      const toId = cDetails.calledPartyId;
      const msg = messageBuilder.buildCallSignalingBye(cDetails, toId);
      socketSSvc.sendCallSignaling(socket, msg);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*   public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
