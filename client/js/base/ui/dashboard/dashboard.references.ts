/**
 * @file dashboard.references.ts
 * @class dashboardReferences
 *
 * @description
 * Constants registry for the dashboard component — the landing screen shown when
 * no call is active. Provides all id and CSS class name strings used by
 * dashboardElements when creating and querying dashboard DOM nodes.
 *
 * @IDs
 * - dash_cont      →  id="dashboard_container"  — root container; toggled by toggleDashboard()
 * - dash_logo_cont →  id="logo_container"        — logo wrapper (not queried, set for reference)
 * - dash_blur      →  id="dashboard_blur"        — overlay shown during a call to blur the dashboard
 * - agent_name     →  id="agent_name"            — <span> updated by setPeerName() with the peer's name
 *
 * @classes
 * - dash_cont          →  "dashboard_container"
 * - dash_logo_cont     →  "logo_container"
 * - dash_desc_cont     →  "description_container"
 * - dash_desc_cont_p   →  "description_container_paragraph"
 * - dash_blur          →  "dashboard_blur"
 * - description_name   →  "description_name"     — applied to the #agent_name span
 *
 * @usedBy dashboardElements
 */
export class dashboardReferences {
  public static readonly IDs = {
    dash_cont: "dashboard_container",
    dash_logo_cont: "logo_container",
    dash_blur: "dashboard_blur",
    agent_name: "agent_name",
  };
  public static readonly classes = {
    dash_cont: "dashboard_container",
    dash_logo_cont: "logo_container",
    dash_desc_cont: "description_container",
    dash_desc_cont_p: "description_container_paragraph",
    dash_blur: "dashboard_blur",
    description_name: "description_name",
  };
}
