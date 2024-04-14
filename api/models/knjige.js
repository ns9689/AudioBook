const mongoose = require("mongoose");

const versionsShema = new mongoose.Schema({
   text: {
      type: String,
      //required: [true, "Text is required"],
   },
   state: {
      type: String,
      //default: "green",
      //required: [true, "State is required"],
   },
});

const sentencesShema = new mongoose.Schema({
   originalText: {
      type: String,
      required: [false, "Sentence text is required"],
   },
   chosenText: {
      type: String,
   },
   chosenAudio: {
      type: Buffer,
      required: [false, "Audio file is required"],
   },
   state: {
      type: String,
      default: "table-secondary", //"" = did not start (background color), "grey" = working on it (grey), "green" = selected (green)
      required: [false, "State is required"],
   },
   versions: {
      type: [versionsShema],
   }
});


const knjigaShema = new mongoose.Schema({
   author: {
      type: String, //Uporabnik, //objekt
      //required: [true, "Uporabnik is required"],
   },
   title: {
      type: String,
      //required: [true, "Title is required!"],
   },
   originalText: {
      type: String,
   },
   sentences: {
      type: [sentencesShema], //ne bo string, ampak audio, tudi text? - nova tabela?
   },
   dateCreated: {
      type: String,
   },
   dateFinished: {
      type: Date,
   },
   state: {
      type: String,
      default: "table-secondary", //0 = did not start (background color), 1 = working on it (grey), 2 = finished (green)
      required: [true, "State is required"],
   },
   file: {
      data: Buffer, // For storing file data
      contentType: String,
   },

});

mongoose.model("Knjiga", knjigaShema, "Knjiga");
