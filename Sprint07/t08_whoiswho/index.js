const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let csv_data = [];

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
	res.sendFile(path.join(__dirname, 'script.js'));
});

app.post('/upload', (req, res) => {
	const file = req.body.file;
	const filepath = path.join(__dirname, 'uploaded.csv');

	const base64_data = file.replace(/^data:text\/csv;base64,/, '');
	fs.writeFileSync(filepath, base64_data, 'base64');

	csv_data = [];
	fs.createReadStream(filepath)
		.pipe(csv())
		.on('data', (row) => {
			csv_data.push(row);
		})
		.on('end', () => {
			fs.unlinkSync(filepath);
			res.json({ success: true, data: csv_data });
		});
});

app.get('/filter', (req, res) => {
	const { column, value } = req.query;
	const filtered_data = csv_data.filter(row => row[column] === value);
	res.json({ success: true, data: filtered_data });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});