const mongoose = require('mongoose');
const Joi = require('joi');


const customer = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:11
    }
});






function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}


module.exports.CustomerModel = customer;
module.exports.Validate = validateCustomer;