const { Router } = require("express");
const { Characters, Comics } = require("../db.js");
const routerCharacters = require("./characters/characters");
const routerComics = require("./comics/comics");

const router = Router();


router.use("/characters", routerCharacters)
router.use("/comics", routerComics)
router.get("/", async (req,res) => {
    const characters = await Characters.findAll();
    res.render("index", {characters})
})

module.exports = router;