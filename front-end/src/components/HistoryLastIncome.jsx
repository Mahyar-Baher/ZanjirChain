import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Divider
} from '@mui/material';

const HistoryLastIncome = () => {
  /* TODO: این داده‌ها را از دیتابیس بگیرید */
  const transactions = [
    { id: 1, amount: '۲۵ میلیون تومان', gateway: 'درگاه بانک ملت',     date: '۱۱ شهریور ۱۴۰۴', success: true  },
    { id: 2, amount: '۴۵ میلیون تومان', gateway: 'درگاه بانک صادرات',  date: '۱۰ شهریور ۱۴۰۴', success: false },
    { id: 3, amount: '۱۳۴ میلیون تومان', gateway: 'درگاه بانک ملی',      date: '۹ شهریور ۱۴۰۴',  success: true  },
    { id: 4, amount: '۱۵۱ میلیون تومان', gateway: 'درگاه بانک ملت',     date: '۸ شهریور ۱۴۰۴',  success: true  },
    { id: 5, amount: '۱۲۴ میلیون تومان', gateway: 'درگاه بانک صادرات',  date: '۷ شهریور ۱۴۰۴',  success: false },
    { id: 6, amount: '۱۲ میلیون تومان', gateway: 'درگاه بانک ملی',      date: '۶ شهریور ۱۴۰۴',  success: true  },
    { id: 7, amount: '۲۱ میلیون تومان', gateway: 'درگاه بانک ملت',     date: '۵ شهریور ۱۴۰۴',  success: true  },
    { id: 8, amount: '۴ میلیون تومان', gateway: 'درگاه بانک صادرات',  date: '۴ شهریور ۱۴۰۴',  success: false },
    { id: 9, amount: '۱۵ میلیون تومان', gateway: 'درگاه بانک ملی',      date: '۳ شهریور ۱۴۰۴',  success: true  },
    { id:10, amount: '۱۲ میلیون تومان', gateway: 'درگاه بانک ملت',     date: '۲ شهریور ۱۴۰۴',  success: true  },
    { id:11, amount: '۱۵ میلیون تومان', gateway: 'درگاه بانک صادرات',  date: '۱ شهریور ۱۴۰۴',  success: false },
    { id:12, amount: '۲ میلیون تومان', gateway: 'درگاه بانک ملی',      date: '۳۱ مرداد ۱۴۰۴', success: true  },
  ];

  const [collapsed, setCollapsed]   = useState(false);
  const [visible,   setVisible]     = useState(5);

  const loadMore = () =>
    setVisible((prev) => Math.min(prev + 10, transactions.length));

  return (
    <Box sx={{ mt: 2,width: '100%', }}>
      <Box sx={{display: 'grid',gridTemplateColumns: 'auto 1fr auto',alignItems: 'center',gap: 1,width: '100%',}}>
        <Typography>
            تاریخچه تراکنش های اخیر
        </Typography>
        <Divider  sx={{    borderStyle: 'dashed',   borderColor: 'rgba(0, 0, 0, 0.5)',   height: 2 }}/>
        <Button variant="text" onClick={() => setCollapsed((p) => !p)}>
            {collapsed ? 'نمایش تاریخچه' : 'بستن تاریخچه'}
        </Button>
      </Box>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit fullWidth>
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            overflow: 'auto',
            mt: 1,
          }}
        >
          <Table sx={{width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <TableHead sx={{ backgroundColor: '#80808c3f' }}>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    borderTopRightRadius: '22px',
                    borderBottomRightRadius: '22px',
                    borderBottom: 'none',
                  }}
                >
                  مبلغ (تومان)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                  نوع تراکنش (درگاه)
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                  تاریخ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    borderTopLeftRadius: '22px',
                    borderBottomLeftRadius: '22px',
                    borderBottom: 'none',
                  }}
                >
                  رسید
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: '#80808c3f' }}>
              {transactions.slice(0, visible).map((t) => (
                <TableRow key={t.id} sx={{ '& td': { borderBottom: 'none' } }}>
                  <TableCell
                    align="center"
                    sx={{
                      borderTopRightRadius: '22px',
                      borderBottomRightRadius: '22px',
                    }}
                  >
                    {t.amount.toLocaleString('fa-IR')}
                  </TableCell>
                  <TableCell align="center">{t.gateway}</TableCell>
                  <TableCell align="center">{t.date}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderTopLeftRadius: '22px',
                      borderBottomLeftRadius: '22px',
                    }}
                  >
                    <Chip
                      label={t.success ? 'پرداخت موفق' : 'پرداخت ناموفق'}
                      color={t.success ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                      sx={{borderTop: '0px' , borderLeft: '0px', borderRight: '0px',borderRadius: '0px'}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {visible < transactions.length && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={loadMore}
            sx={{ mt: 1, alignSelf: 'center' }}
          >
            نمایش بیشتر
          </Button>
        )}
      </Collapse>
    </Box>
  );
};

export default HistoryLastIncome;
