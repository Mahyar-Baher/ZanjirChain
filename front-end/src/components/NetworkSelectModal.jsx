import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  InputBase,
  Paper
} from '@mui/material';
import { Icon } from '@iconify/react';

// کامپوننت آیکون شبکه
const NetworkIcon = ({ network }) => {
  const networkIcons = {
    "Ethereum": "cryptocurrency:eth",
    "Tron": "cryptocurrency:trx", 
    "BNB Smart Chain": "cryptocurrency:bnb",
    "Polygon": "cryptocurrency:matic",
    "Arbitrum": "logos:arbitrum",
    "Optimism": "logos:optimism",
    "Avalanche": "cryptocurrency:avax",
    "Solana": "cryptocurrency:sol"
  };
  
  return (
    <Icon 
      icon={networkIcons[network] || "mdi:network"} 
      width={32} 
      height={32} 
    />
  );
};

export default function NetworkSelectModal({ networks, onSelect }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchTerm('');
  };

  const handleSelect = (network) => {
    onSelect(network.value);
    handleClose();
  };

  const filteredNetworks = networks.filter(network =>
    network.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* دکمه انتخاب شبکه */}
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          width: '100%',
          p: 2,
          borderRadius: 3,
          borderColor: '#28a745',
          color: '#2e7d32',
          borderStyle: 'dashed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          fontSize: '1rem',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#1e5f2a',
            bgcolor: 'rgba(40, 167, 69, 0.04)'
          }
        }}
      >
        <Icon icon="mdi:network" width={24} height={24} />
        انتخاب شبکه انتقال
      </Button>

      {/* مودال انتخاب شبکه */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:network" width={24} height={24} color="#2e7d32" />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
              انتخاب شبکه
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {/* قسمت جستجو */}
          <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
            <Paper
              component="form"
              sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                bgcolor: '#f8f9fa'
              }}
            >
              <Icon icon="mdi:magnify" width={20} height={20} style={{ marginLeft: 8 }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="جستجوی شبکه..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Paper>
          </Box>

          {/* لیست شبکه‌ها */}
          <List sx={{ p: 0 }}>
            {filteredNetworks.length > 0 ? (
              filteredNetworks.map((network, index) => (
                <ListItem key={network.value} disablePadding>
                  <ListItemButton
                    onClick={() => handleSelect(network)}
                    sx={{
                      p: 2,
                      '&:hover': {
                        bgcolor: 'rgba(40, 167, 69, 0.08)'
                      },
                      borderBottom: index < filteredNetworks.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'transparent',
                          width: 48,
                          height: 48
                        }}
                      >
                        <NetworkIcon network={network.label} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#2e7d32'
                          }}
                        >
                          {network.label}
                        </Typography>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#666',
                            mt: 0.5
                          }}
                        >
                          شبکه {network.label}
                        </Typography>
                      }
                    />
                    <Icon icon="mdi:chevron-right" width={20} height={20} color="#999" />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Icon icon="mdi:network-off" width={48} height={48} color="#ccc" />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  شبکه‌ای یافت نشد
                </Typography>
              </Box>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}