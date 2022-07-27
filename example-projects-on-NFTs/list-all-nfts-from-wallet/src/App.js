
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAll from "./ListAll";
// import './App.css';
import GetDetails from "./GetDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListAll />} />
          <Route exact path="/get-details" element={<GetDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
