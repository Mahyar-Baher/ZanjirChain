import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Token = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios.post('https://amirrezaei2002x.shop/laravel/api/chektoken', { token })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
        } else {
          navigate('/login');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  return null;
};

export default Token;
