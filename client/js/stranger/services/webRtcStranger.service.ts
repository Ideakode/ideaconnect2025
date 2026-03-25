/**
 * @file webRtcStranger.service.ts
 * @class webRTCStrangerService  (exported as webRtcSSvc)
 *
 * @description
 * Extends the base webRtcSvc with a stranger-specific init method.
 * Wires the stranger's webRtcEventMapping into the base WebRTC services,
 * ensuring events such as ICE candidates, data channel open, and answers
 * are routed to the correct stranger use cases.
 *
 * @staticMethods
 * - init(cParams, data)
 *     Parses and validates cParams and call details. Verifies a peer connection
 *     already exists on the store, then calls startServices with the
 *     webRtcEventMapping. Called by callAccepted after creating the peer connection.
 *
 * @see webRtcEventMapping
 * @see callAccepted
 */
import { webRtcSvc } from "../../base/services/services.js";
import { parserSHelper, validatorSHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";
import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import { webRtcEventMapping } from "../eventHandlers/webRtcEventMapping.js";

export default class webRTCStrangerService extends webRtcSvc {
  public static init(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const webRtcEvMap = webRtcEventMapping;
      
      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStoreStranger(cParams.store);
      validator.checkRTCPeerConnection(store.peerConnection);

      const cDetailsToAttach = parser.parseCallDetailsInterface(data);
      this.startServices(cParams, cDetailsToAttach, webRtcEvMap);
    } catch (error: unknown) {
      const method = this.init.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
