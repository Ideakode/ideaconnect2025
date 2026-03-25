/**
 * @file peer.class.ts
 * @class peerClass  (exported as peer)
 *
 * @description
 * Base representation of a connected peer (agent or stranger).
 * Holds the socket ID, peer type, and optional contact fields.
 * Used directly for strangers and extended by peerAgentClass for agents.
 *
 * @properties
 * - id        Socket ID assigned by Socket.IO at connection time.
 * - peerType  Peer type string constant (AGENT or STRANGER).
 * - name      Display name (empty by default for strangers; randomly assigned for agents).
 * - email     Optional contact email.
 * - phone     Optional contact phone number.
 *
 * @see peerAgentClass    — extends this class with availability flags
 * @see storeStrangerClass — stores peer instances directly
 */
export class peerClass {
  private _id: string;
  private _peerType: string;
  private _name: string;
  private _email: string;
  private _phone: string;

  constructor(
    id: string,
    type: string,
    name: string = "",
    email: string = "",
    phone: string = ""
  ) {
    this._id = id;
    this._peerType = type;
    this._name = name;
    this._email = email;
    this._phone = phone;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name() {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get email() {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }

  public get peerType() {
    return this._peerType;
  }
  public set peerType(peerType: string) {
    this._peerType = peerType;
  }

  public get phone() {
    return this._phone;
  }
  public set phone(phone: string) {
    this._phone = phone;
  }
}
