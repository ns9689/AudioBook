const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiKnjigo =  async (req, res) => {
    const izbris = await Knjiga.deleteOne({_id: req.params.knjigaId});
    if (izbris.deletedCount === 0) {
        res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    } else {
        res.sendStatus(204);
    }
};

const izbrisiVseKnjige =  async (req, res) => {
    try {
        await Knjiga.deleteMany({});
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const posodobiKnjigo = (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(200).json({status:"Ok"});
};

const pridobiKnjigo =  (req, res) => {
    Knjiga.findById(req.params.knjigaId,function (err, knjiga) {
        if (knjiga) {
            res.render( "knjiga", {
                title: knjiga.title,
                knjiga: knjiga,
                p_js: "../javascripts/knjiga.js",
            })
        } else if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(404).json({
                message: "Knjiga with id '" + req.params.knjigaId + "' not found"
            });
        }
    });
};

const vseKnjige =  async (req, res) => {
    Knjiga.find({},function (error, knjige) {
        if(!error){
            res.render("knjige", {
                title: "Projekti",
                p_js: "../javascripts/knjige.js",
                knjige: knjige
            })
        }else{
            res.status(404).send("Ni najdeno");
        }
    });
};

const novaKnjiga = (req, res) => {
    res.render("nova", {
        title: "Nova knjiga",
        p_js: "../javascripts/nova.js",
    })
};

const ustvariKnjigo = async (req, res) => {
    let podatki = req.body;
    await Knjiga.create({author: podatki.author, title: podatki.title, originalText: podatki.text, dateCreated: new Date().toJSON().slice(0, 10), state: "table-secondary",
        sentences: [{
            originalText: "text1",
            chosenText: "text1",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {originalText: "text2", chosenText: "text2", chosenAudio: null, state: "table-secondary", versions: [{text: "text21", state: "table-secondary"}, {text: "text22", state: "table-secondary"}, {text: "text23", state: "table-secondary"}]}]},
        function (error, knjiga) {
            if(!error){
                Knjiga.find({},function (error, knjige) {
                    if(!error){
                        const url = "https://tts.true-bar.si/v1/speak";
                        const headers = {
                            "Content-Type": "application/json",
                        };

                        const data = {
                            "userid": "nina",
                            "voice": "ajda",
                            "input_text": "string",
                            "normalize": false,
                            "accentuate": true,
                            "simple_accentuation": true,
                            "use_cache": true,
                            "pace": 1,
                            "tokenize": true,
                            "pause_for_spelling": 0.25
                        };

                        fetch(url, {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(data),
                        })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error('Error:', error));

                        res.redirect("" + knjiga._id);
                    }else{
                        res.status(404).send("Ni najdeno");
                    }
                });
            }else{
                console.log(error);
                res.status(404).send("Not created");
            }
        });
};

module.exports = {
    novaKnjiga,
    vseKnjige,
    posodobiKnjigo,
    ustvariKnjigo,
    izbrisiKnjigo,
    izbrisiVseKnjige,
    pridobiKnjigo,
};