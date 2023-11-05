const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiKnjigo =  (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(204).json({status:"OK"});
};

const posodobiKnjigo = (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(200).json({status:"K"});
};

const pridobiKnjigo =  async (req, res) => {
    Knjiga.find({}, function (knjige) {
        console.log(knjige);
    });
    await Knjiga.findById(req.params.knjigaId)
        .exec((err, knjiga) => {
            if (!err) {
                res.status(200).json(knjiga);
                console.log(req.params);
                console.log(req.params.knjigaId);
                console.log("empty");
                console.log(knjiga);
            } else {
                res.status(404).json({
                    message: "Knjiga with id '" + req.params.knjigaId + "' not found"
                });
            }
        })
    /*.then(knjiga => {
        if (knjiga) {
            console.log(req.params.knjigaId);
            res.status(200).json(knjiga);
        } else {
            console.log(req.params);
            console.log(req.params.knjigaId.toString());
            console.log("empty");
            console.log(knjiga);
        }
    }).catch((err) => {
        if (err) res.status(500).json({message: "moj " + err.message});
        else
            res.status(404).json({
                message: "Knjiga with id " + req.params.knjigaId + "not found"
            });
    })*/
    //res.render("index", {title:"Pridobi knjigo!"});
};

const vseKnjige =  (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(200).json({status:"OK"});
};

const novaKnjiga = (req, res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(201).json({status:"OK"});
};

/*const knjiga = (req, res) => {
    res.render("index", {title:"Knjiga!"});
    res.status(200).json({status:"OK"});
};

const projekti = (req, res) => {
    res.render("index", {title:"Knjige!"});
    res.status(200).json({status:"OK"});
};*/

module.exports = {
    //knjiga,
    novaKnjiga,
    //projekti,
    vseKnjige,
    posodobiKnjigo,
    izbrisiKnjigo,
    pridobiKnjigo,
};