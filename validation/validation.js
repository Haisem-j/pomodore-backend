// Validation 
const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string().min(4).max(15),
    password: Joi.string().min(6).max(1024)
})

module.exports = schema;