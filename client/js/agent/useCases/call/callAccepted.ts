import { storeASvc, socketASvc,uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";
import * as constants from "../../constants/constants.js";
import { sendChatMessage } from "../webRtc/webRtc.js";
import { callEnded } from "./call.js";


export class callAccepted {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      validator.checkCall(store, cDetails);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const routeTo = cDetails.callingPartyId;
      const msg = messageBuilder.buildCallSignalingAccept(cDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);

      switch (cDetails.callType) {
        case constants.callType.CHAT: {
          const fnSendMsg = sendChatMessage.execute;
          const fnEndCall = callEnded.execute;
         /*  uiASvc.switchToChatView(
            cParams,
            cDetailsToAttach,
            fnSendMsg,
            fnEndCall
          ); */
          break;
        }

        case constants.callType.AUDIO:
          //To Do
          break;
        case constants.callType.VIDEO:
          //To Do
          break;
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
