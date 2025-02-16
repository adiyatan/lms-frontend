import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import useAuth from "../hooks/useAuth";
import ModuleList from "../components/module/ModuleList";
import ModuleForm from "../components/module/ModuleForm";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/modules/create" element={<ModuleForm />} />
        <Route path="/modules/:id/edit" element={<ModuleForm />} />
        <Route path="/peserta" element={<div>Peserta Page</div>} />
        <Route path="/group-chat" element={<div>Group Chat Page</div>} />
        <Route path="/pemateri" element={<div>Pemateri Page</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
