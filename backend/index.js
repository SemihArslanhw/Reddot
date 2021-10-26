const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth.js")
const postRoute = require("./routes/posts.js")
const userRoute = require("./routes/users.js")
const commentRoute = require("./routes/comment.js");
const conversationRoute = require("./routes/conversation.js");
const notificationsRoute = require("./routes/notifications.js");
const messageRoute = require("./routes/messages.js");

dotenv.config();

const app = express();
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")))

const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("MongoDB connected");
}).catch((error) => console.log(error))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({storage: storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded!");
})

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/notification", notificationsRoute);

app.listen(PORT, () => {
    console.log("Backend server is running")
})

