const bycript = require('bcrypt');
const {User} = require('../models');
const middleWare = require('../middleware/authanticate');
exports.register = async (req, res) => {
    try {
        const date = new Date();
        const salt = await bycript.genSalt(10);
        const passwordHash = await bycript.hash(req.body.password, salt);

        const data = {
            rules_id: req.body.rules_id,
            username: req.body.username,
            avatar: '',
            email: req.body.email,
            providerId: req.body.providerId,
            password: passwordHash,
            register_at: date.getTime(),
        }

        const user = await User.create(data);

        res.json({
            status: true,
            message: 'Registered!!!',
            payload: user,
        })
    } catch (error) {
        res.json({
            status: false,
            message: `Failed Register!!! ==> ${error}`,
        })
    }
    
}

exports.login = async (req, res) => {
    try {
        
        const email = req.body.email;
        const passwordString = req.body.password;

        const user = await User.findOne({where: {email: email}, include: 'rules'});

        
        if(await bycript.compare(passwordString, user.password)){
            
            const accessToken = middleWare.generateAccessToken(user);
            const refreshToken = middleWare.generateRefreshToken(user);
            const userData = {
                username: user.username,
                avatar: user.avatar,
                email: user.email,
                register_at: user.register_at,
                refereshToken: refreshToken,
                accessToken: accessToken,
                rules: user.rules,
            };

            res.send({
                status: true,
                message: "LoggedIn Success!!",
                payload: userData,
            })
        }else{
            res.send({
                status: false,
                message: "Invalid email or password!",
            })
        }

    } catch (error) {
        res.status(400).json(error);
    }
}
exports.withSocial = async (req, res) => {
    try {
        
        const date = new Date();

        const data = {
            rules_id: req.body.rules_id,
            username: req.body.username,
            avatar: req.body.avatar_url,
            email: req.body.email,
            providerId: req.body.providerId,
            password: '',
            register_at: date.getTime(),
        }

        const isExist = await User.findOne({where: {email: data.email, providerId: data.providerId}});

        if(!isExist){
            await User.create(data);
        }else{
            await User.update(data, {where: {id: isExist.id}});
        }

        const user = await User.findOne({where: {email: req.body.email}, include: 'rules'});
        
        const accessToken = middleWare.generateAccessToken(user);
        const refreshToken = middleWare.generateRefreshToken(user);
        const userData = {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            register_at: user.register_at,
            refereshToken: refreshToken,
            accessToken: accessToken,
            rules: user.rules,
        };

        res.send({
            status: true,
            message: "LoggedIn Success!!",
            payload: userData,
        })

    } catch (error) {
        res.send({
            status: false,
            message: `LoggedIn Failed => ${error}`,
        })
    }
}