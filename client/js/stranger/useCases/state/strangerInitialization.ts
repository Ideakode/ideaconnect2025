import * as constants from "../../constants/constants.js";
import { storeSSvc, uiSSvc, socketSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { socketEventMapping } from "../../eventHandlers/eventHandlers.js";

export class strangerInitialization {
  public static execute() {
    const className = "strangerInitialization";
    logger.log(className, "UseCase - " + className);
    try {
      const socketEvM = socketEventMapping;
      const nspc = constants.socketIO.namespaces.STRANGER;
      const peerType = constants.peerTypes.STRANGER;
      const storeStranger = storeSSvc.createStore();
      const cParams = ICommonParams.getCommonParams(storeStranger);

      //initalize the UI passing store instance
      uiSSvc.initializeUI();
      //Initializes the Socket passing store instance
      socketSSvc.initService(cParams, socketEvM, nspc, peerType);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
