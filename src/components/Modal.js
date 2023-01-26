import React from "react";
import "../css/modal.css";

export const Modal = ({ open, close, data, values }) => {
  if (!open) return null;

  return (
    <div className="overlay-modal">
      <div className="modal" id="modal-id">
        <p style={{ width: "fit-content" }}>
          Il valore selezionato è{" "}
          <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
            {values.nomeLine} / {data.x} / {data.y}
          </span>
        </p>
        <button onClick={close} className="modal-close">
          &times;
        </button>
      </div>
    </div>
  );
};
