const mongoose = require("mongoose");

const settingsShema = new mongoose.Schema({
   govorec: {
      type: String,
      default: "ajda"
   },
   tempo: {
      type: String,
      default: 1
   },
   normaliziraj: {
      type: Boolean,
      default: true
   },
   naglasi: {
      type: Boolean,
      default: true
   },
   enostavnoNaglasevanje: {
      type: Boolean,
      default: true
   },
   sintetiziranoBesedilo: {
      type: Boolean,
      default: true
   },
});

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
      default: "",
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
      type: [sentencesShema],
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
   settings: {
      type: [settingsShema],
   },
});

mongoose.model("Knjiga", knjigaShema, "Knjiga");
