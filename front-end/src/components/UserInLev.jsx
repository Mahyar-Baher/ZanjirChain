import React from 'react'
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Typography,
  Divider
} from '@mui/material';
import UserLevel from '../components/UserLevel';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));
const level= 0;
const allTether = 0;
const levelLabel = (level) => {
  switch (level) {
    case 1:
      return "طلایی";
    case 2:
      return "نقره ای";
    case 3:
      return "برنزی";
    case 0:
      return "افسانه";
    default:
      return "بدون رنک";
  }
};
const labelLevel = levelLabel(level)
const UserInLev = () => {
  return (
    <Box sx={{mt: 0,p: 1,border: '0px solid transparent',borderRadius: 2,display: 'flex',flexDirection: 'column',gap: 1,}}>
        <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
            <Typography noWrap sx={{fontWeight:'900'}} variant="body1">سطح کاربری</Typography>
            <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0,0,0,0.5)',   height: 2 }}/>
            <Typography noWrap display='flex' alignItems='center'>{labelLevel}<UserLevel level={level} size={28} /></Typography>
        </Box>
        <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
            <Typography noWrap sx={{fontWeight:'900',fontSize: '14px'}}>حجم معاملات (تتر ۳۰ روز گذشته)</Typography>
            <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0,0,0,0.5)',   height: 2 }}/>
            <Typography noWrap display='flex' alignItems='center'>{allTether} تتر</Typography>
        </Box>
    </Box>
    )
}

export default UserInLev