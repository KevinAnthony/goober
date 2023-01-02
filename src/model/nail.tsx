import { DTO } from "./dto";
import { decToFraction, splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

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

  public Text(unit: string): JSX.Element {
    switch (unit) {
      case "cm":
      case "in":
        return (
          <table className={styles.content_table}>
            <thead>
              <tr className={styles.content_tr}>
                <th className={styles.content_th} colSpan={2}>
                  Nail
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.content_tr}>
                <td className={styles.content_td}>Size</td>
                <td className={styles.content_td}>{this?._gauge}</td>
              </tr>
              <tr className={styles.content_tr}>
                <td className={styles.content_td}>Length</td>
                <td className={styles.content_td}>
                  {decToFraction(this?._length)}
                  {unit}
                </td>
              </tr>
              <tr className={styles.content_tr}>
                <td className={styles.content_td}>Finish</td>
                <td className={styles.content_td}>
                  {splitAndUppercase(this?.material)}
                </td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return (
          <div className={styles.content_error}>
            {unit} is undefined for nail
          </div>
        );
    }
  }

  public SearchText(unit: string): string {
    return `${this?._gauge}  X ${this?._length}${unit} -- ${splitAndUppercase(
      this?._material
    )}`;
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
