
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const SidebarChildrenMenu = ({ childrenItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        background: '#1a652a', 
        // 'linear-gradient(180deg, #9A5BFF, #5040B2)',
        borderRadius: '30px',
        overflow: 'hidden',
        height: 'fit-content',
        position: 'sticky',
        p: 0,
        mt: 6,
      }}
    >
      {childrenItems.map((child) => (
        <Button
          key={child.label}
          fullWidth
          onClick={() => navigate(child.path)}
          sx={{
            justifyContent: 'flex-start',
            color: location.pathname === child.path ? '#fff' : '#fff',
            backgroundColor: location.pathname === child.path ? '#023020' : 'transparent',
            pr: 2,
            py: 1.2,
            borderBottom: '1px dashed rgba(255,255,255,0.3)',
            '& i': { marginLeft: '0px' },
            textAlign: 'start'
          }}
          startIcon={<Icon icon={child.icon} style={{ fontSize: '20px', marginLeft: 12 }}></Icon>}
        >
          {child.label}
        </Button>
      ))}
    </Box>
  );
};

export default SidebarChildrenMenu;
