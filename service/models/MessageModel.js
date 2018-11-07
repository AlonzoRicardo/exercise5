const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    destination: String,
    body: String,
    uuid: String,
    status: {
      sent: { type: Boolean, default: false },
      confirmed: { type: Boolean, default: false }
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = database => database.model("Message", messageSchema);
