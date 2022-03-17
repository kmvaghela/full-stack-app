const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const Image = require("../models/Image");

//CREATE 
router.post("/",verifyToken, async (req, res) => {
    const newImage = new Image(req.body)
    try {
        const savedImage = await newImage.save();
        res.status(200).json(savedImage);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL 
router.get("/", async (req, res) => {

    try {
        let images;
        const qCategory = req.query.category;

        images = await Image.find();

        if (qCategory) {
            images = await Image.find({
                category: { $in: [qCategory] },
            })
        } else {
            images = await Image.find();
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                img: req.body.img,
                category: req.body.category,
                contributor: req.body.contributor,
                downloads: req.body.downloads,
            }
        );
        res.status(200).json(updatedImage);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;