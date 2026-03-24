/**
 * @file views.ts
 *
 * @description
 * Barrel re-export for all agent view classes. Combines defaultView and chatView
 * into a single `views` namespace object consumed by the UI layer.
 *
 * @exports
 * - views.defaultView — landing screen with dashboard, checkboxes, stranger count
 * - views.chatView    — active call screen with messenger and finish-call button
 *
 * @see default.view.ts — defaultView implementation
 * @see chat.view.ts    — chatView implementation
 */
import { defaultView } from "./default.view.js";
import { chatView } from "./chat.view.js";

export const views = { defaultView, chatView };
