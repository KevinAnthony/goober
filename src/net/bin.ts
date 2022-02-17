import {netCode} from "./net";
import {BinObj} from "../model/bin";

export class BinNet extends netCode {
    createBin(bin: BinObj): Promise<BinObj> {
        const url = this.getURL()
        return window.fetch(`${url}/bin`,
            {
                method: 'POST',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bin)
            })
            .then<BinObj>(r => {
                return r.json();
            })
    }

    putBin(bin: BinObj): Promise<BinObj> {
        const json = JSON.stringify(bin)
        const url = this.getURL()
        return window.fetch(`${url}/bin/${bin.id}`,
            {
                method: 'PUT',
                redirect: 'follow',
                mode: 'cors',
                referrerPolicy: 'no-referrer',
                credentials: 'same-origin',
                headers: {
                    'Host': window.location.origin,
                    'Origin': window.location.origin,
                    'Content-Type': 'application/json',
                    'Content-Length': json.length.toString()
                },
                body: json
            }).then(r => {
            return r.json();
        })
    }
}
