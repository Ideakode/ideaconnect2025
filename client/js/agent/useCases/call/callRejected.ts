import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class callRejected {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callRejected";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const callDetails = parser.parseCallDetailsInterface(data);
      const routeTo = callDetails.callingPartyId;
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      validator.checkCall(store, callDetails);
      storeASvc.resetCall(store); //reset ongoing call details in store
      //send rejection back
      const msg = messageBuilder.buildCallSignalingReject(callDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);
      uiASvc.closeIncomingCallDialog(); //always close call dialog
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
 */
}
