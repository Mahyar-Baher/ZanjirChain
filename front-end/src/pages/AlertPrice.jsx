import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  Card,
  Box,
  Stack,
  IconButton,
  MenuItem,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Delete, ArrowDownward, ArrowUpward, HorizontalRule } from '@mui/icons-material';
import SidebarChildrenMenu from '../components/SidebarChildrenMenu';
import Navbarbox from '../components/navbarbox';
import navItems from '../data/navItems';
import TetherChartDash from '../components/TetherChartDash';
import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: 16,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[2],
}));

// Fix Alert wrapper for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertPrice = () => {
  const AlertPriceMenu = navItems.find(item => item.label === 'مدیریت حساب');

  const [alerts, setAlerts] = useState([]);
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('above');
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddAlert = () => {
    const number = parseFloat(price);
    if (isNaN(number) || number <= 0) {
      setSnackbarMessage('لطفاً یک عدد معتبر وارد کنید.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const exists = alerts.some(alert => alert.price === number && alert.condition === condition);
    if (exists) {
      setSnackbarMessage('این هشدار قبلاً ثبت شده است.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setAlerts(prev => [
      ...prev,
      {
        price: number,
        condition,
        createdAt: new Date().toLocaleString('fa-IR'),
      },
    ]);
    setPrice('');
    setCondition('above');
    setOpen(false);

    setSnackbarMessage('هشدار با موفقیت اضافه شد.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleDelete = (index) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };
  const {
    accessibilityMode,
  } = useContext(ThemeContext);

  return (
    <Paper sx={{ minHeight: '100vh',  bgcolor: (theme) => theme.palette.background.default, filter: accessibilityMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}>
      <Grid container spacing={0} sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <Grid item size="auto">
          <Navbarbox />
        </Grid>
        <Grid item size="grow" sx={{ p: 2, pt: 4 }}>
          <Grid container spacing={1}>
            <Grid item size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 2 }} sx={{ pr: { lg: 2 } }}>
              <SidebarChildrenMenu childrenItems={AlertPriceMenu?.children || []} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, md: 8, lg: 9, xl: 10 }}>
              <Grid container spacing={2} direction="column" sx={{ pt: 3 }}>
                <Grid item>
                  <Item sx={{ px: 5, backgroundColor: 'rgba(0, 0, 0, 0.02)' }} className="bg-img-hexed">
                    <Typography variant="h6" fontWeight="800">
                      با استفاده از هشدار قیمت، در بهترین زمان خرید یا فروش انجام دهید.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      هر زمان که قیمت تتر از حد مشخص‌شده شما عبور کند، ما شما را مطلع خواهیم کرد.
                    </Typography>
                  </Item>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <Item className="bg-img-hexed">
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          افزودن هشدار جدید
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
                          + افزودن هشدار قیمت
                        </Button>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom mt={2}>
                          هشدارهای فعال
                        </Typography>
                        <Stack spacing={2}>
                          {alerts.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                              هیچ هشداری ثبت نشده است.
                            </Typography>
                          ) : (
                            alerts.map((alert, i) => (
                              <Card
                                key={i}
                                sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                              >
                                <Box>
                                  <Typography fontWeight="bold">
                                    {{
                                      above: <ArrowUpward fontSize="small" color="success" />,
                                      below: <ArrowDownward fontSize="small" color="error" />,
                                      equal: <HorizontalRule fontSize="small" color="warning" />,
                                    }[alert.condition]}{' '}
                                    قیمت{' '}
                                    {{
                                      above: 'بالاتر',
                                      below: 'پایین‌تر',
                                      equal: 'دقیقاً برابر با',
                                    }[alert.condition]}{' '}
                                    {alert.price.toLocaleString()} تومان
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ایجاد شده در: {alert.createdAt}
                                  </Typography>
                                </Box>
                                <IconButton color="error" onClick={() => handleDelete(i)}>
                                  <Delete />
                                </IconButton>
                              </Card>
                            ))
                          )}
                        </Stack>
                      </Item>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 6 }}>
                      <TetherChartDash />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{color: 'text.primary'}}>
            افزودن هشدار جدید
          </Typography>
          <TextField
            label="قیمت مدنظر (تومان)"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="شرط هشدار"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="above">بالاتر از قیمت</MenuItem>
            <MenuItem value="equal">دقیقاً برابر با قیمت</MenuItem>
            <MenuItem value="below">پایین‌تر از قیمت</MenuItem>
          </TextField>
          <Button variant="contained" fullWidth onClick={handleAddAlert}>
            ثبت هشدار
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AlertPrice;
