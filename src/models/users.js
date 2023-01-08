import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    username: joi.string().min(3).required(),
    pic_url: joi.string().uri().required()
})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});