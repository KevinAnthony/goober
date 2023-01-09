import { DTO } from "./dto";
import { splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

export class BoltObj extends DTO {
  private readonly _id: string;
  private _contentID: string;
  private _head: string;
  private _length: number;
  private _threadSize: string;
  private _threadPitch: string;
  private _material: string;
  private _description: string;

  public static Parse(d: string): BoltObj {
    if (!d) {
      return BoltObj.Empty();
    }

    return new BoltObj(d);
  }

  public static Empty(): BoltObj {
    return new BoltObj({});
  }

  JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      head: this._head,
      length: this._length,
      thread_size: this._threadSize,
      thread_pitch: this._threadPitch,
      material: this._material,
      description: this._description,
    };
  }

  public GetEdit(unit: string): JSX.Element {
    switch (unit) {
      case "mm":
      case "cm":
      case "in":
        return (
          <table className={styles.content_table}>
            <thead>
              <tr>
                <th colSpan={2}>Bolt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>{this._description}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>
                  {this?.threadSize} - {this?.threadPitch}
                </td>
              </tr>
              <tr>
                <td>Length</td>
                <td>
                  {this?.length}
                  {unit}
                </td>
              </tr>
              <tr>
                <td>Head</td>
                <td>{splitAndUppercase(this?.head)}</td>
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
            {unit} is undefined for bolt
          </div>
        );
    }
  }

  public SearchText(unit: string): JSX.Element {
    return (
      <label>{`${this?.threadSize} - ${this?.threadPitch} X ${
        this?.length
      }${unit} -- ${splitAndUppercase(this?.material)} -- ${splitAndUppercase(
        this?.head
      )}`}</label>
    );
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
    this._head = d.head;
    this._length = d.length;
    this._threadSize = d.thread_size;
    this._threadPitch = d.thread_pitch;
    this._material = d.material;
    this._description = d.description;
  }

  //getters
  get id() {
    return this._id;
  }

  get contentID() {
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

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    if (value < 0) {
      throw new Error("length cannot be zero or negitive");
    }

    this._length = value;
  }

  get head(): string {
    return this._head;
  }

  set head(value: string) {
    this._head = value;
  }

  get material(): string {
    return this._material;
  }

  set material(value: string) {
    this._material = value;
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
