/**
 * @file callButtons.references.ts
 * @class callButtonsReferences
 *
 * @description
 * Constants registry for the call buttons component — the in-call action buttons
 * shown during an active call session. Provides all id and CSS class name strings
 * used by callButtonsElements when creating and querying button DOM nodes.
 *
 * @IDs
 * - finish_call_button_container  →  id="finish_call_button_container"  — wrapper div for the hang-up button
 * - finish_call_button            →  id="finish_call_button"             — the hang-up <button> element;
 *                                                                           queried by getFinishCallButton()
 *
 * @classes
 * - finish_call_button_container  →  "finish_call_button_container"  — container styling
 * - call_button_small             →  "call_button_small"             — sizing class applied to the button
 *
 * @usedBy callButtonsElements
 */
export default class callButtonsReferences {
  public static readonly IDs = {
    finish_call_button_container: "finish_call_button_container",
    finish_call_button: "finish_call_button",
  };
  public static readonly classes = {
    finish_call_button_container: "finish_call_button_container",
    call_button_small: "call_button_small",
  };
}
