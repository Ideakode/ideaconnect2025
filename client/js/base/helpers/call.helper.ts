/**
 * @file call.helper.ts
 * @class callHelper
 *
 * @description
 * Provides utility functions for call management.
 *
 * @staticMethods
 * - generateCallId(): string
 *     Generates a 32-character random alphanumeric + symbol string used as a unique
 *     call identifier. Called by messageBuilder.buildCallDetails() each time a new
 *     outgoing call is initiated.
 *
 * @see messageBuilder.buildCallDetails  - primary caller
 */
export class callHelper {
  public static generateCallId() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&/()=?»«<>";
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
