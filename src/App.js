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
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Settings/Settings";
import Verification from "./Components/Verification/Verification";
import { DataProvider } from "./Components/DataContext/DataContext";
import Update from "./Components/Update/Update";
import CreateMember from "./Components/CreateMember/CreateMember";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DataProvider>
      <Themecontext.Provider value={{ theme, setTheme }}>
        <div className={`App ${theme}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verification" element={<Verification />} />
              <Route
                path="/dashboard1"
                element={<CRMWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/webpage1"
                element={<AboutWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/profile"
                element={<ProfileWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/settings"
                element={<SettingsWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/update/:id"
                element={<UpdateWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/create"
                element={<CreateWithLayout isOpen={isOpen} toggle={toggle} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </Themecontext.Provider>
    </DataProvider>
  );
}

const WithLayout = ({ children, isOpen, toggle }) => {
  return (
    <Sidebar isOpen={isOpen} setIsOpen={toggle}>
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
const ProfileWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Profile />
    </WithLayout>
  );
};
const SettingsWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Settings />
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
const UpdateWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Update />
    </WithLayout>
  );
};
const CreateWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <CreateMember />
    </WithLayout>
  );
};

export default App;
