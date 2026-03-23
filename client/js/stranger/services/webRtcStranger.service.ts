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
