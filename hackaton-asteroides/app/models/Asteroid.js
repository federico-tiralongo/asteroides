const mongoose = require('mongoose');

const AsteroidSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    longitude: {
        type: Number,
        required: true,
        
    },
    perihelio: {
        type: Number,
        default: 10
    },
    anomalia: {
        type: String,
        require: true,
        enum: ['baja','media','alta']
    },
    inclinacion: {
        type: Number,
        require: true

    }
});

const Asteroid = mongoose.model('Asteroid',AsteroidSchema);

module.exports = Asteroid;