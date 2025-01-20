import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LeftSideNavbar.css";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import FeedbackIcon from "@material-ui/icons/Feedback";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ReportIcon from "@material-ui/icons/Report";
import ContactsIcon from "@material-ui/icons/Contacts";
import MenuBookIcon from "@material-ui/icons/MenuBook";

const LeftSideNavbar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const onClickHandler = (event) => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navbar flex-auto ">
        <NavLink to="#" className="menu_bars m-lg-2 text-light ">
          <MenuIcon onClick={onClickHandler} />
        </NavLink>
      </div>
      <nav className={sidebar ? "nav_menu  navshow" : "nav_menu "}>
        <ul>
          <li>
            <NavLink
              className="menu_text"
              activeclassname="active_class"
              exact="true"
              to="#"
            >
              <span>
                <FindInPageIcon />
              </span>
              Indent
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu_text"
              activeclassname="active_class"
              exact="true"
              to="/indent"
            >
              <span>
                <ReportIcon />
              </span>
              Indent
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu_text"
              activeclassname="active_class"
              exact="true"
              to="/login"
            >
              <span>
                <MenuBookIcon />
              </span>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu_text"
              activeclassname="active_class"
              exact="true"
              to="/feedback"
            >
              <span>
                <FeedbackIcon />
              </span>
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink
              className="menu_text"
              activeclassname="active_class"
              exact="true"
              to="/contact"
            >
              <span>
                <ContactsIcon />
              </span>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default LeftSideNavbar;
