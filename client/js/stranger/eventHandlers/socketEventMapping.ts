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
