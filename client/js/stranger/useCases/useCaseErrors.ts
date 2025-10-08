import { errorHandler } from "../errors/errors.js";

const executeDefault = (by: string, method: string, error: unknown) => {
  errorHandler.wrapErrorUseCase(by, error, method);
};

export const useCaseErrors = {
  executeDefault,
};
