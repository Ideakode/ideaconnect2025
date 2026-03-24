/**
 * @file useCaseErrors.ts
 *
 * @description
 * Shared error-handling helpers used by every agent use case's catch block.
 * Encapsulates the two response strategies an agent use case can take when an error occurs,
 * keeping all use case catch blocks uniform and free of inline error logic.
 *
 * @exports useCaseErrors  — object with two functions:
 *
 * - executeDefault(by, method, error)
 *     The standard catch handler for all use cases. Wraps the error as a useCaseErrorClass
 *     (via errorHandler.wrapErrorUseCase) which logs it. Does not throw — the use case
 *     simply exits silently after logging.
 *
 * - sendBusyIfNeeded(by, method, error, cParams, data)
 *     Extended catch handler used by callNewIncoming. Calls executeDefault first (for logging),
 *     then inspects whether the error is a validatorErrorClass whose name matches a "peer
 *     cannot take a call" condition:
 *       - _error_peer_not_idle           (callState is not IDLE)
 *       - _error_peer_not_available_calls (availableForClients is false)
 *       - _error_callDetails_not_null    (a call is already in progress)
 *     In any of these cases, it automatically fires callBusy.execute(cParams, cDetails)
 *     to notify the calling stranger that the agent is unavailable.
 *
 * @see callNewIncoming  - uses sendBusyIfNeeded
 * @see all other use cases - use executeDefault
 * @see errorBuilder._error_*  - the error name constants checked in sendBusyIfNeeded
 */
import { ICallDetails, ICommonParams } from "../interfaces/interfaces.js";
import { parserAHelper } from "../helpers/helpers.js";
import { errorHandler, errorBuilder, classes } from "../errors/errors.js";
import { callBusy } from "./call/call.js";

const executeDefault = (by: string, method: string, error: unknown) => {
  errorHandler.wrapErrorUseCase(by, error, method);
};

const sendBusyIfNeeded = (
  by: string,
  method: string,
  error: unknown,
  cParams: ICommonParams.commonParams,
  data: ICallDetails.callDetails
) => {
  executeDefault(by, method, error);
  if (error instanceof classes.validatorErrorClass) {
    const cDetails = parserAHelper.parseCallDetailsInterface(data);
    switch (error.name) {
      case errorBuilder._error_peer_not_idle:
      case errorBuilder._error_peer_not_available_calls:
      case errorBuilder._error_callDetails_not_null:
        callBusy.execute(cParams, cDetails);
        break;
    }
  }
};

export const useCaseErrors = {
  executeDefault,
  sendBusyIfNeeded,
};
