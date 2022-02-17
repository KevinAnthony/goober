export class ScrewObj {
    private readonly _id: string;
    private readonly _contentID: string;
    private _length: number;
    private _size: string;
    private _type: string;
    private _head: string;
    private _drive: string;
    private _material: string;

    public static Parse(d: any): ScrewObj {
        if (!d) {
            return ScrewObj.Empty()
        }

        return new ScrewObj(d);
    }

    static Empty(): ScrewObj {
        return new ScrewObj({});
    }

    private constructor(d: any) {
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
        return this._id
    }

    get contentID(): string {
        return this._contentID
    }

    get length(): number {
        return this._length
    }

    set length(value: number) {
        if (value < 1) {
            throw new Error("length cannot be zero or negitive")
        }

        this._length = value
    }

    get size(): string {
        return this._size
    }

    set size(value: string) {
        this._size = value
    }

    get type(): string {
        return this._type
    }

    set type(value: string) {
        this._type = value
    }

    get head(): string {
        return this._head
    }

    set head(value: string) {
        this._head = value
    }

    get drive(): string {
        return this._drive
    }

    set drive(value: string) {
        this._drive = value
    }

    get material(): string {
        return this._material
    }

    set material(value: string) {
        this._material = value
    }

}
