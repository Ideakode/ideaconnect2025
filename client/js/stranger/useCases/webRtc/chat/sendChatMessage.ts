/**
 * @file sendChatMessage.ts
 * @class sendChatMessage
 *
 * @description
 * Use case triggered when the stranger submits a chat message.
 * Reads the message text from the UI, validates that the call is still
 * active, and logs the message. Actual data channel transmission and
 * UI append are pending implementation (commented-out TODO block).
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     1. Parses cParams and call details
 *     2. Gets message text via uiSSvc.getChatMessageText
 *     3. Validates call state
 *     4. console.log (transmission TODO)
 *
 * @see chatView   — send button wires sendChatMessage.execute
 * @see dataChannelOpen  — must fire before sending is meaningful
 */
import { uiSSvc } from "../../../services/services.js";
import { useCaseErrors } from "../../usesCases.js";
import { logger } from "../../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../../helpers/helpers.js";

export class sendChatMessage {
  public static execute(
    cParamsData: unknown /*ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "sendChatMessage";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const message = uiSSvc.getChatMessageText();
      validator.checkCall(cParams.store, cDetails);
      console.log("Message to be sent: " + message);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
    /* const message = uiSSvc.getChatMessageText();// newMessageInput.value;
    webRTCHandler.sendMessageUsingDataChannel(message);
    ui.appendMessage(message, true);
    newMessageInput.value ='';
    try {
      const parser = parserSHelper;
const validator = validatorSHelper;
      
         } catch (error: unknown) {
     const className = (typeof this !== 'undefined') ? this.name : "callSignaling";
const className = miscHelper.getClassName(this " strangerInitialization");
           const method = "execute";
           useCaseErrors.executeDefault(className, method, error);
    } */
  }

  /*   public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
