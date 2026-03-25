/**
 * @file views.ts (stranger/ui/views)
 *
 * @description
 * Aggregates the two stranger views into a single named export:
 * - views.defaultView  — the agent-listing / idle state view
 * - views.chatView     — the active-call / messaging view
 */
import { defaultView } from "./default.view.js";
import { chatView } from "./chat.view.js";

export const views = { defaultView, chatView };
