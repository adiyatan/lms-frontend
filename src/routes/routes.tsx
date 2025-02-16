import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import useAuth from "../hooks/useAuth";
import ModuleList from "../components/module/ModuleList";
import ModuleForm from "../components/module/ModuleForm";
import MainLayout from "../components/MainLayout";
import ParticipantList from "../components/participant/ParticipantList";
import GroupChatList from "../components/groupChat/GroupChatList";
import SpeakerList from "../components/speaker/SpeakerList";

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
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<ModuleList />} />
          <Route path="/modules/create" element={<ModuleForm />} />
          <Route path="/modules/:id/edit" element={<ModuleForm />} />
          <Route path="/peserta" element={<ParticipantList />} />
          <Route path="/group-chat" element={<GroupChatList />} />
          <Route path="/pemateri" element={<SpeakerList />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
