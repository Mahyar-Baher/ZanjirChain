import { useEffect } from 'react';
import axios from 'axios';

const Token = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('⛔️ توکن وجود ندارد، کاربر هنوز لاگین نکرده.');
      return;
    }

    axios.post('https://amirrezaei2002x.shop/laravel/api/chektoken', { token })
      .then((res) => {
        const { success, user, wallet } = res.data;

        if (success) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('wallet', JSON.stringify(wallet));
          localStorage.setItem('phone', user?.mobile_number || '');
          console.log('✅ اطلاعات کاربر و کیف پول ذخیره شد.');
        } else {
          console.warn('❌ توکن معتبر نیست یا منقضی شده.');
        }
      })
      .catch((err) => {
        console.error('🚨 خطا در بررسی توکن:', err);
      });
  }, []);

  return null;
};

export default Token;
