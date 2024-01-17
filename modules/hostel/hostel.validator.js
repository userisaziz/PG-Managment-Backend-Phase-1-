const Joi = require('joi');

const addressValidator = Joi.object({
    state: Joi.string(),
    district: Joi.string(),
    pincode: Joi.number(),
});

module.exports.hostelValidator = Joi.object({
    name: Joi.string().required(),
    adminId: Joi.string().hex().length(24).required(), 
    imageUrl: Joi.string(),
    contactNumber: Joi.number(),
    pgType: Joi.string().valid('Gents', 'Ladies'),
    address: addressValidator,
});

// module.exports = hostelValidator;
