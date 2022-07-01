const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/users.model");
require('dotenv').config();




router.get("", async(req, res) => {
    try{
        const user = await User.find().lean().exec();
        return res.status(200).send(user);
    }
    catch(err) 
    {
        return res.status(400).send({ error: err.message })
    }
})

router.get("/single", async(req, res) => {
    try{
        let emailId = req.query.emailId;

       // const user = await User.find().lean().exec();
        const user = await User.findOne({email: { $eq: emailId }}).lean().exec();
        if(!user){
            return res.status(410).send("user not found")
        }
        return res.status(200).send( user);
    }
    catch(err) 
    {
        console.log('err', err)
        return res.status(420).send({ error: "err.message" })
    }
})

router.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user);
    }
    catch(err) 
    {
        return res.status(400).send({ error: err.message })
    }
})


router.post("/signup", 
    
    async (req, res) => {
        try {

            //const errors = validationResult(req);
            //console.log('errors', errors)
            

            // if (!errors.isEmpty()) {
            //     return res.status(500).send({ errors: errors.array() });
            // } 
            const JWT_SECRET =  "nehasen@secret";
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                city: req.body.city,
                password: secPass,
                dob: req.body.dob
            })

           // return res.send(user)

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
       const JWT_SECRET =  "nehasen@secret";
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