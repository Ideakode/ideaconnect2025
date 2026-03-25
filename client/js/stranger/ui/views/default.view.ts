/**
 * @file default.view.ts
 * @class defaultView
 *
 * @description
 * The stranger's idle / default view, shown when no call is active.
 * Renders a dashboard containing the agent-listing component inside the
 * root container. Supports show/hide toggling for view-switching.
 *
 * @staticMethods
 * - create(attachToId)
 *     Creates the view wrapper, a STRANGER dashboard, and the agent-list
 *     container, then appends them to the element identified by attachToId.
 *     Called by uiSSvc.initializeUI.
 *
 * - show()
 *     Makes the view wrapper visible. Called by uiSSvc.switchToDefaultView.
 *
 * - hide()
 *     Hides the view wrapper. Called by uiSSvc.switchToChatView.
 *
 * @see uiSSvc.initializeUI, uiSSvc.switchToDefaultView, uiSSvc.switchToChatView
 * @see viewsReferences — IDs and CSS classes
 */
import { viewsReferences } from "./views.references.js";
import * as constants from "../../constants/constants.js";
import { errorHandler } from "../../errors/errors.js";
import { validatorSHelper, uiHelper } from "../../helpers/helpers.js";
import * as ui from "../ui.js";

export class defaultView {
  public static create(attachToId: string) {
    try {
      const validator = validatorSHelper;
      const peerType = constants.peerTypes.STRANGER;
      const el = document.getElementById(attachToId);
      validator.checkHTMLElement(el, attachToId);
      
      const elToAttach = el as HTMLElement;
      const wrapperview = this.createWrapper();
      const dash = ui.dashboard.createDashboard(peerType);
      const agentList = ui.listingAgents.createAgentListContainer();
      dash.appendChild(agentList);
      wrapperview.appendChild(dash);
      elToAttach.appendChild(wrapperview);
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
      const validator = validatorSHelper;
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
