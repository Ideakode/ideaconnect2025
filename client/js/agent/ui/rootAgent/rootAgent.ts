import * as constants from "../../constants/constants.js";
import { logger } from "../../logs/logs.js";
import { errorHandler } from "../../errors/errors.js";
import { dashboard, allowConnections, totalStrangers } from "../ui.js";
import { rootAgentElements } from "./rootAgent.elements.js";
import { rootAgentReferences } from "./rooAgent.references.js";

export class rootAgent {  
  public static initializeRootElements() {
    logger.log(this.name, " initializeRootElements");
    try {
      //const peerType = constants.peerTypes.AGENT;
      const mainC = rootAgentElements.createRootContainer();
      /* const dashC = dashboard.createDashboard(peerType);
      const allowConn = allowConnections.createAllowConnections();
      const totalStrangersC = totalStrangers.createStrangerStatus();
      dashC.appendChild(allowConn);
      dashC.appendChild(totalStrangersC);
      mainC.appendChild(dashC);*/
      document.body.appendChild(mainC);
    } catch (error: unknown) {
      const method = this.initializeRootElements.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static getClasses() {
    return rootAgentReferences.classes;
  }
  public static getIDs() {
    return rootAgentReferences.classes;
  }
}
