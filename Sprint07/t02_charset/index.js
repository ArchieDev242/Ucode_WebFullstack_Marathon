const express = require('express');
const path = require('path');
const iconv = require('iconv-lite');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/convert', (req, res) => {
    try 
    {
        let intput_str = req.body.inputString || '';
        let charsets = req.body.charsets || [];

        console.log('Input string:', intput_str);
        console.log('Selected charsets:', charsets);

        let converted = {
            'UTF-8': '',
            'ISO-8859-1': '',
            'Windows-1251': ''
        };

        if(intput_str) 
            {
            if(charsets.includes('UTF-8')) 
                {
                converted['UTF-8'] = intput_str;
            }
            
            if(charsets.includes('ISO-8859-1')) 
                {
                try 
                {
                    converted['ISO-8859-1'] = iconv.encode(intput_str, 'latin1').toString('binary');
                } catch (err) 
                {
                    converted['ISO-8859-1'] = 'Error converting: ' + err.message;
                }
            }
            
            if(charsets.includes('Windows-1251')) 
                {
                try 
                {
                    const buffer = iconv.encode(intput_str, 'win1251');
                    converted['Windows-1251'] = buffer.toString('hex');
                } catch(err) 
                {
                    converted['Windows-1251'] = 'Error converting: ' + err.message;
                }
            }
        }

        res.json(converted);
    } catch (error) 
    {
        res.status(500).json({ error: 'An error occurred during conversion' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});