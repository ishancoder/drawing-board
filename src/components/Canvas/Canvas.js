import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { midPointBtw } from "../../utils";

import "./Canvas.css";
import { TOOL_TYPE } from "../../config/constants";

Canvas.propTypes = {
  tool: PropTypes.oneOf(Object.values(TOOL_TYPE)).isRequired,
  color: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
};

function Canvas({ tool, color, strokeWidth }) {
  const canvasRef = useRef();
  const context = useRef();
  const points = useRef([]);
  const stateBeforeHighlighter = useRef();
  const [toolDown, setToolDown] = useState(false);

  useEffect(() => {
    context.current = canvasRef.current.getContext("2d");
    context.current.lineJoin = "round";
    context.current.lineCap = "round";
  }, []);

  const undoHighlighting = () => {
    if (!stateBeforeHighlighter.current) return;

    const ctx = context.current;
    const img = document.createElement("img");
    img.setAttribute("src", stateBeforeHighlighter.current);
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    img.onload = () => {
      const previousAlpha = ctx.globalAlpha;
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
      ctx.globalAlpha = previousAlpha;
    };
  };

  const saveState = () => {
    stateBeforeHighlighter.current = canvasRef.current.toDataURL();
  };

  const mouseDownListener = (e) => {
    const ctx = context.current;
    points.current.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.shadowColor = color;
    ctx.shadowBlur = 1;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    undoHighlighting();
    if (tool === TOOL_TYPE.ERASER) {
      ctx.strokeStyle = "white";
      ctx.shadowColor = "white";
    } else if (tool === TOOL_TYPE.HIGHLIGHTER) {
      context.current.shadowBlur = 0;
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.05;
      ctx.globalCompositeOperation = "xor";
    }
    setToolDown(true);
  };

  const mouseUpListener = () => {
    setToolDown(false);
    points.current = [];
    if (tool !== TOOL_TYPE.HIGHLIGHTER) {
      saveState();
    }
  };

  const mouseMoveListener = (e) => {
    if (!toolDown) return;
    points.current.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    const ctx = context.current;
    let p1 = points.current[0];
    let p2 = points.current[1];

    ctx.moveTo(p1.x, p1.y);

    ctx.beginPath();
    for (let i = 1; i < points.current.length - 1; i++) {
      let midPoint = midPointBtw(p1, p2);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points.current[i];
      p2 = points.current[i + 1];
    }

    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      height={600}
      width={800}
      onMouseDown={mouseDownListener}
      onMouseUp={mouseUpListener}
      onMouseMove={mouseMoveListener}
      className="canvas"
    ></canvas>
  );
}

export default Canvas;
