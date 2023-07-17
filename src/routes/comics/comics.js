const { Router } = require("express");
const { Comics } = require("../../db");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const comics = await Comics.findAll();
        res.status(200).send(comics)
    } catch (error) {
        console.log(error)
        res.status(200).send({ message: "Ha ocurrido un error" })
    }
});

module.exports = router