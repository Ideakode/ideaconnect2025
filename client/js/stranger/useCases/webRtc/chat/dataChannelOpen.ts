/**
 * @file dataChannelOpen.ts
 * @class dataChannelOpen
 *
 * @description
 * Use case triggered when the WebRTC data channel transitions to the open state.
 * Marks the call as CONNECTED in the store and refreshes the chat view so the
 * UI reflects that messaging is now possible.
 *
 * @staticMethods
 * - execute(cParamsData, cDetailsData)
 *     1. Parses and validates cParams and call details
 *     2. storeSSvc.setCallConnected(store, cDetails)
 *     3. uiSSvc.refreshChatView(cParams) to update the messenger state label
 *
 * @see webRtcEventMapping — registers this as the DATACHANNEL_OPEN listener
 * @see chatView.refresh   — called indirectly via refreshChatView
 */
import { storeSSvc, uiSSvc } from "../../../services/services.js";
import { useCaseErrors } from "../../usesCases.js";
import { logger } from "../../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../../helpers/helpers.js";

export class dataChannelOpen {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    cDetailsData: unknown /* ICallDetails.callDetails */
  ) {
    const className = "dataChannelOpen";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(cDetailsData);
      validator.checkCall(store, cDetails);
      storeSSvc.setCallConnected(store, cDetails);
      uiSSvc.refreshChatView(cParams);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    logErrors.send(this, error);
  } */
}
