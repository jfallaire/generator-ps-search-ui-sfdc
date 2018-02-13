'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cfg = require('./config');
const passport = require('./passports');
const path = require('path');
const redis = require('redis');
const connectRedis = require('connect-redis');
const path = require('path');
const app = express();

const sessionName = 'connect.sid';

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(compression());
app.use(methodOverride());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600 * 1000
    }
  }));
} else {
  let RedisStore = connectRedis(session);
  let client = redis.createClient(cfg.redis.client.port, cfg.redis.client.host);
  client.on("error", (err) => {
    console.error("Error " + err);
  }).on('connect', () => {
    console.log(`Connected to Redis ${cfg.redis.client.host}:${cfg.redis.client.port}`);
  }).on('end', () => {
    console.log('Redis connection ended');
  })

  let sessionStore = new RedisStore({
    client: client,
    host: cfg.redis.client.host,
    port: cfg.redis.client.port
  });

  app.use(session({
    store: sessionStore,
    name: sessionName,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    },
    secret: 'keyboard cat'
  }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve('./public')));
app.use(require('./routes/authentication'));
app.use(require('./routes/errors'));

// app.use('/', passport.protected);
app.use(require('./routes/pages'));

var server = app.listen(cfg.server_port, function (){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Application running at http://%s:%s', host, port);
});


