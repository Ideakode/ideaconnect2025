/**
 * @file dataChannelMessage.ts
 * @class dataChannelMessage
 *
 * @description
 * Use case triggered when a message arrives over the WebRTC data channel.
 * Currently logs the received message. The UI append call is commented
 * out pending chat UI integration.
 *
 * @staticMethods
 * - execute(cParamsData, attachedCDetailsData, message)
 *     Logs the incoming message. (ui.appendMessage is TODO)
 *
 * @see webRtcEventMapping — registers this as the DATACHANNEL_MESSAGE listener
 */
import { logger, logErrors } from "../../logs/logs.js";

export class dataChannelMessage {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    attachedCDetailsData: unknown /* ICallDetails.callDetails */,
    message: unknown
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);
    logger.log(this.name, "dataChannelMessage | Data: ", [message]);
    //ui.appendMessage(message, false);
  }

  public static handleError(error: unknown) {
    logErrors.send(this.name, error);
  }
}
