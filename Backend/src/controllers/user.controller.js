const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/users.model");
require('dotenv').config()



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
    
    async (req, res) => {
        try {

            const errors = validationResult(req);
            //console.log('errors', errors)
            

            if (!errors.isEmpty()) {
                return res.status(500).send({ errors: errors.array() });
            } 

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
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

            const auth_token = jwt.sign(data, process.env.JWT_SECRET)
            
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
      //  const password = req.body.password;
       // console.log('password', password)
        let user = await User.findOne({email: {$eq: email}}).lean().exec();

        if(user){
            const passwordCompare = bcrypt.compare(req.body.password, user.password, function(err, result) {
                // console.log(result);
                // console.log(err);
                if(result === false){
                   return res.status(400).send({error: "Please try to login with correct credentials"})
                } else {
                    const data =  {
                        user: {
                            id: user.id
                        }
                    }
                   const auth_token = jwt.sign(data, process.env.JWT_SECRET)
                   return res.status(200).send({ authtoken: auth_token });
                   // return res.send(user);
                }
            })
        } else {
            return res.status(400).send({"error": "Wrong Credentials"})
        }
       

    }
    catch(err) {
        res.status(400).send({ error: err.message });
    }
})







module.exports = router;