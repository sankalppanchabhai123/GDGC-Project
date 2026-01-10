import React, { useEffect, useState } from "react";
import classes from "./LeftBar.module.css";
import { useAuth } from "../../../contexts/authContexts";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/connect";
import { getActiveUserData } from "../../../getData/getActiveUserData";
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu
} from "react-icons/hi";

const LeftBar = ({ activeTab, onTabChange }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activeUserData, setActiveUserData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchActiveUser = async () => {
      if (!currentUser?.uid) return;
      const data = await getActiveUserData(currentUser.uid);
      if (mounted) setActiveUserData(data);
    };

    fetchActiveUser();

    return () => {
      mounted = false;
    };
  }, [currentUser?.uid]);

 
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleCollapse = () => setCollapsed((c) => !c);

  const menuItems = [
    { key: "dashboard", name: "Dashboard", icon: <HiOutlineViewGrid size={20} /> },
    { key: "users", name: "Users", icon: <HiOutlineUsers size={20} /> },
    { key: "events", name: "Events", icon: <HiOutlineCalendar size={20} /> },
    { key: "members", name: "Members", icon: <HiOutlineUserGroup size={20} /> },
    { key: "settings", name: "Settings", icon: <HiOutlineCog size={20} /> },
  ];

  return (
    <aside
      className={`${classes.sidebar} ${collapsed ? classes.collapsed : ""}`}
      aria-label="Admin sidebar"
    >
      <div className={classes.brand}>
        <div className={classes.logo}>
          <span className={classes.logoMark}>{activeUserData.role}</span>
          <span className={classes.logoText}>{activeUserData.name}</span>
        </div>
        <button
          className={classes.toggle}
          onClick={toggleCollapse}
          aria-expanded={!collapsed}
        >
          <HiOutlineMenu size={20} />
        </button>
      </div>

      <nav className={classes.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.key} className={classes.navItem}>
              <button
                type="button"
                onClick={() => onTabChange(item.key)}
                className={`${classes.navlink} ${
                  activeTab === item.key ? classes.active : ""
                }`}
              >
                <span className={classes.icon}>{item.icon}</span>
                <span className={classes.label}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={classes.footer}>
        {userLoggedIn && (
          <button onClick={handleLogout} className={classes.logout}>
            <HiOutlineLogout size={20} />
            <span className={classes.label}>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default LeftBar;
