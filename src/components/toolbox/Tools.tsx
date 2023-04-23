import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeActiveTool } from '../../actions/toolActions';
import { Box, IconButton } from '@mui/material';
import { ArrowForward, Circle, PanoramaFishEye, Create } from '@mui/icons-material';


const Toolbox = () => {
    const dispatch = useDispatch();
//   const selectedTool = useSelector<RootState, AvailableTools>((state) => state.tools.activeTool); // Stored list of shapes
  return (
    <div>
      <IconButton onClick={() => dispatch(changeActiveTool('select'))}>
        <ArrowForward />
      </IconButton>
      <IconButton onClick={() => dispatch(changeActiveTool('line'))}>
        <Create />
      </IconButton>
      <IconButton onClick={() => dispatch(changeActiveTool('circle'))}>
        <Circle />
      </IconButton>
      <IconButton onClick={() => dispatch(changeActiveTool('ellipse'))}>
        <PanoramaFishEye />
      </IconButton>
    </div>
  );
};

export default Toolbox;


