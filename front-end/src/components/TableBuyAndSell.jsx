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
import CloseIcon from '@mui/icons-material/Close';

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

const TableBuyAndSell = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('buy');
  const [visible, setVisible] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [buyData, setBuyData] = useState([]);
  const [sellData, setSellData] = useState([]);

  // دریافت داده‌ها از localStorage
  useEffect(() => {
    const fetchOrders = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        // فیلتر سفارشات خرید (تبدیل تومان به تتر)
        const buyOrders = orders.filter(order => 
          order.transaction_type === 4 && order.currency === 'toman'
        ).map(order => ({
          id: order.id,
          qty: order.ba_tether ? order.ba_tether.toLocaleString('fa-IR') : '0',
          rate: order.rate ? order.rate.toLocaleString('fa-IR') : '0',
          total: order.ba_toman ? order.ba_toman.toLocaleString('fa-IR') : '0',
          type: 'تتر',
          track: order.bank_tracking_code || 'ندارد',
          time: new Date(order.created_at).toLocaleDateString('fa-IR'),
          receipt: order.receipt_url || 'https://via.placeholder.com/300x200.png?text=No+Receipt',
          success: order.financial_status === 1,
        }));
        
        // فیلتر سفارشات فروش (تبدیل تتر به تومان)
        const sellOrders = orders.filter(order => 
          order.transaction_type === 5 && order.currency === 'tether'
        ).map(order => ({
          id: order.id,
          qty: order.ba_toman ? order.ba_toman.toLocaleString('fa-IR') : '0',
          rate: order.rate ? order.rate.toLocaleString('fa-IR') : '0',
          total: order.ba_tether ? order.ba_tether.toLocaleString('fa-IR') : '0',
          type: 'تتر',
          track: order.bank_tracking_code || 'ندارد',
          time: new Date(order.created_at).toLocaleDateString('fa-IR'),
          receipt: order.receipt_url || 'https://via.placeholder.com/300x200.png?text=No+Receipt',
          success: order.financial_status === 1,
        }));
        
        setBuyData(buyOrders);
        setSellData(sellOrders);
      } catch (error) {
        console.error('Error parsing orders data:', error);
        setBuyData([]);
        setSellData([]);
      }
    };

    fetchOrders();
    
    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => fetchOrders();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const rows = active === 'buy' ? buyData : sellData;
  const loadMore = () => setVisible((p) => Math.min(p + 10, rows.length));
  const openModal = (img) => { setModalImg(img); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setModalImg(null); };

  const isEmpty = rows.length === 0;

  const rateHeader  = active === 'buy' ? 'نرخ (تومان)' : 'نرخ (تتر)';
  const totalHeader = active === 'buy' ? 'مبلغ کل (تومان)' : 'مبلغ کل (تتر)';

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr auto',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          mb: 1,
        }}
      >
        <Button
          variant={active === 'buy' ? 'contained' : 'outlined'}
          onClick={() => {
            setActive('buy');
            setVisible(5);
          }}
          sx={{
            borderColor: '#1a652a',
            color: active === 'buy' ? '#fff' : '#1a652a',
            backgroundColor: active === 'buy' ? '#1a652a' : 'transparent',
            whiteSpace: 'nowrap',
            px: 3,
          }}
        >
          خرید
        </Button>

        <Button
          variant={active === 'sell' ? 'contained' : 'outlined'}
          onClick={() => {
            setActive('sell');
            setVisible(5);
          }}
          sx={{
            borderColor: '#1a652a',
            color: active === 'sell' ? '#fff' : '#1a652a',
            backgroundColor: active === 'sell' ? '#1a652a' : 'transparent',
            whiteSpace: 'nowrap',
            px: 3,
          }}
        >
          فروش
        </Button>

        <Divider
          sx={{
            borderStyle: 'dashed',
            borderColor: '#1a652a',
            height: 2,
          }}
        />

        <Button
          variant="text"
          onClick={() => setCollapsed((p) => !p)}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {collapsed ? 'نمایش جدول' : 'بستن جدول'}
        </Button>
      </Box>
      
      <Collapse in={!collapsed} timeout="auto" unmountOnExit fullWidth>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            overflow: 'auto',
          }}
        >
          <Table sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <TableHead sx={{ backgroundColor: '#80808c3f' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderTopRightRadius: '22px', borderBottomRightRadius: '22px', borderBottom: 'none' }}>تعداد</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>{rateHeader}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>{totalHeader}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>نوع</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>کد پیگیری</TableCell>
                <TableCell align="center" sx={{ borderBottom: 'none' }}>زمان</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>رسید</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px', borderBottom: 'none' }}>وضعیت</TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: '#80808c3f' }}>
              {!isEmpty ? (
                rows.slice(0, visible).map((r, idx) => (
                  <TableRow key={r.id ?? idx} sx={{ '& td': { borderBottom: 'none' } }}>
                    <TableCell align="center" sx={{ borderTopRightRadius: '22px', borderBottomRightRadius: '22px' }}>{r.qty}</TableCell>
                    <TableCell align="center">{r.rate}</TableCell>
                    <TableCell align="center">{r.total}</TableCell>
                    <TableCell align="center">{r.type}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace' }}>{r.track}</TableCell>
                    <TableCell align="center">{r.time}</TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => openModal(r.receipt)}
                        disabled={!r.receipt || r.receipt.includes('placeholder')}
                      >
                        {r.receipt && !r.receipt.includes('placeholder') ? 'عکس' : 'ندارد'}
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' }}>
                      <Chip
                        label={r.success ? 'موفق' : 'ناموفق'}
                        color={r.success ? 'success' : 'error'}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none', py: 4 }}>
                    <img 
                      src="./media/images/empty_box.webp" 
                      alt="empty" 
                      width={112} 
                      style={{ opacity: 0.9 }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentNode.innerHTML = '<span>📭</span>';
                      }}
                    />
                    <Typography mt={1}>هیچ ردیفی برای نمایش وجود ندارد</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isEmpty && visible < rows.length && (
          <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={loadMore}>
            نمایش بیشتر
          </Button>
        )}
      </Collapse>
      
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={styleModal}>
          {modalImg && (
            <img 
              src={modalImg} 
              alt="رسید" 
              style={{ 
                width: '100%', 
                borderRadius: 8,
                maxHeight: '70vh',
                objectFit: 'contain'
              }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200.png?text=Image+Not+Found';
              }}
            />
          )}
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={closeModal}>
            بستن
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableBuyAndSell;