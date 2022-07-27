import './App.css';
import UpdateNFT from './GetDetails';
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetDetails from './ListDetails';
import FetchDetails from './FetchDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UpdateNFT />} />
          <Route exact path="/list-details" element={<GetDetails />} />
          <Route exact path="/fetch-details" element={<FetchDetails />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
