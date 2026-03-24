/**
 * @file callBye.ts
 * @class callBye
 *
 * @description
 * Stub use case for handling a BYE signaling message (call end initiated by
 * either party during an active call). Not yet implemented.
 *
 * @note
 * The full implementation is commented out — it was originally ported from the
 * stranger side and references stranger services (storeSSvc, socketSSvc, uiSSvc)
 * that do not exist on the agent side. Needs to be rewritten for the agent context.
 * The BYE branch in callSignaling.ts is also commented out pending this work.
 *
 * @see callSignaling — BYE case is commented out, waiting for this implementation
 * @see callEnded     — the agent-side call teardown use case (also a stub)
 */
/*import * as constants from "../../constants/constants.js";
import { logger } from "../../logs/logs.js";
import {
  mBuilder,
  parserHelper,
  validatorHelper,
} from "../../helpers/helpers.js";
import { socketASvc, storeASvc, uiASvc } from "../../services/services.js";
import * as call from "./call.js";
import { errorHandler } from "../../errors/errors.js";

export class callBye {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams ,
    data: unknown /* ICallDetails.callDetails
  ) const className =
        typeof this !== "undefined" ? this.name : "callAccepted";
	{
    logger.log(className, "Use Case - callBye");

       try {
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const peerS = constants.peerTypes.STRANGER;
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(cParams.store.socket);
      validatorHelper.checkPeer(store, peerS);
      validatorHelper.checkCall(store, cDetails);
      uiSSvc.switchToDefaultView();
      storeSSvc.resetCall(store);
      const toId = cDetails.calledPartyId;
      const msg = mBuilder.buildCallSignalingBYE(cDetails, toId);
      socketSSvc.sendCallSignaling(socket, msg);
    } catch (error: unknown) {
      call.callFailed.handleError(error);
    } 
  }

  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
}*/

export class callBye {}
