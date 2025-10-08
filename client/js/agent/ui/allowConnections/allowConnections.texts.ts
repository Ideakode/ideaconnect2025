import * as constants from "../../constants/constants.js";

export class allowConnectionsTexts {
  public static availableText(peerType: string): string {
    switch (peerType) {
      case constants.peerTypes.STRANGER:
        return "Available for Client connections";
      case constants.peerTypes.AGENT:
        return "Available for Agent connections";
      default:
        return "";
    }
  }
}
