/**
 * @file callDialog.references.ts
 * @class callDialogReferences
 *
 * @description
 * Constants registry for the call dialog component — the modal shown during the
 * ALERTING state for both incoming and outgoing calls. Provides all id and CSS class
 * name strings used by callDialogElements when creating, querying, and removing the dialog.
 *
 * @IDs
 * - call_dialog_container           →  id="call_dialog_container"   — root dialog element; used
 *                                                                       by closeCallDialog / getCallDialogContainer
 * - call_dialog_accept_call_button  →  id="accept_call_button"       — rendered for incoming calls only
 * - call_dialog_reject_call_button  →  id="reject_call_button"       — rendered for incoming calls only
 * - call_dialog_hang_up_call_button →  id="hang_up_call_button"      — rendered for outgoing calls only
 *
 * @classes
 * - call_dialog_container           →  "dialog_container"
 * - call_dialog_wrapper             →  "dialog_wrapper"
 * - call_dialog_content             →  "dialog_content"
 * - call_dialog_title               →  "dialog_title"
 * - call_dialog_image_container     →  "dialog_image_container"
 * - call_dialog_accept_call_button  →  "dialog_accept_call_button"
 * - call_dialog_reject_call_button  →  "dialog_reject_call_button"
 * - call_dialog_button_container    →  "dialog_button_container"
 *
 * @usedBy callDialogElements
 */
export default class callDialogReferences {
  public static readonly IDs = {
    call_dialog_container: "call_dialog_container",
    call_dialog_accept_call_button: "accept_call_button",
    call_dialog_reject_call_button: "reject_call_button",
    call_dialog_hang_up_call_button: "hang_up_call_button",
  };
  public static readonly classes = {
    call_dialog_container: "dialog_container",
    call_dialog_wrapper: "dialog_wrapper",
    call_dialog_content: "dialog_content",
    call_dialog_title: "dialog_title",
    call_dialog_image_container: "dialog_image_container",
    call_dialog_accept_call_button: "dialog_accept_call_button",
    call_dialog_reject_call_button: "dialog_reject_call_button",
    call_dialog_button_container: "dialog_button_container",
  };
}
