const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    activityUser: {
      type: Object,
    },
    receivingUser: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);