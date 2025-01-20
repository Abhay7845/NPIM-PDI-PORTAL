import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import loadingGif from "../src/images/Loading_icon.gif";
import PrivateComponent from "./Components/PrivateComponent";
import UpperHeader from "./Components/UpperHeader";
import NPIMHome from "./Components/NPIMHome";
import GetProductsHome from "./Components/GetProductsHome";
import FeedbackL1AndL2 from "./pages/FeedbackL1AndL2";
import ReportL1AndL2 from "./pages/ReportL1AndL2";
import IndentL3 from "./pages/IndentL3";
import IndentL3Digital from "./pages/IndentL3Digital";
import ReportL3 from "./pages/ReportL3";
import WishListedItems from "./Components/WishListedItems";
import DayEndReportAdmin from "./pages/DayEndReportAdmin";
import SendStoreReportAdmin from "./pages/SendStoreReportAdmin";
import AdminHome from "./pages/AdminHome";
import PortalCloseReport from "./pages/PortalCloseReport";
import FeedbackL1AndL2ForPhysical from "./pages/FeedbackL1AndL2ForPhysical";
import AddedCartTable from "./Components/AddedCartTable";
import { ToastContainer } from 'react-toastify';
import { ProductCartL3 } from "./Components/ProductCartL3";
import { FeedBackFormL1L2 } from "./IndentExpress/ComponentsL1L2/FeedBackFormL1L2";
import RedirectionHomePage from "./IndentExpress/Common/RedirectionHomePage";
import PhysicalL1L2 from "./IndentExpress/ComponentsL1L2/PhysicalL1L2";
import ReportsL1L2 from "./IndentExpress/ComponentsL1L2/ReportsL1L2";
import StatusReportsL1L2 from "./IndentExpress/ComponentsL1L2/StatusReportsL1L2";
import DigitalL3 from "./IndentExpress/ComponentsL3/DigitalL3";
import CategoryTypeL3 from "./IndentExpress/ComponentsL3/CategoryTypeL3";
import StatusReportsL3 from "./IndentExpress/ComponentsL3/StatusReportsL3";
import CancelDataReport from "./IndentExpress/ComponentsL3/CancelDataReport";
import PhysicalL3 from "./IndentExpress/ComponentsL3/PhysicalL3";
import YourProductsCart from "./IndentExpress/ComponentsL3/YourProductsCart";
import IndentAdminHome from "./IndentExpress/Admin/IndentAdminHome";
import UpdatePortalStatus from "./IndentExpress/Admin/UpdatePortalStatus";
import MasterFileUplaod from "./IndentExpress/Admin/MasterFileUplaod";
import GetMasterSKU from "./IndentExpress/Admin/GetMasterSKU";
import LoginCredentials from "./IndentExpress/Admin/LoginCredentials";
import DayEndReport from "./IndentExpress/Admin/DayEndReport";
import UpdateAutomail from "./IndentExpress/Admin/UpdateAutomail";
import NewFeedbackL1AndL2 from "./pages/NewFeedbackL1AndL2";
import NewReportL1AndL2 from "./pages/NewReportL1AndL2";
import DayEndDayReportsAdminL1L2 from "./pages/DayEndDayReportsAdminL1L2";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense
        fallback={
          <div>
            <UpperHeader />
            <div className="text-center">
              <img src={loadingGif} alt="" />
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/NpimPortal" element={<NPIMHome />} />
          <Route element={<PrivateComponent />}>
            <Route
              path="/NpimPortal/get/products/home/:storeCode/:rsoName"
              element={<GetProductsHome />}
            />
            <Route
              path="/NpimPortal/added/cart/products/:storeCode/:rsoName"
              element={<AddedCartTable />}
            />
            <Route
              path="/NpimPortal/feedbackL1andL2/:storeCode/:rsoName"
              element={<FeedbackL1AndL2 />}
            />
            <Route
              path="/NpimPortal/new/feedbackL1andL2/:storeCode/:rsoName"
              element={<NewFeedbackL1AndL2 />}
            />
            <Route
              path="/NpimPortal/FeedbackL1AndL2ForPhysical/:storeCode/:rsoName"
              element={<FeedbackL1AndL2ForPhysical />}
            />
            <Route
              path="/NpimPortal/reportL1andL2/:storeCode/:rsoName"
              element={<ReportL1AndL2 />}
            />
            <Route
              path="/NpimPortal/new/reportL1andL2/:storeCode/:rsoName"
              element={<NewReportL1AndL2 />}
            />
            <Route
              path="/NpimPortal/indentL3Digital/:storeCode/:rsoName"
              element={<IndentL3Digital />}
            />
            <Route
              path="/NpimPortal/indentL3/:storeCode/:rsoName"
              element={<IndentL3 />}
            />
            <Route
              path="/NpimPortal/cart/product/L3/:storeCode/:rsoName"
              element={<ProductCartL3 />}
            />
            <Route
              path="/NpimPortal/reportL3/:storeCode/:rsoName"
              element={<ReportL3 />}
            />
            <Route
              path="/NpimPortal/wishlist/:storeCode/:rsoName"
              element={<WishListedItems />}
            />
            <Route
              path="/NpimPortal/dayEndReportForAdmin/:storeCode/:rsoName"
              element={<DayEndReportAdmin />}
            />
            <Route
              path="/NpimPortal/new/dayEndReportForAdmin/:storeCode/:rsoName"
              element={<DayEndDayReportsAdminL1L2 />}
            />
            <Route
              path="/NpimPortal/SendStoreReportAdmin/:storeCode/:rsoName"
              element={<SendStoreReportAdmin />}
            />
            <Route
              path="/NpimPortal/AdminHome/:storeCode/:rsoName"
              element={<AdminHome />}
            />
            <Route
              path="/NpimPortal/PortalCloseReport/:storeCode/:rsoName/:level"
              element={<PortalCloseReport />}
            />
            {/* INDENT EXPRESS COMPONENTS  */}
            <Route
              path='/NpimPortal/Indent-express/direction/home'
              element={<RedirectionHomePage />}
            />
            {/* L1L2 COMPONENTS */}
            <Route
              path='/NpimPortal/Indent-express/feedback/L1/L2'
              element={<FeedBackFormL1L2 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L1/L2/physical/home'
              element={<PhysicalL1L2 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L1/L2/products/reports'
              element={<ReportsL1L2 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L1/L2/status/reports'
              element={<StatusReportsL1L2 />}
            />
            {/* L3 COMPONENTS */}
            <Route
              path='/NpimPortal/Indent-express/L3/digital/home'
              element={<DigitalL3 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L3/digital/:categoryType'
              element={<CategoryTypeL3 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L3/status/reports'
              element={<StatusReportsL3 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L3/cancel/item/list'
              element={<CancelDataReport />}
            />
            <Route
              path='/NpimPortal/Indent-express/L3/physical/home'
              element={<PhysicalL3 />}
            />
            <Route
              path='/NpimPortal/Indent-express/L3/your/cart/reports'
              element={<YourProductsCart />}
            />
            {/* ADMIN COMPONENTS */}
            <Route
              path='/NpimPortal/Indent-express/admin/home'
              element={<IndentAdminHome />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/update/tortal/status'
              element={<UpdatePortalStatus />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/master/file/upload'
              element={<MasterFileUplaod />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/get/master/sku'
              element={<GetMasterSKU />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/login/credentials'
              element={<LoginCredentials />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/day/end/report'
              element={<DayEndReport />}
            />
            <Route
              path='/NpimPortal/Indent-express/admin/update/automail'
              element={<UpdateAutomail />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
