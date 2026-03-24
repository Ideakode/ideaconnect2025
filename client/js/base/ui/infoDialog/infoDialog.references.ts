/**
 * @file infoDialog.references.ts
 * @class infoDialogReferences
 *
 * @description
 * Constants registry for the info dialog component — the auto-closing notification
 * modal shown after call signaling events (e.g. rejected, busy). Provides all id and
 * CSS class name strings used by infoDialogElements.
 *
 * @IDs
 * - info_dialog_container  →  id="info_dialog_container"  — root element; used by
 *                                                            closeInfoDialogIfOpen / getInfoDialogContainerIfExists
 * - info_dialog            →  id="call_dialog"            — legacy id used by getInfoDialogContainer()
 *                                                            when querying the existing dialog for removal
 *
 * @classes
 * - info_dialog_container        →  "dialog_container"       — shared with callDialog for consistent modal styling
 * - info_dialog_wrapper          →  "dialog_wrapper"
 * - info_dialog_content          →  "dialog_content"
 * - info_dialog_title            →  "dialog_title"
 * - info_dialog_description      →  "dialog_description"     — <p> showing the descriptive info text
 * - info_dialog_image_container  →  "dialog_image_container"
 *
 * @note The info dialog deliberately shares CSS class names with callDialog
 *       ("dialog_container", "dialog_wrapper", etc.) so both modals use the same stylesheet rules.
 *
 * @usedBy infoDialogElements
 */
export default class infoDialogReferences {
  public static readonly IDs = {
    info_dialog_container: "info_dialog_container",
    info_dialog: "call_dialog",
  };
  public static readonly classes = {
    info_dialog_container: "dialog_container",
    info_dialog_wrapper: "dialog_wrapper",
    info_dialog_content: "dialog_content",
    info_dialog_title: "dialog_title",
    info_dialog_description: "dialog_description",
    info_dialog_image_container: "dialog_image_container",
  };
}
