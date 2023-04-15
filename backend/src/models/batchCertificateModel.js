const mongoose = require("mongoose");

const batchCertificateSchema = new mongoose.Schema({
  certificate_id: { type: mongoose.Schema.Types.ObjectId, ref: "certificate"},
  batch:{ type: String, required: true},
  emailBody:{ type: String, required: true},
  emailSubject:{ type: String, required: true},
  startDate:{ type: Date, required: true },
  endDate:{ type: Date, required: true },
  fields:[
    {
      email:{ type: String, required: true},
      name:{ type: String, required: true},
    }
  ]
});

module.exports = mongoose.model("batchCertificate", batchCertificateSchema);

