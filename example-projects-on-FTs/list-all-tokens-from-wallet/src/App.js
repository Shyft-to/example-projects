import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ListAll from "./ListAll";
import Details from "./Details";


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route exact path="/" element={<ListAll />} />
              <Route exact path="/view-details" element={<Details />} />        
          </Routes>
      </Router>
    </div>
  );
}

export default App;
