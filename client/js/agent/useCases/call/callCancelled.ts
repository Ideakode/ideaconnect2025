import * as constants from "../../constants/constants.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class callCancelled {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callCancelled";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const cancel = constants.callSignaling.CANCEL;
      validator.checkCall(store, cDetails);
      uiASvc.closeIncomingCallDialog(); //always close call dialog
      const clback = storeASvc.resetCall; //reset call after Info Dialog Closes
      uiASvc.openInfoDialog(cancel, clback, 3, store);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
