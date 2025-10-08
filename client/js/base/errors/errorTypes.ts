import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  classErrorClass,
  uiErrorClass,
  eventHandlerErrorClass,
} from "./classes/classes.js";

export const errorTypes = {
  PARSER: parserErrorClass.name,
  VALIDATOR: validatorErrorClass.name,
  SERVICE: serviceErrorClass.name,
  UI: uiErrorClass.name,
  BASE: baseErrorClass.name,
  CLASS: classErrorClass.name,
  USE_CASE: useCaseErrorClass.name,
  EVENT_HANDLER: eventHandlerErrorClass.name,
};
