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
