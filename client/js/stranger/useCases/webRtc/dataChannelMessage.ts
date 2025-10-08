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
