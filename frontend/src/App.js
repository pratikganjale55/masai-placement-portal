import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import "./App.css";
import Signup from "./Pages/Signup/index";
import Step from "./Components/Step/index.jsx";
import Login from "./Pages/Login/index";
import ForgotPassword from "./Pages/ForgotPassword/index";
import ResetPassword from "./Pages/ResetPassword/index";
import Dashboard from "./Pages/Table/Dasboard";
import Compnies from "./Pages/Table/Compinies";
import ConfirmAccount from "./Pages/ConfirmAccount/index";
import ConfirmSuccess from "./Pages/ConfirmSuccess/index";
import CompanyDetail from "./Pages/CompanyDetail";
import ForgotPasswordMailSent from "./Pages/ForgotPasswordMailSent/index";
import ResetPasswordSuccess from "./Pages/ResetPasswordSuccess/index";
import ChangePassword from "./Pages/ChangePassword/index";
import WelcomePage from "./Pages/WelcomePage/index";
import CompanyPage from "./Pages/Create_Position_Form/Form-pages/CompanyPage/index";
import PositionPage from "./Pages/Create_Position_Form/Form-pages/PositionPage";
import EligibilityPage from "./Pages/Create_Position_Form/Form-pages/EligibilityPage";
import PositionDetail from "./Pages/PositionDetail";
import EditCompany from "./Pages/EditCompany";
import EditPosition from "./Pages/EditPosition";
import ProtectedRoutes from "./ProtectedRoutes";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmAccount" element={<ConfirmAccount />} />
        <Route path="/confirmSuccess/:id" element={<ConfirmSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/forgotPasswordMailSent"
          element={<ForgotPasswordMailSent />}
        />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />

        <Route
          path="/resetPasswordSuccess"
          element={<ResetPasswordSuccess />}
        />
        <Route
          path="/positions"
          element={<ProtectedRoutes Component={Dashboard} />}
        />

        <Route
          path="/createPosition"
          element={<ProtectedRoutes Component={Step} />}
        >
          <Route index element={<CompanyPage />} />
          <Route path="detail/:id" element={<PositionPage />} />
          <Route path="eligibility/:id" element={<EligibilityPage />} />
        </Route>

        <Route
          path="/changePassword"
          element={<ProtectedRoutes Component={ChangePassword} />}
        />
        <Route
          path="/resetPasswordSuccess"
          element={<ResetPasswordSuccess />}
        />

        <Route
          path="/companies"
          element={<ProtectedRoutes Component={Compnies} />}
        />
        <Route
          path="/companies/:id"
          element={<ProtectedRoutes Component={CompanyDetail} />}
        />
        <Route
          path="/position/:id"
          element={<ProtectedRoutes Component={PositionDetail} />}
        />
        <Route
          path="/editCompany/:id"
          element={<ProtectedRoutes Component={EditCompany} />}
        />
        <Route
          path="/editPosition/:id"
          element={<ProtectedRoutes Component={EditPosition} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Sentry.withProfiler(App);
