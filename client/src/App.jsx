import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import PageLoader from "./components/loaders/PageLoader";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "./layout/DefaultLayout";
import NotFound from "./pages/others/NotFound";
import Homepage from "./pages/landing/Homepage";
import { useModal } from "./context/ModalContext";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import AirtimeTopup from "./pages/dashboard/AirtimeTopup";
import FundAccount from "./pages/dashboard/FundWallet";
import DataTopUp from "./pages/dashboard/DataTopUp";
import ElectricityBill from "./pages/dashboard/ElectricityBill";
import TvSubcription from "./pages/dashboard/TvSubscription";
import FoodPaddi from "./pages/dashboard/FoodPaddi";
import HealthPaddi from "./pages/dashboard/HealthPaddi";
import StudioPaddi from "./pages/dashboard/StudioPaddi";
import LocalDish from "./pages/dashboard/LocalDish";
import ClassicDish from "./pages/dashboard/ClassicDish";
import ConventionalDish from "./pages/dashboard/ConventionalDish";
import PaystackCallBack from "./pages/PaystackCallBack";
import HealthDetails from "./pages/dashboard/HealthDetails";
import Categories from "./pages/dashboard/admin/Categories";
import Profile from "./pages/dashboard/Profile";
import Registration from "./pages/auth/Registration";

// import Layout from "./layout/Layout";
// import Homepage from "./pages/Homepage";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import AdminLayout from "./admin/AdminLayout";
// import HomeDashboard from "./pages/admin/HomeDashboard";
// import Members from "./pages/admin/Members";
// import { useEffect, useState } from "react";
// import Mission from "./pages/Mission";
// import Vision from "./pages/Vision";
// import Gallery from "./pages/Gallery";
// import WatchLive from "./pages/WatchLive";
// import AdminLogin from "./pages/admin/AdminLogin";
// import Member from "./pages/admin/Member";
// import MediaHeaders from "./pages/admin/MediaHeaders";
// import ManageGallery from "./pages/admin/ManageGallery";
// import ManageUpcomingEvent from "./pages/admin/ManageUpcomingEvent";
// import ManageAudio from "./pages/admin/ManageAudio";
// import DaddyAudioPage from "./pages/DaddyAudioPage";
// import MummyAudioPage from "./pages/MummyAudioPage";
// import ScrollToTop from "./components/ScrollToTop";

function App() {
  // useEffect(()=>{
  //   setAppLoading(false)
  // },[])

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="min-h-screen ">
      <Toaster />
      {/* Include all modals here */}
      <PageLoader />
      {/* end all modals here */}
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* All static pages (homepage, about, contact and disclaimer routes here) */}
          <Route index element={<Homepage />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* All static pages (homepage, about, contact and disclaimer routes here) */}
          <Route index element={<Dashboard />} />
          <Route path="airtime-top-up" element={<AirtimeTopup />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="fund-wallet" element={<FundAccount />} /> */}
          <Route path="data-top-up" element={<DataTopUp />} />
          <Route path="electricity-bill" element={<ElectricityBill />} />
          <Route path="tv-subscription" element={<TvSubcription />} />
          <Route path="food-paddi" element={<FoodPaddi />} />
          <Route path="health-paddi" element={<HealthPaddi />} />
          <Route path="health-details" element={<HealthDetails />} />
          <Route path="studio-paddi" element={<StudioPaddi />} />
          <Route path="local-dish" element={<LocalDish />} />
          <Route path="classic-dish" element={<ClassicDish />} />
          <Route path="conventional-dish" element={<ConventionalDish />} />
          <Route path="categories">
          <Route index element={<Categories />} />
          </Route>
        </Route>
        <Route path="/paystack">
          <Route path="paystack-callback" element={<PaystackCallBack />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
