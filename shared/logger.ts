export default class logger {
  public static log(
    objectName: string = "---",
    text: string,
    objectsToPrint: unknown[] = []
  ) {
    /* let name = "---";
    if (objectClass && typeof objectClass !== "string") {
      name = objectClass.name;
      if (!name) {
        name = objectClass.constructor.name;
      }
    } */

    console.log("==================");
    console.log("Name: " + objectName);
    console.log("Info: " + text);
    this.printObjects(objectsToPrint);
    console.log("Time: " + new Date().toISOString());
  }

  private static printObjects(objectsToPrint: unknown[]) {
    if (objectsToPrint.length > 0) {
      objectsToPrint.forEach((object) => {
        console.log(object);
      });
    }
  }
}
