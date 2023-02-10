const {Rules} = require('../models');


exports.create = async (req, res) => {
    try {
        const date = new Date();

        const data = {
            name: req.body.name,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const rule = await Rules.create(data);

        res.json({
            status: true,
            message: 'Successfully inserting rule!!!',
            payload: rule,
        })

    } catch (error) {
        res.status(400).json(error);
    }
}

exports.findOne = async (req, res) => {
    try {
        const rules = await Rules.findOne({
            where: {id: req.params.id},
            include: ['creator'],
        });

        res.json({
            status: true,
            message: 'Successfully retrieving rule!!!',
            payload: rules,
        })
    } catch (error) {
        res.json({
            status: true,
            message: `${error}`,
        }) 
    }
}

exports.update = async (req, res) => {
    try {
        const rules = await Rules.update({name: req.body.name},{where: {id: req.params.id},});

        res.json({
            status: true,
            message: 'Successfully retrieving rule!!!',
            payload: rules,
        })
    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const rules = await Rules.destroy({where: {id: req.params.id},});

        res.json({
            status: true,
            message: 'Successfully retrieving rule!!!',
            payload: rules,
        })
    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        });
    }
}

exports.findAll = async (req, res) => {
    try {

        const rules = await Rules.findAll({include: ['creator']});

        res.json({
            status: true,
            message: 'Successfully retrieving rule!!!',
            payload: rules,
        })

    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        });
        
    }
}