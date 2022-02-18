import {ColorObj} from "./color";
import {BinObj} from "./bin";


export class ContainerObj {
    private readonly _id: string;
    private _color: ColorObj;
    private _width: number;
    private _height: number;
    private _label: string;
    private _unit: string;
    private _bin: Array<BinObj>;

    public static Parse(d: any): ContainerObj {
        return new ContainerObj(d);
    }

    public static Empty(): ContainerObj {
        return new ContainerObj({})
    }

    public JSON(): object {
        return {
            id: this._id,
            color: this._color.JSON(),
            width: this._width,
            height: this._height,
            label: this._label,
            unit: this._unit,
            bins: Array.from(this._bin ? this._bin : Array<BinObj>(0), (d) => BinObj.Parse(d))
        }
    }

    private constructor(d: any) {
        this._id = d.id;
        this._color = ColorObj.Parse(d.color);
        this._width = d.width;
        this._height = d.height;
        this._label = d.label;
        this._unit = d.unit;
        this._bin = Array.from(d.bins ? d.bins : Array<object>(0), (d) => BinObj.Parse(d))
    }

    get id() {
        return this._id
    }

    get color(): ColorObj {
        return this._color
    }

    set color(value: ColorObj) {
        this._color = value
    }

    get width(): number {
        return this._width
    }

    set width(value: number) {
        if (value < 1) {
            throw new Error("width cannot be smaller then 1")
        }

        this._width = value
    }

    get height(): number {
        return this._height
    }

    set height(value: number) {
        if (value < 1) {
            throw new Error("height cannot be smaller then 1")
        }

        this._height = value
    }

    get label(): string {
        return this._label
    }

    set label(value: string) {
        this._label = value
    }

    get unit(): string {
        return this._unit
    }

    set unit(value: string) {
        this._unit = value
    }

    get bin(): Array<BinObj> {
        return this._bin
    }

    set bin(value: BinObj[]) {
        this._bin = value
    }
}

