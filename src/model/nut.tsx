import { DTO } from "./dto";
import { splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

export class NutObj extends DTO {
  private readonly _id: string;
  private _contentID: string;
  private _threadSize: string;
  private _threadPitch: string;
  private _material: string;
  private _description: string;
  private _type: string;

  public static Parse(d: any): NutObj {
    if (!d) {
      return NutObj.Empty();
    }

    return new NutObj(d);
  }

  public static Empty(): NutObj {
    return new NutObj({});
  }

  public JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      material: this._material,
      thread_size: this._threadSize,
      thread_pitch: this._threadPitch,
      type: this._type,
      description: this._description,
    };
  }

  public GetEdit(unit: string): JSX.Element {
    switch (unit) {
      case "mm":
      case "cm":
      case "in":
        return (
          <table className={styles.content_rable}>
            <thead>
              <tr>
                <th colSpan={2}>Nut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>{this._description}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{this?.type}</td>
              </tr>
              <tr>
                <td>Thread</td>
                <td>
                  {this?.threadSize} - {this?.threadPitch}
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
            {unit} is undefined for nut
          </div>
        );
    }
  }

  public SearchText(_: string): string {
    return `${this?.type} -- ${this?.threadSize} - ${this?.threadPitch}`;
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
    this._material = d.material;
    this._type = d.type;
    this._threadSize = d.thread_size;
    this._threadPitch = d.thread_pitch;
    this._description = d.description;
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

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get threadSize(): string {
    return this._threadSize;
  }

  set threadSize(value: string) {
    this._threadSize = value;
  }

  get threadPitch(): string {
    return this._threadPitch;
  }

  set threadPitch(value: string) {
    this._threadPitch = value;
  }
}
