import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,  // K1n8F9gT7xZpQ3rJ
  wsHost: import.meta.env.VITE_REVERB_HOST,  // pump-ex.com
  wsPort: import.meta.env.VITE_REVERB_PORT,  // 443
  wssPort: import.meta.env.VITE_REVERB_PORT,  // 443
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
  disableStats: true,
  // 👇 این رو اضافه کن برای path /reverb
  wsPath: '/reverb',  // URL به wss://host/reverb/app/... می‌شه
});

export default window.Echo;