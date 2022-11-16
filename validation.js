const joi = require('joi');


const registerValidation = (data)=>{
    const schema = joi.object().keys({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });

    return schema.validate(data);
}
const loginValidation = (data)=>{
    const schema = joi.object().keys({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });
    return schema.validate(data);
}

const postValidation = (data)=>{
    const schema = joi.object().keys({
        title: joi.string().min(6).required(),
        details: joi.string().min(6).required(),
    });
    return schema.validate(data);
}


module.exports = {
    registerValidation,
    loginValidation,
    postValidation
}