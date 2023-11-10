const mongoose = require("mongoose");
const Knjiga = mongoose.model("Knjiga");

const izbrisiKnjigo =  (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(204).json({status:"OK"});
};

const posodobiKnjigo = (req,res) => {
    //res.render("index", {title:"NovaKnjiga!"});
    res.status(200).json({status:"Ok"});
};

const pridobiKnjigo =  (req, res) => {
    Knjiga.findById(req.params.knjigaId,function (err, knjiga) {
        if (!err) {
            res.status(200).json(knjiga);
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
            //res.status(200).json(knjige);
            res.render("knjige", {
                title: "novo",
                p_js: "knjige.js",
                knjige: knjige
            })
        }else{
            res.status(404).send("Ni najdeno");
        }
    });
};

const novaKnjiga = async (req, res, podatki) => {
    let state = "table-primary";
    if (podatki.state === 1) {
        state = "table-secondary";
    } else if (podatki.state === 2) {
        state = "table-success";
    }
    const knjiga = await Knjiga.create({author: podatki.author, title: podatki.title, originalText: podatki.text, dateCreated: new Date().toJSON().slice(0, 10), state: state},
        function (error, knjiga) {
            if(!error){
                console.log(knjiga);
                res.status(201).json(knjiga);
            }else{
                res.status(404).send("Not created");
            }
        });
};

module.exports = {
    novaKnjiga,
    vseKnjige,
    posodobiKnjigo,
    izbrisiKnjigo,
    pridobiKnjigo,
};