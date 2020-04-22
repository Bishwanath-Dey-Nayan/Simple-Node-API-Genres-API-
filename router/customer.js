const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const {CustomerModel, Validate} = require('../models/customer');




const Customer = new mongoose.model('Customer', CustomerModel)



// GET ----> method
router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
})

//POST ----> post method
router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({ name: req.body.name, phone:req.body.phone });
    customer = await customer.save(customer);
    res.send(customer);

})



module.exports = router;