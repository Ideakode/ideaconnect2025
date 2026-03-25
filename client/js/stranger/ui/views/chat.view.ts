/**
 * @file chat.view.ts
 * @class chatView
 *
 * @description
 * The stranger's active-call view, created when a CHAT call is accepted.
 * Renders a messenger component and an end-call button inside a new
 * wrapper div. The view is fully destroyed (not just hidden) when
 * the call ends, and recreated fresh for the next call.
 *
 * @staticMethods
 * - create(cParams, cDetails, attachToId, fnSendMsg, fnEndCall)
 *     Builds the messenger and end-call button, wraps them, and appends
 *     to attachToId. Called by uiSSvc.switchToChatView.
 *
 * - show() / hide()
 *     Toggles visibility of the wrapper element by ID.
 *
 * - destroy()
 *     Removes the wrapper element from the DOM. Throws if element not found.
 *
 * - destroyIfExists()
 *     Removes the wrapper element if it exists; no-op otherwise.
 *     Called by uiSSvc.switchToChatView before re-creating the view.
 *
 * - refresh(cParams)
 *     Updates the messenger state display (e.g. call state label).
 *     Called by uiSSvc.refreshChatView after data channel opens.
 *
 * @see uiSSvc.switchToChatView, uiSSvc.switchToDefaultView
 * @see viewsReferences — IDs and CSS classes
 */
import { errorHandler } from "../../errors/errors.js";
import { validatorSHelper, uiHelper } from "../../helpers/helpers.js";
import * as ui from "../ui.js";
import { viewsReferences } from "./views.references.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { fnVoidAnyArguments } from "../../types/types.js";

export class chatView {
  public static hide() {
    try {
      const wrapper = this.getWrapper();
      uiHelper.hideElement(wrapper);
    } catch (error) {
      const method = this.show.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static show() {
    try {
      const wrapper = this.getWrapper();
      uiHelper.showElement(wrapper);
    } catch (error) {
      const method = this.show.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  private static getWrapper(): HTMLDivElement {
    try {
      const validator = validatorSHelper;
      const elName = viewsReferences.IDs.view_chat;
      const el = document.getElementById(elName);
      validator.checkHTMLElement(el, elName);
      return el as HTMLDivElement;
    } catch (error) {
      const method = this.getWrapper.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static create(
    cParams: ICommonParams.commonParams,
    cDetails: ICallDetails.callDetails,
    attachToId: string,
    fnSendMsg: fnVoidAnyArguments | null,
    fnEndCall: fnVoidAnyArguments | null
  ) {
    try {
      const validator = validatorSHelper;
      const el = document.getElementById(attachToId);
      validator.checkHTMLElement(el, attachToId);
      const elToAttach = el as HTMLElement;
      const name = cDetails.calledPartyName;
      const messenger = ui.messenger.createMessenger(
        cParams,
        cDetails,
        name,
        fnSendMsg
      );
      const endBtn = ui.callButtons.createFinishCallButton(
        cParams,
        cDetails,
        fnEndCall
      );
      const wrapper = this.createWrapper();
      wrapper.appendChild(messenger);
      wrapper.appendChild(endBtn);
      elToAttach.appendChild(wrapper);
    } catch (error: unknown) {
      const method = this.create.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static destroy() {
    try {
      const validator = validatorSHelper;
      const elName = viewsReferences.IDs.view_chat;
      const el = document.getElementById(elName);
      validator.checkHTMLElement(el, elName);
      const wrapper = el as HTMLDivElement;
      wrapper.remove();
    } catch (error) {
      const method = this.destroy.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }
  public static destroyIfExists() {
    try {
      const elName = viewsReferences.IDs.view_chat;
      const wrapper = document.getElementById(elName);
      if (wrapper) {
        (wrapper as HTMLDivElement).remove();
      }
    } catch (error) {
      const method = this.destroy.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  private static createWrapper(): HTMLDivElement {
    const wrapper = document.createElement("div") as HTMLDivElement;
    const css1 = viewsReferences.classes.view;
    const css2 = viewsReferences.classes.view_chat;
    wrapper.classList.add(css1, css2);
    wrapper.id = viewsReferences.IDs.view_chat;
    return wrapper;
  }

  public static refresh(cParams: ICommonParams.commonParams) {
    ui.messenger.refreshState(cParams.store.callState);
  }
}
