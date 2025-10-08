export const callSignaling = {
  INVITE: "call-signaling_INVITE",
  BYE: "call-signaling_BYE",
  CANCEL: "call-signaling_CANCEL",
  NOT_FOUND: "call-signaling_NOT_FOUND",
  CALL_ACCEPTED: "call-signaling_CALL_ACCEPTED",
  CALL_REJECTED: "call-signaling_CALL_REJECTED",
  CALL_BUSY: "call-signaling_CALL_BUSY",
};

export const callType = {
  CHAT: "callType_chat",
  VIDEO: "callType_video",
  AUDIO: "callType_audio",
};

/* strangers: IDLE -> IN_PROGRESS -> WEBRTC_PROGRESS -> CONNECTED
agents: IDLE -> IN_PROGRESS -> ALERTING -> WEBRTC_PROGRESS -> CONNECTED */
export const callState = {
  IDLE: "call-state_idle",
  IN_PROGRESS: "call-state_in-progress",
  ALERTING: "call-state_alerting",
  WEBRTC_PROGRESS: "call-state_connected",
  CONNECTED: "call-state_connected",
};

export const notificationTypes = {
  server: {
    TOTAL_STRANGERS: "server-notification_total-strangers",
    AVAILABLE_AGENTS: "server-notification_available-agents",
    PEER_INFO: "server-notification_peer_info",
  },
  client: {
    AGENT_AVAILABLE: "notification-client_agent-available",
  },
};

export const peerTypes = {
  STRANGER: "peer-type_stranger",
  AGENT: "peer-type_agent",
};

export const clientRequestTypes = {
  AVAILABLE_AGENTS: "client-request_available-agents",
  TOTAL_STRANGERS: "client-request_total-strangers",
};

export const webRTC = {
  signaling: {
    ICE_CANDIDATE: "webRTC-signaling_ice-candidate",
    OFFER: "webRTC-signaling_offer",
    ANSWER: "webRTC-signaling_answer",
    NOT_FOUND: "webRTC-signaling_not-found",
  },
  events: {
    ICE_CANDIDATE: "webRTC-event_icecandidate",
    DATACHANNEL: "webRTC-event_datachannel",
    DATACHANNEL_OPEN: "webRTC-event_open",
    DATACHANNEL_CLOSE: "webRTC-event_close",
    DATACHANNEL_MESSAGE: "webRTC-event_message",
  },
};

export const socketIO = {
  events: {
    DISCONNECT: "disconnect",
    CONNECT: "connect",
    CONNECT_ERROR: "connect_error",

    SERVER_NOTIFICATION: "server-notification",
    CALL_SIGNALING: "call-signaling",
    CLIENT_REQUEST: "client-request",
    CLIENT_NOTIFICATION: "client-notification",
    WEBRTC_SIGNALING: "webrtc-signaling",
  },
  namespaces: {
    STRANGER: "/STRANGER",
    AGENT: "/AGENT",
  },
};

//export default constants;
