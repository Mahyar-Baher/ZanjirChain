/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
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
  Divider,
  IconButton,
  Modal,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useAuthStore from '../context/authStore';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 440 },
  maxHeight: { xs: '90vh', sm: '80vh' },
  bgcolor: 'background.paper',
  color: 'text.primary',
  boxShadow: 24,
  p: { xs: 2, sm: 3 },
  borderRadius: 2,
  outline: 'none',
  overflowY: 'auto',
};

const columns = [
  { key: 'ba_toman', label: 'مبلغ (تومان)' },
  { key: 'ba_tether', label: 'مقدار تتر' },
  { key: 'created_at', label: 'تاریخ' },
  { key: 'payment_method', label: 'شیوه' },
  { key: 'custom_tracking_code', label: 'کد پیگیری' },
  { key: 'transaction_type', label: 'واریز / برداشت' },
];

const numMap = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
};
const toEnDigits = (s) => s.replace(/[۰-۹٠-٩]/g, (d) => numMap[d] || d);
const toNumber = (s) => +toEnDigits(String(s)).replace(/[^0-9.-]/g, '');
const transactionTypeMap = {
  0: 'واریز مستقیم تومان',
  1: 'واریز مستقیم تتر',
  2: 'برداشت مستقیم تومان',
  3: 'برداشت مستقیم تتر',
  4: 'تبدیل تومان به تتر',
  5: 'تبدیل تتر به تومان',
};

