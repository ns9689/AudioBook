const knjiga = (req, res) => {
    res.render("index", {title:"Knjiga!"});
};

const novaKnjiga = (req, res) => {
    res.render("index", {title:"NovaKnjiga!"});
};

const projekti = (req, res) => {
    res.render("index", {title:"Projekti!"});
};

module.exports = {
    knjiga,
    novaKnjiga,
    projekti
};