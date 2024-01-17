const Joi = require('joi');

const addressJoiSchema = Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number().required(),
});

exports.createTenantValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    mobileNo: Joi.number().required(),
    type: Joi.string().valid('Student', 'Employed', 'Guest').required(),
    hostelId: Joi.string().hex().length(24).required(),
    roomId: Joi.string().hex().length(24).required(), 
    emergencyContactNumber: Joi.number(),
    adhaarNumber: Joi.string().required(),
    permanentAddress: addressJoiSchema,
    temporaryAddress: addressJoiSchema,
    rentedDate: Joi.date().required(),
    rentType: Joi.string().valid('daily', 'monthly').required()
});

