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
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  outline: 'none'
};

const columns = [
  { key: 'amount', label: 'مبلغ (تومان)' },
  { key: 'tetherQty', label: 'مقدار تتر' },
  { key: 'date', label: 'تاریخ' },
  { key: 'iban', label: 'شماره شبا' },
  { key: 'method', label: 'شیوه' },
  { key: 'tracking', label: 'کد پیگیری' },
  { key: 'type', label: 'واریز / برداشت' }
];

const incomeOutcomeData = [
  {
    id: 1,
    amount: '۱۰٬۰۰۰٬۰۰۰',
    tetherQty: '۱۵۰',
    date: '۱۴ شهریور ۱۴۰۴',
    iban: 'IR12 3456 7890 1234 5678 9012 34',
    method: 'کارت به کارت',
    tracking: 'TRK12345',
    type: 'واریز',
  },
  {
    id: 2,
    amount: '۵٬۰۰۰٬۰۰۰',
    tetherQty: '۷۵',
    date: '۱۵ شهریور ۱۴۰۴',
    iban: 'IR98 7654 3210 9876 5432 1098 76',
    method: 'درگاه بانکی',
    tracking: 'TRK67890',
    type: 'برداشت',
  }
];

const numMap = {
  '۰': '0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
  '٠': '0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'
};
const toEnDigits = (s) => s.replace(/[۰-۹٠-٩]/g, (d) => numMap[d] || d);
const toNumber   = (s) => +toEnDigits(String(s)).replace(/[^0-9.-]/g, '');

const TableIncomeOutcome = () => {
  const [collapsed, setCollapsed]   = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortKey, setSortKey]       = useState('');
  const [sortOrder, setSortOrder]   = useState('asc');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState([]);
  const [visibleCols, setVisibleCols] = useState(() => Object.fromEntries(columns.map((c) => [c.key, true])));

  const uniqueMethods = [...new Set(incomeOutcomeData.map((r) => r.method))];

  const rows = useMemo(() => {
    let data = incomeOutcomeData.filter((r) => {
      if (typeFilter === 'all') return true;
      if (typeFilter === 'deposit') return r.type === 'واریز';
      return r.type === 'برداشت';
    });

    if (sortKey === 'method' && methodFilter.length) {
      data = data.filter((r) => methodFilter.includes(r.method));
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
  }, [sortKey, sortOrder, typeFilter, methodFilter]);

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
        <IconButton sx={{ color: '#7878FF' }} onClick={() => setFilterOpen(true)}>
          <Icon icon="mdi:filter-variant" width={24} height={24} />
        </IconButton>
        <Divider sx={{ borderStyle: 'dashed', borderColor: 'rgba(120, 120, 255, 0.5)', height: 2 }} />
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
                    if (col.key === 'type') content = <Chip label={row.type} color={row.type === 'واریز' ? 'success' : 'error'} variant="outlined" size="small" sx={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }} />;
                    return (
                      <TableCell key={col.key} align="center" sx={{ ...getRadiusStyle(col.key, 'right'), ...getRadiusStyle(col.key, 'left') }}>{content}</TableCell>
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
          <RadioGroup row value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ mb: sortKey === 'method' ? 2 : 1 }}>
            <FormControlLabel value="all" control={<Radio size="small" />} label="همه" />
            <FormControlLabel value="deposit" control={<Radio size="small" />} label="واریز" />
            <FormControlLabel value="withdraw" control={<Radio size="small" />} label="برداشت" />
          </RadioGroup>

          {sortKey === 'method' && (
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
