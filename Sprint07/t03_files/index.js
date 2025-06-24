const express = require('express');
const path = require('path');
const File = require('./File');
const FileList = require('./FileList');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    const file_list = new FileList();
    const files_HTML = file_list.getHTMLList();
    res.render('index', { errorMsg: '', filesHTML: files_HTML });
});

app.post('/create', (req, res) => {
    const filename = req.body.fileName;
    const content = req.body.content;

    if(!filename || !content) 
        {
        const fileList = new FileList();
        const filesHTML = fileList.getHTMLList();
        return res.render('index', { errorMsg: 'Filename and content are required!', filesHTML });
    }

    const file = new File(filename);
    file.write(content);

    const fileList = new FileList();
    const filesHTML = fileList.getHTMLList();

    res.render('index', {
        errorMsg: '',
        filesHTML,
        selectedFileName: filename,
        selectedFileContent: content
    });
});

app.get('/select-file', (req, res) => {
    const fileName = req.query.file;
    const file = new File(fileName);
    const content = file.read();

    const fileList = new FileList();
    const filesHTML = fileList.getHTMLList();

    res.render('index', {
        errorMsg: '',
        filesHTML,
        selectedFileName: fileName,
        selectedFileContent: content
    });
});

app.post('/delete', (req, res) => {
    const fileName = req.body.deleteFile;
    const file = new File(fileName);
    file.delete();

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});