import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeActiveTool } from '../../actions/toolActions';
import { Box, Button, Typography, ButtonProps } from '@mui/material';
import { GiArrowCursor } from 'react-icons/gi'
import { TbLine, TbOvalVertical, TbCircle } from 'react-icons/tb';
import { grey } from '@mui/material/colors';

interface MyButtonProps extends ButtonProps {
  selected?: boolean;
}

function ToolButton(props: MyButtonProps) {
  const { children, selected, ...rest } = props;
  const styles = {
    backgroundColor: selected ? grey[300] : 'transparent',
    color: grey[800],
    padding: '14px',
    minWidth: '60px',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: selected ? grey[300] : grey[200],
    },
    '&:focus': {
      backgroundColor: selected ? grey[300] : grey[200],
    },
    '&:active': {
      backgroundColor: selected ? grey[300] : grey[200],
    },
  };

  return (
    <Button sx={styles} {...rest}>
      {children}
    </Button>
  );
}

const Tools = () => {
  const dispatch = useDispatch();
  const { activeTool } = useSelector<RootState, ToolState>((state) => state.tools);
  return (
    <Box padding="8px">
      <Box>
        <Typography variant='inherit'>
          Available Tools
        </Typography>
      </Box>
      <Box margin="8px 0px" display="flex" flexWrap="wrap" alignItems="center">
        <ToolButton onClick={() => dispatch(changeActiveTool('select'))} title="select drawing" selected={activeTool==='select'} disableRipple>
          <GiArrowCursor size={24}/>
        </ToolButton>
        <ToolButton onClick={() => dispatch(changeActiveTool('line'))} title="draw line" selected={activeTool==='line'} disableRipple>
          <TbLine size={24}/>
        </ToolButton>
        <ToolButton onClick={() => dispatch(changeActiveTool('circle'))} title="draw circle" selected={activeTool==='circle'}  disableRipple>
          <TbCircle size={24} />
        </ToolButton>
        <ToolButton onClick={() => dispatch(changeActiveTool('ellipse'))} title="draw ellipse" selected={activeTool==='ellipse'}  disableRipple>
          <TbOvalVertical size={24}/>
        </ToolButton>
      </Box>
    </Box>
  );
};

export default Tools;


