import './App.css';
import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from './layout/Footer';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
