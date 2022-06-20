const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const uploads = require("../middleware/uploads");
const User = require("../models/users.model");

JWT_SECRET =  "nehasen@secret";

router.post("/signup",  [
    body("email")
    .isEmail()
    .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
            throw new Error("Email is already registerd");
        }
        return true;
    })],
    uploads.single("profile_pic"),
    async (req, res) => {
        try {

            const errors = validationResult(req);
            console.log('errors', errors)
            

            if (errors.isEmpty()) {
                return res.status(500).send({ errors: errors.array() });
            } 

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                profile_pic: req.file.path,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                city: req.body.city,
                password: secPass,
                dob: req.body.dob
            })

            const data =  {
                user: {
                    id: user.id
                }
            }

            const auth_token = jwt.sign(data, JWT_SECRET)
            
            return res.status(200).send({ authtoken: auth_token });

        }
        catch (err) {
            return res.status(400).send({ error: err.message })
        }
})


// Verify user by login,


router.post("/login", async (req, res) => {
    
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log('password', password)
        let user = await User.findOne({email: {$eq: email}});
        const passwordCompare = await bcrypt.compare(password, user.password);
        console.log('passwordCompare', passwordCompare)

        if(!passwordCompare){
            res.status(400).send({error: "Please try to login with correct credentials"})
        }

        const data =  {
            user: {
                id: user.id
            }
        }

        const auth_token = jwt.sign(data, JWT_SECRET)
            
        return res.status(200).send({ authtoken: auth_token });

    }
    catch(err) {
        res.status(400).send({ error: err.message });
    }
})





router.get("/getAll", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send({ user: user });

    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.get("/getOne/:id", async (req, res) => {
    try {
        const user = await User.find(req.params.id).lean().exec();
        return res.status(200).send({ user: user });
    }
    catch (err) {
        return res.status(400).send({ error: err.message })
    }
})

router.patch("/:id/edit", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, }).lean().exec();
        return res.status(201).send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch("/:id/edit/profilepic", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, }).lean().exec();
        return res.status(201).send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;