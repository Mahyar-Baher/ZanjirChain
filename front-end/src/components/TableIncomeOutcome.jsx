import React, { useState, useMemo } from 'react';
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
  Checkbox
} from '@mui/material';
import { Icon } from '@iconify/react';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  color: 'text.primary',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  outline: 'none'
};

const columns = [
  { key: 'ba_toman', label: 'مبلغ (تومان)' },
  { key: 'ba_tether', label: 'مقدار تتر' },
  { key: 'created_at', label: 'تاریخ' },
  { key: 'payment_method', label: 'شیوه' },
  { key: 'custom_tracking_code', label: 'کد پیگیری' },
  { key: 'transaction_type', label: 'واریز / برداشت' }
];

const numMap = {
  '۰': '0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
  '٠': '0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'
};
const toEnDigits = (s) => s.replace(/[۰-۹٠-٩]/g, (d) => numMap[d] || d);
const toNumber   = (s) => +toEnDigits(String(s)).replace(/[^0-9.-]/g, '');
const transactionTypeMap = {
  0: 'واریز مستقیم تومان',
  1: 'واریز مستقیم تتر',
  2: 'برداشت مستقیم تومان',
  3: 'برداشت مستقیم تتر',
  4: 'تبدیل تومان به تتر',
  5: 'تبدیل تتر به تومان',
};

const TableIncomeOutcome = () => {
  const storedOrders = localStorage.getItem('orders');
  const incomeOutcomeData = storedOrders ? JSON.parse(storedOrders) : [];

  const [collapsed, setCollapsed]   = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortKey, setSortKey]       = useState('');
  const [sortOrder, setSortOrder]   = useState('asc');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState([]);
  const [visibleCols, setVisibleCols] = useState(() => Object.fromEntries(columns.map((c) => [c.key, true])));

  const uniqueMethods = [...new Set(incomeOutcomeData.map((r) => r.payment_method))];

  const rows = useMemo(() => {
    let data = incomeOutcomeData.filter((r) => {
      if (typeFilter === 'all') return true;
      if (typeFilter === 'deposit') return r.transaction_type === 1;
      if (typeFilter === 'withdraw') return r.transaction_type === 2;
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
  }, [sortKey, sortOrder, typeFilter, methodFilter, incomeOutcomeData]);

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
    <Box sx={{ mt: 2, width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 1, mb: 1 }}>
        <IconButton sx={{ color: '#1a652a', fontSize: 13 }} onClick={() => setFilterOpen(true)}>
          فیلتر <Icon icon="mdi:filter-variant" width={24} height={24} />
        </IconButton>
        <Divider sx={{ borderStyle: 'dashed', borderColor: '#1a652a', height: 2 }} />
        <Button variant="text" onClick={() => setCollapsed((p) => !p)} sx={{ whiteSpace: 'nowrap' }}>
          {collapsed ? 'نمایش جدول' : 'بستن جدول'}
        </Button>
      </Box>

      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
          <Table sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <TableHead sx={{ backgroundColor: '#80808c3f' }}>
              <TableRow>
                {columns.map((col) => visibleCols[col.key] && (
                  <TableCell key={col.key} align="center" sx={{ fontWeight: 'bold', borderBottom: 'none', ...getRadiusStyle(col.key, 'right'), ...getRadiusStyle(col.key, 'left') }}>{col.label}</TableCell>
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
                          color={row.transaction_type === 1 ? 'success' : (row.transaction_type === 2 ? 'error' : 'default')}
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                        />
                      );
                    }
                    if (col.key === 'created_at') {
                      content = new Date(row.created_at).toLocaleDateString('fa-IR');
                    }
                    return (
                      <TableCell key={col.key} align="center" sx={{ ...getRadiusStyle(col.key, 'right'), ...getRadiusStyle(col.key, 'left') }}>
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

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box sx={styleModal}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <FormLabel>مرتب‌سازی بر اساس</FormLabel>
              <RadioGroup row value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                {columns.map((col) => (
                  <FormControlLabel key={col.key} value={col.key} control={<Radio size="small" />} label={col.label} />
                ))}
              </RadioGroup>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
                  onClick={() => setSortOrder('desc')}
                >
                  صعودی
                </Button>
                <Button
                  size="small"
                  variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
                  onClick={() => setSortOrder('asc')}
                >
                  نزولی
                </Button>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Box sx={{ flex: 1, minWidth: 150 }}>
              <FormLabel>نمایش ستون‌ها</FormLabel>
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
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <FormLabel>نوع تراکنش</FormLabel>
          <RadioGroup row value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ mb: sortKey === 'payment_method' ? 2 : 1 }}>
            <FormControlLabel value="all" control={<Radio size="small" />} label="همه" />
            <FormControlLabel value="deposit" control={<Radio size="small" />} label="واریز" />
            <FormControlLabel value="withdraw" control={<Radio size="small" />} label="برداشت" />
          </RadioGroup>

          {sortKey === 'payment_method' && (
            <>
              <FormLabel>فیلتر شیوه‌ها</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: 140, overflowY: 'auto', mb: 2 }}>
                {uniqueMethods.map((method) => (
                  <Chip
                    key={method}
                    label={method}
                    clickable
                    color={methodFilter.includes(method) ? 'primary' : 'default'}
                    variant={methodFilter.includes(method) ? 'filled' : 'outlined'}
                    onClick={() => toggleMethodFilter(method)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={() => {
              setTypeFilter('all');
              setMethodFilter([]);
              setSortKey('');
              setSortOrder('asc');
              setVisibleCols(Object.fromEntries(columns.map((c) => [c.key, true])));
              setFilterOpen(false);
            }}>
              بازنشانی فیلترها
            </Button>
            <Button variant="contained" onClick={() => setFilterOpen(false)}>
              اعمال فیلتر
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableIncomeOutcome;
