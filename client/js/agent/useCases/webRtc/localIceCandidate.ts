import { storeASvc, socketASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class localIceCandidate {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    cDetailsData: unknown /* ICallDetails.callDetails */,
    iceData: unknown /* RTCIceCandidate | null */
  ) {
    const className = "localIceCandidate";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreAgent(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(cDetailsData);
      validator.checkStoreAgent(cParams.store);
      validator.checkCall(store, cDetails);

      if (iceData !== null) {
        const ice = iceData as RTCIceCandidate;
        const socket = parser.parseSocket(storeASvc.getSocket(store));
        const toId = cDetails.callingPartyId;
        const msg = messageBuilder.buildWebRTCSignalingIceCandidate(
          cDetails,
          ice,
          toId
        );
        socketASvc.sendWebRTCSignaling(socket, msg);
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
