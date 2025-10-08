import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";


export type peer
 ={
  id: string, name:string,email:string
 }

export type fnForCallDialog = (
  cParams: ICommonParams.commonParams,
  cDetails: ICallDetails.callDetails
) => void;

export type fnVoidAnyArguments = (...args: unknown[]) => void;
export type fnVoidNoArguments = () => void;
