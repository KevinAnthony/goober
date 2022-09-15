import { DTO } from "./dto";
import { ScrewObj } from "./screw";
import { WasherObj } from "./washer";
import { BoltObj } from "./bolt";
import { SimpleObj } from "./simple";
import { NailObj } from "./nail";
import { NutObj } from "./nut";

export class ContentObj extends DTO {
  private readonly _id: string;
  private readonly _binID: string;
  private _contentType: string;
  private _bolt: BoltObj;
  private _washer: WasherObj;
  private _screw: ScrewObj;
  private _nail: NailObj;
  private _nut: NutObj;
  private _simple: SimpleObj;

  public static Parse(d: any): ContentObj {
    if (!d) {
      return ContentObj.Empty();
    }

    return new ContentObj(d);
  }

  public static Empty(): ContentObj {
    return new ContentObj({});
  }

  public JSON(): object {
    console.log("content json", this);
    return {
      id: this._id,
      bin_id: this._binID,
      content_type: this._contentType,
      bolt: this._bolt.jsonOrUndefined(),
      washer: this._washer.jsonOrUndefined(),
      screw: this._screw.jsonOrUndefined(),
      simple: this._simple.jsonOrUndefined(),
      nail: this._nail.jsonOrUndefined(),
      nut: this._nut.jsonOrUndefined(),
    };
  }

  public Text(unit: string): string {
    switch (this._contentType) {
      case "bolt":
        return this._bolt.Text(unit);
      case "washer":
        return this._washer.Text(unit);
      case "screw":
        return this._screw.Text(unit);
      case "nail":
        return this._nail.Text(unit);
      case "simple":
        return this._simple.Text(unit);
      case "nut":
        return this._nut.Text(unit);
      case "empty":
        return "";
      default:
        return `${this._contentType} is undefined - getText`;
    }
  }

  public SearchText(unit: string): string {
    switch (this._contentType) {
      case "bolt":
        return this._bolt.SearchText(unit);
      case "washer":
        return this._washer.SearchText(unit);
      case "screw":
        return this._screw.SearchText(unit);
      case "nail":
        return this._nail.SearchText(unit);
      case "simple":
        return this._simple.SearchText(unit);
      case "nut":
        return this._nut.SearchText(unit);
      default:
        return `${this._contentType} is undefined - getText`;
    }
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._binID = d.bin_id;
    this._contentType = d.content_type;
    this._bolt = BoltObj.Parse(d.bolt);
    this._washer = WasherObj.Parse(d.washer);
    this._screw = ScrewObj.Parse(d.screw);
    this._simple = SimpleObj.Parse(d.simple);
    this._nail = NailObj.Parse(d.nail);
    this._nut = NutObj.Parse(d.nut);
  }

  get id(): string {
    return this._id;
  }

  get binID(): string {
    return this._binID;
  }

  get contentType(): string {
    return this._contentType;
  }

  set contentType(value: string) {
    this._contentType = value;
  }

  get bolt(): BoltObj {
    return this._bolt;
  }

  set bolt(value: BoltObj) {
    this._bolt = value;
  }

  get washer(): WasherObj {
    return this._washer;
  }

  set washer(value: WasherObj) {
    this._washer = value;
  }

  get screw(): ScrewObj {
    return this._screw;
  }

  set screw(value: ScrewObj) {
    this._screw = value;
  }

  get nail(): NailObj {
    return this._nail;
  }

  set nail(value: NailObj) {
    this._nail = value;
  }

  get simple(): SimpleObj {
    return this._simple;
  }

  set simple(value: SimpleObj) {
    this._simple = value;
  }

  get nut(): NutObj {
    return this._nut;
  }

  set nut(value: NutObj) {
    this._nut = value;
  }
}
