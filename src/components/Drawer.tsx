import React from "react";
import "./Drawer.css";

interface props {
  opened: boolean;
  title: React.ReactNode;
  extra: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

export function Drawer({ opened, title, children, onClose, extra }: props) {
  return (
    <div className={`drawer`} style={{ display: opened ? "block" : "none" }}>
      <div className="overlay" onClick={onClose}></div>
      <div className="drawer_content">
        <div className={"drawer_head"}>
          <h1 className="drawer_title">{title}</h1>
          {extra}
        </div>
        {children}
      </div>
    </div>
  );
}
