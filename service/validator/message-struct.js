const struct = require("superstruct").struct;

const MessageStruct = struct(
  {
    destination: "string",
    body: "string",
    uuid: "string",
    status: {
      sent: "boolean?",
      confirmed: "boolean?"
    }
  },
  {
    status: {
      sent: false,
      confirmed: false
    }
  }
);

module.exports = MessageStruct;
