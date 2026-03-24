/**
 * @file messenger.references.ts
 * @class messengerReferences
 *
 * @description
 * Constants registry for the messenger (chat panel) component. Provides all id and CSS
 * class name strings used by messengerElements when creating, querying, and updating
 * the chat panel DOM nodes.
 *
 * @IDs
 * - messenger_container           →  id="messenger_container"          — root panel element
 * - messages_container            →  id="messages_container"           — scrollable message history area
 * - new_message_input             →  id="new_message_input"            — text input for composing messages
 * - send_message_button           →  id="send_message_button"          — send button; event registered by
 *                                                                         messengerEventHandler
 * - new_message_container         →  id="new_message"                  — wrapper for input + send button
 * - finish_chat_button_container  →  id="finish_chat_button_container" — (reserved; not yet rendered)
 * - messenger_finish_call_button  →  id="finish_call_button"           — (reserved; not yet rendered)
 * - messenger_title_state         →  id="messenger_title_state"        — <p> showing "Connected to" /
 *                                                                         "Connecting with"; updated by
 *                                                                         updateMessengerTitleState()
 * - messenger_title_peerName      →  id="messenger_title_peerName"     — <p> showing the remote peer's name
 *
 * @classes
 * - messenger_container        →  "messenger_container"
 * - messages_container         →  "messages_container"
 * - new_message_container      →  "new_message_container"
 * - new_message_input          →  "new_message_input"
 * - send_message_button        →  "send_message_button"
 * - send_message_button_image  →  "send_message_button_image"   — applied to the send button <img>
 * - finish_chat_button_container → "finish_chat_button_container"
 * - call_button_large          →  "call_button_large"           — (reserved)
 * - messenger_title            →  "messenger_title"             — applied to the title wrapper div
 *
 * @usedBy messengerElements
 */
export default class messengerReferences {
  public static readonly IDs = {
    messenger_container: "messenger_container",
    messages_container: "messages_container",
    new_message_input: "new_message_input",
    send_message_button: "send_message_button",
    new_message_container: "new_message",
    finish_chat_button_container: "finish_chat_button_container",
    messenger_finish_call_button: "finish_call_button",
    messenger_title_state: "messenger_title_state",
    messenger_title_peerName: "messenger_title_peerName",
  };
  public static readonly classes = {
    messenger_container: "messenger_container",
    messages_container: "messages_container",
    new_message_container: "new_message_container",
    new_message_input: "new_message_input",
    send_message_button: "send_message_button",
    send_message_button_image: "send_message_button_image",
    finish_chat_button_container: "finish_chat_button_container",
    call_button_large: "call_button_large",
    messenger_title: "messenger_title",
  };
}
