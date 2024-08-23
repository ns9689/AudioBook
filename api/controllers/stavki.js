const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const novStavek = (req, res) =>  {
    res.render("nova", {
        title: "Nova knjiga",
        p_js: "../javascripts/nova.js",
    })
}

const posodobiStavek = (req, res) => {
    res.status(200).json({status:"OK"});
}

const izbrisiStavek = async (req, res) => {
    const knjiga = await Knjiga.findById(req.params.knjigaId);
    if (!knjiga) {
        res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    } else {
        const stavek = knjiga.sentences.findIndex((sentence) => sentence._id == req.params.sentenceId);
        if (stavek === -1) {
            res.status(404).json({
                message: "Stavek with id '" + req.params.sentenceId + "' does not exist"
            });
        } else {
            knjiga.sentences.splice(stavek, 1);
            await knjiga.save();
            res.sendStatus(204);
        }
    }
}

const pridobiStavek = async (req, res) => {
    await Knjiga.findById(req.params.knjigaId, function (err, knjiga) {
        if (!knjiga) {
            res.status(404).json({
                message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
            });
        } else {
            const stavek = knjiga.sentences.find(sentence => sentence._id == req.params.sentenceId);
            if (stavek === -1) {
                res.status(404).json({
                    message: "Stavek with id '" + req.params.sentenceId + "' does not exist"
                });
            } else {
                res.render( "stavek", {
                    stavek: stavek
                })
            }
        }
    });
};

const vsiStavki =  async (req, res) => {
    Knjiga.findById(req.params.knjigaId,function (err, knjiga) {
        if (knjiga) {
            let segments = knjiga.sentences.map((sentence, index) => ({
                rowId: index,
                rowStatus: "confirmed",
                rowText: sentence.chosenText || sentence.originalText || "",
                pauseAfterPeriod: 0.1,
                pauseAfterComma: 0.5,
                pace: parseFloat(knjiga.settings[0].tempo),
                voice: knjiga.settings[0]?.govorec || "ajda", // Assuming the first setting defines the voice
            }));
            res.json({ segments });
        } else if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(404).json({
                message: "Knjiga with id '" + req.params.knjigaId + "' not found"
            });
        }
    });
};

module.exports = {
    novStavek,
    posodobiStavek,
    izbrisiStavek,
    pridobiStavek,
    vsiStavki,
}