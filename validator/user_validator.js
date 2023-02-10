const Validator = require("fastest-validator");
const {User} = require('../models');
const v = new Validator();
exports.post = async (req, res, next) => {
    const schema = {
        username: "string|required",
        email: "string|required",
        password: "string|required",
        providerId: "string|required",
    }

    const validate = v.validate(req.body, schema);

    const user = await User.findOne({where: {email: req.body.email}});

    if(user){
        return res.status(200).json({
            'status': false,
            'message': 'Email is already exist!!',
        });
    }

    if(validate.length){
        return res.status(200).json({
            'status': false,
            'message': validate,
        });
    }

    next();
    
}

exports.login = async (req, res, next) => {
    const schema = {
        email: "string|required",
        password: "string|required",
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(200).json({
            'status': false,
            'message': validate,
        });
    }

    next();
    
}
exports.withSocial = async (req, res, next) => {
    const schema = {
        rules_id: 'number|required',
        username: "string|required",
        email: "string|required",
        providerId: "string|required",
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(200).json({
            'status': false,
            'message': validate,
        });
    }

    next();
    
}