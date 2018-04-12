import React from "react";

import { Page } from "./page";
import { PageOne } from "./pageOne";
import { DialogWeapons } from "./dialogWeapons";
import { SheetMenu } from "./sheetMenu";

export const PageCharacterSheet = () => (
  <div className="CharacterSheet">
    <div>
      <PageOne />
      <Page>These are the statsß</Page>
      <Page />
      <Page />
    </div>
    <DialogWeapons />
    <SheetMenu />
  </div>
);
