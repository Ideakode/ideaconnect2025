/**
 * @file webRtcEventMapping.ts
 *
 * @description
 * Defines the agent's WebRTC event map — the list of RTCPeerConnection and RTCDataChannel
 * events the agent handles, paired with their use case execute() callbacks. Built once at
 * module load and passed to webRTCAgentService.init() → webRTCEventHandler.registerEvents().
 *
 * @mappings (active)
 * - OFFER              → webRtcOffer.execute        — agent is the answering party; creates
 *                                                     RTCPeerConnection, sets remote offer,
 *                                                     sends SDP answer
 * - ICE_CANDIDATE      → localIceCandidate.execute  — forwards locally gathered ICE candidates
 *                                                     to the calling party via socket
 * - DATACHANNEL_MESSAGE → dataChannelMessage.execute — handles incoming chat messages on the
 *                                                      data channel (stub, UI append TODO)
 *
 * @mappings (commented out / not active)
 * - DATACHANNEL_OPEN  → dataChannelOpen  — stub, not yet wired
 * - DATACHANNEL_CLOSE — not yet wired
 * - ANSWER            — agent never receives an answer (it is the answering party)
 *
 * @see webRTCEventHandler   - (base/eventHandlers/webRTC.eventHandler.ts) registers these on RTCPeerConnection
 * @see webRTCAgentService   - calls webRTCEventHandler.registerEvents with this map
 */
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
