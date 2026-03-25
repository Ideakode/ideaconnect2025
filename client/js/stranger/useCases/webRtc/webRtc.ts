/**
 * @file webRtc.ts (useCases/webRtc)
 *
 * @description
 * Barrel that re-exports all WebRTC use cases for the stranger:
 * - webRtcAnswer       — sets the remote SDP answer on the peer connection
 * - webRtcOffer        — placeholder for processing an incoming offer (To Do)
 * - webRtcSignaling    — dispatcher for incoming WEBRTC_SIGNALING socket events
 * - localIceCandidate  — forwards a local ICE candidate to the remote peer via socket
 * - remoteIceCandidate — adds an incoming ICE candidate to the peer connection
 * - dataChannelMessage — handles an incoming data channel message
 * - dataChannelOpen    — marks the call connected once the data channel opens
 * - sendChatMessage    — sends a chat message through the data channel
 */
export * from "./webRtcAnswer.js";
export * from "./dataChannelMessage.js";
export * from "./chat/dataChannelOpen.js";
export * from "./localIceCandidate.js";
export * from "./webRtcOffer.js";
export * from "./remoteIceCandidate.js";
export * from "./webRtcSignaling.js";
export * from "./chat/sendChatMessage.js";
