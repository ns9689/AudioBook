const mongoose = require("mongoose");

const sentenceShema = new mongoose.Schema({
   text: {
      type: String,
      required: [true, "Text is required"],
   },
   audio: {
      type: Buffer,
      required: [true, "Audio file is required"],
   },
   state: {
      type: Number,
      default: 0, //0 = did not start (background color), 1 = working on it (grey), 2 = selected (green)
      required: [true, "State is required"],
   },
});

const knjigaShema = new mongoose.Schema({
   id: { //no need, gets _id
      type: Number,
      required: [true, "Unique identifier is required"],
   },
   author: {
      type: String, //Uporabnik, //objekt
      required: [true, "Uporabnik is required"],
   },
   title: {
      type: String,
      required: [true, "Title is required!"],
   },
   originalText: {
      type: String,
   },
   options: {
      type: [sentenceShema], //ne bo string, ampak audio, tudi text? - nova tabela?
   },
   dateCreated: {
      type: Date,
      required: [true, "Date is required!"],
   },
   dateFinished: {
      type: Date,
   },
   state: {
      type: Number,
      default: 0, //0 = did not start (background color), 1 = working on it (grey), 2 = finished (green)
      required: [true, "State is required"],
   },

});

mongoose.model("Knjiga", knjigaShema, "Knjiga");