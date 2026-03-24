/**
 * @file webRTC.class.ts
 * @class webRTCClass
 *
 * @description
 * Encapsulates the creation and initial configuration of a WebRTC peer connection.
 * Instantiated when a call is accepted and a peer-to-peer session needs to be established.
 * Creates an RTCPeerConnection pre-configured with a Google STUN server for ICE candidate
 * gathering, and immediately opens a data channel named "chat" for text messaging.
 *
 * @properties
 * - _rtcPeerConnection - The RTCPeerConnection instance used for the WebRTC session.
 * - _stunServers       - Array of STUN server URLs used for ICE configuration.
 *                        Default: ["stun:stun.l.google.com:13902"]
 * - _dataChannel       - The RTCDataChannel created on construction, used for chat messages.
 *
 * @usage
 * Instantiated by the WebRTC service (webRtcService) when a call is accepted.
 * The resulting peerConnection and dataChannel are stored in the peer's storeClass.
 *
 * @see storeClass    - holds the active RTCPeerConnection and RTCDataChannel at runtime
 * @see webRtcService - (client/js/base/services/webRtcService.ts) creates this class
 */
export class webRTCClass {
  private _rtcPeerConnection: RTCPeerConnection;
  private _stunServers: string[];
  private _dataChannel: RTCDataChannel | null;

  constructor() {
    this._stunServers = ["stun:stun.l.google.com:13902"];
    this._rtcPeerConnection = new RTCPeerConnection(this.getConfiguration());
    this._dataChannel = this._rtcPeerConnection.createDataChannel("chat");
  }

  private getConfiguration(): RTCConfiguration {
    const server1: RTCIceServer = { urls: this._stunServers };

    const configuration: RTCConfiguration = {
      iceServers: [server1],
    };
    return configuration;
  }
}
