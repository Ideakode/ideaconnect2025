import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import {
  strangerConnected,
  strangerDisconnected,
  clientRequest,
  callSignaling,
  webRtcSignaling,
} from "../useCases/stranger/useCases.js";

const connect = constants.socketIO.events.CONNECT;
const disconnect = constants.socketIO.events.DISCONNECT;
const req = constants.socketIO.events.CLIENT_REQUEST;
const sig = constants.socketIO.events.CALL_SIGNALING;
const webrtc = constants.socketIO.events.WEBRTC_SIGNALING;

//const connectErr = constants.socketIO.events.CONNECT_ERROR;
export const socketEventMapStranger = IEventsMap.getEventsMap([
  IEventMap.getEventMap(connect, strangerConnected.execute),
  IEventMap.getEventMap(disconnect, strangerDisconnected.execute),
  IEventMap.getEventMap(req, clientRequest.execute),
  IEventMap.getEventMap(sig, callSignaling.execute),
  IEventMap.getEventMap(webrtc, webRtcSignaling.execute),
]);
