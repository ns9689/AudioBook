const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiVerzijo = async (req, res) => {
    const knjiga = await Knjiga.findById(req.params.knjigaId);
    if (!knjiga) {
        return res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    } else {
        const stavek = knjiga.sentences.id(req.params.sentenceId);
        if (!stavek) {
            return res.status(404).json({error: "Sentence not found"});
        } else {
            const verzija = stavek.versions.findIndex((version) => version._id == req.params.versionId);
            stavek.versions.splice(verzija, 1);
            await knjiga.save();
            res.sendStatus(204);
        }
    }
};

const posodobiVerzijo = async (req, res) => { //naredi PUT, zdaj je POST!!!!!!!
    let podatki = req.body;
    console.log(podatki);
    const knjigaId = req.params.knjigaId;
    const stavekId = req.params.sentenceId;
    const verzijaId = req.params.versionId;
    const knjiga = await Knjiga.findById(knjigaId).populate("sentences.versions");
    if (knjiga) {
        const stavek = knjiga.sentences.id(stavekId);
        if (!stavek) {
            return res.status(404).json({error: 'Sentence not found'});
        } else {
            const verzija = stavek.versions.id(verzijaId);
            stavek.versions.push({
                text: podatki.text
            });
            await knjiga.save();
            res.redirect("/knjige/" + knjigaId);
        }
    }else {
        res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    }
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
    } else {
        res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    }
};

module.exports = {
    izbrisiVerzijo,
    posodobiVerzijo,
    ustvariVerzijo,
}
