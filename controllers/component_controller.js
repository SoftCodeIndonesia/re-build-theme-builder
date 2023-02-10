const {Component} = require('../models');
const fs = require('fs');
exports.create = async (req, res) => {
    try {
        const date = new Date();
        const data = {
            section_id: req.body.section_id,
            name: req.body.name,
            thumbnail: '',
            code_path: req.body.code_path,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const componentData = await Component.create(data);

        res.json({
            status: true,
            message: 'Successfully inserting component!!!',
            payload: componentData,
        })

    } catch (error) {
        res.status(400).json(`${error}`);
    }
}

exports.readContentComponent = async (req, res) => {
    try {
        const id = req.params.id;
        const componentData = await Component.findOne({id: id});

        const destination = process.cwd() + componentData.code_path;

        fs.readFile(destination, 'utf8', (err, data) => {
            res.json({
                status: true,
                message: 'Successfully read component!!!',
                payload: data,
            })
        });
    } catch (error) {
        res.json({
            status: true,
            message: `${error}`,
        })
    }
}

exports.delete = async (req, res) => {
    try {
        
        const id = req.params.id;
        const componentData = await Component.findOne({id: id});

        const destination = process.cwd() + componentData.code_path;

        await fs.unlink(destination, async (err, data) => {
            await Component.destroy({
                where: {
                  id: id
                }
            });
            res.json({
                status: true,
                message: 'Successfully deleting component!!!',
            })
        });

    } catch (error) {
        res.json({
            status: true,
            message: `${error}`,
        })
    }
}