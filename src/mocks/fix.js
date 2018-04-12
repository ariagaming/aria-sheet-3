var weapons = require("./__weapons");

const generateId = () => {
  return (
    "weapon_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
const w = {};

const newWeapons = weapons.reduce((acc, weapon) => {
  var id = generateId();
  acc[id] = { ...weapon, id: id };
  return acc;
}, w);

var fs = require("fs");
fs.writeFileSync("./weapons.js", JSON.stringify(newWeapons, null, 4), "utf8");
