import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Siderbar/Sidebar";
import Header from "./Components/Header/Header";
import { useState } from "react";
import { Themecontext } from "./Components/ThemeContext/ThemeContext";
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
import Orders from "./Components/Orders/Orders";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import AddProduct from "./Components/AddProduct/AddProduct";
import AddCategory from "./Components/AddCategory/AddCategory";
import AddBrand from "./Components/AddBrand/AddBrand";
import ViewUser from "./Components/ViewUser/ViewUser";
import ViewOrder from "./Components/ViewOrder/ViewOrder";
import ViewCategory from "./Components/ViewCategory/ViewCategory";
import ViewBrand from "./Components/ViewBrand/ViewBrand";
import ViewProduct from "./Components/ViewProduct/ViewProduct";
import Notification from "./Components/Notifications/Notification";
import Coupon from "./Components/Coupon/Coupon";
import AddCoupon from "./Components/AddCoupon/AddCoupon";
import ViewCoupon from "./Components/ViewCoupon/ViewCoupon";
import AddNotification from "./Components/AddNotification/AddNotification";
import Global from "./Components/Global/Global";
import Website from "./Components/Website/Website";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DataProvider>
      <Themecontext.Provider value={{ theme, setTheme }}>
        <div className={`App ${theme}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verification" element={<Verification />} />
              <Route
                path="/dashboard"
                element={
                  <DashboardWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/users"
                element={<AboutWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/orders"
                element={<OrdersWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/vieworder/:id"
                element={
                  <ViewOrderWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/categories"
                element={<CategoryWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/viewcategory/:id"
                element={
                  <ViewCategoryWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/editcategory/:id"
                element={
                  <ViewCategoryWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/brands"
                element={<BrandsWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/viewbrand/:id"
                element={
                  <ViewBrandsWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/editbrand/:id"
                element={
                  <ViewBrandsWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/products"
                element={<ProductsWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/viewproduct/:id"
                element={
                  <ViewProductsWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/editproduct/:id"
                element={
                  <ViewProductsWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/addproduct"
                element={
                  <AddProductWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/addcategory"
                element={
                  <AddCategoryWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/addbrand"
                element={<AddBrandWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/addcoupon"
                element={
                  <AddCouponWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/viewcoupon/:id"
                element={
                  <ViewCouponWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/editcoupon/:id"
                element={
                  <ViewCouponWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/notifications"
                element={
                  <NotificationWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/addnotification"
                element={
                  <AddNotificationWithLayout isOpen={isOpen} toggle={toggle} />
                }
              />
              <Route
                path="/coupons"
                element={<CouponWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/viewuser/:id"
                element={<ViewUserWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/edituser/:id"
                element={<ViewUserWithLayout isOpen={isOpen} toggle={toggle} />}
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
              <Route
                path="/globalsetting"
                element={<GlobalWithLayout isOpen={isOpen} toggle={toggle} />}
              />
              <Route
                path="/websitesetting"
                element={<WebsiteWithLayout isOpen={isOpen} toggle={toggle} />}
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

const DashboardWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Dashboard />
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
const OrdersWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Orders />
    </WithLayout>
  );
};
const ViewOrderWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewOrder />
    </WithLayout>
  );
};
const CategoryWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Category />
    </WithLayout>
  );
};
const ViewCategoryWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewCategory />
    </WithLayout>
  );
};
const BrandsWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Brands />
    </WithLayout>
  );
};
const ViewBrandsWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewBrand />
    </WithLayout>
  );
};
const ProductsWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Products />
    </WithLayout>
  );
};
const ViewProductsWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewProduct />
    </WithLayout>
  );
};
const ViewUserWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewUser />
    </WithLayout>
  );
};
const AddProductWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <AddProduct />
    </WithLayout>
  );
};
const AddCategoryWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <AddCategory />
    </WithLayout>
  );
};
const AddBrandWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <AddBrand />
    </WithLayout>
  );
};
const AddCouponWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <AddCoupon />
    </WithLayout>
  );
};
const AddNotificationWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <AddNotification />
    </WithLayout>
  );
};
const ViewCouponWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <ViewCoupon />
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
const NotificationWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Notification />
    </WithLayout>
  );
};
const CouponWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Coupon />
    </WithLayout>
  );
};
const GlobalWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Global />
    </WithLayout>
  );
};
const WebsiteWithLayout = ({ isOpen, toggle }) => {
  return (
    <WithLayout isOpen={isOpen} toggle={toggle}>
      <Website />
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
