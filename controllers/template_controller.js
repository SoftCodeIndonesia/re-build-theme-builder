const {Template} = require('../models');
const {TemplateComponent} = require('../models');
const {StyleFramework} = require('../models');
const fs = require('fs/promises');
const fss = require('fs');
const path = require('node:path');
const helper = require('../helper/helper');

exports.create = async (req, res) => {
    try {
        const date = new Date();
        const folderFile = '/assets/template';

        const fileNameWithoutExtension = `user-${req.body.userId}-${date.getTime()}-${req.body.name}`;

        // const fileNameHtml = `${fileNameWithoutExtension}.html`;
        const destinationHtml = process.cwd() + folderFile + '/' + fileNameWithoutExtension + '.html';
        

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
            <title>${req.body.name}</title>
        </head>
        <body class="main-content">
            
        </body>
        </html>
        `;

        await fs.appendFile(destinationHtml, htmlContent, async (err) => {
            if(err) throw err
            
        });

       
        const data = {
            name: req.body.name,
            user_id: req.body.userId,
            is_archive: 0,
            is_downloaded: 0,
            source: fileNameWithoutExtension + '.jpg',
            created_at: date.getTime(),
            created_by: req.body.userId,
        }
        const template = await Template.create(data);

        await helper.syncThumb(template.id);

        res.json({
            status: true,
            message: 'Successfully creating template!!!',
            payload: template,
        })

        
    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const folderFile = '/assets/template';
        const folderThumbnails = '/assets/thumbnails';
        const template_id = req.params.id;
        var template = await Template.findOne({
            where: {id: template_id},
            include: [
                {
                    association: 'creator',
                    attributes: ['username', 'avatar'],
                    include: 'rules',
                },
            ]
        });

        const destinationFilenameHtml = process.cwd() + folderFile + '/' + path.basename(template.source, '.jpg') + '.html';
        const destinationFilenameThumb = process.cwd() + folderThumbnails + '/' + template.source;
        await helper.deleteFile(destinationFilenameHtml);
        await helper.deleteFile(destinationFilenameThumb);

        var template = await Template.destroy({
            where: {id: template_id},
            include: ['components']
        });

        res.json({
            status: true,
            message: 'Successfully delete template!!!',
        });
    } catch (error) {
        res.json({
            status: true,
            message: `${error}`,
        });
    }

}

exports.fetch = async (req, res) => {
    try {
        var template = await Template.findAll({
            where: {user_id: req.body.userId},
            include: [
                {
                    association: 'creator',
                    attributes: ['username', 'avatar'],
                    include: 'rules',
                },
            ]
        });

        var template = template.map((value) => {
            value.source = 'http://localhost:3000/template/thumbnail/' + value.id;
            return value;
        })


        res.json({
            status: true,
            message: 'Successfully sync template!!!',
            payload: template,
        })

    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        })
    }
}

exports.build = async (req, res) => {
    try {
        const template_id = req.body.id;
        var template = await Template.findOne({where: {id: template_id}});
        

        var components = await TemplateComponent.findAll({ 
            where: { template_id: template.id },
            include: 'component'
        });

        var componentDetail = [];

        for(var component of components ){
            var content = await fs.readFile(process.cwd() + '/' + component.component.code_path, {encoding:'utf-8'});
            var comp = {
                component_id: component.component.id,
                content: content,
            }
            componentDetail.push(comp);
        }

        const templateResponse = {
            template: template,
            components: componentDetail
        }

        await helper.syncThumb(template.id);

        res.json({
            status: true,
            message: 'Successfully sync template!!!',
            payload: templateResponse,
        });

    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        })
    }
}

exports.readSource = async (req, res) => {
    try {

        const template_id = req.params.id;


        const template = await Template.findOne(
            {
                where: { id: template_id },
                include: [
                    {
                        association: 'components',
                        include: 'component',
                    },
                    {
                        association: 'meta_datas',
                        include: 'meta_data',
                    }
                ]
            }
        );

        var contentString = '';
        var metaCss = '';

        for(const meta of template.meta_datas){
            if(meta.meta_data.type == 'stylesheet'){
                metaCss += `<link rel="stylesheet" href="${meta.meta_data.path}">`;
            }
        }

        for(const component of template.components){
            var content = await fs.readFile(process.cwd() + '/' + component.component.code_path, {encoding:'utf-8'});
            contentString += content;
        }


        var code = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${metaCss}
                <title>Document</title>
            </head>
            <body class="main-content">
                ${contentString}
            </body>
            </html>`



        res.send(code);
        // res.json({
        //     status: true,
        //     message: 'successfully retrieving template!!',
        //     payload: template,
        // })

    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        })
    }
}

exports.downloadTemplate = async (req, res) => {
   
    const framework_id = req.body.framework_id;
    const template_id = req.body.template_id;

    const folder = '/assets/template';

    const filePath = process.cwd() + '/' + folder;

    const template = await Template.findOne({
        where: {id: template_id},
        include: [{
            association: 'components',
            include: 'component',
        }],
    })

    const framework = await StyleFramework.findOne({
        where: {id: framework_id},
        include: [{
            association: 'metas',
        }],
    });

    var metaCss = '';
    var metaJs = '';
    for(const meta of framework.metas){
        if(meta.type == 'stylesheet'){
            metaCss += `<link rel="stylesheet" href="${meta.path}">`;
        }else{
            metaJs += `<script src="${meta.path}"></script>`;
        }
    }

    var content = '';

    for(const component of template.components){
        content += await fs.readFile(process.cwd() + '/' + component.component.code_path, {encoding:'utf-8'});
    }

    var fullContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${metaCss}
        <title>Document</title>
    </head>
    <body class="main-content">
        ${content}
    </body>
    ${metaJs}
    </html>`;

    const fileName = path.basename(process.cwd() + '/assets/template/' + template.source, '.jpg');

    await fs.writeFile(filePath + '/' + fileName + '.html', fullContent, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
    });

    const stream = fss.createReadStream(filePath + '/' + fileName + '.html');
    res.set({
        'Content-Disposition': `attachment; filename='${fileName + '.html'}'`,
    });
    stream.pipe(res);
}

exports.thumbnail = async (req, res) => {
    const folderThumb = '/assets/thumbnails';

    const template_id = req.params.id;

    const template = await Template.findOne({where: {id: template_id}});

    const destinationThumb = process.cwd() + folderThumb + '/' + template.source;

    res.sendFile(destinationThumb);

}