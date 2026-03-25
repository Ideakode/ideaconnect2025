/**
 * @file strangerConnected.ts
 * @class strangerConnected
 *
 * @description
 * Handles the stranger connect socket event. Triggered by socketEventHandler
 * when a new socket connects on the /STRANGER namespace.
 *
 * Sequence:
 * 1. Parses commonParams and the incoming socket.
 * 2. Adds the stranger to storeS.
 * 3. Binds all stranger socket events to the connected socket via socketSS.
 * 4. Broadcasts the updated total stranger count to all agents via socketAS.notifyTotalStrangers.
 *
 * @staticMethods
 * - execute(cParamsData, socketData)  Main handler, called by socketEventHandler.
 *
 * @see storeStrangerService  — addStranger, getTotalConnectedStrangers, getStrangerIDs
 * @see socketStrangerService — registerSocketEvents
 * @see socketAgentService   — notifyTotalStrangers (broadcast)
 * @see socketEventMapStranger — events bound to the new socket
 */
import * as constants from "../../../constants/constants.js";
import { storeSS, socketSS, socketAS } from "../../../services/services.js";
import { logger } from "../../../logs/logs.js";
import { socketEventMapStranger as evsMap } from "../../../eventHandlers/eventHandlers.js";
import { parserHelper, validatorHelper } from "../../../helpers/helpers.js";
import { useCaseErrors } from "../../useCaseErrors.js";

export class strangerConnected {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */
  ) {
    const className = "strangerConnected";
    logger.log(className, "UseCase - " + className);
    try {
      const peerS = constants.peerTypes.STRANGER;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const io = cParams.io;
      const storeS = cParams.storeStranger;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeS, peerS);
      storeSS.addStranger(socket.id, storeS); //adds stranger to store
      socketSS.registerSocketEvents(cParams, socket, evsMap); //binds socket events

      const strangers = storeSS.getTotalConnectedStrangers(storeS).toString();
      socketAS.notifyTotalStrangers(io, "", strangers, true); //inform all agents

      const ids = storeSS.getStrangerIDs(storeS);
      logger.log(className, "Strangers IDs | ", ids);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
