import React, { useState } from "react";
import classes from "./LeftBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContexts";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/connect";
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu
} from "react-icons/hi";

const LeftBar = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login-signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleCollapse = () => setCollapsed((c) => !c);

  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineViewGrid size={20} />, path: "/admin" },
    { name: "Users", icon: <HiOutlineUsers size={20} />, path: "/admin/users" },
    { name: "Events", icon: <HiOutlineCalendar size={20} />, path: "/admin/events" },
    { name: "Members", icon: <HiOutlineUserGroup size={20} />, path: "/admin/members" },
    { name: "Settings", icon: <HiOutlineCog size={20} />, path: "/admin/settings" },
  ];

  return (
    <aside
      className={`${classes.sidebar} ${collapsed ? classes.collapsed : ""}`}
      aria-label="Admin sidebar"
    >
      <div className={classes.brand}>
        <div className={classes.logo}>
          <span className={classes.logoMark}>GDGC</span>
          <span className={classes.logoText}>Admin</span>
        </div>
        <button
          className={classes.toggle}
          onClick={toggleCollapse}
          aria-expanded={!collapsed}
          aria-label="Toggle sidebar"
        >
          <HiOutlineMenu size={20} />
        </button>
      </div>

      <nav role="navigation" aria-label="Admin menu" className={classes.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className={classes.navItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${classes.navlink} ${isActive ? classes.active : ""}`
                }
              >
                <span className={classes.icon} aria-hidden>
                  {item.icon}
                </span>
                <span className={classes.label}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={classes.footer}>
        {userLoggedIn ? (
          <button
            onClick={handleLogout}
            className={classes.logout}
            aria-label="Logout"
            title="Log out"
          >
            <HiOutlineLogout size={20} />
            <span className={classes.label}>Logout</span>
          </button>
        ) : (
          <NavLink to="/login-signup" className={classes.loginLink}>
            <span className={classes.label}>Sign in</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default LeftBar;
