const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiKnjigo =  async (req, res) => {
    const izbris = await Knjiga.deleteOne({_id: req.params.knjigaId});
    console.log(izbris);
    if (izbris.deletedCount === 0) {
        res.status(404).json({
            message: "Knjiga with id '" + req.params.knjigaId + "' does not exist"
        });
    } else {
        res.redirect("/" + "knjige");
    };
};

const izbrisiVseKnjige =  async (req, res) => {
    await Knjiga.deleteMany({});
    res.status(204).json({status: "OK"});
};

const posodobiKnjigo = (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(200).json({status:"Ok"});
};

const pridobiKnjigo =  (req, res) => {
    Knjiga.findById(req.params.knjigaId,function (err, knjiga) {
        if (!err) {
            res.render( "knjiga", {
                title: knjiga.title,
                knjiga: knjiga,
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
                title: "Naslov",
                p_js: "knjige.js",
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
        p_js: "knjige.js",
    })
};

const ustvariKnjigo = async (req, res) => {
    //console.log(req.body);
    let podatki = req.body;
    await Knjiga.create({author: podatki.author, title: podatki.title, originalText: podatki.text, dateCreated: new Date().toJSON().slice(0, 10), state: "table-secondary"},
        function (error, knjiga) {
            if(!error){
                Knjiga.find({},function (error, knjige) {
                    if(!error){
                        res.redirect("" + knjiga._id);
                    }else{
                        res.status(404).send("Ni najdeno");
                    }
                });
            }else{
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