import { DTO } from "./dto";
import { splitAndUppercase } from "../util/formatting";
import React from "react";
import styles from "./content.module.css";

export class SimpleObj extends DTO {
  private readonly _id: string;
  private _contentID: string;
  private _description: string;

  public static Parse(d: any): SimpleObj {
    if (!d) {
      return SimpleObj.Empty();
    }

    return new SimpleObj(d);
  }

  public static Empty(): SimpleObj {
    return new SimpleObj({});
  }

  public JSON(): object {
    return {
      id: this._id,
      content_id: this._contentID,
      description: this._description,
    };
  }

  public GetContentText(_: string): JSX.Element {
    return (
      <table className={styles.content_table}>
        <thead>
          <tr>
            <th colSpan={2}>Simple</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>{splitAndUppercase(this?._description)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  public SearchText(_: string): JSX.Element {
    return <label>{splitAndUppercase(this?._description)}</label>;
  }

  private constructor(d: any) {
    super();

    this._id = d.id;
    this._contentID = d.content_id;
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
}
