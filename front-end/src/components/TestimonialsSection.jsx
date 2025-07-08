import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card
} from '@mui/material';
import { Star } from '@mui/icons-material';

const TestimonialsSection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800, mb: 2 }}>
          نظرات کاربران
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'grey.300', maxWidth: 600, mx: 'auto' }}
        >
          تجربه کاربران ما از خدمات صرافی
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card
              sx={{
                bgcolor: 'rgba(21, 41, 75, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 3,
                border: '1px solid',
                borderColor: 'rgba(100, 149, 237, 0.2)',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #00c9ff 0%, #3b82f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mr: 2,
                  }}
                >
                  {item}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    کاربر حرفه‌ای
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    معامله‌گر ارز دیجیتال
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: 'grey.300', mb: 3 }}>
                "سرعت و امنیت بالای این صرافی واقعاً قابل توجهه. کارمزد پایین و پشتیبانی 24 ساعته باعث شده تمام معاملاتم رو از اینجا انجام بدم."
              </Typography>

              <Box sx={{ display: 'flex', color: 'warning.main' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fontSize="small" />
                ))}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
