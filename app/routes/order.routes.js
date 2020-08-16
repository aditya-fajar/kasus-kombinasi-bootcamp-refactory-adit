const { isAuth } = require('../middleware/auth');

module.exports = app => {
    const auth = require('../middleware/auth');
    const orders = require("../controllers/order.controllers");

    let router = require("express").Router();

    //create a new post
    router.post("/tambah",orders.tambahOrder);
    router.get("/cari",orders.cariOrder);
    router.put("/ubah/:id",orders.ubahOrder);

    app.use("/api/orders", auth.isAuth, router);
}