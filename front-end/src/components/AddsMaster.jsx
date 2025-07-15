import React from 'react'
import { Box, Typography, Button, Grid, Paper, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const adItems = [
  {
    title: 'ترید سریع و آسان',
    desc: 'با بهترین نرخ و سرعت در پلتفرم ما ترید کن.',
    button: 'شروع ترید',
    logo: 'https://pngimg.com/uploads/coin/coin_PNG36872.png',
  },
  {
    title: 'پشتیبانی حرفه‌ای',
    desc: 'تیم پشتیبانی ۲۴ ساعته آماده پاسخ‌گویی به شماست.',
    button: 'تماس با ما',
    logo: 'https://pngimg.com/uploads/coin/coin_PNG36872.png',
  },
  {
    title: 'پاداش ثبت‌نام',
    desc: 'با ثبت‌نام اولیه، از تخفیف ویژه کارمزد بهره‌مند شوید.',
    button: 'ثبت‌نام',
    logo: 'https://pngimg.com/uploads/coin/coin_PNG36872.png',
  },
]

const AddsMaster = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {adItems.map((item, index) => (
        <Grid key={index} item size={{xs: 12,sm: 12, md: 12, lg:4}} sx={{pl:0, mt: {xl:1}, display: 'flex', justifyContent: 'space-between'}}>
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: item.bg
                ? `url(${item.bg})`
                : 'linear-gradient(135deg, #1a652a 0%, #1a652a 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              p: 3,
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: isMobile ? 'column-reverse' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box flex={1} textAlign={isMobile ? 'center' : 'right'}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#fff"
                sx={{ mb: 1 }}
              >
                {item.title}
              </Typography>
              <Typography color="#f0f0f0" sx={{ mb: 2 }}>
                {item.desc}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ fontWeight: 'bold', px: 3 }}
              >
                {item.button}
              </Button>
            </Box>
            <Box
              component="img"
              src={item.logo}
              alt={item.title}
              sx={{
                width: isMobile ? 60 : 80,
                height: 'auto',
                mb: isMobile ? 2 : 0,
              }}
            />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

export default AddsMaster
