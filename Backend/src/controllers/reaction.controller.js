const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploads");
const Reaction = require("../models/reaction.model");


router.post("/create", async (req, res) => {
        try {

            const reaction = await Reaction.create(req.body);

            return res.status(201).send(reaction);

        }
        catch (err) {
            return res.status(400).send({ error: err.message })
        }
})


router.patch("/edit/:id", async (req, res) => {
    try {

        const reaction = await Reaction.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(201).send(reaction);

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.post("/get", async (req, res) => {
    try {
        let parentId = req.query.parentId;

        const reaction = await Reaction.find({ parent_id: {$eq: parentId} }).lean().exec();

        return res.status(201).send(reaction);

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})
module.exports = router;