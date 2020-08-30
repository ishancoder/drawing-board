import React from "react";
import PropTypes from "prop-types";

import "./ColorPattete.css";

ColorPallete.propTypes = {
  onChangeColor: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
};

const preDefinedColor = ["red", "green", "blue", "black"];

function ColorPallete({ selectedColor, onChangeColor }) {
  return (
    <div className="color-palette">
      {preDefinedColor.map((color) => {
        return (
          <div
            key={color}
            style={{ width: 50, height: 50, background: color }}
            onClick={() => onChangeColor(color)}
            className={`color ${
              selectedColor === color ? "color--selected" : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
}

export default ColorPallete;
