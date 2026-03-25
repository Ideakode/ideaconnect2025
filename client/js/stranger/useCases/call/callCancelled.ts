/**
 * @file callCancelled.ts
 * @class callCancelled
 *
 * @description
 * Use case triggered when the remote party signals that the outgoing call
 * has been cancelled (CANCEL status in call signaling). Validates the call,
 * then delegates to callFailed with reason CANCEL.
 *
 * @staticMethods
 * - execute(cParams, data)
 *     Parses call details, validates store and call, then calls
 *     callFailed.execute(cParams, cDetails, CANCEL).
 *
 * @see callFailed
 * @see callSignaling — dispatcher
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { callFailed } from "./callFailed.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";

export class callCancelled {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + callCancelled);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const reason = constants.callSignaling.CANCEL;
      validator.checkCall(store, cDetails);
      callFailed.execute(cParams, cDetails, reason);
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
