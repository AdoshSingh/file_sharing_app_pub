import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DownloadPage from "./components/downloadPage";
import UploadPage from "./components/uploadPage";
import HomePage from "./components/homePage";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import DownloadLink from "./components/dowloadLink";

export default function App() {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup-page" element={<SignUp />} />
          <Route path="/login-page" element={<LogIn />} />
          <Route path="/upload-page" element={<UploadPage />} />
          <Route path="/download-link-page" element={<DownloadLink />} />
          <Route path="/download-page/:e" element={<DownloadPage />} />
        </Routes>
      </Router>
    </div>
  )
}
