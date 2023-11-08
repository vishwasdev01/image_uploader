const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const connectToDatabase = require("./dbconfig");
const app = express();
const UploadImage = require("./models/UploadDetails");
const getLocalIpAddress = require("./helper");
const ipAddress = getLocalIpAddress();
const PORT = 8080;

connectToDatabase();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*",
  })
);
app.use("/images", express.static(path.join(__dirname, "..", "Images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const folderPath = path.join(__dirname, "..", "Images");
app.get("/fetch-upload", async (req, res) => {
  try {
    const fetchUpload = await UploadImage.find();
    const data = fetchUpload.map((e) => {
      const filePath = path.join(folderPath, e.image);
      return {
        id: e._id,
        image: fs.existsSync(filePath)
          ? `http://${ipAddress}:${PORT}/images/${e.image}`
          : null,
        description: e.description,
        author: e.author,
      };
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/upload-data", upload.single("image"), async (req, res) => {
  try {
    if (!!req.file.filename && !!req.body.author && !!req.body.description) {
      const uploadImage = new UploadImage({
        image: req.file.filename,
        description: req.body.description,
        author: req.body.author,
      });
      await uploadImage.save();
      res.status(201).send({ message: "upload Image" });
    } else {
      res.status(200).send({ message: "Something Missing Please" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

app.delete("/upload/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UploadImage.findById({ _id: id });
    const filePath = path.join(folderPath, data.image);
    await UploadImage.deleteOne({ _id: id });
    fs.unlink(filePath, (error) => {
      console.log(error);
    });
    res.status(200).json({ message: "deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.listen(PORT, ipAddress, () => {
  console.log(`Server listing ${ipAddress}:${PORT}`);
});
