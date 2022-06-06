import {netCode} from "./net";
import {ContainerObj} from "../model/container";

export class ContainerNet extends netCode {
    getContainerAll(): Promise<Array<ContainerObj>> {
        const url = this.getURL();
        return window
            .fetch(`${url}/container/all`, {
                method: "GET",
                redirect: "follow",
                referrerPolicy: "no-referrer",
            })
            .then((r) => r.json())
            .then<ContainerObj[]>((resp) => {
                const out = new Array<ContainerObj>(0);

                for (let i in resp) {
                    out.push(ContainerObj.Parse(resp[i]));
                }

                return out;
            });
    }

    putContainer(container: ContainerObj): Promise<any> {
        const json = JSON.stringify(container.JSON());

        return window
            .fetch(`${this.getURL()}/container/${container.id}`, {
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
            .then<ContainerObj>((data) => {
                return ContainerObj.Parse(data);
            });
    }

    deleteContainer(container: ContainerObj): Promise<ContainerObj> {
        return window
            .fetch(`${this.getURL()}/container/${container.id}`, {
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
