/**
 * @file storeStranger.class.ts
 * @class storeStrangerClass  (exported as storeS)
 *
 * @description
 * Extends the base store class with a stranger-specific property: availableAgents.
 * The setter validates the incoming IPeers.peers value through parserSHelper
 * before storing it, and logs the resulting agent count.
 *
 * @extends store
 *
 * @properties
 * - availableAgents  IPeers.peers  — list of agents currently available to the stranger.
 *
 * @see storeS  (alias exported from classes/classes.ts)
 */
import { Socket } from "socket.io-client";
import { store } from "../../base/classes/classes.js";
import * as constants from "../constants/constants.js";
import { errorHandler } from "../errors/errors.js";
import { logger } from "../logs/logs.js";
import { parserSHelper } from "../helpers/helpers.js";

import { ICallDetails, IPeers, IStreams } from "../interfaces/interfaces.js";

export class storeStrangerClass extends store {
  private _availableAgents: IPeers.peers = IPeers.getPeers([]);

  constructor(
    socketIO: Socket | null = null,
    callState: string = constants.callState.IDLE,
    currentCallDetails: ICallDetails.callDetails | null = null,
    peerConnection: RTCPeerConnection | null = null,
    dataChannel: RTCDataChannel | null = null,
    streams: IStreams.streams | null = null,
    agentsInterface: IPeers.peers = IPeers.getPeers([])
  ) {
    super(
      socketIO,
      callState,
      currentCallDetails,
      peerConnection,
      dataChannel,
      streams
    );
    this._availableAgents = agentsInterface;
  }

  public get availableAgents(): IPeers.peers {
    return this._availableAgents;
  }
  public set availableAgents(value: IPeers.peers) {
    try {
      const parser = parserSHelper;
      const agents = parser.parsePeersInterface(value);
      this._availableAgents = agents;
      const count = [this.availableAgents.peers].length;
      logger.log(this.constructor.name, "availableAgents | " + count);
    } catch (error: unknown) {
      const method = "getAvailableAgents";
      errorHandler.propagateErrorClass(this.constructor.name, error, method);
    }
  }
}
