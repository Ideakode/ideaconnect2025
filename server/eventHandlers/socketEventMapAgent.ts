import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { agentConnected } from "../useCases/agent/state/agentConnected.js";
import { agentDisconnected } from "../useCases/agent/state/agentDisconnected.js";
import { clientNotification } from "../useCases/agent/clientNotification/clientNotification.js";
import { clientRequest } from "../useCases/agent/clientRequest/clientRequest.js";
import { callSignaling } from "../useCases/agent/callSignaling.js";
import { webRtcSignaling } from "../useCases/agent/webRtcSignaling.js";

const connect = constants.socketIO.events.CONNECT;
const disconnect = constants.socketIO.events.DISCONNECT;
const notif = constants.socketIO.events.CLIENT_NOTIFICATION;
const req = constants.socketIO.events.CLIENT_REQUEST;
const sig = constants.socketIO.events.CALL_SIGNALING;
const webrtc = constants.socketIO.events.WEBRTC_SIGNALING;

//const connectErr = constants.socketIO.events.CONNECT_ERROR;
export const socketEventMapAgent = IEventsMap.getEventsMap([
  IEventMap.getEventMap(connect, agentConnected.execute),
  IEventMap.getEventMap(disconnect, agentDisconnected.execute),
  IEventMap.getEventMap(notif, clientNotification.execute),
  IEventMap.getEventMap(req, clientRequest.execute),
  IEventMap.getEventMap(sig, callSignaling.execute),
  IEventMap.getEventMap(webrtc, webRtcSignaling.execute),
]);
