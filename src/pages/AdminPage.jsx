import React, { useState } from "react";
import LeftBar from "../components/Admin/leftBar/LeftBar";
import AddUser from "../components/Admin/AddUsers/AddUser";
import AddMember from "../components/Admin/Addmember/AddMembers";



const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <AddUser />;
      case"members":
         return <AddMember/>;
      default:
        return <div> please select the tab</div>
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <LeftBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ flex: 1, padding: "1.5rem" }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
