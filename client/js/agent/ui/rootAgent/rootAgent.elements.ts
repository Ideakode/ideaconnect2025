/**
 * @file rootAgent.elements.ts
 * @class rootAgentElements
 *
 * @description
 * Agent-specific extension of the base root elements class.
 * Inherits `createRootContainer()` and `getRootContainer()` from
 * `root.rootElements` without modification. Exists as an extension
 * point for any agent-specific root DOM operations.
 *
 * @see root.rootElements — base class providing createRootContainer / getRootContainer
 * @see rootAgent         — facade that calls rootAgentElements.createRootContainer()
 */
import { root } from "../../../base/ui/ui.js";

export class rootAgentElements extends root.rootElements {}
