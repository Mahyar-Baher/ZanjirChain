import { Button, Stack } from "@mui/material";

const WithdrawalTabs = ({ tab, setTab, setMethod }) => {
  const tabs = [
    { key: 'toman', label: 'برداشت تومان' },
    { key: 'crypto', label: 'برداشت رمزارز' },
  ];

  if (!tabs || tabs.length === 0) return null;

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        border: '1px solid #1a652a',
        borderRadius: 1,
        p: 0.4,
      }}
    >
      {tabs.map(({ key, label }) => (
        <Button
          key={key}
          fullWidth
          variant={tab === key ? 'contained' : 'text'}
          onClick={() => {
            setTab(key);
            setMethod(0);
          }}
          sx={{
            fontSize: 12,
            color: tab === key ? '#fff' : '#1a652a',
            backgroundColor: tab === key ? '#1a652a' : 'transparent',
          }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};
export default WithdrawalTabs;