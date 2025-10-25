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
    title: '',
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
      
    </>
  )
}

export default AddsMaster
