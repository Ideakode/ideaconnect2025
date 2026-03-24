/**
 * @file rooAgent.references.ts
 * @class rootAgentReferences
 *
 * @description
 * Agent-specific extension of the base root references class.
 * Inherits the `IDs` and `classes` constant registries from
 * `root.rootReferences` (which includes `display_none`, `disabled`,
 * and the root container id) without modification. Exists as an
 * extension point for any agent-specific root DOM id/class constants.
 *
 * @note Filename has a typo: `rooAgent` instead of `rootAgent`.
 *
 * @see root.rootReferences — base class providing IDs and classes registries
 * @see rootAgent           — facade that calls getClasses() / getIDs()
 */
import { root } from "../../../base/ui/ui.js";

export class rootAgentReferences extends root.rootReferences {}
