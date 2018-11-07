const struct = require("superstruct").struct;

const CreditStruct = struct({
  amount: "number"
});

module.exports = CreditStruct;
