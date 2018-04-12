import React from "react";
import { connectMyComponent } from "./../services/redux";
import { toggleDialog } from "./../services/actions";
export const SheetMenu = connectMyComponent(() => (
  <div className="sheet-menu">
    <MenuItem title="Information" />
    <MenuItem title="Feats" />
    <MenuItem title="Languages" />
    <MenuItem title="Resistances" />
    <MenuItem title="Skills" />
    <MenuItem title="Professions" />
    <MenuItem title="Armor" />
    <MenuItem title="Weapons" dialogName="showWeaponsDialog" />
    <MenuItem title="Specials" />
    <MenuItem title="Notes" />
  </div>
));

const MenuItem = ({ title, dialogName }) => (
  <div className="menu-item" onClick={() => toggleDialog(dialogName)}>
    <span>{title}</span>
  </div>
);
