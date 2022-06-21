const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Profilepic = require("../models/profilepic.model");


router.post("/create", uploads.single("profile_pic"), async (req, res) => {
        try {

            const profilePic = await Profilepic.create({
                profile_pic: req.file.path,
                user_id: req.body.user_id
            })

            return res.status(201).send({ profilePic: profilePic });
        }
        catch (err) {
            return res.status(400).send({ error: err.message })
        }
 })



router.patch("/edit", uploads.single("profile_pic"), async (req, res) => {
    try {
        let userId = req.query.userId;

        const profilePic = await Profilepic.findOneAndUpdate(
             { "user_id": userId},
             { $set: { "profile_pic": req.file.path }},
             { sort: { "points" : 1 }, upsert:true, returnNewDocument : true }
        )
        return res.status(201).send(profilePic );
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get("/get/single", async(req, res) => {
    try {
        let userId = req.query.userId;

        const profilePic = await Profilepic.find({user_id: { $eq: userId }}).lean().exec();
        return res.status(200).send(profilePic );
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
module.exports = router;