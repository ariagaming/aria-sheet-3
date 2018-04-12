import React from "react";
import { connectMyComponent } from "./../services/redux";
import { toList } from "./../helpers";
import { Row } from "./layout";
import { Button } from "baudin-ui";
import { toggleDialog, selectData } from "./../services/actions";

const closeDialog = () => toggleDialog("showWeaponsDialog");

export const DialogWeapons = connectMyComponent(
  ({ showWeaponsDialog, characterNew, data }) => {
    const w = data && data.selectedWeapon ? data.selectedWeapon : {};
    return characterNew ? (
      <div
        className={`dialog ${showWeaponsDialog ? "show" : ""}`}
        onClose={closeDialog}
      >
        <div className="dialog-title">Weapons{w.id ? ` - ${w.id}` : ""}</div>
        <Row>
          <div className="dialog-list">
            {toList(characterNew.weapons).map((weapon, i) => (
              <div
                className={[
                  "dialog-list__row",
                  data &&
                  data.selectedWeapon &&
                  weapon.title === data.selectedWeapon.title
                    ? "selected"
                    : ""
                ].join(" ")}
                key={i}
                onClick={() => selectData("selectedWeapon", weapon)}
              >
                {weapon.title}
              </div>
            ))}
          </div>

          <div className="dialog-content">
            {data && data.selectedWeapon && <div />}
          </div>
        </Row>
        <div className="dialog-footer">
          <Button
            type="primary"
            onClick={() => toggleDialog("showWeaponsDialog")}
          >
            Cancel
          </Button>
        </div>
      </div>
    ) : null;
  }
);
