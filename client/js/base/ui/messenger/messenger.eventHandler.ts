/**
 * @file messenger.eventHandler.ts
 * @class messengerEventHandler
 *
 * @description
 * Registers DOM click event listeners on the messenger's send button.
 *
 * @staticMethods
 * - registerSendMessageButton(cParams, cDetails, btn, fnSendMsg)
 *     Attaches a click listener to the supplied button element.
 *     On click, shows a temporary alert (debugging remnant) then calls
 *     fnSendMsg(cParams, cDetails).
 *
 * @note The commented-out block shows the original intended implementation using
 *       both a keydown (Enter key) and a click listener directly on the DOM elements.
 *       The current implementation defers message reading to the use case via getChatMessageText.
 *
 * @see messenger  - calls this after creating the messenger component
 */
import { errorHandler } from "../../errors/errors.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { fnVoidAnyArguments } from "../../types/types.js";

export default class messengerEventHandler {
  public static registerSendMessageButton(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    btn: HTMLElement,
    fnSendMsg: fnVoidAnyArguments
  ) {
    try {
      btn.addEventListener("click", () => {
        alert("Sending Message");
        fnSendMsg(cParams, cDetails);
      });
    } catch (error: unknown) {
      const method = this.registerSendMessageButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  /* 
  const newMessageInput = document.getElementById('new_message_input');
  newMessageInput.addEventListener('keydown', (e) =>{
      console.log('MessageINput change occurred');
      const key = e.key;
      if (key === 'Enter'){
          webRTCHandler.sendMessageUsingDataChannel(e.target.value);
          ui.appendMessage(e.target.value, true);
          newMessageInput.value ='';
      }
  });
  
  const sendMessageButton = document.getElementById('send_message_button');
  sendMessageButton.addEventListener('click', () => {
      const message = newMessageInput.value;
      webRTCHandler.sendMessageUsingDataChannel(message);
      ui.appendMessage(message, true);
      newMessageInput.value ='';
  });
 */
}
