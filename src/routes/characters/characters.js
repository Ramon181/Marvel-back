const { Router } = require("express");
const { Characters, Comics } = require("../../db");

const router = Router();

router.get("/create", (req, res) => {
    res.render("characters");
})
router.get("/", async (req, res) => {
    try {
        const characters = await Characters.findAll({
            include: [
                {
                    model: Comics,
                }
            ]
        });
        res.status(200).send(characters)
    } catch (error) {
        console.log(error)
        res.status(200).send({ message: "Ha ocurrido un error" })
    }
});

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const charactersName = await Characters.findOne({ where: { name } });
        if (!charactersName) {
            return res.status(200).send({ message: "Personaje no Encontrado" });
        }
        const character = await Characters.findOne({
            where: { name },
            include: [
                {
                    model: Comics
                }
            ]
        });
        res.status(200).send(character)
    } catch (error) {
        console.log(error)
    }
});

router.post("/", async (req, res) => {
    const { name, description, comics } = req.body;
    const images = req.files;

    try {
        const charactersName = await Characters.findOne({ where: { name } });
        if (charactersName) {
            return res.status(200).send({ message: "Este personaje ya está creado" });
        }

        const mainImage = images[0];

        console.log(mainImage)

        const createCharacter = await Characters.create({
            name: name,
            description: description,
            filename: mainImage ? mainImage.filename : '',
            path: mainImage ? "/img/uploads/" + mainImage.filename : '',
            originalname: mainImage ? mainImage.originalname : '',
            mimetype: mainImage ? mainImage.mimetype : '',
            size: mainImage ? mainImage.size : 0
        });

        if (comics.length > 0) {
            for (let i = 0; i < comics.length; i++) {
                const comicTitle = comics[i].title || '';
                const comicDescription = comics[i].description || '';
                const comicImage = images[i + 1];

                try {
                    await createCharacter.createComic({
                        title: comicTitle,
                        description: comicDescription,
                        filename: comicImage ? comicImage.filename : '',
                        path: comicImage ? "/img/uploads/" + comicImage.filename : '',
                        originalname: comicImage ? comicImage.originalname : '',
                        mimetype: comicImage ? comicImage.mimetype : '',
                        size: comicImage ? comicImage.size : 0
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }

        res.status(200).redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Characters.findByPk(id);
        if (!character) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }

        await Characters.destroy({ where: { id: id } });

        res.status(200).json({ message: "Personaje eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ha ocurrido un error" });
    }
});



module.exports = router