const db = require("../models/index");
const Order = db.order;
const Op = db.Sequelize.Op;

//tambah order
exports.tambahOrder = function (req, res) {
    //Validate request
    if(!req.body.nama || !req.body.tanggal || !req.body.harga) {
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
            let struck = req.files.struck;

            struck.mv('./uploads/orders/' + struck.name);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }

    //Create order
    const order = {
        nama: req.body.nama,
        //format tanggal yyyy-mm-dd saat akan menambahkan data
        tanggal: req.body.tanggal,
        harga: req.body.harga,
        struck: req.files.struck.name
    }

    Order.create(order)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while create order"
            })
        });
};

//ubah order
exports.ubahOrder = (req, res) => {
    const id = req.params.id;

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let struck = req.files.struck;

            Order.update({
                nama: req.body.nama,
                //format tanggal yyyy-mm-dd saat akan mengubah data
                tanggal: req.body.tanggal,
                harga: req.body.harga,
                struck: req.files.struck.name

            }, {
                where: { id: id }
            }).then((result) => {
                if (result == 1) {
                    struck.mv('./uploads/orders/' + struck.name);
                    //send response
                    res.send({
                        status: true,
                        message: 
                        'Data Berhasil Diubah',
                        data: {
                            nama: req.body.nama,
                            tanggal: req.body.tanggal,
                            harga: req.body.harga,
                            struck: req.files.struck.name
                        }
                    });
                } else {
                    res.send({
                        message: 
                        `Cannot update Order with id = ${id}`
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: `Error updating post id = ${id}`
                })
            })

        }
    } catch (err) {
        res.status(500).send(err);
    }
};

//cari order
exports.cariOrder = (req, res) => {
    const nama = req.query.nama;
    let condition = 
    nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
    Order.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find order"
            })
        });
};