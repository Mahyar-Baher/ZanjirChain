import { Outlet } from 'react-router-dom';

function EmptyLayout({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <Outlet context={{ darkMode, toggleDarkMode }} />
    </div>
  );
}

export default EmptyLayout;
