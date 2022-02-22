import { netCode } from "./net";
import { ContainerObj } from "../model/container";

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
}
