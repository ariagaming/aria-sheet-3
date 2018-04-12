import React from "react";

import { Page } from "./components/page";
import { PageOne } from "./components/pageOne";
import { DialogWeapons } from "./components/dialogWeapons";
import { SheetMenu } from "./components/sheetMenu";

export const CharacterSheet = () => (
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
