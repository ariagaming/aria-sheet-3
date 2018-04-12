import React from "react";
import { connectMyComponent } from "./../services/redux";
import { logout } from "./../services/actions";
import { Link } from "react-router-dom";

export const MenuMain = connectMyComponent(() => (
  <div className="main-menu">
    <MenuItem title="Home" link="/home" />
    <MenuItem title="Logout" onClick={logout} />
    <MenuItem title="Sheet" link="/sheet" />
    <MenuItem title="Setting" link="/setting" />
    <MenuItem title="Documentation" link="/documentation" />
    <MenuItem title="Characters" link="/characters" />
  </div>
));

const MenuItem = ({ title, link, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    {link ? <Link to={link}>{title}</Link> : <a>{title}</a>}
  </div>
);
