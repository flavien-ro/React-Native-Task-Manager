const Joi = require('@hapi/joi');


// Register validation
const registerValidation = (data) => {
    const shema = Joi.object({
        name: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
    return shema.validate(data);
}

// Login validation
const loginValidation = (data) => {
    const shema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
    return shema.validate(data);
}

const taskValidation = (data) => {
    const shema = Joi.object({
        name: Joi.string() .min(4) .required(),
        description: Joi.string() .min(4) .required(),
        status: Joi.boolean(),
        begin: Joi.date(),
        end: Joi.date(),
        owner: Joi.string() .min(4) .required(),
    });
    return shema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.taskValidation = taskValidation;

