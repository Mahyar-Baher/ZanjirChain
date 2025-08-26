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
  Modal,
} from '@mui/material';
import useAuthStore from '../context/authStore'; // Adjust path to your authStore file

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  outline: 'none',
};

const HistoryLastOutcome = () => {
  const { orders, token, fetchUserFromToken } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

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
        type: order.type || order.currency || 'تتر',
        method: order.method || order.payment_method || 'نامشخص',
        trackingCode: order.tracking_code || order.trackingCode || 'نامشخص',
        date: order.date || order.created_at || 'نامشخص',
        receiptUrl: order.receipt_url || order.receiptUrl || 'https://via.placeholder.com/300x200?text=رسید',
        success: order.success !== undefined ? order.success : order.status === 'success' || order.status === 'completed',
      }))
    : [];

  const loadMore = () => setVisible((prev) => Math.min(prev + 10, transactions.length));

  const openModal = (imgUrl) => {
    setModalImg(imgUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

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
        <Divider
          sx={{
            borderStyle: 'dashed',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            height: 2,
          }}
        />
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
            <Table
              sx={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 8px',
              }}
            >
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
                    مقدار
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                    نوع
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                    شیوه
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                    کد پیگیری
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: 'none' }}>
                    زمان
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      borderBottom: 'none',
                    }}
                  >
                    رسید
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
                    عملیات
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
                    <TableCell align="center">{t.type}</TableCell>
                    <TableCell align="center">{t.method}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace' }}>
                      {t.trackingCode}
                    </TableCell>
                    <TableCell align="center">{t.date}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => openModal(t.receiptUrl)}
                      >
                        عکس
                      </Button>
                    </TableCell>
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
                        sx={{
                          borderTop: '0px',
                          borderLeft: '0px',
                          borderRight: '0px',
                          borderRadius: 0,
                        }}
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

      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styleModal}>
          {modalImg && (
            <img
              src={modalImg}
              alt="رسید تراکنش"
              style={{ width: '100%', borderRadius: 8 }}
            />
          )}
          <Button fullWidth variant contained sx={{ mt: 2 }} onClick={closeModal}>
            بستن
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default HistoryLastOutcome;