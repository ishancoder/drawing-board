import React from "react";
import PropTypes from "prop-types";

import "./StrokeWidthAdjuster.css";

StrokeWidthAdjuster.propTypes = {
  selectedStrokeWidth: PropTypes.number.isRequired,
  onChangeStrokeWidth: PropTypes.func.isRequired,
  maxStrokeWidth: PropTypes.number,
};

function StrokeWidthAdjuster({
  selectedStrokeWidth,
  onChangeStrokeWidth,
  maxStrokeWidth = 10,
}) {
  return (
    <div className="stroke-width-adjuster">
      StrokeWidth:
      <input
        type="range"
        min={1}
        max={maxStrokeWidth}
        value={selectedStrokeWidth}
        onChange={(e) => onChangeStrokeWidth(parseInt(e.target.value))}
        className="stroke-width-adjuster-input"
      />
      {`${selectedStrokeWidth}pts`}
    </div>
  );
}

export default StrokeWidthAdjuster;
