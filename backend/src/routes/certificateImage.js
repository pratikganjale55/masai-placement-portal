const fs = require("fs");
const Router = require("express");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const PDFDocument = require("pdfkit");
const poppler = require("pdf-poppler");
const certificateImage = Router();
const templateData = require("../models/templateModel");
const certificateData = require("../models/certificateModel");



certificateImage.post("/generate-image", async (req, res) => {
  try {
    const { template, fields } = req.body;

    if (!template || fields.length <= 0) {
      return res.status(401).send({ message: "please fill valid input" });
    }

    fields[2]["name"] = "yes"
    const  saveCertificateData = await certificateData({ template, fields })
    saveCertificateData.save() ;
    
    const imagePath = await templateData.findById(template);
    const direction = imagePath.path;
 
    const canvas = createCanvas(1000, 700);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(direction);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (let field of fields) {
      let value = field.value;
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

    const imageData = canvas.toBuffer(imagePath.contentType);
    const timeStamp = Math.floor(Math.random() * 10000);; 
    const certificataName = imagePath.name;
    
    const filePath = `uploads/certificate/${timeStamp}${certificataName}`;
    // console.log(filePath)
    
    fs.writeFileSync(filePath, imageData);


fs.writeFileSync(filePath, imageData);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Disposition": "attachment;filename=certificate.png",
    });

    res.end(imageData);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error generating image");
  }
});

certificateImage.get("/sample-certificate", (req, res) => {
  const backgroundPaths = [
    path.join(__dirname, "..", "background", "background1.jpg"),
    path.join(__dirname, "..", "background", "background2.jpg"),
    path.join(__dirname, "..", "background", "background3.jpg"),
    path.join(__dirname, "..", "background", "background4.jpg"),
    path.join(__dirname, "..", "background", "background5.jpg"),
  ];

  const doc = new PDFDocument({
    size: [297, 210],
    margin: 0,
  });

  doc.image(backgroundPaths[4], {
    fit: [doc.page.width, doc.page.height],
    align: "center",
    valign: "center",
  });

  doc
    .moveDown(3)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("#FF0000")
    .text("CERTIFICATE OF COMPLETION", {
      align: "center",
      lineGap: -5,
    });

  doc
    .moveDown()
    .font("Times-Roman")
    .fontSize(5)
    .fillColor("#000000")
    .text("FELICITATION DATE: March 17, 2023", {
      align: "center",
    });
  doc
    .moveDown(4)
    .font("Times-Roman")
    .fontSize(5)
    .fillColor("#007791")
    .text("THE FOLLOWING AWARD GIVEN TO", {
      align: "center",
    });

  doc
    .moveDown()
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("#000000")
    .text("PRATIK GANJALE", { align: "center" });

  const text =
    "for outstanding result and conduct during Masai’s Full Stack Web Development program. He/She has completed 2160 hours of practical learning. This is a testament to his/her competence and excellent application of industry standards and methods";
  const x = 50;
  const y = 125;
  doc.font("Times-Roman").fontSize(5).text(text, x, y, {
    width: 200,
    align: "center",
    lineBreak: true,
  });

  const leftText = "YOGESH BHAT";
  const rightText = "NRUPUL DEV";
  const xLeft = 65;
  const xRight = doc.page.width - 120;
  const yBottom = doc.page.height - 30;

  doc
    .font("Helvetica-Bold")
    .fontSize(6)
    .fillColor("#FF0000")
    .text(leftText, xLeft, yBottom, { align: "left" })
    .text(rightText, xRight, yBottom, {
      align: "right",
      width: 50,
    });

  const leftDes = "Co-Founder & SVP";
  const rightDes = "Co-Founder & CTO";
  const leftX = 70;
  const rightX = doc.page.width - 140;
  const bottomY = doc.page.height - 20;

  doc
    .font("Helvetica")
    .fontSize(4)
    .fillColor("#000000")
    .text(leftDes, leftX, bottomY, { align: "left" })
    .text(rightDes, rightX, bottomY, {
      align: "right",
      width: 70,
    });

  const filePath = path.join(
    __dirname,
    "..",
    "templates",
    "sample-certificate.pdf"
  );
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  stream.on("finish", () => {
    res.download(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error generating sample certificate");
      }
      fs.unlinkSync(filePath);
    });
  });

  doc.end();
});
 
module.exports = certificateImage;
