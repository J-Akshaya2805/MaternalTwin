import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import DigitalTwin from "./pages/DigitalTwin";
import Prediction from "./pages/Prediction";
import History from "./pages/History";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-layout">
        <Header />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;