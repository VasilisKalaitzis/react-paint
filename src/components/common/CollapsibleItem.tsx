import React, { useState } from 'react';
import { Box, InputLabel, SxProps } from '@mui/material';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

interface CollapsibleItemProps {
  label: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

const CollapsibleItem = ({ label, children, isCollapsed }: CollapsibleItemProps) => {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(isCollapsed);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ position: 'relative', pt: '8px'}}>
      <InputLabel
        sx={{ pl: '5px', pr: '5px', '&:hover': { cursor: 'pointer' }, display: 'flex' }}
        onClick={handleToggle}
      >
        {label}
        <Box height="16px" marginTop="2px">
          {collapsed ? <MdExpandMore /> : <MdExpandLess />}
        </Box>
      </InputLabel>
      {!collapsed && (
        <>
          {children}
        </>
      )}
    </Box>
  );
};

export default CollapsibleItem;
