import { socketIO, peerTypes } from "../constants/constants.js";
import { errorBuilder, errorTypes, errorHandler } from "../errors/errors.js";

export class miscHelper {
  protected static readonly errType = errorTypes.VALIDATOR;

  public static getTypeOfConnectedPeerBasedonURL(): string {
    let peer = "";
    if (typeof window !== "undefined") {
      const browserWindow = window as Window;
      const currentUrl: URL = new URL(browserWindow.location.href as string);

      const pathname = currentUrl.pathname.toLocaleLowerCase();
      const nspcA = socketIO.namespaces.AGENT.toLocaleLowerCase();
      const nspcS = socketIO.namespaces.STRANGER.toLocaleLowerCase();

      switch (pathname) {
        case nspcA:
          peer = peerTypes.AGENT;
          break;
        case nspcS:
          peer = peerTypes.STRANGER;
          break;
        default: {
          const method = this.getTypeOfConnectedPeerBasedonURL.name;
          const err = errorBuilder.peerNotKnown(this.errType, method, pathname);
          errorHandler.throwError(this.name, err);
        }
      }
    }
    return peer;
  }
}
