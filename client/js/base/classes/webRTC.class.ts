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
