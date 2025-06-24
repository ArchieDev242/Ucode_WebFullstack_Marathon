import express from 'express';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

const validate_image_url = (req, res, next) => {
    const image_url = req.query.url;

    if(!image_url) 
        {
        return res.status(400).send('No URL provided');
    }
    
    try 
    {
        new URL(image_url);
        req.image_url = image_url;
        next();
    } catch(err) 
    {
        res.status(400).send('Invalid URL format');
    }
};

const fetch_image = (url) => {
    return new Promise((resolve, reject) => {
        const url_obj = new URL(url);
        const client = url_obj.protocol === 'https:' ? https : http;
        
        client.get(url, (image_res) => {
            if(image_res.statusCode !== 200) 
                {
                return reject(new Error(`Failed to fetch image: ${image_res.statusCode}`));
            }
            resolve(image_res);
        }).on('error', reject);
    });
};

app.get('/image-proxy', validate_image_url, async (req, res) => {
    try 
    {
        const image_res = await fetch_image(req.image_url);
        res.setHeader('Content-Type', image_res.headers['content-type']);
        image_res.pipe(res);
    } catch(err) 
    {
        console.error('Image proxy error:', err);
        res.status(500).send(`Error fetching image: ${err.message}`);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error occurred');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});