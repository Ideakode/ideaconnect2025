/**
 * @file types.ts
 *
 * @description
 * Type aliases used across the server codebase.
 *
 * @types
 * - peer                  { id, name, email } — lightweight peer shape used in types context.
 * - fnForCallDialog       (cParams, cDetails) => void  — callback signature for call dialog operations.
 * - fnVoidAnyArguments    (...args: unknown[]) => void — general-purpose callback type.
 * - fnVoidNoArguments     () => void                   — no-arg callback type.
 */
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
