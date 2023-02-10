const {User} = require('../models');
const middleWare = require('../middleware/authanticate');

exports.find = async (req, res) => {
    try {
        const users = await User.findAll({
            include: ['rules'],
            attributes: ['username', 'avatar', 'email', 'register_at', 'providerId'],
        });
        res.json({
            status: true,
            message: 'Successfully retrieving users!!!',
            payload: users,
        });
    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        });
    }
}