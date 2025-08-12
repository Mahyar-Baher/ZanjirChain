import React from 'react';
import { 
  Box, Typography, List, ListItem, 
  ListItemAvatar, Avatar, ListItemText 
} from '@mui/material';
import { Icon } from '@iconify/react';

export default function TokenSelect({ tokens, onSelect }) {
  return (
    <Box 
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        bgColor: 'Background.paper',
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        p: 1,
        mt: 1
      }}
    >
      {/* هدر */}
      <Box 
        sx={{ 
          bgcolor: '#28a745', 
          color: 'white',
          textAlign: 'center',
          py: 1,
          px: 1,
          mb: 2,
          borderRadius: 2,
          fontWeight: 'bold',
          fontSize: '1.2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        انتخاب رمز ارز
      </Box>
      
      {/* لیست توکن‌ها */}
      <List sx={{ py: 0 }}>
        {tokens.map((token, index) => (
          <ListItem
            key={index}
            button
            onClick={() => onSelect(token)}
            sx={{
              display:'flex',
              alignItems:"center",
              justifyContent:"space-between",
              mb: 2,
              borderRadius: 3,
              bgColor: 'Background.paper',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                bgColor: 'Background.paper',
              },
              p: 1,
              border: '1px solid #e0e0e0'
            }}
          >
            <ListItemAvatar>
              <Box
                sx={{
                  bgColor: 'Background.paper',
                  borderRadius: '50%',
                  p: 0.1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <Icon 
                  icon={`cryptocurrency-color:${token.symbol.toLowerCase()}`} 
                  width={40} 
                  height={40} 
                />
              </Box>
            </ListItemAvatar>
            
                <Typography 
                  variant="span" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#2e7d32',
                  }}
                >
                  {token.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="span" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#28a745',
                      background:"background.paper",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.9rem'
                    }}
                  >
                    {token.symbol}
                  </Typography>
                </Box>
          </ListItem>
        ))}
      </List>
      
      {/* فوتر */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 3,
          pt: 2,
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#757575',
            fontStyle: 'italic'
          }}
        >
          برای انتخاب رمز ارز مورد نظر روی آن کلیک کنید
        </Typography>
      </Box>
    </Box>
  );
}