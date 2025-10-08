import express, { Application } from "express";
import http from "http";
import https from "https"; // loads https module from nodeJs
import fs from "fs";
import path from "path";
import { logger } from "../logs/logs.js";

export class webServerClass {
  private httpServer: http.Server | https.Server;
  private app: Application;

  private readonly DEFAULT_PORT = process.env.SERVER_PORT;

  constructor() {
    this.app = express();
    this.httpServer = this.initializeHttpServer();

    //this.handleRoutes();
    //this.handleSocketConnection();
  }

  private initializeHttpServer(): http.Server | https.Server {
    /* start - to be moved to specific HTTP route handler */
    this.app.use(
      express.static(path.join(process.env.ROOT_PATH as string, "/public"), {
        index: false,
      })
    ); // defines folder as static and accessible

    this.app.get("/stranger", (req, res) => {
      // gets the requests to the server sent on the root url
      logger.log(
        this.constructor.name,
        "getRequest - Got Stranger HTTP CONNECTION"
      );
      res.sendFile(process.env.ROOT_PATH + "/public/index.html"); // redirects client to index.html
    });

    this.app.get("/agent", (req, res) => {
      // gets the requests to the server sent on the root url
      logger.log(
        this.constructor.name,
        "getRequest - Got Agent HTTP CONNECTION"
      );
      res.sendFile(process.env.ROOT_PATH + "/public/agent_index.html"); // redirects client to index.html
    });

    /* end  - to be move to specific HTTP route handler */

    const options = {
      key: fs.readFileSync(
        path.join(
          process.env.ROOT_PATH as string,
          process.env.SSL_KEY as string
        )
      ),
      cert: fs.readFileSync(
        path.join(
          process.env.ROOT_PATH as string,
          process.env.SSL_CERT as string
        )
      ),
      passphrase: process.env.SSL_PASSPHRASE,
    };

    let server = null;
    if ((process.env.SERVER_HTTP_MODE as string) == ("HTTPS" as string)) {
      server = https.createServer(options, this.app); // creates https server object
    } else {
      server = http.createServer(this.app); // creates http server object
    }

    if (server === null) {
      throw new Error("Uh oh! WebServer not created ");
    } else {
      return server;
    }
  }

  public getWebServerInstance(): http.Server | https.Server {
    return this.httpServer;
  }

  /* private handleRoutes(): void {
      this.app.get("/", (req, res) => {
        res.send(`<h1>Hello World</h1>`); 
      });
    }*/

  public listen(callback: (port: unknown) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT)
    );
  }
}
