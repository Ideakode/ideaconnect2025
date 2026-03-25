/**
 * @file webRtcOffer.ts
 * @class webRtcOffer
 *
 * @description
 * Placeholder use case for processing an incoming WebRTC SDP offer.
 * The dispatch on callType (CHAT / AUDIO / VIDEO) is stubbed out
 * and not yet implemented.
 *
 * @staticMethods
 * - execute(store, callSignalingInterface)
 *     Parses and validates the store and call details.
 *     Switches on store.currentCallDetails.callType — all branches are To Do.
 *
 * @see webRtcSignaling  — will dispatch here for OFFER type when implemented
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { ICallSignaling } from "../../interfaces/interfaces.js";
import { storeS } from "../../classes/classes.js";

export class webRtcOffer {
  public static execute(
    store: storeS,
    callSignalingInterface: ICallSignaling.callSignaling
  ) {
    const className = "webRtcOffer";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const parsedStore = parser.parseStoreStranger(store);
      /* const socket = parser.parseSocket(storeSSvc.getSocket(store)); */
      const callDetails = callSignalingInterface.callDetails;
      validator.checkCall(parsedStore, callDetails);

      switch (store.currentCallDetails?.callType) {
        case constants.callType.CHAT:
          //To Do
          break;
        case constants.callType.AUDIO:
          //To Do
          break;
        case constants.callType.VIDEO:
          //To Do
          break;
      }
      //const peerConnection = webRTCService.initPeerConnection(store);
      //webRTCService.sendWebRTCOffer(store, peerConnection);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    logErrors.send(this, error);
  } */
}
