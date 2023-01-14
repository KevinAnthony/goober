import React from "react";
import "./Dialog.css";

interface props {
  opened: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export function Dialog({ children, opened, onClose, title = "" }: props) {
  return (
    <div className={`modal`} style={{ display: opened ? "block" : "none" }}>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal_content">
        <h1 className="model_title">{title}</h1>
        {children}
      </div>
    </div>
  );
}
