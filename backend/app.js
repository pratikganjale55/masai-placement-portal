const express = require("express") ;
const app = express() ;
const connection = require("./src/database/db");
const authRoute = require("./src/routes/user");
const batchCertiRoute= require("./src/routes/batchCertificate")
const cors = require("cors") ;
const dotenv = require("dotenv");

const createTemplate = require("./src/routes/createTemplate");
const certificateImage = require("./src/routes/certificateImage");
dotenv.config({ path: "./src/config/.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("uploads"))
app.use(cors());
app.use("/auth", authRoute);
app.use("/template", createTemplate);
app.use("/certificate", certificateImage);
app.use('/batchcertificate',batchCertiRoute)


app.get("/", (req, res) => {
  res.send({ message: "Welcome to our website" })
}) 
 
app.listen(process.env.PORT, async () => {
   await connection;
   console.log(`server start at ${process.env.PORT}`);
});
     
module.exports = app;
