import { socketAS } from "../../../services/services.js";
import * as constants from "../../../constants/constants.js";
import { logger } from "../../../logs/logs.js";
import { parserHelper, validatorHelper } from "../../../helpers/helpers.js";
import { useCaseErrors } from "../../useCaseErrors.js";

export class strangerDisconnected {
  public static execute(
    cParamsData: unknown /*ICommonParams.commonParams*/,
    socketData: unknown /* Socket */,
    reason: unknown /* string */
  ) {
    const className = "strangerDisconnected";
    logger.log(className, "UseCase - " + className);

    try {
      const peerS = constants.peerTypes.STRANGER;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const io = cParams.io;
      const storeS = cParams.storeStranger;

      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeS, peerS);
      validatorHelper.checkPeerInStore(socket.id, peerS, storeS);

      // remove stranger from Store, and if removed, notify Agents
      const removed = storeS.removeStranger(socket.id);
      if (removed) {
        const totalS = storeS.getTotalStrangersConnected().toString();
        socketAS.notifyTotalStrangers(io, "", totalS, true);
      }
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
