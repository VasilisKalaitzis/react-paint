import React from 'react';
import { Box } from '@mui/material';
import Tools from './Tools';
import ToolProperties from './ToolProperties';

const Toolbox = () => 
<Box boxShadow="-4px 0px 4px -2px rgba(0, 0, 0, 0.2)" height="100%" overflow="auto">
    <Tools/>
    <ToolProperties/>
</Box>;

export default Toolbox;


