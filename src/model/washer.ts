import {DTO} from "./dto";

export class WasherObj extends DTO {
    public readonly _id: string;
    public _contentID: string;
    public _size: string;
    public _type: string;
    public _material: string;

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
        };
    }

    private constructor(d: any) {
        super();

        this._id = d.id;
        this._contentID = d.content_id;
        this._size = d.size;
        this._type = d.type;
        this._material = d.material;
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
