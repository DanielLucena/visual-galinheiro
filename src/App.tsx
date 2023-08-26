import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import DashBoard from "./pages/dashboard/DashBoard";
import Monitoring from "./pages/monitoring/Monitoring";
import { Analytics } from "@vercel/analytics/react";

import DataTable from "./pages/Registros/Registros";

import Tabela from "./pages/tabela/Tabela";
import Login from "./pages/Login/Login";
import { Layout } from "./components/Layout/Layout";
import { RegistrosProvider } from "./context/registrosContext";
import Debug from "./pages/Debug/Debug";

function App() {
  return (
    <>
      <div className="App">
        <RegistrosProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="tabela" element={<Tabela />} />
              <Route path="data-table" element={<DataTable />} />
              <Route path="login" element={<Login />} />
              <Route path="debug" element={<Debug />} />
            </Routes>
          </Layout>
        </RegistrosProvider>
      </div>
      <Analytics />
    </>
  );
}

export default App;
