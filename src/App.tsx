import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { DashBoard } from './pages/DashBoard';

function App() {
  return (
    <>
    <Toaster/>
      
        <Routes>
        
          <Route path="/" element={ <Login  /> } />
          <Route path="/register" element={ <Register />} />
          <Route path="/dashboard" element={ <DashBoard />} />
        </Routes>
      
    </>
  );
}

export default App;
