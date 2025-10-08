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
