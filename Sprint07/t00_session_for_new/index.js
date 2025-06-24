const express = require('express');
const session = require('express-session');
const path = require('path');
const { IncomingForm } = require('formidable');
const app = express();
const port = 3000;

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function get_publicity_value(publicity) 
{
    const publicity_value = Array.isArray(publicity) ? publicity[0] : publicity;
    
    switch(publicity_value) 
    {
        case 'UNKNOWN': return '1';
        case 'LIKE A GHOST': return '2';
        case 'I AM IN COMICS': return '3';
        case 'I HAVE FUN CLUB': return '4';
        case 'SUPERSTAR': return '5';
        default: return '';
    }
}

app.post('/submit', (req, res) => {
    const form = new IncomingForm({
        keepExtensions: true,
        multiples: true,
        allowEmptyFiles: true,
        minFileSize: 0
    });

    form.parse(req, (err, fields, files) => {
        if(err) 
            {
            return res.status(500).json({ error: 'Form parsing failed' });
        }

        let photoname = '';
        
        if(files.photo && files.photo.originalFilename) {
            photoname = files.photo.originalFilename || files.photo.name || '';
        }

        let powers = [];
        if(fields.powers) 
            {
            if(Array.isArray(fields.powers)) 
                {
                powers = fields.powers;
            } else 
            {
                powers = [fields.powers];
            }
        }

        const publicityValue = get_publicity_value(fields.publicity);

        req.session.heroData = {
            realName: fields.realName || '',
            currentAlias: fields.currentAlias || '',
            age: fields.age || '',
            about: fields.about || '',
            powers: powers,
            levelOfControl: fields.levelOfControl || '0',
            publicity: fields.publicity || '',
            publicityValue: publicityValue,
            photoName: photoname
        };

        res.redirect('/');
    });
});

app.get('/submit', (req, res) => {
    let formData = req.query;

    if(formData.realName) 
        {
        let powers = [];

        if(formData.powers) 
            {
            if(Array.isArray(formData.powers)) 
                {
                powers = formData.powers;
            } else 
            {
                powers = [formData.powers];
            }
        }
        
        const publicity_value = get_publicity_value(formData.publicity);
        
        req.session.heroData = {
            realName: formData.realName,
            currentAlias: formData.currentAlias || '',
            age: formData.age || '',
            about: formData.about || '',
            powers: powers,
            levelOfControl: formData.levelOfControl || '0',
            publicity: formData.publicity || '',
            publicityValue: publicity_value,
            photoName: ''
        };
    }

    res.redirect('/');
});

app.get('/get-session', (req, res) => {
    if(req.session.heroData) 
        {
        res.json(req.session.heroData);
    } else 
    {
        res.json({});
    }
});

app.get('/forget', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});