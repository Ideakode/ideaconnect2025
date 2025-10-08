import * as constants from "../../constants/constants.js";
import { errorHandler } from "../../errors/errors.js";
import { storeSSvc, webRtcSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { uiSSvc } from "../../services/services.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { sendChatMessage } from "../webRtc/webRtc.js";
import { callEnded } from "../call/call.js";

export class callAccepted {
  public static execute(
    cParamsData: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetailsToAttach = parser.parseCallDetailsInterface(data);
      validator.checkCall(store, cDetailsToAttach);

      const peerConn = webRtcSSvc.createPeerConnection();
      storeSSvc.setPeerConnection(store, peerConn);
      webRtcSSvc.init(cParams, cDetailsToAttach);
      storeSSvc.setCallInRtcProgress(store, cDetailsToAttach);
      webRtcSSvc.startWebRtcOffer(store);

      switch (cDetailsToAttach.callType) {
        case constants.callType.CHAT: {
          const fnSendMsg = sendChatMessage.execute;
          const fnEndCall = callEnded.execute;
          uiSSvc.switchToChatView(
            cParams,
            cDetailsToAttach,
            fnSendMsg,
            fnEndCall
          );
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

  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
}
