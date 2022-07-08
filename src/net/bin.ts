import {netCode} from "./net";
import {BinObj} from "../model/bin";

export class BinNet extends netCode {
    createBin(bin: BinObj): Promise<BinObj> {
        const json = JSON.stringify(bin.JSON());
        const url = this.getURL();
        return window
            .fetch(`${url}/bin`, {
                method: "POST",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                headers: {
                    Host: window.location.origin,
                    Origin: window.location.origin,
                    "Content-Type": "application/json",
                    "Content-Length": json.length.toString(),
                },
                body: json,
            })
            .then<BinObj>((r) => {
                return r.json();
            })
            .then<BinObj>((data) => {
                return BinObj.Parse(data);
            });
    }

    getBin(bin: BinObj): Promise<BinObj> {
        const url = this.getURL();
        return window
            .fetch(`${url}/bin/${bin.id}`, {
                method: "GET",
                redirect: "follow",
                referrerPolicy: "no-referrer",
            })
            .then((r) => {
                if (!r.ok) {
                    throw r;
                }
                return r.json();
            })
            .then<BinObj>((data) => {
                return BinObj.Parse(data);
            });
    }

    putBin(bin: BinObj): Promise<any> {
        const json = JSON.stringify(bin.JSON());
        const url = this.getURL();

        console.log(json)
        return window
            .fetch(`${url}/bin/${bin.id}`, {
                method: "PUT",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                headers: {
                    Host: window.location.origin,
                    Origin: window.location.origin,
                    "Content-Type": "application/json",
                    "Content-Length": json.length.toString(),
                },
                body: json,
            })
            .then((r) => {
                if (!r.ok) {
                    throw r;
                }
                return r.json();
            })
            .then<BinObj>((data) => {
                return BinObj.Parse(data);
            });
    }

    deleteBin(bin: BinObj): Promise<BinObj> {
        const url = this.getURL();
        return window
            .fetch(`${url}/bin/${bin.id}`, {
                method: "DELETE",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                headers: {
                    Host: window.location.origin,
                    Origin: window.location.origin,
                },
            })
            .then((r) => {
                if (!r.ok) {
                    throw r;
                }

                return r.json();
            });
    }
}
