const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Post = require("../models/post.model");
const fs = require("fs");
const { send } = require("process");

router.post("/create/single", uploads.any("post_file"), async (req, res) => {
        try {
            console.log("files", req.files);

            const post = await Post.create({
                post_file: {
                    data: fs.readFileSync("src/uploads/" + req.files[0].filename),
                    contentType: "image/png"
                },
                profile_img: {
                    data: fs.readFileSync("src/uploads/" + req.files[1].filename),
                    contentType: "image/png"
                },
                title: req.body.title,
                description: req.body.description,
                parent_id: req.body.parent_id,
                user_id: req.body.user_id,
                reaction_id: req.body.reaction_id,
                comment_id: req.body.comment_id
            })
           // post.save().then(console.log("postimage saved")).catch(err=>console.log("error", err))


            //return res.send(post);
            if(post){
                console.log("postimage saved")
                return res.status(201).send({ message: "You have successfully posted a post" });
            } else {
                console.log("post image not saved")
            }
            

        }
        catch (err) {
            return res.status(420).send({ error: err.message })
        }
})



// router.post("/create/multiple", uploads.any("post_file"), async (req, res) => {
//     try {
        
//         const filePaths = req.files.map((file) => {
//             return file.path;
//         });

//         const post = await Post.create(
//             {
//                 post_file: filePaths,
//                 title: req.body.title,
//                 description: req.body.description,
//                 user_id: req.body.user_id
//             }
//         )
//         return res.status(201).send({ message: "You have successfully posted a post" });

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ error: error.message });
//     }
// });

router.get("/get/all", async(req, res) => {
    try {
        const post = await Post.find().populate("user_id").populate("reaction_id").populate("comment_id").lean().exec();
        return res.status(200).send({post: post});

        
    } catch (error) {
        console.log(error)
        res.status(410).send({ error: error.message });
    }
})


router.get("/get/user", async(req, res) => {
    try {
        let userId = req.query.userId;

        const post = await Post.find({user_id: { $eq: userId }}).lean().exec();
        return res.status(200).send("ok");

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