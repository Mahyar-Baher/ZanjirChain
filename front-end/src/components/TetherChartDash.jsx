import React, { useEffect, useState, useMemo } from 'react';
import { Paper, Stack, Tabs, Tab, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const timeOptions = [
  { fa: '۲۴ ساعت', days: 1 },
  { fa: '۱ روز', days: 2 },
  { fa: '۱ هفته', days: 7 },
  { fa: '۱ ماه', days: 30 },
];

const TOMAN_RATE = 82790;

const TetherChartDash = () => {
  const [tab, setTab] = useState(timeOptions[0].fa);
  const [loading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);

  const stats = useMemo(() => {
    if (!dataPoints.length) return { high: 0, low: 0, latest: 0 };
    const usdValues = dataPoints.map((p) => p.usd);
    const high = Math.max(...usdValues) * TOMAN_RATE;
    const low = Math.min(...usdValues) * TOMAN_RATE;
    const latest = usdValues[usdValues.length - 1] * TOMAN_RATE;
    return { high, low, latest };
  }, [dataPoints]);

  useEffect(() => {
    const current = timeOptions.find((t) => t.fa === tab);
    if (!current) return;
    const fetchChart = async () => {
      try {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=${current.days}`;
        const res = await fetch(url);
        const json = await res.json();
        const formatted = json.prices.map((p) => ({ time: new Date(p[0]).toLocaleDateString('fa-IR'), usd: p[1] }));
        setDataPoints(formatted);
      } catch (err) {
        console.error('fetch chart error', err);
        setDataPoints([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChart();
  }, [tab]);
  const chartData = useMemo(() => ({
    labels: dataPoints.map((p) => p.time),
    datasets: [
      {
        data: dataPoints.map((p) => p.usd * TOMAN_RATE),
        borderColor: '#7878FF',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  }), [dataPoints]);

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered variant="scrollable" scrollButtons="auto" >
          {timeOptions.map((t) => (
            <Tab key={t.fa} label={t.fa} value={t.fa} />
          ))}
        </Tabs>

        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={6}><Typography>بالاترین: {stats.high.toLocaleString()}</Typography></Grid>
          <Grid item xs={6}><Typography align="right">پایین‌ترین: {stats.low.toLocaleString()}</Typography></Grid>
        </Grid>

        <Box sx={{ height: 300, position: 'relative' }}>
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
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y.toLocaleString()} تومان` } } },
                scales: {
                  y: { ticks: { callback: (v) => v.toLocaleString() } },
                  x: { display: false },
                },
              }}
            />
          )}
        </Box>

        <Typography textAlign="center" fontWeight="bold">نرخ لحظه‌ای: {stats.latest.toLocaleString()} تومان</Typography>
      </Stack>
    </Paper>
  );
};

export default TetherChartDash;
