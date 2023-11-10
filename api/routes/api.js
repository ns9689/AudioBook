const express = require("express");
const router = express.Router();


const ctrlKnjiga = require("../controllers/knjige");
//const ctrlUporabnik = require("../controllers/uporabniki");
const ctrlStavek = require("../controllers/stavki");
const ctrlVerzija = require("../controllers/verzije");


/**
 * Knjige
 */
//router.post("/knjige/", ctrlKnjiga.novaKnjiga);
router.get("/knjige/", ctrlKnjiga.vseKnjige);
router.get("/knjige/:knjigaId", ctrlKnjiga.pridobiKnjigo);
router.put("/knjige/:knjigaId", ctrlKnjiga.posodobiKnjigo);
router.delete("/knjige/:knjigaId", ctrlKnjiga.izbrisiKnjigo);

/**
 * Stavki
 */
router.post("/knjige/:knjigaId/sentences", ctrlStavek.novStavek);
router.get("/knjige/:knjigaId/sentences", ctrlStavek.vsiStavki);
router.get("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.pridobiStavek);
router.put("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.posodobiStavek);
router.delete("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.izbrisiStavek);

/**
 * Verzije stavka
 */
router.post("/knjige/:knjigaId/sentences/:sentenceId", ctrlVerzija.novaVerzija);
router.get("/knjige/:knjigaId/sentences/:sentenceId/:optionId", ctrlVerzija.pridobiVerzijo);
router.put("/knjige/:knjigaId/sentences/:sentenceId/:optionId", ctrlVerzija.posodobiVerzijo);
//ce je izbrana nova verzija za glavno verzijo, se sprozi posodobitev stavka
router.delete("/knjige/:knjigaId/sentences/:sentenceId", ctrlVerzija.izbrisiVerzijo);

//router.get('/', ctrlUporabnik.prijava);
//router.get('/', ctrlUporabnik.registracija);

module.exports = router;