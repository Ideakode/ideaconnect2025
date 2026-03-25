/**
 * @file callHangedUp.ts
 * @class callHangedUp
 *
 * @description
 * Use case invoked when the stranger dismisses the outgoing call dialog
 * before the agent responds. Closes the call dialog, resets the store,
 * and sends a CANCEL call-signaling message to the server.
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     1. Validates call details and store state
 *     2. uiSSvc.closeCallDialog
 *     3. storeSSvc.resetCall
 *     4. Builds a CANCEL message and sends via socketSSvc.sendCallSignaling
 *
 * @see callRequest  — passes callHangedUp.execute as the hangup callback
 * @see messageBuilder.buildCallSignalingCancel
 */
import { storeSSvc, socketSSvc, uiSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserSHelper,
  validatorSHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class callHangedUp {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICal.callDetails */
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(storeSSvc.getSocket(store));
      validator.checkCall(store, cDetails);
      uiSSvc.closeCallDialog();
      storeSSvc.resetCall(store);
      const msg = messageBuilder.buildCallSignalingCancel(cDetails);
      socketSSvc.sendCallSignaling(socket, msg);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
