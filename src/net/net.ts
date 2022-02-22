export class netCode {
  private readonly _host: string;
  private readonly _proto: string;

  constructor() {
    this._host = process.env.REACT_APP_API_URL
      ? process.env.REACT_APP_API_URL
      : "localhost:8080";
    this._proto = "http";
  }

  protected getURL(): string {
    return `${this._proto}:\\\\${this._host}`;
  }
}
