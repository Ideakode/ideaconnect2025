import { logger, logErrors } from "../../logs/logs.js";

export class dataChannelMessage {
  public static execute /*  cParams: ICommonParams.commonParams,
    data: unknown */() {
    logger.log(
      this.name,
      "Use Case - dataChannelMessage - Message came from datachannel: "
    );
    //ui.appendMessage(message, false);
  }

  public static handleError(error: unknown) {
    logErrors.send(this.name, error);
  }
}
