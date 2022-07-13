const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Profilepic = require("../models/profilepic.model");
const fs = require("fs");
const bodyParser = require("body-parser");
const cloudinary = require("../middleware/cloudinary");
require('dotenv').config()
const path = require("path");
const { profile } = require("console");



router.post("/create", uploads.single("profile_pic"), async (req, res) => {
    try {
        
       // console.log('req.file', req.file)

       // console.log('req.file.path', req.files)
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log('result', result)
        

        const profilepic = await Profilepic.create({
            profile_pic: result.secure_url,
            cloudinary_id: result.public_id,
            user_id: req.body.user_id
        })

        return res.status(201).send(profilepic);
    }
    catch (err) {
        console.log('err', err)
        return res.status(410).send({ error: err.message })
    }
})

router.delete("/delete", uploads.single("profile_pic"), async (req, res) => {
    try {
        let userId = req.query.userId;

        const profilePic = await Profilepic.findOneAndDelete({"user_id": {$eq: userId}}).lean().exec();
        await cloudinary.uploader.destroy(profilePic.cloudinary_id);
        console.log("deleted")
        return res.status(201).send("deleted");
    } catch (error) {
        res.status(500).send({ error: "error" });
    }
});



router.get("/get/single", async(req, res) => {
    try {
        let userId = req.query.userId;

        const profilePic = await Profilepic.findOne({user_id: { $eq: userId }}).lean().exec();
        return res.status(200).send(profilePic.profile_pic);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


module.exports = router;