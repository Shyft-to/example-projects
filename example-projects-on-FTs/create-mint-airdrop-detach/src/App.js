// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateToken from "./CreateToken";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateToken />} />
          <Route exact path="/airdrop" element={<CreateToken />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
