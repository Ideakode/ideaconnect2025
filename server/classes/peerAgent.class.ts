/**
 * @file peerAgent.class.ts
 * @class peerAgentClass  (exported as peerAgent)
 *
 * @description
 * Represents a connected agent. Extends peerClass with two availability
 * flags that control whether the agent accepts incoming connections
 * from strangers or from other agents. Both flags default to false
 * and are updated at runtime via client-notification events.
 *
 * @properties
 * - allowConnectionFromStrangers  True when the agent is open to stranger connections.
 * - allowConnectionFromAgents     True when the agent is open to agent-to-agent connections.
 *
 * @see peerClass        — base peer with id, type, name, email, phone
 * @see storeAgentClass  — stores peerAgent instances
 * @see availableForConnectionsNotification — use case that updates these flags
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
