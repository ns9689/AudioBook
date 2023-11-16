const mongoose = require("mongoose");

const optionsShema = new mongoose.Schema({
   text: {
      type: String,
      required: [true, "Text is required"],
   },
   audio: {
      type: Buffer,
      required: [false, "Audio file is required"],
   },
   state: {
      type: String,
      default: "search", //0 = did not start (background color), 1 = working on it (grey), 2 = selected (green)
      required: [true, "State is required"],
   },
});

const knjigaShema = new mongoose.Schema({
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
   sentences: {
      type: [optionsShema], //ne bo string, ampak audio, tudi text? - nova tabela?
   },
   dateCreated: {
      type: String,
   },
   dateFinished: {
      type: Date,
   },
   state: {
      type: String,
      default: "search", //0 = did not start (background color), 1 = working on it (grey), 2 = finished (green)
      required: [true, "State is required"],
   },

});

mongoose.model("Knjiga", knjigaShema, "Knjiga");