'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dbName = 'NowOrder';
var colName = 'orders';

module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fastify, option, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:

                        fastify.get('/api', function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                                var col, data;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                col = fastify.mongo.client.db(dbName).collection(colName);
                                                _context.next = 3;
                                                return col.find({}).toArray();

                                            case 3:
                                                data = _context.sent;

                                                res.send(data);

                                            case 5:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x4, _x5) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();