import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({ accountData, updateAccount }) {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
