/**
 * @file socketEventMapStranger.ts
 * @const socketEventMapStranger
 *
 * @description
 * Defines the complete Socket.IO event-to-use-case mapping for the /STRANGER namespace.
 * Built with IEventsMap.getEventsMap and consumed by socketStrangerService.initStranger.
 *
 * Event → Use Case mapping:
 * | Event            | Use Case                    |
 * |------------------|-----------------------------|
 * | connect          | strangerConnected.execute   |
 * | disconnect       | strangerDisconnected.execute|
 * | client-request   | clientRequest.execute       |
 * | call-signaling   | callSignaling.execute       |
 * | webrtc-signaling | webRtcSignaling.execute     |
 *
 * @see socketEventHandler      — consumes this map during init and per-socket binding
 * @see strangerInitialization  — passes this map to socketStrangerService.initStranger
 */
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
