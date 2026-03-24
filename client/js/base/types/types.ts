/**
 * @file types.ts
 *
 * @description
 * Defines shared function type aliases used across all layers of the application.
 * Centralizing these prevents duplication and ensures consistent callback signatures
 * between event handler registrations and use case execute() methods.
 *
 * @types
 * - fnForCallDialog       - (cParams, cDetails) => void
 *                           Callback signature for accept/reject actions in callDialog.
 * - fnVoidAnyArguments    - (...args: unknown[]) => void
 *                           General-purpose callback for socket and WebRTC event handlers
 *                           where the argument count varies per event.
 * - fnVoidNoArguments     - () => void
 *                           No-op / placeholder callback.
 * - fnVoidStoreArgument   - (store: store) => void
 *                           Callback that receives only the store, used by infoDialog
 *                           auto-closure to trigger post-dialog state resets.
 */
import { ICommonParams, ICallDetails } from "../interfaces/interfaces.js";
import { store } from "../classes/classes.js";

export type fnForCallDialog = (
  cParams: ICommonParams.commonParams,
  cDetails: ICallDetails.callDetails
) => void;
export type fnVoidAnyArguments = (...args: unknown[]) => void;
export type fnVoidNoArguments = () => void;
export type fnVoidStoreArgument = (store: store) => void;
