import * as constants from "../../../constants/constants.js";
import { socketAS, storeAS } from "../../../services/services.js";
import {
  messageBuilder,
  parserHelper,
  validatorHelper,
} from "../../../helpers/helpers.js";
import { socketEventMapAgent as evsMap } from "../../../eventHandlers/eventHandlers.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";
import { IPeer } from "../../../interfaces/interfaces.js";

export class agentConnected {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown
  ) {
    const className = "agentConnected";
    logger.log(className, "UseCase - " + className);

    try {
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      validatorHelper.checkStore(cParams.storeAgent, peerA);
      const storeA = cParams.storeAgent;
      const socket = parserHelper.parseSocket(socketData);

      //adds agent to store
      const agent = storeAS.addAgent(socket.id, storeA);
      //binds socket events
      socketAS.registerSocketEvents(cParams, socket, evsMap);
      const io = cParams.io;
      const agentInfo = IPeer.getPeer(agent.id, agent.name);
      const msg = messageBuilder.notificationPeerInfo(agentInfo);
      const toId = socket.id;
      socketAS.sendServerNotification(io, peerA, toId, false, msg);
      const agents = storeAS.getAgentIDs(storeA);
      logger.log(className, "Agents Connected: ", [agents]);
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
