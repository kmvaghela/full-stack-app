const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndContributor, verifyTokenAndNormalUser } = require("./verifyToken");
const Image = require("../models/Image");

//CREATE 
router.post("/", verifyTokenAndContributor, async (req, res) => {
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
                category:{$in: [qCategory]},
            })
        } else {
            images = await Image.find();
        }

        res.status(200).json(images);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;