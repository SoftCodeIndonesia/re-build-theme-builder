const {Section} = require('../models');

exports.create = async (req, res) => {
    try {
        const date = new Date();

        const data = {
            name: req.body.name,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const section = await Section.create(data);

        res.json({
            status: true,
            message: 'Successfully inserting section!!!',
            payload: section,
        })

    } catch (error) {
        res.status(400).json(error);
    }
}
exports.fetch = async (req, res) => {
    try {
        const section = await Section.findAll({include: ['components']});

        res.json({
            status: true,
            message: 'Successfully fetch section!!!',
            payload: section,
        })

    } catch (error) {
        res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        
        const id = req.params.id;

        await Section.destroy({
            where: {
              id: id
            }
        });

        res.json({
            status: true,
            message: 'Successfully deleting section!!!',
        })
    } catch (error) {
        res.status(400).json(error);
    }
}