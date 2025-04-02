import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <i className="fas fa-bars"></i>
        <span className="brand-name">DEZIDE</span>
      </div>
      <div className="navbar-right">
        <i className="fas fa-check"></i>
        <span>1.29.2</span>
        <i className="fas fa-user-circle"></i>
      </div>
    </nav>
  );
};

export default Navbar;
