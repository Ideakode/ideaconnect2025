/**
 * @file dataChannelMessage.ts
 * @class dataChannelMessage
 *
 * @description
 * Use case triggered when a message arrives on the WebRTC data channel.
 * Currently only logs receipt; appending the message to the chat UI is
 * commented out pending view management implementation.
 *
 * @flow
 * webRtcEventMapping (DATACHANNEL_MESSAGE) → dataChannelMessage.execute()
 *   1. Logs "Message came from datachannel"
 *   2. ui.appendMessage(message, false)  — TODO (commented out)
 *
 * @note
 * The execute signature has its parameters commented out (cParams, data).
 * The message content is not yet accessible or passed to the UI.
 *
 * @errorHandling  logErrors.send (logs, does not rethrow)
 *
 * @see webRtcEventMapping — wires DATACHANNEL_MESSAGE event → this use case
 * @see sendChatMessage    — the outbound counterpart (also a stub)
 */
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
