import React from 'react';
import { Box, Typography, MenuItem, FormControl, Select } from '@mui/material';
import QRCode from 'react-qr-code';
import { Icon } from '@iconify/react';

export default function NetworkSelect({ networks, selectedNetwork, onChange, tokenIcon }) {
  const address = networks[selectedNetwork] || '';

  return (
    <Box sx={{ bgColor: 'background.paper', p: 3, py:0, borderRadius: 2, display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={selectedNetwork || ''}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          sx={{
            color: 'text.primary',
            bgColor: 'background.paper',
            borderRadius: 1,
            '& .MuiSelect-select': { py: 1.5 },
            '& .MuiOutlinedInput-notchedOutline': { bgColor: 'background.paper' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#eee' },
          }}
        >
          {Object.keys(networks).map((net) => (
            <MenuItem
              key={net}
              value={net}
              sx={{ color: 'text.primary', bgColor: 'background.paper' }}
            >
              {net.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {address && (
        <Box
          sx={{
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            bgColor: 'background.paper',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}
          >
            آدرس واریز
          </Typography>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              borderRadius: 1,
              mb: 2,
              bgcolor: 'background.paper',
              justifyContent:'center',
              alignItems:'center',
              p: 1,
              // ماسک دایره‌ای وسط QR کد:
              maskImage: `radial-gradient(circle 20% at center, transparent 99%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle 20% at center, transparent 99%, black 100%)`,
            }}
          >
            <QRCode value={address} size={200} />

            {/* آیکون وسط QR کد */}
            {tokenIcon && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                  p: 0.1,
                  boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                }}
              >
              <Icon icon={`cryptocurrency-color:${tokenIcon.toLowerCase()}`} width={40} height={40} />
              </Box>
            )}
          </Box>

          <Typography
            sx={{
              mt: 1,
              color: 'text.primary',
              wordBreak: 'break-word',
              fontFamily: 'monospace',
            }}
          >
            {address}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
