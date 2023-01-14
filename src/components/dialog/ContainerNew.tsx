import React from "react";

import { ContainerObj } from "../../model/container";
import { ContainerNet } from "../../net/container";
import { ContainerInner } from "./ContainerInner";
import { hex2rgb } from "../../util/formatting";
import { containerBoschGreen } from "../../util/colors";

interface props {
  closedCallback: (container: ContainerObj) => void;
}

export function ContainerNew({ closedCallback }: props) {
  let container = ContainerObj.Empty();
  container.unit = "cm";
  container.height = 25;
  container.width = 33;
  container.color = hex2rgb(containerBoschGreen);

  const net = new ContainerNet();

  function save(container: ContainerObj) {
    net.createContainer(container).then((container: ContainerObj) => {
      closedCallback(container);
    });
  }

  return (
    <ContainerInner
      container={container}
      title={"New Container"}
      onSave={save}
      onCancel={() => closedCallback}
    />
  );
}
