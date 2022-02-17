import {ScrewObj} from "./screw";
import {WasherObj} from "./washer";
import {BoltObj} from "./bolt";

export class ContentObj {
    private readonly _id: string;
    private readonly _binID: string;
    private  _contentType: string;
    private _bolt: BoltObj | null;
    private _washer: WasherObj | null;
    private _screw: ScrewObj | null;

    public static Parse(d: any): ContentObj {
        return new ContentObj(d);
    }

    private constructor(d: any) {
        this._id = d.id;
        this._binID = d.bin_id;
        this._contentType = d.content_type;
        this._bolt = d.bolt ? BoltObj.Parse(d.bolt) : null;
        this._washer = d.washer ? WasherObj.Parse(d.washer) : null;
        this._screw = d.screw ? ScrewObj.Parse(d.screw) : null;
    }

    get id(): string{
        return this._id
    }

    get binID(): string{
        return this._binID
    }

    get contentType(): string {
        return this._contentType
    }

    set contentType(value:string) {
        this._contentType = value
    }

    get bolt(): BoltObj | null {
        return this._bolt
    }

    set bolt(value : BoltObj | null) {
        this._bolt = value
    }

    get washer(): WasherObj | null {
        return this._washer
    }

    set washer(value : WasherObj | null) {
        this._washer = value
    }

    get screw(): ScrewObj | null {
        return this._screw
    }

    set screw(value : ScrewObj | null) {
        this._screw = value
    }

}
