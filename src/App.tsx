import { ToastContainer } from 'react-toastify';
import './assets/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Orders from './pages/orders';
import Import from './pages/import';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <BrowserRouter>

      <Header />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/importacao" element={<Import />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
