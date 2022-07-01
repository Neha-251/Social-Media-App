const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Post = require("../models/post.model");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");



router.post("/create", uploads.any("post_file"), async (req, res) => {
        try {
            console.log("files", req.files);

            let post_files = [];
            // let profile_pic = {};
            for(let i = 0; i < req.files.length; i++) {
                if(req.files[i].fieldname === "post_file"){
                    post_files.push(await cloudinary.uploader.upload(req.files[i].path));
                }// } else {
                //     profile_pic = await cloudinary.uploader.upload(req.files[i].path);
                // }
            }

            let post_files_arr = [];
            let post_files_publicId_arr = [];
            console.log('post_files_publicId_arr', post_files_publicId_arr)

            // let profile_pic_obj = profile_pic.secure_url;
             console.log('post_files', post_files)
            // console.log('profile_pic_obj', profile_pic_obj)
            // let profile_pic_publicId_obj = profile_pic.public_id;

            for(let i = 0; i < post_files.length; i++) {
                post_files_arr.push(post_files[i].secure_url);
                post_files_publicId_arr.push(post_files[i].public_id);
            }

        
            const post = await Post.create({
                post_file: post_files_arr,
                post_cloudinary_id: post_files_publicId_arr,
                title: req.body.title,
                description: req.body.description,
                parent_id: req.body.parent_id,
                user_id: req.body.user_id,
                reaction_id: req.body.reaction_id,
                comment_id: req.body.comment_id,
                profile_img: req.body.profile_img,
            })


            if(post){
                console.log("postimage saved")
                return res.status(201).send({ message: "You have successfully posted a post" });
            } else {
                console.log("post image not saved")
            }
            

        }
        catch (err) {
            console.log('err', err)
            return res.status(420).send({ error: err.message })
        }
})




router.get("/get/all", async(req, res) => {
    try {
        let page = req.query.page || 6;
        let pagesize = req.query.pagesize || 5;
        let sort = req.query.sort;

        const skip = (page - 1) * pagesize;

        const post = await Post.find().skip(skip).limit(pagesize).sort({ _id: sort }).populate("user_id").populate("reaction_id").populate("comment_id").lean().exec();
        const total_pages = Math.ceil(await Post.find().countDocuments()) / pagesize;

        console.log("called post")
        return res.status(200).send({post: post, total_pages});

        
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