import {ScrewObj} from "./screw";
import {WasherObj} from "./washer";
import {BoltObj} from "./bolt";

export class ContentObj {
    private readonly _id: string;
    private readonly _binID: string;
    private _contentType: string;
    private _bolt: BoltObj;
    private _washer: WasherObj;
    private _screw: ScrewObj;

    public static Parse(d: any): ContentObj {
        if (!d) {
            return ContentObj.Empty()
        }

        return new ContentObj(d);
    }

    public static Empty(): ContentObj {
        return new ContentObj({})
    }

    public JSON(): object {
        return {
            id: this._id,
            bin_id: this._binID,
            content_type: this._contentType,
            bolt: this._bolt.contentID ? this._bolt.JSON() : undefined,
            washer: this._washer.contentID ? this._washer.JSON() : undefined,
            screw: this._screw.contentID ? this._screw.JSON() : undefined,
        };
    }


    private constructor(d: any) {
        this._id = d.id;
        this._binID = d.bin_id;
        this._contentType = d.content_type;
        this._bolt = BoltObj.Parse(d.bolt);
        this._washer = WasherObj.Parse(d.washer);
        this._screw = ScrewObj.Parse(d.screw);
    }

    get id(): string {
        return this._id
    }

    get binID(): string {
        return this._binID
    }

    get contentType(): string {
        return this._contentType
    }

    set contentType(value: string) {
        this._contentType = value
    }

    get bolt(): BoltObj {
        return this._bolt
    }

    set bolt(value: BoltObj) {
        this._bolt = value
    }

    get washer(): WasherObj {
        return this._washer
    }

    set washer(value: WasherObj) {
        this._washer = value
    }

    get screw(): ScrewObj {
        return this._screw
    }

    set screw(value: ScrewObj) {
        this._screw = value
    }
}
