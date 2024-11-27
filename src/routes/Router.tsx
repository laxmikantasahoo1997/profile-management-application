import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Form } from "../components/Form";
import { ProfileComponent } from "../components/ProfileComponent";
import { NotFound } from "../components/NotFound";
import { Home } from "../components/Home";
import { Header } from "../components/Header";

export const AppRouter: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile-form" element={<Form />} />
      <Route path="/profile" element={<ProfileComponent />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  </Router>
);
