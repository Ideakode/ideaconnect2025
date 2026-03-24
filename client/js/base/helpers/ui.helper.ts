/**
 * @file ui.helper.ts
 * @class uiHelper
 *
 * @description
 * Low-level DOM utility methods shared across all UI components. All methods operate on
 * already-resolved HTMLElement references (callers are responsible for obtaining and
 * validating elements before passing them in).
 *
 * @staticMethods
 * - hideElement(element)
 *     Adds the "display_none" CSS class to the element if not already present.
 * - showElement(element)
 *     Removes the "display_none" CSS class from the element if present.
 * - getFriendlyCallTypeText(callType): string
 *     Maps a callType constant (CHAT / AUDIO / VIDEO) to a human-readable label
 *     ("Chat" / "Audio" / "Video"). Used by UI text helpers (e.g. callDialog.texts.ts)
 *     when displaying call type in dialogs.
 *
 * @see rootReferences.classes.display_none  - the CSS class toggled by hide/show
 * @see constants.callType                   - CHAT / AUDIO / VIDEO constants
 */
import * as constants from "../constants/constants.js";
import { logger } from "../logs/logs.js";

export class uiHelper {
  public static hideElement(element: HTMLElement): void {
    if (!element.classList.contains("display_none")) {
      element.classList.add("display_none");
    }
    logger.log(this.name, "hideElement - executed");
  }

  public static showElement(element: HTMLElement): void {
    if (element.classList.contains("display_none")) {
      element.classList.remove("display_none");
    }
    logger.log(this.name, "showElement - executed");
  }

  public static getFriendlyCallTypeText(callType: string): string {
    switch (callType) {
      case constants.callType.CHAT:
        return "Chat";
      case constants.callType.AUDIO:
        return "Audio";
      case constants.callType.VIDEO:
        return "Video";
      default:
        return "";
    }
  }
}
