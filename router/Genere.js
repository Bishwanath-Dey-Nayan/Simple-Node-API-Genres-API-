const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();


const genereSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genere = new mongoose.model('Genre', genereSchema)



// GET ----> method
router.get('/', async (req, res) => {
    const generes = await Genere.find().sort('name');
    res.send(generes);
})

//POST ----> post method
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message)

    let genere = new Genere({ name: req.body.name });
    genere = await genere.save(genere);
    res.send(genere);

})

//Get course by id
router.get('/:id', async(req, res) => {
   const genere = await Genere.findById(req.params.id);
    if (!genere) return res.status(400).send(error.details[0].message);
    res.status(200).send(genere);
})

//update course
router.put('/:id', async(req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genere = await Genere.findByIdAndUpdate(req.params.id,{
        name:req.body.name
    },
    {
      new:true  
    });

    if(error) return res.status(404).send(error.details[0].message);

    res.status(200).send(genere);
})
//delete course

router.delete('/deleteGeneres/:id', async(req, res) => {
    const genere = await Genere.findByIdAndRemove(req.params.id);

    if (!genere) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genere);
})





function validateGenre(genere) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genere, schema);
}

module.exports = router;