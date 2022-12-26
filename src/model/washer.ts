import { DTO } from "./dto";
import { splitAndUppercase } from "../util/formatting";

export class WasherObj extends DTO {
  public readonly _id: string;
  public _contentID: string;
  public _size: string;
  public _type: string;
  public _material: string;
  private _description: string;

  public static Parse(d: any): WasherObj {
    if (!d) {
      return WasherObj.Empty();
    }

    return new WasherObj(d);
  }

  public static Empty(): WasherObj {
    return new WasherObj({});
  }

  public JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      size: this._size,
      type: this._type,
      material: this._material,
      description: this._description,
    };
  }

  public Text(unit: string): string {
    switch (unit) {
      case "mm":
        return `Washer
----------------
Size:\t${this?._size}
Head:\t${splitAndUppercase(this?._type)}
Finish:\t${splitAndUppercase(this?._material)}`;
      default:
        return `${unit} is undefined for washer`;
    }
  }

  public SearchText(unit: string): string {
    switch (unit) {
      case "mm":
        return `${this?._size} -- ${splitAndUppercase(
          this?._material
        )} -- ${splitAndUppercase(this?._type)}`;
      default:
        return `${unit} is undefined for washer`;
    }
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
    this._size = d.size;
    this._type = d.type;
    this._material = d.material;
    this._description = d.description;
  }

  get id(): string {
    return this._id;
  }

  get contentID(): string {
    return this._contentID;
  }

  set contentID(value: string) {
    this._contentID = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get material(): string {
    return this._material;
  }

  set material(value: string) {
    this._material = value;
  }
}
