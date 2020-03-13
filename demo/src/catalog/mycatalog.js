import { Catalog } from "react-planner";

let catalog = new Catalog();

import * as Areas from "./areas/**/planner-element.jsx";
import * as Lines from "./lines/**/planner-element.jsx";
import * as Holes from "./holes/**/planner-element.jsx";
import * as Items from "./items/**/planner-element.jsx";

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);

catalog.registerCategory("doors", "Doors", [
  Holes.door,
  Holes.doorDouble,
  Holes.panicDoor,
  Holes.panicDoorDouble,
  Holes.slidingDoor
]);
catalog.registerCategory("windows", "Windows", [
  Holes.window,
  Holes.sashWindow,
  Holes.venetianBlindWindow,
  Holes.windowCurtain
]);
catalog.registerCategory("furnitures", "Furnitures", [
  Items.armchairs,
  Items.bench,
  Items.bookcase,
  Items.canteenTable,
  Items.chair,
  Items.chairdesk,
  Items.childChairDesk,
  Items.schoolDesk,
  Items.schoolDeskDouble,
  Items.desk,
  Items.deskdouble,
  Items.hanger,
  Items.sofa,
  Items.table,
  Items.teachingPost,
  Items.wardrobe
]);
catalog.registerCategory("kitchen", "Kitchen", [
  Items.kitchen,
  Items.sink,
  Items.trash,
  Items.cleaningcart
]);
catalog.registerCategory("appliances", "Appliances", [
  Items.airConditioner,
  Items.camera,
  Items.fireExtinguisher,
  Items.fridge,
  Items.projector,
  Items.radiatorOldStyle,
  Items.radiatorModernStyle,
  Items.routerWifi,
  Items.smokeDetector,
  Items.threePhasePanel,
  Items.tv,
  Items.naspo
]);
catalog.registerCategory("others", "Others", [
  Items.blackboard,
  Items.coatHook,
  Items.column,
  Items.columnSquare,
  Items.electricalPanel,
  Items.monitorPc
]);

export default catalog;
