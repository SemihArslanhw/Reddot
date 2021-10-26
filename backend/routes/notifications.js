const router = require("express").Router();
const Notification = require("../models/Notification");

//GET 5 Notifications
router.get("/:username", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receivingUser: req.params.username
    }).limit(5);
    res.status(200).json(notifications.reverse());
  } catch (error) {
    res.status(500).json(err);
  }
})

//Get all notifications
router.get("/all/:username", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receivingUser: req.params.username
    });
    res.status(200).json(notifications.reverse());
  } catch (error) {
    res.status(500).json(err);
  }
})

//Delete a notification
router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Notification has been deleted!");
  } catch (error) {
    res.status(500).json(err);
  }
})

module.exports = router;