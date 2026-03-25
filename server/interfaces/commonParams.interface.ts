/**
 * @file commonParams.interface.ts
 * @namespace ICommonParams
 *
 * @description
 * Defines the shared context object threaded through every server use case,
 * service, and event handler. Built once at bootstrap from the three top-level
 * server instances and passed by reference throughout the server's lifetime.
 *
 * @interface commonParams
 * - io           The Socket.IO Server instance.
 * - storeAgent   The in-memory agent store (storeAgentClass).
 * - storeStranger The in-memory stranger store (storeStrangerClass).
 *
 * @functions
 * - getCommonParams(io, storeAgent, storeStranger)  Constructs and returns a commonParams object.
 * - isCommonParams(data)                            Type guard — returns true if data has all three fields.
 * - parseCommonParams(data)                         Returns commonParams if valid, or null.
 *
 * @see server/index.ts — calls getCommonParams to build the singleton context
 */
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
