import React, { useEffect, useState, useMemo } from 'react';
import {
  Paper, Stack, Tabs, Tab, Grid, Typography,
  Box, CircularProgress, Divider
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale,
  PointElement, Tooltip, Legend
} from 'chart.js';
import { useLocation } from 'react-router-dom';   // ⬅️ درست همین‌جا

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const timeOptions = [
  { fa: '۲۴ ساعت', days: 1 },
  { fa: '۱ روز',   days: 2 },
  { fa: '۱ هفته',  days: 7 },
  { fa: '۱ ماه',   days: 30 },
];
const TOMAN_RATE = 82790;

const TetherChartDash = () => {
  const location     = useLocation();                            // ✅ داخل کامپوننت
  const isTradePage  = location.pathname.toLowerCase().includes('/trade');

  const [tab, setTab]       = useState(timeOptions[0].fa);
  const [loading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);

  const stats = useMemo(() => {
    if (!dataPoints.length) return { high: 0, low: 0, latest: 0 };
    const usd = dataPoints.map((p) => p.usd);
    return {
      high:   Math.max(...usd) * TOMAN_RATE,
      low:    Math.min(...usd) * TOMAN_RATE,
      latest: usd[usd.length - 1] * TOMAN_RATE,
    };
  }, [dataPoints]);

  useEffect(() => {
    const days = timeOptions.find((t) => t.fa === tab)?.days;
    if (!days) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=${days}`);
        const json = await res.json();
        const formatted = json.prices.map((p) => ({
          time: new Date(p[0]).toLocaleDateString('fa-IR'),
          usd : p[1],
        }));
        setDataPoints(formatted);
      } catch (e) {
        console.error(e);
        setDataPoints([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tab]);
  const chartData = useMemo(() => ({
    labels: dataPoints.map((p) => p.time),
    datasets: [{
      data: dataPoints.map((p) => p.usd * TOMAN_RATE),
      borderColor: '#7878FF',
      tension: 0.3,
      pointRadius: 0,
    }],
  }), [dataPoints]);

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          variant="scrollable"
          scrollButtons="auto"
          sx={{ p: 0 }}
        >
          {timeOptions.map((t) => (
            <Tab key={t.fa} label={t.fa} value={t.fa} />
          ))}
        </Tabs>
        <Grid container spacing={2} justifyContent="space-between">
          {['high', 'low'].map((k) => (
            <Box
              key={k}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 1,
                width: '100%',
              }}
            >
              <Typography noWrap color="#7878FF">
                {k === 'high' ? 'بالاترین:' : 'پایین‌ترین:'}
              </Typography>
              <Divider sx={{ borderStyle: 'dashed', borderColor: '#7878FF', height: 2 }} />
              <Typography noWrap color="#7878FF">
                {stats[k].toLocaleString()} تومان
              </Typography>
            </Box>
          ))}
        </Grid>
        <Box sx={{ height: 220, position: 'relative' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${ctx.parsed.y.toLocaleString()} تومان`,
                    },
                  },
                },
                scales: {
                  y: { ticks: { callback: (v) => v.toLocaleString() } },
                  x: { display: false },
                },
              }}
            />
          )}
        </Box>

        {!isTradePage && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography noWrap color="#7878FF">نرخ لحظه‌ای: </Typography>
            <Divider sx={{ borderStyle: 'dashed', borderColor: '#7878FF', height: 2 }} />
            <Typography noWrap color="#7878FF">
              {stats.latest.toLocaleString()} تومان
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default TetherChartDash;
