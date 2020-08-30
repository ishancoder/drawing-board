import React, { useState } from "react";

import Canvas from "./components/Canvas";
import Tools from "./components/Tools";
import ColorPallete from "./components/ColorPallate";

import "./App.css";
import { TOOL_TYPE } from "./config/constants";
import StrokeWidthAdjuster from "./components/StrokeWidthAdjuster";

function App() {
  const [tool, setTool] = useState(TOOL_TYPE.MARKER);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [color, setColor] = useState("black");

  return (
    <div className="app">
      <aside>
        <ColorPallete selectedColor={color} onChangeColor={setColor} />
      </aside>
      <section>
        <Canvas tool={tool} color={color} strokeWidth={strokeWidth} />
        <StrokeWidthAdjuster
          selectedStrokeWidth={strokeWidth}
          onChangeStrokeWidth={setStrokeWidth}
        />
      </section>
      <aside>
        <Tools
          selectedTool={tool}
          onChangeTool={setTool}
          onChangeStrokeWidth={setStrokeWidth}
        />
      </aside>
    </div>
  );
}

export default App;
