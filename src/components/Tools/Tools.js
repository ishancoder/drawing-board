import React from "react";
import PropTypes from "prop-types";
import { TOOL_TYPE } from "../../config/constants";
import ToolItem from "./ToolItem";

import "./Tools.css";

const AVAILABLE_TOOLS = Object.values(TOOL_TYPE);

Tools.propTypes = {
  selectedTool: PropTypes.oneOf(AVAILABLE_TOOLS),
  onChangeTool: PropTypes.func.isRequired,
  onChangeStrokeWidth: PropTypes.func.isRequired,
};

function Tools({ selectedTool, onChangeTool, onChangeStrokeWidth }) {
  return (
    <div className="tools">
      {AVAILABLE_TOOLS.map((tool) => {
        return (
          <ToolItem
            key={tool}
            tool={tool}
            onClick={onChangeTool}
            selected={selectedTool === tool}
          />
        );
      })}
    </div>
  );
}

export default Tools;
