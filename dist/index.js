'use strict';

require('babel-polyfill');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fastify = require('fastify')();

var port = 3003 || process.env.PORT;

// MongoClient.connect('mongodb://127.0.0.1:27017/SimpleOrders', { useNewUrlParser: true })
//   .then((client) => {


fastify.use((0, _cors2.default)());

fastify
// .register(require('fastify-mongodb'), { client })
.register(require('./routes/BasicAsk'));

fastify.get('/api/healthcheck', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, reply) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reply.send({ status: 'ok' });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

fastify.post('/webhook', function (req, reply) {
  reply.status(200).send({ status: '200' });
});

fastify.get('/', function (req, reply) {
  reply.send('Excalibur Bot');
});

fastify.listen(port, '0.0.0.0', function (err) {
  if (err) throw err;
  console.log('Server Running on ' + port);
});
// })
// .catch((err) => {
//   throw err
// })