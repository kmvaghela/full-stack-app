import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Contributor from "./pages/Contributor";
import NormalUser from "./pages/NormalUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/contributor" element={<Contributor />}></Route>
        <Route path="/normal-user" element={<NormalUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
