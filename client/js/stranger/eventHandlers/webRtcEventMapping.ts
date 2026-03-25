/**
 * @file webRtcEventMapping.ts
 *
 * @description
 * Defines the stranger's WebRTC event map: binds WebRTC peer connection
 * event names to their corresponding use case execute functions.
 *
 * Mapped events:
 * - ANSWER              → webRtcAnswer.execute
 * - ICE_CANDIDATE       → localIceCandidate.execute
 * - DATACHANNEL_OPEN    → dataChannelOpen.execute
 * - DATACHANNEL_MESSAGE → dataChannelMessage.execute
 *
 * Passed to webRTCStrangerService.init via callAccepted so that base
 * WebRTC services can attach the correct listeners.
 *
 * @see webRTCStrangerService.init
 * @see IEventsMap.getEventsMap
 */
import * as constants from "../constants/constants.js";
import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";
import {
  webRtcAnswer,
  localIceCandidate,
  dataChannelOpen,
  dataChannelMessage,
} from "../useCases/webRtc/webRtc.js";

const ice = constants.webRTC.events.ICE_CANDIDATE;
const dChOpen = constants.webRTC.events.DATACHANNEL_OPEN;
/* const dChClose = constants.webRTC.events.DATACHANNEL_CLOSE; */
const dchMsg = constants.webRTC.events.DATACHANNEL_MESSAGE;
const answer = constants.webRTC.signaling.ANSWER;

const fnRtcAnswer = webRtcAnswer.execute;
const fnRtcLocalIce = localIceCandidate.execute;
const fnRtcDChOpen = dataChannelOpen.execute;
const fnRtcDChMsg = dataChannelMessage.execute;

export const webRtcEventMapping = IEventsMap.getEventsMap([
  IEventMap.getEventMap(answer, fnRtcAnswer),
  IEventMap.getEventMap(ice, fnRtcLocalIce),
  IEventMap.getEventMap(dChOpen, fnRtcDChOpen),
  //IEventMap.getEventMap(dChClose, ""),
  IEventMap.getEventMap(dchMsg, fnRtcDChMsg),
]);
