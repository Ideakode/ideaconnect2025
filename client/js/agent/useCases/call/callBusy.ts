import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class callBusy {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callBusy";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const routeTo = cDetails.callingPartyId;
      const msg = messageBuilder.buildCallSignalingBusy(cDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
