const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({email: user.email, fullname: user.fullname,register_at: user.register_at, id: user.id, rules: user.rules}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 604800});
    return refreshToken;
}

exports.generateAccessToken = (user) => {
    const accessToken = jwt.sign({email: user.email, fullname: user.fullname, register_at: user.register_at,id: user.id, rules: user.rules}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 604800});
    return accessToken;
}

exports.authenticate = (req, res, next) => {
    
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) {
              res.json({status: false, message: err.message, payload:{}});
            }else{
              // add user id to request
              req.body.userId = decoded.id;
              
              next();
            }
          });
    }else{
        res.json({status: false, message: 'Unauthorization user!', payload:{}});
    }

}

exports.isAdmin = (req, res, next) => {
    
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) {
              res.json({status: false, message: err.message, payload:{}});
            }else{
              // res.json({status: false, message: 'Unauthorization blocked!',payload: decoded});
              if(['admin', 'developer'].includes(decoded.rules.name.toLowerCase())){
                req.body.userId = decoded.id;
                next();
              }else{
                res.json({status: false, message: 'Permission blocked!',});
              }
              
            }
          });
    }else{
        res.json({status: false, message: 'Unauthorization user!', payload:{}});
    }

}