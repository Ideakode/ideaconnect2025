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
