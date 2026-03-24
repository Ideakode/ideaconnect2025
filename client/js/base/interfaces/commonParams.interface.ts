/**
 * @file commonParams.interface.ts
 * @namespace ICommonParams
 *
 * @description
 * Defines the `commonParams` interface — the single object passed as the first argument
 * to every use case, service, event handler, and UI method across the application.
 * It acts as the context carrier, giving all layers access to the peer's active store
 * without coupling each function signature to a specific store subtype.
 *
 * @interface commonParams
 * - store: store | storeA | storeS  - the active peer store (base, agent, or stranger)
 *
 * @functions
 * - getCommonParams(store)         - factory that constructs a commonParams object
 * - isCommonParams(data)           - type guard used by validatorHelper.checkCommonParamsInterface
 * - parseCommonParams(data)        - returns commonParams | null, used by parserHelper.parseCommonParamsInterface
 *
 * @usedBy
 * Virtually every service, use case, event handler and UI class receives cParams as its
 * first parameter. The actual store instance inside may be storeA or storeS at runtime.
 *
 * @see storeClass       - (client/js/base/classes/store.class.ts) base store type
 * @see storeAgentClass  - (client/js/agent/classes/) agent-specific store
 * @see storeStrangerClass - (client/js/stranger/classes/) stranger-specific store
 */
import { store } from "../classes/classes.js";
import { storeA } from "../../agent/classes/classes.js";
import { storeS } from "../../stranger/classes/classes.js";

export interface commonParams {
  store: store | storeA | storeS;
}

export const getCommonParams = (
  store: store | storeA | storeS
): commonParams => {
  const commonParams: commonParams = {
    store: store,
  };
  return commonParams;
};

export const isCommonParams = (data: unknown): data is commonParams => {
  return (data as commonParams).store !== undefined;
};

export const parseCommonParams = (data: unknown): commonParams | null => {
  let dataIF: commonParams | null = null;

  if (data !== null && data !== undefined) {
    if (isCommonParams(data)) {
      dataIF = getCommonParams(data.store);
    }
  }
  return dataIF;
};
