import * as constants from "../../constants/constants.js";

export default class inforDialogText {
  public static getTitle(infoType: string): string {
    switch (infoType) {
      case constants.callSignaling.CANCEL:
        return "Call Cancelled";
      case constants.callSignaling.NOT_FOUND:
        return "Call Not Found";
      case constants.callSignaling.CALL_REJECTED:
        return "Call Rejected";
      case constants.callSignaling.CALL_BUSY:
        return "Call Busy";
      case constants.callSignaling.BYE:
        return "Call Ended";
      default:
        return "";
    }
  }
  public static getDescription(infoType: string): string {
    switch (infoType) {
      case constants.callSignaling.CANCEL:
        return "The call was cancelled by the remote peer";
      case constants.callSignaling.NOT_FOUND:
        return "Remote peer was not found in the Server";
      case constants.callSignaling.CALL_REJECTED:
        return "Remote Peer Rejected the call";
      case constants.callSignaling.CALL_BUSY:
        return "Remote peer is Busy. Please try again later.";
      case constants.callSignaling.BYE:
        return "Remote Peer ended the call.";
      default:
        return "";
    }
  }
}
