var path = require('path');
var express = require('express')
var routes = require('./routes/index');

var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express()
app.use(cookieParser('saltfish'));
app.use(session({
    secret: 'saltfish',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * set Views layout
 */

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

/**
 * 允许跨域
 */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
/**
 * set Routes
 */
app.get('/', routes.index);
app.get('/admin', require('./routes/admin/index').index);
app.get('/admin/login', require('./routes/admin/login').login);
app.get('/admin/register', require('./routes/admin/login').register);
app.post('/admin/login', require('./routes/admin/login').dologin);
app.get('/admin/logout', require('./routes/admin/login').adminlogout);

app.use('/admin/user', require('./routes/admin/user'));
app.use('/admin/good', require('./routes/admin/good'));
app.use('/admin/review', require('./routes/admin/review'));
app.use('/admin/order', require('./routes/admin/order'));
app.use('/api', require('./routes/api'));
app.use('/api/good', require('./routes/api/good'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/review', require('./routes/api/review'));
app.use('/api/address', require('./routes/api/address'));
app.use('/api/goodreview', require('./routes/api/goodreview'));


app.listen(8080, () => console.log('Example app listening on port 8080!'))
app.use(express.static("static"));
app.use(express.static('uploads'))