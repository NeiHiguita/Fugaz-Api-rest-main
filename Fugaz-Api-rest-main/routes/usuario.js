const express = require('express')
const router = express.Router(); 

const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemausuario = new eschema({
    name_rol: {type: String, require: true},
    state_rol: {type: Boolean, require: true},
    name_permission: {type: String, require: true},
    name_user: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    state_user: {type: Boolean, require: true},
    date_register: {type: String, require: true},
    iduser: {type: String}

})
const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router;

/* prueba
router.get('/ejemplo', (req,res) => {
    res.end('cargando');
});*/

//agregar usuario
router.post('/Agregarusuario', (req,res) => {
    const nuevousuario = new ModeloUsuario({
        name_rol: req.body.name_rol,
        state_rol: req.body.state_rol,
        name_permission: req.body.name_permission,
        name_user: req.body.name_user,
        email: req.body.email,
        password: req.body.password,
        state_user: req.body.state_user,
        date_register: req.body.date_register,
        iduser: req.body.iduser
    })
    nuevousuario.save()
    .then(() => {
        res.send('Usuario agregado correctamente');
    })
    .catch(err => {
        res.send(err);
    });
} )
//obetener todos los usuario
router.get('/obtenerusuarios', (req, res) => {
    ModeloUsuario.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
});

//obetener data de usuario
router.post('/obtenerdatausuario', (req, res) => {
    ModeloUsuario.find({iduser:req.body.iduser})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            res.send(err);
        });
});

//actualizar usuaio
router.post('/actualizausuario', (req, res) => {
    ModeloUsuario.findOneAndUpdate({iduser:req.body.iduser}, {
        name_rol: req.body.name_rol,
        state_rol: req.body.state_rol,
        name_permission: req.body.name_permission,
        name_user: req.body.name_user,
        email: req.body.email,
        password: req.body.password,
        state_user: req.body.state_user,
        date_register: req.body.date_register,
        iduser: req.body.iduser
    }, { new: true})
        .then(docs => {
            res.send('usuario actualizado');
        })
        .catch(err => {
            res.send(err);
        });
});


router.post('/borrarusuario', async (req, res) => {
    try {
        const deletedUser = await ModeloUsuario.findOneAndDelete({ iduser: req.body.iduser });
        if (deletedUser) {
            res.send('Usuario eliminado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});
        