const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Post = require("../models/post.model");


router.post("/create/single", uploads.single("post_file"), async (req, res) => {
        try {

            const post = await Post.create({
                post_file: req.file.path,
                title: req.body.title,
                description: req.body.description,
                user_id: req.body.user_id
            })

            return res.status(201).send({ message: "You have successfully posted a post" });

        }
        catch (err) {
            return res.status(400).send({ error: err.message })
        }
})



router.post("/create/multiple", uploads.any("post_file"), async (req, res) => {
    try {
        
        const filePaths = req.files.map((file) => {
            return file.path;
        });

        const post = await Post.create(
            {
                post_file: filePaths,
                title: req.body.title,
                description: req.body.description,
                user_id: req.body.user_id
            }
        )
        return res.status(201).send({ message: "You have successfully posted a post" });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/get/all", async(req, res) => {
    try {
        const post = await Post.find().lean().exec();
        return res.status(200).send({post: post} );
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


router.get("/get/user", async(req, res) => {
    try {
        let userId = req.query.userId;

        const post = await Post.find({user_id: { $eq: userId }}).lean().exec();
        return res.status(200).send({post: post});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

router.get("/get/single/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean().exec();
        return res.status(200).send({post: post});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
module.exports = router;