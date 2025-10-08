import { Server as IOServer } from "socket.io";
import { socketEventHandler } from "../eventHandlers/eventHandlers.js";
import {
  ICommonParams,
  IPeers,
  IEventsMap,
  INotification,
} from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { socketService } from "./socket.service.js";
import { validatorHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";

export class socketStrangerService extends socketService {
  public static initStranger(
    cParams: ICommonParams.commonParams,
    evsMap: IEventsMap.eventsMap
  ) {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      const namespace = constants.socketIO.namespaces.STRANGER;
      socketEventHandler.init(cParams, evsMap, namespace);
    } catch (error: unknown) {
      const method = this.initStranger.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static notifyAvailableAgents(
    io: IOServer,
    strangerId: string = "",
    agentsIF: IPeers.peers,
    broadcast: boolean
  ) {
    try {
      validatorHelper.checkIO(io);
      const notType = constants.notificationTypes.server.AVAILABLE_AGENTS;
      const notIF = INotification.getNotification(notType, agentsIF);
      const peerS = constants.peerTypes.STRANGER;
      this.sendServerNotification(io, peerS, strangerId, broadcast, notIF);
    } catch (error: unknown) {
      const method = this.notifyAvailableAgents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
