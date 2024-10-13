import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Giả sử các phương thức này là đồng bộ
    setIsAuthenticated(ApiService.isAuthenticated());
    setIsAdmin(ApiService.isAdmin());
    setIsUser(ApiService.isUser());

    // Bạn cũng có thể thêm listener nếu ApiService hỗ trợ
    // Ví dụ: ApiService.onAuthChange(setIsAuthenticated, setIsAdmin, setIsUser);
  }, []);

  const handleLogout = async () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      try {
        await ApiService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsUser(false);
        navigate("/home");
      } catch (error) {
        console.error("Logout failed:", error);
        // Thêm thông báo lỗi nếu cần
      }
    }
  };
  // Hàm để xác định lớp CSS dựa trên trạng thái kích hoạt
  const getActiveClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/home" className="brand-link">
          Phegon Hotel
        </NavLink>
      </div>
      <ul className="navbar-ul">
        <li>
          <NavLink to="/home" className={getActiveClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className={getActiveClass}>
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/find-booking" className={getActiveClass}>
            Find my Booking
          </NavLink>
        </li>

        {isUser && (
          <li>
            <NavLink to="/profile" className={getActiveClass}>
              Profile
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink to="/admin" className={getActiveClass}>
              Admin
            </NavLink>
          </li>
        )}

        {!isAuthenticated && (
          <>
            <li>
              <NavLink to="/login" className={getActiveClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={getActiveClass}>
                Register
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li className="logout-button" onClick={handleLogout}>
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
