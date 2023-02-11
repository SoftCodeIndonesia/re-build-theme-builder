require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var metaRouter = require('./routes/meta_data');
var framework = require('./routes/framework')
var sectionRouter = require('./routes/section')
var componentRouter = require('./routes/component');
var templateRouter = require('./routes/template');
var rulesRouter = require('./routes/rules');

var app = express();

app.use(cors({
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/meta', metaRouter);
app.use('/framework', framework);
app.use('/section', sectionRouter);
app.use('/component', componentRouter);
app.use('/template', templateRouter);
app.use('/rules', rulesRouter);

module.exports = app;
