/**
 * @file agentConnected.ts
 * @class agentConnected
 *
 * @description
 * Handles the agent connect socket event. Triggered by socketEventHandler
 * when a new socket connects on the /AGENT namespace.
 *
 * Sequence:
 * 1. Parses commonParams and the incoming socket.
 * 2. Adds the agent to storeA (assigns a random display name).
 * 3. Binds all agent socket events to the connected socket via socketAS.
 * 4. Sends a PEER_INFO SERVER_NOTIFICATION back to the connecting agent
 *    so it knows its own assigned name and socket ID.
 *
 * @staticMethods
 * - execute(cParamsData, socketData)  Main handler, called by socketEventHandler.
 *
 * @see storeAgentService  — addAgent
 * @see socketAgentService — registerSocketEvents, sendServerNotification
 * @see socketEventMapAgent — events bound to the new socket
 */
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
