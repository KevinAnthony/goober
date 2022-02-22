export class ColorObj {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;

  public static Parse(d: any): ColorObj {
    return new ColorObj(d);
  }

  public static Empty(): ColorObj {
    return new ColorObj({});
  }

  public JSON(): object {
    return {
      r: this._r,
      g: this._g,
      b: this._b,
      a: this._a,
    };
  }

  private constructor(d: any) {
    if (!d) {
      return;
    }
    this._r = d.r;
    this._g = d.g;
    this._b = d.b;
    this._a = d.a;
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    if (value < 0 || value > 255) {
      throw new Error("value of r is out of range 0-255");
    }

    this._r = value;
  }

  get g(): number {
    return this._g;
  }

  set g(value: number) {
    if (value < 0 || value > 255) {
      throw new Error("value of g is out of range 0-255");
    }

    this._g = value;
  }

  get b(): number {
    return this._b;
  }

  set b(value: number) {
    if (value < 0 || value > 255) {
      throw new Error("value of b is out of range 0-255");
    }

    this._b = value;
  }

  get a(): number {
    return this._a;
  }

  set a(value: number) {
    if (value < 0 || value > 255) {
      throw new Error("value of a is out of range 0-255");
    }

    this._a = value;
  }
}
