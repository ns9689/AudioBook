const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const novStavek = (req, res) =>  {
    res.status(201).json({status:"OK"});
}

const posodobiStavek = (req, res) => {
    res.status(200).json({status:"OK"});
}

const pridobiStavek = (req, res) => {
    res.status(200).json({status:"OK"});
}

const vsiStavki = (req, res) => {
    res.status(200).json({status:"OK"});
}

const izbrisiStavek = (req, res) => {
    res.status(204).json({status:"OK"});
}

module.exports = {
    novStavek,
    pridobiStavek,
    vsiStavki,
    posodobiStavek,
    izbrisiStavek
}