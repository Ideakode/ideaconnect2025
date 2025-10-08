import { storeSSvc, uiSSvc } from "../../../services/services.js";
import { useCaseErrors } from "../../usesCases.js";
import { logger } from "../../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../../helpers/helpers.js";

export class dataChannelOpen {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    cDetailsData: unknown /* ICallDetails.callDetails */
  ) {
    const className = "dataChannelOpen";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(cDetailsData);
      validator.checkCall(store, cDetails);
      storeSSvc.setCallConnected(store, cDetails);
      uiSSvc.refreshChatView(cParams);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    logErrors.send(this, error);
  } */
}
