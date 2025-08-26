import React, { useState } from 'react';
import { 
  Box, Typography, MenuItem, FormControl, 
  Select, Button, IconButton, Tooltip 
} from '@mui/material';
import QRCode from 'react-qr-code';
import { Icon } from '@iconify/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function NetworkSelect({ networks, selectedNetwork, onChange, tokenIcon }) {
  const address = networks[selectedNetwork] || '';
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box 
      sx={{ 
        py: 0, 
        borderRadius: 3, 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      <FormControl fullWidth sx={{ mb: 1 }}>
        <Select
          value={selectedNetwork || ''}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          sx={{
            color: 'text.primary',
            borderRadius: 3,
            '& .MuiSelect-select': { 
              py: 1.5,
              fontWeight: 600,
            },
            '& .MuiOutlinedInput-notchedOutline': { 
              borderColor: '#c8e6c9',
              borderWidth: 2
            },
            '&:hover .MuiOutlinedInput-notchedOutline': { 
              borderColor: '#28a745' 
            },
          }}
        >
          <MenuItem
            value=''
            sx={{ 
              color: '#757575', 
              fontStyle: 'italic',
              fontWeight: 500
            }}
          >
            شبکه مورد نظر را انتخاب کنید
          </MenuItem>
          {Object.keys(networks).map((net) => (
            <MenuItem
              key={net}
              value={net}
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                '&:hover': { bgcolor: '#e8f5e9' }
              }}
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
            p: 1,
            borderRadius: 3,
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            mb: 0
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              gap: 1
            }}
          >
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 700,
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Icon icon="mdi:wallet" width={24} height={24} />
              آدرس واریز
            </Typography>
            
            <Tooltip title={copied ? "کپی شد!" : "کپی آدرس"} arrow>
              <IconButton
                onClick={handleCopyAddress}
                sx={{
                  bgcolor: copied ? '#4caf50' : '#28a745',
                  color: 'white',
                  '&:hover': {
                    bgcolor: copied ? '#4caf50' : '#218838'
                  }
                }}
              >
                {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              borderRadius: 2,
              mb: 1,
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              bgcolor: 'white',
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
              border: '1px solid #e0e0e0'
            }}
          >
            <QRCode 
              value={address} 
              size={200} 
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
            />

            {/* آیکون وسط QR کد */}
            {tokenIcon && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'white',
                  borderRadius: '10px',
                  p: 0.5,
                  boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                }}
              >
                <Icon 
                  icon={`cryptocurrency-color:${tokenIcon.toLowerCase()}`} 
                  width={26} 
                  height={26} 
                />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              position: 'relative',
              bgcolor: '#e8f5e9',
              p: 2,
              borderRadius: 2,
              border: '1px solid #c8e6c9'
            }}
          >
            <Typography
              sx={{
                color: '#2e7d32',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              {address}
            </Typography>
            
            <Button
              variant="contained"
              onClick={handleCopyAddress}
              startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
              sx={{
                mt: 2,
                bgcolor: copied ? '#4caf50' : '#28a745',
                color: 'white',
                fontWeight: 700,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: copied ? '#4caf50' : '#218838'
                }
              }}
            >
              {copied ? 'کپی شد!' : 'کپی آدرس'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}