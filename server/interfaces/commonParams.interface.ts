import type { Server as IOServer } from "socket.io";
import { storeA, storeS } from "../classes/classes.js";

export interface commonParams {
  io: IOServer;
  storeAgent: storeA;
  storeStranger: storeS;
}

export const getCommonParams = (
  io: IOServer,
  storeAgent: storeA,
  storeStranger: storeS
): commonParams => {
  const commonParams: commonParams = {
    io,
    storeAgent,
    storeStranger,
  };
  return commonParams;
};

export const isCommonParams = (data: unknown): data is commonParams => {
  return (
    (data as commonParams).io !== undefined &&
    (data as commonParams).storeAgent !== undefined &&
    (data as commonParams).storeStranger !== undefined
  );
};

export const parseCommonParams = (data: unknown): commonParams | null => {
  let dataIF: commonParams | null = null;

  if (data !== null && data !== undefined) {
    if (isCommonParams(data)) {
      /* dataIF = getcommonParams(
        data.io,
        data.storeAgent,
        data.storeStranger
      ); */
      dataIF = data as commonParams;
    }
  }
  return dataIF;
};