const TableIncomeOutcome = () => {
  const { orders, fetchUserFromToken, token } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState([]);
  const [visibleCols, setVisibleCols] = useState(() => Object.fromEntries(columns.map((c) => [c.key, true])));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadOrders = async () => {
      if (!token) {
        setError('لطفاً ابتدا وارد شوید.');
        return;
      }
      setLoading(true);
      try {
        await fetchUserFromToken(token);
      } catch (err) {
        console.error('خطا در بارگذاری سفارش‌ها:', err);
        setError('خطا در بارگذاری سفارش‌ها. لطفاً دوباره تلاش کنید.');
        if (err.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [fetchUserFromToken, token]);

  const uniqueMethods = [...new Set((orders || []).map((r) => r.payment_method).filter(Boolean))];

  const rows = useMemo(() => {
    let data = (orders || []).filter((r) => {
      if (typeFilter === 'all') return true;
      if (typeFilter === 'deposit') return [0, 1].includes(r.transaction_type);
      if (typeFilter === 'withdraw') return [2, 3].includes(r.transaction_type);
      return true;
    });

    if (sortKey === 'payment_method' && methodFilter.length) {
      data = data.filter((r) => methodFilter.includes(r.payment_method));
    }

    if (sortKey) {
      data = [...data].sort((a, b) => {
        const A = a[sortKey] ?? '';
        const B = b[sortKey] ?? '';
        const numA = toNumber(A);
        const numB = toNumber(B);
        const cmp = !isNaN(numA) && !isNaN(numB) ? numA - numB : String(A).localeCompare(String(B), 'fa');
        return sortOrder === 'asc' ? cmp : -cmp;
      });
    }

    return data;
  }, [sortKey, sortOrder, typeFilter, methodFilter, orders]);

  const getRadiusStyle = (key, pos) => {
    const visibleKeys = columns.filter((c) => visibleCols[c.key]).map((c) => c.key);
    if (!visibleKeys.length) return {};
    if (pos === 'right' && key === visibleKeys[0]) return { borderTopRightRadius: '22px', borderBottomRightRadius: '22px' };
    if (pos === 'left' && key === visibleKeys[visibleKeys.length - 1]) return { borderTopLeftRadius: '22px', borderBottomLeftRadius: '22px' };
    return {};
  };

  const toggleMethodFilter = (method) => {
    setMethodFilter((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  return (
    <Box sx={{ mt: 2, width: '100%', direction: 'rtl' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto',
          alignItems: 'center',
          gap: 1,
          mb: 2,
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <IconButton
          sx={{ color: '#1a652a', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          onClick={() => setFilterOpen(true)}
        >
          فیلتر <Icon icon="mdi:filter-variant" width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
        </IconButton>
        {!isMobile && (
          <Divider sx={{ borderStyle: 'dashed', borderColor: '#1a652a', height: 2 }} />
        )}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-end' }}>
          <Button
            variant="text"
            onClick={() => setCollapsed((p) => !p)}
            sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          >
            {collapsed ? 'نمایش جدول' : 'بستن جدول'}
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              setLoading(true);
              try {
                await fetchUserFromToken(token);
              } catch (err) {
                setError('خطا در بروزرسانی سفارش‌ها: ' + err);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading || !token}
            sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          >
            بروزرسانی
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Typography color="error.main">{error}</Typography>
        </Box>
      ) : !orders || orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography color="text.secondary">هیچ تراکنشی یافت نشد.</Typography>
        </Box>
      ) : (
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <Table sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <TableHead sx={{ backgroundColor: '#80808c3f' }}>
                <TableRow>
                  {columns.map((col) => visibleCols[col.key] && (
                    <TableCell
                      key={col.key}
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                        borderBottom: 'none',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        ...getRadiusStyle(col.key, 'right'),
                        ...getRadiusStyle(col.key, 'left'),
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: '#80808c3f' }}>
                {rows.map((row) => (
                  <TableRow key={row.id} sx={{ '& td': { borderBottom: 'none' } }}>
                    {columns.map((col) => {
                      if (!visibleCols[col.key]) return null;
                      let content = row[col.key];
                      if (col.key === 'transaction_type') {
                        content = (
                          <Chip
                            label={transactionTypeMap[row.transaction_type] || 'نامشخص'}
                            color={row.transaction_type === 0 || row.transaction_type === 1 ? 'success' : (row.transaction_type === 2 || row.transaction_type === 3 ? 'error' : 'default')}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                          />
                        );
                      } else if (col.key === 'created_at') {
                        content = new Date(row.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
                      } else if (col.key === 'ba_toman') {
                        content = content != null ? Number(content).toLocaleString('fa-IR') : '0';
                      } else if (col.key === 'ba_tether') {
                        content = content != null
                          ? Number(content).toLocaleString('fa-IR', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 6,
                            })
                          : '0';
                      }
                      return (
                        <TableCell
                          key={col.key}
                          align="center"
                          sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            ...getRadiusStyle(col.key, 'right'),
                            ...getRadiusStyle(col.key, 'left'),
                          }}
                        >
                          {content}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      )}

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box sx={styleModal}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <FormLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 'bold' }}>
                مرتب‌سازی بر اساس
              </FormLabel>
              <RadioGroup
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                sx={{ flexDirection: isMobile ? 'column' : 'row', gap: { xs: 0.5, sm: 1 } }}
              >
                {columns.map((col) => (
                  <FormControlLabel
                    key={col.key}
                    value={col.key}
                    control={<Radio size="small" />}
                    label={col.label}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                  />
                ))}
              </RadioGroup>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
                  onClick={() => setSortOrder('desc')}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: 0.5 }}
                >
                  صعودی
                </Button>
                <Button
                  size="small"
                  variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
                  onClick={() => setSortOrder('asc')}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: 0.5 }}
                >
                  نزولی
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box>
              <FormLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 'bold' }}>
                نمایش ستون‌ها
              </FormLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {columns.map((col) => (
                  <FormControlLabel
                    key={col.key}
                    control={
                      <Checkbox
                        checked={visibleCols[col.key]}
                        onChange={(e) => setVisibleCols((prev) => ({ ...prev, [col.key]: e.target.checked }))}
                        size="small"
                      />
                    }
                    label={col.label}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box>
              <FormLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 'bold' }}>
                نوع تراکنش
              </FormLabel>
              <RadioGroup
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ flexDirection: isMobile ? 'column' : 'row', gap: { xs: 0.5, sm: 1 }, mb: sortKey === 'payment_method' ? 1 : 0 }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label="همه"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                />
                <FormControlLabel
                  value="deposit"
                  control={<Radio size="small" />}
                  label="واریز"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                />
                <FormControlLabel
                  value="withdraw"
                  control={<Radio size="small" />}
                  label="برداشت"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                />
              </RadioGroup>
            </Box>

            {sortKey === 'payment_method' && (
              <>
                <FormLabel sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 'bold' }}>
                  فیلتر شیوه‌ها
                </FormLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    maxHeight: { xs: 100, sm: 140 },
                    overflowY: 'auto',
                    mb: 2,
                    justifyContent: isMobile ? 'flex-start' : 'center',
                  }}
                >
                  {uniqueMethods.map((method) => (
                    <Chip
                      key={method}
                      label={method}
                      clickable
                      color={methodFilter.includes(method) ? 'primary' : 'default'}
                      variant={methodFilter.includes(method) ? 'filled' : 'outlined'}
                      onClick={() => toggleMethodFilter(method)}
                      sx={{
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        py: 1.5,
                        px: 0.5,
                        height: 'auto',
                        '& .MuiChip-label': { py: 0.25 },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setTypeFilter('all');
                  setMethodFilter([]);
                  setSortKey('');
                  setSortOrder('asc');
                  setVisibleCols(Object.fromEntries(columns.map((c) => [c.key, true])));
                  setFilterOpen(false);
                }}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: 0.5 }}
              >
                بازنشانی فیلترها
              </Button>
              <Button
                variant="contained"
                onClick={() => setFilterOpen(false)}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, py: 0.5 }}
              >
                اعمال فیلتر
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableIncomeOutcome;