const dotenv = require("dotenv");
dotenv.config();
const Router = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { createCanvas, loadImage } = require("canvas");
const batchCertiRoute = Router();
const nodemailer = require("nodemailer");
const upload = multer({ dest: "uploads/csv" });
const BatchCertificate = require("../models/batchCertificateModel");
const certificateModelData = require("../models/certificateModel");
// Batch Certificate Generation route
 
async function createBatchCertificate(
  certificateData,
  emailSubject,
  emailBody,
  batch
) {
  try {
    const id = "64256302253488df5cf359fd";
    const getData = await certificateModelData
      .findOne({ _id: id })
      .populate("template");

    if (!getData || getData.length <= 0) {
      console.log("no data");
    }
    
    const canvas = createCanvas(1000, 700);
    const ctx = canvas.getContext("2d");
    const direction = getData.template.path;
    const image = await loadImage(direction);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let fields = getData.fields;
    for (let field of fields) {
      let value =
        field.name == "yes" ? certificateData.name : field.value;
      // console.log( certificateData)
      if (field.transform === "lowercase") {
        value = value.toLowerCase();
      } else if (field.transform === "uppercase") {
        value = value.toUpperCase();
      }
      const font = "Times New Roman, Times, serif";
      ctx.font = `${field.size}px ${font} sans-serif`;
      ctx.fillStyle = field.color;
      ctx.textAlign = field.align;
      ctx.textBaseline = "top";
      if (field.lineBreak) {
        const lineHeight = field.size * 1;
        const words = value.split(" ");
        let line = "";
        let y = field.y;
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > field.width && i > 0) {
            ctx.fillText(line, field.x, y);
            line = words[i] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, field.x, y);
      } else {
        ctx.fillText(value, field.x, field.y, field.width);
      }
    }

    const imageData = canvas.toBuffer(getData.template.contentType);
    const timeStamp = Math.floor(Math.random() * 10000);
    const certificataName = getData.template.name;

    const filePath = `uploads/bulkcertificate/${timeStamp}${certificataName}`
 
    fs.writeFileSync(filePath, imageData);

    // // create pdf and send email //
    // const pdfDoc = new PDFDocument();
    // pdfDoc.image(imageData, {
    //   fit: [500, 500],
    //   align: "center",
    //   margin: 0,
    // });
    // const pdfBuffer = await new Promise((resolve, reject) => {
    //   let buffers = [];
    //   pdfDoc.on("data", buffers.push.bind(buffers));
    //   pdfDoc.on("end", () => {
    //     const pdfData = Buffer.concat(buffers);
    //     resolve(pdfData);
    //   });
    //   pdfDoc.end();
    // });

    // Send certificate email to user
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.USER_EMAIL,
    //     pass: process.env.USER_PASS,
    //   },
    // });
    // console.log(certificateData.fields[0].email);
    // const mailOptions = {
    //   from: process.env.USER_EMAIL,
    //   to: certificateData.email,
    //   subject: emailSubject,
    //   html: emailBody,
    //   attachments: [
    //     {
    //       filename: `${certificateData.name}_${batch}.pdf`,
    //       content: pdfBuffer,
    //     },
    //   ],
    // };
    // await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
}

batchCertiRoute.post(
  "/certificate/batch",
  upload.single("csv"),
  async (req, res) => {
    try {
      const csvData = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
          csvData.push(data);
        })
        .on("end", async () => {
          const { emailSubject, emailBody, batch, startDate, endDate } =
            csvData[0];
          const certificateData = {
            batch,
            emailBody,
            emailSubject,
            startDate: startDate,
            endDate: endDate,
            fields: [],
          };
          let obj = {};
          for (let i = 0; i < csvData.length; i++) {
            const data = csvData[i];
            obj["name"] = data.Name;
            obj["email"] = data.Email;
            certificateData.fields.push(obj);
            obj = {};
          }
          // console.log(certificateData);
          //Save certificate to database
          // const certificate = await BatchCertificate(certificateData);
          // certificate.save();

          for (let j = 0; j < certificateData.fields.length; j++) {
            // const imagePath = path.join(
            //   __dirname,
            //   "..",
            //   "certificate",
            //   "12542023-03-24T12-43-12.892Z_background5.jpg"
            // );
            createBatchCertificate(certificateData.fields[j], emailSubject, emailBody, batch);
            // console.log(imagePath);
          }
          res
            .status(200)
            .json({ message: "Certificates generated and sent successfully" });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = batchCertiRoute;
