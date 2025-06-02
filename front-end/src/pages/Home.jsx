import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useOutletContext();

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
}
export default Home;
