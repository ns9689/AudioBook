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
    res.render("novaVerzija", {
        title: "Nova verzija",
        p_js: "../javascripts/nova.js",
    });
};

const ustvariVerzijo = (req, res) =>  {
    console.log("novStavek");
    res.status(201).json({status:"OK"});
}

module.exports = {
    izbrisiVerzijo,
    posodobiVerzijo,
    ustvariVerzijo,
    pridobiVerzijo,
    novaVerzija
}
