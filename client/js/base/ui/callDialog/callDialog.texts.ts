import { uiHelper } from "../../helpers/ui.helper.js";

export default class callDialogTexts {
  public static title(
    callType: string,
    name: string = "",
    isIncoming: boolean = false
  ): string {
    let titleDescription = "";
    const ctype = uiHelper.getFriendlyCallTypeText(callType);

    if (isIncoming) {
      name = name ? "from " + name : "";
      titleDescription = "Incoming Call " + name + " (" + ctype + ")";
    } else {
      titleDescription = "Calling " + name + " (" + ctype + ")";
    }
    titleDescription = titleDescription.trim().split(/\s+/).join(" ");
    return titleDescription;
  }
}
