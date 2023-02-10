const {MetaData} = require('../models');

exports.create = async (req, res) => {
    try {
        const date = new Date();

        const data = {
            name: req.body.username,
            path: req.body.path,
            type: req.body.type,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const meta = await MetaData.create(data);

        res.json({
            status: true,
            message: 'Successfully inserting meta data!!!',
            payload: meta,
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        
        const id = req.params.id;

        await MetaData.destroy({
            where: {
              id: id
            }
        });

        res.json({
            status: true,
            message: 'Successfully deleting meta data!!!',
        })
    } catch (error) {
        res.status(400).json(error);
    }
}