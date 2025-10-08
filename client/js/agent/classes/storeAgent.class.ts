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
