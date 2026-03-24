/**
 * @file default.view.ts
 * @class defaultView
 *
 * @description
 * The agent's default (landing) view. Shown when the agent is idle and waiting
 * for calls. Assembles the dashboard, allowConnections checkboxes, and total
 * strangers counter, then attaches them inside a wrapper div appended to the
 * given parent element.
 *
 * @staticMethods
 * - create(attachToId) — builds and appends defaultView content into the given parent id
 * - show()             — removes display_none from the view wrapper
 * - hide()             — adds display_none to the view wrapper
 *
 * @html (wrapper structure)
 * ```html
 * <div id="view_default" class="view view_default">
 *   <!-- dashboard with allowConnections and totalStrangers appended inside -->
 * </div>
 * ```
 *
 * @see viewsReferences     — provides view_default id and class constants
 * @see dashboard           — main panel containing agent name and blur overlay
 * @see allowConnections    — availability checkboxes appended into dashboard
 * @see totalStrangers (UI) — stranger count status appended into dashboard
 * @see uiAgentService.initializeUI — calls defaultView.create during bootstrap
 */
import { viewsReferences } from "./views.references.js";
import * as constants from "../../constants/constants.js";
import { errorHandler } from "../../errors/errors.js";
import { validatorAHelper, uiHelper } from "../../helpers/helpers.js";
import {dashboard, allowConnections,totalStrangers}  from "../ui.js";


export class defaultView {
  public static create(attachToId: string) {
    try {
      const validator = validatorAHelper;
      const peerType = constants.peerTypes.AGENT;
      const el = document.getElementById(attachToId);
      validator.checkHTMLElement(el, attachToId);
      const elToAttach = el as HTMLElement;

      const dashC = dashboard.createDashboard(peerType);
      const allowConn = allowConnections.createAllowConnections();
      const totalStrangersC = totalStrangers.createStrangerStatus();
      dashC.appendChild(allowConn);
      dashC.appendChild(totalStrangersC);
      elToAttach.appendChild(dashC);
      
    } catch (error) {
      const method = this.create.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static hide() {
    try {
      this.toggleView(false);
    } catch (error) {
      const method = this.hide.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static show() {
    try {
      this.toggleView(true);
    } catch (error) {
      const method = this.show.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static toggleView(show: boolean) {
    try {
      const wrapper = this.getWrapper();
      if (show) uiHelper.showElement(wrapper);
      else uiHelper.hideElement(wrapper);
    } catch (error: unknown) {
      const method = this.toggleView.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static createWrapper(): HTMLDivElement {
    const wrapper = document.createElement("div") as HTMLDivElement;
    const css1 = viewsReferences.classes.view;
    const css2 = viewsReferences.classes.view_default;
    wrapper.classList.add(css1, css2);
    wrapper.id = viewsReferences.IDs.view_default;
    return wrapper;
  }

  private static getWrapper(): HTMLDivElement {
    try {
      const validator = validatorAHelper;
      const elName = viewsReferences.IDs.view_default;
      const el = document.getElementById(elName);
      validator.checkHTMLElement(el, elName);
      return el as HTMLDivElement;
    } catch (error) {
      const method = this.getWrapper.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
}
