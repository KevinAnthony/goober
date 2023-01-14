import React from "react";
import { Dialog } from "../Dialog";

interface props {
  closedCallback: (accepted: boolean) => void;
  open: boolean;
  title: string;
  description: string;
}

export function Confirmation({
  closedCallback,
  open,
  title,
  description,
}: props) {
  const handleDecline = () => {
    closedCallback(false);
  };

  const handleAccept = () => {
    closedCallback(true);
  };

  return (
    <Dialog title={title} opened={open} onClose={handleDecline}>
      {description}
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            width: "16em",
            height: "4em",
          }}
          onClick={handleAccept}
        >
          Ok
        </button>
        <button
          style={{
            width: "16em",
            height: "4em",
          }}
          onClick={handleDecline}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
}
