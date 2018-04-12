import React from "react";
import { connectMyComponent } from "./../services/redux";
import { ensure } from "./../helpers";
import { MasterDetailForm } from "./layout";
import { retrieveWeapons, saveWeapon } from "./../services/api";
import { CommandTypes } from "./../services/actions";

const ensureConfig = {
  test: props => props.weapons,
  action: retrieveWeapons,
  actionType: CommandTypes.retrievedWeapons
};

const DMGTypes = [
  { key: "bludgeoning", value: "Bludgeoning" },
  { key: "piercing", value: "Piercing" },
  { key: "slashing", value: "Slashing" },
  { key: "magical", value: "Magical" }
];

export const PageSetting = connectMyComponent(
  ensure(ensureConfig, ({ weapons }) => (
    <div className="page">
      <MasterDetailForm
        items={weapons}
        config={{
          title: { type: String, title: "Title" },
          damage: { type: String, title: "Damage" },
          type: { type: DMGTypes, title: "DMG type" },
          cost: { type: String, title: "Cost" },
          ranged: { type: Boolean, title: "Is ranged" },
          weight: { type: String, title: "Weight" }
        }}
      />
    </div>
  ))
);
