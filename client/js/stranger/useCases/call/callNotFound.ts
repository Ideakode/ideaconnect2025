/**
 * @file callNotFound.ts
 * @class callNotFound
 *
 * @description
 * Use case triggered when the server cannot locate the target agent
 * (NOT_FOUND status). Validates the call, then delegates to callFailed
 * with reason NOT_FOUND.
 *
 * @staticMethods
 * - execute(cParams, data)
 *     Parses call details, validates store and call, then calls
 *     callFailed.execute(cParams, cDetails, NOT_FOUND).
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

export class callNotFound {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callNotFound";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const reason = constants.callSignaling.NOT_FOUND;
      validator.checkCall(store, cDetails);
      callFailed.execute(cParams, cDetails, reason);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this, error, method, true);
  } */
}
