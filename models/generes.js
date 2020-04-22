const Joi = require('joi');
const mongoose = require('mongoose');


const genereSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genere = new mongoose.model('Genre', genereSchema)



function validateGenre(genere) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genere, schema);
}

module.exports.Genere = Genere;
module.exports.Validate =  validateGenre;