import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

import {
  callNewIncoming,
  callCancelled,
  callNotFound,
  callBusy,
} from "./call.js";

export class callSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown //ICallSignaling.callSignaling
  ) {
    const className = "callSignaling";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cSig = parser.parseCallSignalingInterface(data);
      const cDetails = parser.parseCallDetailsInterface(cSig.callDetails);
      validator.checkStoreAgent(cParams.store);

      switch (cSig.callStatus.status) {
        case constants.callSignaling.INVITE:
          callNewIncoming.execute(cParams, cDetails);
          break;
        case constants.callSignaling.CANCEL:
          callCancelled.execute(cParams, cDetails);
          break;
        case constants.callSignaling.NOT_FOUND:
          callNotFound.execute(cParams, cDetails);
          break;
        case constants.callSignaling.CALL_BUSY:
          callBusy.execute(cParams, cDetails);
          break;
        case constants.callSignaling.BYE:
          /* call.callBye.execute(cParams, cDetails); */
          break;
      }
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
