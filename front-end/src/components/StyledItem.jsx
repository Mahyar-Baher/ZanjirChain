import { styled } from '@mui/system';
import { Box } from '@mui/material';

const StyledItem = styled(Box)(() => ({
  backgroundColor: '#f8f8ff',
  borderRadius: '16px',
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  height: '100%',
}));

export default StyledItem;