/**
 * @file ui.ts (stranger/ui)
 *
 * @description
 * Barrel that aggregates all UI component exports available to the stranger module.
 * Re-exports shared components from base (callButtons, callDialog, messenger,
 * dashboard, infoDialog) and stranger-specific components:
 * - views         — { defaultView, chatView }
 * - rootStranger  — root container management
 * - listingAgents — agent roster component
 */
export {
  callButtons,
  callDialog,
  messenger,
  dashboard,
  infoDialog,
} from "../../base/ui/ui.js";

export * from "./views/views.js";
export * from "./rootStranger/rootStranger.js";
export * from "./listingAgents/listingAgents.js";
