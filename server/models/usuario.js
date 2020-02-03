const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },
    img: {

        required: false,

    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: [true, 'El rol es obligatorio'],
        enum: rolesValidos


    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: true,

    }


})

usuarioSchema.plugin(uniqueValidator);


usuarioSchema.methods.toJSON = function() {
    let userObject = this.toObject()
    delete userObject.password
    return userObject

}

module.exports = mongoose.model('Usuario', usuarioSchema)