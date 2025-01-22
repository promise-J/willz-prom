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
  const {setAppLoading} = useModal()

  useEffect(()=>{
    setAppLoading(false)
  })

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
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* All static pages (homepage, about, contact and disclaimer routes here) */}
        <Route index element={<Dashboard />} />
        <Route path="airtime-top-up" element={<AirtimeTopup />} />
        <Route path="fund-wallet" element={<FundAccount />} />
        <Route path="data-top-up" element={<DataTopUp />} />
        <Route path="electricity-bill" element={<ElectricityBill />} />
        <Route path="tv-subscription" element={<TvSubcription />} />
        <Route path="food-paddi" element={<FoodPaddi />} />
        <Route path="health-paddi" element={<HealthPaddi />} />
        <Route path="studio-paddi" element={<StudioPaddi />} />
      </Route>
      {/* <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin-email" element={<LoginWithEmail />} />
        <Route path="signin-phone" element={<LoginWithPhone />} />
        <Route path="signup" element={<Register />} />
        <Route path="verify-account" element={<VerifyAccount />} />
        <Route path="success-verify-account" element={<SuccessVerifyAccount />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="confirm-reset-password" element={<ConfirmResetPassword />} />
      </Route>
      <Route path="/getting-started" element={<BusinessLayout />}>
        <Route index element={<GettingStarted />} />
        <Route path="subscription" element={<SelectSubscribtion />} />
        <Route path="payment/provider" element={<SelectPaymentProvider />} />
        <Route path="payment/method" element={<ChosePaymentMethod />} />
        <Route path="payment/card-details" element={<CardDetails />} />
        <Route path="payment/card-pin" element={<CardPin />} />
        <Route path="payment/success" element={<SuccessPayment />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomepage />} />
        <Route path="sales" element={<Sales />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="user-admin" element={<UserAdmin />} />
        <Route path="users-invite" element={<UsersInvite />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="designs" element={<Designs />} />
        <Route path="designs/template" element={<DesignTemplate />} />
        <Route path="my-products" element={<MyProducts />} />
        <Route path="my-services" element={<MyServices />} />
        <Route path="my-website" element={<MyWebsite />} />
        <Route path="my-customers" element={<MyCustomers />} />
        <Route path="Plugs" element={<Plugs />} />
        <Route path="Plugs/:searchvalues" element={<Plugs />} />
        <Route path="help-and-faqs" element={<HelpAndFAQs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<User />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="service/:id" element={<ServiceDetail />} />
        <Route path="ongoing" element={<OngoingService />} />
      </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
  );
}

export default App;
