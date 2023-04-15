const Router = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path")
const createTemplate = Router();
const imageData = require("../models/templateModel");

// multer //

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/templates");
  },
  filename: function (req, file, cb) {
    const timeStamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${timeStamp}_${file.originalname}`);
  },
});
const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files jpg,jpeg,png are allowed!"));
  } 
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// upload template //
createTemplate.post("/uploadtemplate", upload.single("image"), (req, res) => {
  try {
   
    const image = new imageData({
      name: req.file.filename,
      path:  path.join("uploads/templates", req.file.filename).replace(/\\/g, "/"),
      contentType: req.file.mimetype,
    });

    image.save();
    return res.send("File uploaded and saved to database successfully!");
  } catch (error) {
    return res.status(500).send("Error saving image to database", error);
  }
});
    
createTemplate.get("/templates", async (req, res) => {
  try {
    const images = await imageData.find({});
    if (!images || images.length <= 0) {
      return res.status(404).send({ message: "Images not found" });
    }

  const array = images.map((image) => {
    return new Promise((resolve, reject) => {
      fs.readFile(`uploads/templates/${image.path}`, (err, data) => {
        if(err) {
          console.error(err); 
          return reject(`Error reading image from disk: ${image.name}`);
        }
        resolve({
          id:image._id ,
          name : image.name ,
          path : image.path ,
          contentType: image.contentType,
        })
      })
    })
  }) 
    const imageDataArray = await Promise.all(array) ;
    res.send(imageDataArray)
 
    
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

createTemplate.get("/template/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await imageData.findById(id).lean().exec();

    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }
   
    fs.readFile(`uploads/templates/${image.path}`, (err, data) => {
      if (err) {
        console.error(err); // log error to console for debugging
        return res.status(500).send("Error reading image from disk");
      }
     
      res.writeHead(200, {
        "Content-Type": image.contentType,
        "Content-Disposition": `inline; filename="${image.name}"`,
      });
      res.end(data);
    }) 
  

    
  } catch (error) {
    return res.status(500).send(error);
  }
});


module.exports = createTemplate;
