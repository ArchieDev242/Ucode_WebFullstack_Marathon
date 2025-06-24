const express = require('express');
const session = require('express-session');
const expressThymeleaf = require('express-thymeleaf');
const { TemplateEngine } = require('thymeleaf');
const path = require ('path');
const crypto = require('crypto');


const app = express();
const port = process.env.PORT || 3000;
const templateEngine = new TemplateEngine();
app.use(express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'marvelAPI',
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
	})
);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/api', async (req, res) => {
	const PRIVATE_KEY_API = process.env.PRIVATE_KEY || 'a819cd0111a2d21925f834425424b71b6de28c2e';
	const PUBLIC_KEY_API = process.env.PUBLIC_KEY || '7347472d98d49283a4a5739de28c6fc3';
	const ts = Date.now();
	const Hash_Key_API = crypto.createHash('md5').update(ts + PRIVATE_KEY_API + PUBLIC_KEY_API).digest('hex');
	
	try 
    {
		const { default: fetch } = await import('node-fetch');
		
		const controller = new AbortController();
		const timeout_Id = setTimeout(() => controller.abort(), 10000);
		
		const response = await fetch(
			`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY_API}&hash=${Hash_Key_API}`, 
			{ 
				signal: controller.signal,
				headers: {
					'Accept': 'application/json',
					'User-Agent': 'Node.js Marvel API Client'
				}
			}
		);
		
		clearTimeout(timeout_Id);
		
		if(!response.ok) throw new Error(`Marvel API responded with status: ${response.status}`);
		
		const data = await response.json();
		res.json(data);
	} catch(error) 
    {
		console.error('Marvel API Error:', error.message);
		
		res.status(500).json({
			error: true,
			message: error.name === 'AbortError' 
				? 'Request to Marvel API timed out. Please try again later.'
				: `Failed to fetch from Marvel API: ${error.message}`
		});
	}
});

app.listen(port, () => {
	console.log(`Server started on port http://localhost:${port}`);
});