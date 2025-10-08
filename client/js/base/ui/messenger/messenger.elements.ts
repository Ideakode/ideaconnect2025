import texts from "./messenger.texts.js";
import messengerReferences from "./messenger.references.js";
import messengerTexts from "./messenger.texts.js";
import { errorHandler } from "../../errors/errors.js";
import { validatorHelper } from "../../helpers/helpers.js";
import { rootReferences } from "../root/root.references.js";

export class messengerElements {
  public static createMessenger(
    name: string = "",
    connected: boolean
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

    const messengerC = this.createMessengerContainer(connected);
    const msgsC = this.createMessagesContainer();
    const title = this.createMessengerTitle(name, connected);
    const newMsgsC = this.createNewMessageContainer();
    messengerC.appendChild(title);
    messengerC.appendChild(msgsC);
    messengerC.appendChild(newMsgsC);
    return messengerC;
  }

  private static createMessengerTitle(
    name: string,
    connected: boolean
  ): HTMLDivElement {
    /**
    <div class="messenger_title" id="messages_container">
          <p id="messenger_title_state">Connected to/Connecting with</p>
          <p id="messenger_title_name">Name</p>
    </div>
    */

    const state = document.createElement("p") as HTMLParagraphElement;
    state.id = messengerReferences.IDs.messenger_title_state;
    state.innerHTML = messengerTexts.title(connected);

    const peerName = document.createElement("p") as HTMLParagraphElement;
    peerName.id = messengerReferences.IDs.messenger_title_peerName;
    peerName.innerHTML = name;

    const cont = document.createElement("div") as HTMLDivElement;
    cont.classList.add(messengerReferences.classes.messenger_title);

    cont.appendChild(state);
    cont.appendChild(peerName);
    return cont;
  }

  private static createMessengerContainer(connected: boolean): HTMLDivElement {
    /*
    <div class="messenger_container [disabled]"></div>
    */

    const messengerC = document.createElement("div") as HTMLDivElement;
    messengerC.classList.add(messengerReferences.classes.messenger_container);
    if (!connected) {
      messengerC.classList.add(rootReferences.classes.disabled);
    }
    messengerC.id = messengerReferences.IDs.messenger_container;
    return messengerC;
  }

  private static createMessagesContainer(): HTMLDivElement {
    /* 
    <div class="messages_container" id="messages_container"></div> 
    */

    const msgsC = document.createElement("div") as HTMLDivElement;
    msgsC.classList.add(messengerReferences.classes.messages_container);
    msgsC.id = messengerReferences.IDs.messages_container;
    return msgsC;
  }

  private static createNewMessageContainer(): HTMLDivElement {
    /*    
    <div class="new_message_container display_none" id="new_message">
      <input class="new_message_input" id="new_message_input" type="text" placeholder="Type your message..." />
      <button class="send_message_button"  id="send_message_button">
          <img class="send_message_button_image" src="./utils/images/sendMessageButton.png" />
      </button>
    </div>
    */
    const newMsgC = document.createElement("div") as HTMLDivElement;
    newMsgC.classList.add(messengerReferences.classes.new_message_container);
    newMsgC.id = messengerReferences.IDs.new_message_container;
    const newMsg = this.createNewMessageInput();
    const sendMsgBtn = this.createSendMessageButton();
    newMsgC.appendChild(newMsg);
    newMsgC.appendChild(sendMsgBtn);
    return newMsgC;
  }

  private static createNewMessageInput(): HTMLInputElement {
    /*    
      <input class="new_message_input" id="new_message_input" type="text" placeholder="Type your message..." />
    */
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "text";
    input.placeholder = texts.inputTextPlaceholder();
    input.classList.add(messengerReferences.classes.new_message_input);
    input.id = messengerReferences.IDs.new_message_input;

    return input;
  }

  private static createSendMessageButton(): HTMLButtonElement {
    /*    
      <button class="send_message_button"  id="send_message_button">
          <img class="send_message_button_image" src="./utils/images/sendMessageButton.png" />
      </button>
    */
    const btn = document.createElement("button") as HTMLButtonElement;
    btn.classList.add(messengerReferences.classes.send_message_button);
    btn.id = messengerReferences.IDs.send_message_button;
    const img = this.createSendButtonImg();
    btn.appendChild(img);
    return btn;
  }
  private static createSendButtonImg(): HTMLImageElement {
    /*    
    <img class="send_message_button_image" src="./utils/images/sendMessageButton.png" />
    */
    const img = document.createElement("img") as HTMLImageElement;
    img.classList.add(messengerReferences.classes.send_message_button_image);
    img.src = "./utils/images/sendMessageButton.png";
    return img;
  }

  private static getMessengerContainerIfExists(): HTMLDivElement | null {
    const elName = messengerReferences.IDs.messenger_container;
    const msgC = document.getElementById(elName);
    return msgC ? (msgC as HTMLDivElement) : null;
  }

  private static getMessengerContainer(): HTMLDivElement {
    try {
      const elName = messengerReferences.IDs.messenger_container;
      const msgC = document.getElementById(elName);
      validatorHelper.checkHTMLElement(msgC);
      return msgC as HTMLDivElement;
    } catch (error: unknown) {
      const method = this.getMessengerContainer.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static getMessengerTitleState() {
    try {
      const elName = messengerReferences.IDs.messenger_title_state;
      const state = document.getElementById(elName);
      validatorHelper.checkHTMLElement(state, elName);
      return state as HTMLParagraphElement;
    } catch (error: unknown) {
      const method = this.getMessengerTitleState.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static getSendMessageButton(
    messenger: HTMLDivElement
  ): HTMLButtonElement {
    try {
      const elName = messengerReferences.IDs.send_message_button;
      const btn = messenger.querySelector("#" + elName);
      validatorHelper.checkHTMLElement(btn, elName);

      return btn as HTMLButtonElement;
    } catch (error: unknown) {
      const method = this.getSendMessageButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static getNewMessageInput(): HTMLInputElement {
    try {
      const elName = messengerReferences.IDs.new_message_input;
      const btn = document.getElementById(elName);
      validatorHelper.checkHTMLElement(btn, elName);

      return btn as HTMLInputElement;
    } catch (error: unknown) {
      const method = this.getSendMessageButton.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getChatMessageText() {
    try {
      return this.getNewMessageInput().value;
    } catch (error) {
      const method = this.getChatMessageText.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static closeMessengerIfOpen() {
    const container = this.getMessengerContainerIfExists();
    if (container) container.remove();
  }
  public static closeMessenger() {
    try {
      const msgC = this.getMessengerContainer();
      msgC.remove();
    } catch (error: unknown) {
      const method = this.closeMessenger.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static toggleMessengerEnabled(connected: boolean) {
    try {
      const msgr = this.getMessengerContainer();
      if (connected) {
        msgr.classList.remove("disabled");
      } else {
        msgr.classList.add("disabled");
      }
    } catch (error) {
      const method = this.toggleMessengerEnabled.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static updateMessengerTitleState(connected: boolean) {
    try {
      const state = this.getMessengerTitleState();
      state.innerHTML = messengerTexts.title(connected);
    } catch (error) {
      const method = this.updateMessengerTitleState.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
