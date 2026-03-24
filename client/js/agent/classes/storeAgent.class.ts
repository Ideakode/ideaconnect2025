/**
 * @file storeAgent.class.ts
 * @class storeAgentClass
 *
 * @description
 * Agent-specific runtime state store. Extends storeClass with two boolean flags that
 * track whether this agent is currently accepting incoming calls from strangers (clients)
 * and/or from other agents. These flags are toggled by the agent via the allowConnections UI
 * and synced to the server on each socket connect event.
 *
 * @extends storeClass  - (client/js/base/classes/store.class.ts)
 *
 * @properties (agent-specific)
 * - availableForClients  - true when the agent accepts calls from strangers.
 *                          Corresponds to the "Available for Client connections" checkbox.
 * - availableForAgents   - true when the agent accepts calls from other agents.
 *                          Corresponds to the "Available for Agent Connections" checkbox.
 *
 * Both default to false on construction (agent starts unavailable).
 *
 * @usedBy
 * - storeAgentService.createStore()             - instantiates this class
 * - storeAgentService.getAllowConnectionStatus() - reads the relevant flag by peerType
 * - storeAgentService.setAllowConnectionStatus() - writes the relevant flag by peerType
 * - validatorAgentHelper.isStoreAgent()         - checks for these properties as the type guard
 */
import { Socket } from "socket.io-client";
import { store } from "../../base/classes/classes.js";
import * as constants from "../constants/constants.js";
import { ICallDetails, IStreams } from "../interfaces/interfaces.js";

export class storeAgentClass extends store {
  private _availableForClients: boolean = false;
  private _availableForAgents: boolean = false;

  constructor(
    socket: Socket | null = null,
    callState: string = constants.callState.IDLE,
    currentCallDetails: ICallDetails.callDetails | null = null,
    peerConnection: RTCPeerConnection | null = null,
    dataChannel: RTCDataChannel | null = null,
    streams: IStreams.streams | null = null,
    availableForClients: boolean = false,
    availableForAgents: boolean = false
  ) {
    super(
      socket,
      callState,
      currentCallDetails,
      peerConnection,
      dataChannel,
      streams
    );

    this.availableForAgents = availableForAgents;
    this.availableForClients = availableForClients;
  }

  public get availableForClients(): boolean {
    return this._availableForClients;
  }
  public set availableForClients(value: boolean) {
    this._availableForClients = value;
  }

  public get availableForAgents(): boolean {
    return this._availableForAgents;
  }
  public set availableForAgents(value: boolean) {
    this._availableForAgents = value;
  }
}
