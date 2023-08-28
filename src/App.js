import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Siderbar/Sidebar";
import Header from "./Components/Header/Header";
import { useState } from "react";
import { Themecontext } from "./Components/ThemeContext/ThemeContext";
import CRM from "./Pages/SubPages/CRM/CRM";
import SignUp from "./Components/SignUp/SignUp";
import About from "./Pages/About/About";
import "swiper/css";
import SignIn from "./Components/SignIn/SignIn";
import Footer from "./Components/Footer/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Themecontext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<WithLayout isOpen={isOpen} toggle={toggle} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard1"
              element={<CRMWithLayout isOpen={isOpen} toggle={toggle} />}
            />
            <Route
              path="/webpage1"
              element={<AboutWithLayout isOpen={isOpen} toggle={toggle} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Themecontext.Provider>
  );
}

const WithLayout = ({ children, isOpen, toggle }) => {
  return (
    <Sidebar isOpen={isOpen}>
      <Header onClick={toggle} isOpen={isOpen} />
      {children}
      <Footer onClick={toggle} isOpen={isOpen} />
    </Sidebar>
  );
};

const CRMWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <CRM />
    </WithLayout>
  );
};

const AboutWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <About />
    </WithLayout>
  );
};

export default App;
