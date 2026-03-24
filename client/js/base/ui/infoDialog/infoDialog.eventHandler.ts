/**
 * @file infoDialog.eventHandler.ts
 * @class infoDialogEventHandler
 *
 * @description
 * Manages the auto-closure lifecycle of the info dialog.
 *
 * @staticMethods
 * - registeraDialogAutoClosureEvent(callback, delay?, store?)
 *     Schedules a window.setTimeout for delay * 1000 ms (default 1 s).
 *     When the timer fires:
 *       1. If both callback and store are non-null, calls callback(store)
 *          (typically to reset the peer UI back to the default view).
 *       2. Calls infoDialogElements.closeInfoDialogIfOpen() to remove the dialog.
 *
 * @param callback - fnVoidStoreArgument called with the store after the delay
 * @param delay    - seconds to wait before auto-closing (default 1)
 * @param store    - optional store passed to the callback; dialog still closes if null
 *
 * @see infoDialog  - calls this immediately after appending the dialog to the DOM
 */
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
