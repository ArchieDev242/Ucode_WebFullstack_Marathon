const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const auth_controller = require('./models/auth_controller');
const main_controller = require('./models/main_controller');
const password_controller = require('./models/password_controller');
const error_controller = require('./models/error_controller');

app.use(session({
    secret: 'sword_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'public')));

const build_controller = (ControllerClass, req, res) => {
    return new ControllerClass(req, res);
};

app.get('/login', (req, res) => {
    build_controller(auth_controller, req, res).show_login();
});

app.get('/register', (req, res) => {
    build_controller(auth_controller, req, res).show_register();
});

app.get('/password-reminder', (req, res) => {
    build_controller(password_controller, req, res).show_pass_reminder();
});

app.get('/', (req, res) => {
    build_controller(main_controller, req, res).show_main_page();
});

app.get('/check-auth', (req, res) => {
    build_controller(auth_controller, req, res).check_auth();
});

app.post('/api/login', (req, res) => {
    build_controller(auth_controller, req, res).login();
});

app.post('/api/register', (req, res) => {
    build_controller(auth_controller, req, res).register();
});

app.post('/api/password-reminder', (req, res) => {
    build_controller(password_controller, req, res).send_pass_reminder();
});

app.post('/api/logout', (req, res) => {
    build_controller(auth_controller, req, res).logout();
});

app.use((req, res) => {
    build_controller(error_controller, req, res).show404();
});

app.listen(port, () => {
    console.log(`S.W.O.R.D. System is running on http://localhost:${port}`);
});