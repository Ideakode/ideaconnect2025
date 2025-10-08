import * as constants from "../../constants/constants.js";

export class dashboardTexts {
  public static description(peerType: string, name: string = ""): string {
    switch (peerType) {
      case constants.peerTypes.AGENT:
        return "Hello " + name;
      case constants.peerTypes.STRANGER:
        return "Connect with an Agent over a video, audio or chat call.";
      default:
        return "";
    }
  }
}
