import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserSHelper,
  validatorSHelper,
  messageBuilder,
} from "../../helpers/helpers.js";
import { callHangedUp } from "./callHangedUp.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeSSvc, uiSSvc, socketSSvc } from "../../services/services.js";

export class callRequest {
  public static execute(
    cParams: ICommonParams.commonParams,
    type: string,
    toId: string,
    toName: string
  ) {
    const className = "callRequest";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(storeSSvc.getSocket(store));
      const fromId = socket.id;
      validator.canPeerParticipateInCall(store);
      //prepare message to be sent
      const msg = messageBuilder.buildCallSignalingInvite(
        type,
        fromId!,
        toId,
        toId,
        "Client",
        toName
      );
      const cDetails = msg.callDetails;
      const fnHangup = callHangedUp.execute;
      storeSSvc.setCallInProgress(store, cDetails);
      uiSSvc.openCallDialog(cParams, cDetails, toName, fnHangup);
      socketSSvc.sendCallSignaling(socket, msg);
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
