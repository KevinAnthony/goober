export function isEmpty(str: string): boolean {
  return str === undefined || str === "";
}

export function parseNumber(str: string): number {
  if (!str.match("/[1-9][0-9]*\\/[1-9][0-9]*/g")) {
    const arr = str.split("/");

    if (arr.length === 2) {
      return parseFloat(arr[0]) / parseFloat(arr[1]);
    }
  }

  return parseFloat(str);
}
