import { Box, Typography, Stack } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const warnings = [
  'با ورود به سایت، قوانین و شرایط استفاده را می‌پذیرید',
  'اطلاعات خود را به بهانه کسب درآمد در اختیار دیگران قرار ندهید',
  'ساخت حساب کاربری برای دیگران کلاه‌برداری است و مسئولیت آن با شماست',
];

const WarningsBox = () => {
  return (
    <Box
      className="bg-purple"
      sx={{
        width: { xs: '100%', md: '60%', lg: '60%' },
        height: '100%',
        position: 'relative',
        borderRadius: {xs: '10px 10px 0px 0px', md: '100px 0 0 100px'},
        overflow: 'hidden',
        m:0,
        p:0,}}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(/media/images/png.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'lighten',
          opacity: 0.3,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'primary.main',
          opacity: 0.1,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          px: { xs: 2, md: 5 },
          py: { xs: 2, md: 5 },
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          textAlign: 'center',
        }}
      >
        {warnings.map((text, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="start" justifyContent="start">
            <i className="ic ic-attention" style={{ marginLeft: '8px' }} />
            <Typography variant="body1" textAlign="start" fontWeight="bold">
              {text}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default WarningsBox;
