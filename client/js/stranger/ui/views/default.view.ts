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
