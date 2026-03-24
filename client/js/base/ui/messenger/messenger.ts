/**
 * @file messenger.ts
 * @class messenger
 *
 * @description
 * Public API for the messenger (chat panel) UI component. Displayed during an active call
 * when the call type is CHAT or alongside an audio/video call for text exchange.
 * The messenger's enabled/disabled state tracks the call's connection state:
 * disabled (greyed out) while WEBRTC_PROGRESS, enabled once CONNECTED.
 *
 * @html
 * <div class="messenger_container [disabled]" id="messenger_container">
 *   <div class="messenger_title">
 *     <p id="messenger_title_state">Connecting with / Connected to</p>
 *     <p id="messenger_title_peerName">[name]</p>
 *   </div>
 *   <div class="messages_container" id="messages_container"></div>
 *   <div class="new_message_container" id="new_message_container">
 *     <input id="new_message_input" type="text" />
 *     <button id="send_message_button"><img sendMessageButton.png /></button>
 *   </div>
 * </div>
 *
 * @staticMethods
 * - createMessenger(cParams, cDetailsToAttach, name?, fnSendMsg): HTMLDivElement
 *     Builds the messenger DOM and optionally registers the send-button click handler.
 *     The messenger is rendered disabled if callState is not CONNECTED.
 * - getChatMessageText(): string
 *     Returns the current value of the #new_message_input field.
 * - closeMessenger(raiseError): void
 *     Removes the messenger. If raiseError is true, throws if the element is missing.
 * - refreshState(callState): void
 *     Updates the messenger title text and enabled/disabled CSS class to reflect
 *     the current callState (CONNECTED vs any other state).
 *
 * @see messengerElements     - (./messenger.elements.ts) all DOM operations
 * @see messengerEventHandler - (./messenger.eventHandler.ts) send button registration
 */
import { errorHandler } from "../../errors/errors.js";
import { messengerElements } from "./messenger.elements.js";
import messengerEventHandler from "./messenger.eventHandler.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { fnVoidAnyArguments } from "../../types/types.js";
import * as constants from "../../constants/constants.js";

export class messenger {
  public static createMessenger(
    cParams: ICommonParams.commonParams,
    cDetailsToAttach: ICallDetails.callDetails,
    name: string = "",
    fnSendMsg: fnVoidAnyArguments | null
  ): HTMLDivElement {
    /* 
  <div class="messenger_container">
      <div class="messenger_title" id="messages_container">
        <p id="messenger_title_state">Connected to/Connecting with</p>
        <p id="messenger_title_name">Name</p>
      </div>
      <div class="messages_container" id="messages_container"></div>
      <div class="new_message_container display_none" id="new_message">
          <input class="new_message_input" id="new_message_input" type="text" placeholder="Type your message..." />
          <button class="send_message_button"  id="send_message_button">
              <img class="send_message_button_image" src="./utils/images/sendMessageButton.png" />
          </button>
      </div>
  </div>
  */
    try {
      const connected = this.getIsConnected(cParams.store.callState);
      const messenger = messengerElements.createMessenger(name, connected);
      const sendBtn = messengerElements.getSendMessageButton(messenger);
      if (fnSendMsg) {
        messengerEventHandler.registerSendMessageButton(
          cParams,
          cDetailsToAttach,
          sendBtn,
          fnSendMsg
        );
      }
      return messenger;
    } catch (error: unknown) {
      const method = this.createMessenger.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getChatMessageText(): string {
    return messengerElements.getChatMessageText();
  }
  public static closeMessenger(raiseError: boolean) {
    if (raiseError) {
      messengerElements.closeMessenger();
    } else {
      messengerElements.closeMessengerIfOpen();
    }
  }

  public static refreshState(callState: string) {
    if (this.getIsConnected(callState)) {
      messengerElements.toggleMessengerEnabled(true);
      messengerElements.updateMessengerTitleState(true);
    } else {
      messengerElements.toggleMessengerEnabled(false);
      messengerElements.updateMessengerTitleState(false);
    }
  }

  private static getIsConnected(callState: string): boolean {
    return callState === constants.callState.CONNECTED;
  }
}
