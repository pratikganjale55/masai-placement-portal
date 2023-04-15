const mongoose = require("mongoose") ;

const certificateSchema = mongoose.Schema({
    "template": { type: mongoose.Schema.Types.ObjectId, ref: "template", required: true },
    "fields": [
      {
        "value": { type: String, required: true },
        "font": { type: String },
        "color": { type: String },
        "size": { type: Number },
        "x": { type: Number },
        "y": { type: Number },
        "width": { type: Number },
        "center": { type: Boolean },
        "lineGap": { type: Number },
        "lineBreak": { type: Boolean },
        "align": { type: String },
        "lineHeight": { type: Number },
        "transform": { type: String } ,
        "name" : {type: String}
      }
    ]
  })

  const certificateModel = mongoose.model("certificate",certificateSchema ) ;


  module.exports = certificateModel ;