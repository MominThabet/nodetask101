const joi = require('joi');


const registerValidation = (data)=>{
    const schema = joi.object().keys({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });

    return schema.validate(data);
}


module.exports = {
    registerValidation
}