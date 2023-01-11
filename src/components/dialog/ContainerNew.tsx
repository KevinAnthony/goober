import React from "react";

import { ContainerObj } from "../../model/container";
import { ContainerNet } from "../../net/container";
import { ContainerInner } from "./ContainerInner";

interface props {
  closedCallback: (container: ContainerObj) => void;
}

export function ContainerNew({ closedCallback }: props) {
  function initContainer(): ContainerObj {
    let container = ContainerObj.Empty();
    container.unit = "cm";
    container.height = 25;
    container.width = 33;
    container.color.r = 6;
    container.color.g = 74;
    container.color.b = 108;
    container.color.a = 255;

    return container;
  }
  let [container, _] = React.useState<ContainerObj>(() => initContainer());

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
