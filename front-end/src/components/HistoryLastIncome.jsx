import React, { useState, useEffect } from 'react';
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
  Divider,
} from '@mui/material';
import useAuthStore from '../context/authStore'; // Adjust path to your authStore file

const HistoryLastIncome = () => {
  const { orders, token, fetchUserFromToken } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(5);

  // Fetch orders if not already loaded
  useEffect(() => {
    if (token && !orders) {
      fetchUserFromToken(token);
    }
  }, [token, orders, fetchUserFromToken]);

  // Map orders to the required format (adjust based on actual API response)
  const transactions = orders
    ? orders.map((order) => ({
        id: order.id || order.transaction_id || Math.random(), // Fallback for ID
        amount: typeof order.amount === 'number' ? `${order.amount.toLocaleString('fa-IR')} تومان` : order.amount || '0 تومان',
        gateway: order.gateway || order.payment_gateway || 'نامشخص',
        date: order.date || order.created_at || 'نامشخص',
        success: order.success !== undefined ? order.success : order.status === 'success',
      }))
    : [];

  const loadMore = () => setVisible((prev) => Math.min(prev + 10, transactions.length));

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Typography>تاریخچه تراکنش‌های اخیر</Typography>
        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.5)', height: 2 }} />
        <Button variant="text" onClick={() => setCollapsed((p) => !p)}>
          {collapsed ? 'نمایش تاریخچه' : 'بستن تاریخچه'}
        </Button>
      </Box>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
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
          {transactions.length === 0 ? (
            <Typography align="center" sx={{ py: 2, color: 'text.secondary' }}>
              {orders === null ? 'در حال بارگذاری...' : 'تراکنشی یافت نشد'}
            </Typography>
          ) : (
            <Table sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
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
                      {t.amount}
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
                        sx={{ borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderRadius: '0px' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {transactions.length > visible && (
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