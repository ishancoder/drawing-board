import React from "react";
import PropTypes from "prop-types";

import { TOOL_TYPE } from "../../config/constants";
import { noop } from "../../utils";

ToolItem.propTypes = {
  tool: PropTypes.oneOf(Object.values(TOOL_TYPE)).isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

function ToolItem({ tool, selected, onClick = noop }) {
  return (
    <div
      onClick={() => onClick(tool)}
      className={selected ? "tool-element tool--selected" : "tool-element"}
    >
      {tool}
    </div>
  );
}

export default ToolItem;
