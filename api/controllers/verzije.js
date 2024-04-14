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
            const verzijaId = stavek.versions.findIndex((version) => version._id == req.params.versionId);
            const verzija = stavek.versions.id(req.params.versionId);
            const verzijaState = verzija.state;
            stavek.versions.splice(verzijaId, 1);
            //if (verzijaState === "green") {
            if (stavek.versions.length < 1 || verzijaState === "green") {
                stavek.chosenText = stavek.originalText;
                stavek.versions.length < 1 ? stavek.state = "" : stavek.state = "grey";
            }
            await knjiga.save();
            res.sendStatus(204);
        }
    }
};

const posodobiVerzijo = async (req, res) => { //naredi PUT, zdaj je POST!!!!!!! DONE, se vedno post, ampak samo posodobitev
    let podatki = req.body;
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
            console.log(verzija);
            if (!verzija) {
                return res.status(404).json({error: 'Version not found'});
            } else {
                if (podatki.izbranaVerzija === "true") {
                    //izberi verzijo
                    if (verzija.state === "green") {
                        //DO NOTHING, ce je ze od prej izbrana
                    } else {
                        for (let i = 0; i < stavek.versions.length; i++) {
                            stavek.versions[i].state = "";
                        }
                        verzija.state = "green";
                        stavek.chosenText = verzija.text;
                        stavek.state = "green";
                    }
                    //posodobi stavek z novo vsebino + naredi zelen stavek + zelena verzija
                } else if (podatki.izbranaVerzija === "false") {
                    //odizberi verzijo
                    if (verzija.state !== "green") {
                        //DO NOTHING, ce verzija prej sploh ni bila izbrana
                    } else {
                        verzija.state = "table-secondary";
                        stavek.state = "grey";
                        stavek.chosenText = stavek.originalText;
                        //posodobi stavek z novo vsebino + naredi zelen stavek + zelena verzija
                    }
                } else {
                    //samo posodobitev texta
                    verzija.text = podatki.text;
                    if (verzija.state === "green") {
                        stavek.chosenText = verzija.text;
                    }
                }
            }
            await knjiga.save();
            res.redirect("/knjige/" + knjigaId);
        }
    } else {
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
            if (stavek.versions.length < 2) {
                stavek.state = "grey";
            }
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
