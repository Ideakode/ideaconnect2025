/**
 * @file rootStranger.elements.ts
 * @class rootStrangerElements
 *
 * @description
 * Extends rootElements from the base UI module.
 * Inherits createRootContainer() which produces the styled wrapper
 * div that houses all stranger UI components.
 *
 * @see root.rootElements (base)
 */
import { root } from "../../../base/ui/ui.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class rootStrangerElements extends root.rootElements {}
