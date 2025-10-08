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
