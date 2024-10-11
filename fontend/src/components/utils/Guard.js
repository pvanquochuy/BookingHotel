// src/components/utils/Guard.js
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin } from "./ApiFunctions"; // Điều chỉnh đường dẫn nếu cần

// ProtectedRoute để bảo vệ các route yêu cầu xác thực
export const ProtectedRoute = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

// AdminRoute để bảo vệ các route dành riêng cho admin
export const AdminRoute = () => {
  const location = useLocation();
  return isAdmin() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
