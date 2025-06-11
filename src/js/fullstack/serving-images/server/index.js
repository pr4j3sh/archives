const express = require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");

const server = express();
const postSchema = mongoose.Schema({
  image: String,
  imageBuffer: {
    data: Buffer,
    contentType: String,
  },
});

const Post = mongoose.model("Post", postSchema);
const upload = multer({ dest: "./uploads" });
mongoose
  .connect("mongodb://localhost:27312")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(err);
  });

server.use("/uploads", express.static("uploads"));

server.post("/create/static", upload.single("image"), async () => {
  const post = new Post({
    image,
  });
  await post.save();
  res.json({ message: "static image saved" });
});

server.listen(5000, () => {
  console.log("server running @ 5000");
});
