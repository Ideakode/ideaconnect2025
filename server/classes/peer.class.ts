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
