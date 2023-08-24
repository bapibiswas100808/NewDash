import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Webpages from "./Pages/Webpages/Webpages";
import Sidebar from "./Components/Siderbar/Sidebar";
import Header from "./Components/Header/Header";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar isOpen={isOpen}>
          <Header onClick={toggle} isOpen={isOpen} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/webpages" element={<Webpages />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
