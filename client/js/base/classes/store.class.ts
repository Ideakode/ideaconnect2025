/**
 * @file store.class.ts
 * @class storeClass
 *
 * @description
 * Base class representing the client-side state store for a connected peer (Agent or Stranger).
 * Holds all runtime state needed to manage a peer's socket connection, active call, and
 * WebRTC session. Extended by storeAgentClass and storeStrangerClass to add peer-specific state.
 *
 * @properties
 * - socket            - The Socket.IO client socket for this peer's connection to the server.
 * - callState         - Current call lifecycle state (see constants.callState: IDLE, IN_PROGRESS,
 *                       ALERTING, WEBRTC_PROGRESS, CONNECTED).
 * - currentCallDetails - Details of the active or pending call (type, parties, IDs). Null when idle.
 * - peerConnection    - The WebRTC RTCPeerConnection instance for the active call. Null when idle.
 * - dataChannel       - The WebRTC RTCDataChannel used for chat messaging. Null when idle.
 * - streams           - Local and remote media streams for audio/video calls. Null when idle.
 *
 * @methods
 * - resetCurrentCallDetails() - Clears the current call details, used on call teardown.
 *
 * @extends
 * - storeAgentClass  (client/js/agent/classes/)
 * - storeStrangerClass (client/js/stranger/classes/)
 */

import { Socket } from "socket.io-client";
import { ICallDetails, IStreams } from "../interfaces/interfaces.js";

export class storeClass {
  private _socket: Socket | null;
  private _callState: string;
  private _currentCallDetails: ICallDetails.callDetails | null;
  private _peerConnection: RTCPeerConnection | null;
  private _dataChannel: RTCDataChannel | null;
  private _streams: IStreams.streams | null;

  constructor(
    socket: Socket | null = null,
    callState: string = "",
    currentCallDetails: ICallDetails.callDetails | null = null,
    peerConnection: RTCPeerConnection | null = null,
    dataChannel: RTCDataChannel | null = null,
    streams: IStreams.streams | null = null
  ) {
    this._socket = socket;
    this._callState = callState;
    this._currentCallDetails = currentCallDetails;
    this._streams = streams;
    this._peerConnection = peerConnection;
    this._dataChannel = dataChannel;
  }

  public get socket(): Socket | null {
    return this._socket;
  }
  public set socket(value: Socket | null) {
    this._socket = value;
  }

  public get callState(): string {
    return this._callState;
  }
  public set callState(value: string) {
    this._callState = value;
  }

  public get streams(): IStreams.streams | null {
    return this._streams;
  }
  public set streams(value: IStreams.streams | null) {
    this._streams = value;
  }

  public get currentCallDetails(): ICallDetails.callDetails | null {
    return this._currentCallDetails;
  }
  public set currentCallDetails(value: ICallDetails.callDetails | null) {
    this._currentCallDetails = value;
  }

  public get peerConnection(): RTCPeerConnection | null {
    return this._peerConnection;
  }
  public set peerConnection(value: RTCPeerConnection | null) {
    this._peerConnection = value;
  }

  public resetCurrentCallDetails() {
    this.currentCallDetails = null;
  }

  public get dataChannel(): RTCDataChannel | null {
    return this._dataChannel;
  }
  public set dataChannel(value: RTCDataChannel | null) {
    this._dataChannel = value;
  }
}
