const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const _ = require("underscore")



app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)
        // Usuario.find({})
        //     .skip(desde)
        //     .limit(10)
        //     .exec((err, resp) => {
        //         if (err) {
        //             return res.status(400).json({
        //                 ok: false,
        //                 err
        //             })
        //         }
        //         res.status(200).json({
        //             ok: true,
        //             resp
        //         })
        //     })
    Usuario.find({ estado: true }, 'nombre email estado google', { skip: desde, limit: limite }, (err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Usuario.countDocuments({}, (err, conteo) => {
            res.status(200).json({
                ok: true,
                usuariosDB,
                conteo
            })

        })

    })

})
app.post('/usuario', function(req, res) {
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })



})
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])



    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            id,
            usuario: usuarioDB
        })
    })

})
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id
        // Usuario.deleteOne({ _id: id }, (err, usuarioDeleted) => {
        //     if (err) {
        //         return res.send(400).json({
        //             ok: false,
        //             err
        //         })
        //     }
        //     res.status(200).json({
        //         ok: true,
        //         usuarioDeleted
        //     })

    // })

    // Usuario.findByIdAndDelete(id, (err, usuarioDeleted) => {
    //     //eliminar
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (!usuarioDeleted) {
    //         return res.status(400).json({
    //             err: true,
    //             mensaje: 'Usuario no encontrado'
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         usuarioDeleted
    //     })
    // })

    //Actualizamos en vez de borrar
    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuarioDB
        })
    })
})

module.exports = app