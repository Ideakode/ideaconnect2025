/**
 * @file root.references.ts
 * @class rootReferences
 *
 * @description
 * Constants registry for the root container — the top-level DOM mounting point
 * shared across all peer UI views (agent and stranger).
 * Also defines the two cross-cutting utility classes reused by every other UI
 * component in the application.
 *
 * @IDs
 * - root_container  →  id="root_container"   — the single mount point appended to <body>
 *
 * @classes
 * - display_none    →  "display_none"   — utility class; toggles element visibility
 *                                         (used by uiHelper.showElement / hideElement)
 * - disabled        →  "disabled"       — utility class; visually disables interactive
 *                                         components (e.g. messenger while WEBRTC_PROGRESS)
 * - root_container  →  "root_container" — CSS class applied to the root <div>
 *
 * @usedBy
 * - rootElements       - creates / queries #root_container
 * - dashboardElements  - applies display_none to the blur overlay
 * - messengerElements  - applies disabled to the messenger container
 * - All UI *.elements.ts files reference display_none / disabled indirectly via rootReferences
 */
export class rootReferences {
  public static readonly IDs = {
    root_container: "root_container",
  };
  public static readonly classes = {
    display_none: "display_none",
    disabled: "disabled",
    root_container: "root_container",
  };
}
