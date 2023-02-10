const {TemplateComponent} = require('../models');
const {Template} = require('../models');
const {Component} = require('../models');
const fs = require('fs');
exports.create = async (req, res) => {
    try {
        const date = new Date();

        var index = 0;

        // const folder = '/assets/builder';

        const lastIndex = await TemplateComponent.findOne({ where: { template_id: req.body.template_id }, order: [['index', 'DESC']]},);
        // const template = await Template.findOne({where: {id: req.body.template_id}});
        // const component = await Component.findOne({where: {id: req.body.component_id}});
        // var componentLastIndex = null;

        // const templateFilePath = process.cwd() + folder + '/' + template.source;
        // const componentFilePath = process.cwd() + '/' + component.code_path;
        // var componentLastIndexFilePath = null;

        if(lastIndex !== null){
            index = lastIndex.index + 1;
            // componentLastIndex = await Component.findOne({where: {id: lastIndex.component_id}});
            // componentLastIndexFilePath = process.cwd() + '/' + componentLastIndex.code_path
        }

        // fs.readFile(componentFilePath, 'utf8', (err, data) => {
            
        //     fs.readFile(templateFilePath, 'utf8', (err, templateContent) => {
                
    
        //         var header = '';
        //         var content = '';
        //         var footer = '';
        //         var contentTemplate = '';
    
        //         if(index == 0){
        //             const split = templateContent.split('<body class="main-content">');
        //             header = split[0];
        //             content = '<body class="main-content">' + data;
        //             footer = split[1];
        //         }else{
        //             var header2 = '';
        //             var content2 = '';
        //             var footer2 = '';
                    
        //             fs.readFile(componentLastIndexFilePath, 'utf8', (err, componentLastIndexContent) => {
        //                 const split = templateContent.split(componentLastIndexContent);
        //                 console.log(split.length);
        //                 header2 = split[0];
        //                 content2 = componentLastIndexContent + data;
        //                 footer2 = split[1];
        //             });

                    

        //             header = header2;
        //             content = content2;
        //             footer = footer2;
        //         }

        //         contentTemplate = header + content + footer;
                
        //         // fs.writeFile(templateFilePath, contentTemplate, (err) => {
        //         //     if(err) throw err
        //         // })
        //     });

        // });

        

        

        const data = {
            template_id: req.body.template_id,
            component_id: req.body.component_id,
            index: index,
            created_at: date.getTime(),
            created_by: req.body.userId,
        }

        const templateComponent = await TemplateComponent.create(data);

        res.json({
            status: true,
            message: 'Successfully building template!!!',
            payload: templateComponent,
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: `${error}`,
        });
    }
}

exports.fetch = async (req, res) => {
    try {
        const template = await TemplateComponent.findAll({include: ['component']});

        // const tmpl = template[0];
        // // tmpl.source =  url.pathToFileURL(tmpl.source);
        // tmpl.source = 'http://localhost:3000/template/source/' + tmpl.source;



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

exports.delete = async (req,res) => {
    try {
        const template_id = req.params.template_id;
        const component_id = req.params.component_id;

        await TemplateComponent.destroy({
            where: {
                template_id: template_id,
                component_id: component_id
            }
        });

        res.json({
            status: true,
            message: 'Successfully deleting template component!!!',
        })
    } catch (error) {
        res.json({
            status: false,
            message: `${error}`,
        })  
    }
}