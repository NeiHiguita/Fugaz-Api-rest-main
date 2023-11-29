const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://sarlmesa:3014199345@cluster0.eepe8vr.mongodb.net/Fugaz_Retro?retryWrites=true&w=majority');

const objetobd= mongoose.connection

objetobd.on('connected', ()=> {console.log('Conectado a mongodb')})
objetobd.on('error', ()=> {console.log('error a mongodb')})

module.exports = mongoose