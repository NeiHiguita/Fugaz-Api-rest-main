const express = require('express')
const router = express.Router(); 

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemacompra = new eschema({
    buy_date: {type: Date, required: true},
    price_total:{type: Number,required: true},
    payment_methods: {type: String, required: true},
    quantity: {type: Number,required: true},
    subtotal: {type: Number,  required: true},
    name_category: {type: String,required: true},
    name_input: {type: String, required: true},
    stock: {type: Number,required: true},
    unit_price: { type: Number,required: true},
    status_input: {type: String,required: true,
        enum: ['agotado', 'disponible'], // Por defecto, se establece como disponible
    },
    type: {type: String,required: true,
        enum: ['natural', 'empresa']},
    full_name: {type: String, required: function() {
          return this.type === 'natural';}},
    document: {type: String, required: function() {
          return this.type === 'natural'; }},   
    rut: {type: String, required: function() {
          return this.type === 'empresa';}}, 
    legal_representative_name: {type: String, required: function() {
        return this.type === 'empresa';}},
    phone: {type: String, required: true},
    address: {type: String,required: true},
    statuspro: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo' 
    },
    idbuy: String
});
const ModeloCompra = mongoose.model('compra', eschemacompra)
module.exports = router;

/* prueba
router.get('/ejemplo', (req,res) => {
    res.end('cargando');
});*/

//agregar usuario
router.post('/Agregarcompra', (req,res) => {
    const nuevacompra = new ModeloCompra({
        buy_date: req.body.buy_date,
        price_total: req.body.price_total,
        payment_methods: req.body.payment_methods,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        name_category: req.body.name_category,
        name_input: req.body.name_input,
        stock: req.body.stock,
        unit_price: req.body.unit_price,
        status_input: req.body.status_input,
        type: req.body.type,
        full_name: req.body.full_name,
        document: req.body.document,
        rut: req.body.rut,
        legal_representative_name: req.body.legal_representative_name,
        phone: req.body.phone,
        address: req.body.address,
        statuspro: req.body.statuspro === 0 ? 'Inactivo' : 'Activo',
        idbuy: req.body.idbuy
    })
    nuevacompra.save()
    .then(() => {
        res.send('Compra agregada correctamente');
        if (nuevacompra.stock === nuevacompra.quantity) {
            nuevacompra.status_input = 'disponible';
            return nuevacompra.save();
        }
        return Promise.resolve();
    })
    .catch(err => {
        res.send(err);
    });
} )
//obetener todos los usuario
router.get('/obtenercompras', (req, res) => {
    ModeloCompra.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
});

//obetener data de usuario
router.post('/obtenerdatacompra', (req, res) => {
    ModeloCompra.find({idbuy:req.body.idbuy})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
});

//actualizar usuaio
router.post('/actualizacompra', (req, res) => {
    ModeloCompra.findOneAndUpdate({idbuy:req.body.idbuy}, {
        buy_date: req.body.buy_date,
        price_total: req.body.price_total,
        payment_methods: req.body.payment_methods,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        name_category: req.body.name_category,
        name_input: req.body.name_input,
        stock: req.body.stock,
        unit_price: req.body.unit_price,
        status_input: req.body.status_input,
        type: req.body.type,
        full_name: req.body.full_name,
        document: req.body.document,
        rut: req.body.rut,
        legal_representative_name: req.body.legal_representative_name,
        phone: req.body.phone,
        address: req.body.address,
        statuspro: req.body.statuspro,
        idbuy: req.body.idbuy
    })
        .then(docs => {
            res.send('compra actualizado');
        })
        .catch(err => {
            res.send(err);
        });
});


router.post('/borrarcompra', async (req, res) => {
    try {
        const deletedBuy = await ModeloCompra.findOneAndDelete({ idbuy: req.body.idbuy});
        if (deletedBuy) {
            res.send('Compra eliminada');
        } else {
            res.status(404).send('Compra no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});
        