const fs = require('fs');
const path = require('path');

class File 
{
    constructor(filename) 
    {
        this.filename = filename;
        this.directory = path.join(__dirname, 'tmp');
        this.filePath = path.join(this.directory, this.filename);

        if(!fs.existsSync(this.directory)) 
            {
            fs.mkdirSync(this.directory);
        }
    }

    write(content) 
    {
        try
        {
            if(fs.existsSync(this.filePath)) 
                {
                fs.appendFileSync(this.filePath, content);
            } else 
            {
                fs.writeFileSync(this.filePath, content);
            }
        } catch(error) 
        {
            console.error('Error writing to file:', error);
        }
    }

    read() 
    {
        try 
        {
            if(fs.existsSync(this.filePath)) 
                {
                return fs.readFileSync(this.filePath, 'utf8');
            }

            return '';
        } catch(error) 
        {
            console.error('Error reading file:', error);
            return '';
        }
    }

    delete() 
    {
        try 
        {
            if(fs.existsSync(this.filePath)) 
                {
                fs.unlinkSync(this.filePath);
            }
        } catch (error) 
        {
            console.error('Error deleting file:', error);
        }
    }
}

module.exports = File;