import { root } from "../../../base/ui/ui.js";

declare global {
  interface Window {
    Document: Document;
  }
}

export class rootStrangerElements extends root.rootElements {}
