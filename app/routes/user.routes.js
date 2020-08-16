module.exports = app => {
    const users = require("../controllers/user.controllers");

    let router = require("express").Router();

    //create a new post
    router.post("/registrasi",users.registrasi);
    router.post("/login",users.login);

    app.use("/api/users", router);
}