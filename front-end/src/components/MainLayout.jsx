import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function MainLayout({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Outlet context={{ darkMode, toggleDarkMode }} />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
