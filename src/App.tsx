import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Wallet from './pages/wallet/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
