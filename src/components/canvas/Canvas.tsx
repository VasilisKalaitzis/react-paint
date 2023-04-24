import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { createShape, modifyShape } from '../../actions/shapeActions';
import { RootState } from '../../store';
import { draw } from './utils';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const { shapeList } = useSelector<RootState, ShapeState>((state) => state.shapes);
  const { activeTool, properties } = useSelector<RootState, ToolState>((state) => state.tools);
  const [drawingShape, setDrawingShape] = useState<ShapeModification | undefined>(undefined);

  const adjustCanvasAndDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const container = canvas.parentNode as HTMLElement;
    canvas.height = container?.clientHeight;
    canvas.width = container?.clientWidth;
    draw(canvas, shapeList);
  }

  useEffect(() => {
    adjustCanvasAndDraw();
    window.addEventListener('resize', adjustCanvasAndDraw);
    return () => {
      window.removeEventListener('resize', adjustCanvasAndDraw);
    };
  }, [shapeList]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const shape = {
      type: activeTool,
      startPoint: { x: offsetX, y: offsetY },
      endPoint: { x: offsetX, y: offsetY },
      properties
    };
    createShape(shape);
    setDrawingShape({ shape, index: shapeList.length});
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingShape) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    const shape = {...drawingShape.shape, endPoint: { x: offsetX, y: offsetY } };
    dispatch(modifyShape(drawingShape.index, shape));
  }

  const handleMouseUp = () => {
    setDrawingShape(undefined);
  }

  return (
    <Box display="flex" height="100%" width="100%" boxSizing="border-box">
      <canvas
        ref={canvasRef}
        height="100%"
        width="100%"
        style={{ backgroundColor: 'white'}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      </Box>
  );
};

export default Canvas;