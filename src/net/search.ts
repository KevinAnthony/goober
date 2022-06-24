import {netCode} from "./net";
import {BinObj} from "../model/bin";

export class SearchNet extends netCode {
    searchText(text: string): Promise<Array<BinObj>> {
        const url = this.getURL();
        console.log("search", text);
        return window
            .fetch(
                `${url}/search/bin?` +
                new URLSearchParams({
                    text: text,
                }),
                {
                    method: "GET",
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                }
            )
            .then((r) => r.json())
            .then<BinObj[]>((resp) => {
                console.log("response", resp);
                const out = new Array<BinObj>(0);

                for (let i in resp) {
                    out.push(BinObj.Parse(resp[i]));
                }
                return out;
            });
    }
}
