const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiVerzijo = (req, res) => {
    res.status(204).json({status:"OK"});
};

const posodobiVerzijo = (req, res) => {
    res.status(200).json({status:"OK"});
}

const pridobiVerzijo = (req, res) => {
    res.status(200).json({status:"OK"});
}

const novaVerzija = (req, res) => {
    res.status(201).json({status:"OK"});
}

module.exports = {
    izbrisiVerzijo,
    posodobiVerzijo,
    pridobiVerzijo,
    novaVerzija
}
