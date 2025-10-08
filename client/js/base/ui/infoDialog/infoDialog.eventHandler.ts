import { store } from "../../classes/classes.js";
import infoDialogElements from "./infoDialog.elements.js";

export default class infoDialogEventHandler {
  public static registeraDialogAutoClosureEvent(
    callback: (store: store) => void,
    delay: number = 1,
    store: store | null = null
  ) {
    window.setTimeout(() => {
      if (callback !== null && store !== null) {
        callback(store);
      }
      infoDialogElements.closeInfoDialogIfOpen();
    }, delay * 1000);
  }
}
