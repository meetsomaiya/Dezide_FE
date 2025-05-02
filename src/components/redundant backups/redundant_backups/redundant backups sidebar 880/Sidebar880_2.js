import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faQuestionCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar880.css";
import DynamicGuides882 from "./DynamicGuides882"; // Assuming the table is in this component

const Sidebar880 = () => {
  return (
    <div className="dashboard-layout-880">
      <div className="sidebar-880">
        <div className="sidebar-header-880">DynamicApp</div>
        <ul className="sidebar-menu-880">
          <li>
            <FontAwesomeIcon icon={faHome} className="icon-880" />
            <span>Dashboard</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faBook} className="icon-880" />
            <span>Dynamic Guides</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faQuestionCircle} className="icon-880" />
            <span>FAQs</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faCog} className="icon-880" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="content-area-880">
        {/* <DynamicGuides882 /> */}
      </div>
    </div>
  );
};

export default Sidebar880;
