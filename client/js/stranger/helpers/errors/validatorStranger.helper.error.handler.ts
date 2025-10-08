/* import { errors } from "../../references.js";
import { errors as errorsHelpers } from "../../../base/helpers/helpers.js";

export class validatorStrangerHelperErrorHandler extends errorsHelpers.validatorHelperErrorHandler {
  public static readonly _error_storeS_not_valid =
    "Store Stranger is not valid";

  public static storeSNotValid(method: string, received: unknown) {
    const err = this._error_storeS_not_valid;
    const msg = "Received: " + JSON.stringify(received);
    const type = errors.errorTypes.VALIDATOR;
    return errorHandler.createError(type, err, msg, method);
  }
}
 */
