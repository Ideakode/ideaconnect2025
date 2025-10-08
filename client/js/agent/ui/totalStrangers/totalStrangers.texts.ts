export class totalStrangersTexts {
  public static label(primary: boolean): string {
    if (primary) return "Status";
    else return "Clients connected: ";
  }
}
