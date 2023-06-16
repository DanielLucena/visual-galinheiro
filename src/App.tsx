import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/home/Home";
import DashBoard from "./pages/dashboard/DashBoard";
import Monitoring from "./pages/monitoring/Monitoring";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="monitoring" element={<Monitoring />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
