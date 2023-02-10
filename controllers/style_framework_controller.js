const {StyleFramework} = require('../models');

exports.create = async (req, res) => {
    try {
        const date = new Date();

        const data = {
            name: req.body.name,
            url: req.body.url,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const meta = await StyleFramework.create(data);

        res.json({
            'status': true,
            'message': 'Successfully inserting style framework!!!',
            'payload': meta,
        })
    } catch (error) {
        res.status(400).json(error);
    }
}