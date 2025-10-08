import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { callAccepted } from "./callAccepted.js";
import { callRejected } from "./callRejected.js";
import { callCancelled } from "./callCancelled.js";
import { callNotFound } from "./callNotFound.js";
import { callBusy } from "./callBusy.js";

export class callSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    cSigData: unknown //ICallSignaling.callSignaling
  ) {
    const className = "callSignaling";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cSig = parser.parseCallSignalingInterface(cSigData);
      const cDetailsData = cSig.callDetails;
      const cDetails = parser.parseCallDetailsInterface(cDetailsData);
      validator.checkCallInSignalingState(store);
      validator.checkCall(store, cDetails);

      const accepted = constants.callSignaling.CALL_ACCEPTED;
      const rejected = constants.callSignaling.CALL_REJECTED;
      const cancel = constants.callSignaling.CANCEL;
      const notFound = constants.callSignaling.NOT_FOUND;
      const busy = constants.callSignaling.CALL_BUSY;
      const bye = constants.callSignaling.BYE;

      switch (cSig.callStatus.status) {
        case accepted:
          callAccepted.execute(cParams, cDetails);
          break;
        case rejected:
          callRejected.execute(cParams, cDetails);
          break;
        case cancel:
          callCancelled.execute(cParams, cDetails);
          break;
        case notFound:
          callNotFound.execute(cParams, cDetails);
          break;
        case busy:
          callBusy.execute(cParams, cDetails);
          break;
        case bye:
          //callEnded.execute();
          break;
      }
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
