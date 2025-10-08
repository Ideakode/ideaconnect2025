import { totalStrangersReferences } from "./totalStrangers.references.js";
import { totalStrangersTexts } from "./totalStrangers.texts.js";
import { validatorAHelper } from "../../helpers/helpers.js";
import { errorHandler } from "../../errors/errors.js";

export default class totalStrangerElements {
  public static getTotalStrangersSpan(): HTMLSpanElement {
    const elName = totalStrangersReferences.IDs.stranger_total_available;
    try {
      const spanEl = document.getElementById(elName);
      validatorAHelper.checkHTMLElement(spanEl, elName);
      return spanEl as HTMLSpanElement;
    } catch (error: unknown) {
      const method = this.getTotalStrangersSpan.name;
      errorHandler.propagateErrorUI(this.name, error, method);
    }
  }

  public static createStrangerStatus(): HTMLDivElement {
    /**
    <div class="stranger_current_status_container">
      <p class="stranger_container_paragraph">Status</p>                
      <p class="stranger_container_paragraph">Clients connected: <span id="stranger_total_available"></span></p>                
    </div>  
    */
    const statusC = this.createStrangerStatusContainer();
    const labelStatus = this.createStrangerStatusLabel(true);
    const labelClient = this.createStrangerStatusLabel(false);
    const spanStatus = this.createStrangerStatusSpan();

    labelClient.appendChild(spanStatus);
    statusC.appendChild(labelStatus);
    statusC.appendChild(labelClient);

    return statusC;
  }

  private static createStrangerStatusContainer(): HTMLDivElement {
    /* <div class="stranger_current_status_container"></div> */
    const statusC = document.createElement("div") as HTMLDivElement;
    const css = totalStrangersReferences.classes.total_strangers_container;
    statusC.classList.add(css);
    return statusC;
  }
  private static createStrangerStatusLabel(primary: boolean) {
    /* 
    <p class="stranger_container_paragraph">Status</p>                
    OR
    <p class="stranger_container_paragraph">Clients connected: </p>
    */
    const label = document.createElement("p") as HTMLParagraphElement;
    label.innerHTML = totalStrangersTexts.label(primary);
    const css = totalStrangersReferences.classes.stranger_container_paragraph;
    label.classList.add(css);
    return label;
  }

  private static createStrangerStatusSpan(): HTMLSpanElement {
    /* <span id="stranger_total_available"></span> */
    const span = document.createElement("span") as HTMLSpanElement;
    span.id = totalStrangersReferences.IDs.stranger_total_available;
    return span;
  }
}
