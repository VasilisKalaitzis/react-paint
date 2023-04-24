import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { createShape, deleteShape, modifyShape, selectShapeByIndex } from '../../actions/shapeActions';
import { RootState } from '../../store';
import { draw, adjustCanvasAndDraw, drawSelectionHighlight } from './utils';

const Canvas = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shapeList, selectedShapeIndex } = useSelector<RootState, ShapeState>((state) => state.shapes);
  const { activeTool, properties } = useSelector<RootState, ToolState>((state) => state.tools);
  const [drawingShape, setDrawingShape] = useState<ShapeModification | undefined>(undefined);

  const canvasDrawCallback = () => {
    if (canvasRef?.current) {
      adjustCanvasAndDraw(canvasRef.current, shapeList);
      // add highlight on the selected element if exists
      if (selectedShapeIndex !== undefined && canvasRef.current) {
        drawSelectionHighlight(canvasRef.current, shapeList[selectedShapeIndex]);
      }
    }
  };

  useEffect(() => {
    dispatch(selectShapeByIndex(undefined));
  }, [activeTool]);

  useEffect(() => {
    if (activeTool === 'select' && selectedShapeIndex !== undefined) {
      const shape = {...shapeList[selectedShapeIndex], properties};
      dispatch(modifyShape(selectedShapeIndex, shape));
    }
  }, [properties]);

  useEffect(() => {
    canvasDrawCallback();
    window.addEventListener('resize', canvasDrawCallback);
    return () => {
      window.removeEventListener('resize', canvasDrawCallback);
    };
  }, [shapeList]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (activeTool !== 'select') {
      const shape = {
        type: activeTool,
        startPoint: { x: offsetX, y: offsetY },
        endPoint: { x: offsetX, y: offsetY },
        properties
      };
      dispatch(createShape(shape));
      setDrawingShape({ shape, index: shapeList.length });
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return; 
      const clickedShapeIndex = draw(canvas, shapeList, event);
      if (clickedShapeIndex !== undefined && selectedShapeIndex !== clickedShapeIndex) {
        dispatch(selectShapeByIndex(clickedShapeIndex));
      }
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawingShape) {
        const { offsetX, offsetY } = event.nativeEvent;
        const shape = {...drawingShape.shape, endPoint: { x: offsetX, y: offsetY } };
        dispatch(modifyShape(drawingShape.index, shape));
    }
  }

  const handleMouseUp = () => {
    setDrawingShape(undefined);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
       dispatch(deleteShape(undefined));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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