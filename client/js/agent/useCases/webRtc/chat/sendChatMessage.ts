/**
 * @file sendChatMessage.ts
 * @class sendChatMessage
 *
 * @description
 * Stub use case for sending a chat message over the WebRTC data channel.
 * Not yet implemented.
 *
 * @note
 * The full implementation is commented out. It was originally written to:
 * retrieve the message from the chat UI input, send it via the data channel,
 * append it to the messenger view, and clear the input.
 * Depends on view management (chat view + messenger) being implemented first.
 * Referenced by callAccepted.ts as the `fnSendMsg` callback to pass to the chat view.
 *
 * @see callAccepted   — passes sendChatMessage.execute as fnSendMsg to the chat view
 * @see dataChannelMessage — the inbound counterpart (also a stub)
 */
/* import * as interfaces from "../../../interfaces/interfaces.js";
import * as constants from "../../../constants/constants.js";
import { logger } from "../../../logs/logs.js";
import { uiASvc } from "../../../services/services.js";
import { validatorAHelper, parserHelper } from "../../../helpers/helpers.js";
import * as useCases from "../../usesCases.js";
import { errorHandler } from "../../../errors/errors.js";
import { uiASvc } from "../../../services/services.js"; */

//Agent received a notification of Total Strangers Connected to the Site
export class sendChatMessage {
  public static execute (){
    //To Do
  }
  /*  public static execute(
    cParamsData: unknown /*ICommonParams.commonParams ,
    data: unknown /* ICallDetails.callDetails 
  ) const className =
        typeof this !== "undefined" ? this.name : "callAccepted";
	{
    logger.log(className, "Use Case - WebRTCsendMessage");
    const message = uiASvc.getChatMessage();// newMessageInput.value;
    webRTCHandler.sendMessageUsingDataChannel(message);
    ui.appendMessage(message, true);
    newMessageInput.value ='';
    try {
         } catch (error: unknown) {
      webRtc..handleError(error);
    }
  }

  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }  */
}
