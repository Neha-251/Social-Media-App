const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Profilepic = require("../models/profilepic.model");
const fs = require("fs");
const bodyParser = require("body-parser");


// router.post("/create", uploads.single("profile_pic"), async (req, res) => {
//         try {

//             const profilePic = await Profilepic.create({
//                 profile_pic: req.body.profile_pic,
//                 user_id: req.body.user_id
//             })

//             return res.status(201).send({ profilePic: profilePic });
//         }
//         catch (err) {
//             return res.status(400).send({ error: err.message })
//         }
//  })


router.post("/create", uploads.single("profile_pic"), (req, res) => {
    try {

        const profilePic = Profilepic({
            profile_pic: {
                data: fs.readFileSync("src/uploads/" + req.file.filename),
                contentType: "image/png"

            },
            user_id: req.body.user_id
        });
        profilePic.save().then(console.log("image saved")).catch(err=>console.log("error", err))

        return res.status(201).send({ profilePic: profilePic });
    }
    catch (err) {
        return res.status(400).send({ error: "error" })
    }
})

router.delete("/delete", uploads.single("profile_pic"), async (req, res) => {
    try {
        let userId = req.query.userId;

        const profilePic = await Profilepic.findOneAndDelete({"user_id": {$eq: userId}}).lean().exec();
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
       // return res.status(200).download(profilePic.profile_pic);
       return res.status(200).send(profilePic.profile_pic);
    } catch (error) {
        res.status(500).send({ error: "error" });
    }
})


module.exports = router;