import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checker from './Checker';
import ServiceComponent from './ServiceComponent';
import Membership from './Membership';
import { useState } from 'react';
import { WalletContext } from './WalletContext';
import NavBarComponent from './NavbarComponent';

function App() {
  
  const [walletId, setWalletId] = useState(null);
  
  return (
    <div className="App">
      <WalletContext.Provider value={{walletId, setWalletId}}>
        <Router>
          <NavBarComponent />
          <Routes>
            <Route exact path="/login" element={<Checker />} />
            <Route exact path="/" element={<ServiceComponent />} />
            <Route exact path="/membership" element={<Membership />} />
          </Routes>
        </Router>
      </WalletContext.Provider>
    </div>
  );
}

export default App;
