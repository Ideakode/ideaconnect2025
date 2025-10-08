export default class messengerTexts {
  public static inputTextPlaceholder(): string {
    return "Type your message";
  }
  public static title(connected: boolean): string {
    if (connected) {
      return "Connected with";
    } else {
      return "Connecting with...";
    }
  }
}
