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
