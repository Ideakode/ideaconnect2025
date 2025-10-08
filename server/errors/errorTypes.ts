import {
  parserErrorClass,
  validatorErrorClass,
  serviceErrorClass,
  baseErrorClass,
  useCaseErrorClass,
  eventHandlerErrorClass,
  classErrorClass,
} from "./classes/classes.js";

export const errorTypes = {
  PARSER: parserErrorClass.name,
  VALIDATOR: validatorErrorClass.name,
  SERVICE: serviceErrorClass.name,
  BASE: baseErrorClass.name,
  USE_CASE: useCaseErrorClass.name,
  EVENT_HANDLER: eventHandlerErrorClass.name,
  CLASS: classErrorClass.name,
};
