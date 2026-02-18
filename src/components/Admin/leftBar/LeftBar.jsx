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
  HiOutlineMenu,
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
    {
      key: "dashboard",
      name: "Dashboard",
      icon: <HiOutlineViewGrid size={20} />,
      roles: ["president", "lead", "coordinator"],
    },
    {
      key: "users",
      name: "Users",
      icon: <HiOutlineUsers size={20} />,
      roles: ["president"],
    },
    {
      key: "events",
      name: "Events",
      icon: <HiOutlineCalendar size={20} />,
      roles: ["president", "lead"],
    },
    {
      key: "members",
      name: "Members",
      icon: <HiOutlineUserGroup size={20} />,
      roles: ["president", "lead"],
    },
    {
      key: "projects",
      name: "Projects",
      icon: <HiOutlineUserGroup size={20} />,
      roles: ["president", "lead", "coordinator"],
    },
    {
      key: "settings",
      name: "Settings",
      icon: <HiOutlineCog size={20} />,
      roles: ["president"],
    },
  ];

  // Default avatar if no profile pic
  const getProfilePic = () => {
    if (activeUserData?.profilePic) {
      return activeUserData.profilePic;
    }
    // Generate initials avatar or use default
    const initials = activeUserData?.name
      ? activeUserData.name.charAt(0).toUpperCase()
      : "?";
    return `https://ui-avatars.com/api/?name=${initials}&background=6366f1&color=fff&size=112&bold=true`;
  };

  return (
    <aside
      className={`${classes.sidebar} ${collapsed ? classes.collapsed : ""}`}
      aria-label="Admin sidebar"
    >
      <div className={classes.brand}>
        {/* Toggle always visible */}
        <div className={classes.containerchange}>
          {collapsed ? (
            <button
              className={classes.toggle}
              onClick={toggleCollapse}
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <HiOutlineMenu size={20} />
            </button>
          ) : null}

          {/* Profile */}
          <div className={classes.profileSection}>
            <div className={classes.profilePic}>
              <img
                src={getProfilePic()}
                alt={`${activeUserData?.name || "User"} profile`}
              />
            </div>

            {!collapsed && (
              <div className={classes.profileInfo}>
                <div className={classes.profileName}>
                  {activeUserData?.name}
                </div>
                <span className={classes.profileRoleBadge}>
                  {activeUserData?.role}
                </span>
              </div>
            )}
            {collapsed ? null : (
              <button
                className={classes.toggle}
                onClick={toggleCollapse}
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <HiOutlineMenu size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <nav className={classes.nav} role="navigation">
        <ul>
          {menuItems
            .filter((item) => item.roles.includes(activeUserData?.role))
            .map((item) => (
              <li key={item.key} className={classes.navItem}>
                <button
                  type="button"
                  onClick={() => onTabChange(item.key)}
                  className={`${classes.navlink} ${
                    activeTab === item.key ? classes.active : ""
                  }`}
                  aria-current={activeTab === item.key ? "page" : undefined}
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
            <span className={classes.icon}>
              <HiOutlineLogout size={20} />
            </span>
            <span className={classes.label}>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default LeftBar;
