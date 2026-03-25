/**
 * @file callBusy.ts
 * @class callBusy
 *
 * @description
 * Use case triggered when the target agent is already in another call
 * (CALL_BUSY status). Validates the call, then delegates to callFailed
 * with reason CALL_BUSY.
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     Parses cParams and call details, validates call, then calls
 *     callFailed.execute(cParams, cDetails, CALL_BUSY).
 *
 * @see callFailed
 * @see callSignaling — dispatcher
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { callFailed } from "./callFailed.js";

export class callBusy {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callBusy";
    logger.log(className, "UseCase -" + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(data);
      const busy = constants.callSignaling.CALL_BUSY;
      validator.checkCall(store, cDetails);
      callFailed.execute(cParams, cDetails, busy);
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
