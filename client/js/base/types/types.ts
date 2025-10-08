import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import { store } from "../classes/classes.js";

export type fnForCallDialog = (
  cParams: ICommonParams.commonParams,
  cDetails: ICallDetails.callDetails
) => void;
export type fnVoidAnyArguments = (...args: unknown[]) => void;
export type fnVoidNoArguments = () => void;
export type fnVoidStoreArgument = (store: store) => void;
