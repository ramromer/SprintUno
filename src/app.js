let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')



//session
let session = require('express-session');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

const methodOverride = require('method-override');

app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(session( {secret: "Nuestro mensaje secreto",
resave: false,
saveUninitialized: true}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use(userLoggedMiddleware);


app.use('/users', usersRouter);
app.use('/', indexRouter);

//session
// app.use(session({secret:'Sec313rwrUWEncuq9Om22iGFa7q2eAk53_kL'}));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
