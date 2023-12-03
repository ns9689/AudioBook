const express = require("express");
const router = express.Router();


const ctrlKnjiga = require("../controllers/knjige");
//const ctrlUporabnik = require("../controllers/uporabniki");
const ctrlStavek = require("../controllers/stavki");
const ctrlVerzija = require("../controllers/verzije");


/**
 * Knjige
 */
router.get("/knjige/novaKnjiga", ctrlKnjiga.novaKnjiga);
router.post("/knjige/novaKnjiga", ctrlKnjiga.ustvariKnjigo);
router.get("/knjige/", ctrlKnjiga.vseKnjige);
router.delete("/knjige/izbrisiKnjige", ctrlKnjiga.izbrisiVseKnjige);
router.get("/knjige/:knjigaId", ctrlKnjiga.pridobiKnjigo);
router.put("/knjige/:knjigaId/uredi", ctrlKnjiga.posodobiKnjigo);
router.delete("/knjige/:knjigaId", ctrlKnjiga.izbrisiKnjigo);

/**
 * Stavki
 */
router.post("/knjige/:knjigaId/sentences", ctrlStavek.novStavek);
//router.get("/knjige/:knjigaId/sentences", ctrlStavek.vsiStavki);
//router.get("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.pridobiStavek);
router.put("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.posodobiStavek);
router.delete("/knjige/:knjigaId/sentences/:sentenceId", ctrlStavek.izbrisiStavek);

/**
 * Verzije stavka
 */
//router.get("/knjige/:knjigaId/sentences/:sentenceId", ctrlVerzija.novaVerzija);
router.post("/knjige/:knjigaId/sentences/:sentenceId/versions", ctrlVerzija.ustvariVerzijo);
//router.get("/knjige/:knjigaId/sentences/:sentenceId/:optionId", ctrlVerzija.pridobiVerzijo);
router.post("/knjige/:knjigaId/sentences/:sentenceId/versions/:versionId", ctrlVerzija.posodobiVerzijo);
//ce je izbrana nova verzija za glavno verzijo, se sprozi posodobitev stavka
router.delete("/knjige/:knjigaId/sentences/:sentenceId/versions/:versionId", ctrlVerzija.izbrisiVerzijo);


// router.get('/', ctrlUporabnik.prijava);
//router.get('/', ctrlUporabnik.registracija);

module.exports = router;