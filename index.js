// Entry Point of the API Server

const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
var Jimp = require("jimp");

/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
app.use(cors());
// app.use(express.bodyParser({limit: '50mb'}))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

const rows = [{ id: 1 }, { id: 2 }];

/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
app.get("/testdata", (req, res, next) => {
  console.log("TEST DATA :");
  res.send(rows);
});

app.post("/uploadImage", async (req, res) => {
  console.log("uploading image");
  //   console.log(req.body);
  const base64str = req.body.imageFile.replace(
    /^data:image\/[a-z]+;base64,/,
    ""
  );
  //   console.log(base64str)
  require("fs").writeFile("out.jpeg", base64str, "base64", function (err) {
    console.log(err);
  });
  const buf = Buffer.from(base64str, "base64");
  //   console.log(buf)
  const image = await Jimp.read(buf);
  console.log(image);

  // rotate Function having a rotation as 90
  let data = { rotatedImage: "" };
  image.rotate(90).getBase64(Jimp.MIME_JPEG, function (err, src) {
    console.log(src);
    data.rotatedImage = src;
  });

  res.status(200).send(data);
});

// Require the Routes API
// Create a Server and run it on the port 3001
const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
});
