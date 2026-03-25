/**
 * @file strangerInitialization.ts
 * @class strangerInitialization
 *
 * @description
 * Bootstrap use case executed once when the stranger page loads.
 * Creates the stranger store, initializes the UI (root container + default view),
 * and connects the socket to the STRANGER namespace with the socket event map.
 *
 * @staticMethods
 * - execute()
 *     1. Creates a storeS via storeSSvc.createStore()
 *     2. Wraps the store in a commonParams object
 *     3. Calls uiSSvc.initializeUI() to render the default view
 *     4. Calls socketSSvc.initService(cParams, socketEvM, namespace, peerType)
 *        to connect and register all socket listeners
 *
 * @see strangerConnected  — triggered on socket CONNECT
 * @see socketEventMapping — event → use case bindings
 */
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
