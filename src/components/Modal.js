import React from "react";

export const Modal = ({ open, close, data, values }) => {
  if (!open) return null;

  return (
    <div className="overlay-modal">
      <div className="modal">
        <p style={{ width: "fit-content" }}>
          Il valore selezionato è{" "}
          <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
            {values.nomeLine} / {data.x} / {data.y}
          </span>
        </p>
        <button onClick={close}>x</button>
      </div>
    </div>
  );
};
