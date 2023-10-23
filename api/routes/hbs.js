const express = require("express");
const router = express.Router();


const ctrlKnjiga = require("../controllers/knjige");
const ctrlUporabnik = require("../controllers/uporabniki");

router.get("/", ctrlKnjiga.projekti);
router.get("/knjiga", ctrlKnjiga.knjiga);
router.get("/knjiga/new", ctrlKnjiga.novaKnjiga);
//router.get('/', ctrlUporabnik.prijava);
//router.get('/', ctrlUporabnik.registracija);

module.exports = router;