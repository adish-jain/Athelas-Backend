const express = require("express");
var cors = require("cors");
var Jimp = require("jimp");

/* 
Creates an Express application. 
The express() function is a top-level 
function exported by the express module.
*/
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const base64ToImage = async (imageFile) => {
  const base64str = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
  require("fs").writeFile("out.jpeg", base64str, "base64", function (err) {
  });
  const buf = Buffer.from(base64str, "base64");
  const image = await Jimp.read(buf);
  return image;
};

/*
API Endpoints 
*/
app.post("/rotate", async (req, res) => {
  const image = await base64ToImage(req.body.imageFile);
  const numDegrees = parseInt(req.body.numDegrees);
  let data = { returnedImage: "" };
  image.rotate(numDegrees).getBase64(Jimp.MIME_PNG, function (err, src) {
    data.returnedImage = src;
  });

  res.status(200).send(data);
});

app.post("/invert", async (req, res) => {
  const image = await base64ToImage(req.body.imageFile);
  let data = { returnedImage: "" };
  image.invert().getBase64(Jimp.MIME_JPEG, function (err, src) {
    data.returnedImage = src;
  });

  res.status(200).send(data);
});

app.post("/greyscale", async (req, res) => {
  const image = await base64ToImage(req.body.imageFile);
  let data = { returnedImage: "" };
  image.greyscale().getBase64(Jimp.MIME_JPEG, function (err, src) {
    data.returnedImage = src;
  });

  res.status(200).send(data);
});

// Create a Server and run it on the port 3001
const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
});
