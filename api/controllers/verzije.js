const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiVerzijo = (req, res) => {
    res.status(204).json({status:"OK"});
};

const posodobiVerzijo = (req, res) => {
    res.status(200).json({status:"OK"});
}

/*const pridobiVerzijo = (req, res) => {
    res.status(200).json({status:"OK"});
}

const novaVerzija = (req, res) => {
    res.render("novaVerzija", {
        title: "Nova verzija",
        p_js: "../javascripts/nova.js",
    });
};*/

const ustvariVerzijo = async (req, res) => {
    let podatki = req.body;
    const knjigaId = req.params.knjigaId;
    const stavekId = req.params.sentenceId;
    const knjiga = await Knjiga.findById(knjigaId).populate("sentences.versions");
    if (knjiga) {
        const stavek = knjiga.sentences.id(stavekId);
        if (!stavek) {
            return res.status(404).json({error: 'Sentence not found'});
        } else {
            stavek.versions.push({
                text: podatki.text
            });
            await knjiga.save();
            res.redirect("/knjige/" + knjigaId);
        }
    }
};

module.exports = {
    izbrisiVerzijo,
    posodobiVerzijo,
    ustvariVerzijo,
}
