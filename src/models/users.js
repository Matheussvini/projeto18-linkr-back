import joi from 'joi';

export const signUpSchema = joi.object({
    
})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});