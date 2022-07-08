import {DTO} from "./dto";
import {splitAndUppercase} from "../util/formatting";

export class NailObj extends DTO {
  private readonly _id: string;
  private _contentID: string;
  private _length: number;
  private _gauge: string;
  private _material: string;
  private _description: string;

  public static Parse(d: any): NailObj {
    if (!d) {
      return NailObj.Empty();
    }

    return new NailObj(d);
  }

  public static Empty(): NailObj {
    return new NailObj({});
  }

  public JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      length: this._length,
      gauge: this._gauge,
      description: this._description,
      material: this._material,
    };
  }

  public Text(unit: string): string {
    return `Nail
----------------
Size:\t${this?._gauge}  X ${this?._length}${unit}
Finish:\t${splitAndUppercase(this?._material)}`;
  }

  public SearchText(unit: string): string {
    return `${this?._gauge}  X ${this?._length}${unit} -- ${splitAndUppercase(this?._material)}`;
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
    this._length = d.length;
    this._gauge = d.gauge;
    this._description = d.description;
    this._material = d.material;
  }

  //getters
  get id(): string {
    return this._id;
  }

  get contentID(): string {
    return this._contentID;
  }

  set contentID(value: string) {
    this._contentID = value;
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    if (value <= 0) {
      throw new Error("length cannot be zero or negitive");
    }

    this._length = value;
  }

  get gauge(): string {
    return this._gauge;
  }

  set gauge(value: string) {
    this._gauge = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get material(): string {
    return this._material;
  }

  set material(value: string) {
    this._material = value;
  }
}
