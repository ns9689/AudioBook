const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");
const mammoth = require('mammoth');

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

function extractTextFromDocx(docxFile) {
    return new Promise((resolve, reject) => {
        mammoth.extractRawText({ path: docxFile })
            .then(result => {
                resolve(result.value);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const ustvariKnjigo = async (req, res) => {
    let podatki = req.body;
    let file = req.file;
    let textToUse = "";
    const contentType = file.mimetype;
    if (contentType === 'application/msword' || contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        //proceed
    } else {
        return res.status(400).json({ error: 'Uploaded file is not a Word document' });
    }
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    if (fileExtension === "docx") {
        await extractTextFromDocx(file.path)
            .then(text => textToUse = text)
            //.then(text => console.log(text.split(/(?<=[.!?"”])\s+/)))
            .catch(error => console.error(error));
    } else if (fileExtension === "doc") {
        //not yet supported
    } else {
        console.error("Unsupported file type");
    }
    textToUse = textToUse.split(/(?<=[.!?"”\]\n])\s+/);

    const mappedSentences = textToUse.map(sentence => ({
        originalText: sentence,
        chosenText: sentence,
        chosenAudio: null,
        state: "table-secondary" // Set the default state for each sentence
    }));

    await Knjiga.create({
            author: podatki.author,
            title: podatki.title,
            originalText: podatki.text,
            dateCreated: new Date().toJSON().slice(0, 10),
            state: "table-secondary",
            file: file,
            sentences: mappedSentences,
            /*[{
            originalText: "Rada",
            chosenText: "Rada",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: "te",
            chosenText: "te",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: "imam",
            chosenText: "imam",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: "<3",
            chosenText: "<3",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: " ",
            chosenText: " ",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: "Tvoja",
            chosenText: "Tvoja",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }, {
            originalText: "lumpa",
            chosenText: "lumpa",
            chosenAudio: null,
            state: "table-secondary",
            versions: [{text: "text11", state: "table-secondary"}, {text: "text12", state: "table-secondary"}]
        }]*/},
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