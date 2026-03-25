/**
 * @file socketServer.class.ts
 * @class socketServerClass  (exported as socketServer)
 *
 * @description
 * Thin wrapper around the Socket.IO Server instance.
 * Receives the raw HTTP/HTTPS server from webServerClass and constructs
 * a Socket.IO Server on top of it. Exposes the IO instance via a get/set
 * accessor so that commonParams can hold a reference to it.
 *
 * @methods
 * - constructor(httpServer)  Creates the Socket.IO Server bound to the given HTTP server.
 * - get io()                 Returns the Socket.IO Server instance.
 * - set io(value)            Replaces the Socket.IO Server instance.
 *
 * @see webServerClass   — provides the httpServer argument
 * @see ICommonParams    — stores the io reference for use across all services and use cases
 */
import { Server as IOServer } from "socket.io";
import type http from "http";
import type https from "https"; // loads https module from nodeJs

export class socketServerClass {
  private _io: IOServer;

  constructor(httpServer: http.Server | https.Server) {
    this._io = new IOServer(httpServer, {});
  }

  public get io(): IOServer {
    return this._io;
  }
  public set io(value: IOServer) {
    this._io = value;
  }
}
