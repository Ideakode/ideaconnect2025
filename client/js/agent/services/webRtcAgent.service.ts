/**
 * @file webRtcAgent.service.ts
 * @class webRTCAgentService
 *
 * @description
 * Agent-specific WebRTC service. Extends webRtcService with an init() method that
 * validates the agent-specific store and wires the agent's WebRTC event map before
 * starting the base WebRTC services. All base async SDP methods are inherited.
 *
 * @extends webRtcService  - (client/js/base/services/webRtcService.ts)
 *
 * @staticMethods (agent-specific)
 * - init(cParamsData, data)
 *     Validates cParams and callDetails, confirms the RTCPeerConnection exists in the store,
 *     then calls startServices(cParams, cDetailsToAttach, webRtcEventMapping) to register
 *     ICE / data channel / connection state handlers.
 *     Called by webRtcOffer use case immediately after createPeerConnection() and
 *     storeASvc.setPeerConnection().
 *
 * @see webRtcOffer          - the only caller of init()
 * @see webRtcEventMapping   - the event map wired by startServices
 * @see webRtcService.startServices / startWebRtcAnswer  - base methods called through this
 */
import { webRtcSvc } from "../../base/services/services.js";
import { errorHandler } from "../errors/errors.js";
import { validatorAHelper, parserAHelper } from "../helpers/helpers.js";
import { webRtcEventMapping } from "../eventHandlers/eventHandlers.js";

export default class webRTCAgentService extends webRtcSvc {
  public static init(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    try {
      const validator = validatorAHelper;
      const parser = parserAHelper;
      const webRtcEvMap = webRtcEventMapping;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetailsToAttach = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      validator.checkRTCPeerConnection(store.peerConnection);
      this.startServices(cParams, cDetailsToAttach, webRtcEvMap);
    } catch (error: unknown) {
      const method = this.init.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
