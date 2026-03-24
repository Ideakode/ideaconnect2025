/**
 * @file ui.error.ts
 * @class uiErrorClass
 *
 * @description
 * Typed error thrown when a failure occurs within the UI layer — typically when an expected
 * DOM element cannot be found, or a UI operation (show/hide/create/remove) fails.
 * Distinguishes UI failures from logic failures elsewhere in the stack.
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - All *.elements.ts and *.eventHandler.ts classes (dashboard, callDialog, messenger,
 *   infoDialog, callButtons, listingAgents, allowConnections, totalStrangers, root, etc.)
 *   via errorHandler.propagateErrorUI
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorUI / wrapErrorUI
 */
import { baseErrorClass } from "./base.error.js";

export class uiErrorClass extends baseErrorClass {}
