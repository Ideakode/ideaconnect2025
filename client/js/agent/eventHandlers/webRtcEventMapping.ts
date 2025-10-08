import * as constants from "../constants/constants.js";
import { IEventMap, IEventsMap } from "../interfaces/interfaces.js";
import {
  dataChannelMessage,
  /* dataChannelOpen, */
  localIceCandidate,
  webRtcOffer,
} from "../useCases/webRtc/webRtc.js";

const ice = constants.webRTC.events.ICE_CANDIDATE;
/* const dChOpen = constants.webRTC.events.DATACHANNEL_OPEN; */
/* const dChClose = constants.webRTC.events.DATACHANNEL_CLOSE; */
const dchMsg = constants.webRTC.events.DATACHANNEL_MESSAGE;
const offer = constants.webRTC.signaling.OFFER;
/* const answer = constants.webRTC.signaling.ANSWER; */

const fnRtcOffer = webRtcOffer.execute;
const fnLocalIce = localIceCandidate.execute;
/* const fnDchOpen = dataChannelOpen.execute; */
const fnDchMsg = dataChannelMessage.execute;

export const webRtcEventMapping = IEventsMap.getEventsMap([
  IEventMap.getEventMap(offer, fnRtcOffer),
  IEventMap.getEventMap(ice, fnLocalIce),
  /* IEventMap.getEventMap(dChOpen, fnDchOpen), */
  /* IEventMap.getEventMap(dChClose, ""), */
  IEventMap.getEventMap(dchMsg, fnDchMsg),
]);
