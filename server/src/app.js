const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

const PORT = 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*",
  })
);


app.post("/upload-data",upload.single("image"),(req, res)=>{
   
  console.log(req)
  res.send("upload Image")
})
app.listen(PORT, () => {
  console.log("listing port " + PORT);
});
