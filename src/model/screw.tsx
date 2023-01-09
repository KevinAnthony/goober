import { DTO } from "./dto";
import { decToFraction, splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

export class ScrewObj extends DTO {
  private readonly _id: string;
  private _contentID: string;
  private _length: number;
  private _size: string;
  private _type: string;
  private _head: string;
  private _drive: string;
  private _material: string;
  private _description: string;

  public static Parse(d: any): ScrewObj {
    if (!d) {
      return ScrewObj.Empty();
    }

    return new ScrewObj(d);
  }

  public static Empty(): ScrewObj {
    return new ScrewObj({});
  }

  public JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      length: this._length,
      size: this._size,
      type: this._type,
      head: this._head,
      drive: this._drive,
      material: this._material,
      description: this._description,
    };
  }

  public GetEdit(unit: string): JSX.Element {
    switch (unit) {
      case "cm":
      case "in":
        return (
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th colSpan={2}>Screw</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>{this._description}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{splitAndUppercase(this?._type)}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{this?._size}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>
                  {decToFraction(this?._length)} {unit}
                </td>
              </tr>
              <tr>
                <td>Head</td>
                <td>
                  {splitAndUppercase(this?._head)} {"-"}{" "}
                  {splitAndUppercase(this?._drive)}
                </td>
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
            {unit} is undefined for screw
          </div>
        );
    }
  }

  public SearchText(unit: string): JSX.Element {
    return (
      <label>{`${this?._size} X ${decToFraction(
        this?._length
      )}${unit} -- ${splitAndUppercase(this?._material)} -- ${splitAndUppercase(
        this?._type
      )} /-- ${splitAndUppercase(this?._head)}/${splitAndUppercase(
        this?._drive
      )}`}</label>
    );
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
    this._length = d.length;
    this._size = d.size;
    this._type = d.type;
    this._head = d.head;
    this._drive = d.drive;
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

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get head(): string {
    return this._head;
  }

  set head(value: string) {
    this._head = value;
  }

  get drive(): string {
    return this._drive;
  }

  set drive(value: string) {
    this._drive = value;
  }

  get material(): string {
    return this._material;
  }

  set material(value: string) {
    this._material = value;
  }
}
