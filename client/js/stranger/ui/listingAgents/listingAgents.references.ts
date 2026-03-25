/**
 * @file listingAgents.references.ts
 * @class listingAgentsReferences
 *
 * @description
 * Centralises DOM IDs and CSS class names for the agent listing component.
 *
 * IDs:     agents_list, agents_count, agents_container
 * Classes: agents_container, agents_container_title, agents_list, connecting_button
 */
export class listingAgentsReferences {
  public static readonly IDs = {
    agents_list: "agents_list",
    agents_count: "agents_count",
    agents_container: "agents_container",
  };
  public static readonly classes = {
    agents_container: "agents_container",
    agents_container_title: "agents_container_title",
    agents_list: "agents_list",
    connecting_button: "connecting_button",
  };
}
