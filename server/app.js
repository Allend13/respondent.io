const Koa = require('koa');
const app = new Koa();
var cors = require('koa-cors');

const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

if (process.env.NODE_ENV === 'test') {
  const toDelete = handlers.indexOf('03-logger.js');
  handlers.splice(toDelete, 1);
}

handlers.forEach(handler => require('./middlewares/' + handler).init(app));

app.use(cors());

const Router = require('koa-router');

const router = new Router();

router.get('/users', require('./routes/user').index);
router.get('/users/:id', require('./routes/user').show);
router.post('/users', require('./routes/user').post);
router.get('/generate', require('./routes/user').generate);


app.use(router.routes());

module.exports = app;