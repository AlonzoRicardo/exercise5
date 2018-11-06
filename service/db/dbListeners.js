//DATABASE CONNECTIONS
const { DBURL, DBURL2, LOCALDB } = process.env;
const { connect } = require("./dbClient");
const db1 = connect(DBURL);
const db2 = connect(DBURL2);
let hierarchy = [];

const CreditModel = database => {
  return require("../models/CreditModel")(database);
};

db1.on("connected", () => {
  hierarchy.push(db1);
  let Credit = CreditModel(db1);
  Credit.create(new Credit({})).then(() => console.log(`DB1 INIT`));
  console.log(hierarchy.length, "current hierarchy");
});

db2.on("connected", () => {
  hierarchy.push(db2);
  let Credit = CreditModel(db2);

  Credit.create(new Credit({})).then(() => console.log(`DB2 INIT`));
  console.log(hierarchy.length, "current hierarchy");
});

db1.on("reconnected", () => {
  console.log(hierarchy.length, "<-- RECONNECTED");
});

db2.on("reconnected", () => {
  console.log(hierarchy.length, "<-- RECONNECTED");
});

db1.on("disconnected", () => {
  let pos = hierarchy.indexOf(db1);
  hierarchy.splice(pos, 1);
  console.log(hierarchy.length, "DATABASE-1 DOWN");
});

db2.on("disconnected", () => {
  let pos = hierarchy.indexOf(db2);
  hierarchy.splice(pos, 1);
  console.log(hierarchy.length, "DATABASE-2 DOWN");
});

module.exports = { hierarchy };
