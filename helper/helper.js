const fs = require('fs/promises');
const fss = require('fs');
const puppeteer = require('puppeteer');
const {Template} = require('../models');
const {TemplateComponent} = require('../models');
const path = require('node:path');
exports.syncThumb = async (template_id) => {
    var template = await Template.findOne({where: {id: template_id}});
    var components = await TemplateComponent.findAll({ 
        where: { template_id: template.id },
        include: 'component'
    });

    const fileName = path.basename(process.cwd() + '/assets/template/' + template.source, '.jpg');

    const destinationHtml = process.cwd() + '/assets/template/' + fileName + '.html';

    var componentHtml = '';

    for(var component of components ){
        var content = await fs.readFile(process.cwd() + '/' + component.component.code_path, {encoding:'utf-8'});
        componentHtml += content;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
            <title>${template.name}</title>
        </head>
        <body class="main-content">
            ${componentHtml}
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
        </html>
        `;

    await fs.writeFile(destinationHtml, htmlContent, async (err) => {
        if(err) throw err
        
    });

    if (fss.existsSync(process.cwd() + '/assets/thumbnails/' + template.source)) {
        await fs.unlink(process.cwd() + '/assets/thumbnails/' + template.source, (err) => {
            if (err) {
                throw err;
            }
        
            console.log("Delete File successfully.");
        });
    }

    
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });            
    await page.setContent(htmlContent);
    await page.screenshot({path: process.cwd() + '/assets/thumbnails/' + fileName + '.jpg'});
    await browser.close();

}

exports.deleteFile = async (path) => {
    if (fss.existsSync(path)) {
        await fs.unlink(path, (err) => {
            if (err) {
                throw err;
            }
        
            console.log(`Delete File successfully ==> path(${path})`);
        });
    }
}
