var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require("../models/index");
const User = db.user;

//registrasi
exports.registrasi = function (req, res) {
    //Validate request
    if(!req.body.email || !req.body.password) {
        res.status(400).send(
            {
                message: "Content can't be empty"
            }
        );
        return;
    }

    try{
        if(!req.files) {
            res.send({
                status: false,
                message: "NO file uploaded"
            });
        }
        else {
            let ktp = req.files.ktp;

            ktp.mv('./uploads/registrasi/' + ktp.name);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }

    //Create user
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
        password: hash,
        email: req.body.email,
        ktp: req.files.ktp.name
    }

    User.create(user)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while create user"
            })
        });
};

//login
exports.login = function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    User.findOne({where: {email: email} })
        .then((data) => {
            var hasil = bcrypt.compareSync(pass, data.password)
            console.log(hasil);

            if(hasil == true) {
                var secret = "TEXT SECRET LETAKKAN DI ENV";
                var expiresIn = "30 Days"; //123 30d 24h 30 days

                jwt.sign(
                    {id: data.id}, 
                    secret, 
                    {algorithm: "HS256",
                    expiresIn: expiresIn},

                function (err, token) {
                    if (err) {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": "Error occurred while generating token"
                            }
                        });
                    }
                    else {
                        if(token != false) {
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "token": token,
                                    "user": { id: data.id }
                                }
                            });
                            res.end()
                        }
                    }
                });
            }
            else{
                res.send({
                    message: "Email atau Password anda salah"
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving post with id = " + id 
            });
        });
};