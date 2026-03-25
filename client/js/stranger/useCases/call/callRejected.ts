/**
 * @file callRejected.ts
 * @class callRejected
 *
 * @description
 * Use case triggered when the remote agent explicitly rejects the stranger's
 * call invitation. Validates the call is still active, then delegates to
 * callFailed with reason CALL_REJECTED.
 *
 * @staticMethods
 * - execute(cParams, data)
 *     Parses call details, validates store and call, then calls
 *     callFailed.execute(cParams, callDetails, CALL_REJECTED).
 *
 * @see callFailed  — shared teardown for non-accepted call outcomes
 * @see callSignaling  — dispatcher
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { callFailed } from "./callFailed.js";

export class callRejected {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      const callDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const reason = constants.callSignaling.CALL_REJECTED;
      validator.checkCall(store, callDetails);
      callFailed.execute(cParams, callDetails, reason);
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
