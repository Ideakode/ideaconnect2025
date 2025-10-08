import * as constants from "../../constants/constants.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { socketEventMapping } from "../../eventHandlers/eventHandlers.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";

export class agentInitialization {
  public static execute() {
    const className = "agentInitialization";
    logger.log(className, "UseCase - " + className);
    try {
      const nspc = constants.socketIO.namespaces.AGENT;
      const peerType = constants.peerTypes.AGENT;
      const storeAgent = storeASvc.createStore();
      const cParams = ICommonParams.getCommonParams(storeAgent);
      const socketEvMap = socketEventMapping;
      //initalize the UI passing store instance
      uiASvc.initializeUI(cParams);
      //Initializes the Socket passing store, eventMapping and the type of Agent
      socketASvc.initService(cParams, socketEvMap, nspc, peerType);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
