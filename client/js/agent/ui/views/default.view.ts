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
