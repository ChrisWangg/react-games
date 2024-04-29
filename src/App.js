import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/AppBar';
import { AdsClickSharp } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Slido from './pages/Slido';
import Tetro from './pages/Tetro';
import Blanko from './pages/Blanko';

function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ paddingTop: '85px' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path ='/blanko' element ={<Blanko />} />
            <Route path ='/slido' element ={<Slido />} />
            <Route path ='/tetro' element ={<Tetro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
