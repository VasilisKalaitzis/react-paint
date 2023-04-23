import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeActiveTool } from '../../actions/toolActions';

const Toolbox = () => {
    const dispatch = useDispatch();
//   const selectedTool = useSelector<RootState, AvailableTools>((state) => state.tools.activeTool); // Stored list of shapes
  return (
    <div>
        <button onClick={() => dispatch(changeActiveTool('line'))}>Line</button>
        <button onClick={() => dispatch(changeActiveTool('circle'))}>Circle</button>
        <button onClick={() => dispatch(changeActiveTool('ellipse'))}>Ellipse</button>
    </div>
  );
};

export default Toolbox;


