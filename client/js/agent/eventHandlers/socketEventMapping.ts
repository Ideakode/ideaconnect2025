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
