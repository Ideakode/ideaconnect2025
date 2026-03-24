/**
 * @file chat.view.ts
 * @class chatView
 *
 * @description
 * The agent's active chat call view. Shown when a CHAT call is accepted and
 * the WebRTC data channel is ready. Assembles the messenger and finish-call button,
 * wraps them in a view container, and attaches to the given parent element.
 * Also provides lifecycle methods to show, hide, destroy, and refresh the view.
 *
 * @staticMethods
 * - create(cParams, cDetails, attachToId, fnSendMsg, fnEndCall)
 *     — builds messenger + finish button; appends to attachToId element
 * - show()            — removes display_none from the view wrapper
 * - hide()            — adds display_none to the view wrapper
 * - destroy()         — removes the view wrapper from the DOM
 * - destroyIfExists() — removes the view wrapper only if it exists
 * - refresh(cParams)  — delegates to messenger.refreshState(callState)
 *
 * @html (wrapper structure)
 * ```html
 * <div id="view_chat" class="view view_chat">
 *   <!-- messenger component -->
 *   <!-- finish call button -->
 * </div>
 * ```
 *
 * @see viewsReferences  — provides view_chat id and class constants
 * @see messenger        — chat panel with message input and history
 * @see callButtons      — finish call button passed fnEndCall callback
 * @see uiAgentService   — will call create/destroy/show/hide when view switching is implemented
 */
import { errorHandler } from "../../errors/errors.js";
import { validatorAHelper, uiHelper } from "../../helpers/helpers.js";
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
      const validator = validatorAHelper;
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
      const validator = validatorAHelper;
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
      const validator = validatorAHelper;
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
