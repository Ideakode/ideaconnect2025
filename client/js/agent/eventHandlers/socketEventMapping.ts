/**
 * @file socketEventMapping.ts
 *
 * @description
 * Defines the agent's socket event map — the complete list of Socket.IO events the agent
 * listens for, paired with their use case execute() callbacks. Built once at module load
 * and passed to socketService.initService() by agentInitialization.
 *
 * @mappings (active)
 * - CONNECT           → agentConnected.execute      — syncs availability flags and requests
 *                                                      total strangers count on (re)connect
 * - SERVER_NOTIFICATION → serverNotification.execute — handles TOTAL_STRANGERS and PEER_INFO
 *                                                      server-push notifications
 * - CALL_SIGNALING    → callSignaling.execute        — routes INVITE / CANCEL / NOT_FOUND /
 *                                                      CALL_BUSY to the appropriate call use case
 * - WEBRTC_SIGNALING  → webRtcSignaling.execute      — routes OFFER / ICE_CANDIDATE to WebRTC
 *                                                      use cases
 *
 * @mappings (commented out / not active)
 * - DISCONNECT, CONNECT_ERROR — not yet wired
 *
 * @see socketEventHandler  - (base/eventHandlers/socket.eventHandler.ts) registers these on the socket
 * @see agentInitialization - passes this map to socketService.initService()
 */
import * as constants from "../constants/constants.js";
import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";
import { callSignaling } from "../useCases/call/callSignaling.js";
import { serverNotification } from "../useCases/notification/serverNotification.js";
import { webRtcSignaling } from "../useCases/webRtc/webRtcSignaling.js";
import { agentConnected } from "../useCases/state/agentConnected.js";

const conn = constants.socketIO.events.CONNECT;
/* const disc = constants.socketIO.events.DISCONNECT; */
/* const cErr = constants.socketIO.events.CONNECT_ERROR; */
const snotif = constants.socketIO.events.SERVER_NOTIFICATION;
const cSig = constants.socketIO.events.CALL_SIGNALING;
const wSig = constants.socketIO.events.WEBRTC_SIGNALING;

const fnCallSig = callSignaling.execute;
const fnServerNotif = serverNotification.execute;
const fnWebRtcSig = webRtcSignaling.execute;
const fnAgentConnected = agentConnected.execute;

export const socketEventMapping = IEventsMap.getEventsMap([
  IEventMap.getEventMap(conn, fnAgentConnected),
  /* IEventMap.getEventMap(disc, ""),
  IEventMap.getEventMap(cErr, ""), */
  IEventMap.getEventMap(snotif, fnServerNotif),
  IEventMap.getEventMap(cSig, fnCallSig),
  IEventMap.getEventMap(wSig, fnWebRtcSig),
]);
