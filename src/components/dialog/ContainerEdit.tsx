import React from "react";
import { ContainerObj } from "../../model/container";
import { ContainerNet } from "../../net/container";
import { ContainerInner } from "./ContainerInner";

interface props {
  container: ContainerObj;
  closedCallback: () => void;
}

export function ContainerEdit({ closedCallback, container }: props) {
  const net = new ContainerNet();

  function save(container: ContainerObj) {
    net.putContainer(container).then(() => {
      closedCallback();
    });
  }

  function cancel(_: ContainerObj) {
    closedCallback();
  }

  return (
    <ContainerInner
      container={container}
      title={"Edit Container"}
      onSave={save}
      onCancel={cancel}
    />
  );
}
