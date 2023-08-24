import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Webpages from "./Pages/Webpages/Webpages";
import Sidebar from "./Components/Siderbar/Sidebar";
import Header from "./Components/Header/Header";
import { useState } from "react";
import { Themecontext } from "./Components/ThemeContext/ThemeContext";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Themecontext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
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
    </Themecontext.Provider>
  );
}

export default App;
