require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

//DATABASE CONNECTIONS
const { DBURL, DBURL2, LOCALDB } = process.env;
const { connect } = require("./db/dbClient");
const db1 = connect(DBURL);
const db2 = connect(DBURL2);
let hierarchy = [];

const CreditModel = database => {
  return require("./models/CreditModel")(database);
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

//const local = connect(LOCALDB)
module.exports = { hierarchy };

const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100
});

//Request amount limiter and payload size limits
app.use(limiter);
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));

//routing
const CreditRoute = require("./routes/CreditRoute");
app.use("/api/v3", CreditRoute);

const MessagesRoute = require("./routes/MessagesRoute");
app.use("/api/v3", MessagesRoute);

app.listen(9003, () => console.log(`Listening on port ${9003}`));
