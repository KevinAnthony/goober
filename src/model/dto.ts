export abstract class DTO {
  jsonOrUndefined() {
    if (JSON.stringify(this) === "{}") {
      return undefined;
    }

    return this.JSON();
  }

  isEmpty(): boolean {
    return JSON.stringify(this) === "{}";
  }

  abstract JSON(): object;

  abstract Text(unit: string | number): JSX.Element;

  abstract SearchText(unit: string | number): string;
}
