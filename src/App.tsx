import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import DashBoard from "./pages/dashboard/DashBoard";
import Monitoring from "./pages/monitoring/Monitoring";
import { Analytics } from "@vercel/analytics/react";

import DataTable from "./pages/Registros/Registros";

import Tabela from "./pages/tabela/Tabela";
import ModalSideBar from "./components/SideBar/ModalSideBar";

function App() {
  return (
    <>
      <div className="App">
        <ModalSideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="tabela" element={<Tabela />} />
          <Route path="data-table" element={<DataTable />} />
        </Routes>
      </div>
      <Analytics />
    </>
  );
}

export default App;
