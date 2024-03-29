import { DTO } from "./dto";
import { splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

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

  public GetContentText(unit: string): JSX.Element {
    switch (unit) {
      case "mm":
      case "cm":
      case "in":
        return (
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th colSpan={2}>Washer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>{this._description}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{this?._size}</td>
              </tr>
              <tr>
                <td>Head</td>
                <td>{splitAndUppercase(this?._type)}</td>
              </tr>
              <tr>
                <td>Finish</td>
                <td>{splitAndUppercase(this?.material)}</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return (
          <div className={styles.content_error}>
            {unit} is undefined for washer
          </div>
        );
    }
  }

  public SearchText(_: string): JSX.Element {
    return (
      <label>{`${this?._size} -- ${splitAndUppercase(
        this?._material
      )} -- ${splitAndUppercase(this?._type)}`}</label>
    );
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
