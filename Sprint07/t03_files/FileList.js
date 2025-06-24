const fs = require('fs');
const path = require('path');

class FileList 
{
    constructor() 
    {
        this.directory = path.join(__dirname, 'tmp');
        
        if(!fs.existsSync(this.directory)) 
            {
            fs.mkdirSync(this.directory);
        }
    }

    getList() 
    {
        try 
        {
            return fs.readdirSync(this.directory);
        } catch(error) 
        {
            console.error('Error getting file list:', error);
            return [];
        }
    }

    hasFiles() 
    {
        const files = this.getList();
        return files.length > 0;
    }

    getHTMLList() 
    {
        const files = this.getList();
        let html = '<ul>';
        files.forEach(file => {
            html += `<li><a href="/select-file?file=${file}">${file}</a></li>`;
        });
        html += '</ul>';
        return html;
    }
}

module.exports = FileList;