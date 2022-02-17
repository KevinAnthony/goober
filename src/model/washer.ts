export class WasherObj {
    public readonly _id: string;
    public readonly _contentID: string;
    public  _size: string;
    public  _type: string;
    public  _material: string;

    public static Parse(d: any): WasherObj | null {
        return new WasherObj(d);
    }

    private constructor(d: any) {
        this._id = d.id;
        this._contentID = d.content_id;
        this._size = d.size;
        this._type = d.type;
        this._material = d.material;
    }

    get id(): string{
        return this._id
    }

    get contentID(): string{
        return this._contentID
    }

    get size(): string {
        return this._size
    }

    set size(value: string){
        this._size = value
    }

    get type(): string {
        return this._type
    }

    set type(value: string){
        this._type = value
    }

    get material(): string {
        return this._material
    }

    set material(value: string){
        this._material = value
    }
}
