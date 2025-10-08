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
