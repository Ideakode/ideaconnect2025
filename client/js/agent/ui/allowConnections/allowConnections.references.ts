/**
 * @file allowConnections.references.ts
 * @class allowConnectionsReferences
 *
 * @description
 * Static constants registry for all DOM IDs and CSS class names used by
 * the allowConnections component. Single source of truth — prevents magic
 * strings and enables compile-time typo detection.
 *
 * @properties
 * IDs:
 *   - available_container        → "available_for_connections_container"
 *   - allow_clients_checkbox     → "allow_clients_checkbox"
 *   - allow_clients_checkbox_img → "allow_clients_checkbox_img"
 *   - allow_agents_checkbox      → "allow_agents_checkbox"
 *   - allow_agents_checkbox_img  → "allow_agents_checkbox_img"
 *
 * classes:
 *   - available_container    → "available_for_connections_container"
 *   - checkbox_container     → "checkbox_container"
 *   - checkbox_container_p   → "checkbox_container_paragraph"
 *   - checkbox_connection    → "checkbox_connection"
 *
 * @see allowConnectionsElements — primary consumer of these constants
 */
export class allowConnectionsReferences {
  public static readonly IDs = {
    available_container: "available_for_connections_container",
    allow_clients_checkbox: "allow_clients_checkbox",
    allow_clients_checkbox_img: "allow_clients_checkbox_img",
    allow_agents_checkbox: "allow_agents_checkbox",
    allow_agents_checkbox_img: "allow_agents_checkbox_img",
  };
  public static readonly classes = {
    available_container: "available_for_connections_container",
    checkbox_container: "checkbox_container",
    checkbox_container_p: "checkbox_container_paragraph",
    checkbox_connection: "checkbox_connection",
  };
}
