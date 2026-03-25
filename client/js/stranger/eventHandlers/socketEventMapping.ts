/**
 * @file socketEventMapping.ts
 *
 * @description
 * Defines the stranger's socket event map: binds socket.io event names
 * to their corresponding use case execute functions.
 *
 * Mapped events:
 * - CONNECT             → strangerConnected.execute
 * - SERVER_NOTIFICATION → serverNotification.execute
 * - CALL_SIGNALING      → callSignaling.execute
 * - WEBRTC_SIGNALING    → webRtcSignaling.execute
 *
 * The map is passed to socketSSvc.initService during strangerInitialization
 * so the base socket service can register all listeners automatically.
 *
 * @see strangerInitialization
 * @see IEventsMap.getEventsMap
 */
import * as constants from "../constants/constants.js";
import { strangerConnected } from "../useCases/state/state.js";
import { serverNotification } from "../useCases/notification/notification.js";
import { callSignaling } from "../useCases/call/call.js";
import { webRtcSignaling } from "../useCases/webRtc/webRtc.js";
import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";

const conn = constants.socketIO.events.CONNECT;
/* const disc = constants.socketIO.events.DISCONNECT;
const conn_err = constants.socketIO.events.CONNECT_ERROR; */
const snotif = constants.socketIO.events.SERVER_NOTIFICATION;
const cSig = constants.socketIO.events.CALL_SIGNALING;
const wSig = constants.socketIO.events.WEBRTC_SIGNALING;

const fnStrangerConencted = strangerConnected.execute;
const fnServerNotif = serverNotification.execute;
const fnCallSig = callSignaling.execute;
const fnWebRtcSig = webRtcSignaling.execute;

export const socketEventMapping = IEventsMap.getEventsMap([
  IEventMap.getEventMap(conn, fnStrangerConencted),
  /* IEventMap.getEventMap(disc, ""),
  IEventMap.getEventMap(conn_err, ""), */
  IEventMap.getEventMap(snotif, fnServerNotif),
  IEventMap.getEventMap(cSig, fnCallSig),
  IEventMap.getEventMap(wSig, fnWebRtcSig),
]);
