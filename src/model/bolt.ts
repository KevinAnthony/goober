import {DTO} from "./dto";

export class BoltObj extends DTO {
    private readonly _id: string;
    private _contentID: string;
    private _head: string;
    private _length: number;
    private _threadSize: string;
    private _threadPitch: string;
    private _material: string;

    public static Parse(d: string): BoltObj {
        if (!d) {
            return BoltObj.Empty()
        }

        return new BoltObj(d);
    }

    public static Empty(): BoltObj {
        return new BoltObj({})
    }

    JSON(): object {
        console.log("bolt: ", this)
        return {
            id: this._id,
            content_id: this._contentID,
            head: this._head,
            length: this._length,
            thread_size: this._threadSize,
            thread_pitch: this._threadPitch,
            material: this._material
        }
    }

    private constructor(d: any) {
        super()
        
        this._id = d.id;
        this._contentID = d.content_id;
        this._head = d.head;
        this._length = d.length;
        this._threadSize = d.thread_size;
        this._threadPitch = d.thread_pitch;
        this._material = d.material;
    }

    //getters
    get id() {
        return this._id
    }

    get contentID() {
        return this._contentID
    }

    set contentID(value: string) {
        this._contentID = value
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


    get head(): string {
        return this._head
    }

    set head(value: string) {
        this._head = value
    }

    get material(): string {
        return this._material
    }

    set material(value: string) {
        this._material = value
    }

    get threadSize(): string {
        return this._threadSize
    }

    set threadSize(value: string) {
        this._threadSize = value
    }

    get threadPitch(): string {
        return this._threadPitch
    }

    set threadPitch(value: string) {
        this._threadPitch = value
    }
}
