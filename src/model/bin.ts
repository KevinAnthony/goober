import {ColorObj} from "./color";
import {ContentObj} from "./content";
import {decToFraction, splitAndUppercase} from "../util/formatting";

export class BinObj {
    private readonly _id: string;
    private _containerID: string;
    private _width: number;
    private _height: number;
    private _x: number;
    private _y: number;
    private _color: ColorObj;
    private _unit: string;
    private _content: Array<ContentObj>;

    public static Parse(d: any): BinObj {
        return new BinObj(d);
    }

    private constructor(d: any) {
        this._id = d.id;
        this._containerID = d.container_id;
        this._width = d.width;
        this._height = d.height;
        this._x = d.column_start_x;
        this._y = d.column_start_y;
        this._color = ColorObj.Parse(d.color);
        this._unit = d.unit;
        this._content = new Array<ContentObj>()
        for (let i in d.content) {
            this._content.push(ContentObj.Parse(d.content[i]));
        }
    }

    get id(): string {
        return this._id
    }

    get containerID(): string {
        return this._containerID
    }

    set containerID(value: string) {
        this._containerID = value
    }

    get width(): number {
        return this._width
    }

    set width(value: number) {
        if (value < 5) {
            throw new Error("width cannot be smaller then 5")
        }

        this._width = value
    }

    get height(): number {
        return this._height
    }

    set height(value: number) {
        if (value < 5) {
            throw new Error("height cannot be smaller then 5")
        }

        this._height = value
    }

    get x(): number {
        return this._x
    }

    set x(value: number) {
        if (value < 1) {
            throw new Error("x cannot be smaller then 1")
        }

        this._x = value
    }

    get y(): number {
        return this._y
    }

    set y(value: number) {
        if (value < 1) {
            throw new Error("y cannot be smaller then 1")
        }

        this._y = value
    }

    get color(): ColorObj {
        return this._color
    }

    set color(value: ColorObj) {
        this._color = value
    }

    get unit(): string {
        return this._unit
    }

    set unit(value: string) {
        this._unit = value
    }

    get content(): Array<ContentObj> {
        return this._content
    }

    set content(value: ContentObj[]) {
        this._content = value
    }

    getText(index: number): string {
        switch (this.content[index].contentType) {
            case "bolt":
                return this.getBoltText(index)
            case "washer":
                return this.getWasherText(index)
            case "screw":
                return this.getScrewText(index)
            default:
                return `${this.content[index].contentType} is undefined - getText`
        }
    }

    private getBoltText(index: number): string {
        switch (this.unit) {
            case "mm":
            case "in":
                return `Bolt
----------------
Size:\t${this.content[index].bolt?.threadSize} - ${this.content[index].bolt?.threadPitch} X ${this.content[index].bolt?.length}${this.unit}
Head:\t${splitAndUppercase(this.content[index].bolt?.head)}
Finish:\t${splitAndUppercase(this.content[index].bolt?.material)}`
            default:
                return `${this.unit} is undefined for bolt`
        }
    }

    private getWasherText(index: number) {
        switch (this.unit) {
            case "mm":
                return `Washer
----------------
Size:\t${this.content[index].washer?.size}
Head:\t${splitAndUppercase(this.content[index].washer?.type)}
Finish:\t${splitAndUppercase(this.content[index].washer?.material)}`
            default:
                return `${this.unit} is undefined for washer`
        }
    }


    private getScrewText(index: number) {
        switch (this.unit) {
            case "in":
                return `Screw
----------------
Size:\t${this.content[index].screw?.size} X ${decToFraction(this.content[index].screw?.length)}${this.unit}
Type:\t${splitAndUppercase(this.content[index].screw?.type)}
Head:\t${splitAndUppercase(this.content[index].screw?.head)} - ${splitAndUppercase(this.content[index].screw?.drive)}
Finish:\t${splitAndUppercase(this.content[index].screw?.material)}`
            default:
                return `${this.unit} is undefined for screw`
        }
    }
}
