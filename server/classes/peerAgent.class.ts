/**
 * This class represents an Agent and extends the class of a ConnectedPeer
 *
 * On top of ConnectedPeer properties, the Agent has specific ones for:
 *  - availablitily in receiving connections from strangers
 *  - availablitily to receiving connections from other Agents
 *  - others (to be added later when built)
 */

import { peer } from "./classes.js";

export class peerAgentClass extends peer {
  private _allowConnectionFromStrangers: boolean = false;
  private _allowConnectionFromAgents: boolean = false;

  constructor(
    id: string,
    type: string,
    name: string = "",
    email: string = "",
    phone: string = "",
    allowS: boolean = false,
    allowA: boolean = false
  ) {
    super(id, type, name, email, phone);
    this.allowConnectionFromAgents = allowA;
    this.allowConnectionFromStrangers = allowS;
  }

  public get allowConnectionFromStrangers(): boolean {
    return this._allowConnectionFromStrangers;
  }

  public set allowConnectionFromStrangers(value: boolean) {
    this._allowConnectionFromStrangers = value;
  }

  public get allowConnectionFromAgents(): boolean {
    return this._allowConnectionFromAgents;
  }

  public set allowConnectionFromAgents(value: boolean) {
    this._allowConnectionFromAgents = value;
  }
}
