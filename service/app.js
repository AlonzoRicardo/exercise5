require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

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
