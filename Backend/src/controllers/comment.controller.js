const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");


router.post("/create", async (req, res) => {
        try {
            const comment = await Comment.create(req.body);
            return res.status(201).send(comment);

        }
        catch (err) {
            return res.status(400).send({ error: err.message })
        }
})


router.patch("/add", async (req, res) => {
    try {
        let parentId = req.query.parentId;

        const comment = await Comment.findOneAndUpdate({parent_id: {$eq: parentId}}, req.body, {new: true}).lean().exec();
        
        return res.status(201).send(comment);
    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})


router.get("/get", async (req, res) => {
    try {
        let parentId = req.query.parentId;

        const comment = await Comment.findOne({parent_id: {$eq: parentId}}).populate("comments.user_id").lean().exec();

        return res.status(201).send(comment);

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.patch("/edit/:id", async (req, res) => {
    try {

        const comment = await Comment.findOneAndUpdate(
            { "_id": req.params.id },
            { $push: { "comments": { "user_id": req.body.user_id, "comment": req.body.reaction }}}
        )

        return res.status(201).send(comment);

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.delete("/get", async (req, res) => {
    try {
        let parentId = req.query.parentId;
        let commentId = req.query.commentId;

        const comment = await Comment.findOneAndDelete({parent_id: {$eq: parentId}}, { $pull: { "comments._id": commentId}});

        return res.status(201).send("The Comment has been deleted");

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})


module.exports = router;