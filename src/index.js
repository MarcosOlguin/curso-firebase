import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashBoardView";
import DashboardProfileView from "./routes/DashboardProfileView";
import SignOutView from "./routes/SignOutView";
import PublicProfileView from "./routes/PublicProfileView";
import ChooseUsernameView from "./routes/ChooseUsernameView";
import EditProfileView from "./routes/EditProfileView";
import DashboardWrapper from "./components/DashboadWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
      rel="stylesheet"
    ></link>
    <BrowserRouter>
      <DashboardWrapper>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/dashboard/profile" element={<EditProfileView />} />
          <Route path="/signout" element={<SignOutView />} />
          <Route path="u/:username" element={<PublicProfileView />} />
          <Route path="choose-username" element={<ChooseUsernameView />} />
        </Routes>
      </DashboardWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
