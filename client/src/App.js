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
import {  useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? user.user_type === "Contributor" ? <Navigate to="/contributor" /> : <Navigate to="/normal-user" /> : <Home />}></Route>
        <Route path="/contributor" element={<Contributor />}></Route>
        <Route path="/normal-user" element={<NormalUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
