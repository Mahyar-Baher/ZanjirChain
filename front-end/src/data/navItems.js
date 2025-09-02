const navItems = [
  { label: 'صفحه اصلی', icon: 'mdi:compass', path: '/mainpage' },
  { label: 'پیشخوان', icon: 'mdi:home', path: '/dashboard' },
  {
    label: 'کیف پول', icon: 'mdi:wallet', path: '/wallet',
    children: [
      { label: 'دارایی کل', icon: 'fa6-solid:coins', path: '/wallet' },
      { label: 'واریز وجه', icon: 'fa6-solid:download', path: '/income' },
      { label: 'برداشت وجه', icon: 'fa6-solid:upload', path: '/outcome' },
    ]
  },
  { label: 'معامله آسان تتر', icon: 'mdi:currency-usd', path: '/trade' },
  {
    label: 'تاریخچه', icon: 'mdi:history', path: '/history',
    children: [
      { label: 'تاریخچه واریز و برداشت', icon: 'mdi:history', path: '/history' },
      { label: 'تاریخچه معاملات تتر', icon: 'mdi:history', path: '/history_tether' },
      { label: 'تاریخچه معاملات تومان', icon: 'mdi:history', path: '/history_toman' }
    ]
  },
  {
    label: 'مدیریت حساب', icon: 'mdi:account', path: '/user',
    children: [
      { label: 'مشخصات کاربری', icon: 'mdi:account-circle', path: '/user' },
      { label: 'حساب های بانکی', icon: 'mdi:credit-card', path: '/credits' },
      { label: 'هشدار قیمت', icon: 'mdi:bell-alert-outline', path: '/alertPrice' },
      { label: 'مدیریت پیام ها', icon: 'mdi:email-outline', path: '/manageMessage' },
      { label: 'مدیریت آدرس ها', icon: 'mdi:map-marker-outline', path: '/manageAddresses' },
      { label: 'تنظیمات', icon: 'mdi:cog-outline', path: '/settings' },
      { label: 'امنیت', icon: 'mdi:shield-outline', path: '/security' }
    ]
  },
  { label: 'خروج از حساب', icon: 'mdi:logout', path: '/logout' },
];

export default navItems;
