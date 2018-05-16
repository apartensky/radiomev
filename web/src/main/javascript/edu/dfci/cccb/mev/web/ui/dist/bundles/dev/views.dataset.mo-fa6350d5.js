/*system-text@0.1.0#text*/
define('system-text@0.1.0#text', [], function(){ return {}; });
/*app/domain/presets/tcga/model/TcgaPreset*/
define('app/domain/presets/tcga/model/TcgaPreset', ['lodash'], function (_) {
    var TcgaPreset = function TcgaPreset(DS) {
        return DS.defineResource({
            name: 'TcgaPreset',
            endpoint: 'presets/tcga',
            idAttribute: 'name',
            computed: {
                dataLevelNorm: [
                    'dataLevel',
                    function (dataLevel) {
                        return _.isNaN(parseInt(dataLevel)) ? dataLevel : 'Level_' + dataLevel;
                    }
                ]
            }
        });
    };
    TcgaPreset.$inject = ['DS'];
    TcgaPreset.$name = 'TcgaPreset';
    TcgaPreset.$provider = 'factory';
    return TcgaPreset;
});
/*js-data@2.9.0#dist/js-data-debug*/
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define('js-data@2.9.0#dist/js-data-debug', [], factory);
    else if (typeof exports === 'object')
        exports['JSData'] = factory();
    else
        root['JSData'] = factory();
}(this, function () {
    return function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
                return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = '';
        return __webpack_require__(0);
    }([
        function (module, exports, __webpack_require__) {
            'use strict';
            var _index = __webpack_require__(1);
            var _index2 = _interopRequireDefault(_index);
            var _utils = __webpack_require__(2);
            var _utils2 = _interopRequireDefault(_utils);
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            module.exports = {
                DS: _index2.default,
                DSUtils: _utils2.default,
                DSErrors: _errors2.default,
                createStore: function createStore(options) {
                    return new _index2.default(options);
                },
                version: {
                    full: '2.9.0',
                    major: parseInt('2', 10),
                    minor: parseInt('9', 10),
                    patch: parseInt('0', 10),
                    alpha: true ? 'false' : false,
                    beta: true ? 'false' : false
                }
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor)
                            descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                        defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _utils = __webpack_require__(2);
            var _utils2 = _interopRequireDefault(_utils);
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            var _index = __webpack_require__(41);
            var _index2 = _interopRequireDefault(_index);
            var _index3 = __webpack_require__(47);
            var _index4 = _interopRequireDefault(_index3);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            function lifecycleNoopCb(resource, attrs, cb) {
                cb(null, attrs);
            }
            function lifecycleNoop(resource, attrs) {
                return attrs;
            }
            function compare(orderBy, index, a, b) {
                var def = orderBy[index];
                var cA = _utils2.default.get(a, def[0]);
                var cB = _utils2.default.get(b, def[0]);
                if (_utils2.default._s(cA)) {
                    cA = _utils2.default.upperCase(cA);
                }
                if (_utils2.default._s(cB)) {
                    cB = _utils2.default.upperCase(cB);
                }
                if (def[1] === 'DESC') {
                    if (cB < cA) {
                        return -1;
                    } else if (cB > cA) {
                        return 1;
                    } else {
                        if (index < orderBy.length - 1) {
                            return compare(orderBy, index + 1, a, b);
                        } else {
                            return 0;
                        }
                    }
                } else {
                    if (cA < cB) {
                        return -1;
                    } else if (cA > cB) {
                        return 1;
                    } else {
                        if (index < orderBy.length - 1) {
                            return compare(orderBy, index + 1, a, b);
                        } else {
                            return 0;
                        }
                    }
                }
            }
            var Defaults = function () {
                function Defaults() {
                    _classCallCheck(this, Defaults);
                }
                _createClass(Defaults, [{
                        key: 'errorFn',
                        value: function errorFn(a, b) {
                            if (this.error && typeof this.error === 'function') {
                                try {
                                    if (typeof a === 'string') {
                                        throw new Error(a);
                                    } else {
                                        throw a;
                                    }
                                } catch (err) {
                                    a = err;
                                }
                                this.error(this.name || null, a || null, b || null);
                            }
                        }
                    }]);
                return Defaults;
            }();
            var defaultsPrototype = Defaults.prototype;
            defaultsPrototype.actions = {};
            defaultsPrototype.afterCreate = lifecycleNoopCb;
            defaultsPrototype.afterCreateCollection = lifecycleNoop;
            defaultsPrototype.afterCreateInstance = lifecycleNoop;
            defaultsPrototype.afterDestroy = lifecycleNoopCb;
            defaultsPrototype.afterEject = lifecycleNoop;
            defaultsPrototype.afterFind = lifecycleNoopCb;
            defaultsPrototype.afterFindAll = lifecycleNoopCb;
            defaultsPrototype.afterInject = lifecycleNoop;
            defaultsPrototype.afterLoadRelations = lifecycleNoopCb;
            defaultsPrototype.afterReap = lifecycleNoop;
            defaultsPrototype.afterUpdate = lifecycleNoopCb;
            defaultsPrototype.afterValidate = lifecycleNoopCb;
            defaultsPrototype.allowSimpleWhere = true;
            defaultsPrototype.basePath = '';
            defaultsPrototype.beforeCreate = lifecycleNoopCb;
            defaultsPrototype.beforeCreateCollection = lifecycleNoop;
            defaultsPrototype.beforeCreateInstance = lifecycleNoop;
            defaultsPrototype.beforeDestroy = lifecycleNoopCb;
            defaultsPrototype.beforeEject = lifecycleNoop;
            defaultsPrototype.beforeInject = lifecycleNoop;
            defaultsPrototype.beforeReap = lifecycleNoop;
            defaultsPrototype.beforeUpdate = lifecycleNoopCb;
            defaultsPrototype.beforeValidate = lifecycleNoopCb;
            defaultsPrototype.bypassCache = false;
            defaultsPrototype.cacheResponse = !!_utils2.default.w;
            defaultsPrototype.csp = false;
            defaultsPrototype.clearEmptyQueries = true;
            defaultsPrototype.computed = {};
            defaultsPrototype.defaultAdapter = 'http';
            defaultsPrototype.debug = false;
            defaultsPrototype.defaultValues = {};
            defaultsPrototype.eagerEject = false;
            defaultsPrototype.eagerInject = false;
            defaultsPrototype.endpoint = '';
            defaultsPrototype.error = console ? function (a, b, c) {
                return console[typeof console.error === 'function' ? 'error' : 'log'](a, b, c);
            } : false;
            defaultsPrototype.errorHandler = function () {
                return _utils2.default.Promise.reject(arguments.length <= 0 ? undefined : arguments[0]);
            };
            defaultsPrototype.fallbackAdapters = ['http'];
            defaultsPrototype.findStrictCache = false;
            defaultsPrototype.idAttribute = 'id';
            defaultsPrototype.ignoredChanges = [/\$/];
            defaultsPrototype.instanceEvents = !!_utils2.default.w;
            defaultsPrototype.keepChangeHistory = false;
            defaultsPrototype.linkRelations = !!_utils2.default.w;
            defaultsPrototype.log = console ? function (a, b, c, d, e) {
                return console[typeof console.info === 'function' ? 'info' : 'log'](a, b, c, d, e);
            } : false;
            defaultsPrototype.logFn = function (a, b, c, d) {
                var _this = this;
                if (_this.debug && _this.log && typeof _this.log === 'function') {
                    _this.log(_this.name || null, a || null, b || null, c || null, d || null);
                }
            };
            defaultsPrototype.maxAge = false;
            defaultsPrototype.methods = {};
            defaultsPrototype.notify = !!_utils2.default.w;
            defaultsPrototype.omit = [];
            defaultsPrototype.onConflict = 'merge';
            defaultsPrototype.reapAction = _utils2.default.w ? 'inject' : 'none';
            defaultsPrototype.reapInterval = _utils2.default.w ? 30000 : false;
            defaultsPrototype.relationsEnumerable = false;
            defaultsPrototype.resetHistoryOnInject = true;
            defaultsPrototype.returnMeta = false;
            defaultsPrototype.scopes = {};
            defaultsPrototype.strategy = 'single';
            defaultsPrototype.upsert = !!_utils2.default.w;
            defaultsPrototype.useClass = true;
            defaultsPrototype.useFilter = false;
            defaultsPrototype.validate = lifecycleNoopCb;
            defaultsPrototype.watchChanges = !!_utils2.default.w;
            var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
            var percentRegExp = /%/g;
            var underscoreRegExp = /_/g;
            function escape(pattern) {
                return pattern.replace(escapeRegExp, '\\$1');
            }
            function like(pattern, flags) {
                return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
            }
            defaultsPrototype.defaultFilter = function (collection, resourceName, params, options) {
                var definition = this.definitions[resourceName];
                var idA = 'id';
                var resource = undefined;
                if (definition) {
                    idA = definition.idAttribute;
                    resource = this.store[resourceName];
                }
                var filtered = collection;
                var where = null;
                var reserved = {
                    skip: '',
                    offset: '',
                    where: '',
                    limit: '',
                    orderBy: '',
                    sort: ''
                };
                params = params || {};
                options = options || {};
                if (_utils2.default._o(params.where)) {
                    where = params.where;
                } else {
                    where = {};
                }
                if (options.allowSimpleWhere) {
                    _utils2.default.forOwn(params, function (value, key) {
                        if (!(key in reserved) && !(key in where)) {
                            where[key] = { '==': value };
                        }
                    });
                }
                if (_utils2.default.isEmpty(where)) {
                    where = null;
                }
                if (where) {
                    filtered = _utils2.default.filter(filtered, function (attrs) {
                        var first = true;
                        var keep = true;
                        if (options.excludeTemporary && resource && resource.temporaryItems[attrs[idA]]) {
                            return false;
                        }
                        _utils2.default.forOwn(where, function (clause, field) {
                            if (!_utils2.default._o(clause)) {
                                clause = { '==': clause };
                            }
                            _utils2.default.forOwn(clause, function (term, op) {
                                var expr = undefined;
                                var isOr = op[0] === '|';
                                var val = _utils2.default.get(attrs, field);
                                op = isOr ? op.substr(1) : op;
                                if (op === '==') {
                                    expr = val == term;
                                } else if (op === '===') {
                                    expr = val === term;
                                } else if (op === '!=') {
                                    expr = val != term;
                                } else if (op === '!==') {
                                    expr = val !== term;
                                } else if (op === '>') {
                                    expr = val > term;
                                } else if (op === '>=') {
                                    expr = val >= term;
                                } else if (op === '<') {
                                    expr = val < term;
                                } else if (op === '<=') {
                                    expr = val <= term;
                                } else if (op === 'isectEmpty') {
                                    expr = !_utils2.default.intersection(val || [], term || []).length;
                                } else if (op === 'isectNotEmpty') {
                                    expr = _utils2.default.intersection(val || [], term || []).length;
                                } else if (op === 'in') {
                                    if (_utils2.default._s(term)) {
                                        expr = term.indexOf(val) !== -1;
                                    } else {
                                        expr = _utils2.default.contains(term, val);
                                    }
                                } else if (op === 'notIn') {
                                    if (_utils2.default._s(term)) {
                                        expr = term.indexOf(val) === -1;
                                    } else {
                                        expr = !_utils2.default.contains(term, val);
                                    }
                                } else if (op.indexOf('like') === 0) {
                                    expr = like(term, op.substr(4)).exec(val) !== null;
                                } else if (op.indexOf('notLike') === 0) {
                                    expr = like(term, op.substr(7)).exec(val) === null;
                                } else if (op === 'contains') {
                                    if (_utils2.default._s(val)) {
                                        expr = val.indexOf(term) !== -1;
                                    } else {
                                        expr = _utils2.default.contains(val, term);
                                    }
                                } else if (op === 'notContains') {
                                    if (_utils2.default._s(val)) {
                                        expr = val.indexOf(term) === -1;
                                    } else {
                                        expr = !_utils2.default.contains(val, term);
                                    }
                                }
                                if (expr !== undefined) {
                                    keep = first ? expr : isOr ? keep || expr : keep && expr;
                                }
                                first = false;
                            });
                        });
                        return keep;
                    });
                } else if (options.excludeTemporary && resource) {
                    filtered = _utils2.default.filter(filtered, function (attrs) {
                        return resource.temporaryItems[attrs[idA]];
                    });
                }
                var orderBy = null;
                if (_utils2.default._s(params.orderBy)) {
                    orderBy = [[
                            params.orderBy,
                            'ASC'
                        ]];
                } else if (_utils2.default._a(params.orderBy)) {
                    orderBy = params.orderBy;
                }
                if (!orderBy && _utils2.default._s(params.sort)) {
                    orderBy = [[
                            params.sort,
                            'ASC'
                        ]];
                } else if (!orderBy && _utils2.default._a(params.sort)) {
                    orderBy = params.sort;
                }
                if (orderBy) {
                    (function () {
                        var index = 0;
                        _utils2.default.forEach(orderBy, function (def, i) {
                            if (_utils2.default._s(def)) {
                                orderBy[i] = [
                                    def,
                                    'ASC'
                                ];
                            } else if (!_utils2.default._a(def)) {
                                throw new _errors2.default.IA('DS.filter("' + resourceName + '"[, params][, options]): ' + _utils2.default.toJson(def) + ': Must be a string or an array!', {
                                    params: {
                                        'orderBy[i]': {
                                            actual: typeof def === 'undefined' ? 'undefined' : _typeof(def),
                                            expected: 'string|array'
                                        }
                                    }
                                });
                            }
                        });
                        filtered = _utils2.default.sort(filtered, function (a, b) {
                            return compare(orderBy, index, a, b);
                        });
                    }());
                }
                var limit = _utils2.default._n(params.limit) ? params.limit : null;
                var skip = null;
                if (_utils2.default._n(params.skip)) {
                    skip = params.skip;
                } else if (_utils2.default._n(params.offset)) {
                    skip = params.offset;
                }
                if (limit && skip) {
                    filtered = _utils2.default.slice(filtered, skip, Math.min(filtered.length, skip + limit));
                } else if (_utils2.default._n(limit)) {
                    filtered = _utils2.default.slice(filtered, 0, Math.min(filtered.length, limit));
                } else if (_utils2.default._n(skip)) {
                    if (skip < filtered.length) {
                        filtered = _utils2.default.slice(filtered, skip);
                    } else {
                        filtered = [];
                    }
                }
                return filtered === collection ? filtered.slice() : filtered;
            };
            var DS = function () {
                function DS(options) {
                    _classCallCheck(this, DS);
                    var _this = this;
                    options = options || {};
                    _this.store = {};
                    _this.definitions = {};
                    _this.adapters = {};
                    _this.defaults = new Defaults();
                    _this.observe = _utils2.default.observe;
                    _utils2.default.forOwn(options, function (v, k) {
                        if (k === 'omit') {
                            _this.defaults.omit = v.concat(Defaults.prototype.omit);
                        } else {
                            _this.defaults[k] = v;
                        }
                    });
                    _this.defaults.logFn('new data store created', _this.defaults);
                    var P = _utils2.default.Promise;
                    if (P && !P.prototype.spread) {
                        P.prototype.spread = function (cb) {
                            return this.then(function (arr) {
                                return cb.apply(this, arr);
                            });
                        };
                    }
                    _utils2.default.Events(_this);
                }
                _createClass(DS, [
                    {
                        key: 'getAdapterName',
                        value: function getAdapterName(options) {
                            var errorIfNotExist = false;
                            options = options || {};
                            this.defaults.logFn('getAdapterName', options);
                            if (_utils2.default._s(options)) {
                                errorIfNotExist = true;
                                options = { adapter: options };
                            }
                            if (this.adapters[options.adapter]) {
                                return options.adapter;
                            } else if (errorIfNotExist) {
                                throw new Error(options.adapter + ' is not a registered adapter!');
                            } else {
                                return options.defaultAdapter;
                            }
                        }
                    },
                    {
                        key: 'getAdapter',
                        value: function getAdapter(options) {
                            options = options || {};
                            this.defaults.logFn('getAdapter', options);
                            return this.adapters[this.getAdapterName(options)];
                        }
                    },
                    {
                        key: 'registerAdapter',
                        value: function registerAdapter(name, Adapter, options) {
                            var _this = this;
                            options = options || {};
                            _this.defaults.logFn('registerAdapter', name, Adapter, options);
                            if (_utils2.default.isFunction(Adapter)) {
                                _this.adapters[name] = new Adapter(options);
                            } else {
                                _this.adapters[name] = Adapter;
                            }
                            if (options.default) {
                                _this.defaults.defaultAdapter = name;
                            }
                            _this.defaults.logFn('default adapter is ' + _this.defaults.defaultAdapter);
                        }
                    },
                    {
                        key: 'is',
                        value: function is(resourceName, instance) {
                            var definition = this.definitions[resourceName];
                            if (!definition) {
                                throw new _errors2.default.NER(resourceName);
                            }
                            return instance instanceof definition[definition.class];
                        }
                    },
                    {
                        key: 'clear',
                        value: function clear() {
                            var _this2 = this;
                            var ejected = {};
                            _utils2.default.forOwn(this.definitions, function (definition) {
                                var name = definition.name;
                                ejected[name] = definition.ejectAll();
                                _this2.store[name].completedQueries = {};
                                _this2.store[name].queryData = {};
                            });
                            return ejected;
                        }
                    },
                    {
                        key: 'errorFn',
                        value: function errorFn() {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }
                            var options = args[args.length - 1];
                            var defaultHandler = this.defaults.errorHandler;
                            var errorHandler = options ? options.errorHandler : defaultHandler;
                            errorHandler = errorHandler || defaultHandler;
                            return function (err) {
                                return errorHandler.apply(undefined, [err].concat(args));
                            };
                        }
                    }
                ]);
                return DS;
            }();
            var dsPrototype = DS.prototype;
            dsPrototype.getAdapterName.shorthand = false;
            dsPrototype.getAdapter.shorthand = false;
            dsPrototype.registerAdapter.shorthand = false;
            dsPrototype.errors = _errors2.default;
            dsPrototype.utils = _utils2.default;
            function addMethods(target, obj) {
                _utils2.default.forOwn(obj, function (v, k) {
                    target[k] = v;
                    target[k].before = function (fn) {
                        var orig = target[k];
                        target[k] = function () {
                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }
                            return orig.apply(this, fn.apply(this, args) || args);
                        };
                    };
                });
            }
            addMethods(dsPrototype, _index2.default);
            addMethods(dsPrototype, _index4.default);
            exports.default = DS;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            var BinaryHeap = __webpack_require__(4);
            var forEach = __webpack_require__(5);
            var slice = __webpack_require__(6);
            var forOwn = __webpack_require__(7);
            var contains = __webpack_require__(10);
            var deepMixIn = __webpack_require__(12);
            var pascalCase = __webpack_require__(14);
            var remove = __webpack_require__(21);
            var pick = __webpack_require__(22);
            var _keys = __webpack_require__(23);
            var sort = __webpack_require__(24);
            var upperCase = __webpack_require__(19);
            var get = __webpack_require__(25);
            var set = __webpack_require__(27);
            var observe = __webpack_require__(29);
            var guid = __webpack_require__(30);
            var w = undefined, P = undefined, File = undefined;
            var objectProto = Object.prototype;
            var toString = objectProto.toString;
            try {
                P = Promise;
            } catch (e) {
                console.error('js-data requires a global Promise constructor!');
            }
            try {
                File = window.File;
            } catch (e) {
                File = function File() {
                };
            }
            function _isArray(value) {
                return toString.call(value) === '[object Array]' || false;
            }
            var isArray = Array.isArray || _isArray;
            function isRegExp(value) {
                return toString.call(value) === '[object RegExp]' || false;
            }
            function isString(value) {
                return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
            }
            function isObject(value) {
                return toString.call(value) === '[object Object]' || false;
            }
            function isDate(value) {
                return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
            }
            function isNumber(value) {
                var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
                return type === 'number' || value && type === 'object' && toString.call(value) === '[object Number]' || false;
            }
            function isFunction(value) {
                return typeof value === 'function' || value && toString.call(value) === '[object Function]' || false;
            }
            function isStringOrNumber(value) {
                return isString(value) || isNumber(value);
            }
            function isStringOrNumberErr(field) {
                return new _errors2.default.IA('"' + field + '" must be a string or a number!');
            }
            function isObjectErr(field) {
                return new _errors2.default.IA('"' + field + '" must be an object!');
            }
            function isArrayErr(field) {
                return new _errors2.default.IA('"' + field + '" must be an array!');
            }
            function isEmpty(val) {
                if (val == null) {
                    return true;
                } else if (typeof val === 'string' || isArray(val)) {
                    return !val.length;
                } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                    var result = true;
                    forOwn(val, function () {
                        result = false;
                        return false;
                    });
                    return result;
                } else {
                    return true;
                }
            }
            function intersection(array1, array2) {
                if (!array1 || !array2) {
                    return [];
                }
                var result = [];
                var item = undefined;
                for (var i = 0, length = array1.length; i < length; i++) {
                    item = array1[i];
                    if (contains(result, item)) {
                        continue;
                    }
                    if (contains(array2, item)) {
                        result.push(item);
                    }
                }
                return result;
            }
            function filter(array, cb, thisObj) {
                var results = [];
                forEach(array, function (value, key, arr) {
                    if (cb(value, key, arr)) {
                        results.push(value);
                    }
                }, thisObj);
                return results;
            }
            try {
                w = window;
                w = {};
            } catch (e) {
                w = null;
            }
            function Events(target) {
                var events = {};
                target = target || this;
                Object.defineProperties(target, {
                    on: {
                        value: function value(type, func, ctx) {
                            events[type] = events[type] || [];
                            events[type].push({
                                f: func,
                                c: ctx
                            });
                        }
                    },
                    off: {
                        value: function value(type, func) {
                            var listeners = events[type];
                            if (!listeners) {
                                events = {};
                            } else if (func) {
                                for (var i = 0; i < listeners.length; i++) {
                                    if (listeners[i].f === func) {
                                        listeners.splice(i, 1);
                                        break;
                                    }
                                }
                            } else {
                                listeners.splice(0, listeners.length);
                            }
                        }
                    },
                    emit: {
                        value: function value() {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }
                            var listeners = events[args.shift()] || [];
                            if (listeners) {
                                for (var i = 0; i < listeners.length; i++) {
                                    listeners[i].f.apply(listeners[i].c, args);
                                }
                            }
                        }
                    }
                });
            }
            var toPromisify = [
                'beforeValidate',
                'validate',
                'afterValidate',
                'beforeCreate',
                'afterCreate',
                'beforeUpdate',
                'afterUpdate',
                'beforeDestroy',
                'afterDestroy'
            ];
            var isBlacklisted = observe.isBlacklisted;
            function copy(source, destination, stackSource, stackDest, blacklist) {
                if (!destination) {
                    destination = source;
                    if (source) {
                        if (isArray(source)) {
                            destination = copy(source, [], stackSource, stackDest, blacklist);
                        } else if (isDate(source)) {
                            destination = new Date(source.getTime());
                        } else if (isRegExp(source)) {
                            destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                            destination.lastIndex = source.lastIndex;
                        } else if (isObject(source)) {
                            destination = copy(source, Object.create(Object.getPrototypeOf(source)), stackSource, stackDest, blacklist);
                        }
                    }
                } else {
                    if (source === destination) {
                        throw new Error('Cannot copy! Source and destination are identical.');
                    }
                    stackSource = stackSource || [];
                    stackDest = stackDest || [];
                    if (isObject(source)) {
                        var index = stackSource.indexOf(source);
                        if (index !== -1) {
                            return stackDest[index];
                        }
                        stackSource.push(source);
                        stackDest.push(destination);
                    }
                    var result = undefined;
                    if (isArray(source)) {
                        var i = undefined;
                        destination.length = 0;
                        for (i = 0; i < source.length; i++) {
                            result = copy(source[i], null, stackSource, stackDest, blacklist);
                            if (isObject(source[i])) {
                                stackSource.push(source[i]);
                                stackDest.push(result);
                            }
                            destination.push(result);
                        }
                    } else {
                        if (isArray(destination)) {
                            destination.length = 0;
                        } else {
                            forEach(destination, function (value, key) {
                                delete destination[key];
                            });
                        }
                        for (var key in source) {
                            if (source.hasOwnProperty(key)) {
                                if (isBlacklisted(key, blacklist)) {
                                    continue;
                                }
                                result = copy(source[key], null, stackSource, stackDest, blacklist);
                                if (isObject(source[key])) {
                                    stackSource.push(source[key]);
                                    stackDest.push(result);
                                }
                                destination[key] = result;
                            }
                        }
                    }
                }
                return destination;
            }
            function equals(o1, o2) {
                if (o1 === o2) {
                    return true;
                }
                if (o1 === null || o2 === null) {
                    return false;
                }
                if (o1 !== o1 && o2 !== o2) {
                    return true;
                }
                var t1 = typeof o1 === 'undefined' ? 'undefined' : _typeof(o1);
                var t2 = typeof o2 === 'undefined' ? 'undefined' : _typeof(o2);
                var length, key, keySet;
                if (t1 == t2) {
                    if (t1 == 'object') {
                        if (isArray(o1)) {
                            if (!isArray(o2)) {
                                return false;
                            }
                            if ((length = o1.length) === o2.length) {
                                for (key = 0; key < length; key++) {
                                    if (!equals(o1[key], o2[key])) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        } else if (isDate(o1)) {
                            if (!isDate(o2)) {
                                return false;
                            }
                            return equals(o1.getTime(), o2.getTime());
                        } else if (isRegExp(o1) && isRegExp(o2)) {
                            return o1.toString() == o2.toString();
                        } else {
                            if (isArray(o2)) {
                                return false;
                            }
                            keySet = {};
                            for (key in o1) {
                                if (key.charAt(0) === '$' || isFunction(o1[key])) {
                                    continue;
                                }
                                if (!equals(o1[key], o2[key])) {
                                    return false;
                                }
                                keySet[key] = true;
                            }
                            for (key in o2) {
                                if (!keySet.hasOwnProperty(key) && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key])) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    }
                }
                return false;
            }
            function resolveId(definition, idOrInstance) {
                if (isString(idOrInstance) || isNumber(idOrInstance)) {
                    return idOrInstance;
                } else if (idOrInstance && definition) {
                    return idOrInstance[definition.idAttribute] || idOrInstance;
                } else {
                    return idOrInstance;
                }
            }
            function resolveItem(resource, idOrInstance) {
                if (resource && (isString(idOrInstance) || isNumber(idOrInstance))) {
                    return resource.index[idOrInstance] || idOrInstance;
                } else {
                    return idOrInstance;
                }
            }
            function isValidString(val) {
                return val != null && val !== '';
            }
            function join(items, separator) {
                separator = separator || '';
                return filter(items, isValidString).join(separator);
            }
            function makePath() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }
                var result = join(args, '/');
                return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
            }
            exports.default = {
                Promise: P,
                _: function _(parent, options) {
                    var _this = this;
                    parent = parent || {};
                    options = options || {};
                    if (options && options.constructor === parent.constructor) {
                        return options;
                    } else if (!isObject(options)) {
                        throw new _errors2.default.IA('"options" must be an object!');
                    }
                    forEach(toPromisify, function (name) {
                        if (typeof options[name] === 'function' && options[name].toString().indexOf('for (var _len = arg') === -1) {
                            options[name] = _this.promisify(options[name]);
                        }
                    });
                    var O = function Options(attrs) {
                        var self = this;
                        forOwn(attrs, function (value, key) {
                            self[key] = value;
                        });
                    };
                    O.prototype = parent;
                    O.prototype.orig = function () {
                        var orig = {};
                        forOwn(this, function (value, key) {
                            orig[key] = value;
                        });
                        return orig;
                    };
                    return new O(options);
                },
                _n: isNumber,
                _s: isString,
                _sn: isStringOrNumber,
                _snErr: isStringOrNumberErr,
                _o: isObject,
                _oErr: isObjectErr,
                _a: isArray,
                _aErr: isArrayErr,
                applyScope: function applyScope(definition, params, options) {
                    var scope = options.scope;
                    var _params = copy(params);
                    if (scope) {
                        if (isString(scope)) {
                            scope = [scope];
                        }
                    } else {
                        scope = [];
                    }
                    scope.unshift('defaultScope');
                    forEach(scope, function (_scope) {
                        var scopeDef = options.scopes[_scope];
                        if (typeof scopeDef === 'function') {
                            deepMixIn(params, scopeDef(definition));
                        } else if (scopeDef) {
                            deepMixIn(params, scopeDef);
                        }
                    });
                    deepMixIn(params, _params);
                },
                compute: function compute(fn, field) {
                    var _this = this;
                    var args = [];
                    if (!isObject(fn)) {
                        forEach(fn.deps, function (dep) {
                            args.push(get(_this, dep));
                        });
                        set(_this, field, fn[fn.length - 1].apply(_this, args));
                    }
                },
                contains: contains,
                copy: copy,
                deepMixIn: deepMixIn,
                diffObjectFromOldObject: observe.diffObjectFromOldObject,
                BinaryHeap: BinaryHeap,
                equals: equals,
                Events: Events,
                filter: filter,
                fillIn: function fillIn(target, obj) {
                    forOwn(obj, function (v, k) {
                        if (!(k in target)) {
                            target[k] = v;
                        }
                    });
                    return target;
                },
                forEach: forEach,
                forOwn: forOwn,
                fromJson: function fromJson(json) {
                    return isString(json) ? JSON.parse(json) : json;
                },
                get: get,
                guid: guid,
                intersection: intersection,
                isArray: isArray,
                isBlacklisted: isBlacklisted,
                isEmpty: isEmpty,
                isFunction: isFunction,
                isObject: isObject,
                isNumber: isNumber,
                isString: isString,
                keys: _keys,
                makePath: makePath,
                observe: observe,
                omit: function omit(obj, bl) {
                    var toRemove = [];
                    forOwn(obj, function (v, k) {
                        if (isBlacklisted(k, bl)) {
                            toRemove.push(k);
                        }
                    });
                    forEach(toRemove, function (k) {
                        delete obj[k];
                    });
                    return obj;
                },
                pascalCase: pascalCase,
                pick: pick,
                promisify: function promisify(fn, target) {
                    var _this = this;
                    if (!fn) {
                        return;
                    } else if (typeof fn !== 'function') {
                        throw new Error('Can only promisify functions!');
                    }
                    return function () {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }
                        return new _this.Promise(function (resolve, reject) {
                            args.push(function (err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                            try {
                                var promise = fn.apply(target || this, args);
                                if (promise && promise.then) {
                                    promise.then(resolve, reject);
                                }
                            } catch (err) {
                                reject(err);
                            }
                        });
                    };
                },
                remove: remove,
                set: set,
                slice: slice,
                sort: sort,
                toJson: JSON.stringify,
                updateTimestamp: function updateTimestamp(timestamp) {
                    var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
                    if (timestamp && newTimestamp <= timestamp) {
                        return timestamp + 1;
                    } else {
                        return newTimestamp;
                    }
                },
                upperCase: upperCase,
                removeCircular: function removeCircular(object) {
                    return function rmCirc(value, ctx) {
                        var i = undefined;
                        var nu = undefined;
                        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String) && (!File || !(value instanceof File))) {
                            var cur = ctx.cur;
                            var parent = ctx.ctx;
                            while (parent) {
                                if (parent.cur === cur) {
                                    return undefined;
                                }
                                parent = parent.ctx;
                            }
                            if (isArray(value)) {
                                nu = [];
                                for (i = 0; i < value.length; i += 1) {
                                    nu[i] = rmCirc(value[i], {
                                        ctx: ctx,
                                        cur: value[i]
                                    });
                                }
                            } else {
                                nu = {};
                                forOwn(value, function (v, k) {
                                    nu[k] = rmCirc(value[k], {
                                        ctx: ctx,
                                        cur: value[k]
                                    });
                                });
                            }
                            return nu;
                        }
                        return value;
                    }(object, {
                        ctx: null,
                        cur: object
                    });
                },
                resolveItem: resolveItem,
                resolveId: resolveId,
                respond: function respond(response, meta, options) {
                    if (options.returnMeta === 'array') {
                        return [
                            response,
                            meta
                        ];
                    } else if (options.returnMeta === 'object') {
                        return {
                            response: response,
                            meta: meta
                        };
                    } else {
                        return response;
                    }
                },
                w: w,
                applyRelationGettersToTarget: function applyRelationGettersToTarget(store, definition, target) {
                    this.forEach(definition.relationList, function (def) {
                        var relationName = def.relation;
                        var localField = def.localField;
                        var localKey = def.localKey;
                        var foreignKey = def.foreignKey;
                        var localKeys = def.localKeys;
                        var foreignKeys = def.foreignKeys;
                        var enumerable = typeof def.enumerable === 'boolean' ? def.enumerable : !!definition.relationsEnumerable;
                        if (typeof def.link === 'boolean' ? def.link : !!definition.linkRelations) {
                            delete target[localField];
                            var prop = { enumerable: enumerable };
                            if (def.type === 'belongsTo') {
                                prop.get = function () {
                                    var key = get(this, localKey);
                                    var hasKey = !!(key || key === 0);
                                    return hasKey ? definition.getResource(relationName).get(key) : undefined;
                                };
                                prop.set = function (parent) {
                                    if (parent) {
                                        set(this, localKey, get(parent, definition.getResource(relationName).idAttribute));
                                    }
                                    return get(this, localField);
                                };
                            } else if (def.type === 'hasMany') {
                                prop.get = function () {
                                    var params = {};
                                    if (foreignKey) {
                                        params[foreignKey] = this[definition.idAttribute];
                                        return definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
                                    } else if (localKeys) {
                                        var keys = get(this, localKeys) || [];
                                        return definition.getResource(relationName).getAll(isArray(keys) ? keys : _keys(keys));
                                    } else if (foreignKeys) {
                                        set(params, 'where.' + foreignKeys + '.contains', this[definition.idAttribute]);
                                        return definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params);
                                    }
                                    return undefined;
                                };
                                prop.set = function (children) {
                                    var _this2 = this;
                                    if (children && children.length) {
                                        (function () {
                                            var id = get(_this2, definition.idAttribute);
                                            if (foreignKey) {
                                                forEach(children, function (child) {
                                                    set(child, foreignKey, id);
                                                });
                                            } else if (localKeys) {
                                                (function () {
                                                    var keys = [];
                                                    forEach(children, function (child) {
                                                        keys.push(get(child, definition.getResource(relationName).idAttribute));
                                                    });
                                                    set(_this2, localKeys, keys);
                                                }());
                                            } else if (foreignKeys) {
                                                forEach(children, function (child) {
                                                    var keys = get(child, foreignKeys);
                                                    if (keys) {
                                                        if (!contains(keys, id)) {
                                                            keys.push(id);
                                                        }
                                                    } else {
                                                        set(child, foreignKeys, [id]);
                                                    }
                                                });
                                            }
                                        }());
                                    }
                                    return get(this, localField);
                                };
                            } else if (def.type === 'hasOne') {
                                if (localKey) {
                                    prop.get = function () {
                                        var key = get(this, localKey);
                                        var hasKey = !!(key || key === 0);
                                        return hasKey ? definition.getResource(relationName).get(key) : undefined;
                                    };
                                    prop.set = function (sibling) {
                                        if (sibling) {
                                            set(this, localKey, get(sibling, definition.getResource(relationName).idAttribute));
                                        }
                                        return get(this, localField);
                                    };
                                } else {
                                    prop.get = function () {
                                        var params = {};
                                        params[foreignKey] = this[definition.idAttribute];
                                        var items = params[foreignKey] ? definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params, { allowSimpleWhere: true }) : [];
                                        if (items.length) {
                                            return items[0];
                                        }
                                        return undefined;
                                    };
                                    prop.set = function (sibling) {
                                        if (sibling) {
                                            set(sibling, foreignKey, get(this, definition.idAttribute));
                                        }
                                        return get(this, localField);
                                    };
                                }
                            }
                            if (def.get) {
                                (function () {
                                    var orig = prop.get;
                                    prop.get = function () {
                                        var _this3 = this;
                                        return def.get(definition, def, this, function () {
                                            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                                args[_key4] = arguments[_key4];
                                            }
                                            return orig.apply(_this3, args);
                                        });
                                    };
                                }());
                            }
                            Object.defineProperty(target, localField, prop);
                        }
                    });
                }
            };
        },
        function (module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
                }
                return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
            }
            function _inherits(subClass, superClass) {
                if (typeof superClass !== 'function' && superClass !== null) {
                    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass)
                    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var IllegalArgumentError = function (_Error) {
                _inherits(IllegalArgumentError, _Error);
                function IllegalArgumentError(message) {
                    _classCallCheck(this, IllegalArgumentError);
                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IllegalArgumentError).call(this));
                    if (typeof Error.captureStackTrace === 'function') {
                        Error.captureStackTrace(_this, _this.constructor);
                    }
                    _this.type = _this.constructor.name;
                    _this.message = message;
                    return _this;
                }
                return IllegalArgumentError;
            }(Error);
            var RuntimeError = function (_Error2) {
                _inherits(RuntimeError, _Error2);
                function RuntimeError(message) {
                    _classCallCheck(this, RuntimeError);
                    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RuntimeError).call(this));
                    if (typeof Error.captureStackTrace === 'function') {
                        Error.captureStackTrace(_this2, _this2.constructor);
                    }
                    _this2.type = _this2.constructor.name;
                    _this2.message = message;
                    return _this2;
                }
                return RuntimeError;
            }(Error);
            var NonexistentResourceError = function (_Error3) {
                _inherits(NonexistentResourceError, _Error3);
                function NonexistentResourceError(resourceName) {
                    _classCallCheck(this, NonexistentResourceError);
                    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(NonexistentResourceError).call(this));
                    if (typeof Error.captureStackTrace === 'function') {
                        Error.captureStackTrace(_this3, _this3.constructor);
                    }
                    _this3.type = _this3.constructor.name;
                    _this3.message = resourceName + ' is not a registered resource!';
                    return _this3;
                }
                return NonexistentResourceError;
            }(Error);
            exports.default = {
                IllegalArgumentError: IllegalArgumentError,
                IA: IllegalArgumentError,
                RuntimeError: RuntimeError,
                R: RuntimeError,
                NonexistentResourceError: NonexistentResourceError,
                NER: NonexistentResourceError
            };
        },
        function (module, exports, __webpack_require__) {
            (function webpackUniversalModuleDefinition(root, factory) {
                if (true)
                    module.exports = factory();
                else if (typeof define === 'function' && define.amd)
                    define('js-data@2.9.0#dist/js-data-debug', factory);
                else if (typeof exports === 'object')
                    exports['BinaryHeap'] = factory();
                else
                    root['BinaryHeap'] = factory();
            }(this, function () {
                return function (modules) {
                    var installedModules = {};
                    function __webpack_require__(moduleId) {
                        if (installedModules[moduleId])
                            return installedModules[moduleId].exports;
                        var module = installedModules[moduleId] = {
                            exports: {},
                            id: moduleId,
                            loaded: false
                        };
                        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                        module.loaded = true;
                        return module.exports;
                    }
                    __webpack_require__.m = modules;
                    __webpack_require__.c = installedModules;
                    __webpack_require__.p = '';
                    return __webpack_require__(0);
                }([function (module, exports, __webpack_require__) {
                        function bubbleUp(heap, weightFunc, n) {
                            var element = heap[n];
                            var weight = weightFunc(element);
                            while (n > 0) {
                                var parentN = Math.floor((n + 1) / 2) - 1;
                                var _parent = heap[parentN];
                                if (weight >= weightFunc(_parent)) {
                                    break;
                                } else {
                                    heap[parentN] = element;
                                    heap[n] = _parent;
                                    n = parentN;
                                }
                            }
                        }
                        var bubbleDown = function bubbleDown(heap, weightFunc, n) {
                            var length = heap.length;
                            var node = heap[n];
                            var nodeWeight = weightFunc(node);
                            while (true) {
                                var child2N = (n + 1) * 2, child1N = child2N - 1;
                                var swap = null;
                                if (child1N < length) {
                                    var child1 = heap[child1N], child1Weight = weightFunc(child1);
                                    if (child1Weight < nodeWeight) {
                                        swap = child1N;
                                    }
                                }
                                if (child2N < length) {
                                    var child2 = heap[child2N], child2Weight = weightFunc(child2);
                                    if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
                                        swap = child2N;
                                    }
                                }
                                if (swap === null) {
                                    break;
                                } else {
                                    heap[n] = heap[swap];
                                    heap[swap] = node;
                                    n = swap;
                                }
                            }
                        };
                        function BinaryHeap(weightFunc, compareFunc) {
                            if (!weightFunc) {
                                weightFunc = function (x) {
                                    return x;
                                };
                            }
                            if (!compareFunc) {
                                compareFunc = function (x, y) {
                                    return x === y;
                                };
                            }
                            if (typeof weightFunc !== 'function') {
                                throw new Error('BinaryHeap([weightFunc][, compareFunc]): "weightFunc" must be a function!');
                            }
                            if (typeof compareFunc !== 'function') {
                                throw new Error('BinaryHeap([weightFunc][, compareFunc]): "compareFunc" must be a function!');
                            }
                            this.weightFunc = weightFunc;
                            this.compareFunc = compareFunc;
                            this.heap = [];
                        }
                        var BHProto = BinaryHeap.prototype;
                        BHProto.push = function (node) {
                            this.heap.push(node);
                            bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
                        };
                        BHProto.peek = function () {
                            return this.heap[0];
                        };
                        BHProto.pop = function () {
                            var front = this.heap[0];
                            var end = this.heap.pop();
                            if (this.heap.length > 0) {
                                this.heap[0] = end;
                                bubbleDown(this.heap, this.weightFunc, 0);
                            }
                            return front;
                        };
                        BHProto.remove = function (node) {
                            var length = this.heap.length;
                            for (var i = 0; i < length; i++) {
                                if (this.compareFunc(this.heap[i], node)) {
                                    var removed = this.heap[i];
                                    var end = this.heap.pop();
                                    if (i !== length - 1) {
                                        this.heap[i] = end;
                                        bubbleUp(this.heap, this.weightFunc, i);
                                        bubbleDown(this.heap, this.weightFunc, i);
                                    }
                                    return removed;
                                }
                            }
                            return null;
                        };
                        BHProto.removeAll = function () {
                            this.heap = [];
                        };
                        BHProto.size = function () {
                            return this.heap.length;
                        };
                        module.exports = BinaryHeap;
                    }]);
            }));
            ;
        },
        function (module, exports) {
            function forEach(arr, callback, thisObj) {
                if (arr == null) {
                    return;
                }
                var i = -1, len = arr.length;
                while (++i < len) {
                    if (callback.call(thisObj, arr[i], i, arr) === false) {
                        break;
                    }
                }
            }
            module.exports = forEach;
        },
        function (module, exports) {
            function slice(arr, start, end) {
                var len = arr.length;
                if (start == null) {
                    start = 0;
                } else if (start < 0) {
                    start = Math.max(len + start, 0);
                } else {
                    start = Math.min(start, len);
                }
                if (end == null) {
                    end = len;
                } else if (end < 0) {
                    end = Math.max(len + end, 0);
                } else {
                    end = Math.min(end, len);
                }
                var result = [];
                while (start < end) {
                    result.push(arr[start++]);
                }
                return result;
            }
            module.exports = slice;
        },
        function (module, exports, __webpack_require__) {
            var hasOwn = __webpack_require__(8);
            var forIn = __webpack_require__(9);
            function forOwn(obj, fn, thisObj) {
                forIn(obj, function (val, key) {
                    if (hasOwn(obj, key)) {
                        return fn.call(thisObj, obj[key], key, obj);
                    }
                });
            }
            module.exports = forOwn;
        },
        function (module, exports) {
            function hasOwn(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            module.exports = hasOwn;
        },
        function (module, exports, __webpack_require__) {
            var hasOwn = __webpack_require__(8);
            var _hasDontEnumBug, _dontEnums;
            function checkDontEnum() {
                _dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ];
                _hasDontEnumBug = true;
                for (var key in { 'toString': null }) {
                    _hasDontEnumBug = false;
                }
            }
            function forIn(obj, fn, thisObj) {
                var key, i = 0;
                if (_hasDontEnumBug == null)
                    checkDontEnum();
                for (key in obj) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
                if (_hasDontEnumBug) {
                    var ctor = obj.constructor, isProto = !!ctor && obj === ctor.prototype;
                    while (key = _dontEnums[i++]) {
                        if ((key !== 'constructor' || !isProto && hasOwn(obj, key)) && obj[key] !== Object.prototype[key]) {
                            if (exec(fn, obj, key, thisObj) === false) {
                                break;
                            }
                        }
                    }
                }
            }
            function exec(fn, obj, key, thisObj) {
                return fn.call(thisObj, obj[key], key, obj);
            }
            module.exports = forIn;
        },
        function (module, exports, __webpack_require__) {
            var indexOf = __webpack_require__(11);
            function contains(arr, val) {
                return indexOf(arr, val) !== -1;
            }
            module.exports = contains;
        },
        function (module, exports) {
            function indexOf(arr, item, fromIndex) {
                fromIndex = fromIndex || 0;
                if (arr == null) {
                    return -1;
                }
                var len = arr.length, i = fromIndex < 0 ? len + fromIndex : fromIndex;
                while (i < len) {
                    if (arr[i] === item) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
            module.exports = indexOf;
        },
        function (module, exports, __webpack_require__) {
            var forOwn = __webpack_require__(7);
            var isPlainObject = __webpack_require__(13);
            function deepMixIn(target, objects) {
                var i = 0, n = arguments.length, obj;
                while (++i < n) {
                    obj = arguments[i];
                    if (obj) {
                        forOwn(obj, copyProp, target);
                    }
                }
                return target;
            }
            function copyProp(val, key) {
                var existing = this[key];
                if (isPlainObject(val) && isPlainObject(existing)) {
                    deepMixIn(existing, val);
                } else {
                    this[key] = val;
                }
            }
            module.exports = deepMixIn;
        },
        function (module, exports) {
            function isPlainObject(value) {
                return !!value && typeof value === 'object' && value.constructor === Object;
            }
            module.exports = isPlainObject;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            var camelCase = __webpack_require__(16);
            var upperCase = __webpack_require__(19);
            function pascalCase(str) {
                str = toString(str);
                return camelCase(str).replace(/^[a-z]/, upperCase);
            }
            module.exports = pascalCase;
        },
        function (module, exports) {
            function toString(val) {
                return val == null ? '' : val.toString();
            }
            module.exports = toString;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            var replaceAccents = __webpack_require__(17);
            var removeNonWord = __webpack_require__(18);
            var upperCase = __webpack_require__(19);
            var lowerCase = __webpack_require__(20);
            function camelCase(str) {
                str = toString(str);
                str = replaceAccents(str);
                str = removeNonWord(str).replace(/[\-_]/g, ' ').replace(/\s[a-z]/g, upperCase).replace(/\s+/g, '').replace(/^[A-Z]/g, lowerCase);
                return str;
            }
            module.exports = camelCase;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            function replaceAccents(str) {
                str = toString(str);
                if (str.search(/[\xC0-\xFF]/g) > -1) {
                    str = str.replace(/[\xC0-\xC5]/g, 'A').replace(/[\xC6]/g, 'AE').replace(/[\xC7]/g, 'C').replace(/[\xC8-\xCB]/g, 'E').replace(/[\xCC-\xCF]/g, 'I').replace(/[\xD0]/g, 'D').replace(/[\xD1]/g, 'N').replace(/[\xD2-\xD6\xD8]/g, 'O').replace(/[\xD9-\xDC]/g, 'U').replace(/[\xDD]/g, 'Y').replace(/[\xDE]/g, 'P').replace(/[\xE0-\xE5]/g, 'a').replace(/[\xE6]/g, 'ae').replace(/[\xE7]/g, 'c').replace(/[\xE8-\xEB]/g, 'e').replace(/[\xEC-\xEF]/g, 'i').replace(/[\xF1]/g, 'n').replace(/[\xF2-\xF6\xF8]/g, 'o').replace(/[\xF9-\xFC]/g, 'u').replace(/[\xFE]/g, 'p').replace(/[\xFD\xFF]/g, 'y');
                }
                return str;
            }
            module.exports = replaceAccents;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            var PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;
            function removeNonWord(str) {
                str = toString(str);
                return str.replace(PATTERN, '');
            }
            module.exports = removeNonWord;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            function upperCase(str) {
                str = toString(str);
                return str.toUpperCase();
            }
            module.exports = upperCase;
        },
        function (module, exports, __webpack_require__) {
            var toString = __webpack_require__(15);
            function lowerCase(str) {
                str = toString(str);
                return str.toLowerCase();
            }
            module.exports = lowerCase;
        },
        function (module, exports, __webpack_require__) {
            var indexOf = __webpack_require__(11);
            function remove(arr, item) {
                var idx = indexOf(arr, item);
                if (idx !== -1)
                    arr.splice(idx, 1);
            }
            module.exports = remove;
        },
        function (module, exports, __webpack_require__) {
            var slice = __webpack_require__(6);
            function pick(obj, var_keys) {
                var keys = typeof arguments[1] !== 'string' ? arguments[1] : slice(arguments, 1), out = {}, i = 0, key;
                while (key = keys[i++]) {
                    out[key] = obj[key];
                }
                return out;
            }
            module.exports = pick;
        },
        function (module, exports, __webpack_require__) {
            var forOwn = __webpack_require__(7);
            var keys = Object.keys || function (obj) {
                var keys = [];
                forOwn(obj, function (val, key) {
                    keys.push(key);
                });
                return keys;
            };
            module.exports = keys;
        },
        function (module, exports) {
            function mergeSort(arr, compareFn) {
                if (arr == null) {
                    return [];
                } else if (arr.length < 2) {
                    return arr;
                }
                if (compareFn == null) {
                    compareFn = defaultCompare;
                }
                var mid, left, right;
                mid = ~~(arr.length / 2);
                left = mergeSort(arr.slice(0, mid), compareFn);
                right = mergeSort(arr.slice(mid, arr.length), compareFn);
                return merge(left, right, compareFn);
            }
            function defaultCompare(a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            }
            function merge(left, right, compareFn) {
                var result = [];
                while (left.length && right.length) {
                    if (compareFn(left[0], right[0]) <= 0) {
                        result.push(left.shift());
                    } else {
                        result.push(right.shift());
                    }
                }
                if (left.length) {
                    result.push.apply(result, left);
                }
                if (right.length) {
                    result.push.apply(result, right);
                }
                return result;
            }
            module.exports = mergeSort;
        },
        function (module, exports, __webpack_require__) {
            var isPrimitive = __webpack_require__(26);
            function get(obj, prop) {
                var parts = prop.split('.'), last = parts.pop();
                while (prop = parts.shift()) {
                    obj = obj[prop];
                    if (obj == null)
                        return;
                }
                return obj[last];
            }
            module.exports = get;
        },
        function (module, exports) {
            function isPrimitive(value) {
                switch (typeof value) {
                case 'string':
                case 'number':
                case 'boolean':
                    return true;
                }
                return value == null;
            }
            module.exports = isPrimitive;
        },
        function (module, exports, __webpack_require__) {
            var namespace = __webpack_require__(28);
            function set(obj, prop, val) {
                var parts = /^(.+)\.(.+)$/.exec(prop);
                if (parts) {
                    namespace(obj, parts[1])[parts[2]] = val;
                } else {
                    obj[prop] = val;
                }
            }
            module.exports = set;
        },
        function (module, exports, __webpack_require__) {
            var forEach = __webpack_require__(5);
            function namespace(obj, path) {
                if (!path)
                    return obj;
                forEach(path.split('.'), function (key) {
                    if (!obj[key]) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                });
                return obj;
            }
            module.exports = namespace;
        },
        function (module, exports) {
            (function (global) {
                var testingExposeCycleCount = global.testingExposeCycleCount;
                function detectObjectObserve() {
                    if (typeof Object.observe !== 'function' || typeof Array.observe !== 'function') {
                        return false;
                    }
                    var records = [];
                    function callback(recs) {
                        records = recs;
                    }
                    var test = {};
                    var arr = [];
                    Object.observe(test, callback);
                    Array.observe(arr, callback);
                    test.id = 1;
                    test.id = 2;
                    delete test.id;
                    arr.push(1, 2);
                    arr.length = 0;
                    Object.deliverChangeRecords(callback);
                    if (records.length !== 5)
                        return false;
                    if (records[0].type != 'add' || records[1].type != 'update' || records[2].type != 'delete' || records[3].type != 'splice' || records[4].type != 'splice') {
                        return false;
                    }
                    Object.unobserve(test, callback);
                    Array.unobserve(arr, callback);
                    return true;
                }
                var hasObserve = detectObjectObserve();
                var createObject = '__proto__' in {} ? function (obj) {
                    return obj;
                } : function (obj) {
                    var proto = obj.__proto__;
                    if (!proto)
                        return obj;
                    var newObject = Object.create(proto);
                    Object.getOwnPropertyNames(obj).forEach(function (name) {
                        Object.defineProperty(newObject, name, Object.getOwnPropertyDescriptor(obj, name));
                    });
                    return newObject;
                };
                var MAX_DIRTY_CHECK_CYCLES = 1000;
                function dirtyCheck(observer) {
                    var cycles = 0;
                    while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check_()) {
                        cycles++;
                    }
                    if (testingExposeCycleCount)
                        global.dirtyCheckCycleCount = cycles;
                    return cycles > 0;
                }
                function objectIsEmpty(object) {
                    for (var prop in object)
                        return false;
                    return true;
                }
                function diffIsEmpty(diff) {
                    return objectIsEmpty(diff.added) && objectIsEmpty(diff.removed) && objectIsEmpty(diff.changed);
                }
                function isBlacklisted(prop, bl) {
                    if (!bl || !bl.length) {
                        return false;
                    }
                    var matches;
                    for (var i = 0; i < bl.length; i++) {
                        if (Object.prototype.toString.call(bl[i]) === '[object RegExp]' && bl[i].test(prop) || bl[i] === prop) {
                            return matches = prop;
                        }
                    }
                    return !!matches;
                }
                function diffObjectFromOldObject(object, oldObject, equals, bl) {
                    var added = {};
                    var removed = {};
                    var changed = {};
                    for (var prop in oldObject) {
                        var newValue = object[prop];
                        if (isBlacklisted(prop, bl))
                            continue;
                        if (newValue !== undefined && (equals ? equals(newValue, oldObject[prop]) : newValue === oldObject[prop]))
                            continue;
                        if (!(prop in object)) {
                            removed[prop] = undefined;
                            continue;
                        }
                        if (equals ? !equals(newValue, oldObject[prop]) : newValue !== oldObject[prop])
                            changed[prop] = newValue;
                    }
                    for (var prop in object) {
                        if (prop in oldObject)
                            continue;
                        if (isBlacklisted(prop, bl))
                            continue;
                        added[prop] = object[prop];
                    }
                    if (Array.isArray(object) && object.length !== oldObject.length)
                        changed.length = object.length;
                    return {
                        added: added,
                        removed: removed,
                        changed: changed
                    };
                }
                var eomTasks = [];
                function runEOMTasks() {
                    if (!eomTasks.length)
                        return false;
                    for (var i = 0; i < eomTasks.length; i++) {
                        eomTasks[i]();
                    }
                    eomTasks.length = 0;
                    return true;
                }
                var runEOM = hasObserve ? function () {
                    return function (fn) {
                        return Promise.resolve().then(fn);
                    };
                }() : function () {
                    return function (fn) {
                        eomTasks.push(fn);
                    };
                }();
                var observedObjectCache = [];
                function newObservedObject() {
                    var observer;
                    var object;
                    var discardRecords = false;
                    var first = true;
                    function callback(records) {
                        if (observer && observer.state_ === OPENED && !discardRecords)
                            observer.check_(records);
                    }
                    return {
                        open: function (obs) {
                            if (observer)
                                throw Error('ObservedObject in use');
                            if (!first)
                                Object.deliverChangeRecords(callback);
                            observer = obs;
                            first = false;
                        },
                        observe: function (obj, arrayObserve) {
                            object = obj;
                            if (arrayObserve)
                                Array.observe(object, callback);
                            else
                                Object.observe(object, callback);
                        },
                        deliver: function (discard) {
                            discardRecords = discard;
                            Object.deliverChangeRecords(callback);
                            discardRecords = false;
                        },
                        close: function () {
                            observer = undefined;
                            Object.unobserve(object, callback);
                            observedObjectCache.push(this);
                        }
                    };
                }
                function getObservedObject(observer, object, arrayObserve) {
                    var dir = observedObjectCache.pop() || newObservedObject();
                    dir.open(observer);
                    dir.observe(object, arrayObserve);
                    return dir;
                }
                var UNOPENED = 0;
                var OPENED = 1;
                var CLOSED = 2;
                var nextObserverId = 1;
                function Observer() {
                    this.state_ = UNOPENED;
                    this.callback_ = undefined;
                    this.target_ = undefined;
                    this.directObserver_ = undefined;
                    this.value_ = undefined;
                    this.id_ = nextObserverId++;
                }
                Observer.prototype = {
                    open: function (callback, target) {
                        if (this.state_ != UNOPENED)
                            throw Error('Observer has already been opened.');
                        addToAll(this);
                        this.callback_ = callback;
                        this.target_ = target;
                        this.connect_();
                        this.state_ = OPENED;
                        return this.value_;
                    },
                    close: function () {
                        if (this.state_ != OPENED)
                            return;
                        removeFromAll(this);
                        this.disconnect_();
                        this.value_ = undefined;
                        this.callback_ = undefined;
                        this.target_ = undefined;
                        this.state_ = CLOSED;
                    },
                    deliver: function () {
                        if (this.state_ != OPENED)
                            return;
                        dirtyCheck(this);
                    },
                    report_: function (changes) {
                        try {
                            this.callback_.apply(this.target_, changes);
                        } catch (ex) {
                            Observer._errorThrownDuringCallback = true;
                            console.error('Exception caught during observer callback: ' + (ex.stack || ex));
                        }
                    },
                    discardChanges: function () {
                        this.check_(undefined, true);
                        return this.value_;
                    }
                };
                var collectObservers = !hasObserve;
                var allObservers;
                Observer._allObserversCount = 0;
                if (collectObservers) {
                    allObservers = [];
                }
                function addToAll(observer) {
                    Observer._allObserversCount++;
                    if (!collectObservers)
                        return;
                    allObservers.push(observer);
                }
                function removeFromAll(observer) {
                    Observer._allObserversCount--;
                }
                var runningMicrotaskCheckpoint = false;
                global.Platform = global.Platform || {};
                global.Platform.performMicrotaskCheckpoint = function () {
                    if (runningMicrotaskCheckpoint)
                        return;
                    if (!collectObservers)
                        return;
                    runningMicrotaskCheckpoint = true;
                    var cycles = 0;
                    var anyChanged, toCheck;
                    do {
                        cycles++;
                        toCheck = allObservers;
                        allObservers = [];
                        anyChanged = false;
                        for (var i = 0; i < toCheck.length; i++) {
                            var observer = toCheck[i];
                            if (observer.state_ != OPENED)
                                continue;
                            if (observer.check_())
                                anyChanged = true;
                            allObservers.push(observer);
                        }
                        if (runEOMTasks())
                            anyChanged = true;
                    } while (cycles < MAX_DIRTY_CHECK_CYCLES && anyChanged);
                    if (testingExposeCycleCount)
                        global.dirtyCheckCycleCount = cycles;
                    runningMicrotaskCheckpoint = false;
                };
                if (collectObservers) {
                    global.Platform.clearObservers = function () {
                        allObservers = [];
                    };
                }
                function ObjectObserver(object) {
                    Observer.call(this);
                    this.value_ = object;
                    this.oldObject_ = undefined;
                }
                ObjectObserver.prototype = createObject({
                    __proto__: Observer.prototype,
                    arrayObserve: false,
                    connect_: function (callback, target) {
                        if (hasObserve) {
                            this.directObserver_ = getObservedObject(this, this.value_, this.arrayObserve);
                        } else {
                            this.oldObject_ = this.copyObject(this.value_);
                        }
                    },
                    copyObject: function (object) {
                        var copy = Array.isArray(object) ? [] : {};
                        for (var prop in object) {
                            copy[prop] = object[prop];
                        }
                        ;
                        if (Array.isArray(object))
                            copy.length = object.length;
                        return copy;
                    },
                    check_: function (changeRecords, skipChanges) {
                        var diff;
                        var oldValues;
                        if (hasObserve) {
                            if (!changeRecords)
                                return false;
                            oldValues = {};
                            diff = diffObjectFromChangeRecords(this.value_, changeRecords, oldValues);
                        } else {
                            oldValues = this.oldObject_;
                            diff = diffObjectFromOldObject(this.value_, this.oldObject_);
                        }
                        if (diffIsEmpty(diff))
                            return false;
                        if (!hasObserve)
                            this.oldObject_ = this.copyObject(this.value_);
                        this.report_([
                            diff.added || {},
                            diff.removed || {},
                            diff.changed || {},
                            function (property) {
                                return oldValues[property];
                            }
                        ]);
                        return true;
                    },
                    disconnect_: function () {
                        if (hasObserve) {
                            this.directObserver_.close();
                            this.directObserver_ = undefined;
                        } else {
                            this.oldObject_ = undefined;
                        }
                    },
                    deliver: function () {
                        if (this.state_ != OPENED)
                            return;
                        if (hasObserve)
                            this.directObserver_.deliver(false);
                        else
                            dirtyCheck(this);
                    },
                    discardChanges: function () {
                        if (this.directObserver_)
                            this.directObserver_.deliver(true);
                        else
                            this.oldObject_ = this.copyObject(this.value_);
                        return this.value_;
                    }
                });
                var observerSentinel = {};
                var expectedRecordTypes = {
                    add: true,
                    update: true,
                    'delete': true
                };
                function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
                    var added = {};
                    var removed = {};
                    for (var i = 0; i < changeRecords.length; i++) {
                        var record = changeRecords[i];
                        if (!expectedRecordTypes[record.type]) {
                            console.error('Unknown changeRecord type: ' + record.type);
                            console.error(record);
                            continue;
                        }
                        if (!(record.name in oldValues))
                            oldValues[record.name] = record.oldValue;
                        if (record.type == 'update')
                            continue;
                        if (record.type == 'add') {
                            if (record.name in removed)
                                delete removed[record.name];
                            else
                                added[record.name] = true;
                            continue;
                        }
                        if (record.name in added) {
                            delete added[record.name];
                            delete oldValues[record.name];
                        } else {
                            removed[record.name] = true;
                        }
                    }
                    for (var prop in added)
                        added[prop] = object[prop];
                    for (var prop in removed)
                        removed[prop] = undefined;
                    var changed = {};
                    for (var prop in oldValues) {
                        if (prop in added || prop in removed)
                            continue;
                        var newValue = object[prop];
                        if (oldValues[prop] !== newValue)
                            changed[prop] = newValue;
                    }
                    return {
                        added: added,
                        removed: removed,
                        changed: changed
                    };
                }
                global.Observer = Observer;
                global.isBlacklisted = isBlacklisted;
                global.Observer.runEOM_ = runEOM;
                global.Observer.observerSentinel_ = observerSentinel;
                global.Observer.hasObjectObserve = hasObserve;
                global.diffObjectFromOldObject = diffObjectFromOldObject;
                global.ObjectObserver = ObjectObserver;
            }(exports));
        },
        function (module, exports, __webpack_require__) {
            var randHex = __webpack_require__(31);
            var choice = __webpack_require__(32);
            function guid() {
                return randHex(8) + '-' + randHex(4) + '-' + '4' + randHex(3) + '-' + choice(8, 9, 'a', 'b') + randHex(3) + '-' + randHex(12);
            }
            module.exports = guid;
        },
        function (module, exports, __webpack_require__) {
            var choice = __webpack_require__(32);
            var _chars = '0123456789abcdef'.split('');
            function randHex(size) {
                size = size && size > 0 ? size : 6;
                var str = '';
                while (size--) {
                    str += choice(_chars);
                }
                return str;
            }
            module.exports = randHex;
        },
        function (module, exports, __webpack_require__) {
            var randInt = __webpack_require__(33);
            var isArray = __webpack_require__(38);
            function choice(items) {
                var target = arguments.length === 1 && isArray(items) ? items : arguments;
                return target[randInt(0, target.length - 1)];
            }
            module.exports = choice;
        },
        function (module, exports, __webpack_require__) {
            var MIN_INT = __webpack_require__(34);
            var MAX_INT = __webpack_require__(35);
            var rand = __webpack_require__(36);
            function randInt(min, max) {
                min = min == null ? MIN_INT : ~~min;
                max = max == null ? MAX_INT : ~~max;
                return Math.round(rand(min - 0.5, max + 0.499999999999));
            }
            module.exports = randInt;
        },
        function (module, exports) {
            module.exports = -2147483648;
        },
        function (module, exports) {
            module.exports = 2147483647;
        },
        function (module, exports, __webpack_require__) {
            var random = __webpack_require__(37);
            var MIN_INT = __webpack_require__(34);
            var MAX_INT = __webpack_require__(35);
            function rand(min, max) {
                min = min == null ? MIN_INT : min;
                max = max == null ? MAX_INT : max;
                return min + (max - min) * random();
            }
            module.exports = rand;
        },
        function (module, exports) {
            function random() {
                return random.get();
            }
            random.get = Math.random;
            module.exports = random;
        },
        function (module, exports, __webpack_require__) {
            var isKind = __webpack_require__(39);
            var isArray = Array.isArray || function (val) {
                return isKind(val, 'Array');
            };
            module.exports = isArray;
        },
        function (module, exports, __webpack_require__) {
            var kindOf = __webpack_require__(40);
            function isKind(val, kind) {
                return kindOf(val) === kind;
            }
            module.exports = isKind;
        },
        function (module, exports) {
            var _rKind = /^\[object (.*)\]$/, _toString = Object.prototype.toString, UNDEF;
            function kindOf(val) {
                if (val === null) {
                    return 'Null';
                } else if (val === UNDEF) {
                    return 'Undefined';
                } else {
                    return _rKind.exec(_toString.call(val))[1];
                }
            }
            module.exports = kindOf;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            var _utils = __webpack_require__(2);
            var _utils2 = _interopRequireDefault(_utils);
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            var NER = _errors2.default.NER;
            var IA = _errors2.default.IA;
            var R = _errors2.default.R;
            var fakeId = 'DS_' + new Date().getTime();
            function diffIsEmpty(diff) {
                return !(_utils2.default.isEmpty(diff.added) && _utils2.default.isEmpty(diff.removed) && _utils2.default.isEmpty(diff.changed));
            }
            function check(fnName, resourceName, id, options) {
                var _this = this;
                var definition = _this.definitions[resourceName];
                options = options || {};
                id = _utils2.default.resolveId(definition, id);
                if (!definition) {
                    throw new NER(resourceName);
                } else if (!_utils2.default._sn(id)) {
                    throw _utils2.default._snErr('id');
                }
                id = id === fakeId ? undefined : id;
                options = _utils2.default._(definition, options);
                options.logFn(fnName, id, options);
                return {
                    _this: _this,
                    definition: definition,
                    _resourceName: resourceName,
                    _id: id,
                    _options: options
                };
            }
            exports.default = {
                changes: function changes(resourceName, id, options) {
                    var _check$call = check.call(this, 'changes', resourceName, id, options);
                    var _this = _check$call._this;
                    var definition = _check$call.definition;
                    var _resourceName = _check$call._resourceName;
                    var _id = _check$call._id;
                    var _options = _check$call._options;
                    var item = definition.get(_id);
                    if (item) {
                        var _ret = function () {
                            var observer = _this.store[_resourceName].observers[_id];
                            if (observer && typeof observer === 'function') {
                                observer.deliver();
                            }
                            var ignoredChanges = _options.ignoredChanges || [];
                            _utils2.default.forEach(definition.relationFields, function (field) {
                                if (!_utils2.default.contains(ignoredChanges, field)) {
                                    ignoredChanges.push(field);
                                }
                            });
                            var diff = _utils2.default.diffObjectFromOldObject(item, _this.store[_resourceName].previousAttributes[_id], _utils2.default.equals, ignoredChanges);
                            _utils2.default.forOwn(diff, function (changeset, name) {
                                var toKeep = [];
                                _utils2.default.forOwn(changeset, function (value, field) {
                                    if (!_utils2.default.isFunction(value)) {
                                        toKeep.push(field);
                                    }
                                });
                                diff[name] = _utils2.default.pick(diff[name], toKeep);
                            });
                            _utils2.default.forEach(definition.relationFields, function (field) {
                                delete diff.added[field];
                                delete diff.removed[field];
                                delete diff.changed[field];
                            });
                            return { v: diff };
                        }();
                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object')
                            return _ret.v;
                    }
                },
                changeHistory: function changeHistory(resourceName, id) {
                    var _check$call2 = check.call(this, 'changeHistory', resourceName, id || fakeId);
                    var _this = _check$call2._this;
                    var definition = _check$call2.definition;
                    var _resourceName = _check$call2._resourceName;
                    var _id = _check$call2._id;
                    var resource = _this.store[_resourceName];
                    if (!definition.keepChangeHistory) {
                        definition.errorFn('changeHistory is disabled for this resource!');
                    } else {
                        if (_resourceName) {
                            var item = definition.get(_id);
                            if (item) {
                                return resource.changeHistories[_id];
                            }
                        } else {
                            return resource.changeHistory;
                        }
                    }
                },
                commit: function commit(resourceName, id) {
                    var _check$call3 = check.call(this, 'commit', resourceName, id);
                    var _this = _check$call3._this;
                    var definition = _check$call3.definition;
                    var _resourceName = _check$call3._resourceName;
                    var _id = _check$call3._id;
                    var resource = _this.store[_resourceName];
                    var item = _this.store[_resourceName].index[_id];
                    if (item) {
                        resource.previousAttributes[_id] = _utils2.default.copy(item, null, null, null, definition.relationFields);
                    }
                    if (resource.changeHistories[_id].length) {
                        _utils2.default.forEach(resource.changeHistories[_id], function (changeRecord) {
                            _utils2.default.remove(resource.changeHistory, changeRecord);
                        });
                        resource.changeHistories[_id].splice(0, resource.changeHistories[_id].length);
                    }
                    return item;
                },
                compute: function compute(resourceName, instance) {
                    var _this = this;
                    var definition = _this.definitions[resourceName];
                    instance = _utils2.default.resolveItem(_this.store[resourceName], instance);
                    if (!definition) {
                        throw new NER(resourceName);
                    } else if (!instance) {
                        throw new R('Item not in the store!');
                    } else if (!_utils2.default._o(instance) && !_utils2.default._sn(instance)) {
                        throw new IA('"instance" must be an object, string or number!');
                    }
                    definition.logFn('compute', instance);
                    _utils2.default.forOwn(definition.computed, function (fn, field) {
                        _utils2.default.compute.call(instance, fn, field);
                    });
                    return instance;
                },
                createInstance: function createInstance(resourceName, attrs, options) {
                    var definition = this.definitions[resourceName];
                    var item = undefined;
                    attrs = attrs || {};
                    if (!definition) {
                        throw new NER(resourceName);
                    } else if (attrs && !_utils2.default.isObject(attrs)) {
                        throw new IA('"attrs" must be an object!');
                    }
                    options = _utils2.default._(definition, options);
                    var relationList = definition.relationList || [];
                    if (relationList.length) {
                        _utils2.default.forEach(relationList, function (def) {
                            var relationData = _utils2.default.get(attrs, def.localField);
                            if (relationData) {
                                if (_utils2.default.isArray(relationData)) {
                                    (function () {
                                        var array = [];
                                        var Resource = definition.getResource(def.relation);
                                        var _options = options.orig();
                                        _utils2.default.forEach(relationData, function (relationDataItem) {
                                            array.push(Resource.createInstance(relationDataItem, _options));
                                        });
                                        _utils2.default.set(attrs, def.localField, array);
                                    }());
                                } else if (_utils2.default.isObject(relationData)) {
                                    _utils2.default.set(attrs, def.localField, definition.getResource(def.relation).createInstance(relationData, options.orig()));
                                }
                            }
                        });
                    }
                    options.logFn('createInstance', attrs, options);
                    options.beforeCreateInstance(options, attrs);
                    var Constructor = definition[definition.class];
                    item = new Constructor();
                    if (definition.instanceEvents) {
                        _utils2.default.Events(item);
                    }
                    if (options.defaultValues) {
                        _utils2.default.deepMixIn(item, _utils2.default.copy(options.defaultValues));
                    }
                    _utils2.default.deepMixIn(item, attrs);
                    if (definition.computed) {
                        definition.compute(item);
                    }
                    options.afterCreateInstance(options, item);
                    return item;
                },
                createCollection: function createCollection(resourceName, arr, params, options) {
                    var _this = this;
                    var definition = _this.definitions[resourceName];
                    arr = arr || [];
                    params = params || {};
                    if (!definition) {
                        throw new NER(resourceName);
                    } else if (arr && !_utils2.default.isArray(arr)) {
                        throw new IA('"arr" must be an array!');
                    }
                    options = _utils2.default._(definition, options);
                    options.logFn('createCollection', arr, options);
                    options.beforeCreateCollection(options, arr);
                    Object.defineProperties(arr, {
                        fetch: {
                            value: function value(params, options) {
                                var __this = this;
                                __this.params = params || __this.params;
                                return definition.findAll(__this.params, options).then(function (data) {
                                    if (data === __this) {
                                        return __this;
                                    }
                                    data.unshift(__this.length);
                                    data.unshift(0);
                                    __this.splice.apply(__this, data);
                                    data.shift();
                                    data.shift();
                                    if (data.$$injected) {
                                        _this.store[resourceName].queryData[_utils2.default.toJson(__this.params)] = __this;
                                        __this.$$injected = true;
                                    }
                                    return __this;
                                });
                            }
                        },
                        params: {
                            value: params,
                            writable: true
                        },
                        resourceName: { value: resourceName }
                    });
                    options.afterCreateCollection(options, arr);
                    return arr;
                },
                defineResource: __webpack_require__(42),
                digest: function digest() {
                    this.observe.Platform.performMicrotaskCheckpoint();
                },
                eject: __webpack_require__(43),
                ejectAll: __webpack_require__(44),
                filter: __webpack_require__(45),
                get: function get(resourceName, id) {
                    var _check$call4 = check.call(this, 'get', resourceName, id);
                    var _this = _check$call4._this;
                    var _resourceName = _check$call4._resourceName;
                    var _id = _check$call4._id;
                    return _this.store[_resourceName].index[_id];
                },
                getAll: function getAll(resourceName, ids) {
                    var _this = this;
                    var definition = _this.definitions[resourceName];
                    var resource = _this.store[resourceName];
                    var collection = [];
                    if (!definition) {
                        throw new NER(resourceName);
                    } else if (ids && !_utils2.default._a(ids)) {
                        throw _utils2.default._aErr('ids');
                    }
                    definition.logFn('getAll', ids);
                    if (_utils2.default._a(ids)) {
                        var length = ids.length;
                        for (var i = 0; i < length; i++) {
                            if (resource.index[ids[i]]) {
                                collection.push(resource.index[ids[i]]);
                            }
                        }
                    } else {
                        collection = resource.collection.slice();
                    }
                    return collection;
                },
                hasChanges: function hasChanges(resourceName, id) {
                    var _check$call5 = check.call(this, 'hasChanges', resourceName, id);
                    var definition = _check$call5.definition;
                    var _id = _check$call5._id;
                    return definition.get(_id) ? diffIsEmpty(definition.changes(_id)) : false;
                },
                inject: __webpack_require__(46),
                isNew: function isNew(resourceName, id) {
                    var _check$call6 = check.call(this, 'isNew', resourceName, id || fakeId);
                    var _this = _check$call6._this;
                    var _resourceName = _check$call6._resourceName;
                    var _id = _check$call6._id;
                    var resource = _this.store[_resourceName];
                    return !!resource.temporaryItems[_id];
                },
                lastModified: function lastModified(resourceName, id) {
                    var _check$call7 = check.call(this, 'lastModified', resourceName, id || fakeId);
                    var _this = _check$call7._this;
                    var _resourceName = _check$call7._resourceName;
                    var _id = _check$call7._id;
                    var resource = _this.store[_resourceName];
                    if (_id) {
                        if (!(_id in resource.modified)) {
                            resource.modified[_id] = 0;
                        }
                        return resource.modified[_id];
                    }
                    return resource.collectionModified;
                },
                lastSaved: function lastSaved(resourceName, id) {
                    var _check$call8 = check.call(this, 'lastSaved', resourceName, id || fakeId);
                    var _this = _check$call8._this;
                    var _resourceName = _check$call8._resourceName;
                    var _id = _check$call8._id;
                    var resource = _this.store[_resourceName];
                    if (!(_id in resource.saved)) {
                        resource.saved[_id] = 0;
                    }
                    return resource.saved[_id];
                },
                previous: function previous(resourceName, id) {
                    var _check$call9 = check.call(this, 'previous', resourceName, id);
                    var _this = _check$call9._this;
                    var _resourceName = _check$call9._resourceName;
                    var _id = _check$call9._id;
                    var resource = _this.store[_resourceName];
                    return resource.previousAttributes[_id] ? _utils2.default.copy(resource.previousAttributes[_id]) : undefined;
                },
                revert: function revert(resourceName, id, options) {
                    var _check$call10 = check.call(this, 'revert', resourceName, id, options);
                    var _this = _check$call10._this;
                    var definition = _check$call10.definition;
                    var _resourceName = _check$call10._resourceName;
                    var _id = _check$call10._id;
                    var _options = _check$call10._options;
                    var preserve = _options.preserve || [];
                    var injectObj = {};
                    if (preserve.length === 0) {
                        injectObj = _this.previous(_resourceName, _id);
                    } else {
                        var _ret3 = function () {
                            var instance = definition.get(id);
                            var previousInstance = _this.previous(_resourceName, _id);
                            if (!instance) {
                                return { v: undefined };
                            }
                            _utils2.default.forOwn(instance, function (value, key) {
                                if (_utils2.default.contains(preserve, key)) {
                                    injectObj[key] = instance[key];
                                } else {
                                    injectObj[key] = previousInstance[key];
                                }
                            });
                        }();
                        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === 'object')
                            return _ret3.v;
                    }
                    return definition.inject(injectObj, { onConflict: 'replace' });
                }
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            var _utils = __webpack_require__(2);
            var _utils2 = _interopRequireDefault(_utils);
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            var instanceMethods = [
                'compute',
                'eject',
                'refresh',
                'save',
                'update',
                'destroy',
                'loadRelations',
                'changeHistory',
                'changes',
                'commit',
                'hasChanges',
                'isNew',
                'lastModified',
                'lastSaved',
                'previous',
                'revert'
            ];
            module.exports = function defineResource(definition) {
                var _this = this;
                var definitions = _this.definitions;
                if (_utils2.default._s(definition)) {
                    definition = { name: definition.replace(/\s/gi, '') };
                }
                if (!_utils2.default._o(definition)) {
                    throw _utils2.default._oErr('definition');
                } else if (!_utils2.default._s(definition.name)) {
                    throw new _errors2.default.IA('"name" must be a string!');
                } else if (definitions[definition.name]) {
                    throw new _errors2.default.R(definition.name + ' is already registered!');
                }
                function Resource(options) {
                    this.defaultValues = {};
                    this.methods = {};
                    this.computed = {};
                    this.scopes = {};
                    this.actions = {};
                    _utils2.default.deepMixIn(this, options);
                    var parent = _this.defaults;
                    if (definition.extends && definitions[definition.extends]) {
                        parent = definitions[definition.extends];
                    }
                    _utils2.default.fillIn(this.defaultValues, parent.defaultValues);
                    _utils2.default.fillIn(this.methods, parent.methods);
                    _utils2.default.fillIn(this.computed, parent.computed);
                    _utils2.default.fillIn(this.scopes, parent.scopes);
                    _utils2.default.fillIn(this.actions, parent.actions);
                    this.endpoint = 'endpoint' in options ? options.endpoint : this.name;
                }
                try {
                    var def;
                    var _class;
                    var _ret = function () {
                        if (definition.extends && definitions[definition.extends]) {
                            Resource.prototype = definitions[definition.extends];
                        } else {
                            Resource.prototype = _this.defaults;
                        }
                        definitions[definition.name] = new Resource(definition);
                        def = definitions[definition.name];
                        def.getResource = function (resourceName) {
                            return _this.definitions[resourceName];
                        };
                        def.logFn('Preparing resource.');
                        if (!_utils2.default._s(def.idAttribute)) {
                            throw new _errors2.default.IA('"idAttribute" must be a string!');
                        }
                        if (def.relations) {
                            def.relationList = [];
                            def.relationFields = [];
                            _utils2.default.forOwn(def.relations, function (relatedModels, type) {
                                _utils2.default.forOwn(relatedModels, function (defs, relationName) {
                                    if (!_utils2.default._a(defs)) {
                                        relatedModels[relationName] = [defs];
                                    }
                                    _utils2.default.forEach(relatedModels[relationName], function (d) {
                                        d.type = type;
                                        d.relation = relationName;
                                        d.name = def.name;
                                        def.relationList.push(d);
                                        if (d.localField) {
                                            def.relationFields.push(d.localField);
                                        }
                                    });
                                });
                            });
                            if (def.relations.belongsTo) {
                                def.parents = {};
                                _utils2.default.forOwn(def.relations.belongsTo, function (relatedModel, modelName) {
                                    _utils2.default.forEach(relatedModel, function (relation) {
                                        if (relation.parent) {
                                            def.parent = modelName;
                                            def.parentKey = relation.localKey;
                                            def.parentField = relation.localField;
                                            def.parents[modelName] = {
                                                key: def.parentKey,
                                                field: def.parentField
                                            };
                                        }
                                    });
                                });
                            }
                            if (typeof Object.freeze === 'function') {
                                Object.freeze(def.relations);
                                Object.freeze(def.relationList);
                            }
                        }
                        _class = def['class'] = _utils2.default.pascalCase(def.name);
                        try {
                            if (typeof def.useClass === 'function') {
                                if (def.csp) {
                                    def[_class] = function () {
                                        def.useClass.call(this);
                                    };
                                } else {
                                    def[_class] = new Function('def', 'return function ' + _class + '() { def.useClass.call(this); }')(def);
                                }
                                def[_class].prototype = function (proto) {
                                    function Ctor() {
                                    }
                                    Ctor.prototype = proto;
                                    return new Ctor();
                                }(def.useClass.prototype);
                            } else if (def.csp) {
                                def[_class] = function () {
                                };
                            } else {
                                def[_class] = new Function('return function ' + _class + '() {}')();
                            }
                        } catch (e) {
                            def[_class] = function () {
                            };
                        }
                        _utils2.default.forOwn(def.methods, function (fn, m) {
                            def[_class].prototype[m] = fn;
                        });
                        def[_class].prototype.set = function (key, value) {
                            var _this2 = this;
                            _utils2.default.set(this, key, value);
                            def.compute(this);
                            if (def.instanceEvents) {
                                setTimeout(function () {
                                    _this2.emit('DS.change', def, _this2);
                                }, 0);
                            }
                            def.handleChange(this);
                            return this;
                        };
                        def[_class].prototype.get = function (key) {
                            return _utils2.default.get(this, key);
                        };
                        _utils2.default.applyRelationGettersToTarget(_this, def, def[_class].prototype);
                        var parentOmit = null;
                        if (!def.hasOwnProperty('omit')) {
                            parentOmit = def.omit;
                            def.omit = [];
                        } else {
                            parentOmit = _this.defaults.omit;
                        }
                        def.omit = def.omit.concat(parentOmit || []);
                        _utils2.default.forOwn(def.computed, function (fn, field) {
                            if (_utils2.default.isFunction(fn)) {
                                def.computed[field] = [fn];
                                fn = def.computed[field];
                            }
                            if (def.methods && field in def.methods) {
                                def.errorFn('Computed property "' + field + '" conflicts with previously defined prototype method!');
                            }
                            def.omit.push(field);
                            if (_utils2.default.isArray(fn)) {
                                var deps;
                                if (fn.length === 1) {
                                    var match = fn[0].toString().match(/function.*?\(([\s\S]*?)\)/);
                                    deps = match[1].split(',');
                                    deps = _utils2.default.filter(deps, function (x) {
                                        return x;
                                    });
                                    def.computed[field] = deps.concat(fn);
                                    fn = def.computed[field];
                                    if (deps.length) {
                                        def.errorFn('Use the computed property array syntax for compatibility with minified code!');
                                    }
                                }
                                deps = fn.slice(0, fn.length - 1);
                                _utils2.default.forEach(deps, function (val, index) {
                                    deps[index] = val.trim();
                                });
                                fn.deps = _utils2.default.filter(deps, function (dep) {
                                    return !!dep;
                                });
                            } else if (_utils2.default.isObject(fn)) {
                                Object.defineProperty(def[_class].prototype, field, fn);
                            }
                        });
                        _utils2.default.forEach(instanceMethods, function (name) {
                            def[_class].prototype['DS' + _utils2.default.pascalCase(name)] = function () {
                                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                    args[_key] = arguments[_key];
                                }
                                args.unshift(this[def.idAttribute] || this);
                                args.unshift(def.name);
                                return _this[name].apply(_this, args);
                            };
                        });
                        def[_class].prototype.DSCreate = function () {
                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }
                            args.unshift(this);
                            args.unshift(def.name);
                            return _this.create.apply(_this, args);
                        };
                        _this.store[def.name] = {
                            collection: [],
                            expiresHeap: new _utils2.default.BinaryHeap(function (x) {
                                return x.expires;
                            }, function (x, y) {
                                return x.item === y;
                            }),
                            completedQueries: {},
                            queryData: {},
                            pendingQueries: {},
                            index: {},
                            modified: {},
                            saved: {},
                            previousAttributes: {},
                            observers: {},
                            changeHistories: {},
                            changeHistory: [],
                            collectionModified: 0,
                            temporaryItems: {}
                        };
                        var resource = _this.store[def.name];
                        if (def.reapInterval) {
                            setInterval(function () {
                                return def.reap();
                            }, def.reapInterval);
                        }
                        var fns = [
                            'registerAdapter',
                            'getAdapterName',
                            'getAdapter',
                            'is',
                            '!clear'
                        ];
                        for (var key in _this) {
                            if (typeof _this[key] === 'function') {
                                fns.push(key);
                            }
                        }
                        _utils2.default.forEach(fns, function (key) {
                            var k = key;
                            if (k[0] === '!') {
                                return;
                            }
                            if (_this[k].shorthand !== false) {
                                def[k] = function () {
                                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        args[_key3] = arguments[_key3];
                                    }
                                    args.unshift(def.name);
                                    return _this[k].apply(_this, args);
                                };
                                def[k].before = function (fn) {
                                    var orig = def[k];
                                    def[k] = function () {
                                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                            args[_key4] = arguments[_key4];
                                        }
                                        return orig.apply(def, fn.apply(def, args) || args);
                                    };
                                };
                            } else {
                                def[k] = function () {
                                    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                        args[_key5] = arguments[_key5];
                                    }
                                    return _this[k].apply(_this, args);
                                };
                            }
                        });
                        def.beforeValidate = _utils2.default.promisify(def.beforeValidate);
                        def.validate = _utils2.default.promisify(def.validate);
                        def.afterValidate = _utils2.default.promisify(def.afterValidate);
                        def.beforeCreate = _utils2.default.promisify(def.beforeCreate);
                        def.afterCreate = _utils2.default.promisify(def.afterCreate);
                        def.afterFind = _utils2.default.promisify(def.afterFind);
                        def.afterFindAll = _utils2.default.promisify(def.afterFindAll);
                        def.afterLoadRelations = _utils2.default.promisify(def.afterLoadRelations);
                        def.beforeUpdate = _utils2.default.promisify(def.beforeUpdate);
                        def.afterUpdate = _utils2.default.promisify(def.afterUpdate);
                        def.beforeDestroy = _utils2.default.promisify(def.beforeDestroy);
                        def.afterDestroy = _utils2.default.promisify(def.afterDestroy);
                        var defaultAdapter = undefined;
                        if (def.hasOwnProperty('defaultAdapter')) {
                            defaultAdapter = def.defaultAdapter;
                        }
                        _utils2.default.forOwn(def.actions, function (action, name) {
                            if (def[name] && !def.actions[name]) {
                                throw new Error('Cannot override existing method "' + name + '"!');
                            }
                            action.request = action.request || function (config) {
                                return config;
                            };
                            action.response = action.response || function (response) {
                                return response;
                            };
                            action.responseError = action.responseError || function (err) {
                                return _utils2.default.Promise.reject(err);
                            };
                            def[name] = function (id, options) {
                                if (_utils2.default._o(id)) {
                                    options = id;
                                }
                                options = options || {};
                                var adapter = def.getAdapter(action.adapter || defaultAdapter || 'http');
                                var config = _utils2.default.deepMixIn({}, action);
                                if (!options.hasOwnProperty('endpoint') && config.endpoint) {
                                    options.endpoint = config.endpoint;
                                }
                                if (typeof options.getEndpoint === 'function') {
                                    config.url = options.getEndpoint(def, options);
                                } else {
                                    var _args = [
                                        options.basePath || def.basePath || adapter.defaults.basePath,
                                        adapter.getEndpoint(def, _utils2.default._sn(id) ? id : null, options)
                                    ];
                                    if (_utils2.default._sn(id)) {
                                        _args.push(id);
                                    }
                                    _args.push(action.pathname || name);
                                    config.url = _utils2.default.makePath.apply(null, _args);
                                }
                                config.method = config.method || 'GET';
                                config.resourceName = def.name;
                                _utils2.default.deepMixIn(config, options);
                                return new _utils2.default.Promise(function (resolve) {
                                    return resolve(config);
                                }).then(options.request || action.request).then(function (config) {
                                    return adapter.HTTP(config);
                                }).then(function (data) {
                                    if (data && data.config) {
                                        data.config.resourceName = def.name;
                                    }
                                    return data;
                                }).then(options.response || action.response, options.responseError || action.responseError);
                            };
                        });
                        _utils2.default.Events(def);
                        def.handleChange = function (data) {
                            resource.collectionModified = _utils2.default.updateTimestamp(resource.collectionModified);
                            if (def.notify) {
                                setTimeout(function () {
                                    def.emit('DS.change', def, data);
                                }, 0);
                            }
                        };
                        def.logFn('Done preparing resource.');
                        return { v: def };
                    }();
                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object')
                        return _ret.v;
                } catch (err) {
                    _this.defaults.errorFn(err);
                    delete definitions[definition.name];
                    delete _this.store[definition.name];
                    throw err;
                }
            };
        },
        function (module, exports) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            module.exports = function eject(resourceName, id, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var item = undefined;
                var found = false;
                id = DSUtils.resolveId(definition, id);
                if (!definition) {
                    throw new _this.errors.NER(resourceName);
                } else if (!DSUtils._sn(id)) {
                    throw DSUtils._snErr('id');
                }
                options = DSUtils._(definition, options);
                options.logFn('eject', id, options);
                for (var i = 0; i < resource.collection.length; i++) {
                    if (resource.collection[i][definition.idAttribute] == id) {
                        item = resource.collection[i];
                        resource.expiresHeap.remove(item);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    var _ret = function () {
                        definition.beforeEject(options, item);
                        if (options.notify) {
                            definition.emit('DS.beforeEject', definition, item);
                        }
                        var toRemove = [];
                        DSUtils.forOwn(resource.queryData, function (items, queryHash) {
                            if (items.$$injected) {
                                DSUtils.remove(items, item);
                            }
                            if (!items.length && options.clearEmptyQueries) {
                                toRemove.push(queryHash);
                            }
                        });
                        DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
                            DSUtils.remove(resource.changeHistory, changeRecord);
                        });
                        DSUtils.forEach(toRemove, function (queryHash) {
                            delete resource.completedQueries[queryHash];
                            delete resource.queryData[queryHash];
                        });
                        if (resource.observers[id] && typeof resource.observers[id].close === 'function') {
                            resource.observers[id].close();
                        }
                        delete resource.observers[id];
                        delete resource.index[id];
                        delete resource.previousAttributes[id];
                        delete resource.completedQueries[id];
                        delete resource.pendingQueries[id];
                        delete resource.changeHistories[id];
                        delete resource.modified[id];
                        delete resource.saved[id];
                        if (definition.instanceEvents && item.off) {
                            item.off();
                        }
                        resource.collection.splice(i, 1);
                        definition.handleChange(item);
                        definition.afterEject(options, item);
                        if (options.notify) {
                            definition.emit('DS.afterEject', definition, item);
                        }
                        return { v: item };
                    }();
                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object')
                        return _ret.v;
                }
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function ejectAll(resourceName, params, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                params = params || {};
                if (!definition) {
                    throw new _this.errors.NER(resourceName);
                } else if (!DSUtils._o(params)) {
                    throw DSUtils._oErr('params');
                }
                options = DSUtils._(definition, options);
                definition.logFn('ejectAll', params, options);
                DSUtils.applyScope(definition, params, options);
                var resource = _this.store[resourceName];
                var queryHash = DSUtils.toJson(params);
                var items = definition.filter(params);
                if (DSUtils.isEmpty(params)) {
                    resource.completedQueries = {};
                } else {
                    delete resource.completedQueries[queryHash];
                }
                DSUtils.forEach(items, function (item) {
                    if (item && item[definition.idAttribute]) {
                        definition.eject(item[definition.idAttribute], options);
                    }
                });
                definition.handleChange(items);
                return items;
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function filter(resourceName, params, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                if (!definition) {
                    throw new _this.errors.NER(resourceName);
                } else if (params && !DSUtils._o(params)) {
                    throw DSUtils._oErr('params');
                }
                params = params || {};
                options = DSUtils._(definition, options);
                options.logFn('filter', params, options);
                DSUtils.applyScope(definition, params, options);
                return definition.defaultFilter.call(_this, _this.store[resourceName].collection, resourceName, params, options);
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var _utils = __webpack_require__(2);
            var _utils2 = _interopRequireDefault(_utils);
            var _errors = __webpack_require__(3);
            var _errors2 = _interopRequireDefault(_errors);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            function makeObserverHandler(definition, resource) {
                var DS = this;
                var name = definition.name;
                return function _react(added, removed, changed, oldValueFn, firstTime) {
                    var target = this;
                    var item = undefined;
                    var innerId = oldValueFn && oldValueFn(definition.idAttribute) ? oldValueFn(definition.idAttribute) : target[definition.idAttribute];
                    _utils2.default.forEach(definition.relationFields, function (field) {
                        delete added[field];
                        delete removed[field];
                        delete changed[field];
                    });
                    if (!_utils2.default.isEmpty(added) || !_utils2.default.isEmpty(removed) || !_utils2.default.isEmpty(changed) || firstTime) {
                        item = DS.get(name, innerId);
                        resource.modified[innerId] = _utils2.default.updateTimestamp(resource.modified[innerId]);
                        if (item && definition.instanceEvents) {
                            setTimeout(function () {
                                item.emit('DS.change', definition, item);
                            }, 0);
                        }
                        definition.handleChange(item);
                        if (definition.keepChangeHistory) {
                            var changeRecord = {
                                resourceName: name,
                                target: item,
                                added: added,
                                removed: removed,
                                changed: changed,
                                timestamp: resource.modified[innerId]
                            };
                            resource.changeHistories[innerId].push(changeRecord);
                            resource.changeHistory.push(changeRecord);
                        }
                    }
                    if (definition.computed) {
                        item = item || DS.get(name, innerId);
                        _utils2.default.forOwn(definition.computed, function (fn, field) {
                            if (_utils2.default._o(fn)) {
                                return;
                            }
                            var compute = false;
                            _utils2.default.forEach(fn.deps, function (dep) {
                                if (dep in added || dep in removed || dep in changed || !(field in item)) {
                                    compute = true;
                                }
                            });
                            compute = compute || !fn.deps.length;
                            if (compute) {
                                _utils2.default.compute.call(item, fn, field);
                            }
                        });
                    }
                    if (definition.idAttribute in changed) {
                        definition.errorFn('Doh! You just changed the primary key of an object! Your data for the "' + name + '" resource is now in an undefined (probably broken) state.');
                    }
                };
            }
            function _inject(definition, resource, attrs, options) {
                var _this = this;
                var injected = undefined;
                if (_utils2.default._a(attrs)) {
                    injected = [];
                    for (var i = 0; i < attrs.length; i++) {
                        injected.push(_inject.call(_this, definition, resource, attrs[i], options));
                    }
                } else {
                    var c = definition.computed;
                    var idA = definition.idAttribute;
                    if (c && c[idA]) {
                        (function () {
                            var args = [];
                            _utils2.default.forEach(c[idA].deps, function (dep) {
                                args.push(attrs[dep]);
                            });
                            attrs[idA] = c[idA][c[idA].length - 1].apply(attrs, args);
                        }());
                    } else if (options.temporary) {
                        attrs[idA] = _utils2.default.guid();
                    }
                    if (!(idA in attrs)) {
                        var error = new _errors2.default.R(definition.name + '.inject: "attrs" must contain the property specified by "idAttribute"!');
                        options.errorFn(error);
                        throw error;
                    } else {
                        try {
                            (function () {
                                _utils2.default.forEach(definition.relationList, function (def) {
                                    var relationName = def.relation;
                                    var relationDef = _this.definitions[relationName];
                                    var toInject = attrs[def.localField];
                                    if (typeof def.inject === 'function') {
                                        def.inject(definition, def, attrs);
                                    } else if (toInject && def.inject !== false) {
                                        if (!relationDef) {
                                            throw new _errors2.default.R(definition.name + ' relation is defined but the resource is not!');
                                        }
                                        if (_utils2.default._a(toInject)) {
                                            (function () {
                                                var items = [];
                                                _utils2.default.forEach(toInject, function (toInjectItem) {
                                                    if (toInjectItem !== _this.store[relationName].index[toInjectItem[relationDef.idAttribute]]) {
                                                        try {
                                                            var injectedItem = relationDef.inject(toInjectItem, options.orig());
                                                            if (def.foreignKey) {
                                                                _utils2.default.set(injectedItem, def.foreignKey, attrs[definition.idAttribute]);
                                                            }
                                                            items.push(injectedItem);
                                                        } catch (err) {
                                                            options.errorFn(err, 'Failed to inject ' + def.type + ' relation: "' + relationName + '"!');
                                                        }
                                                    }
                                                });
                                            }());
                                        } else {
                                            if (toInject !== _this.store[relationName].index[toInject[relationDef.idAttribute]]) {
                                                try {
                                                    var _injected = relationDef.inject(attrs[def.localField], options.orig());
                                                    if (def.foreignKey) {
                                                        _utils2.default.set(_injected, def.foreignKey, attrs[definition.idAttribute]);
                                                    }
                                                    if (def.localKey) {
                                                        _utils2.default.set(attrs, def.localKey, _utils2.default.get(_injected, relationDef.idAttribute));
                                                    }
                                                } catch (err) {
                                                    options.errorFn(err, 'Failed to inject ' + def.type + ' relation: "' + relationName + '"!');
                                                }
                                            }
                                        }
                                    }
                                });
                                var id = attrs[idA];
                                var item = definition.get(id);
                                var initialLastModified = item ? resource.modified[id] : 0;
                                if (!item) {
                                    if (attrs instanceof definition[definition['class']]) {
                                        item = attrs;
                                    } else {
                                        item = new definition[definition['class']]();
                                    }
                                    if (definition.instanceEvents && typeof item.emit !== 'function') {
                                        _utils2.default.Events(item);
                                    }
                                    _utils2.default.forEach(definition.relationList, function (def) {
                                        if (typeof def.link === 'boolean' ? def.link : !!definition.linkRelations) {
                                            delete attrs[def.localField];
                                        }
                                    });
                                    _utils2.default.deepMixIn(item, attrs);
                                    resource.collection.push(item);
                                    resource.changeHistories[id] = [];
                                    var _react = makeObserverHandler.call(_this, definition, resource);
                                    if (definition.watchChanges) {
                                        resource.observers[id] = new _this.observe.ObjectObserver(item);
                                        resource.observers[id].open(_react, item);
                                    }
                                    resource.index[id] = item;
                                    _react.call(item, {}, {}, {}, null, true);
                                    resource.previousAttributes[id] = _utils2.default.copy(item, null, null, null, definition.relationFields);
                                    if (options.temporary) {
                                        resource.temporaryItems[id] = true;
                                    }
                                } else {
                                    if (options.onConflict === 'merge') {
                                        _utils2.default.deepMixIn(item, attrs);
                                    } else if (options.onConflict === 'replace') {
                                        _utils2.default.forOwn(item, function (v, k) {
                                            if (k !== definition.idAttribute) {
                                                if (!attrs.hasOwnProperty(k)) {
                                                    delete item[k];
                                                }
                                            }
                                        });
                                        _utils2.default.forOwn(attrs, function (v, k) {
                                            if (k !== definition.idAttribute) {
                                                item[k] = v;
                                            }
                                        });
                                    }
                                    if (definition.resetHistoryOnInject) {
                                        _this.commit(definition.name, id);
                                    }
                                    if (resource.observers[id] && typeof resource.observers[id] === 'function') {
                                        resource.observers[id].deliver();
                                    }
                                }
                                resource.modified[id] = initialLastModified && resource.modified[id] === initialLastModified ? _utils2.default.updateTimestamp(resource.modified[id]) : resource.modified[id];
                                resource.expiresHeap.remove(item);
                                var timestamp = new Date().getTime();
                                resource.expiresHeap.push({
                                    item: item,
                                    timestamp: timestamp,
                                    expires: definition.maxAge ? timestamp + definition.maxAge : Number.MAX_VALUE
                                });
                                injected = item;
                            }());
                        } catch (err) {
                            options.errorFn(err, attrs);
                        }
                    }
                }
                return injected;
            }
            module.exports = function inject(resourceName, attrs, options) {
                var _this = this;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var injected = undefined;
                if (!definition) {
                    throw new _errors2.default.NER(resourceName);
                } else if (!_utils2.default._o(attrs) && !_utils2.default._a(attrs)) {
                    throw new _errors2.default.IA(resourceName + '.inject: "attrs" must be an object or an array!');
                }
                options = _utils2.default._(definition, options);
                options.logFn('inject', attrs, options);
                options.beforeInject(options, attrs);
                if (options.notify) {
                    definition.emit('DS.beforeInject', definition, attrs);
                }
                injected = _inject.call(_this, definition, resource, attrs, options);
                definition.handleChange(injected);
                options.afterInject(options, injected);
                if (options.notify) {
                    definition.emit('DS.afterInject', definition, injected);
                }
                return injected;
            };
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = {
                create: __webpack_require__(48),
                destroy: __webpack_require__(49),
                destroyAll: __webpack_require__(50),
                find: __webpack_require__(51),
                findAll: __webpack_require__(52),
                loadRelations: __webpack_require__(53),
                reap: __webpack_require__(54),
                refresh: function refresh(resourceName, id, options) {
                    var _this = this;
                    var DSUtils = _this.utils;
                    return new DSUtils.Promise(function (resolve, reject) {
                        var definition = _this.definitions[resourceName];
                        id = DSUtils.resolveId(_this.definitions[resourceName], id);
                        if (!definition) {
                            reject(new _this.errors.NER(resourceName));
                        } else if (!DSUtils._sn(id)) {
                            reject(DSUtils._snErr('id'));
                        } else {
                            options = DSUtils._(definition, options);
                            options.bypassCache = true;
                            options.logFn('refresh', id, options);
                            resolve(_this.get(resourceName, id));
                        }
                    }).then(function (item) {
                        return item ? _this.find(resourceName, id, options) : item;
                    }).catch(_this.errorFn('refresh', resourceName, id, options));
                },
                refreshAll: function refreshAll(resourceName, params, options) {
                    var _this = this;
                    var DSUtils = _this.utils;
                    var definition = _this.definitions[resourceName];
                    params = params || {};
                    return new DSUtils.Promise(function (resolve, reject) {
                        if (!definition) {
                            reject(new _this.errors.NER(resourceName));
                        } else if (!DSUtils._o(params)) {
                            reject(DSUtils._oErr('params'));
                        } else {
                            options = DSUtils._(definition, options);
                            options.bypassCache = true;
                            options.logFn('refreshAll', params, options);
                            resolve(_this.filter(resourceName, params, options));
                        }
                    }).then(function (existing) {
                        options.bypassCache = true;
                        return _this.findAll(resourceName, params, options).then(function (found) {
                            DSUtils.forEach(existing, function (item) {
                                if (found.indexOf(item) === -1) {
                                    definition.eject(item);
                                }
                            });
                            return found;
                        });
                    }).catch(_this.errorFn('refreshAll', resourceName, params, options));
                },
                save: __webpack_require__(55),
                update: __webpack_require__(56),
                updateAll: __webpack_require__(57)
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function create(resourceName, attrs, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var adapter = undefined;
                options = options || {};
                attrs = attrs || {};
                var rejectionError = undefined;
                if (!definition) {
                    rejectionError = new _this.errors.NER(resourceName);
                } else if (!DSUtils._o(attrs)) {
                    rejectionError = DSUtils._oErr('attrs');
                } else {
                    options = DSUtils._(definition, options);
                    if (options.upsert && DSUtils._sn(attrs[definition.idAttribute]) && !resource.temporaryItems[attrs[definition.idAttribute]]) {
                        return _this.update(resourceName, attrs[definition.idAttribute], attrs, options);
                    }
                    options.logFn('create', attrs, options);
                }
                return new DSUtils.Promise(function (resolve, reject) {
                    if (rejectionError) {
                        reject(rejectionError);
                    } else {
                        resolve(attrs);
                    }
                }).then(function (attrs) {
                    return options.beforeValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.validate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.afterValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.beforeCreate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.beforeCreate', definition, attrs);
                    }
                    adapter = _this.getAdapterName(options);
                    return _this.adapters[adapter].create(definition, DSUtils.omit(attrs, options.omit), options);
                }).then(function (attrs) {
                    return options.afterCreate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.afterCreate', definition, attrs);
                    }
                    if (options.cacheResponse) {
                        var created = _this.inject(definition.name, attrs, options.orig());
                        var id = created[definition.idAttribute];
                        var _resource = _this.store[resourceName];
                        _resource.completedQueries[id] = new Date().getTime();
                        _resource.saved[id] = DSUtils.updateTimestamp(_resource.saved[id]);
                        return created;
                    } else {
                        return _this.createInstance(resourceName, attrs, options);
                    }
                }).then(function (item) {
                    return DSUtils.respond(item, { adapter: adapter }, options);
                })['catch'](_this.errorFn('create', resourceName, attrs, options));
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function destroy(resourceName, id, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var item = undefined, adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    id = DSUtils.resolveId(definition, id);
                    if (!definition) {
                        reject(new _this.errors.NER(resourceName));
                    } else if (!DSUtils._sn(id)) {
                        reject(DSUtils._snErr('id'));
                    } else {
                        item = definition.get(id) || { id: id };
                        options = DSUtils._(definition, options);
                        options.logFn('destroy', id, options);
                        resolve(item);
                    }
                }).then(function (attrs) {
                    return options.beforeDestroy.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.beforeDestroy', definition, attrs);
                    }
                    if (options.eagerEject) {
                        definition.eject(id);
                    }
                    adapter = definition.getAdapter(options);
                    return adapter.destroy(definition, id, options);
                }).then(function () {
                    return options.afterDestroy.call(item, options, item);
                }).then(function (item) {
                    if (options.notify) {
                        definition.emit('DS.afterDestroy', definition, item);
                    }
                    definition.eject(id);
                    return DSUtils.respond(id, { adapter: adapter }, options);
                })['catch'](function (err) {
                    if (options && options.eagerEject && item) {
                        definition.inject(item, { notify: false });
                    }
                    return _this.errorFn('destroy', resourceName, id, options)(err);
                });
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function destroyAll(resourceName, params, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var ejected = undefined, toEject = undefined, adapter = undefined;
                params = params || {};
                return new DSUtils.Promise(function (resolve, reject) {
                    if (!definition) {
                        reject(new _this.errors.NER(resourceName));
                    } else if (!DSUtils._o(params)) {
                        reject(DSUtils._oErr('attrs'));
                    } else {
                        options = DSUtils._(definition, options);
                        options.logFn('destroyAll', params, options);
                        DSUtils.applyScope(definition, params, options);
                        resolve();
                    }
                }).then(function () {
                    toEject = definition.defaultFilter.call(_this, resourceName, params);
                    return options.beforeDestroy(options, toEject);
                }).then(function () {
                    if (options.notify) {
                        definition.emit('DS.beforeDestroy', definition, toEject);
                    }
                    if (options.eagerEject) {
                        ejected = definition.ejectAll(params);
                    }
                    adapter = definition.getAdapterName(options);
                    return _this.adapters[adapter].destroyAll(definition, params, options);
                }).then(function () {
                    return options.afterDestroy(options, toEject);
                }).then(function () {
                    if (options.notify) {
                        definition.emit('DS.afterDestroy', definition, toEject);
                    }
                    return ejected || definition.ejectAll(params);
                }).then(function (items) {
                    return DSUtils.respond(items, { adapter: adapter }, options);
                })['catch'](function (err) {
                    if (options && options.eagerEject && ejected) {
                        definition.inject(ejected, { notify: false });
                    }
                    return _this.errorFn('destroyAll', resourceName, params, options)(err);
                });
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function find(resourceName, id, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    if (!definition) {
                        reject(new _this.errors.NER(resourceName));
                    } else if (!DSUtils._sn(id)) {
                        reject(DSUtils._snErr('id'));
                    } else {
                        options = DSUtils._(definition, options);
                        options.logFn('find', id, options);
                        if (options.params) {
                            options.params = DSUtils.copy(options.params);
                        }
                        if (options.bypassCache || !options.cacheResponse) {
                            delete resource.completedQueries[id];
                        }
                        var expired = options.maxAge && id in resource.completedQueries && resource.completedQueries[id] + options.maxAge < new Date().getTime();
                        if ((!options.findStrictCache || id in resource.completedQueries) && definition.get(id) && !options.bypassCache && !expired) {
                            resolve(definition.get(id));
                        } else {
                            delete resource.completedQueries[id];
                            resolve();
                        }
                    }
                }).then(function (item) {
                    if (!item) {
                        if (!(id in resource.pendingQueries)) {
                            var promise = undefined;
                            var strategy = options.findStrategy || options.strategy;
                            if (strategy === 'fallback') {
                                var makeFallbackCall = function makeFallbackCall(index) {
                                    adapter = definition.getAdapterName((options.findFallbackAdapters || options.fallbackAdapters)[index]);
                                    return _this.adapters[adapter].find(definition, id, options)['catch'](function (err) {
                                        index++;
                                        if (index < options.fallbackAdapters.length) {
                                            return makeFallbackCall(index);
                                        } else {
                                            return DSUtils.Promise.reject(err);
                                        }
                                    });
                                };
                                promise = makeFallbackCall(0);
                            } else {
                                adapter = definition.getAdapterName(options);
                                promise = _this.adapters[adapter].find(definition, id, options);
                            }
                            resource.pendingQueries[id] = promise.then(function (data) {
                                return options.afterFind.call(data, options, data);
                            }).then(function (data) {
                                delete resource.pendingQueries[id];
                                if (options.cacheResponse) {
                                    var injected = definition.inject(data, options.orig());
                                    resource.completedQueries[id] = new Date().getTime();
                                    resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
                                    return injected;
                                } else {
                                    return definition.createInstance(data, options.orig());
                                }
                            });
                        }
                        return resource.pendingQueries[id];
                    } else {
                        return item;
                    }
                }).then(function (item) {
                    return DSUtils.respond(item, { adapter: adapter }, options);
                })['catch'](function (err) {
                    if (resource) {
                        delete resource.pendingQueries[id];
                    }
                    return _this.errorFn('find', resourceName, id, options)(err);
                });
            };
        },
        function (module, exports) {
            'use strict';
            function processResults(data, resourceName, queryHash, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var idAttribute = definition.idAttribute;
                var date = new Date().getTime();
                data = data || [];
                delete resource.pendingQueries[queryHash];
                resource.completedQueries[queryHash] = date;
                var injected = definition.inject(data, options.orig());
                if (DSUtils._a(injected)) {
                    DSUtils.forEach(injected, function (item) {
                        if (item) {
                            var id = item[idAttribute];
                            if (id) {
                                resource.completedQueries[id] = date;
                                resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
                            }
                        }
                    });
                } else {
                    options.errorFn('response is expected to be an array!');
                    resource.completedQueries[injected[idAttribute]] = date;
                }
                return injected;
            }
            module.exports = function findAll(resourceName, params, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var queryHash = undefined, adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    params = params || {};
                    if (!_this.definitions[resourceName]) {
                        reject(new _this.errors.NER(resourceName));
                    } else if (!DSUtils._o(params)) {
                        reject(DSUtils._oErr('params'));
                    } else {
                        options = DSUtils._(definition, options);
                        queryHash = DSUtils.toJson(params);
                        options.logFn('findAll', params, options);
                        if (options.params) {
                            options.params = DSUtils.copy(options.params);
                        }
                        DSUtils.applyScope(definition, params, options);
                        if (options.bypassCache || !options.cacheResponse) {
                            delete resource.completedQueries[queryHash];
                            delete resource.queryData[queryHash];
                        }
                        var expired = options.maxAge && queryHash in resource.completedQueries && resource.completedQueries[queryHash] + options.maxAge < new Date().getTime();
                        if (queryHash in resource.completedQueries && !expired) {
                            if (options.useFilter) {
                                if (options.localKeys) {
                                    resolve(definition.getAll(options.localKeys, options.orig()));
                                } else {
                                    resolve(definition.filter(params, options.orig()));
                                }
                            } else {
                                resolve(resource.queryData[queryHash]);
                            }
                        } else {
                            resolve();
                        }
                    }
                }).then(function (items) {
                    if (!items) {
                        if (!(queryHash in resource.pendingQueries)) {
                            var promise = undefined;
                            var strategy = options.findAllStrategy || options.strategy;
                            if (strategy === 'fallback') {
                                var makeFallbackCall = function makeFallbackCall(index) {
                                    adapter = definition.getAdapterName((options.findAllFallbackAdapters || options.fallbackAdapters)[index]);
                                    return _this.adapters[adapter].findAll(definition, params, options)['catch'](function (err) {
                                        index++;
                                        if (index < options.fallbackAdapters.length) {
                                            return makeFallbackCall(index);
                                        } else {
                                            return DSUtils.Promise.reject(err);
                                        }
                                    });
                                };
                                promise = makeFallbackCall(0);
                            } else {
                                adapter = definition.getAdapterName(options);
                                promise = _this.adapters[adapter].findAll(definition, params, options);
                            }
                            resource.pendingQueries[queryHash] = promise.then(function (data) {
                                return options.afterFindAll.call(data, options, data);
                            }).then(function (data) {
                                delete resource.pendingQueries[queryHash];
                                if (options.cacheResponse) {
                                    resource.queryData[queryHash] = processResults.call(_this, data, resourceName, queryHash, options);
                                    resource.queryData[queryHash].$$injected = true;
                                    return resource.queryData[queryHash];
                                } else {
                                    DSUtils.forEach(data, function (item, i) {
                                        data[i] = definition.createInstance(item, options.orig());
                                    });
                                    return data;
                                }
                            });
                        }
                        return resource.pendingQueries[queryHash];
                    } else {
                        return items;
                    }
                }).then(function (items) {
                    return DSUtils.respond(items, { adapter: adapter }, options);
                })['catch'](function (err) {
                    if (resource) {
                        delete resource.pendingQueries[queryHash];
                    }
                    return _this.errorFn('findAll', resourceName, params, options)(err);
                });
            };
        },
        function (module, exports) {
            'use strict';
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }
            module.exports = function loadRelations(resourceName, instance, relations, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var DSErrors = _this.errors;
                var definition = _this.definitions[resourceName];
                var _options = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    if (DSUtils._sn(instance)) {
                        instance = definition.get(instance);
                    }
                    if (DSUtils._s(relations)) {
                        relations = [relations];
                    }
                    relations = relations || [];
                    if (!definition) {
                        reject(new DSErrors.NER(resourceName));
                    } else if (!DSUtils._o(instance)) {
                        reject(new DSErrors.IA('"instance(id)" must be a string, number or object!'));
                    } else if (!DSUtils._a(relations)) {
                        reject(new DSErrors.IA('"relations" must be a string or an array!'));
                    } else {
                        (function () {
                            _options = DSUtils._(definition, options);
                            _options.logFn('loadRelations', instance, relations, _options);
                            var tasks = [];
                            DSUtils.forEach(definition.relationList, function (def) {
                                var relationName = def.relation;
                                var relationDef = definition.getResource(relationName);
                                var __options = DSUtils._(relationDef, options);
                                if (!relations.length || DSUtils.contains(relations, relationName) || DSUtils.contains(relations, def.localField)) {
                                    var task = undefined;
                                    var params = {};
                                    if (__options.allowSimpleWhere) {
                                        params[def.foreignKey] = instance[definition.idAttribute];
                                    } else {
                                        params.where = {};
                                        params.where[def.foreignKey] = { '==': instance[definition.idAttribute] };
                                    }
                                    var orig = __options.orig();
                                    var defKey = def.localKey ? DSUtils.get(instance, def.localKey) : null;
                                    var hasDefKey = !!(defKey || defKey === 0);
                                    if (typeof def.load === 'function') {
                                        task = def.load(definition, def, instance, orig);
                                    } else {
                                        if (def.type === 'hasMany') {
                                            if (def.localKeys) {
                                                delete params[def.foreignKey];
                                                var keys = DSUtils.get(instance, def.localKeys) || [];
                                                keys = DSUtils._a(keys) ? keys : DSUtils.keys(keys);
                                                params.where = _defineProperty({}, relationDef.idAttribute, { 'in': keys });
                                                orig.localKeys = keys;
                                            } else if (def.foreignKeys) {
                                                delete params[def.foreignKey];
                                                params.where = _defineProperty({}, def.foreignKeys, { contains: instance[definition.idAttribute] });
                                            }
                                            task = relationDef.findAll(params, orig);
                                        } else if (def.type === 'hasOne') {
                                            if (def.localKey && hasDefKey) {
                                                task = relationDef.find(defKey, orig);
                                            } else if (def.foreignKey) {
                                                task = relationDef.findAll(params, orig).then(function (hasOnes) {
                                                    return hasOnes.length ? hasOnes[0] : null;
                                                });
                                            }
                                        } else if (hasDefKey) {
                                            task = relationDef.find(defKey, orig);
                                        }
                                    }
                                    if (task) {
                                        if (!_options.linkRelations) {
                                            task = task.then(function (data) {
                                                instance[def.localField] = data;
                                            });
                                        }
                                        tasks.push(task);
                                    }
                                }
                            });
                            resolve(tasks);
                        }());
                    }
                }).then(function (tasks) {
                    return DSUtils.Promise.all(tasks);
                }).then(function () {
                    return _options.afterLoadRelations.call(instance, _options, instance);
                }).catch(_this.errorFn('loadRelations', resourceName, instance, relations, options));
            };
        },
        function (module, exports) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            module.exports = function reap(resourceName, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                return new DSUtils.Promise(function (resolve, reject) {
                    if (!definition) {
                        reject(new _this.errors.NER(resourceName));
                    } else {
                        options = DSUtils._(definition, options);
                        if (!options.hasOwnProperty('notify')) {
                            options.notify = false;
                        }
                        options.logFn('reap', options);
                        var items = [];
                        var now = new Date().getTime();
                        var expiredItem = undefined;
                        while ((expiredItem = resource.expiresHeap.peek()) && expiredItem.expires < now) {
                            items.push(expiredItem.item);
                            delete expiredItem.item;
                            resource.expiresHeap.pop();
                        }
                        resolve(items);
                    }
                }).then(function (items) {
                    if (items.length) {
                        definition.beforeReap(options, items);
                        if (options.notify) {
                            definition.emit('DS.beforeReap', definition, items);
                        }
                    }
                    if (options.reapAction === 'inject') {
                        (function () {
                            var timestamp = new Date().getTime();
                            DSUtils.forEach(items, function (item) {
                                resource.expiresHeap.push({
                                    item: item,
                                    timestamp: timestamp,
                                    expires: definition.maxAge ? timestamp + definition.maxAge : Number.MAX_VALUE
                                });
                            });
                        }());
                    } else if (options.reapAction === 'eject') {
                        DSUtils.forEach(items, function (item) {
                            definition.eject(item[definition.idAttribute]);
                        });
                    } else if (options.reapAction === 'refresh') {
                        var _ret2 = function () {
                            var tasks = [];
                            DSUtils.forEach(items, function (item) {
                                tasks.push(definition.refresh(item[definition.idAttribute]));
                            });
                            return { v: DSUtils.Promise.all(tasks) };
                        }();
                        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === 'object')
                            return _ret2.v;
                    }
                    return items;
                }).then(function (items) {
                    if (items.length) {
                        definition.afterReap(options, items);
                        if (options.notify) {
                            definition.emit('DS.afterReap', definition, items);
                        }
                    }
                    return items;
                }).catch(_this.errorFn('reap', resourceName, options));
            };
        },
        function (module, exports) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            module.exports = function save(resourceName, id, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var DSErrors = _this.errors;
                var definition = _this.definitions[resourceName];
                var resource = _this.store[resourceName];
                var item = undefined, noChanges = undefined, adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    id = DSUtils.resolveId(definition, id);
                    if (!definition) {
                        reject(new DSErrors.NER(resourceName));
                    } else if (!DSUtils._sn(id)) {
                        reject(DSUtils._snErr('id'));
                    } else if (!definition.get(id)) {
                        reject(new DSErrors.R('id "' + id + '" not found in cache!'));
                    } else {
                        item = definition.get(id);
                        options = DSUtils._(definition, options);
                        options.logFn('save', id, options);
                        resolve(item);
                    }
                }).then(function (attrs) {
                    return options.beforeValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.validate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.afterValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.beforeUpdate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.beforeUpdate', definition, attrs);
                    }
                    if (options.changesOnly) {
                        var key;
                        var _ret = function () {
                            if (resource.observers[id] && typeof resource.observers[id] === 'function') {
                                resource.observers[id].deliver();
                            }
                            var toKeep = [];
                            var changes = definition.changes(id);
                            for (key in changes.added) {
                                toKeep.push(key);
                            }
                            for (key in changes.changed) {
                                toKeep.push(key);
                            }
                            DSUtils.forEach(options.always, function (property) {
                                toKeep.push(property);
                            });
                            changes = DSUtils.pick(attrs, toKeep);
                            if (DSUtils.isEmpty(changes)) {
                                options.logFn('save - no changes', id, options);
                                noChanges = true;
                                return { v: attrs };
                            } else {
                                attrs = changes;
                            }
                        }();
                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object')
                            return _ret.v;
                    }
                    adapter = definition.getAdapterName(options);
                    return _this.adapters[adapter].update(definition, id, DSUtils.omit(attrs, options.omit), options);
                }).then(function (data) {
                    return options.afterUpdate.call(data, options, data);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.afterUpdate', definition, attrs);
                    }
                    if (noChanges) {
                        return attrs;
                    } else if (options.cacheResponse) {
                        var injected = definition.inject(attrs, options.orig());
                        resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
                        if (!definition.resetHistoryOnInject) {
                            resource.previousAttributes[id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
                        }
                        return injected;
                    } else {
                        return definition.createInstance(attrs, options.orig());
                    }
                }).then(function (item) {
                    return DSUtils.respond(item, { adapter: adapter }, options);
                }).catch(_this.errorFn('save', resourceName, id, options));
            };
        },
        function (module, exports) {
            'use strict';
            module.exports = function update(resourceName, id, attrs, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var DSErrors = _this.errors;
                var definition = _this.definitions[resourceName];
                var adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    id = DSUtils.resolveId(definition, id);
                    if (!definition) {
                        reject(new DSErrors.NER(resourceName));
                    } else if (!DSUtils._sn(id)) {
                        reject(DSUtils._snErr('id'));
                    } else {
                        options = DSUtils._(definition, options);
                        options.logFn('update', id, attrs, options);
                        resolve(attrs);
                    }
                }).then(function (attrs) {
                    return options.beforeValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.validate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.afterValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.beforeUpdate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.beforeUpdate', definition, attrs);
                    }
                    adapter = definition.getAdapterName(options);
                    return _this.adapters[adapter].update(definition, id, DSUtils.omit(attrs, options.omit), options);
                }).then(function (data) {
                    return options.afterUpdate.call(data, options, data);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.afterUpdate', definition, attrs);
                    }
                    if (options.cacheResponse) {
                        var injected = definition.inject(attrs, options.orig());
                        var resource = _this.store[resourceName];
                        var _id = injected[definition.idAttribute];
                        resource.saved[_id] = DSUtils.updateTimestamp(resource.saved[_id]);
                        if (!definition.resetHistoryOnInject) {
                            resource.previousAttributes[_id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
                        }
                        return injected;
                    } else {
                        return definition.createInstance(attrs, options.orig());
                    }
                }).then(function (item) {
                    return DSUtils.respond(item, { adapter: adapter }, options);
                }).catch(_this.errorFn('update', resourceName, id, attrs, options));
            };
        },
        function (module, exports) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            module.exports = function updateAll(resourceName, attrs, params, options) {
                var _this = this;
                var DSUtils = _this.utils;
                var DSErrors = _this.errors;
                var definition = _this.definitions[resourceName];
                var adapter = undefined;
                return new DSUtils.Promise(function (resolve, reject) {
                    if (!definition) {
                        reject(new DSErrors.NER(resourceName));
                    } else {
                        options = DSUtils._(definition, options);
                        options.logFn('updateAll', attrs, params, options);
                        DSUtils.applyScope(definition, params, options);
                        resolve(attrs);
                    }
                }).then(function (attrs) {
                    return options.beforeValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.validate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.afterValidate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    return options.beforeUpdate.call(attrs, options, attrs);
                }).then(function (attrs) {
                    if (options.notify) {
                        definition.emit('DS.beforeUpdate', definition, attrs);
                    }
                    adapter = definition.getAdapterName(options);
                    return _this.adapters[adapter].updateAll(definition, DSUtils.omit(attrs, options.omit), params, options);
                }).then(function (data) {
                    return options.afterUpdate.call(data, options, data);
                }).then(function (data) {
                    if (options.notify) {
                        definition.emit('DS.afterUpdate', definition, attrs);
                    }
                    var origOptions = options.orig();
                    if (options.cacheResponse) {
                        var _ret = function () {
                            var injected = definition.inject(data, origOptions);
                            var resource = _this.store[resourceName];
                            DSUtils.forEach(injected, function (i) {
                                var id = i[definition.idAttribute];
                                resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
                                if (!definition.resetHistoryOnInject) {
                                    resource.previousAttributes[id] = DSUtils.copy(i, null, null, null, definition.relationFields);
                                }
                            });
                            return { v: injected };
                        }();
                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object')
                            return _ret.v;
                    } else {
                        var _ret2 = function () {
                            var instances = [];
                            DSUtils.forEach(data, function (item) {
                                instances.push(definition.createInstance(item, origOptions));
                            });
                            return { v: instances };
                        }();
                        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === 'object')
                            return _ret2.v;
                    }
                }).then(function (items) {
                    return DSUtils.respond(items, { adapter: adapter }, options);
                }).catch(_this.errorFn('updateAll', resourceName, attrs, params, options));
            };
        }
    ]);
}));
;
/*js-data-angular@3.2.1#dist/js-data-angular*/
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require('js-data'), require('angular'), function webpackLoadOptionalExternalModule() {
            try {
                return require('axios');
            } catch (e) {
            }
        }());
    else if (typeof define === 'function' && define.amd)
        define('js-data-angular@3.2.1#dist/js-data-angular', [
            'js-data',
            'angular'
        ], function webpackLoadOptionalExternalModuleAmd(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
            return factory(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, root['axios']);
        });
    else if (typeof exports === 'object')
        exports['jsDataAngularModuleName'] = factory(require('js-data'), require('angular'), function webpackLoadOptionalExternalModule() {
            try {
                return require('axios');
            } catch (e) {
            }
        }());
    else
        root['jsDataAngularModuleName'] = factory(root['JSData'], root['angular'], root['axios']);
}(this, function (__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_3__) {
    return function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId])
                return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = '';
        return __webpack_require__(0);
    }([
        function (module, exports, __webpack_require__) {
            'use strict';
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            var JSData = __webpack_require__(1);
            var DSHttpAdapter = __webpack_require__(2);
            var angular = __webpack_require__(4);
            var DSUtils = JSData.DSUtils;
            var DSErrors = JSData.DSErrors;
            var get = DSUtils.get;
            var isString = DSUtils.isString;
            var isNumber = DSUtils.isNumber;
            var isObject = DSUtils.isObject;
            var set = DSUtils.set;
            var resolveId = DSUtils.resolveId;
            var adapters = [
                {
                    project: 'js-data-localstorage',
                    name: 'localstorage',
                    'class': 'DSLocalStorageAdapter'
                },
                {
                    project: 'js-data-localforage',
                    name: 'localforage',
                    'class': 'DSLocalForageAdapter'
                },
                {
                    project: 'js-data-firebase',
                    name: 'firebase',
                    'class': 'DSFirebaseAdapter'
                },
                {
                    project: 'js-data-sql',
                    name: 'sql',
                    'class': 'DSSqlAdapter'
                }
            ];
            var functionsToWrap = [
                'compute',
                'digest',
                'eject',
                'inject'
            ];
            function registerAdapter(adapter) {
                var Adapter = void 0;
                try {
                    Adapter = __webpack_require__(5)(adapter.project);
                } catch (e) {
                }
                if (!Adapter) {
                    Adapter = window[adapter.class];
                }
                if (Adapter) {
                    adapter.loaded = true;
                    angular.module('js-data').provider(adapter.class, function () {
                        var _this = this;
                        _this.defaults = {};
                        _this.$get = [function () {
                                return new Adapter(_this.defaults);
                            }];
                    });
                }
            }
            var DSHttpAdapterProvider = function DSHttpAdapterProvider() {
                _classCallCheck(this, DSHttpAdapterProvider);
                var defaults = {};
                this.defaults = defaults;
                this.$get = [
                    '$http',
                    'DS',
                    function ($http, DS) {
                        defaults.http = defaults.http || $http;
                        var adapter = new DSHttpAdapter(defaults);
                        DS.registerAdapter('http', adapter, { 'default': true });
                        return adapter;
                    }
                ];
            };
            var DSProvider = function DSProvider() {
                _classCallCheck(this, DSProvider);
                var _this = this;
                var deps = [];
                for (var i = 0; i < adapters.length; i++) {
                    if (adapters[i].loaded) {
                        deps.push(adapters[i].class);
                    }
                }
                _this.defaults = {};
                JSData.DS.prototype.bindAll = function (resourceName, params, scope, expr, cb) {
                    var _this = this;
                    params = params || {};
                    if (!_this.definitions[resourceName]) {
                        throw new DSErrors.NER(resourceName);
                    } else if (!isObject(params)) {
                        throw new DSErrors.IA('"params" must be an object!');
                    } else if (!isObject(scope)) {
                        throw new DSErrors.IA('"scope" must be an object!');
                    } else if (!isString(expr)) {
                        throw new DSErrors.IA('"expr" must be a string!');
                    }
                    var idAttribute = _this.definitions[resourceName].idAttribute;
                    try {
                        return scope.$watch(function () {
                            return _this.lastModified(resourceName);
                        }, function () {
                            var items = _this.filter(resourceName, params);
                            if (items && items.length) {
                                angular.forEach(items, function (item) {
                                    _this.compute(resourceName, get(item, idAttribute));
                                });
                            }
                            set(scope, expr, items);
                            if (cb) {
                                cb(null, items);
                            }
                        });
                    } catch (err) {
                        if (cb) {
                            cb(err);
                        } else {
                            throw err;
                        }
                    }
                };
                JSData.DS.prototype.bindOne = function (resourceName, id, scope, expr, cb) {
                    var _this = this;
                    id = resolveId(_this.definitions[resourceName], id);
                    if (!_this.definitions[resourceName]) {
                        throw new DSErrors.NER(resourceName);
                    } else if (!isString(id) && !isNumber(id)) {
                        throw new DSErrors.IA('"id" must be a string or a number!');
                    } else if (!isObject(scope)) {
                        throw new DSErrors.IA('"scope" must be an object!');
                    } else if (!isString(expr)) {
                        throw new DSErrors.IA('"expr" must be a string!');
                    }
                    try {
                        return scope.$watch(function () {
                            return _this.lastModified(resourceName, id);
                        }, function () {
                            var item = _this.get(resourceName, id);
                            if (item) {
                                _this.compute(resourceName, id);
                            }
                            set(scope, expr, item);
                            if (cb) {
                                cb(null, item);
                            }
                        });
                    } catch (err) {
                        if (cb) {
                            cb(err);
                        } else {
                            throw err;
                        }
                    }
                };
                function load() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    var $rootScope = args[args.length - 2];
                    var $q = args[args.length - 1];
                    var store = new JSData.DS(_this.defaults);
                    var originals = {};
                    function QPromise(executor) {
                        var deferred = $q.defer();
                        try {
                            executor(angular.bind(deferred, deferred.resolve), angular.bind(deferred, deferred.reject));
                        } catch (err) {
                            deferred.reject(err);
                        }
                        return deferred.promise;
                    }
                    QPromise.all = $q.all;
                    QPromise.when = $q.when;
                    QPromise.reject = $q.reject;
                    DSUtils.Promise = QPromise;
                    if (args.length) {
                        for (var i = 0; i < args.length; i++) {
                            for (var j = 0; j < adapters.length; j++) {
                                if (adapters[j].loaded && !adapters[j].registered) {
                                    adapters[j].registered = true;
                                    store.registerAdapter(adapters[j].name, args[i]);
                                    break;
                                }
                            }
                        }
                    }
                    var _loop = function _loop() {
                        var name = functionsToWrap[k];
                        originals[name] = store[name];
                        store[name] = function () {
                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }
                            if (!$rootScope.$$phase) {
                                return $rootScope.$apply(function () {
                                    return originals[name].apply(store, args);
                                });
                            }
                            return originals[name].apply(store, args);
                        };
                    };
                    for (var k = 0; k < functionsToWrap.length; k++) {
                        _loop();
                    }
                    if (typeof Object.observe !== 'function' || typeof Array.observe !== 'function') {
                        $rootScope.$watch(function () {
                            return store.observe.Platform.performMicrotaskCheckpoint();
                        });
                    }
                    return store;
                }
                deps.push('$rootScope');
                deps.push('$q');
                deps.push(load);
                _this.$get = deps;
            };
            angular.module('js-data', ['ng']).value('DSUtils', DSUtils).value('DSErrors', DSErrors).value('DSVersion', JSData.version).provider('DS', DSProvider).provider('DSHttpAdapter', DSHttpAdapterProvider).run([
                'DS',
                'DSHttpAdapter',
                function (DS, DSHttpAdapter) {
                    DS.registerAdapter('http', DSHttpAdapter, { 'default': true });
                }
            ]);
            for (var i = 0; i < adapters.length; i++) {
                registerAdapter(adapters[i]);
            }
            module.exports = 'js-data';
            try {
                module.exports.name = 'js-data';
            } catch (e) {
            }
        },
        function (module, exports) {
            module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
            };
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor)
                            descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                        defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            var JSData = __webpack_require__(1);
            var axios = null;
            try {
                axios = __webpack_require__(3);
            } catch (e) {
            }
            var DSUtils = JSData.DSUtils;
            var deepMixIn = DSUtils.deepMixIn;
            var removeCircular = DSUtils.removeCircular;
            var copy = DSUtils.copy;
            var makePath = DSUtils.makePath;
            var isString = DSUtils.isString;
            var isNumber = DSUtils.isNumber;
            function isUndefined(value) {
                return value === undefined;
            }
            var Defaults = function () {
                function Defaults() {
                    _classCallCheck(this, Defaults);
                }
                _createClass(Defaults, [
                    {
                        key: 'queryTransform',
                        value: function queryTransform(resourceConfig, params) {
                            return params;
                        }
                    },
                    {
                        key: 'deserialize',
                        value: function deserialize(resourceConfig, data) {
                            return data ? 'data' in data ? data.data : data : data;
                        }
                    },
                    {
                        key: 'serialize',
                        value: function serialize(resourceConfig, data) {
                            return data;
                        }
                    },
                    {
                        key: 'log',
                        value: function log() {
                        }
                    },
                    {
                        key: 'error',
                        value: function error() {
                        }
                    }
                ]);
                return Defaults;
            }();
            var defaultsPrototype = Defaults.prototype;
            defaultsPrototype.basePath = '';
            defaultsPrototype.forceTrailingSlash = '';
            defaultsPrototype.httpConfig = {};
            defaultsPrototype.verbsUseBasePath = false;
            var DSHttpAdapter = function () {
                function DSHttpAdapter(options) {
                    _classCallCheck(this, DSHttpAdapter);
                    options || (options = {});
                    this.defaults = new Defaults();
                    if (console) {
                        this.defaults.log = function (a, b) {
                            return console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
                        };
                    }
                    if (console) {
                        this.defaults.error = function (a, b) {
                            return console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
                        };
                    }
                    deepMixIn(this.defaults, options);
                    this.http = options.http || axios;
                }
                _createClass(DSHttpAdapter, [
                    {
                        key: 'getEndpoint',
                        value: function getEndpoint(resourceConfig, id, options) {
                            options || (options = {});
                            options.params = isUndefined(options.params) ? {} : options.params;
                            var endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint;
                            var parents = resourceConfig.parents || (resourceConfig.parent ? _defineProperty({}, resourceConfig.parent, {
                                key: resourceConfig.parentKey,
                                field: resourceConfig.parentField
                            }) : {});
                            DSUtils.forOwn(parents, function (parent, parentName) {
                                var _this2 = this;
                                var item = void 0;
                                var parentKey = parent.key;
                                var parentField = parent.field;
                                var parentDef = resourceConfig.getResource(parentName);
                                var parentId = options.params[parentKey];
                                if (parentId === false || !parentKey || !parentDef) {
                                    if (parentId === false) {
                                        delete options.params[parentKey];
                                    }
                                } else {
                                    delete options.params[parentKey];
                                    if (DSUtils._sn(id)) {
                                        item = resourceConfig.get(id);
                                    } else if (DSUtils._o(id)) {
                                        item = id;
                                    }
                                    if (item) {
                                        parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
                                    }
                                    if (parentId) {
                                        (function () {
                                            delete options.endpoint;
                                            var _options = {};
                                            DSUtils.forOwn(options, function (value, key) {
                                                _options[key] = value;
                                            });
                                            endpoint = DSUtils.makePath(_this2.getEndpoint(parentDef, parentId, DSUtils._(parentDef, _options)), parentId, endpoint);
                                        }());
                                    }
                                }
                            }, this);
                            return endpoint;
                        }
                    },
                    {
                        key: 'getPath',
                        value: function getPath(method, resourceConfig, id, options) {
                            var _this = this;
                            options || (options = {});
                            if (isString(options.urlPath)) {
                                return makePath.apply(DSUtils, [
                                    options.basePath || _this.defaults.basePath || resourceConfig.basePath,
                                    options.urlPath
                                ]);
                            } else {
                                var args = [
                                    options.basePath || _this.defaults.basePath || resourceConfig.basePath,
                                    this.getEndpoint(resourceConfig, isString(id) || isNumber(id) || method === 'create' ? id : null, options)
                                ];
                                if (method === 'find' || method === 'update' || method === 'destroy') {
                                    args.push(id);
                                }
                                return makePath.apply(DSUtils, args);
                            }
                        }
                    },
                    {
                        key: 'HTTP',
                        value: function HTTP(config) {
                            var _this = this;
                            var start = new Date();
                            var payload = config.data;
                            var cache = config.cache;
                            var timeout = config.timeout;
                            config = copy(config, null, null, null, [
                                'data',
                                'cache',
                                'timeout'
                            ]);
                            config = deepMixIn(config, _this.defaults.httpConfig);
                            config.data = payload;
                            config.cache = cache;
                            config.timeout = timeout;
                            if (!('verbsUseBasePath' in config)) {
                                config.verbsUseBasePath = _this.defaults.verbsUseBasePath;
                            }
                            if (!config.urlOverride && config.verbsUseBasePath) {
                                config.url = makePath(config.basePath || _this.defaults.basePath, config.url);
                            }
                            if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/' && !config.urlOverride) {
                                config.url += '/';
                            }
                            if (_typeof(config.data) === 'object') {
                                config.data = removeCircular(config.data);
                            }
                            config.method = config.method.toUpperCase();
                            var suffix = isUndefined(config.suffix) ? _this.defaults.suffix : config.suffix;
                            if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix && !config.urlOverride) {
                                config.url += suffix;
                            }
                            function logResponse(data, isRejection) {
                                data = data || {};
                                if (data instanceof Error) {
                                    _this.defaults.error('FAILED: ' + (data.message || 'Unknown Error'), data);
                                    return DSUtils.Promise.reject(data);
                                } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                                    var str = start.toUTCString() + ' - ' + config.method + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
                                    if (data.status >= 200 && data.status < 300 && !isRejection) {
                                        if (_this.defaults.log) {
                                            _this.defaults.log(str, data);
                                        }
                                        return data;
                                    } else {
                                        if (_this.defaults.error) {
                                            _this.defaults.error('FAILED: ' + str, data);
                                        }
                                        return DSUtils.Promise.reject(data);
                                    }
                                } else {
                                    _this.defaults.error('FAILED', data);
                                    return DSUtils.Promise.reject(data);
                                }
                            }
                            if (!this.http) {
                                throw new Error('You have not configured this adapter with an http library!');
                            }
                            return this.http(config).then(logResponse, function (data) {
                                return logResponse(data, true);
                            });
                        }
                    },
                    {
                        key: 'GET',
                        value: function GET(url, config) {
                            config = config || {};
                            config.method = config.method || 'get';
                            config.urlOverride = !!config.url;
                            config.url = config.url || url;
                            return this.HTTP(config);
                        }
                    },
                    {
                        key: 'POST',
                        value: function POST(url, attrs, config) {
                            config = config || {};
                            config.method = config.method || 'post';
                            config.urlOverride = !!config.url;
                            config.url = config.url || url;
                            config.data = config.data || attrs;
                            return this.HTTP(config);
                        }
                    },
                    {
                        key: 'PUT',
                        value: function PUT(url, attrs, config) {
                            config = config || {};
                            config.method = config.method || 'put';
                            config.urlOverride = !!config.url;
                            config.url = config.url || url;
                            config.data = config.data || attrs;
                            return this.HTTP(config);
                        }
                    },
                    {
                        key: 'DEL',
                        value: function DEL(url, config) {
                            config = config || {};
                            config.method = config.method || 'delete';
                            config.urlOverride = !!config.url;
                            config.url = config.url || url;
                            return this.HTTP(config);
                        }
                    },
                    {
                        key: 'find',
                        value: function find(resourceConfig, id, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            options.params = _this.defaults.queryTransform(resourceConfig, options.params);
                            return _this.GET(_this.getPath('find', resourceConfig, id, options), options).then(function (data) {
                                var item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                                return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item;
                            });
                        }
                    },
                    {
                        key: 'findAll',
                        value: function findAll(resourceConfig, params, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            if (params) {
                                params = _this.defaults.queryTransform(resourceConfig, params);
                                deepMixIn(options.params, params);
                            }
                            return _this.GET(_this.getPath('findAll', resourceConfig, params, options), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    },
                    {
                        key: 'create',
                        value: function create(resourceConfig, attrs, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            options.params = _this.defaults.queryTransform(resourceConfig, options.params);
                            return _this.POST(_this.getPath('create', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    },
                    {
                        key: 'update',
                        value: function update(resourceConfig, id, attrs, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            options.params = _this.defaults.queryTransform(resourceConfig, options.params);
                            return _this.PUT(_this.getPath('update', resourceConfig, id, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    },
                    {
                        key: 'updateAll',
                        value: function updateAll(resourceConfig, attrs, params, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            if (params) {
                                params = _this.defaults.queryTransform(resourceConfig, params);
                                deepMixIn(options.params, params);
                            }
                            return this.PUT(_this.getPath('updateAll', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    },
                    {
                        key: 'destroy',
                        value: function destroy(resourceConfig, id, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            options.params = _this.defaults.queryTransform(resourceConfig, options.params);
                            return _this.DEL(_this.getPath('destroy', resourceConfig, id, options), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    },
                    {
                        key: 'destroyAll',
                        value: function destroyAll(resourceConfig, params, options) {
                            var _this = this;
                            options || (options = {});
                            options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
                            options.params = isUndefined(options.params) ? {} : copy(options.params);
                            if (params) {
                                params = _this.defaults.queryTransform(resourceConfig, params);
                                deepMixIn(options.params, params);
                            }
                            return this.DEL(_this.getPath('destroyAll', resourceConfig, params, options), options).then(function (data) {
                                return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
                            });
                        }
                    }
                ]);
                return DSHttpAdapter;
            }();
            DSHttpAdapter.version = {
                full: '3.2.1',
                major: parseInt('3', 10),
                minor: parseInt('2', 10),
                patch: parseInt('1', 10),
                alpha: true ? 'false' : false,
                beta: true ? 'false' : false
            };
            module.exports = DSHttpAdapter;
        },
        function (module, exports) {
            if (typeof __WEBPACK_EXTERNAL_MODULE_3__ === 'undefined') {
                var e = new Error('Cannot find module "axios"');
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            }
            module.exports = __WEBPACK_EXTERNAL_MODULE_3__;
        },
        function (module, exports) {
            module.exports = __WEBPACK_EXTERNAL_MODULE_4__;
        },
        function (module, exports, __webpack_require__) {
            var map = {};
            function webpackContext(req) {
                return __webpack_require__(webpackContextResolve(req));
            }
            ;
            function webpackContextResolve(req) {
                return map[req] || function () {
                    throw new Error('Cannot find module \'' + req + '\'.');
                }();
            }
            ;
            webpackContext.keys = function webpackContextKeys() {
                return Object.keys(map);
            };
            webpackContext.resolve = webpackContextResolve;
            module.exports = webpackContext;
            webpackContext.id = 5;
        }
    ]);
}));
;
/*app/domain/presets/tcga/domain.presets.tcga.module*/
define('app/domain/presets/tcga/domain.presets.tcga.module', [
    'mui',
    './model/TcgaPreset',
    'js-data',
    'js-data-angular'
], function (ng, TcgaPreset) {
    var module = ng.module('mui.domain.presets.tcga', arguments, arguments);
    module.config(function (DSProvider, DSHttpAdapterProvider) {
        ng.extend(DSHttpAdapterProvider.defaults, {
            basePath: '/',
            httpConfig: { params: { format: 'json' } }
        });
    });
    return module;
});
/*app/domain/presets/domain.presets.module*/
define('app/domain/presets/domain.presets.module', [
    'mui',
    './tcga/domain.presets.tcga.module',
    'js-data',
    'js-data-angular'
], function (ng, presets) {
    var module = ng.module('mui.domain.presets', arguments, arguments);
    return module;
});
/*mev-bs-modal@0.0.1#src/view/modal/BsModal.tpl.html!system-text@0.1.0#text*/
define('mev-bs-modal@0.0.1#src/view/modal/BsModal.tpl.html!system-text@0.1.0#text', function (require, exports, module) {
    module.exports = '<div id="{{bindid.replace(\'#\', \'\')}}" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n\t<div class="modal-dialog">\n\t\t<div class="modal-content">\n\t\t\t<div class="modal-header">\n\t\t\t\t<button ng-if="!hideClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">\xD7</button>\n\t\t\t\t<div id="myModalLabel"><h3>{{header}}</h3></div>\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t\t<foo ng-transclude></foo>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
});
/*mev-bs-modal@0.0.1#src/view/modal/BsModalDirective*/
'use strict';
define('mev-bs-modal@0.0.1#src/view/modal/BsModalDirective', [
    'mui',
    './BsModal.tpl.html'
], function (ng, template) {
    function directive($rootScope) {
        return {
            restrict: 'E',
            scope: {
                bindid: '@',
                header: '@',
                test: '@',
                func: '&',
                headerHtml: '=',
                hideClose: '@'
            },
            transclude: true,
            template: template,
            compile: function (tElem, tAttrs) {
                return {
                    post: function (scope, elem, attrs, ctrl) {
                        var rootElement = ng.element('body > ui-view:first-child');
                        if (rootElement.length === 0)
                            rootElement = ng.element('body > ng-view:first-child');
                        if (rootElement.length > 1)
                            rootElement = rootElement[0];
                        var exists = rootElement.children('[bindid=\'' + scope.bindid + '\']');
                        if (exists.length > 0) {
                            exists.html('').remove();
                            console.debug('BSMODAL remove', attrs.bindid, rootElement.children('[bindid=\'' + scope.bindid + '\']').length);
                        }
                        console.debug('BSMODAL appaned', attrs.bindid);
                        rootElement.append(elem);
                        var elemLabel = elem.find('#myModalLabel');
                        if (scope.headerHtml) {
                            elemLabel.html(scope.headerHtml);
                        }
                    }
                };
            }
        };
    }
    directive.$inject = ['$rootScope'];
    directive.$name = 'mevBsModalDirective';
    return directive;
});
/*mev-bs-modal@0.0.1#src/view/trigger/BsModalTriggerDirective*/
'use strict';
define('mev-bs-modal@0.0.1#src/view/trigger/BsModalTriggerDirective', ['mui'], function (ng) {
    function directive() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            scope: { bsModalTrigger: '@mevBsModalTrigger' },
            link: function (scope, elm, attrs) {
                elm.attr('data-toggle', 'modal').attr('role', 'button').attr('data-target', scope.bsModalTrigger);
            }
        };
    }
    directive.$inject = [];
    directive.$name = 'mevBsModalTriggerDirective';
    return directive;
});
/*mev-bs-modal@0.0.1#src/mev-bs-modal*/
'use strict';
define('mev-bs-modal@0.0.1#src/mev-bs-modal', [
    'mui',
    './view/modal/BsModalDirective',
    './view/trigger/BsModalTriggerDirective'
], function (ng) {
    return ng.module('mevBsModal', arguments, arguments);
});
/*pouchdb*/
define('pouchdb', [
    'module',
    '@loader'
], function (module, loader) {
    loader.get('@@global-helpers').prepareGlobal(module.id, []);
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '// PouchDB 5.4.5\n// \n// (c) 2012-2016 Dale Harvey and the PouchDB team\n// PouchDB may be freely distributed under the Apache license, version 2.0.\n// For all details and documentation:\n// http://pouchdb.com\n(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PouchDB = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module \'"+o+"\'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// "Software"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nfunction EventEmitter() {\n  this._events = this._events || {};\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nEventEmitter.defaultMaxListeners = 10;\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function(n) {\n  if (!isNumber(n) || n < 0 || isNaN(n))\n    throw TypeError(\'n must be a positive number\');\n  this._maxListeners = n;\n  return this;\n};\n\nEventEmitter.prototype.emit = function(type) {\n  var er, handler, len, args, i, listeners;\n\n  if (!this._events)\n    this._events = {};\n\n  // If there is no \'error\' event listener then throw.\n  if (type === \'error\') {\n    if (!this._events.error ||\n        (isObject(this._events.error) && !this._events.error.length)) {\n      er = arguments[1];\n      if (er instanceof Error) {\n        throw er; // Unhandled \'error\' event\n      } else {\n        // At least give some kind of context to the user\n        var err = new Error(\'Uncaught, unspecified "error" event. (\' + er + \')\');\n        err.context = er;\n        throw err;\n      }\n    }\n  }\n\n  handler = this._events[type];\n\n  if (isUndefined(handler))\n    return false;\n\n  if (isFunction(handler)) {\n    switch (arguments.length) {\n      // fast cases\n      case 1:\n        handler.call(this);\n        break;\n      case 2:\n        handler.call(this, arguments[1]);\n        break;\n      case 3:\n        handler.call(this, arguments[1], arguments[2]);\n        break;\n      // slower\n      default:\n        args = Array.prototype.slice.call(arguments, 1);\n        handler.apply(this, args);\n    }\n  } else if (isObject(handler)) {\n    args = Array.prototype.slice.call(arguments, 1);\n    listeners = handler.slice();\n    len = listeners.length;\n    for (i = 0; i < len; i++)\n      listeners[i].apply(this, args);\n  }\n\n  return true;\n};\n\nEventEmitter.prototype.addListener = function(type, listener) {\n  var m;\n\n  if (!isFunction(listener))\n    throw TypeError(\'listener must be a function\');\n\n  if (!this._events)\n    this._events = {};\n\n  // To avoid recursion in the case that type === "newListener"! Before\n  // adding it to the listeners, first emit "newListener".\n  if (this._events.newListener)\n    this.emit(\'newListener\', type,\n              isFunction(listener.listener) ?\n              listener.listener : listener);\n\n  if (!this._events[type])\n    // Optimize the case of one listener. Don\'t need the extra array object.\n    this._events[type] = listener;\n  else if (isObject(this._events[type]))\n    // If we\'ve already got an array, just append.\n    this._events[type].push(listener);\n  else\n    // Adding the second element, need to change to array.\n    this._events[type] = [this._events[type], listener];\n\n  // Check for listener leak\n  if (isObject(this._events[type]) && !this._events[type].warned) {\n    if (!isUndefined(this._maxListeners)) {\n      m = this._maxListeners;\n    } else {\n      m = EventEmitter.defaultMaxListeners;\n    }\n\n    if (m && m > 0 && this._events[type].length > m) {\n      this._events[type].warned = true;\n      console.error(\'(node) warning: possible EventEmitter memory \' +\n                    \'leak detected. %d listeners added. \' +\n                    \'Use emitter.setMaxListeners() to increase limit.\',\n                    this._events[type].length);\n      if (typeof console.trace === \'function\') {\n        // not supported in IE 10\n        console.trace();\n      }\n    }\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.once = function(type, listener) {\n  if (!isFunction(listener))\n    throw TypeError(\'listener must be a function\');\n\n  var fired = false;\n\n  function g() {\n    this.removeListener(type, g);\n\n    if (!fired) {\n      fired = true;\n      listener.apply(this, arguments);\n    }\n  }\n\n  g.listener = listener;\n  this.on(type, g);\n\n  return this;\n};\n\n// emits a \'removeListener\' event iff the listener was removed\nEventEmitter.prototype.removeListener = function(type, listener) {\n  var list, position, length, i;\n\n  if (!isFunction(listener))\n    throw TypeError(\'listener must be a function\');\n\n  if (!this._events || !this._events[type])\n    return this;\n\n  list = this._events[type];\n  length = list.length;\n  position = -1;\n\n  if (list === listener ||\n      (isFunction(list.listener) && list.listener === listener)) {\n    delete this._events[type];\n    if (this._events.removeListener)\n      this.emit(\'removeListener\', type, listener);\n\n  } else if (isObject(list)) {\n    for (i = length; i-- > 0;) {\n      if (list[i] === listener ||\n          (list[i].listener && list[i].listener === listener)) {\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0)\n      return this;\n\n    if (list.length === 1) {\n      list.length = 0;\n      delete this._events[type];\n    } else {\n      list.splice(position, 1);\n    }\n\n    if (this._events.removeListener)\n      this.emit(\'removeListener\', type, listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.removeAllListeners = function(type) {\n  var key, listeners;\n\n  if (!this._events)\n    return this;\n\n  // not listening for removeListener, no need to emit\n  if (!this._events.removeListener) {\n    if (arguments.length === 0)\n      this._events = {};\n    else if (this._events[type])\n      delete this._events[type];\n    return this;\n  }\n\n  // emit removeListener for all listeners on all events\n  if (arguments.length === 0) {\n    for (key in this._events) {\n      if (key === \'removeListener\') continue;\n      this.removeAllListeners(key);\n    }\n    this.removeAllListeners(\'removeListener\');\n    this._events = {};\n    return this;\n  }\n\n  listeners = this._events[type];\n\n  if (isFunction(listeners)) {\n    this.removeListener(type, listeners);\n  } else if (listeners) {\n    // LIFO order\n    while (listeners.length)\n      this.removeListener(type, listeners[listeners.length - 1]);\n  }\n  delete this._events[type];\n\n  return this;\n};\n\nEventEmitter.prototype.listeners = function(type) {\n  var ret;\n  if (!this._events || !this._events[type])\n    ret = [];\n  else if (isFunction(this._events[type]))\n    ret = [this._events[type]];\n  else\n    ret = this._events[type].slice();\n  return ret;\n};\n\nEventEmitter.prototype.listenerCount = function(type) {\n  if (this._events) {\n    var evlistener = this._events[type];\n\n    if (isFunction(evlistener))\n      return 1;\n    else if (evlistener)\n      return evlistener.length;\n  }\n  return 0;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  return emitter.listenerCount(type);\n};\n\nfunction isFunction(arg) {\n  return typeof arg === \'function\';\n}\n\nfunction isNumber(arg) {\n  return typeof arg === \'number\';\n}\n\nfunction isObject(arg) {\n  return typeof arg === \'object\' && arg !== null;\n}\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\n\n},{}],2:[function(_dereq_,module,exports){\n// shim for using process in browser\n\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don\'t break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn\'t define any globals.  It\'s inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\n(function () {\n  try {\n    cachedSetTimeout = setTimeout;\n  } catch (e) {\n    cachedSetTimeout = function () {\n      throw new Error(\'setTimeout is not defined\');\n    }\n  }\n  try {\n    cachedClearTimeout = clearTimeout;\n  } catch (e) {\n    cachedClearTimeout = function () {\n      throw new Error(\'clearTimeout is not defined\');\n    }\n  }\n} ())\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = cachedSetTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    cachedClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        cachedSetTimeout(drainQueue, 0);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = \'browser\';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = \'\'; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error(\'process.binding is not supported\');\n};\n\nprocess.cwd = function () { return \'/\' };\nprocess.chdir = function (dir) {\n    throw new Error(\'process.chdir is not supported\');\n};\nprocess.umask = function() { return 0; };\n\n},{}],3:[function(_dereq_,module,exports){\n(function (process,global){\n\'use strict\';\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === \'object\') && \'default\' in ex) ? ex[\'default\'] : ex; }\n\nvar jsExtend = _dereq_(10);\nvar debug = _interopDefault(_dereq_(5));\nvar inherits = _interopDefault(_dereq_(9));\nvar lie = _interopDefault(_dereq_(11));\nvar pouchdbCollections = _dereq_(15);\nvar getArguments = _interopDefault(_dereq_(4));\nvar events = _dereq_(1);\nvar scopedEval = _interopDefault(_dereq_(16));\nvar Md5 = _interopDefault(_dereq_(17));\nvar vuvuzela = _interopDefault(_dereq_(18));\nvar PromisePool = _interopDefault(_dereq_(7));\nvar pouchdbCollate = _dereq_(13);\n\n/* istanbul ignore next */\nvar PouchPromise = typeof Promise === \'function\' ? Promise : lie;\n\nfunction isBinaryObject(object) {\n  return object instanceof ArrayBuffer ||\n    (typeof Blob !== \'undefined\' && object instanceof Blob);\n}\n\nfunction cloneArrayBuffer(buff) {\n  if (typeof buff.slice === \'function\') {\n    return buff.slice(0);\n  }\n  // IE10-11 slice() polyfill\n  var target = new ArrayBuffer(buff.byteLength);\n  var targetArray = new Uint8Array(target);\n  var sourceArray = new Uint8Array(buff);\n  targetArray.set(sourceArray);\n  return target;\n}\n\nfunction cloneBinaryObject(object) {\n  if (object instanceof ArrayBuffer) {\n    return cloneArrayBuffer(object);\n  }\n  var size = object.size;\n  var type = object.type;\n  // Blob\n  if (typeof object.slice === \'function\') {\n    return object.slice(0, size, type);\n  }\n  // PhantomJS slice() replacement\n  return object.webkitSlice(0, size, type);\n}\n\n// most of this is borrowed from lodash.isPlainObject:\n// https://github.com/fis-components/lodash.isplainobject/\n// blob/29c358140a74f252aeb08c9eb28bef86f2217d4a/index.js\n\nvar funcToString = Function.prototype.toString;\nvar objectCtorString = funcToString.call(Object);\n\nfunction isPlainObject(value) {\n  var proto = Object.getPrototypeOf(value);\n  /* istanbul ignore if */\n  if (proto === null) { // not sure when this happens, but I guess it can\n    return true;\n  }\n  var Ctor = proto.constructor;\n  return (typeof Ctor == \'function\' &&\n    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);\n}\n\nfunction clone(object) {\n  var newObject;\n  var i;\n  var len;\n\n  if (!object || typeof object !== \'object\') {\n    return object;\n  }\n\n  if (Array.isArray(object)) {\n    newObject = [];\n    for (i = 0, len = object.length; i < len; i++) {\n      newObject[i] = clone(object[i]);\n    }\n    return newObject;\n  }\n\n  // special case: to avoid inconsistencies between IndexedDB\n  // and other backends, we automatically stringify Dates\n  if (object instanceof Date) {\n    return object.toISOString();\n  }\n\n  if (isBinaryObject(object)) {\n    return cloneBinaryObject(object);\n  }\n\n  if (!isPlainObject(object)) {\n    return object; // don\'t clone objects like Workers\n  }\n\n  newObject = {};\n  for (i in object) {\n    if (Object.prototype.hasOwnProperty.call(object, i)) {\n      var value = clone(object[i]);\n      if (typeof value !== \'undefined\') {\n        newObject[i] = value;\n      }\n    }\n  }\n  return newObject;\n}\n\nfunction once(fun) {\n  var called = false;\n  return getArguments(function (args) {\n    /* istanbul ignore if */\n    if (called) {\n      // this is a smoke test and should never actually happen\n      throw new Error(\'once called more than once\');\n    } else {\n      called = true;\n      fun.apply(this, args);\n    }\n  });\n}\n\nfunction toPromise(func) {\n  //create the function we will be returning\n  return getArguments(function (args) {\n    // Clone arguments\n    args = clone(args);\n    var self = this;\n    var tempCB =\n      (typeof args[args.length - 1] === \'function\') ? args.pop() : false;\n    // if the last argument is a function, assume its a callback\n    var usedCB;\n    if (tempCB) {\n      // if it was a callback, create a new callback which calls it,\n      // but do so async so we don\'t trap any errors\n      usedCB = function (err, resp) {\n        process.nextTick(function () {\n          tempCB(err, resp);\n        });\n      };\n    }\n    var promise = new PouchPromise(function (fulfill, reject) {\n      var resp;\n      try {\n        var callback = once(function (err, mesg) {\n          if (err) {\n            reject(err);\n          } else {\n            fulfill(mesg);\n          }\n        });\n        // create a callback for this invocation\n        // apply the function in the orig context\n        args.push(callback);\n        resp = func.apply(self, args);\n        if (resp && typeof resp.then === \'function\') {\n          fulfill(resp);\n        }\n      } catch (e) {\n        reject(e);\n      }\n    });\n    // if there is a callback, call it back\n    if (usedCB) {\n      promise.then(function (result) {\n        usedCB(null, result);\n      }, usedCB);\n    }\n    return promise;\n  });\n}\n\nvar log = debug(\'pouchdb:api\');\n\nfunction adapterFun(name, callback) {\n  function logApiCall(self, name, args) {\n    /* istanbul ignore if */\n    if (log.enabled) {\n      var logArgs = [self._db_name, name];\n      for (var i = 0; i < args.length - 1; i++) {\n        logArgs.push(args[i]);\n      }\n      log.apply(null, logArgs);\n\n      // override the callback itself to log the response\n      var origCallback = args[args.length - 1];\n      args[args.length - 1] = function (err, res) {\n        var responseArgs = [self._db_name, name];\n        responseArgs = responseArgs.concat(\n          err ? [\'error\', err] : [\'success\', res]\n        );\n        log.apply(null, responseArgs);\n        origCallback(err, res);\n      };\n    }\n  }\n\n  return toPromise(getArguments(function (args) {\n    if (this._closed) {\n      return PouchPromise.reject(new Error(\'database is closed\'));\n    }\n    if (this._destroyed) {\n      return PouchPromise.reject(new Error(\'database is destroyed\'));\n    }\n    var self = this;\n    logApiCall(self, name, args);\n    if (!this.taskqueue.isReady) {\n      return new PouchPromise(function (fulfill, reject) {\n        self.taskqueue.addTask(function (failed) {\n          if (failed) {\n            reject(failed);\n          } else {\n            fulfill(self[name].apply(self, args));\n          }\n        });\n      });\n    }\n    return callback.apply(this, args);\n  }));\n}\n\n// like underscore/lodash _.pick()\nfunction pick(obj, arr) {\n  var res = {};\n  for (var i = 0, len = arr.length; i < len; i++) {\n    var prop = arr[i];\n    if (prop in obj) {\n      res[prop] = obj[prop];\n    }\n  }\n  return res;\n}\n\n// Most browsers throttle concurrent requests at 6, so it\'s silly\n// to shim _bulk_get by trying to launch potentially hundreds of requests\n// and then letting the majority time out. We can handle this ourselves.\nvar MAX_NUM_CONCURRENT_REQUESTS = 6;\n\nfunction identityFunction(x) {\n  return x;\n}\n\nfunction formatResultForOpenRevsGet(result) {\n  return [{\n    ok: result\n  }];\n}\n\n// shim for P/CouchDB adapters that don\'t directly implement _bulk_get\nfunction bulkGet(db, opts, callback) {\n  var requests = opts.docs;\n\n  // consolidate into one request per doc if possible\n  var requestsById = {};\n  requests.forEach(function (request) {\n    if (request.id in requestsById) {\n      requestsById[request.id].push(request);\n    } else {\n      requestsById[request.id] = [request];\n    }\n  });\n\n  var numDocs = Object.keys(requestsById).length;\n  var numDone = 0;\n  var perDocResults = new Array(numDocs);\n\n  function collapseResultsAndFinish() {\n    var results = [];\n    perDocResults.forEach(function (res) {\n      res.docs.forEach(function (info) {\n        results.push({\n          id: res.id,\n          docs: [info]\n        });\n      });\n    });\n    callback(null, {results: results});\n  }\n\n  function checkDone() {\n    if (++numDone === numDocs) {\n      collapseResultsAndFinish();\n    }\n  }\n\n  function gotResult(docIndex, id, docs) {\n    perDocResults[docIndex] = {id: id, docs: docs};\n    checkDone();\n  }\n\n  var allRequests = Object.keys(requestsById);\n\n  var i = 0;\n\n  function nextBatch() {\n\n    if (i >= allRequests.length) {\n      return;\n    }\n\n    var upTo = Math.min(i + MAX_NUM_CONCURRENT_REQUESTS, allRequests.length);\n    var batch = allRequests.slice(i, upTo);\n    processBatch(batch, i);\n    i += batch.length;\n  }\n\n  function processBatch(batch, offset) {\n    batch.forEach(function (docId, j) {\n      var docIdx = offset + j;\n      var docRequests = requestsById[docId];\n\n      // just use the first request as the "template"\n      // TODO: The _bulk_get API allows for more subtle use cases than this,\n      // but for now it is unlikely that there will be a mix of different\n      // "atts_since" or "attachments" in the same request, since it\'s just\n      // replicate.js that is using this for the moment.\n      // Also, atts_since is aspirational, since we don\'t support it yet.\n      var docOpts = pick(docRequests[0], [\'atts_since\', \'attachments\']);\n      docOpts.open_revs = docRequests.map(function (request) {\n        // rev is optional, open_revs disallowed\n        return request.rev;\n      });\n\n      // remove falsey / undefined revisions\n      docOpts.open_revs = docOpts.open_revs.filter(identityFunction);\n\n      var formatResult = identityFunction;\n\n      if (docOpts.open_revs.length === 0) {\n        delete docOpts.open_revs;\n\n        // when fetching only the "winning" leaf,\n        // transform the result so it looks like an open_revs\n        // request\n        formatResult = formatResultForOpenRevsGet;\n      }\n\n      // globally-supplied options\n      [\'revs\', \'attachments\', \'binary\', \'ajax\'].forEach(function (param) {\n        if (param in opts) {\n          docOpts[param] = opts[param];\n        }\n      });\n      db.get(docId, docOpts, function (err, res) {\n        var result;\n        /* istanbul ignore if */\n        if (err) {\n          result = [{error: err}];\n        } else {\n          result = formatResult(res);\n        }\n        gotResult(docIdx, docId, result);\n        nextBatch();\n      });\n    });\n  }\n\n  nextBatch();\n\n}\n\nfunction isChromeApp() {\n  return (typeof chrome !== "undefined" &&\n    typeof chrome.storage !== "undefined" &&\n    typeof chrome.storage.local !== "undefined");\n}\n\nvar hasLocal;\n\nif (isChromeApp()) {\n  hasLocal = false;\n} else {\n  try {\n    localStorage.setItem(\'_pouch_check_localstorage\', 1);\n    hasLocal = !!localStorage.getItem(\'_pouch_check_localstorage\');\n  } catch (e) {\n    hasLocal = false;\n  }\n}\n\nfunction hasLocalStorage() {\n  return hasLocal;\n}\n\ninherits(Changes$1, events.EventEmitter);\n\n/* istanbul ignore next */\nfunction attachBrowserEvents(self) {\n  if (isChromeApp()) {\n    chrome.storage.onChanged.addListener(function (e) {\n      // make sure it\'s event addressed to us\n      if (e.db_name != null) {\n        //object only has oldValue, newValue members\n        self.emit(e.dbName.newValue);\n      }\n    });\n  } else if (hasLocalStorage()) {\n    if (typeof addEventListener !== \'undefined\') {\n      addEventListener("storage", function (e) {\n        self.emit(e.key);\n      });\n    } else { // old IE\n      window.attachEvent("storage", function (e) {\n        self.emit(e.key);\n      });\n    }\n  }\n}\n\nfunction Changes$1() {\n  events.EventEmitter.call(this);\n  this._listeners = {};\n\n  attachBrowserEvents(this);\n}\nChanges$1.prototype.addListener = function (dbName, id, db, opts) {\n  /* istanbul ignore if */\n  if (this._listeners[id]) {\n    return;\n  }\n  var self = this;\n  var inprogress = false;\n  function eventFunction() {\n    /* istanbul ignore if */\n    if (!self._listeners[id]) {\n      return;\n    }\n    if (inprogress) {\n      inprogress = \'waiting\';\n      return;\n    }\n    inprogress = true;\n    var changesOpts = pick(opts, [\n      \'style\', \'include_docs\', \'attachments\', \'conflicts\', \'filter\',\n      \'doc_ids\', \'view\', \'since\', \'query_params\', \'binary\'\n    ]);\n\n    /* istanbul ignore next */\n    function onError() {\n      inprogress = false;\n    }\n\n    db.changes(changesOpts).on(\'change\', function (c) {\n      if (c.seq > opts.since && !opts.cancelled) {\n        opts.since = c.seq;\n        opts.onChange(c);\n      }\n    }).on(\'complete\', function () {\n      if (inprogress === \'waiting\') {\n        setTimeout(function (){\n          eventFunction();\n        },0);\n      }\n      inprogress = false;\n    }).on(\'error\', onError);\n  }\n  this._listeners[id] = eventFunction;\n  this.on(dbName, eventFunction);\n};\n\nChanges$1.prototype.removeListener = function (dbName, id) {\n  /* istanbul ignore if */\n  if (!(id in this._listeners)) {\n    return;\n  }\n  events.EventEmitter.prototype.removeListener.call(this, dbName,\n    this._listeners[id]);\n};\n\n\n/* istanbul ignore next */\nChanges$1.prototype.notifyLocalWindows = function (dbName) {\n  //do a useless change on a storage thing\n  //in order to get other windows\'s listeners to activate\n  if (isChromeApp()) {\n    chrome.storage.local.set({dbName: dbName});\n  } else if (hasLocalStorage()) {\n    localStorage[dbName] = (localStorage[dbName] === "a") ? "b" : "a";\n  }\n};\n\nChanges$1.prototype.notify = function (dbName) {\n  this.emit(dbName);\n  this.notifyLocalWindows(dbName);\n};\n\nfunction guardedConsole(method) {\n  if (console !== \'undefined\' && method in console) {\n    var args = Array.prototype.slice.call(arguments, 1);\n    console[method].apply(console, args);\n  }\n}\n\nfunction randomNumber(min, max) {\n  var maxTimeout = 600000; // Hard-coded default of 10 minutes\n  min = parseInt(min, 10) || 0;\n  max = parseInt(max, 10);\n  if (max !== max || max <= min) {\n    max = (min || 1) << 1; //doubling\n  } else {\n    max = max + 1;\n  }\n  // In order to not exceed maxTimeout, pick a random value between half of maxTimeout and maxTimeout\n  if(max > maxTimeout) {\n    min = maxTimeout >> 1; // divide by two\n    max = maxTimeout;\n  }\n  var ratio = Math.random();\n  var range = max - min;\n\n  return ~~(range * ratio + min); // ~~ coerces to an int, but fast.\n}\n\nfunction defaultBackOff(min) {\n  var max = 0;\n  if (!min) {\n    max = 2000;\n  }\n  return randomNumber(min, max);\n}\n\n// designed to give info to browser users, who are disturbed\n// when they see http errors in the console\nfunction explainError(status, str) {\n  guardedConsole(\'info\', \'The above \' + status + \' is totally normal. \' + str);\n}\n\ninherits(PouchError, Error);\n\nfunction PouchError(opts) {\n  Error.call(this, opts.reason);\n  this.status = opts.status;\n  this.name = opts.error;\n  this.message = opts.reason;\n  this.error = true;\n}\n\nPouchError.prototype.toString = function () {\n  return JSON.stringify({\n    status: this.status,\n    name: this.name,\n    message: this.message,\n    reason: this.reason\n  });\n};\n\nvar UNAUTHORIZED = new PouchError({\n  status: 401,\n  error: \'unauthorized\',\n  reason: "Name or password is incorrect."\n});\n\nvar MISSING_BULK_DOCS = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: "Missing JSON list of \'docs\'"\n});\n\nvar MISSING_DOC = new PouchError({\n  status: 404,\n  error: \'not_found\',\n  reason: \'missing\'\n});\n\nvar REV_CONFLICT = new PouchError({\n  status: 409,\n  error: \'conflict\',\n  reason: \'Document update conflict\'\n});\n\nvar INVALID_ID = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: \'_id field must contain a string\'\n});\n\nvar MISSING_ID = new PouchError({\n  status: 412,\n  error: \'missing_id\',\n  reason: \'_id is required for puts\'\n});\n\nvar RESERVED_ID = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: \'Only reserved document ids may start with underscore.\'\n});\n\nvar NOT_OPEN = new PouchError({\n  status: 412,\n  error: \'precondition_failed\',\n  reason: \'Database not open\'\n});\n\nvar UNKNOWN_ERROR = new PouchError({\n  status: 500,\n  error: \'unknown_error\',\n  reason: \'Database encountered an unknown error\'\n});\n\nvar BAD_ARG = new PouchError({\n  status: 500,\n  error: \'badarg\',\n  reason: \'Some query argument is invalid\'\n});\n\nvar INVALID_REQUEST = new PouchError({\n  status: 400,\n  error: \'invalid_request\',\n  reason: \'Request was invalid\'\n});\n\nvar QUERY_PARSE_ERROR = new PouchError({\n  status: 400,\n  error: \'query_parse_error\',\n  reason: \'Some query parameter is invalid\'\n});\n\nvar DOC_VALIDATION = new PouchError({\n  status: 500,\n  error: \'doc_validation\',\n  reason: \'Bad special document member\'\n});\n\nvar BAD_REQUEST = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: \'Something wrong with the request\'\n});\n\nvar NOT_AN_OBJECT = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: \'Document must be a JSON object\'\n});\n\nvar DB_MISSING = new PouchError({\n  status: 404,\n  error: \'not_found\',\n  reason: \'Database not found\'\n});\n\nvar IDB_ERROR = new PouchError({\n  status: 500,\n  error: \'indexed_db_went_bad\',\n  reason: \'unknown\'\n});\n\nvar WSQ_ERROR = new PouchError({\n  status: 500,\n  error: \'web_sql_went_bad\',\n  reason: \'unknown\'\n});\n\nvar LDB_ERROR = new PouchError({\n  status: 500,\n  error: \'levelDB_went_went_bad\',\n  reason: \'unknown\'\n});\n\nvar FORBIDDEN = new PouchError({\n  status: 403,\n  error: \'forbidden\',\n  reason: \'Forbidden by design doc validate_doc_update function\'\n});\n\nvar INVALID_REV = new PouchError({\n  status: 400,\n  error: \'bad_request\',\n  reason: \'Invalid rev format\'\n});\n\nvar FILE_EXISTS = new PouchError({\n  status: 412,\n  error: \'file_exists\',\n  reason: \'The database could not be created, the file already exists.\'\n});\n\nvar MISSING_STUB = new PouchError({\n  status: 412,\n  error: \'missing_stub\'\n});\n\nvar INVALID_URL = new PouchError({\n  status: 413,\n  error: \'invalid_url\',\n  reason: \'Provided URL is invalid\'\n});\n\nfunction createError(error, reason) {\n  function CustomPouchError(reason) {\n    // inherit error properties from our parent error manually\n    // so as to allow proper JSON parsing.\n    /* jshint ignore:start */\n    for (var p in error) {\n      if (typeof error[p] !== \'function\') {\n        this[p] = error[p];\n      }\n    }\n    /* jshint ignore:end */\n    if (reason !== undefined) {\n      this.reason = reason;\n    }\n  }\n  CustomPouchError.prototype = PouchError.prototype;\n  return new CustomPouchError(reason);\n}\n\nfunction generateErrorFromResponse(err) {\n\n  if (typeof err !== \'object\') {\n    var data = err;\n    err = UNKNOWN_ERROR;\n    err.data = data;\n  }\n\n  if (\'error\' in err && err.error === \'conflict\') {\n    err.name = \'conflict\';\n    err.status = 409;\n  }\n\n  if (!(\'name\' in err)) {\n    err.name = err.error || \'unknown\';\n  }\n\n  if (!(\'status\' in err)) {\n    err.status = 500;\n  }\n\n  if (!(\'message\' in err)) {\n    err.message = err.message || err.reason;\n  }\n\n  return err;\n}\n\nfunction tryFilter(filter, doc, req) {\n  try {\n    return !filter(doc, req);\n  } catch (err) {\n    var msg = \'Filter function threw: \' + err.toString();\n    return createError(BAD_REQUEST, msg);\n  }\n}\n\nfunction filterChange(opts) {\n  var req = {};\n  var hasFilter = opts.filter && typeof opts.filter === \'function\';\n  req.query = opts.query_params;\n\n  return function filter(change) {\n    if (!change.doc) {\n      // CSG sends events on the changes feed that don\'t have documents,\n      // this hack makes a whole lot of existing code robust.\n      change.doc = {};\n    }\n\n    var filterReturn = hasFilter && tryFilter(opts.filter, change.doc, req);\n\n    if (typeof filterReturn === \'object\') {\n      return filterReturn;\n    }\n\n    if (filterReturn) {\n      return false;\n    }\n\n    if (!opts.include_docs) {\n      delete change.doc;\n    } else if (!opts.attachments) {\n      for (var att in change.doc._attachments) {\n        /* istanbul ignore else */\n        if (change.doc._attachments.hasOwnProperty(att)) {\n          change.doc._attachments[att].stub = true;\n        }\n      }\n    }\n    return true;\n  };\n}\n\nfunction flatten(arrs) {\n  var res = [];\n  for (var i = 0, len = arrs.length; i < len; i++) {\n    res = res.concat(arrs[i]);\n  }\n  return res;\n}\n\n// Determine id an ID is valid\n//   - invalid IDs begin with an underescore that does not begin \'_design\' or\n//     \'_local\'\n//   - any other string value is a valid id\n// Returns the specific error object for each case\nfunction invalidIdError(id) {\n  var err;\n  if (!id) {\n    err = createError(MISSING_ID);\n  } else if (typeof id !== \'string\') {\n    err = createError(INVALID_ID);\n  } else if (/^_/.test(id) && !(/^_(design|local)/).test(id)) {\n    err = createError(RESERVED_ID);\n  }\n  if (err) {\n    throw err;\n  }\n}\n\nfunction listenerCount(ee, type) {\n  return \'listenerCount\' in ee ? ee.listenerCount(type) :\n                                 events.EventEmitter.listenerCount(ee, type);\n}\n\nfunction parseDesignDocFunctionName(s) {\n  if (!s) {\n    return null;\n  }\n  var parts = s.split(\'/\');\n  if (parts.length === 2) {\n    return parts;\n  }\n  if (parts.length === 1) {\n    return [s, s];\n  }\n  return null;\n}\n\nfunction normalizeDesignDocFunctionName(s) {\n  var normalized = parseDesignDocFunctionName(s);\n  return normalized ? normalized.join(\'/\') : null;\n}\n\n// originally parseUri 1.2.2, now patched by us\n// (c) Steven Levithan <stevenlevithan.com>\n// MIT License\nvar keys = ["source", "protocol", "authority", "userInfo", "user", "password",\n    "host", "port", "relative", "path", "directory", "file", "query", "anchor"];\nvar qName ="queryKey";\nvar qParser = /(?:^|&)([^&=]*)=?([^&]*)/g;\n\n// use the "loose" parser\n/* jshint maxlen: false */\nvar parser = /^(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?(?:\\/\\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?)(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))(?:\\?([^#]*))?(?:#(.*))?)/;\n\nfunction parseUri(str) {\n  var m = parser.exec(str);\n  var uri = {};\n  var i = 14;\n\n  while (i--) {\n    var key = keys[i];\n    var value = m[i] || "";\n    var encoded = [\'user\', \'password\'].indexOf(key) !== -1;\n    uri[key] = encoded ? decodeURIComponent(value) : value;\n  }\n\n  uri[qName] = {};\n  uri[keys[12]].replace(qParser, function ($0, $1, $2) {\n    if ($1) {\n      uri[qName][$1] = $2;\n    }\n  });\n\n  return uri;\n}\n\n// this is essentially the "update sugar" function from daleharvey/pouchdb#1388\n// the diffFun tells us what delta to apply to the doc.  it either returns\n// the doc, or false if it doesn\'t need to do an update after all\nfunction upsert(db, docId, diffFun) {\n  return new PouchPromise(function (fulfill, reject) {\n    db.get(docId, function (err, doc) {\n      if (err) {\n        /* istanbul ignore next */\n        if (err.status !== 404) {\n          return reject(err);\n        }\n        doc = {};\n      }\n\n      // the user might change the _rev, so save it for posterity\n      var docRev = doc._rev;\n      var newDoc = diffFun(doc);\n\n      if (!newDoc) {\n        // if the diffFun returns falsy, we short-circuit as\n        // an optimization\n        return fulfill({updated: false, rev: docRev});\n      }\n\n      // users aren\'t allowed to modify these values,\n      // so reset them here\n      newDoc._id = docId;\n      newDoc._rev = docRev;\n      fulfill(tryAndPut(db, newDoc, diffFun));\n    });\n  });\n}\n\nfunction tryAndPut(db, doc, diffFun) {\n  return db.put(doc).then(function (res) {\n    return {\n      updated: true,\n      rev: res.rev\n    };\n  }, function (err) {\n    /* istanbul ignore next */\n    if (err.status !== 409) {\n      throw err;\n    }\n    return upsert(db, doc._id, diffFun);\n  });\n}\n\n// BEGIN Math.uuid.js\n\n/*!\nMath.uuid.js (v1.4)\nhttp://www.broofa.com\nmailto:robert@broofa.com\n\nCopyright (c) 2010 Robert Kieffer\nDual licensed under the MIT and GPL licenses.\n*/\n\n/*\n * Generate a random uuid.\n *\n * USAGE: Math.uuid(length, radix)\n *   length - the desired number of characters\n *   radix  - the number of allowable values for each character.\n *\n * EXAMPLES:\n *   // No arguments  - returns RFC4122, version 4 ID\n *   >>> Math.uuid()\n *   "92329D39-6F5C-4520-ABFC-AAB64544E172"\n *\n *   // One argument - returns ID of the specified length\n *   >>> Math.uuid(15)     // 15 character ID (default base=62)\n *   "VcydxgltxrVZSTV"\n *\n *   // Two arguments - returns ID of the specified length, and radix. \n *   // (Radix must be <= 62)\n *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)\n *   "01001010"\n *   >>> Math.uuid(8, 10) // 8 character ID (base=10)\n *   "47473046"\n *   >>> Math.uuid(8, 16) // 8 character ID (base=16)\n *   "098F4D35"\n */\nvar chars = (\n  \'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\' +\n  \'abcdefghijklmnopqrstuvwxyz\'\n).split(\'\');\nfunction getValue(radix) {\n  return 0 | Math.random() * radix;\n}\nfunction uuid(len, radix) {\n  radix = radix || chars.length;\n  var out = \'\';\n  var i = -1;\n\n  if (len) {\n    // Compact form\n    while (++i < len) {\n      out += chars[getValue(radix)];\n    }\n    return out;\n  }\n    // rfc4122, version 4 form\n    // Fill in random data.  At i==19 set the high bits of clock sequence as\n    // per rfc4122, sec. 4.1.5\n  while (++i < 36) {\n    switch (i) {\n      case 8:\n      case 13:\n      case 18:\n      case 23:\n        out += \'-\';\n        break;\n      case 19:\n        out += chars[(getValue(16) & 0x3) | 0x8];\n        break;\n      default:\n        out += chars[getValue(16)];\n    }\n  }\n\n  return out;\n}\n\n// We fetch all leafs of the revision tree, and sort them based on tree length\n// and whether they were deleted, undeleted documents with the longest revision\n// tree (most edits) win\n// The final sort algorithm is slightly documented in a sidebar here:\n// http://guide.couchdb.org/draft/conflicts.html\nfunction winningRev(metadata) {\n  var winningId;\n  var winningPos;\n  var winningDeleted;\n  var toVisit = metadata.rev_tree.slice();\n  var node;\n  while ((node = toVisit.pop())) {\n    var tree = node.ids;\n    var branches = tree[2];\n    var pos = node.pos;\n    if (branches.length) { // non-leaf\n      for (var i = 0, len = branches.length; i < len; i++) {\n        toVisit.push({pos: pos + 1, ids: branches[i]});\n      }\n      continue;\n    }\n    var deleted = !!tree[1].deleted;\n    var id = tree[0];\n    // sort by deleted, then pos, then id\n    if (!winningId || (winningDeleted !== deleted ? winningDeleted :\n        winningPos !== pos ? winningPos < pos : winningId < id)) {\n      winningId = id;\n      winningPos = pos;\n      winningDeleted = deleted;\n    }\n  }\n\n  return winningPos + \'-\' + winningId;\n}\n\n// Pretty much all below can be combined into a higher order function to\n// traverse revisions\n// The return value from the callback will be passed as context to all\n// children of that node\nfunction traverseRevTree(revs, callback) {\n  var toVisit = revs.slice();\n\n  var node;\n  while ((node = toVisit.pop())) {\n    var pos = node.pos;\n    var tree = node.ids;\n    var branches = tree[2];\n    var newCtx =\n      callback(branches.length === 0, pos, tree[0], node.ctx, tree[1]);\n    for (var i = 0, len = branches.length; i < len; i++) {\n      toVisit.push({pos: pos + 1, ids: branches[i], ctx: newCtx});\n    }\n  }\n}\n\nfunction sortByPos(a, b) {\n  return a.pos - b.pos;\n}\n\nfunction collectLeaves(revs) {\n  var leaves = [];\n  traverseRevTree(revs, function (isLeaf, pos, id, acc, opts) {\n    if (isLeaf) {\n      leaves.push({rev: pos + "-" + id, pos: pos, opts: opts});\n    }\n  });\n  leaves.sort(sortByPos).reverse();\n  for (var i = 0, len = leaves.length; i < len; i++) {\n    delete leaves[i].pos;\n  }\n  return leaves;\n}\n\n// returns revs of all conflicts that is leaves such that\n// 1. are not deleted and\n// 2. are different than winning revision\nfunction collectConflicts(metadata) {\n  var win = winningRev(metadata);\n  var leaves = collectLeaves(metadata.rev_tree);\n  var conflicts = [];\n  for (var i = 0, len = leaves.length; i < len; i++) {\n    var leaf = leaves[i];\n    if (leaf.rev !== win && !leaf.opts.deleted) {\n      conflicts.push(leaf.rev);\n    }\n  }\n  return conflicts;\n}\n\n// compact a tree by marking its non-leafs as missing,\n// and return a list of revs to delete\nfunction compactTree(metadata) {\n  var revs = [];\n  traverseRevTree(metadata.rev_tree, function (isLeaf, pos,\n                                               revHash, ctx, opts) {\n    if (opts.status === \'available\' && !isLeaf) {\n      revs.push(pos + \'-\' + revHash);\n      opts.status = \'missing\';\n    }\n  });\n  return revs;\n}\n\n// build up a list of all the paths to the leafs in this revision tree\nfunction rootToLeaf(revs) {\n  var paths = [];\n  var toVisit = revs.slice();\n  var node;\n  while ((node = toVisit.pop())) {\n    var pos = node.pos;\n    var tree = node.ids;\n    var id = tree[0];\n    var opts = tree[1];\n    var branches = tree[2];\n    var isLeaf = branches.length === 0;\n\n    var history = node.history ? node.history.slice() : [];\n    history.push({id: id, opts: opts});\n    if (isLeaf) {\n      paths.push({pos: (pos + 1 - history.length), ids: history});\n    }\n    for (var i = 0, len = branches.length; i < len; i++) {\n      toVisit.push({pos: pos + 1, ids: branches[i], history: history});\n    }\n  }\n  return paths.reverse();\n}\n\nfunction sortByPos$1(a, b) {\n  return a.pos - b.pos;\n}\n\n// classic binary search\nfunction binarySearch(arr, item, comparator) {\n  var low = 0;\n  var high = arr.length;\n  var mid;\n  while (low < high) {\n    mid = (low + high) >>> 1;\n    if (comparator(arr[mid], item) < 0) {\n      low = mid + 1;\n    } else {\n      high = mid;\n    }\n  }\n  return low;\n}\n\n// assuming the arr is sorted, insert the item in the proper place\nfunction insertSorted(arr, item, comparator) {\n  var idx = binarySearch(arr, item, comparator);\n  arr.splice(idx, 0, item);\n}\n\n// Turn a path as a flat array into a tree with a single branch.\n// If any should be stemmed from the beginning of the array, that\'s passed\n// in as the second argument\nfunction pathToTree(path, numStemmed) {\n  var root;\n  var leaf;\n  for (var i = numStemmed, len = path.length; i < len; i++) {\n    var node = path[i];\n    var currentLeaf = [node.id, node.opts, []];\n    if (leaf) {\n      leaf[2].push(currentLeaf);\n      leaf = currentLeaf;\n    } else {\n      root = leaf = currentLeaf;\n    }\n  }\n  return root;\n}\n\n// compare the IDs of two trees\nfunction compareTree(a, b) {\n  return a[0] < b[0] ? -1 : 1;\n}\n\n// Merge two trees together\n// The roots of tree1 and tree2 must be the same revision\nfunction mergeTree(in_tree1, in_tree2) {\n  var queue = [{tree1: in_tree1, tree2: in_tree2}];\n  var conflicts = false;\n  while (queue.length > 0) {\n    var item = queue.pop();\n    var tree1 = item.tree1;\n    var tree2 = item.tree2;\n\n    if (tree1[1].status || tree2[1].status) {\n      tree1[1].status =\n        (tree1[1].status ===  \'available\' ||\n        tree2[1].status === \'available\') ? \'available\' : \'missing\';\n    }\n\n    for (var i = 0; i < tree2[2].length; i++) {\n      if (!tree1[2][0]) {\n        conflicts = \'new_leaf\';\n        tree1[2][0] = tree2[2][i];\n        continue;\n      }\n\n      var merged = false;\n      for (var j = 0; j < tree1[2].length; j++) {\n        if (tree1[2][j][0] === tree2[2][i][0]) {\n          queue.push({tree1: tree1[2][j], tree2: tree2[2][i]});\n          merged = true;\n        }\n      }\n      if (!merged) {\n        conflicts = \'new_branch\';\n        insertSorted(tree1[2], tree2[2][i], compareTree);\n      }\n    }\n  }\n  return {conflicts: conflicts, tree: in_tree1};\n}\n\nfunction doMerge(tree, path, dontExpand) {\n  var restree = [];\n  var conflicts = false;\n  var merged = false;\n  var res;\n\n  if (!tree.length) {\n    return {tree: [path], conflicts: \'new_leaf\'};\n  }\n\n  for (var i = 0, len = tree.length; i < len; i++) {\n    var branch = tree[i];\n    if (branch.pos === path.pos && branch.ids[0] === path.ids[0]) {\n      // Paths start at the same position and have the same root, so they need\n      // merged\n      res = mergeTree(branch.ids, path.ids);\n      restree.push({pos: branch.pos, ids: res.tree});\n      conflicts = conflicts || res.conflicts;\n      merged = true;\n    } else if (dontExpand !== true) {\n      // The paths start at a different position, take the earliest path and\n      // traverse up until it as at the same point from root as the path we\n      // want to merge.  If the keys match we return the longer path with the\n      // other merged After stemming we dont want to expand the trees\n\n      var t1 = branch.pos < path.pos ? branch : path;\n      var t2 = branch.pos < path.pos ? path : branch;\n      var diff = t2.pos - t1.pos;\n\n      var candidateParents = [];\n\n      var trees = [];\n      trees.push({ids: t1.ids, diff: diff, parent: null, parentIdx: null});\n      while (trees.length > 0) {\n        var item = trees.pop();\n        if (item.diff === 0) {\n          if (item.ids[0] === t2.ids[0]) {\n            candidateParents.push(item);\n          }\n          continue;\n        }\n        var elements = item.ids[2];\n        for (var j = 0, elementsLen = elements.length; j < elementsLen; j++) {\n          trees.push({\n            ids: elements[j],\n            diff: item.diff - 1,\n            parent: item.ids,\n            parentIdx: j\n          });\n        }\n      }\n\n      var el = candidateParents[0];\n\n      if (!el) {\n        restree.push(branch);\n      } else {\n        res = mergeTree(el.ids, t2.ids);\n        el.parent[2][el.parentIdx] = res.tree;\n        restree.push({pos: t1.pos, ids: t1.ids});\n        conflicts = conflicts || res.conflicts;\n        merged = true;\n      }\n    } else {\n      restree.push(branch);\n    }\n  }\n\n  // We didnt find\n  if (!merged) {\n    restree.push(path);\n  }\n\n  restree.sort(sortByPos$1);\n\n  return {\n    tree: restree,\n    conflicts: conflicts || \'internal_node\'\n  };\n}\n\n// To ensure we dont grow the revision tree infinitely, we stem old revisions\nfunction stem(tree, depth) {\n  // First we break out the tree into a complete list of root to leaf paths\n  var paths = rootToLeaf(tree);\n  var maybeStem = {};\n\n  var result;\n  for (var i = 0, len = paths.length; i < len; i++) {\n    // Then for each path, we cut off the start of the path based on the\n    // `depth` to stem to, and generate a new set of flat trees\n    var path = paths[i];\n    var stemmed = path.ids;\n    var numStemmed = Math.max(0, stemmed.length - depth);\n    var stemmedNode = {\n      pos: path.pos + numStemmed,\n      ids: pathToTree(stemmed, numStemmed)\n    };\n\n    for (var s = 0; s < numStemmed; s++) {\n      var rev = (path.pos + s) + \'-\' + stemmed[s].id;\n      maybeStem[rev] = true;\n    }\n\n    // Then we remerge all those flat trees together, ensuring that we dont\n    // connect trees that would go beyond the depth limit\n    if (result) {\n      result = doMerge(result, stemmedNode, true).tree;\n    } else {\n      result = [stemmedNode];\n    }\n  }\n\n  traverseRevTree(result, function (isLeaf, pos, revHash) {\n    // some revisions may have been removed in a branch but not in another\n    delete maybeStem[pos + \'-\' + revHash];\n  });\n\n  return {\n    tree: result,\n    revs: Object.keys(maybeStem)\n  };\n}\n\nfunction merge(tree, path, depth) {\n  var newTree = doMerge(tree, path);\n  var stemmed = stem(newTree.tree, depth);\n  return {\n    tree: stemmed.tree,\n    stemmedRevs: stemmed.revs,\n    conflicts: newTree.conflicts\n  };\n}\n\n// return true if a rev exists in the rev tree, false otherwise\nfunction revExists(revs, rev) {\n  var toVisit = revs.slice();\n  var splitRev = rev.split(\'-\');\n  var targetPos = parseInt(splitRev[0], 10);\n  var targetId = splitRev[1];\n\n  var node;\n  while ((node = toVisit.pop())) {\n    if (node.pos === targetPos && node.ids[0] === targetId) {\n      return true;\n    }\n    var branches = node.ids[2];\n    for (var i = 0, len = branches.length; i < len; i++) {\n      toVisit.push({pos: node.pos + 1, ids: branches[i]});\n    }\n  }\n  return false;\n}\n\nfunction getTrees(node) {\n  return node.ids;\n}\n\n// check if a specific revision of a doc has been deleted\n//  - metadata: the metadata object from the doc store\n//  - rev: (optional) the revision to check. defaults to winning revision\nfunction isDeleted(metadata, rev) {\n  if (!rev) {\n    rev = winningRev(metadata);\n  }\n  var id = rev.substring(rev.indexOf(\'-\') + 1);\n  var toVisit = metadata.rev_tree.map(getTrees);\n\n  var tree;\n  while ((tree = toVisit.pop())) {\n    if (tree[0] === id) {\n      return !!tree[1].deleted;\n    }\n    toVisit = toVisit.concat(tree[2]);\n  }\n}\n\nfunction isLocalId(id) {\n  return (/^_local/).test(id);\n}\n\nfunction evalFilter(input) {\n  return scopedEval(\'return \' + input + \';\', {});\n}\n\nfunction evalView(input) {\n  /* jshint evil:true */\n  return new Function(\'doc\', [\n    \'var emitted = false;\',\n    \'var emit = function (a, b) {\',\n    \'  emitted = true;\',\n    \'};\',\n    \'var view = \' + input + \';\',\n    \'view(doc);\',\n    \'if (emitted) {\',\n    \'  return true;\',\n    \'}\'\n  ].join(\'\\n\'));\n}\n\ninherits(Changes, events.EventEmitter);\n\nfunction tryCatchInChangeListener(self, change) {\n  // isolate try/catches to avoid V8 deoptimizations\n  try {\n    self.emit(\'change\', change);\n  } catch (e) {\n    guardedConsole(\'error\', \'Error in .on("change", function):\', e);\n  }\n}\n\nfunction Changes(db, opts, callback) {\n  events.EventEmitter.call(this);\n  var self = this;\n  this.db = db;\n  opts = opts ? clone(opts) : {};\n  var complete = opts.complete = once(function (err, resp) {\n    if (err) {\n      if (listenerCount(self, \'error\') > 0) {\n        self.emit(\'error\', err);\n      }\n    } else {\n      self.emit(\'complete\', resp);\n    }\n    self.removeAllListeners();\n    db.removeListener(\'destroyed\', onDestroy);\n  });\n  if (callback) {\n    self.on(\'complete\', function (resp) {\n      callback(null, resp);\n    });\n    self.on(\'error\', callback);\n  }\n  function onDestroy() {\n    self.cancel();\n  }\n  db.once(\'destroyed\', onDestroy);\n\n  opts.onChange = function (change) {\n    /* istanbul ignore if */\n    if (opts.isCancelled) {\n      return;\n    }\n    tryCatchInChangeListener(self, change);\n    if (self.startSeq && self.startSeq <= change.seq) {\n      self.startSeq = false;\n    }\n  };\n\n  var promise = new PouchPromise(function (fulfill, reject) {\n    opts.complete = function (err, res) {\n      if (err) {\n        reject(err);\n      } else {\n        fulfill(res);\n      }\n    };\n  });\n  self.once(\'cancel\', function () {\n    db.removeListener(\'destroyed\', onDestroy);\n    opts.complete(null, {status: \'cancelled\'});\n  });\n  this.then = promise.then.bind(promise);\n  this[\'catch\'] = promise[\'catch\'].bind(promise);\n  this.then(function (result) {\n    complete(null, result);\n  }, complete);\n\n\n\n  if (!db.taskqueue.isReady) {\n    db.taskqueue.addTask(function () {\n      if (self.isCancelled) {\n        self.emit(\'cancel\');\n      } else {\n        self.doChanges(opts);\n      }\n    });\n  } else {\n    self.doChanges(opts);\n  }\n}\nChanges.prototype.cancel = function () {\n  this.isCancelled = true;\n  if (this.db.taskqueue.isReady) {\n    this.emit(\'cancel\');\n  }\n};\nfunction processChange(doc, metadata, opts) {\n  var changeList = [{rev: doc._rev}];\n  if (opts.style === \'all_docs\') {\n    changeList = collectLeaves(metadata.rev_tree)\n    .map(function (x) { return {rev: x.rev}; });\n  }\n  var change = {\n    id: metadata.id,\n    changes: changeList,\n    doc: doc\n  };\n\n  if (isDeleted(metadata, doc._rev)) {\n    change.deleted = true;\n  }\n  if (opts.conflicts) {\n    change.doc._conflicts = collectConflicts(metadata);\n    if (!change.doc._conflicts.length) {\n      delete change.doc._conflicts;\n    }\n  }\n  return change;\n}\n\nChanges.prototype.doChanges = function (opts) {\n  var self = this;\n  var callback = opts.complete;\n\n  opts = clone(opts);\n  if (\'live\' in opts && !(\'continuous\' in opts)) {\n    opts.continuous = opts.live;\n  }\n  opts.processChange = processChange;\n\n  if (opts.since === \'latest\') {\n    opts.since = \'now\';\n  }\n  if (!opts.since) {\n    opts.since = 0;\n  }\n  if (opts.since === \'now\') {\n    this.db.info().then(function (info) {\n      /* istanbul ignore if */\n      if (self.isCancelled) {\n        callback(null, {status: \'cancelled\'});\n        return;\n      }\n      opts.since = info.update_seq;\n      self.doChanges(opts);\n    }, callback);\n    return;\n  }\n\n  if (opts.continuous && opts.since !== \'now\') {\n    this.db.info().then(function (info) {\n      self.startSeq = info.update_seq;\n    /* istanbul ignore next */\n    }, function (err) {\n      if (err.id === \'idbNull\') {\n        // db closed before this returned thats ok\n        return;\n      }\n      throw err;\n    });\n  }\n\n  if (opts.view && !opts.filter) {\n    opts.filter = \'_view\';\n  }\n\n  if (opts.filter && typeof opts.filter === \'string\') {\n    if (opts.filter === \'_view\') {\n      opts.view = normalizeDesignDocFunctionName(opts.view);\n    } else {\n      opts.filter = normalizeDesignDocFunctionName(opts.filter);\n    }\n\n    if (this.db.type() !== \'http\' && !opts.doc_ids) {\n      return this.filterChanges(opts);\n    }\n  }\n\n  if (!(\'descending\' in opts)) {\n    opts.descending = false;\n  }\n\n  // 0 and 1 should return 1 document\n  opts.limit = opts.limit === 0 ? 1 : opts.limit;\n  opts.complete = callback;\n  var newPromise = this.db._changes(opts);\n  if (newPromise && typeof newPromise.cancel === \'function\') {\n    var cancel = self.cancel;\n    self.cancel = getArguments(function (args) {\n      newPromise.cancel();\n      cancel.apply(this, args);\n    });\n  }\n};\n\nChanges.prototype.filterChanges = function (opts) {\n  var self = this;\n  var callback = opts.complete;\n  if (opts.filter === \'_view\') {\n    if (!opts.view || typeof opts.view !== \'string\') {\n      var err = createError(BAD_REQUEST,\n        \'`view` filter parameter not found or invalid.\');\n      return callback(err);\n    }\n    // fetch a view from a design doc, make it behave like a filter\n    var viewName = parseDesignDocFunctionName(opts.view);\n    this.db.get(\'_design/\' + viewName[0], function (err, ddoc) {\n      /* istanbul ignore if */\n      if (self.isCancelled) {\n        return callback(null, {status: \'cancelled\'});\n      }\n      /* istanbul ignore next */\n      if (err) {\n        return callback(generateErrorFromResponse(err));\n      }\n      var mapFun = ddoc && ddoc.views && ddoc.views[viewName[1]] &&\n        ddoc.views[viewName[1]].map;\n      if (!mapFun) {\n        return callback(createError(MISSING_DOC,\n          (ddoc.views ? \'missing json key: \' + viewName[1] :\n            \'missing json key: views\')));\n      }\n      opts.filter = evalView(mapFun);\n      self.doChanges(opts);\n    });\n  } else {\n    // fetch a filter from a design doc\n    var filterName = parseDesignDocFunctionName(opts.filter);\n    if (!filterName) {\n      return self.doChanges(opts);\n    }\n    this.db.get(\'_design/\' + filterName[0], function (err, ddoc) {\n      /* istanbul ignore if */\n      if (self.isCancelled) {\n        return callback(null, {status: \'cancelled\'});\n      }\n      /* istanbul ignore next */\n      if (err) {\n        return callback(generateErrorFromResponse(err));\n      }\n      var filterFun = ddoc && ddoc.filters && ddoc.filters[filterName[1]];\n      if (!filterFun) {\n        return callback(createError(MISSING_DOC,\n          ((ddoc && ddoc.filters) ? \'missing json key: \' + filterName[1]\n            : \'missing json key: filters\')));\n      }\n      opts.filter = evalFilter(filterFun);\n      self.doChanges(opts);\n    });\n  }\n};\n\n/*\n * A generic pouch adapter\n */\n\nfunction compare(left, right) {\n  return left < right ? -1 : left > right ? 1 : 0;\n}\n\n// returns first element of arr satisfying callback predicate\nfunction arrayFirst(arr, callback) {\n  for (var i = 0; i < arr.length; i++) {\n    if (callback(arr[i], i) === true) {\n      return arr[i];\n    }\n  }\n}\n\n// Wrapper for functions that call the bulkdocs api with a single doc,\n// if the first result is an error, return an error\nfunction yankError(callback) {\n  return function (err, results) {\n    if (err || (results[0] && results[0].error)) {\n      callback(err || results[0]);\n    } else {\n      callback(null, results.length ? results[0]  : results);\n    }\n  };\n}\n\n// clean docs given to us by the user\nfunction cleanDocs(docs) {\n  for (var i = 0; i < docs.length; i++) {\n    var doc = docs[i];\n    if (doc._deleted) {\n      delete doc._attachments; // ignore atts for deleted docs\n    } else if (doc._attachments) {\n      // filter out extraneous keys from _attachments\n      var atts = Object.keys(doc._attachments);\n      for (var j = 0; j < atts.length; j++) {\n        var att = atts[j];\n        doc._attachments[att] = pick(doc._attachments[att],\n          [\'data\', \'digest\', \'content_type\', \'length\', \'revpos\', \'stub\']);\n      }\n    }\n  }\n}\n\n// compare two docs, first by _id then by _rev\nfunction compareByIdThenRev(a, b) {\n  var idCompare = compare(a._id, b._id);\n  if (idCompare !== 0) {\n    return idCompare;\n  }\n  var aStart = a._revisions ? a._revisions.start : 0;\n  var bStart = b._revisions ? b._revisions.start : 0;\n  return compare(aStart, bStart);\n}\n\n// for every node in a revision tree computes its distance from the closest\n// leaf\nfunction computeHeight(revs) {\n  var height = {};\n  var edges = [];\n  traverseRevTree(revs, function (isLeaf, pos, id, prnt) {\n    var rev = pos + "-" + id;\n    if (isLeaf) {\n      height[rev] = 0;\n    }\n    if (prnt !== undefined) {\n      edges.push({from: prnt, to: rev});\n    }\n    return rev;\n  });\n\n  edges.reverse();\n  edges.forEach(function (edge) {\n    if (height[edge.from] === undefined) {\n      height[edge.from] = 1 + height[edge.to];\n    } else {\n      height[edge.from] = Math.min(height[edge.from], 1 + height[edge.to]);\n    }\n  });\n  return height;\n}\n\nfunction allDocsKeysQuery(api, opts, callback) {\n  var keys =  (\'limit\' in opts) ?\n      opts.keys.slice(opts.skip, opts.limit + opts.skip) :\n      (opts.skip > 0) ? opts.keys.slice(opts.skip) : opts.keys;\n  if (opts.descending) {\n    keys.reverse();\n  }\n  if (!keys.length) {\n    return api._allDocs({limit: 0}, callback);\n  }\n  var finalResults = {\n    offset: opts.skip\n  };\n  return PouchPromise.all(keys.map(function (key) {\n    var subOpts = jsExtend.extend({key: key, deleted: \'ok\'}, opts);\n    [\'limit\', \'skip\', \'keys\'].forEach(function (optKey) {\n      delete subOpts[optKey];\n    });\n    return new PouchPromise(function (resolve, reject) {\n      api._allDocs(subOpts, function (err, res) {\n        /* istanbul ignore if */\n        if (err) {\n          return reject(err);\n        }\n        finalResults.total_rows = res.total_rows;\n        resolve(res.rows[0] || {key: key, error: \'not_found\'});\n      });\n    });\n  })).then(function (results) {\n    finalResults.rows = results;\n    return finalResults;\n  });\n}\n\n// all compaction is done in a queue, to avoid attaching\n// too many listeners at once\nfunction doNextCompaction(self) {\n  var task = self._compactionQueue[0];\n  var opts = task.opts;\n  var callback = task.callback;\n  self.get(\'_local/compaction\')["catch"](function () {\n    return false;\n  }).then(function (doc) {\n    if (doc && doc.last_seq) {\n      opts.last_seq = doc.last_seq;\n    }\n    self._compact(opts, function (err, res) {\n      /* istanbul ignore if */\n      if (err) {\n        callback(err);\n      } else {\n        callback(null, res);\n      }\n      process.nextTick(function () {\n        self._compactionQueue.shift();\n        if (self._compactionQueue.length) {\n          doNextCompaction(self);\n        }\n      });\n    });\n  });\n}\n\nfunction attachmentNameError(name) {\n  if (name.charAt(0) === \'_\') {\n    return name + \'is not a valid attachment name, attachment \' +\n      \'names cannot start with \\\'_\\\'\';\n  }\n  return false;\n}\n\ninherits(AbstractPouchDB, events.EventEmitter);\n\nfunction AbstractPouchDB() {\n  events.EventEmitter.call(this);\n}\n\nAbstractPouchDB.prototype.post =\n  adapterFun(\'post\', function (doc, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  if (typeof doc !== \'object\' || Array.isArray(doc)) {\n    return callback(createError(NOT_AN_OBJECT));\n  }\n  this.bulkDocs({docs: [doc]}, opts, yankError(callback));\n});\n\nAbstractPouchDB.prototype.put =\n  adapterFun(\'put\', getArguments(function (args) {\n  var temp, temptype, opts, callback;\n  var warned = false;\n  var doc = args.shift();\n  var id = \'_id\' in doc;\n  if (typeof doc !== \'object\' || Array.isArray(doc)) {\n    callback = args.pop();\n    return callback(createError(NOT_AN_OBJECT));\n  }\n\n  function warn() {\n    if (warned) {\n      return;\n    }\n    guardedConsole(\'warn\', \'db.put(doc, id, rev) has been deprecated and will be \' +\n                 \'removed in a future release, please use \' +\n                 \'db.put({_id: id, _rev: rev}) instead\');\n    warned = true;\n  }\n\n  /* eslint no-constant-condition: 0 */\n  while (true) {\n    temp = args.shift();\n    temptype = typeof temp;\n    if (temptype === "string" && !id) {\n      warn();\n      doc._id = temp;\n      id = true;\n    } else if (temptype === "string" && id && !(\'_rev\' in doc)) {\n      warn();\n      doc._rev = temp;\n    } else if (temptype === "object") {\n      opts = temp;\n    } else if (temptype === "function") {\n      callback = temp;\n    }\n    if (!args.length) {\n      break;\n    }\n  }\n  opts = opts || {};\n  invalidIdError(doc._id);\n  if (isLocalId(doc._id) && typeof this._putLocal === \'function\') {\n    if (doc._deleted) {\n      return this._removeLocal(doc, callback);\n    } else {\n      return this._putLocal(doc, callback);\n    }\n  }\n  this.bulkDocs({docs: [doc]}, opts, yankError(callback));\n}));\n\nAbstractPouchDB.prototype.putAttachment =\n  adapterFun(\'putAttachment\', function (docId, attachmentId, rev,\n                                              blob, type) {\n  var api = this;\n  if (typeof type === \'function\') {\n    type = blob;\n    blob = rev;\n    rev = null;\n  }\n  // Lets fix in https://github.com/pouchdb/pouchdb/issues/3267\n  /* istanbul ignore if */\n  if (typeof type === \'undefined\') {\n    type = blob;\n    blob = rev;\n    rev = null;\n  }\n\n  function createAttachment(doc) {\n    var prevrevpos = \'_rev\' in doc ? parseInt(doc._rev, 10) : 0;\n    doc._attachments = doc._attachments || {};\n    doc._attachments[attachmentId] = {\n      content_type: type,\n      data: blob,\n      revpos: ++prevrevpos\n    };\n    return api.put(doc);\n  }\n\n  return api.get(docId).then(function (doc) {\n    if (doc._rev !== rev) {\n      throw createError(REV_CONFLICT);\n    }\n\n    return createAttachment(doc);\n  }, function (err) {\n     // create new doc\n    /* istanbul ignore else */\n    if (err.reason === MISSING_DOC.message) {\n      return createAttachment({_id: docId});\n    } else {\n      throw err;\n    }\n  });\n});\n\nAbstractPouchDB.prototype.removeAttachment =\n  adapterFun(\'removeAttachment\', function (docId, attachmentId, rev,\n                                                 callback) {\n  var self = this;\n  self.get(docId, function (err, obj) {\n    /* istanbul ignore if */\n    if (err) {\n      callback(err);\n      return;\n    }\n    if (obj._rev !== rev) {\n      callback(createError(REV_CONFLICT));\n      return;\n    }\n    /* istanbul ignore if */\n    if (!obj._attachments) {\n      return callback();\n    }\n    delete obj._attachments[attachmentId];\n    if (Object.keys(obj._attachments).length === 0) {\n      delete obj._attachments;\n    }\n    self.put(obj, callback);\n  });\n});\n\nAbstractPouchDB.prototype.remove =\n  adapterFun(\'remove\', function (docOrId, optsOrRev, opts, callback) {\n  var doc;\n  if (typeof optsOrRev === \'string\') {\n    // id, rev, opts, callback style\n    doc = {\n      _id: docOrId,\n      _rev: optsOrRev\n    };\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n  } else {\n    // doc, opts, callback style\n    doc = docOrId;\n    if (typeof optsOrRev === \'function\') {\n      callback = optsOrRev;\n      opts = {};\n    } else {\n      callback = opts;\n      opts = optsOrRev;\n    }\n  }\n  opts = opts || {};\n  opts.was_delete = true;\n  var newDoc = {_id: doc._id, _rev: (doc._rev || opts.rev)};\n  newDoc._deleted = true;\n  if (isLocalId(newDoc._id) && typeof this._removeLocal === \'function\') {\n    return this._removeLocal(doc, callback);\n  }\n  this.bulkDocs({docs: [newDoc]}, opts, yankError(callback));\n});\n\nAbstractPouchDB.prototype.revsDiff =\n  adapterFun(\'revsDiff\', function (req, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  var ids = Object.keys(req);\n\n  if (!ids.length) {\n    return callback(null, {});\n  }\n\n  var count = 0;\n  var missing = new pouchdbCollections.Map();\n\n  function addToMissing(id, revId) {\n    if (!missing.has(id)) {\n      missing.set(id, {missing: []});\n    }\n    missing.get(id).missing.push(revId);\n  }\n\n  function processDoc(id, rev_tree) {\n    // Is this fast enough? Maybe we should switch to a set simulated by a map\n    var missingForId = req[id].slice(0);\n    traverseRevTree(rev_tree, function (isLeaf, pos, revHash, ctx,\n      opts) {\n        var rev = pos + \'-\' + revHash;\n        var idx = missingForId.indexOf(rev);\n        if (idx === -1) {\n          return;\n        }\n\n        missingForId.splice(idx, 1);\n        /* istanbul ignore if */\n        if (opts.status !== \'available\') {\n          addToMissing(id, rev);\n        }\n      });\n\n    // Traversing the tree is synchronous, so now `missingForId` contains\n    // revisions that were not found in the tree\n    missingForId.forEach(function (rev) {\n      addToMissing(id, rev);\n    });\n  }\n\n  ids.map(function (id) {\n    this._getRevisionTree(id, function (err, rev_tree) {\n      if (err && err.status === 404 && err.message === \'missing\') {\n        missing.set(id, {missing: req[id]});\n      } else if (err) {\n        /* istanbul ignore next */\n        return callback(err);\n      } else {\n        processDoc(id, rev_tree);\n      }\n\n      if (++count === ids.length) {\n        // convert LazyMap to object\n        var missingObj = {};\n        missing.forEach(function (value, key) {\n          missingObj[key] = value;\n        });\n        return callback(null, missingObj);\n      }\n    });\n  }, this);\n});\n\n// _bulk_get API for faster replication, as described in\n// https://github.com/apache/couchdb-chttpd/pull/33\n// At the "abstract" level, it will just run multiple get()s in\n// parallel, because this isn\'t much of a performance cost\n// for local databases (except the cost of multiple transactions, which is\n// small). The http adapter overrides this in order\n// to do a more efficient single HTTP request.\nAbstractPouchDB.prototype.bulkGet =\n  adapterFun(\'bulkGet\', function (opts, callback) {\n  bulkGet(this, opts, callback);\n});\n\n// compact one document and fire callback\n// by compacting we mean removing all revisions which\n// are further from the leaf in revision tree than max_height\nAbstractPouchDB.prototype.compactDocument =\n  adapterFun(\'compactDocument\', function (docId, maxHeight, callback) {\n  var self = this;\n  this._getRevisionTree(docId, function (err, revTree) {\n    /* istanbul ignore if */\n    if (err) {\n      return callback(err);\n    }\n    var height = computeHeight(revTree);\n    var candidates = [];\n    var revs = [];\n    Object.keys(height).forEach(function (rev) {\n      if (height[rev] > maxHeight) {\n        candidates.push(rev);\n      }\n    });\n\n    traverseRevTree(revTree, function (isLeaf, pos, revHash, ctx, opts) {\n      var rev = pos + \'-\' + revHash;\n      if (opts.status === \'available\' && candidates.indexOf(rev) !== -1) {\n        revs.push(rev);\n      }\n    });\n    self._doCompaction(docId, revs, callback);\n  });\n});\n\n// compact the whole database using single document\n// compaction\nAbstractPouchDB.prototype.compact =\n  adapterFun(\'compact\', function (opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n\n  var self = this;\n  opts = opts || {};\n\n  self._compactionQueue = self._compactionQueue || [];\n  self._compactionQueue.push({opts: opts, callback: callback});\n  if (self._compactionQueue.length === 1) {\n    doNextCompaction(self);\n  }\n});\nAbstractPouchDB.prototype._compact = function (opts, callback) {\n  var self = this;\n  var changesOpts = {\n    return_docs: false,\n    last_seq: opts.last_seq || 0\n  };\n  var promises = [];\n\n  function onChange(row) {\n    promises.push(self.compactDocument(row.id, 0));\n  }\n  function onComplete(resp) {\n    var lastSeq = resp.last_seq;\n    PouchPromise.all(promises).then(function () {\n      return upsert(self, \'_local/compaction\', function deltaFunc(doc) {\n        if (!doc.last_seq || doc.last_seq < lastSeq) {\n          doc.last_seq = lastSeq;\n          return doc;\n        }\n        return false; // somebody else got here first, don\'t update\n      });\n    }).then(function () {\n      callback(null, {ok: true});\n    })["catch"](callback);\n  }\n  self.changes(changesOpts)\n    .on(\'change\', onChange)\n    .on(\'complete\', onComplete)\n    .on(\'error\', callback);\n};\n/* Begin api wrappers. Specific functionality to storage belongs in the\n   _[method] */\nAbstractPouchDB.prototype.get =\n  adapterFun(\'get\', function (id, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  if (typeof id !== \'string\') {\n    return callback(createError(INVALID_ID));\n  }\n  if (isLocalId(id) && typeof this._getLocal === \'function\') {\n    return this._getLocal(id, callback);\n  }\n  var leaves = [], self = this;\n\n  function finishOpenRevs() {\n    var result = [];\n    var count = leaves.length;\n    /* istanbul ignore if */\n    if (!count) {\n      return callback(null, result);\n    }\n    // order with open_revs is unspecified\n    leaves.forEach(function (leaf) {\n      self.get(id, {\n        rev: leaf,\n        revs: opts.revs,\n        attachments: opts.attachments\n      }, function (err, doc) {\n        if (!err) {\n          result.push({ok: doc});\n        } else {\n          result.push({missing: leaf});\n        }\n        count--;\n        if (!count) {\n          callback(null, result);\n        }\n      });\n    });\n  }\n\n  if (opts.open_revs) {\n    if (opts.open_revs === "all") {\n      this._getRevisionTree(id, function (err, rev_tree) {\n        if (err) {\n          return callback(err);\n        }\n        leaves = collectLeaves(rev_tree).map(function (leaf) {\n          return leaf.rev;\n        });\n        finishOpenRevs();\n      });\n    } else {\n      if (Array.isArray(opts.open_revs)) {\n        leaves = opts.open_revs;\n        for (var i = 0; i < leaves.length; i++) {\n          var l = leaves[i];\n          // looks like it\'s the only thing couchdb checks\n          if (!(typeof (l) === "string" && /^\\d+-/.test(l))) {\n            return callback(createError(INVALID_REV));\n          }\n        }\n        finishOpenRevs();\n      } else {\n        return callback(createError(UNKNOWN_ERROR,\n          \'function_clause\'));\n      }\n    }\n    return; // open_revs does not like other options\n  }\n\n  return this._get(id, opts, function (err, result) {\n    if (err) {\n      return callback(err);\n    }\n\n    var doc = result.doc;\n    var metadata = result.metadata;\n    var ctx = result.ctx;\n\n    if (opts.conflicts) {\n      var conflicts = collectConflicts(metadata);\n      if (conflicts.length) {\n        doc._conflicts = conflicts;\n      }\n    }\n\n    if (isDeleted(metadata, doc._rev)) {\n      doc._deleted = true;\n    }\n\n    if (opts.revs || opts.revs_info) {\n      var paths = rootToLeaf(metadata.rev_tree);\n      var path = arrayFirst(paths, function (arr) {\n        return arr.ids.map(function (x) { return x.id; })\n          .indexOf(doc._rev.split(\'-\')[1]) !== -1;\n      });\n\n      var indexOfRev = path.ids.map(function (x) {return x.id; })\n        .indexOf(doc._rev.split(\'-\')[1]) + 1;\n      var howMany = path.ids.length - indexOfRev;\n      path.ids.splice(indexOfRev, howMany);\n      path.ids.reverse();\n\n      if (opts.revs) {\n        doc._revisions = {\n          start: (path.pos + path.ids.length) - 1,\n          ids: path.ids.map(function (rev) {\n            return rev.id;\n          })\n        };\n      }\n      if (opts.revs_info) {\n        var pos =  path.pos + path.ids.length;\n        doc._revs_info = path.ids.map(function (rev) {\n          pos--;\n          return {\n            rev: pos + \'-\' + rev.id,\n            status: rev.opts.status\n          };\n        });\n      }\n    }\n\n    if (opts.attachments && doc._attachments) {\n      var attachments = doc._attachments;\n      var count = Object.keys(attachments).length;\n      if (count === 0) {\n        return callback(null, doc);\n      }\n      Object.keys(attachments).forEach(function (key) {\n        this._getAttachment(doc._id, key, attachments[key], {\n          // Previously the revision handling was done in adapter.js\n          // getAttachment, however since idb-next doesnt we need to\n          // pass the rev through\n          rev: doc._rev,\n          binary: opts.binary,\n          ctx: ctx\n        }, function (err, data) {\n          var att = doc._attachments[key];\n          att.data = data;\n          delete att.stub;\n          delete att.length;\n          if (!--count) {\n            callback(null, doc);\n          }\n        });\n      }, self);\n    } else {\n      if (doc._attachments) {\n        for (var key in doc._attachments) {\n          /* istanbul ignore else */\n          if (doc._attachments.hasOwnProperty(key)) {\n            doc._attachments[key].stub = true;\n          }\n        }\n      }\n      callback(null, doc);\n    }\n  });\n});\n\n// TODO: I dont like this, it forces an extra read for every\n// attachment read and enforces a confusing api between\n// adapter.js and the adapter implementation\nAbstractPouchDB.prototype.getAttachment =\n  adapterFun(\'getAttachment\', function (docId, attachmentId, opts,\n                                              callback) {\n  var self = this;\n  if (opts instanceof Function) {\n    callback = opts;\n    opts = {};\n  }\n  this._get(docId, opts, function (err, res) {\n    if (err) {\n      return callback(err);\n    }\n    if (res.doc._attachments && res.doc._attachments[attachmentId]) {\n      opts.ctx = res.ctx;\n      opts.binary = true;\n      self._getAttachment(docId, attachmentId,\n                          res.doc._attachments[attachmentId], opts, callback);\n    } else {\n      return callback(createError(MISSING_DOC));\n    }\n  });\n});\n\nAbstractPouchDB.prototype.allDocs =\n  adapterFun(\'allDocs\', function (opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  opts.skip = typeof opts.skip !== \'undefined\' ? opts.skip : 0;\n  if (opts.start_key) {\n    opts.startkey = opts.start_key;\n  }\n  if (opts.end_key) {\n    opts.endkey = opts.end_key;\n  }\n  if (\'keys\' in opts) {\n    if (!Array.isArray(opts.keys)) {\n      return callback(new TypeError(\'options.keys must be an array\'));\n    }\n    var incompatibleOpt =\n      [\'startkey\', \'endkey\', \'key\'].filter(function (incompatibleOpt) {\n      return incompatibleOpt in opts;\n    })[0];\n    if (incompatibleOpt) {\n      callback(createError(QUERY_PARSE_ERROR,\n        \'Query parameter `\' + incompatibleOpt +\n        \'` is not compatible with multi-get\'\n      ));\n      return;\n    }\n    if (this.type() !== \'http\') {\n      return allDocsKeysQuery(this, opts, callback);\n    }\n  }\n\n  return this._allDocs(opts, callback);\n});\n\nAbstractPouchDB.prototype.changes = function (opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  return new Changes(this, opts, callback);\n};\n\nAbstractPouchDB.prototype.close =\n  adapterFun(\'close\', function (callback) {\n  this._closed = true;\n  return this._close(callback);\n});\n\nAbstractPouchDB.prototype.info = adapterFun(\'info\', function (callback) {\n  var self = this;\n  this._info(function (err, info) {\n    if (err) {\n      return callback(err);\n    }\n    // assume we know better than the adapter, unless it informs us\n    info.db_name = info.db_name || self._db_name;\n    info.auto_compaction = !!(self.auto_compaction && self.type() !== \'http\');\n    info.adapter = self.type();\n    callback(null, info);\n  });\n});\n\nAbstractPouchDB.prototype.id = adapterFun(\'id\', function (callback) {\n  return this._id(callback);\n});\n\nAbstractPouchDB.prototype.type = function () {\n  /* istanbul ignore next */\n  return (typeof this._type === \'function\') ? this._type() : this.adapter;\n};\n\nAbstractPouchDB.prototype.bulkDocs =\n  adapterFun(\'bulkDocs\', function (req, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n\n  opts = opts || {};\n\n  if (Array.isArray(req)) {\n    req = {\n      docs: req\n    };\n  }\n\n  if (!req || !req.docs || !Array.isArray(req.docs)) {\n    return callback(createError(MISSING_BULK_DOCS));\n  }\n\n  for (var i = 0; i < req.docs.length; ++i) {\n    if (typeof req.docs[i] !== \'object\' || Array.isArray(req.docs[i])) {\n      return callback(createError(NOT_AN_OBJECT));\n    }\n  }\n\n  var attachmentError;\n  req.docs.forEach(function (doc) {\n    if (doc._attachments) {\n      Object.keys(doc._attachments).forEach(function (name) {\n        attachmentError = attachmentError || attachmentNameError(name);\n      });\n    }\n  });\n\n  if (attachmentError) {\n    return callback(createError(BAD_REQUEST, attachmentError));\n  }\n\n  if (!(\'new_edits\' in opts)) {\n    if (\'new_edits\' in req) {\n      opts.new_edits = req.new_edits;\n    } else {\n      opts.new_edits = true;\n    }\n  }\n\n  if (!opts.new_edits && this.type() !== \'http\') {\n    // ensure revisions of the same doc are sorted, so that\n    // the local adapter processes them correctly (#2935)\n    req.docs.sort(compareByIdThenRev);\n  }\n\n  cleanDocs(req.docs);\n\n  return this._bulkDocs(req, opts, function (err, res) {\n    if (err) {\n      return callback(err);\n    }\n    if (!opts.new_edits) {\n      // this is what couch does when new_edits is false\n      res = res.filter(function (x) {\n        return x.error;\n      });\n    }\n    callback(null, res);\n  });\n});\n\nAbstractPouchDB.prototype.registerDependentDatabase =\n  adapterFun(\'registerDependentDatabase\', function (dependentDb,\n                                                          callback) {\n  var depDB = new this.constructor(dependentDb, this.__opts);\n\n  function diffFun(doc) {\n    doc.dependentDbs = doc.dependentDbs || {};\n    if (doc.dependentDbs[dependentDb]) {\n      return false; // no update required\n    }\n    doc.dependentDbs[dependentDb] = true;\n    return doc;\n  }\n  upsert(this, \'_local/_pouch_dependentDbs\', diffFun)\n    .then(function () {\n      callback(null, {db: depDB});\n    })["catch"](callback);\n});\n\nAbstractPouchDB.prototype.destroy =\n  adapterFun(\'destroy\', function (opts, callback) {\n\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n\n  var self = this;\n  var usePrefix = \'use_prefix\' in self ? self.use_prefix : true;\n\n  function destroyDb() {\n    // call destroy method of the particular adaptor\n    self._destroy(opts, function (err, resp) {\n      if (err) {\n        return callback(err);\n      }\n      self._destroyed = true;\n      self.emit(\'destroyed\');\n      callback(null, resp || { \'ok\': true });\n    });\n  }\n\n  if (self.type() === \'http\') {\n    // no need to check for dependent DBs if it\'s a remote DB\n    return destroyDb();\n  }\n\n  self.get(\'_local/_pouch_dependentDbs\', function (err, localDoc) {\n    if (err) {\n      /* istanbul ignore if */\n      if (err.status !== 404) {\n        return callback(err);\n      } else { // no dependencies\n        return destroyDb();\n      }\n    }\n    var dependentDbs = localDoc.dependentDbs;\n    var PouchDB = self.constructor;\n    var deletedMap = Object.keys(dependentDbs).map(function (name) {\n      // use_prefix is only false in the browser\n      /* istanbul ignore next */\n      var trueName = usePrefix ?\n        name.replace(new RegExp(\'^\' + PouchDB.prefix), \'\') : name;\n      return new PouchDB(trueName, self.__opts).destroy();\n    });\n    PouchPromise.all(deletedMap).then(destroyDb, callback);\n  });\n});\n\nfunction TaskQueue() {\n  this.isReady = false;\n  this.failed = false;\n  this.queue = [];\n}\n\nTaskQueue.prototype.execute = function () {\n  var fun;\n  if (this.failed) {\n    while ((fun = this.queue.shift())) {\n      fun(this.failed);\n    }\n  } else {\n    while ((fun = this.queue.shift())) {\n      fun();\n    }\n  }\n};\n\nTaskQueue.prototype.fail = function (err) {\n  this.failed = err;\n  this.execute();\n};\n\nTaskQueue.prototype.ready = function (db) {\n  this.isReady = true;\n  this.db = db;\n  this.execute();\n};\n\nTaskQueue.prototype.addTask = function (fun) {\n  this.queue.push(fun);\n  if (this.failed) {\n    this.execute();\n  }\n};\n\nfunction defaultCallback(err) {\n  /* istanbul ignore next */\n  if (err && global.debug) {\n    guardedConsole(\'error\', err);\n  }\n}\n\n// OK, so here\'s the deal. Consider this code:\n//     var db1 = new PouchDB(\'foo\');\n//     var db2 = new PouchDB(\'foo\');\n//     db1.destroy();\n// ^ these two both need to emit \'destroyed\' events,\n// as well as the PouchDB constructor itself.\n// So we have one db object (whichever one got destroy() called on it)\n// responsible for emitting the initial event, which then gets emitted\n// by the constructor, which then broadcasts it to any other dbs\n// that may have been created with the same name.\nfunction prepareForDestruction(self, opts) {\n  var name = opts.originalName;\n  var ctor = self.constructor;\n  var destructionListeners = ctor._destructionListeners;\n\n  function onDestroyed() {\n    ctor.emit(\'destroyed\', name);\n  }\n\n  function onConstructorDestroyed() {\n    self.removeListener(\'destroyed\', onDestroyed);\n    self.emit(\'destroyed\', self);\n  }\n\n  self.once(\'destroyed\', onDestroyed);\n\n  // in setup.js, the constructor is primed to listen for destroy events\n  if (!destructionListeners.has(name)) {\n    destructionListeners.set(name, []);\n  }\n  destructionListeners.get(name).push(onConstructorDestroyed);\n}\n\ninherits(PouchDB, AbstractPouchDB);\nfunction PouchDB(name, opts, callback) {\n\n  /* istanbul ignore if */\n  if (!(this instanceof PouchDB)) {\n    return new PouchDB(name, opts, callback);\n  }\n\n  var self = this;\n  if (typeof opts === \'function\' || typeof opts === \'undefined\') {\n    callback = opts;\n    opts = {};\n  }\n\n  if (name && typeof name === \'object\') {\n    opts = name;\n    name = undefined;\n  }\n\n  if (typeof callback === \'undefined\') {\n    callback = defaultCallback;\n  } else {\n    var oldCallback = callback;\n    callback = function () {\n      guardedConsole(\'warn\', \'Using a callback for new PouchDB()\' +\n                     \'is deprecated.\');\n      return oldCallback.apply(null, arguments);\n    };\n  }\n\n  name = name || opts.name;\n  opts = clone(opts);\n  // if name was specified via opts, ignore for the sake of dependentDbs\n  delete opts.name;\n  this.__opts = opts;\n  var oldCB = callback;\n  self.auto_compaction = opts.auto_compaction;\n  self.prefix = PouchDB.prefix;\n  AbstractPouchDB.call(self);\n  self.taskqueue = new TaskQueue();\n  var promise = new PouchPromise(function (fulfill, reject) {\n    callback = function (err, resp) {\n      /* istanbul ignore if */\n      if (err) {\n        return reject(err);\n      }\n      delete resp.then;\n      fulfill(resp);\n    };\n\n    opts = clone(opts);\n    var backend, error;\n    (function () {\n      try {\n\n        if (typeof name !== \'string\') {\n          error = new Error(\'Missing/invalid DB name\');\n          error.code = 400;\n          throw error;\n        }\n\n        var prefixedName = (opts.prefix || \'\') + name;\n        backend = PouchDB.parseAdapter(prefixedName, opts);\n\n        opts.originalName = name;\n        opts.name = backend.name;\n        opts.adapter = opts.adapter || backend.adapter;\n        self._adapter = opts.adapter;\n        debug(\'pouchdb:adapter\')(\'Picked adapter: \' + opts.adapter);\n\n        self._db_name = name;\n        if (!PouchDB.adapters[opts.adapter]) {\n          error = new Error(\'Adapter is missing\');\n          error.code = 404;\n          throw error;\n        }\n\n        /* istanbul ignore if */\n        if (!PouchDB.adapters[opts.adapter].valid()) {\n          error = new Error(\'Invalid Adapter\');\n          error.code = 404;\n          throw error;\n        }\n      } catch (err) {\n        self.taskqueue.fail(err);\n      }\n    }());\n    if (error) {\n      return reject(error); // constructor error, see above\n    }\n    self.adapter = opts.adapter;\n\n    // needs access to PouchDB;\n    self.replicate = {};\n\n    self.replicate.from = function (url, opts, callback) {\n      return self.constructor.replicate(url, self, opts, callback);\n    };\n\n    self.replicate.to = function (url, opts, callback) {\n      return self.constructor.replicate(self, url, opts, callback);\n    };\n\n    self.sync = function (dbName, opts, callback) {\n      return self.constructor.sync(self, dbName, opts, callback);\n    };\n\n    self.replicate.sync = self.sync;\n\n    PouchDB.adapters[opts.adapter].call(self, opts, function (err) {\n      /* istanbul ignore if */\n      if (err) {\n        self.taskqueue.fail(err);\n        callback(err);\n        return;\n      }\n      prepareForDestruction(self, opts);\n\n      self.emit(\'created\', self);\n      PouchDB.emit(\'created\', opts.originalName);\n      self.taskqueue.ready(self);\n      callback(null, self);\n    });\n\n  });\n  promise.then(function (resp) {\n    oldCB(null, resp);\n  }, oldCB);\n  self.then = promise.then.bind(promise);\n  self["catch"] = promise["catch"].bind(promise);\n}\n\nPouchDB.debug = debug;\n\nPouchDB.adapters = {};\nPouchDB.preferredAdapters = [];\n\nPouchDB.prefix = \'_pouch_\';\n\nvar eventEmitter = new events.EventEmitter();\n\nfunction setUpEventEmitter(Pouch) {\n  Object.keys(events.EventEmitter.prototype).forEach(function (key) {\n    if (typeof events.EventEmitter.prototype[key] === \'function\') {\n      Pouch[key] = eventEmitter[key].bind(eventEmitter);\n    }\n  });\n\n  // these are created in constructor.js, and allow us to notify each DB with\n  // the same name that it was destroyed, via the constructor object\n  var destructListeners = Pouch._destructionListeners = new pouchdbCollections.Map();\n  Pouch.on(\'destroyed\', function onConstructorDestroyed(name) {\n    destructListeners.get(name).forEach(function (callback) {\n      callback();\n    });\n    destructListeners["delete"](name);\n  });\n}\n\nsetUpEventEmitter(PouchDB);\n\nPouchDB.parseAdapter = function (name, opts) {\n  var match = name.match(/([a-z\\-]*):\\/\\/(.*)/);\n  var adapter, adapterName;\n  if (match) {\n    // the http adapter expects the fully qualified name\n    name = /http(s?)/.test(match[1]) ? match[1] + \'://\' + match[2] : match[2];\n    adapter = match[1];\n    /* istanbul ignore if */\n    if (!PouchDB.adapters[adapter].valid()) {\n      throw \'Invalid adapter\';\n    }\n    return {name: name, adapter: match[1]};\n  }\n\n  // check for browsers that have been upgraded from websql-only to websql+idb\n  var skipIdb = \'idb\' in PouchDB.adapters && \'websql\' in PouchDB.adapters &&\n    hasLocalStorage() &&\n    localStorage[\'_pouch__websqldb_\' + PouchDB.prefix + name];\n\n\n  if (opts.adapter) {\n    adapterName = opts.adapter;\n  } else if (typeof opts !== \'undefined\' && opts.db) {\n    adapterName = \'leveldb\';\n  } else { // automatically determine adapter\n    for (var i = 0; i < PouchDB.preferredAdapters.length; ++i) {\n      adapterName = PouchDB.preferredAdapters[i];\n      if (adapterName in PouchDB.adapters) {\n        /* istanbul ignore if */\n        if (skipIdb && adapterName === \'idb\') {\n          // log it, because this can be confusing during development\n          guardedConsole(\'log\', \'PouchDB is downgrading "\' + name + \'" to WebSQL to\' +\n            \' avoid data loss, because it was already opened with WebSQL.\');\n          continue; // keep using websql to avoid user data loss\n        }\n        break;\n      }\n    }\n  }\n\n  adapter = PouchDB.adapters[adapterName];\n\n  // if adapter is invalid, then an error will be thrown later\n  var usePrefix = (adapter && \'use_prefix\' in adapter) ?\n      adapter.use_prefix : true;\n\n  return {\n    name: usePrefix ? (PouchDB.prefix + name) : name,\n    adapter: adapterName\n  };\n};\n\nPouchDB.adapter = function (id, obj, addToPreferredAdapters) {\n  if (obj.valid()) {\n    PouchDB.adapters[id] = obj;\n    if (addToPreferredAdapters) {\n      PouchDB.preferredAdapters.push(id);\n    }\n  }\n};\n\nPouchDB.plugin = function (obj) {\n  if (typeof obj === \'function\') { // function style for plugins\n    obj(PouchDB);\n  } else {\n    Object.keys(obj).forEach(function (id) { // object style for plugins\n      PouchDB.prototype[id] = obj[id];\n    });\n  }\n  return PouchDB;\n};\n\nPouchDB.defaults = function (defaultOpts) {\n  function PouchAlt(name, opts, callback) {\n    if (!(this instanceof PouchAlt)) {\n      return new PouchAlt(name, opts, callback);\n    }\n\n    if (typeof opts === \'function\' || typeof opts === \'undefined\') {\n      callback = opts;\n      opts = {};\n    }\n    if (name && typeof name === \'object\') {\n      opts = name;\n      name = undefined;\n    }\n\n    opts = jsExtend.extend({}, defaultOpts, opts);\n    PouchDB.call(this, name, opts, callback);\n  }\n\n  inherits(PouchAlt, PouchDB);\n\n  PouchAlt.preferredAdapters = PouchDB.preferredAdapters.slice();\n  Object.keys(PouchDB).forEach(function (key) {\n    if (!(key in PouchAlt)) {\n      PouchAlt[key] = PouchDB[key];\n    }\n  });\n\n  return PouchAlt;\n};\n\n// managed automatically by set-version.js\nvar version = "5.4.5";\n\nPouchDB.version = version;\n\nfunction toObject(array) {\n  return array.reduce(function (obj, item) {\n    obj[item] = true;\n    return obj;\n  }, {});\n}\n// List of top level reserved words for doc\nvar reservedWords = toObject([\n  \'_id\',\n  \'_rev\',\n  \'_attachments\',\n  \'_deleted\',\n  \'_revisions\',\n  \'_revs_info\',\n  \'_conflicts\',\n  \'_deleted_conflicts\',\n  \'_local_seq\',\n  \'_rev_tree\',\n  //replication documents\n  \'_replication_id\',\n  \'_replication_state\',\n  \'_replication_state_time\',\n  \'_replication_state_reason\',\n  \'_replication_stats\',\n  // Specific to Couchbase Sync Gateway\n  \'_removed\'\n]);\n\n// List of reserved words that should end up the document\nvar dataWords = toObject([\n  \'_attachments\',\n  //replication documents\n  \'_replication_id\',\n  \'_replication_state\',\n  \'_replication_state_time\',\n  \'_replication_state_reason\',\n  \'_replication_stats\'\n]);\n\nfunction parseRevisionInfo(rev) {\n  if (!/^\\d+\\-./.test(rev)) {\n    return createError(INVALID_REV);\n  }\n  var idx = rev.indexOf(\'-\');\n  var left = rev.substring(0, idx);\n  var right = rev.substring(idx + 1);\n  return {\n    prefix: parseInt(left, 10),\n    id: right\n  };\n}\n\nfunction makeRevTreeFromRevisions(revisions, opts) {\n  var pos = revisions.start - revisions.ids.length + 1;\n\n  var revisionIds = revisions.ids;\n  var ids = [revisionIds[0], opts, []];\n\n  for (var i = 1, len = revisionIds.length; i < len; i++) {\n    ids = [revisionIds[i], {status: \'missing\'}, [ids]];\n  }\n\n  return [{\n    pos: pos,\n    ids: ids\n  }];\n}\n\n// Preprocess documents, parse their revisions, assign an id and a\n// revision for new writes that are missing them, etc\nfunction parseDoc(doc, newEdits) {\n\n  var nRevNum;\n  var newRevId;\n  var revInfo;\n  var opts = {status: \'available\'};\n  if (doc._deleted) {\n    opts.deleted = true;\n  }\n\n  if (newEdits) {\n    if (!doc._id) {\n      doc._id = uuid();\n    }\n    newRevId = uuid(32, 16).toLowerCase();\n    if (doc._rev) {\n      revInfo = parseRevisionInfo(doc._rev);\n      if (revInfo.error) {\n        return revInfo;\n      }\n      doc._rev_tree = [{\n        pos: revInfo.prefix,\n        ids: [revInfo.id, {status: \'missing\'}, [[newRevId, opts, []]]]\n      }];\n      nRevNum = revInfo.prefix + 1;\n    } else {\n      doc._rev_tree = [{\n        pos: 1,\n        ids : [newRevId, opts, []]\n      }];\n      nRevNum = 1;\n    }\n  } else {\n    if (doc._revisions) {\n      doc._rev_tree = makeRevTreeFromRevisions(doc._revisions, opts);\n      nRevNum = doc._revisions.start;\n      newRevId = doc._revisions.ids[0];\n    }\n    if (!doc._rev_tree) {\n      revInfo = parseRevisionInfo(doc._rev);\n      if (revInfo.error) {\n        return revInfo;\n      }\n      nRevNum = revInfo.prefix;\n      newRevId = revInfo.id;\n      doc._rev_tree = [{\n        pos: nRevNum,\n        ids: [newRevId, opts, []]\n      }];\n    }\n  }\n\n  invalidIdError(doc._id);\n\n  doc._rev = nRevNum + \'-\' + newRevId;\n\n  var result = {metadata : {}, data : {}};\n  for (var key in doc) {\n    /* istanbul ignore else */\n    if (Object.prototype.hasOwnProperty.call(doc, key)) {\n      var specialKey = key[0] === \'_\';\n      if (specialKey && !reservedWords[key]) {\n        var error = createError(DOC_VALIDATION, key);\n        error.message = DOC_VALIDATION.message + \': \' + key;\n        throw error;\n      } else if (specialKey && !dataWords[key]) {\n        result.metadata[key.slice(1)] = doc[key];\n      } else {\n        result.data[key] = doc[key];\n      }\n    }\n  }\n  return result;\n}\n\nvar atob$1 = function (str) {\n  return atob(str);\n};\n\nvar btoa$1 = function (str) {\n  return btoa(str);\n};\n\n// Abstracts constructing a Blob object, so it also works in older\n// browsers that don\'t support the native Blob constructor (e.g.\n// old QtWebKit versions, Android < 4.4).\nfunction createBlob(parts, properties) {\n  /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */\n  parts = parts || [];\n  properties = properties || {};\n  try {\n    return new Blob(parts, properties);\n  } catch (e) {\n    if (e.name !== "TypeError") {\n      throw e;\n    }\n    var Builder = typeof BlobBuilder !== \'undefined\' ? BlobBuilder :\n                  typeof MSBlobBuilder !== \'undefined\' ? MSBlobBuilder :\n                  typeof MozBlobBuilder !== \'undefined\' ? MozBlobBuilder :\n                  WebKitBlobBuilder;\n    var builder = new Builder();\n    for (var i = 0; i < parts.length; i += 1) {\n      builder.append(parts[i]);\n    }\n    return builder.getBlob(properties.type);\n  }\n}\n\n// From http://stackoverflow.com/questions/14967647/ (continues on next line)\n// encode-decode-image-with-base64-breaks-image (2013-04-21)\nfunction binaryStringToArrayBuffer(bin) {\n  var length = bin.length;\n  var buf = new ArrayBuffer(length);\n  var arr = new Uint8Array(buf);\n  for (var i = 0; i < length; i++) {\n    arr[i] = bin.charCodeAt(i);\n  }\n  return buf;\n}\n\nfunction binStringToBluffer(binString, type) {\n  return createBlob([binaryStringToArrayBuffer(binString)], {type: type});\n}\n\nfunction b64ToBluffer(b64, type) {\n  return binStringToBluffer(atob$1(b64), type);\n}\n\n//Can\'t find original post, but this is close\n//http://stackoverflow.com/questions/6965107/ (continues on next line)\n//converting-between-strings-and-arraybuffers\nfunction arrayBufferToBinaryString(buffer) {\n  var binary = \'\';\n  var bytes = new Uint8Array(buffer);\n  var length = bytes.byteLength;\n  for (var i = 0; i < length; i++) {\n    binary += String.fromCharCode(bytes[i]);\n  }\n  return binary;\n}\n\n// shim for browsers that don\'t support it\nfunction readAsBinaryString(blob, callback) {\n  if (typeof FileReader === \'undefined\') {\n    // fix for Firefox in a web worker\n    // https://bugzilla.mozilla.org/show_bug.cgi?id=901097\n    return callback(arrayBufferToBinaryString(\n      new FileReaderSync().readAsArrayBuffer(blob)));\n  }\n\n  var reader = new FileReader();\n  var hasBinaryString = typeof reader.readAsBinaryString === \'function\';\n  reader.onloadend = function (e) {\n    var result = e.target.result || \'\';\n    if (hasBinaryString) {\n      return callback(result);\n    }\n    callback(arrayBufferToBinaryString(result));\n  };\n  if (hasBinaryString) {\n    reader.readAsBinaryString(blob);\n  } else {\n    reader.readAsArrayBuffer(blob);\n  }\n}\n\nfunction blobToBinaryString(blobOrBuffer, callback) {\n  readAsBinaryString(blobOrBuffer, function (bin) {\n    callback(bin);\n  });\n}\n\nfunction blobToBase64(blobOrBuffer, callback) {\n  blobToBinaryString(blobOrBuffer, function (base64) {\n    callback(btoa$1(base64));\n  });\n}\n\n// simplified API. universal browser support is assumed\nfunction readAsArrayBuffer(blob, callback) {\n  if (typeof FileReader === \'undefined\') {\n    // fix for Firefox in a web worker:\n    // https://bugzilla.mozilla.org/show_bug.cgi?id=901097\n    return callback(new FileReaderSync().readAsArrayBuffer(blob));\n  }\n\n  var reader = new FileReader();\n  reader.onloadend = function (e) {\n    var result = e.target.result || new ArrayBuffer(0);\n    callback(result);\n  };\n  reader.readAsArrayBuffer(blob);\n}\n\nvar setImmediateShim = global.setImmediate || global.setTimeout;\nvar MD5_CHUNK_SIZE = 32768;\n\nfunction rawToBase64(raw) {\n  return btoa$1(raw);\n}\n\nfunction sliceBlob(blob, start, end) {\n  if (blob.webkitSlice) {\n    return blob.webkitSlice(start, end);\n  }\n  return blob.slice(start, end);\n}\n\nfunction appendBlob(buffer, blob, start, end, callback) {\n  if (start > 0 || end < blob.size) {\n    // only slice blob if we really need to\n    blob = sliceBlob(blob, start, end);\n  }\n  readAsArrayBuffer(blob, function (arrayBuffer) {\n    buffer.append(arrayBuffer);\n    callback();\n  });\n}\n\nfunction appendString(buffer, string, start, end, callback) {\n  if (start > 0 || end < string.length) {\n    // only create a substring if we really need to\n    string = string.substring(start, end);\n  }\n  buffer.appendBinary(string);\n  callback();\n}\n\nfunction binaryMd5(data, callback) {\n  var inputIsString = typeof data === \'string\';\n  var len = inputIsString ? data.length : data.size;\n  var chunkSize = Math.min(MD5_CHUNK_SIZE, len);\n  var chunks = Math.ceil(len / chunkSize);\n  var currentChunk = 0;\n  var buffer = inputIsString ? new Md5() : new Md5.ArrayBuffer();\n\n  var append = inputIsString ? appendString : appendBlob;\n\n  function next() {\n    setImmediateShim(loadNextChunk);\n  }\n\n  function done() {\n    var raw = buffer.end(true);\n    var base64 = rawToBase64(raw);\n    callback(base64);\n    buffer.destroy();\n  }\n\n  function loadNextChunk() {\n    var start = currentChunk * chunkSize;\n    var end = start + chunkSize;\n    currentChunk++;\n    if (currentChunk < chunks) {\n      append(buffer, data, start, end, next);\n    } else {\n      append(buffer, data, start, end, done);\n    }\n  }\n  loadNextChunk();\n}\n\nfunction stringMd5(string) {\n  return Md5.hash(string);\n}\n\nfunction parseBase64(data) {\n  try {\n    return atob$1(data);\n  } catch (e) {\n    var err = createError(BAD_ARG,\n      \'Attachment is not a valid base64 string\');\n    return {error: err};\n  }\n}\n\nfunction preprocessString(att, blobType, callback) {\n  var asBinary = parseBase64(att.data);\n  if (asBinary.error) {\n    return callback(asBinary.error);\n  }\n\n  att.length = asBinary.length;\n  if (blobType === \'blob\') {\n    att.data = binStringToBluffer(asBinary, att.content_type);\n  } else if (blobType === \'base64\') {\n    att.data = btoa$1(asBinary);\n  } else { // binary\n    att.data = asBinary;\n  }\n  binaryMd5(asBinary, function (result) {\n    att.digest = \'md5-\' + result;\n    callback();\n  });\n}\n\nfunction preprocessBlob(att, blobType, callback) {\n  binaryMd5(att.data, function (md5) {\n    att.digest = \'md5-\' + md5;\n    // size is for blobs (browser), length is for buffers (node)\n    att.length = att.data.size || att.data.length || 0;\n    if (blobType === \'binary\') {\n      blobToBinaryString(att.data, function (binString) {\n        att.data = binString;\n        callback();\n      });\n    } else if (blobType === \'base64\') {\n      blobToBase64(att.data, function (b64) {\n        att.data = b64;\n        callback();\n      });\n    } else {\n      callback();\n    }\n  });\n}\n\nfunction preprocessAttachment(att, blobType, callback) {\n  if (att.stub) {\n    return callback();\n  }\n  if (typeof att.data === \'string\') { // input is a base64 string\n    preprocessString(att, blobType, callback);\n  } else { // input is a blob\n    preprocessBlob(att, blobType, callback);\n  }\n}\n\nfunction preprocessAttachments(docInfos, blobType, callback) {\n\n  if (!docInfos.length) {\n    return callback();\n  }\n\n  var docv = 0;\n  var overallErr;\n\n  docInfos.forEach(function (docInfo) {\n    var attachments = docInfo.data && docInfo.data._attachments ?\n      Object.keys(docInfo.data._attachments) : [];\n    var recv = 0;\n\n    if (!attachments.length) {\n      return done();\n    }\n\n    function processedAttachment(err) {\n      overallErr = err;\n      recv++;\n      if (recv === attachments.length) {\n        done();\n      }\n    }\n\n    for (var key in docInfo.data._attachments) {\n      if (docInfo.data._attachments.hasOwnProperty(key)) {\n        preprocessAttachment(docInfo.data._attachments[key],\n          blobType, processedAttachment);\n      }\n    }\n  });\n\n  function done() {\n    docv++;\n    if (docInfos.length === docv) {\n      if (overallErr) {\n        callback(overallErr);\n      } else {\n        callback();\n      }\n    }\n  }\n}\n\nfunction updateDoc(revLimit, prev, docInfo, results,\n                   i, cb, writeDoc, newEdits) {\n\n  if (revExists(prev.rev_tree, docInfo.metadata.rev)) {\n    results[i] = docInfo;\n    return cb();\n  }\n\n  // sometimes this is pre-calculated. historically not always\n  var previousWinningRev = prev.winningRev || winningRev(prev);\n  var previouslyDeleted = \'deleted\' in prev ? prev.deleted :\n    isDeleted(prev, previousWinningRev);\n  var deleted = \'deleted\' in docInfo.metadata ? docInfo.metadata.deleted :\n    isDeleted(docInfo.metadata);\n  var isRoot = /^1-/.test(docInfo.metadata.rev);\n\n  if (previouslyDeleted && !deleted && newEdits && isRoot) {\n    var newDoc = docInfo.data;\n    newDoc._rev = previousWinningRev;\n    newDoc._id = docInfo.metadata.id;\n    docInfo = parseDoc(newDoc, newEdits);\n  }\n\n  var merged = merge(prev.rev_tree, docInfo.metadata.rev_tree[0], revLimit);\n\n  var inConflict = newEdits && (((previouslyDeleted && deleted) ||\n    (!previouslyDeleted && merged.conflicts !== \'new_leaf\') ||\n    (previouslyDeleted && !deleted && merged.conflicts === \'new_branch\')));\n\n  if (inConflict) {\n    var err = createError(REV_CONFLICT);\n    results[i] = err;\n    return cb();\n  }\n\n  var newRev = docInfo.metadata.rev;\n  docInfo.metadata.rev_tree = merged.tree;\n  docInfo.stemmedRevs = merged.stemmedRevs || [];\n  /* istanbul ignore else */\n  if (prev.rev_map) {\n    docInfo.metadata.rev_map = prev.rev_map; // used only by leveldb\n  }\n\n  // recalculate\n  var winningRev$$ = winningRev(docInfo.metadata);\n  var winningRevIsDeleted = isDeleted(docInfo.metadata, winningRev$$);\n\n  // calculate the total number of documents that were added/removed,\n  // from the perspective of total_rows/doc_count\n  var delta = (previouslyDeleted === winningRevIsDeleted) ? 0 :\n    previouslyDeleted < winningRevIsDeleted ? -1 : 1;\n\n  var newRevIsDeleted;\n  if (newRev === winningRev$$) {\n    // if the new rev is the same as the winning rev, we can reuse that value\n    newRevIsDeleted = winningRevIsDeleted;\n  } else {\n    // if they\'re not the same, then we need to recalculate\n    newRevIsDeleted = isDeleted(docInfo.metadata, newRev);\n  }\n\n  writeDoc(docInfo, winningRev$$, winningRevIsDeleted, newRevIsDeleted,\n    true, delta, i, cb);\n}\n\nfunction rootIsMissing(docInfo) {\n  return docInfo.metadata.rev_tree[0].ids[1].status === \'missing\';\n}\n\nfunction processDocs(revLimit, docInfos, api, fetchedDocs, tx, results,\n                     writeDoc, opts, overallCallback) {\n\n  // Default to 1000 locally\n  revLimit = revLimit || 1000;\n\n  function insertDoc(docInfo, resultsIdx, callback) {\n    // Cant insert new deleted documents\n    var winningRev$$ = winningRev(docInfo.metadata);\n    var deleted = isDeleted(docInfo.metadata, winningRev$$);\n    if (\'was_delete\' in opts && deleted) {\n      results[resultsIdx] = createError(MISSING_DOC, \'deleted\');\n      return callback();\n    }\n\n    // 4712 - detect whether a new document was inserted with a _rev\n    var inConflict = newEdits && rootIsMissing(docInfo);\n\n    if (inConflict) {\n      var err = createError(REV_CONFLICT);\n      results[resultsIdx] = err;\n      return callback();\n    }\n\n    var delta = deleted ? 0 : 1;\n\n    writeDoc(docInfo, winningRev$$, deleted, deleted, false,\n      delta, resultsIdx, callback);\n  }\n\n  var newEdits = opts.new_edits;\n  var idsToDocs = new pouchdbCollections.Map();\n\n  var docsDone = 0;\n  var docsToDo = docInfos.length;\n\n  function checkAllDocsDone() {\n    if (++docsDone === docsToDo && overallCallback) {\n      overallCallback();\n    }\n  }\n\n  docInfos.forEach(function (currentDoc, resultsIdx) {\n\n    if (currentDoc._id && isLocalId(currentDoc._id)) {\n      var fun = currentDoc._deleted ? \'_removeLocal\' : \'_putLocal\';\n      api[fun](currentDoc, {ctx: tx}, function (err, res) {\n        results[resultsIdx] = err || res;\n        checkAllDocsDone();\n      });\n      return;\n    }\n\n    var id = currentDoc.metadata.id;\n    if (idsToDocs.has(id)) {\n      docsToDo--; // duplicate\n      idsToDocs.get(id).push([currentDoc, resultsIdx]);\n    } else {\n      idsToDocs.set(id, [[currentDoc, resultsIdx]]);\n    }\n  });\n\n  // in the case of new_edits, the user can provide multiple docs\n  // with the same id. these need to be processed sequentially\n  idsToDocs.forEach(function (docs, id) {\n    var numDone = 0;\n\n    function docWritten() {\n      if (++numDone < docs.length) {\n        nextDoc();\n      } else {\n        checkAllDocsDone();\n      }\n    }\n    function nextDoc() {\n      var value = docs[numDone];\n      var currentDoc = value[0];\n      var resultsIdx = value[1];\n\n      if (fetchedDocs.has(id)) {\n        updateDoc(revLimit, fetchedDocs.get(id), currentDoc, results,\n          resultsIdx, docWritten, writeDoc, newEdits);\n      } else {\n        // Ensure stemming applies to new writes as well\n        var merged = merge([], currentDoc.metadata.rev_tree[0], revLimit);\n        currentDoc.metadata.rev_tree = merged.tree;\n        currentDoc.stemmedRevs = merged.stemmedRevs || [];\n        insertDoc(currentDoc, resultsIdx, docWritten);\n      }\n    }\n    nextDoc();\n  });\n}\n\n// IndexedDB requires a versioned database structure, so we use the\n// version here to manage migrations.\nvar ADAPTER_VERSION = 5;\n\n// The object stores created for each database\n// DOC_STORE stores the document meta data, its revision history and state\n// Keyed by document id\nvar DOC_STORE = \'document-store\';\n// BY_SEQ_STORE stores a particular version of a document, keyed by its\n// sequence id\nvar BY_SEQ_STORE = \'by-sequence\';\n// Where we store attachments\nvar ATTACH_STORE = \'attach-store\';\n// Where we store many-to-many relations\n// between attachment digests and seqs\nvar ATTACH_AND_SEQ_STORE = \'attach-seq-store\';\n\n// Where we store database-wide meta data in a single record\n// keyed by id: META_STORE\nvar META_STORE = \'meta-store\';\n// Where we store local documents\nvar LOCAL_STORE = \'local-store\';\n// Where we detect blob support\nvar DETECT_BLOB_SUPPORT_STORE = \'detect-blob-support\';\n\nfunction slowJsonParse(str) {\n  try {\n    return JSON.parse(str);\n  } catch (e) {\n    /* istanbul ignore next */\n    return vuvuzela.parse(str);\n  }\n}\n\nfunction safeJsonParse(str) {\n  // try/catch is deoptimized in V8, leading to slower\n  // times than we\'d like to have. Most documents are _not_\n  // huge, and do not require a slower code path just to parse them.\n  // We can be pretty sure that a document under 50000 characters\n  // will not be so deeply nested as to throw a stack overflow error\n  // (depends on the engine and available memory, though, so this is\n  // just a hunch). 50000 was chosen based on the average length\n  // of this string in our test suite, to try to find a number that covers\n  // most of our test cases (26 over this size, 26378 under it).\n  if (str.length < 50000) {\n    return JSON.parse(str);\n  }\n  return slowJsonParse(str);\n}\n\nfunction safeJsonStringify(json) {\n  try {\n    return JSON.stringify(json);\n  } catch (e) {\n    /* istanbul ignore next */\n    return vuvuzela.stringify(json);\n  }\n}\n\nfunction tryCode(fun, that, args, PouchDB) {\n  try {\n    fun.apply(that, args);\n  } catch (err) {\n    // Shouldn\'t happen, but in some odd cases\n    // IndexedDB implementations might throw a sync\n    // error, in which case this will at least log it.\n    PouchDB.emit(\'error\', err);\n  }\n}\n\nvar taskQueue = {\n  running: false,\n  queue: []\n};\n\nfunction applyNext(PouchDB) {\n  if (taskQueue.running || !taskQueue.queue.length) {\n    return;\n  }\n  taskQueue.running = true;\n  var item = taskQueue.queue.shift();\n  item.action(function (err, res) {\n    tryCode(item.callback, this, [err, res], PouchDB);\n    taskQueue.running = false;\n    process.nextTick(function () {\n      applyNext(PouchDB);\n    });\n  });\n}\n\nfunction idbError(callback) {\n  return function (evt) {\n    var message = \'unknown_error\';\n    if (evt.target && evt.target.error) {\n      message = evt.target.error.name || evt.target.error.message;\n    }\n    callback(createError(IDB_ERROR, message, evt.type));\n  };\n}\n\n// Unfortunately, the metadata has to be stringified\n// when it is put into the database, because otherwise\n// IndexedDB can throw errors for deeply-nested objects.\n// Originally we just used JSON.parse/JSON.stringify; now\n// we use this custom vuvuzela library that avoids recursion.\n// If we could do it all over again, we\'d probably use a\n// format for the revision trees other than JSON.\nfunction encodeMetadata(metadata, winningRev, deleted) {\n  return {\n    data: safeJsonStringify(metadata),\n    winningRev: winningRev,\n    deletedOrLocal: deleted ? \'1\' : \'0\',\n    seq: metadata.seq, // highest seq for this doc\n    id: metadata.id\n  };\n}\n\nfunction decodeMetadata(storedObject) {\n  if (!storedObject) {\n    return null;\n  }\n  var metadata = safeJsonParse(storedObject.data);\n  metadata.winningRev = storedObject.winningRev;\n  metadata.deleted = storedObject.deletedOrLocal === \'1\';\n  metadata.seq = storedObject.seq;\n  return metadata;\n}\n\n// read the doc back out from the database. we don\'t store the\n// _id or _rev because we already have _doc_id_rev.\nfunction decodeDoc(doc) {\n  if (!doc) {\n    return doc;\n  }\n  var idx = doc._doc_id_rev.lastIndexOf(\':\');\n  doc._id = doc._doc_id_rev.substring(0, idx - 1);\n  doc._rev = doc._doc_id_rev.substring(idx + 1);\n  delete doc._doc_id_rev;\n  return doc;\n}\n\n// Read a blob from the database, encoding as necessary\n// and translating from base64 if the IDB doesn\'t support\n// native Blobs\nfunction readBlobData(body, type, asBlob, callback) {\n  if (asBlob) {\n    if (!body) {\n      callback(createBlob([\'\'], {type: type}));\n    } else if (typeof body !== \'string\') { // we have blob support\n      callback(body);\n    } else { // no blob support\n      callback(b64ToBluffer(body, type));\n    }\n  } else { // as base64 string\n    if (!body) {\n      callback(\'\');\n    } else if (typeof body !== \'string\') { // we have blob support\n      readAsBinaryString(body, function (binary) {\n        callback(btoa$1(binary));\n      });\n    } else { // no blob support\n      callback(body);\n    }\n  }\n}\n\nfunction fetchAttachmentsIfNecessary(doc, opts, txn, cb) {\n  var attachments = Object.keys(doc._attachments || {});\n  if (!attachments.length) {\n    return cb && cb();\n  }\n  var numDone = 0;\n\n  function checkDone() {\n    if (++numDone === attachments.length && cb) {\n      cb();\n    }\n  }\n\n  function fetchAttachment(doc, att) {\n    var attObj = doc._attachments[att];\n    var digest = attObj.digest;\n    var req = txn.objectStore(ATTACH_STORE).get(digest);\n    req.onsuccess = function (e) {\n      attObj.body = e.target.result.body;\n      checkDone();\n    };\n  }\n\n  attachments.forEach(function (att) {\n    if (opts.attachments && opts.include_docs) {\n      fetchAttachment(doc, att);\n    } else {\n      doc._attachments[att].stub = true;\n      checkDone();\n    }\n  });\n}\n\n// IDB-specific postprocessing necessary because\n// we don\'t know whether we stored a true Blob or\n// a base64-encoded string, and if it\'s a Blob it\n// needs to be read outside of the transaction context\nfunction postProcessAttachments(results, asBlob) {\n  return PouchPromise.all(results.map(function (row) {\n    if (row.doc && row.doc._attachments) {\n      var attNames = Object.keys(row.doc._attachments);\n      return PouchPromise.all(attNames.map(function (att) {\n        var attObj = row.doc._attachments[att];\n        if (!(\'body\' in attObj)) { // already processed\n          return;\n        }\n        var body = attObj.body;\n        var type = attObj.content_type;\n        return new PouchPromise(function (resolve) {\n          readBlobData(body, type, asBlob, function (data) {\n            row.doc._attachments[att] = jsExtend.extend(\n              pick(attObj, [\'digest\', \'content_type\']),\n              {data: data}\n            );\n            resolve();\n          });\n        });\n      }));\n    }\n  }));\n}\n\nfunction compactRevs(revs, docId, txn) {\n\n  var possiblyOrphanedDigests = [];\n  var seqStore = txn.objectStore(BY_SEQ_STORE);\n  var attStore = txn.objectStore(ATTACH_STORE);\n  var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);\n  var count = revs.length;\n\n  function checkDone() {\n    count--;\n    if (!count) { // done processing all revs\n      deleteOrphanedAttachments();\n    }\n  }\n\n  function deleteOrphanedAttachments() {\n    if (!possiblyOrphanedDigests.length) {\n      return;\n    }\n    possiblyOrphanedDigests.forEach(function (digest) {\n      var countReq = attAndSeqStore.index(\'digestSeq\').count(\n        IDBKeyRange.bound(\n          digest + \'::\', digest + \'::\\uffff\', false, false));\n      countReq.onsuccess = function (e) {\n        var count = e.target.result;\n        if (!count) {\n          // orphaned\n          attStore["delete"](digest);\n        }\n      };\n    });\n  }\n\n  revs.forEach(function (rev) {\n    var index = seqStore.index(\'_doc_id_rev\');\n    var key = docId + "::" + rev;\n    index.getKey(key).onsuccess = function (e) {\n      var seq = e.target.result;\n      if (typeof seq !== \'number\') {\n        return checkDone();\n      }\n      seqStore["delete"](seq);\n\n      var cursor = attAndSeqStore.index(\'seq\')\n        .openCursor(IDBKeyRange.only(seq));\n\n      cursor.onsuccess = function (event) {\n        var cursor = event.target.result;\n        if (cursor) {\n          var digest = cursor.value.digestSeq.split(\'::\')[0];\n          possiblyOrphanedDigests.push(digest);\n          attAndSeqStore["delete"](cursor.primaryKey);\n          cursor["continue"]();\n        } else { // done\n          checkDone();\n        }\n      };\n    };\n  });\n}\n\nfunction openTransactionSafely(idb, stores, mode) {\n  try {\n    return {\n      txn: idb.transaction(stores, mode)\n    };\n  } catch (err) {\n    return {\n      error: err\n    };\n  }\n}\n\nfunction idbBulkDocs(dbOpts, req, opts, api, idb, idbChanges, callback) {\n  var docInfos = req.docs;\n  var txn;\n  var docStore;\n  var bySeqStore;\n  var attachStore;\n  var attachAndSeqStore;\n  var docInfoError;\n  var docCountDelta = 0;\n\n  for (var i = 0, len = docInfos.length; i < len; i++) {\n    var doc = docInfos[i];\n    if (doc._id && isLocalId(doc._id)) {\n      continue;\n    }\n    doc = docInfos[i] = parseDoc(doc, opts.new_edits);\n    if (doc.error && !docInfoError) {\n      docInfoError = doc;\n    }\n  }\n\n  if (docInfoError) {\n    return callback(docInfoError);\n  }\n\n  var results = new Array(docInfos.length);\n  var fetchedDocs = new pouchdbCollections.Map();\n  var preconditionErrored = false;\n  var blobType = api._meta.blobSupport ? \'blob\' : \'base64\';\n\n  preprocessAttachments(docInfos, blobType, function (err) {\n    if (err) {\n      return callback(err);\n    }\n    startTransaction();\n  });\n\n  function startTransaction() {\n\n    var stores = [\n      DOC_STORE, BY_SEQ_STORE,\n      ATTACH_STORE,\n      LOCAL_STORE, ATTACH_AND_SEQ_STORE\n    ];\n    var txnResult = openTransactionSafely(idb, stores, \'readwrite\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    txn = txnResult.txn;\n    txn.onabort = idbError(callback);\n    txn.ontimeout = idbError(callback);\n    txn.oncomplete = complete;\n    docStore = txn.objectStore(DOC_STORE);\n    bySeqStore = txn.objectStore(BY_SEQ_STORE);\n    attachStore = txn.objectStore(ATTACH_STORE);\n    attachAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);\n\n    verifyAttachments(function (err) {\n      if (err) {\n        preconditionErrored = true;\n        return callback(err);\n      }\n      fetchExistingDocs();\n    });\n  }\n\n  function idbProcessDocs() {\n    processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs,\n                txn, results, writeDoc, opts);\n  }\n\n  function fetchExistingDocs() {\n\n    if (!docInfos.length) {\n      return;\n    }\n\n    var numFetched = 0;\n\n    function checkDone() {\n      if (++numFetched === docInfos.length) {\n        idbProcessDocs();\n      }\n    }\n\n    function readMetadata(event) {\n      var metadata = decodeMetadata(event.target.result);\n\n      if (metadata) {\n        fetchedDocs.set(metadata.id, metadata);\n      }\n      checkDone();\n    }\n\n    for (var i = 0, len = docInfos.length; i < len; i++) {\n      var docInfo = docInfos[i];\n      if (docInfo._id && isLocalId(docInfo._id)) {\n        checkDone(); // skip local docs\n        continue;\n      }\n      var req = docStore.get(docInfo.metadata.id);\n      req.onsuccess = readMetadata;\n    }\n  }\n\n  function complete() {\n    if (preconditionErrored) {\n      return;\n    }\n\n    idbChanges.notify(api._meta.name);\n    api._meta.docCount += docCountDelta;\n    callback(null, results);\n  }\n\n  function verifyAttachment(digest, callback) {\n\n    var req = attachStore.get(digest);\n    req.onsuccess = function (e) {\n      if (!e.target.result) {\n        var err = createError(MISSING_STUB,\n          \'unknown stub attachment with digest \' +\n          digest);\n        err.status = 412;\n        callback(err);\n      } else {\n        callback();\n      }\n    };\n  }\n\n  function verifyAttachments(finish) {\n\n\n    var digests = [];\n    docInfos.forEach(function (docInfo) {\n      if (docInfo.data && docInfo.data._attachments) {\n        Object.keys(docInfo.data._attachments).forEach(function (filename) {\n          var att = docInfo.data._attachments[filename];\n          if (att.stub) {\n            digests.push(att.digest);\n          }\n        });\n      }\n    });\n    if (!digests.length) {\n      return finish();\n    }\n    var numDone = 0;\n    var err;\n\n    function checkDone() {\n      if (++numDone === digests.length) {\n        finish(err);\n      }\n    }\n    digests.forEach(function (digest) {\n      verifyAttachment(digest, function (attErr) {\n        if (attErr && !err) {\n          err = attErr;\n        }\n        checkDone();\n      });\n    });\n  }\n\n  function writeDoc(docInfo, winningRev, winningRevIsDeleted, newRevIsDeleted,\n                    isUpdate, delta, resultsIdx, callback) {\n\n    docCountDelta += delta;\n\n    docInfo.metadata.winningRev = winningRev;\n    docInfo.metadata.deleted = winningRevIsDeleted;\n\n    var doc = docInfo.data;\n    doc._id = docInfo.metadata.id;\n    doc._rev = docInfo.metadata.rev;\n\n    if (newRevIsDeleted) {\n      doc._deleted = true;\n    }\n\n    var hasAttachments = doc._attachments &&\n      Object.keys(doc._attachments).length;\n    if (hasAttachments) {\n      return writeAttachments(docInfo, winningRev, winningRevIsDeleted,\n        isUpdate, resultsIdx, callback);\n    }\n\n    finishDoc(docInfo, winningRev, winningRevIsDeleted,\n      isUpdate, resultsIdx, callback);\n  }\n\n  function finishDoc(docInfo, winningRev, winningRevIsDeleted,\n                     isUpdate, resultsIdx, callback) {\n\n    var doc = docInfo.data;\n    var metadata = docInfo.metadata;\n\n    doc._doc_id_rev = metadata.id + \'::\' + metadata.rev;\n    delete doc._id;\n    delete doc._rev;\n\n    function afterPutDoc(e) {\n      var revsToDelete = docInfo.stemmedRevs || [];\n\n      if (isUpdate && api.auto_compaction) {\n        revsToDelete = revsToDelete.concat(compactTree(docInfo.metadata));\n      }\n\n      if (revsToDelete && revsToDelete.length) {\n        compactRevs(revsToDelete, docInfo.metadata.id, txn);\n      }\n\n      metadata.seq = e.target.result;\n      // Current _rev is calculated from _rev_tree on read\n      delete metadata.rev;\n      var metadataToStore = encodeMetadata(metadata, winningRev,\n        winningRevIsDeleted);\n      var metaDataReq = docStore.put(metadataToStore);\n      metaDataReq.onsuccess = afterPutMetadata;\n    }\n\n    function afterPutDocError(e) {\n      // ConstraintError, need to update, not put (see #1638 for details)\n      e.preventDefault(); // avoid transaction abort\n      e.stopPropagation(); // avoid transaction onerror\n      var index = bySeqStore.index(\'_doc_id_rev\');\n      var getKeyReq = index.getKey(doc._doc_id_rev);\n      getKeyReq.onsuccess = function (e) {\n        var putReq = bySeqStore.put(doc, e.target.result);\n        putReq.onsuccess = afterPutDoc;\n      };\n    }\n\n    function afterPutMetadata() {\n      results[resultsIdx] = {\n        ok: true,\n        id: metadata.id,\n        rev: winningRev\n      };\n      fetchedDocs.set(docInfo.metadata.id, docInfo.metadata);\n      insertAttachmentMappings(docInfo, metadata.seq, callback);\n    }\n\n    var putReq = bySeqStore.put(doc);\n\n    putReq.onsuccess = afterPutDoc;\n    putReq.onerror = afterPutDocError;\n  }\n\n  function writeAttachments(docInfo, winningRev, winningRevIsDeleted,\n                            isUpdate, resultsIdx, callback) {\n\n\n    var doc = docInfo.data;\n\n    var numDone = 0;\n    var attachments = Object.keys(doc._attachments);\n\n    function collectResults() {\n      if (numDone === attachments.length) {\n        finishDoc(docInfo, winningRev, winningRevIsDeleted,\n          isUpdate, resultsIdx, callback);\n      }\n    }\n\n    function attachmentSaved() {\n      numDone++;\n      collectResults();\n    }\n\n    attachments.forEach(function (key) {\n      var att = docInfo.data._attachments[key];\n      if (!att.stub) {\n        var data = att.data;\n        delete att.data;\n        att.revpos = parseInt(winningRev, 10);\n        var digest = att.digest;\n        saveAttachment(digest, data, attachmentSaved);\n      } else {\n        numDone++;\n        collectResults();\n      }\n    });\n  }\n\n  // map seqs to attachment digests, which\n  // we will need later during compaction\n  function insertAttachmentMappings(docInfo, seq, callback) {\n\n    var attsAdded = 0;\n    var attsToAdd = Object.keys(docInfo.data._attachments || {});\n\n    if (!attsToAdd.length) {\n      return callback();\n    }\n\n    function checkDone() {\n      if (++attsAdded === attsToAdd.length) {\n        callback();\n      }\n    }\n\n    function add(att) {\n      var digest = docInfo.data._attachments[att].digest;\n      var req = attachAndSeqStore.put({\n        seq: seq,\n        digestSeq: digest + \'::\' + seq\n      });\n\n      req.onsuccess = checkDone;\n      req.onerror = function (e) {\n        // this callback is for a constaint error, which we ignore\n        // because this docid/rev has already been associated with\n        // the digest (e.g. when new_edits == false)\n        e.preventDefault(); // avoid transaction abort\n        e.stopPropagation(); // avoid transaction onerror\n        checkDone();\n      };\n    }\n    for (var i = 0; i < attsToAdd.length; i++) {\n      add(attsToAdd[i]); // do in parallel\n    }\n  }\n\n  function saveAttachment(digest, data, callback) {\n\n\n    var getKeyReq = attachStore.count(digest);\n    getKeyReq.onsuccess = function (e) {\n      var count = e.target.result;\n      if (count) {\n        return callback(); // already exists\n      }\n      var newAtt = {\n        digest: digest,\n        body: data\n      };\n      var putReq = attachStore.put(newAtt);\n      putReq.onsuccess = callback;\n    };\n  }\n}\n\nfunction createKeyRange(start, end, inclusiveEnd, key, descending) {\n  try {\n    if (start && end) {\n      if (descending) {\n        return IDBKeyRange.bound(end, start, !inclusiveEnd, false);\n      } else {\n        return IDBKeyRange.bound(start, end, false, !inclusiveEnd);\n      }\n    } else if (start) {\n      if (descending) {\n        return IDBKeyRange.upperBound(start);\n      } else {\n        return IDBKeyRange.lowerBound(start);\n      }\n    } else if (end) {\n      if (descending) {\n        return IDBKeyRange.lowerBound(end, !inclusiveEnd);\n      } else {\n        return IDBKeyRange.upperBound(end, !inclusiveEnd);\n      }\n    } else if (key) {\n      return IDBKeyRange.only(key);\n    }\n  } catch (e) {\n    return {error: e};\n  }\n  return null;\n}\n\nfunction handleKeyRangeError(api, opts, err, callback) {\n  if (err.name === "DataError" && err.code === 0) {\n    // data error, start is less than end\n    return callback(null, {\n      total_rows: api._meta.docCount,\n      offset: opts.skip,\n      rows: []\n    });\n  }\n  callback(createError(IDB_ERROR, err.name, err.message));\n}\n\nfunction idbAllDocs(opts, api, idb, callback) {\n\n  function allDocsQuery(opts, callback) {\n    var start = \'startkey\' in opts ? opts.startkey : false;\n    var end = \'endkey\' in opts ? opts.endkey : false;\n    var key = \'key\' in opts ? opts.key : false;\n    var skip = opts.skip || 0;\n    var limit = typeof opts.limit === \'number\' ? opts.limit : -1;\n    var inclusiveEnd = opts.inclusive_end !== false;\n    var descending = \'descending\' in opts && opts.descending ? \'prev\' : null;\n\n    var keyRange = createKeyRange(start, end, inclusiveEnd, key, descending);\n    if (keyRange && keyRange.error) {\n      return handleKeyRangeError(api, opts, keyRange.error, callback);\n    }\n\n    var stores = [DOC_STORE, BY_SEQ_STORE];\n\n    if (opts.attachments) {\n      stores.push(ATTACH_STORE);\n    }\n    var txnResult = openTransactionSafely(idb, stores, \'readonly\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    var txn = txnResult.txn;\n    var docStore = txn.objectStore(DOC_STORE);\n    var seqStore = txn.objectStore(BY_SEQ_STORE);\n    var cursor = descending ?\n      docStore.openCursor(keyRange, descending) :\n      docStore.openCursor(keyRange);\n    var docIdRevIndex = seqStore.index(\'_doc_id_rev\');\n    var results = [];\n    var docCount = 0;\n\n    // if the user specifies include_docs=true, then we don\'t\n    // want to block the main cursor while we\'re fetching the doc\n    function fetchDocAsynchronously(metadata, row, winningRev) {\n      var key = metadata.id + "::" + winningRev;\n      docIdRevIndex.get(key).onsuccess =  function onGetDoc(e) {\n        row.doc = decodeDoc(e.target.result);\n        if (opts.conflicts) {\n          row.doc._conflicts = collectConflicts(metadata);\n        }\n        fetchAttachmentsIfNecessary(row.doc, opts, txn);\n      };\n    }\n\n    function allDocsInner(cursor, winningRev, metadata) {\n      var row = {\n        id: metadata.id,\n        key: metadata.id,\n        value: {\n          rev: winningRev\n        }\n      };\n      var deleted = metadata.deleted;\n      if (opts.deleted === \'ok\') {\n        results.push(row);\n        // deleted docs are okay with "keys" requests\n        if (deleted) {\n          row.value.deleted = true;\n          row.doc = null;\n        } else if (opts.include_docs) {\n          fetchDocAsynchronously(metadata, row, winningRev);\n        }\n      } else if (!deleted && skip-- <= 0) {\n        results.push(row);\n        if (opts.include_docs) {\n          fetchDocAsynchronously(metadata, row, winningRev);\n        }\n        if (--limit === 0) {\n          return;\n        }\n      }\n      cursor["continue"]();\n    }\n\n    function onGetCursor(e) {\n      docCount = api._meta.docCount; // do this within the txn for consistency\n      var cursor = e.target.result;\n      if (!cursor) {\n        return;\n      }\n      var metadata = decodeMetadata(cursor.value);\n      var winningRev = metadata.winningRev;\n\n      allDocsInner(cursor, winningRev, metadata);\n    }\n\n    function onResultsReady() {\n      callback(null, {\n        total_rows: docCount,\n        offset: opts.skip,\n        rows: results\n      });\n    }\n\n    function onTxnComplete() {\n      if (opts.attachments) {\n        postProcessAttachments(results, opts.binary).then(onResultsReady);\n      } else {\n        onResultsReady();\n      }\n    }\n\n    txn.oncomplete = onTxnComplete;\n    cursor.onsuccess = onGetCursor;\n  }\n\n  function allDocs(opts, callback) {\n\n    if (opts.limit === 0) {\n      return callback(null, {\n        total_rows: api._meta.docCount,\n        offset: opts.skip,\n        rows: []\n      });\n    }\n    allDocsQuery(opts, callback);\n  }\n\n  allDocs(opts, callback);\n}\n\n//\n// Blobs are not supported in all versions of IndexedDB, notably\n// Chrome <37 and Android <5. In those versions, storing a blob will throw.\n//\n// Various other blob bugs exist in Chrome v37-42 (inclusive).\n// Detecting them is expensive and confusing to users, and Chrome 37-42\n// is at very low usage worldwide, so we do a hacky userAgent check instead.\n//\n// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120\n// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916\n// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836\n//\nfunction checkBlobSupport(txn) {\n  return new PouchPromise(function (resolve) {\n    var blob = createBlob([\'\']);\n    txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, \'key\');\n\n    txn.onabort = function (e) {\n      // If the transaction aborts now its due to not being able to\n      // write to the database, likely due to the disk being full\n      e.preventDefault();\n      e.stopPropagation();\n      resolve(false);\n    };\n\n    txn.oncomplete = function () {\n      var matchedChrome = navigator.userAgent.match(/Chrome\\/(\\d+)/);\n      var matchedEdge = navigator.userAgent.match(/Edge\\//);\n      // MS Edge pretends to be Chrome 42:\n      // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx\n      resolve(matchedEdge || !matchedChrome ||\n        parseInt(matchedChrome[1], 10) >= 43);\n    };\n  })["catch"](function () {\n    return false; // error, so assume unsupported\n  });\n}\n\nvar cachedDBs = new pouchdbCollections.Map();\nvar blobSupportPromise;\nvar idbChanges = new Changes$1();\nvar openReqList = new pouchdbCollections.Map();\n\nfunction IdbPouch(opts, callback) {\n  var api = this;\n\n  taskQueue.queue.push({\n    action: function (thisCallback) {\n      init(api, opts, thisCallback);\n    },\n    callback: callback\n  });\n  applyNext(api.constructor);\n}\n\nfunction init(api, opts, callback) {\n\n  var dbName = opts.name;\n\n  var idb = null;\n  api._meta = null;\n\n  // called when creating a fresh new database\n  function createSchema(db) {\n    var docStore = db.createObjectStore(DOC_STORE, {keyPath : \'id\'});\n    db.createObjectStore(BY_SEQ_STORE, {autoIncrement: true})\n      .createIndex(\'_doc_id_rev\', \'_doc_id_rev\', {unique: true});\n    db.createObjectStore(ATTACH_STORE, {keyPath: \'digest\'});\n    db.createObjectStore(META_STORE, {keyPath: \'id\', autoIncrement: false});\n    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);\n\n    // added in v2\n    docStore.createIndex(\'deletedOrLocal\', \'deletedOrLocal\', {unique : false});\n\n    // added in v3\n    db.createObjectStore(LOCAL_STORE, {keyPath: \'_id\'});\n\n    // added in v4\n    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,\n      {autoIncrement: true});\n    attAndSeqStore.createIndex(\'seq\', \'seq\');\n    attAndSeqStore.createIndex(\'digestSeq\', \'digestSeq\', {unique: true});\n  }\n\n  // migration to version 2\n  // unfortunately "deletedOrLocal" is a misnomer now that we no longer\n  // store local docs in the main doc-store, but whaddyagonnado\n  function addDeletedOrLocalIndex(txn, callback) {\n    var docStore = txn.objectStore(DOC_STORE);\n    docStore.createIndex(\'deletedOrLocal\', \'deletedOrLocal\', {unique : false});\n\n    docStore.openCursor().onsuccess = function (event) {\n      var cursor = event.target.result;\n      if (cursor) {\n        var metadata = cursor.value;\n        var deleted = isDeleted(metadata);\n        metadata.deletedOrLocal = deleted ? "1" : "0";\n        docStore.put(metadata);\n        cursor["continue"]();\n      } else {\n        callback();\n      }\n    };\n  }\n\n  // migration to version 3 (part 1)\n  function createLocalStoreSchema(db) {\n    db.createObjectStore(LOCAL_STORE, {keyPath: \'_id\'})\n      .createIndex(\'_doc_id_rev\', \'_doc_id_rev\', {unique: true});\n  }\n\n  // migration to version 3 (part 2)\n  function migrateLocalStore(txn, cb) {\n    var localStore = txn.objectStore(LOCAL_STORE);\n    var docStore = txn.objectStore(DOC_STORE);\n    var seqStore = txn.objectStore(BY_SEQ_STORE);\n\n    var cursor = docStore.openCursor();\n    cursor.onsuccess = function (event) {\n      var cursor = event.target.result;\n      if (cursor) {\n        var metadata = cursor.value;\n        var docId = metadata.id;\n        var local = isLocalId(docId);\n        var rev = winningRev(metadata);\n        if (local) {\n          var docIdRev = docId + "::" + rev;\n          // remove all seq entries\n          // associated with this docId\n          var start = docId + "::";\n          var end = docId + "::~";\n          var index = seqStore.index(\'_doc_id_rev\');\n          var range = IDBKeyRange.bound(start, end, false, false);\n          var seqCursor = index.openCursor(range);\n          seqCursor.onsuccess = function (e) {\n            seqCursor = e.target.result;\n            if (!seqCursor) {\n              // done\n              docStore["delete"](cursor.primaryKey);\n              cursor["continue"]();\n            } else {\n              var data = seqCursor.value;\n              if (data._doc_id_rev === docIdRev) {\n                localStore.put(data);\n              }\n              seqStore["delete"](seqCursor.primaryKey);\n              seqCursor["continue"]();\n            }\n          };\n        } else {\n          cursor["continue"]();\n        }\n      } else if (cb) {\n        cb();\n      }\n    };\n  }\n\n  // migration to version 4 (part 1)\n  function addAttachAndSeqStore(db) {\n    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,\n      {autoIncrement: true});\n    attAndSeqStore.createIndex(\'seq\', \'seq\');\n    attAndSeqStore.createIndex(\'digestSeq\', \'digestSeq\', {unique: true});\n  }\n\n  // migration to version 4 (part 2)\n  function migrateAttsAndSeqs(txn, callback) {\n    var seqStore = txn.objectStore(BY_SEQ_STORE);\n    var attStore = txn.objectStore(ATTACH_STORE);\n    var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);\n\n    // need to actually populate the table. this is the expensive part,\n    // so as an optimization, check first that this database even\n    // contains attachments\n    var req = attStore.count();\n    req.onsuccess = function (e) {\n      var count = e.target.result;\n      if (!count) {\n        return callback(); // done\n      }\n\n      seqStore.openCursor().onsuccess = function (e) {\n        var cursor = e.target.result;\n        if (!cursor) {\n          return callback(); // done\n        }\n        var doc = cursor.value;\n        var seq = cursor.primaryKey;\n        var atts = Object.keys(doc._attachments || {});\n        var digestMap = {};\n        for (var j = 0; j < atts.length; j++) {\n          var att = doc._attachments[atts[j]];\n          digestMap[att.digest] = true; // uniq digests, just in case\n        }\n        var digests = Object.keys(digestMap);\n        for (j = 0; j < digests.length; j++) {\n          var digest = digests[j];\n          attAndSeqStore.put({\n            seq: seq,\n            digestSeq: digest + \'::\' + seq\n          });\n        }\n        cursor["continue"]();\n      };\n    };\n  }\n\n  // migration to version 5\n  // Instead of relying on on-the-fly migration of metadata,\n  // this brings the doc-store to its modern form:\n  // - metadata.winningrev\n  // - metadata.seq\n  // - stringify the metadata when storing it\n  function migrateMetadata(txn) {\n\n    function decodeMetadataCompat(storedObject) {\n      if (!storedObject.data) {\n        // old format, when we didn\'t store it stringified\n        storedObject.deleted = storedObject.deletedOrLocal === \'1\';\n        return storedObject;\n      }\n      return decodeMetadata(storedObject);\n    }\n\n    // ensure that every metadata has a winningRev and seq,\n    // which was previously created on-the-fly but better to migrate\n    var bySeqStore = txn.objectStore(BY_SEQ_STORE);\n    var docStore = txn.objectStore(DOC_STORE);\n    var cursor = docStore.openCursor();\n    cursor.onsuccess = function (e) {\n      var cursor = e.target.result;\n      if (!cursor) {\n        return; // done\n      }\n      var metadata = decodeMetadataCompat(cursor.value);\n\n      metadata.winningRev = metadata.winningRev ||\n        winningRev(metadata);\n\n      function fetchMetadataSeq() {\n        // metadata.seq was added post-3.2.0, so if it\'s missing,\n        // we need to fetch it manually\n        var start = metadata.id + \'::\';\n        var end = metadata.id + \'::\\uffff\';\n        var req = bySeqStore.index(\'_doc_id_rev\').openCursor(\n          IDBKeyRange.bound(start, end));\n\n        var metadataSeq = 0;\n        req.onsuccess = function (e) {\n          var cursor = e.target.result;\n          if (!cursor) {\n            metadata.seq = metadataSeq;\n            return onGetMetadataSeq();\n          }\n          var seq = cursor.primaryKey;\n          if (seq > metadataSeq) {\n            metadataSeq = seq;\n          }\n          cursor["continue"]();\n        };\n      }\n\n      function onGetMetadataSeq() {\n        var metadataToStore = encodeMetadata(metadata,\n          metadata.winningRev, metadata.deleted);\n\n        var req = docStore.put(metadataToStore);\n        req.onsuccess = function () {\n          cursor["continue"]();\n        };\n      }\n\n      if (metadata.seq) {\n        return onGetMetadataSeq();\n      }\n\n      fetchMetadataSeq();\n    };\n\n  }\n\n  api.type = function () {\n    return \'idb\';\n  };\n\n  api._id = toPromise(function (callback) {\n    callback(null, api._meta.instanceId);\n  });\n\n  api._bulkDocs = function idb_bulkDocs(req, reqOpts, callback) {\n    idbBulkDocs(opts, req, reqOpts, api, idb, idbChanges, callback);\n  };\n\n  // First we look up the metadata in the ids database, then we fetch the\n  // current revision(s) from the by sequence store\n  api._get = function idb_get(id, opts, callback) {\n    var doc;\n    var metadata;\n    var err;\n    var txn = opts.ctx;\n    if (!txn) {\n      var txnResult = openTransactionSafely(idb,\n        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], \'readonly\');\n      if (txnResult.error) {\n        return callback(txnResult.error);\n      }\n      txn = txnResult.txn;\n    }\n\n    function finish() {\n      callback(err, {doc: doc, metadata: metadata, ctx: txn});\n    }\n\n    txn.objectStore(DOC_STORE).get(id).onsuccess = function (e) {\n      metadata = decodeMetadata(e.target.result);\n      // we can determine the result here if:\n      // 1. there is no such document\n      // 2. the document is deleted and we don\'t ask about specific rev\n      // When we ask with opts.rev we expect the answer to be either\n      // doc (possibly with _deleted=true) or missing error\n      if (!metadata) {\n        err = createError(MISSING_DOC, \'missing\');\n        return finish();\n      }\n      if (isDeleted(metadata) && !opts.rev) {\n        err = createError(MISSING_DOC, "deleted");\n        return finish();\n      }\n      var objectStore = txn.objectStore(BY_SEQ_STORE);\n\n      var rev = opts.rev || metadata.winningRev;\n      var key = metadata.id + \'::\' + rev;\n\n      objectStore.index(\'_doc_id_rev\').get(key).onsuccess = function (e) {\n        doc = e.target.result;\n        if (doc) {\n          doc = decodeDoc(doc);\n        }\n        if (!doc) {\n          err = createError(MISSING_DOC, \'missing\');\n          return finish();\n        }\n        finish();\n      };\n    };\n  };\n\n  api._getAttachment = function (docId, attachId, attachment, opts, callback) {\n    var txn;\n    if (opts.ctx) {\n      txn = opts.ctx;\n    } else {\n      var txnResult = openTransactionSafely(idb,\n        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], \'readonly\');\n      if (txnResult.error) {\n        return callback(txnResult.error);\n      }\n      txn = txnResult.txn;\n    }\n    var digest = attachment.digest;\n    var type = attachment.content_type;\n\n    txn.objectStore(ATTACH_STORE).get(digest).onsuccess = function (e) {\n      var body = e.target.result.body;\n      readBlobData(body, type, opts.binary, function (blobData) {\n        callback(null, blobData);\n      });\n    };\n  };\n\n  api._info = function idb_info(callback) {\n\n    if (idb === null || !cachedDBs.has(dbName)) {\n      var error = new Error(\'db isn\\\'t open\');\n      error.id = \'idbNull\';\n      return callback(error);\n    }\n    var updateSeq;\n    var docCount;\n\n    var txnResult = openTransactionSafely(idb, [BY_SEQ_STORE], \'readonly\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    var txn = txnResult.txn;\n    var cursor = txn.objectStore(BY_SEQ_STORE).openCursor(null, \'prev\');\n    cursor.onsuccess = function (event) {\n      var cursor = event.target.result;\n      updateSeq = cursor ? cursor.key : 0;\n      // count within the same txn for consistency\n      docCount = api._meta.docCount;\n    };\n\n    txn.oncomplete = function () {\n      callback(null, {\n        doc_count: docCount,\n        update_seq: updateSeq,\n        // for debugging\n        idb_attachment_format: (api._meta.blobSupport ? \'binary\' : \'base64\')\n      });\n    };\n  };\n\n  api._allDocs = function idb_allDocs(opts, callback) {\n    idbAllDocs(opts, api, idb, callback);\n  };\n\n  api._changes = function (opts) {\n    opts = clone(opts);\n\n    if (opts.continuous) {\n      var id = dbName + \':\' + uuid();\n      idbChanges.addListener(dbName, id, api, opts);\n      idbChanges.notify(dbName);\n      return {\n        cancel: function () {\n          idbChanges.removeListener(dbName, id);\n        }\n      };\n    }\n\n    var docIds = opts.doc_ids && new pouchdbCollections.Set(opts.doc_ids);\n\n    opts.since = opts.since || 0;\n    var lastSeq = opts.since;\n\n    var limit = \'limit\' in opts ? opts.limit : -1;\n    if (limit === 0) {\n      limit = 1; // per CouchDB _changes spec\n    }\n    var returnDocs;\n    if (\'return_docs\' in opts) {\n      returnDocs = opts.return_docs;\n    } else if (\'returnDocs\' in opts) {\n      // TODO: Remove \'returnDocs\' in favor of \'return_docs\' in a future release\n      returnDocs = opts.returnDocs;\n    } else {\n      returnDocs = true;\n    }\n\n    var results = [];\n    var numResults = 0;\n    var filter = filterChange(opts);\n    var docIdsToMetadata = new pouchdbCollections.Map();\n\n    var txn;\n    var bySeqStore;\n    var docStore;\n    var docIdRevIndex;\n\n    function onGetCursor(cursor) {\n\n      var doc = decodeDoc(cursor.value);\n      var seq = cursor.key;\n\n      if (docIds && !docIds.has(doc._id)) {\n        return cursor["continue"]();\n      }\n\n      var metadata;\n\n      function onGetMetadata() {\n        if (metadata.seq !== seq) {\n          // some other seq is later\n          return cursor["continue"]();\n        }\n\n        lastSeq = seq;\n\n        if (metadata.winningRev === doc._rev) {\n          return onGetWinningDoc(doc);\n        }\n\n        fetchWinningDoc();\n      }\n\n      function fetchWinningDoc() {\n        var docIdRev = doc._id + \'::\' + metadata.winningRev;\n        var req = docIdRevIndex.get(docIdRev);\n        req.onsuccess = function (e) {\n          onGetWinningDoc(decodeDoc(e.target.result));\n        };\n      }\n\n      function onGetWinningDoc(winningDoc) {\n\n        var change = opts.processChange(winningDoc, metadata, opts);\n        change.seq = metadata.seq;\n\n        var filtered = filter(change);\n        if (typeof filtered === \'object\') {\n          return opts.complete(filtered);\n        }\n\n        if (filtered) {\n          numResults++;\n          if (returnDocs) {\n            results.push(change);\n          }\n          // process the attachment immediately\n          // for the benefit of live listeners\n          if (opts.attachments && opts.include_docs) {\n            fetchAttachmentsIfNecessary(winningDoc, opts, txn, function () {\n              postProcessAttachments([change], opts.binary).then(function () {\n                opts.onChange(change);\n              });\n            });\n          } else {\n            opts.onChange(change);\n          }\n        }\n        if (numResults !== limit) {\n          cursor["continue"]();\n        }\n      }\n\n      metadata = docIdsToMetadata.get(doc._id);\n      if (metadata) { // cached\n        return onGetMetadata();\n      }\n      // metadata not cached, have to go fetch it\n      docStore.get(doc._id).onsuccess = function (event) {\n        metadata = decodeMetadata(event.target.result);\n        docIdsToMetadata.set(doc._id, metadata);\n        onGetMetadata();\n      };\n    }\n\n    function onsuccess(event) {\n      var cursor = event.target.result;\n\n      if (!cursor) {\n        return;\n      }\n      onGetCursor(cursor);\n    }\n\n    function fetchChanges() {\n      var objectStores = [DOC_STORE, BY_SEQ_STORE];\n      if (opts.attachments) {\n        objectStores.push(ATTACH_STORE);\n      }\n      var txnResult = openTransactionSafely(idb, objectStores, \'readonly\');\n      if (txnResult.error) {\n        return opts.complete(txnResult.error);\n      }\n      txn = txnResult.txn;\n      txn.onabort = idbError(opts.complete);\n      txn.oncomplete = onTxnComplete;\n\n      bySeqStore = txn.objectStore(BY_SEQ_STORE);\n      docStore = txn.objectStore(DOC_STORE);\n      docIdRevIndex = bySeqStore.index(\'_doc_id_rev\');\n\n      var req;\n\n      if (opts.descending) {\n        req = bySeqStore.openCursor(null, \'prev\');\n      } else {\n        req = bySeqStore.openCursor(IDBKeyRange.lowerBound(opts.since, true));\n      }\n\n      req.onsuccess = onsuccess;\n    }\n\n    fetchChanges();\n\n    function onTxnComplete() {\n\n      function finish() {\n        opts.complete(null, {\n          results: results,\n          last_seq: lastSeq\n        });\n      }\n\n      if (!opts.continuous && opts.attachments) {\n        // cannot guarantee that postProcessing was already done,\n        // so do it again\n        postProcessAttachments(results).then(finish);\n      } else {\n        finish();\n      }\n    }\n  };\n\n  api._close = function (callback) {\n    if (idb === null) {\n      return callback(createError(NOT_OPEN));\n    }\n\n    // https://developer.mozilla.org/en-US/docs/IndexedDB/IDBDatabase#close\n    // "Returns immediately and closes the connection in a separate thread..."\n    idb.close();\n    cachedDBs["delete"](dbName);\n    idb = null;\n    callback();\n  };\n\n  api._getRevisionTree = function (docId, callback) {\n    var txnResult = openTransactionSafely(idb, [DOC_STORE], \'readonly\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    var txn = txnResult.txn;\n    var req = txn.objectStore(DOC_STORE).get(docId);\n    req.onsuccess = function (event) {\n      var doc = decodeMetadata(event.target.result);\n      if (!doc) {\n        callback(createError(MISSING_DOC));\n      } else {\n        callback(null, doc.rev_tree);\n      }\n    };\n  };\n\n  // This function removes revisions of document docId\n  // which are listed in revs and sets this document\n  // revision to to rev_tree\n  api._doCompaction = function (docId, revs, callback) {\n    var stores = [\n      DOC_STORE,\n      BY_SEQ_STORE,\n      ATTACH_STORE,\n      ATTACH_AND_SEQ_STORE\n    ];\n    var txnResult = openTransactionSafely(idb, stores, \'readwrite\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    var txn = txnResult.txn;\n\n    var docStore = txn.objectStore(DOC_STORE);\n\n    docStore.get(docId).onsuccess = function (event) {\n      var metadata = decodeMetadata(event.target.result);\n      traverseRevTree(metadata.rev_tree, function (isLeaf, pos,\n                                                         revHash, ctx, opts) {\n        var rev = pos + \'-\' + revHash;\n        if (revs.indexOf(rev) !== -1) {\n          opts.status = \'missing\';\n        }\n      });\n      compactRevs(revs, docId, txn);\n      var winningRev = metadata.winningRev;\n      var deleted = metadata.deleted;\n      txn.objectStore(DOC_STORE).put(\n        encodeMetadata(metadata, winningRev, deleted));\n    };\n    txn.onabort = idbError(callback);\n    txn.oncomplete = function () {\n      callback();\n    };\n  };\n\n\n  api._getLocal = function (id, callback) {\n    var txnResult = openTransactionSafely(idb, [LOCAL_STORE], \'readonly\');\n    if (txnResult.error) {\n      return callback(txnResult.error);\n    }\n    var tx = txnResult.txn;\n    var req = tx.objectStore(LOCAL_STORE).get(id);\n\n    req.onerror = idbError(callback);\n    req.onsuccess = function (e) {\n      var doc = e.target.result;\n      if (!doc) {\n        callback(createError(MISSING_DOC));\n      } else {\n        delete doc[\'_doc_id_rev\']; // for backwards compat\n        callback(null, doc);\n      }\n    };\n  };\n\n  api._putLocal = function (doc, opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    delete doc._revisions; // ignore this, trust the rev\n    var oldRev = doc._rev;\n    var id = doc._id;\n    if (!oldRev) {\n      doc._rev = \'0-1\';\n    } else {\n      doc._rev = \'0-\' + (parseInt(oldRev.split(\'-\')[1], 10) + 1);\n    }\n\n    var tx = opts.ctx;\n    var ret;\n    if (!tx) {\n      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], \'readwrite\');\n      if (txnResult.error) {\n        return callback(txnResult.error);\n      }\n      tx = txnResult.txn;\n      tx.onerror = idbError(callback);\n      tx.oncomplete = function () {\n        if (ret) {\n          callback(null, ret);\n        }\n      };\n    }\n\n    var oStore = tx.objectStore(LOCAL_STORE);\n    var req;\n    if (oldRev) {\n      req = oStore.get(id);\n      req.onsuccess = function (e) {\n        var oldDoc = e.target.result;\n        if (!oldDoc || oldDoc._rev !== oldRev) {\n          callback(createError(REV_CONFLICT));\n        } else { // update\n          var req = oStore.put(doc);\n          req.onsuccess = function () {\n            ret = {ok: true, id: doc._id, rev: doc._rev};\n            if (opts.ctx) { // return immediately\n              callback(null, ret);\n            }\n          };\n        }\n      };\n    } else { // new doc\n      req = oStore.add(doc);\n      req.onerror = function (e) {\n        // constraint error, already exists\n        callback(createError(REV_CONFLICT));\n        e.preventDefault(); // avoid transaction abort\n        e.stopPropagation(); // avoid transaction onerror\n      };\n      req.onsuccess = function () {\n        ret = {ok: true, id: doc._id, rev: doc._rev};\n        if (opts.ctx) { // return immediately\n          callback(null, ret);\n        }\n      };\n    }\n  };\n\n  api._removeLocal = function (doc, opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    var tx = opts.ctx;\n    if (!tx) {\n      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], \'readwrite\');\n      if (txnResult.error) {\n        return callback(txnResult.error);\n      }\n      tx = txnResult.txn;\n      tx.oncomplete = function () {\n        if (ret) {\n          callback(null, ret);\n        }\n      };\n    }\n    var ret;\n    var id = doc._id;\n    var oStore = tx.objectStore(LOCAL_STORE);\n    var req = oStore.get(id);\n\n    req.onerror = idbError(callback);\n    req.onsuccess = function (e) {\n      var oldDoc = e.target.result;\n      if (!oldDoc || oldDoc._rev !== doc._rev) {\n        callback(createError(MISSING_DOC));\n      } else {\n        oStore["delete"](id);\n        ret = {ok: true, id: id, rev: \'0-0\'};\n        if (opts.ctx) { // return immediately\n          callback(null, ret);\n        }\n      }\n    };\n  };\n\n  api._destroy = function (opts, callback) {\n    idbChanges.removeAllListeners(dbName);\n\n    //Close open request for "dbName" database to fix ie delay.\n    var openReq = openReqList.get(dbName);\n    if (openReq && openReq.result) {\n      openReq.result.close();\n      cachedDBs["delete"](dbName);\n    }\n    var req = indexedDB.deleteDatabase(dbName);\n\n    req.onsuccess = function () {\n      //Remove open request from the list.\n      openReqList["delete"](dbName);\n      if (hasLocalStorage() && (dbName in localStorage)) {\n        delete localStorage[dbName];\n      }\n      callback(null, { \'ok\': true });\n    };\n\n    req.onerror = idbError(callback);\n  };\n\n  var cached = cachedDBs.get(dbName);\n\n  if (cached) {\n    idb = cached.idb;\n    api._meta = cached.global;\n    process.nextTick(function () {\n      callback(null, api);\n    });\n    return;\n  }\n\n  var req;\n  if (opts.storage) {\n    req = tryStorageOption(dbName, opts.storage);\n  } else {\n    req = indexedDB.open(dbName, ADAPTER_VERSION);\n  }\n\n  openReqList.set(dbName, req);\n\n  req.onupgradeneeded = function (e) {\n    var db = e.target.result;\n    if (e.oldVersion < 1) {\n      return createSchema(db); // new db, initial schema\n    }\n    // do migrations\n\n    var txn = e.currentTarget.transaction;\n    // these migrations have to be done in this function, before\n    // control is returned to the event loop, because IndexedDB\n\n    if (e.oldVersion < 3) {\n      createLocalStoreSchema(db); // v2 -> v3\n    }\n    if (e.oldVersion < 4) {\n      addAttachAndSeqStore(db); // v3 -> v4\n    }\n\n    var migrations = [\n      addDeletedOrLocalIndex, // v1 -> v2\n      migrateLocalStore,      // v2 -> v3\n      migrateAttsAndSeqs,     // v3 -> v4\n      migrateMetadata         // v4 -> v5\n    ];\n\n    var i = e.oldVersion;\n\n    function next() {\n      var migration = migrations[i - 1];\n      i++;\n      if (migration) {\n        migration(txn, next);\n      }\n    }\n\n    next();\n  };\n\n  req.onsuccess = function (e) {\n\n    idb = e.target.result;\n\n    idb.onversionchange = function () {\n      idb.close();\n      cachedDBs["delete"](dbName);\n    };\n\n    idb.onabort = function (e) {\n      guardedConsole(\'error\', \'Database has a global failure\', e.target.error);\n      idb.close();\n      cachedDBs["delete"](dbName);\n    };\n\n    var txn = idb.transaction([\n      META_STORE,\n      DETECT_BLOB_SUPPORT_STORE,\n      DOC_STORE\n    ], \'readwrite\');\n\n    var req = txn.objectStore(META_STORE).get(META_STORE);\n\n    var blobSupport = null;\n    var docCount = null;\n    var instanceId = null;\n\n    req.onsuccess = function (e) {\n\n      var checkSetupComplete = function () {\n        if (blobSupport === null || docCount === null ||\n            instanceId === null) {\n          return;\n        } else {\n          api._meta = {\n            name: dbName,\n            instanceId: instanceId,\n            blobSupport: blobSupport,\n            docCount: docCount\n          };\n\n          cachedDBs.set(dbName, {\n            idb: idb,\n            global: api._meta\n          });\n          callback(null, api);\n        }\n      };\n\n      //\n      // fetch/store the id\n      //\n\n      var meta = e.target.result || {id: META_STORE};\n      if (dbName  + \'_id\' in meta) {\n        instanceId = meta[dbName + \'_id\'];\n        checkSetupComplete();\n      } else {\n        instanceId = uuid();\n        meta[dbName + \'_id\'] = instanceId;\n        txn.objectStore(META_STORE).put(meta).onsuccess = function () {\n          checkSetupComplete();\n        };\n      }\n\n      //\n      // check blob support\n      //\n\n      if (!blobSupportPromise) {\n        // make sure blob support is only checked once\n        blobSupportPromise = checkBlobSupport(txn);\n      }\n\n      blobSupportPromise.then(function (val) {\n        blobSupport = val;\n        checkSetupComplete();\n      });\n\n      //\n      // count docs\n      //\n\n      var index = txn.objectStore(DOC_STORE).index(\'deletedOrLocal\');\n      index.count(IDBKeyRange.only(\'0\')).onsuccess = function (e) {\n        docCount = e.target.result;\n        checkSetupComplete();\n      };\n\n    };\n  };\n\n  req.onerror = function () {\n    var msg = \'Failed to open indexedDB, are you in private browsing mode?\';\n    guardedConsole(\'error\', msg);\n    callback(createError(IDB_ERROR, msg));\n  };\n}\n\nIdbPouch.valid = function () {\n  // Issue #2533, we finally gave up on doing bug\n  // detection instead of browser sniffing. Safari brought us\n  // to our knees.\n  var isSafari = typeof openDatabase !== \'undefined\' &&\n    /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&\n    !/Chrome/.test(navigator.userAgent) &&\n    !/BlackBerry/.test(navigator.platform);\n\n  // some outdated implementations of IDB that appear on Samsung\n  // and HTC Android devices <4.4 are missing IDBKeyRange\n  return !isSafari && typeof indexedDB !== \'undefined\' &&\n    typeof IDBKeyRange !== \'undefined\';\n};\n\nfunction tryStorageOption(dbName, storage) {\n  try { // option only available in Firefox 26+\n    return indexedDB.open(dbName, {\n      version: ADAPTER_VERSION,\n      storage: storage\n    });\n  } catch(err) {\n      return indexedDB.open(dbName, ADAPTER_VERSION);\n  }\n}\n\nfunction IDBPouch (PouchDB) {\n  PouchDB.adapter(\'idb\', IdbPouch, true);\n}\n\n//\n// Parsing hex strings. Yeah.\n//\n// So basically we need this because of a bug in WebSQL:\n// https://code.google.com/p/chromium/issues/detail?id=422690\n// https://bugs.webkit.org/show_bug.cgi?id=137637\n//\n// UTF-8 and UTF-16 are provided as separate functions\n// for meager performance improvements\n//\n\nfunction decodeUtf8(str) {\n  return decodeURIComponent(escape(str));\n}\n\nfunction hexToInt(charCode) {\n  // \'0\'-\'9\' is 48-57\n  // \'A\'-\'F\' is 65-70\n  // SQLite will only give us uppercase hex\n  return charCode < 65 ? (charCode - 48) : (charCode - 55);\n}\n\n\n// Example:\n// pragma encoding=utf8;\n// select hex(\'A\');\n// returns \'41\'\nfunction parseHexUtf8(str, start, end) {\n  var result = \'\';\n  while (start < end) {\n    result += String.fromCharCode(\n      (hexToInt(str.charCodeAt(start++)) << 4) |\n        hexToInt(str.charCodeAt(start++)));\n  }\n  return result;\n}\n\n// Example:\n// pragma encoding=utf16;\n// select hex(\'A\');\n// returns \'4100\'\n// notice that the 00 comes after the 41 (i.e. it\'s swizzled)\nfunction parseHexUtf16(str, start, end) {\n  var result = \'\';\n  while (start < end) {\n    // UTF-16, so swizzle the bytes\n    result += String.fromCharCode(\n      (hexToInt(str.charCodeAt(start + 2)) << 12) |\n        (hexToInt(str.charCodeAt(start + 3)) << 8) |\n        (hexToInt(str.charCodeAt(start)) << 4) |\n        hexToInt(str.charCodeAt(start + 1)));\n    start += 4;\n  }\n  return result;\n}\n\nfunction parseHexString(str, encoding) {\n  if (encoding === \'UTF-8\') {\n    return decodeUtf8(parseHexUtf8(str, 0, str.length));\n  } else {\n    return parseHexUtf16(str, 0, str.length);\n  }\n}\n\nfunction quote(str) {\n  return "\'" + str + "\'";\n}\n\nvar ADAPTER_VERSION$1 = 7; // used to manage migrations\n\n// The object stores created for each database\n// DOC_STORE stores the document meta data, its revision history and state\nvar DOC_STORE$1 = quote(\'document-store\');\n// BY_SEQ_STORE stores a particular version of a document, keyed by its\n// sequence id\nvar BY_SEQ_STORE$1 = quote(\'by-sequence\');\n// Where we store attachments\nvar ATTACH_STORE$1 = quote(\'attach-store\');\nvar LOCAL_STORE$1 = quote(\'local-store\');\nvar META_STORE$1 = quote(\'metadata-store\');\n// where we store many-to-many relations between attachment\n// digests and seqs\nvar ATTACH_AND_SEQ_STORE$1 = quote(\'attach-seq-store\');\n\n// escapeBlob and unescapeBlob are workarounds for a websql bug:\n// https://code.google.com/p/chromium/issues/detail?id=422690\n// https://bugs.webkit.org/show_bug.cgi?id=137637\n// The goal is to never actually insert the \\u0000 character\n// in the database.\nfunction escapeBlob(str) {\n  return str\n    .replace(/\\u0002/g, \'\\u0002\\u0002\')\n    .replace(/\\u0001/g, \'\\u0001\\u0002\')\n    .replace(/\\u0000/g, \'\\u0001\\u0001\');\n}\n\nfunction unescapeBlob(str) {\n  return str\n    .replace(/\\u0001\\u0001/g, \'\\u0000\')\n    .replace(/\\u0001\\u0002/g, \'\\u0001\')\n    .replace(/\\u0002\\u0002/g, \'\\u0002\');\n}\n\nfunction stringifyDoc(doc) {\n  // don\'t bother storing the id/rev. it uses lots of space,\n  // in persistent map/reduce especially\n  delete doc._id;\n  delete doc._rev;\n  return JSON.stringify(doc);\n}\n\nfunction unstringifyDoc(doc, id, rev) {\n  doc = JSON.parse(doc);\n  doc._id = id;\n  doc._rev = rev;\n  return doc;\n}\n\n// question mark groups IN queries, e.g. 3 -> \'(?,?,?)\'\nfunction qMarks(num) {\n  var s = \'(\';\n  while (num--) {\n    s += \'?\';\n    if (num) {\n      s += \',\';\n    }\n  }\n  return s + \')\';\n}\n\nfunction select(selector, table, joiner, where, orderBy) {\n  return \'SELECT \' + selector + \' FROM \' +\n    (typeof table === \'string\' ? table : table.join(\' JOIN \')) +\n    (joiner ? (\' ON \' + joiner) : \'\') +\n    (where ? (\' WHERE \' +\n    (typeof where === \'string\' ? where : where.join(\' AND \'))) : \'\') +\n    (orderBy ? (\' ORDER BY \' + orderBy) : \'\');\n}\n\nfunction compactRevs$1(revs, docId, tx) {\n\n  if (!revs.length) {\n    return;\n  }\n\n  var numDone = 0;\n  var seqs = [];\n\n  function checkDone() {\n    if (++numDone === revs.length) { // done\n      deleteOrphans();\n    }\n  }\n\n  function deleteOrphans() {\n    // find orphaned attachment digests\n\n    if (!seqs.length) {\n      return;\n    }\n\n    var sql = \'SELECT DISTINCT digest AS digest FROM \' +\n      ATTACH_AND_SEQ_STORE$1 + \' WHERE seq IN \' + qMarks(seqs.length);\n\n    tx.executeSql(sql, seqs, function (tx, res) {\n\n      var digestsToCheck = [];\n      for (var i = 0; i < res.rows.length; i++) {\n        digestsToCheck.push(res.rows.item(i).digest);\n      }\n      if (!digestsToCheck.length) {\n        return;\n      }\n\n      var sql = \'DELETE FROM \' + ATTACH_AND_SEQ_STORE$1 +\n        \' WHERE seq IN (\' +\n        seqs.map(function () { return \'?\'; }).join(\',\') +\n        \')\';\n      tx.executeSql(sql, seqs, function (tx) {\n\n        var sql = \'SELECT digest FROM \' + ATTACH_AND_SEQ_STORE$1 +\n          \' WHERE digest IN (\' +\n          digestsToCheck.map(function () { return \'?\'; }).join(\',\') +\n          \')\';\n        tx.executeSql(sql, digestsToCheck, function (tx, res) {\n          var nonOrphanedDigests = new pouchdbCollections.Set();\n          for (var i = 0; i < res.rows.length; i++) {\n            nonOrphanedDigests.add(res.rows.item(i).digest);\n          }\n          digestsToCheck.forEach(function (digest) {\n            if (nonOrphanedDigests.has(digest)) {\n              return;\n            }\n            tx.executeSql(\n              \'DELETE FROM \' + ATTACH_AND_SEQ_STORE$1 + \' WHERE digest=?\',\n              [digest]);\n            tx.executeSql(\n              \'DELETE FROM \' + ATTACH_STORE$1 + \' WHERE digest=?\', [digest]);\n          });\n        });\n      });\n    });\n  }\n\n  // update by-seq and attach stores in parallel\n  revs.forEach(function (rev) {\n    var sql = \'SELECT seq FROM \' + BY_SEQ_STORE$1 +\n      \' WHERE doc_id=? AND rev=?\';\n\n    tx.executeSql(sql, [docId, rev], function (tx, res) {\n      if (!res.rows.length) { // already deleted\n        return checkDone();\n      }\n      var seq = res.rows.item(0).seq;\n      seqs.push(seq);\n\n      tx.executeSql(\n        \'DELETE FROM \' + BY_SEQ_STORE$1 + \' WHERE seq=?\', [seq], checkDone);\n    });\n  });\n}\n\nfunction websqlError(callback) {\n  return function (event) {\n    guardedConsole(\'error\', \'WebSQL threw an error\', event);\n    // event may actually be a SQLError object, so report is as such\n    var errorNameMatch = event && event.constructor.toString()\n        .match(/function ([^\\(]+)/);\n    var errorName = (errorNameMatch && errorNameMatch[1]) || event.type;\n    var errorReason = event.target || event.message;\n    callback(createError(WSQ_ERROR, errorReason, errorName));\n  };\n}\n\nfunction getSize(opts) {\n  if (\'size\' in opts) {\n    // triggers immediate popup in iOS, fixes #2347\n    // e.g. 5000001 asks for 5 MB, 10000001 asks for 10 MB,\n    return opts.size * 1000000;\n  }\n  // In iOS, doesn\'t matter as long as it\'s <= 5000000.\n  // Except that if you request too much, our tests fail\n  // because of the native "do you accept?" popup.\n  // In Android <=4.3, this value is actually used as an\n  // honest-to-god ceiling for data, so we need to\n  // set it to a decently high number.\n  var isAndroid = typeof navigator !== \'undefined\' &&\n    /Android/.test(navigator.userAgent);\n  return isAndroid ? 5000000 : 1; // in PhantomJS, if you use 0 it will crash\n}\n\nfunction websqlBulkDocs(dbOpts, req, opts, api, db, websqlChanges, callback) {\n  var newEdits = opts.new_edits;\n  var userDocs = req.docs;\n\n  // Parse the docs, give them a sequence number for the result\n  var docInfos = userDocs.map(function (doc) {\n    if (doc._id && isLocalId(doc._id)) {\n      return doc;\n    }\n    var newDoc = parseDoc(doc, newEdits);\n    return newDoc;\n  });\n\n  var docInfoErrors = docInfos.filter(function (docInfo) {\n    return docInfo.error;\n  });\n  if (docInfoErrors.length) {\n    return callback(docInfoErrors[0]);\n  }\n\n  var tx;\n  var results = new Array(docInfos.length);\n  var fetchedDocs = new pouchdbCollections.Map();\n\n  var preconditionErrored;\n  function complete() {\n    if (preconditionErrored) {\n      return callback(preconditionErrored);\n    }\n    websqlChanges.notify(api._name);\n    api._docCount = -1; // invalidate\n    callback(null, results);\n  }\n\n  function verifyAttachment(digest, callback) {\n    var sql = \'SELECT count(*) as cnt FROM \' + ATTACH_STORE$1 +\n      \' WHERE digest=?\';\n    tx.executeSql(sql, [digest], function (tx, result) {\n      if (result.rows.item(0).cnt === 0) {\n        var err = createError(MISSING_STUB,\n          \'unknown stub attachment with digest \' +\n          digest);\n        callback(err);\n      } else {\n        callback();\n      }\n    });\n  }\n\n  function verifyAttachments(finish) {\n    var digests = [];\n    docInfos.forEach(function (docInfo) {\n      if (docInfo.data && docInfo.data._attachments) {\n        Object.keys(docInfo.data._attachments).forEach(function (filename) {\n          var att = docInfo.data._attachments[filename];\n          if (att.stub) {\n            digests.push(att.digest);\n          }\n        });\n      }\n    });\n    if (!digests.length) {\n      return finish();\n    }\n    var numDone = 0;\n    var err;\n\n    function checkDone() {\n      if (++numDone === digests.length) {\n        finish(err);\n      }\n    }\n    digests.forEach(function (digest) {\n      verifyAttachment(digest, function (attErr) {\n        if (attErr && !err) {\n          err = attErr;\n        }\n        checkDone();\n      });\n    });\n  }\n\n  function writeDoc(docInfo, winningRev, winningRevIsDeleted, newRevIsDeleted,\n                    isUpdate, delta, resultsIdx, callback) {\n\n    function finish() {\n      var data = docInfo.data;\n      var deletedInt = newRevIsDeleted ? 1 : 0;\n\n      var id = data._id;\n      var rev = data._rev;\n      var json = stringifyDoc(data);\n      var sql = \'INSERT INTO \' + BY_SEQ_STORE$1 +\n        \' (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);\';\n      var sqlArgs = [id, rev, json, deletedInt];\n\n      // map seqs to attachment digests, which\n      // we will need later during compaction\n      function insertAttachmentMappings(seq, callback) {\n        var attsAdded = 0;\n        var attsToAdd = Object.keys(data._attachments || {});\n\n        if (!attsToAdd.length) {\n          return callback();\n        }\n        function checkDone() {\n          if (++attsAdded === attsToAdd.length) {\n            callback();\n          }\n          return false; // ack handling a constraint error\n        }\n        function add(att) {\n          var sql = \'INSERT INTO \' + ATTACH_AND_SEQ_STORE$1 +\n            \' (digest, seq) VALUES (?,?)\';\n          var sqlArgs = [data._attachments[att].digest, seq];\n          tx.executeSql(sql, sqlArgs, checkDone, checkDone);\n          // second callback is for a constaint error, which we ignore\n          // because this docid/rev has already been associated with\n          // the digest (e.g. when new_edits == false)\n        }\n        for (var i = 0; i < attsToAdd.length; i++) {\n          add(attsToAdd[i]); // do in parallel\n        }\n      }\n\n      tx.executeSql(sql, sqlArgs, function (tx, result) {\n        var seq = result.insertId;\n        insertAttachmentMappings(seq, function () {\n          dataWritten(tx, seq);\n        });\n      }, function () {\n        // constraint error, recover by updating instead (see #1638)\n        var fetchSql = select(\'seq\', BY_SEQ_STORE$1, null,\n          \'doc_id=? AND rev=?\');\n        tx.executeSql(fetchSql, [id, rev], function (tx, res) {\n          var seq = res.rows.item(0).seq;\n          var sql = \'UPDATE \' + BY_SEQ_STORE$1 +\n            \' SET json=?, deleted=? WHERE doc_id=? AND rev=?;\';\n          var sqlArgs = [json, deletedInt, id, rev];\n          tx.executeSql(sql, sqlArgs, function (tx) {\n            insertAttachmentMappings(seq, function () {\n              dataWritten(tx, seq);\n            });\n          });\n        });\n        return false; // ack that we\'ve handled the error\n      });\n    }\n\n    function collectResults(attachmentErr) {\n      if (!err) {\n        if (attachmentErr) {\n          err = attachmentErr;\n          callback(err);\n        } else if (recv === attachments.length) {\n          finish();\n        }\n      }\n    }\n\n    var err = null;\n    var recv = 0;\n\n    docInfo.data._id = docInfo.metadata.id;\n    docInfo.data._rev = docInfo.metadata.rev;\n    var attachments = Object.keys(docInfo.data._attachments || {});\n\n\n    if (newRevIsDeleted) {\n      docInfo.data._deleted = true;\n    }\n\n    function attachmentSaved(err) {\n      recv++;\n      collectResults(err);\n    }\n\n    attachments.forEach(function (key) {\n      var att = docInfo.data._attachments[key];\n      if (!att.stub) {\n        var data = att.data;\n        delete att.data;\n        att.revpos = parseInt(winningRev, 10);\n        var digest = att.digest;\n        saveAttachment(digest, data, attachmentSaved);\n      } else {\n        recv++;\n        collectResults();\n      }\n    });\n\n    if (!attachments.length) {\n      finish();\n    }\n\n    function dataWritten(tx, seq) {\n      var id = docInfo.metadata.id;\n\n      var revsToCompact = docInfo.stemmedRevs || [];\n      if (isUpdate && api.auto_compaction) {\n        revsToCompact = compactTree(docInfo.metadata).concat(revsToCompact);\n      }\n      if (revsToCompact.length) {\n        compactRevs$1(revsToCompact, id, tx);\n      }\n\n      docInfo.metadata.seq = seq;\n      delete docInfo.metadata.rev;\n\n      var sql = isUpdate ?\n      \'UPDATE \' + DOC_STORE$1 +\n      \' SET json=?, max_seq=?, winningseq=\' +\n      \'(SELECT seq FROM \' + BY_SEQ_STORE$1 +\n      \' WHERE doc_id=\' + DOC_STORE$1 + \'.id AND rev=?) WHERE id=?\'\n        : \'INSERT INTO \' + DOC_STORE$1 +\n      \' (id, winningseq, max_seq, json) VALUES (?,?,?,?);\';\n      var metadataStr = safeJsonStringify(docInfo.metadata);\n      var params = isUpdate ?\n        [metadataStr, seq, winningRev, id] :\n        [id, seq, seq, metadataStr];\n      tx.executeSql(sql, params, function () {\n        results[resultsIdx] = {\n          ok: true,\n          id: docInfo.metadata.id,\n          rev: winningRev\n        };\n        fetchedDocs.set(id, docInfo.metadata);\n        callback();\n      });\n    }\n  }\n\n  function websqlProcessDocs() {\n    processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs, tx,\n                results, writeDoc, opts);\n  }\n\n  function fetchExistingDocs(callback) {\n    if (!docInfos.length) {\n      return callback();\n    }\n\n    var numFetched = 0;\n\n    function checkDone() {\n      if (++numFetched === docInfos.length) {\n        callback();\n      }\n    }\n\n    docInfos.forEach(function (docInfo) {\n      if (docInfo._id && isLocalId(docInfo._id)) {\n        return checkDone(); // skip local docs\n      }\n      var id = docInfo.metadata.id;\n      tx.executeSql(\'SELECT json FROM \' + DOC_STORE$1 +\n      \' WHERE id = ?\', [id], function (tx, result) {\n        if (result.rows.length) {\n          var metadata = safeJsonParse(result.rows.item(0).json);\n          fetchedDocs.set(id, metadata);\n        }\n        checkDone();\n      });\n    });\n  }\n\n  function saveAttachment(digest, data, callback) {\n    var sql = \'SELECT digest FROM \' + ATTACH_STORE$1 + \' WHERE digest=?\';\n    tx.executeSql(sql, [digest], function (tx, result) {\n      if (result.rows.length) { // attachment already exists\n        return callback();\n      }\n      // we could just insert before selecting and catch the error,\n      // but my hunch is that it\'s cheaper not to serialize the blob\n      // from JS to C if we don\'t have to (TODO: confirm this)\n      sql = \'INSERT INTO \' + ATTACH_STORE$1 +\n      \' (digest, body, escaped) VALUES (?,?,1)\';\n      tx.executeSql(sql, [digest, escapeBlob(data)], function () {\n        callback();\n      }, function () {\n        // ignore constaint errors, means it already exists\n        callback();\n        return false; // ack we handled the error\n      });\n    });\n  }\n\n  preprocessAttachments(docInfos, \'binary\', function (err) {\n    if (err) {\n      return callback(err);\n    }\n    db.transaction(function (txn) {\n      tx = txn;\n      verifyAttachments(function (err) {\n        if (err) {\n          preconditionErrored = err;\n        } else {\n          fetchExistingDocs(websqlProcessDocs);\n        }\n      });\n    }, websqlError(callback), complete);\n  });\n}\n\nvar cachedDatabases = new pouchdbCollections.Map();\n\n// openDatabase passed in through opts (e.g. for node-websql)\nfunction openDatabaseWithOpts(opts) {\n  return opts.websql(opts.name, opts.version, opts.description, opts.size);\n}\n\nfunction openDBSafely(opts) {\n  try {\n    return {\n      db: openDatabaseWithOpts(opts)\n    };\n  } catch (err) {\n    return {\n      error: err\n    };\n  }\n}\n\nfunction openDB(opts) {\n  var cachedResult = cachedDatabases.get(opts.name);\n  if (!cachedResult) {\n    cachedResult = openDBSafely(opts);\n    cachedDatabases.set(opts.name, cachedResult);\n    if (cachedResult.db) {\n      cachedResult.db._sqlitePlugin = typeof sqlitePlugin !== \'undefined\';\n    }\n  }\n  return cachedResult;\n}\n\nvar websqlChanges = new Changes$1();\n\nfunction fetchAttachmentsIfNecessary$1(doc, opts, api, txn, cb) {\n  var attachments = Object.keys(doc._attachments || {});\n  if (!attachments.length) {\n    return cb && cb();\n  }\n  var numDone = 0;\n\n  function checkDone() {\n    if (++numDone === attachments.length && cb) {\n      cb();\n    }\n  }\n\n  function fetchAttachment(doc, att) {\n    var attObj = doc._attachments[att];\n    var attOpts = {binary: opts.binary, ctx: txn};\n    api._getAttachment(doc._id, att, attObj, attOpts, function (_, data) {\n      doc._attachments[att] = jsExtend.extend(\n        pick(attObj, [\'digest\', \'content_type\']),\n        { data: data }\n      );\n      checkDone();\n    });\n  }\n\n  attachments.forEach(function (att) {\n    if (opts.attachments && opts.include_docs) {\n      fetchAttachment(doc, att);\n    } else {\n      doc._attachments[att].stub = true;\n      checkDone();\n    }\n  });\n}\n\nvar POUCH_VERSION = 1;\n\n// these indexes cover the ground for most allDocs queries\nvar BY_SEQ_STORE_DELETED_INDEX_SQL =\n  \'CREATE INDEX IF NOT EXISTS \\\'by-seq-deleted-idx\\\' ON \' +\n  BY_SEQ_STORE$1 + \' (seq, deleted)\';\nvar BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL =\n  \'CREATE UNIQUE INDEX IF NOT EXISTS \\\'by-seq-doc-id-rev\\\' ON \' +\n    BY_SEQ_STORE$1 + \' (doc_id, rev)\';\nvar DOC_STORE_WINNINGSEQ_INDEX_SQL =\n  \'CREATE INDEX IF NOT EXISTS \\\'doc-winningseq-idx\\\' ON \' +\n  DOC_STORE$1 + \' (winningseq)\';\nvar ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL =\n  \'CREATE INDEX IF NOT EXISTS \\\'attach-seq-seq-idx\\\' ON \' +\n    ATTACH_AND_SEQ_STORE$1 + \' (seq)\';\nvar ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL =\n  \'CREATE UNIQUE INDEX IF NOT EXISTS \\\'attach-seq-digest-idx\\\' ON \' +\n    ATTACH_AND_SEQ_STORE$1 + \' (digest, seq)\';\n\nvar DOC_STORE_AND_BY_SEQ_JOINER = BY_SEQ_STORE$1 +\n  \'.seq = \' + DOC_STORE$1 + \'.winningseq\';\n\nvar SELECT_DOCS = BY_SEQ_STORE$1 + \'.seq AS seq, \' +\n  BY_SEQ_STORE$1 + \'.deleted AS deleted, \' +\n  BY_SEQ_STORE$1 + \'.json AS data, \' +\n  BY_SEQ_STORE$1 + \'.rev AS rev, \' +\n  DOC_STORE$1 + \'.json AS metadata\';\n\nfunction WebSqlPouch$1(opts, callback) {\n  var api = this;\n  var instanceId = null;\n  var size = getSize(opts);\n  var idRequests = [];\n  var encoding;\n\n  api._docCount = -1; // cache sqlite count(*) for performance\n  api._name = opts.name;\n\n  // extend the options here, because sqlite plugin has a ton of options\n  // and they are constantly changing, so it\'s more prudent to allow anything\n  var websqlOpts = jsExtend.extend({}, opts, {\n    version: POUCH_VERSION,\n    description: opts.name,\n    size: size\n  });\n  var openDBResult = openDB(websqlOpts);\n  if (openDBResult.error) {\n    return websqlError(callback)(openDBResult.error);\n  }\n  var db = openDBResult.db;\n  if (typeof db.readTransaction !== \'function\') {\n    // doesn\'t exist in sqlite plugin\n    db.readTransaction = db.transaction;\n  }\n\n  function dbCreated() {\n    // note the db name in case the browser upgrades to idb\n    if (hasLocalStorage()) {\n      window.localStorage[\'_pouch__websqldb_\' + api._name] = true;\n    }\n    callback(null, api);\n  }\n\n  // In this migration, we added the \'deleted\' and \'local\' columns to the\n  // by-seq and doc store tables.\n  // To preserve existing user data, we re-process all the existing JSON\n  // and add these values.\n  // Called migration2 because it corresponds to adapter version (db_version) #2\n  function runMigration2(tx, callback) {\n    // index used for the join in the allDocs query\n    tx.executeSql(DOC_STORE_WINNINGSEQ_INDEX_SQL);\n\n    tx.executeSql(\'ALTER TABLE \' + BY_SEQ_STORE$1 +\n      \' ADD COLUMN deleted TINYINT(1) DEFAULT 0\', [], function () {\n      tx.executeSql(BY_SEQ_STORE_DELETED_INDEX_SQL);\n      tx.executeSql(\'ALTER TABLE \' + DOC_STORE$1 +\n        \' ADD COLUMN local TINYINT(1) DEFAULT 0\', [], function () {\n        tx.executeSql(\'CREATE INDEX IF NOT EXISTS \\\'doc-store-local-idx\\\' ON \' +\n          DOC_STORE$1 + \' (local, id)\');\n\n        var sql = \'SELECT \' + DOC_STORE$1 + \'.winningseq AS seq, \' + DOC_STORE$1 +\n          \'.json AS metadata FROM \' + BY_SEQ_STORE$1 + \' JOIN \' + DOC_STORE$1 +\n          \' ON \' + BY_SEQ_STORE$1 + \'.seq = \' + DOC_STORE$1 + \'.winningseq\';\n\n        tx.executeSql(sql, [], function (tx, result) {\n\n          var deleted = [];\n          var local = [];\n\n          for (var i = 0; i < result.rows.length; i++) {\n            var item = result.rows.item(i);\n            var seq = item.seq;\n            var metadata = JSON.parse(item.metadata);\n            if (isDeleted(metadata)) {\n              deleted.push(seq);\n            }\n            if (isLocalId(metadata.id)) {\n              local.push(metadata.id);\n            }\n          }\n          tx.executeSql(\'UPDATE \' + DOC_STORE$1 + \'SET local = 1 WHERE id IN \' +\n            qMarks(local.length), local, function () {\n            tx.executeSql(\'UPDATE \' + BY_SEQ_STORE$1 +\n              \' SET deleted = 1 WHERE seq IN \' +\n              qMarks(deleted.length), deleted, callback);\n          });\n        });\n      });\n    });\n  }\n\n  // in this migration, we make all the local docs unversioned\n  function runMigration3(tx, callback) {\n    var local = \'CREATE TABLE IF NOT EXISTS \' + LOCAL_STORE$1 +\n      \' (id UNIQUE, rev, json)\';\n    tx.executeSql(local, [], function () {\n      var sql = \'SELECT \' + DOC_STORE$1 + \'.id AS id, \' +\n        BY_SEQ_STORE$1 + \'.json AS data \' +\n        \'FROM \' + BY_SEQ_STORE$1 + \' JOIN \' +\n        DOC_STORE$1 + \' ON \' + BY_SEQ_STORE$1 + \'.seq = \' +\n        DOC_STORE$1 + \'.winningseq WHERE local = 1\';\n      tx.executeSql(sql, [], function (tx, res) {\n        var rows = [];\n        for (var i = 0; i < res.rows.length; i++) {\n          rows.push(res.rows.item(i));\n        }\n        function doNext() {\n          if (!rows.length) {\n            return callback(tx);\n          }\n          var row = rows.shift();\n          var rev = JSON.parse(row.data)._rev;\n          tx.executeSql(\'INSERT INTO \' + LOCAL_STORE$1 +\n              \' (id, rev, json) VALUES (?,?,?)\',\n              [row.id, rev, row.data], function (tx) {\n            tx.executeSql(\'DELETE FROM \' + DOC_STORE$1 + \' WHERE id=?\',\n                [row.id], function (tx) {\n              tx.executeSql(\'DELETE FROM \' + BY_SEQ_STORE$1 + \' WHERE seq=?\',\n                  [row.seq], function () {\n                doNext();\n              });\n            });\n          });\n        }\n        doNext();\n      });\n    });\n  }\n\n  // in this migration, we remove doc_id_rev and just use rev\n  function runMigration4(tx, callback) {\n\n    function updateRows(rows) {\n      function doNext() {\n        if (!rows.length) {\n          return callback(tx);\n        }\n        var row = rows.shift();\n        var doc_id_rev = parseHexString(row.hex, encoding);\n        var idx = doc_id_rev.lastIndexOf(\'::\');\n        var doc_id = doc_id_rev.substring(0, idx);\n        var rev = doc_id_rev.substring(idx + 2);\n        var sql = \'UPDATE \' + BY_SEQ_STORE$1 +\n          \' SET doc_id=?, rev=? WHERE doc_id_rev=?\';\n        tx.executeSql(sql, [doc_id, rev, doc_id_rev], function () {\n          doNext();\n        });\n      }\n      doNext();\n    }\n\n    var sql = \'ALTER TABLE \' + BY_SEQ_STORE$1 + \' ADD COLUMN doc_id\';\n    tx.executeSql(sql, [], function (tx) {\n      var sql = \'ALTER TABLE \' + BY_SEQ_STORE$1 + \' ADD COLUMN rev\';\n      tx.executeSql(sql, [], function (tx) {\n        tx.executeSql(BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL, [], function (tx) {\n          var sql = \'SELECT hex(doc_id_rev) as hex FROM \' + BY_SEQ_STORE$1;\n          tx.executeSql(sql, [], function (tx, res) {\n            var rows = [];\n            for (var i = 0; i < res.rows.length; i++) {\n              rows.push(res.rows.item(i));\n            }\n            updateRows(rows);\n          });\n        });\n      });\n    });\n  }\n\n  // in this migration, we add the attach_and_seq table\n  // for issue #2818\n  function runMigration5(tx, callback) {\n\n    function migrateAttsAndSeqs(tx) {\n      // need to actually populate the table. this is the expensive part,\n      // so as an optimization, check first that this database even\n      // contains attachments\n      var sql = \'SELECT COUNT(*) AS cnt FROM \' + ATTACH_STORE$1;\n      tx.executeSql(sql, [], function (tx, res) {\n        var count = res.rows.item(0).cnt;\n        if (!count) {\n          return callback(tx);\n        }\n\n        var offset = 0;\n        var pageSize = 10;\n        function nextPage() {\n          var sql = select(\n            SELECT_DOCS + \', \' + DOC_STORE$1 + \'.id AS id\',\n            [DOC_STORE$1, BY_SEQ_STORE$1],\n            DOC_STORE_AND_BY_SEQ_JOINER,\n            null,\n            DOC_STORE$1 + \'.id \'\n          );\n          sql += \' LIMIT \' + pageSize + \' OFFSET \' + offset;\n          offset += pageSize;\n          tx.executeSql(sql, [], function (tx, res) {\n            if (!res.rows.length) {\n              return callback(tx);\n            }\n            var digestSeqs = {};\n            function addDigestSeq(digest, seq) {\n              // uniq digest/seq pairs, just in case there are dups\n              var seqs = digestSeqs[digest] = (digestSeqs[digest] || []);\n              if (seqs.indexOf(seq) === -1) {\n                seqs.push(seq);\n              }\n            }\n            for (var i = 0; i < res.rows.length; i++) {\n              var row = res.rows.item(i);\n              var doc = unstringifyDoc(row.data, row.id, row.rev);\n              var atts = Object.keys(doc._attachments || {});\n              for (var j = 0; j < atts.length; j++) {\n                var att = doc._attachments[atts[j]];\n                addDigestSeq(att.digest, row.seq);\n              }\n            }\n            var digestSeqPairs = [];\n            Object.keys(digestSeqs).forEach(function (digest) {\n              var seqs = digestSeqs[digest];\n              seqs.forEach(function (seq) {\n                digestSeqPairs.push([digest, seq]);\n              });\n            });\n            if (!digestSeqPairs.length) {\n              return nextPage();\n            }\n            var numDone = 0;\n            digestSeqPairs.forEach(function (pair) {\n              var sql = \'INSERT INTO \' + ATTACH_AND_SEQ_STORE$1 +\n                \' (digest, seq) VALUES (?,?)\';\n              tx.executeSql(sql, pair, function () {\n                if (++numDone === digestSeqPairs.length) {\n                  nextPage();\n                }\n              });\n            });\n          });\n        }\n        nextPage();\n      });\n    }\n\n    var attachAndRev = \'CREATE TABLE IF NOT EXISTS \' +\n      ATTACH_AND_SEQ_STORE$1 + \' (digest, seq INTEGER)\';\n    tx.executeSql(attachAndRev, [], function (tx) {\n      tx.executeSql(\n        ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL, [], function (tx) {\n          tx.executeSql(\n            ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL, [],\n            migrateAttsAndSeqs);\n        });\n    });\n  }\n\n  // in this migration, we use escapeBlob() and unescapeBlob()\n  // instead of reading out the binary as HEX, which is slow\n  function runMigration6(tx, callback) {\n    var sql = \'ALTER TABLE \' + ATTACH_STORE$1 +\n      \' ADD COLUMN escaped TINYINT(1) DEFAULT 0\';\n    tx.executeSql(sql, [], callback);\n  }\n\n  // issue #3136, in this migration we need a "latest seq" as well\n  // as the "winning seq" in the doc store\n  function runMigration7(tx, callback) {\n    var sql = \'ALTER TABLE \' + DOC_STORE$1 +\n      \' ADD COLUMN max_seq INTEGER\';\n    tx.executeSql(sql, [], function (tx) {\n      var sql = \'UPDATE \' + DOC_STORE$1 + \' SET max_seq=(SELECT MAX(seq) FROM \' +\n        BY_SEQ_STORE$1 + \' WHERE doc_id=id)\';\n      tx.executeSql(sql, [], function (tx) {\n        // add unique index after filling, else we\'ll get a constraint\n        // error when we do the ALTER TABLE\n        var sql =\n          \'CREATE UNIQUE INDEX IF NOT EXISTS \\\'doc-max-seq-idx\\\' ON \' +\n          DOC_STORE$1 + \' (max_seq)\';\n        tx.executeSql(sql, [], callback);\n      });\n    });\n  }\n\n  function checkEncoding(tx, cb) {\n    // UTF-8 on chrome/android, UTF-16 on safari < 7.1\n    tx.executeSql(\'SELECT HEX("a") AS hex\', [], function (tx, res) {\n        var hex = res.rows.item(0).hex;\n        encoding = hex.length === 2 ? \'UTF-8\' : \'UTF-16\';\n        cb();\n      }\n    );\n  }\n\n  function onGetInstanceId() {\n    while (idRequests.length > 0) {\n      var idCallback = idRequests.pop();\n      idCallback(null, instanceId);\n    }\n  }\n\n  function onGetVersion(tx, dbVersion) {\n    if (dbVersion === 0) {\n      // initial schema\n\n      var meta = \'CREATE TABLE IF NOT EXISTS \' + META_STORE$1 +\n        \' (dbid, db_version INTEGER)\';\n      var attach = \'CREATE TABLE IF NOT EXISTS \' + ATTACH_STORE$1 +\n        \' (digest UNIQUE, escaped TINYINT(1), body BLOB)\';\n      var attachAndRev = \'CREATE TABLE IF NOT EXISTS \' +\n        ATTACH_AND_SEQ_STORE$1 + \' (digest, seq INTEGER)\';\n      // TODO: migrate winningseq to INTEGER\n      var doc = \'CREATE TABLE IF NOT EXISTS \' + DOC_STORE$1 +\n        \' (id unique, json, winningseq, max_seq INTEGER UNIQUE)\';\n      var seq = \'CREATE TABLE IF NOT EXISTS \' + BY_SEQ_STORE$1 +\n        \' (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \' +\n        \'json, deleted TINYINT(1), doc_id, rev)\';\n      var local = \'CREATE TABLE IF NOT EXISTS \' + LOCAL_STORE$1 +\n        \' (id UNIQUE, rev, json)\';\n\n      // creates\n      tx.executeSql(attach);\n      tx.executeSql(local);\n      tx.executeSql(attachAndRev, [], function () {\n        tx.executeSql(ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL);\n        tx.executeSql(ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL);\n      });\n      tx.executeSql(doc, [], function () {\n        tx.executeSql(DOC_STORE_WINNINGSEQ_INDEX_SQL);\n        tx.executeSql(seq, [], function () {\n          tx.executeSql(BY_SEQ_STORE_DELETED_INDEX_SQL);\n          tx.executeSql(BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL);\n          tx.executeSql(meta, [], function () {\n            // mark the db version, and new dbid\n            var initSeq = \'INSERT INTO \' + META_STORE$1 +\n              \' (db_version, dbid) VALUES (?,?)\';\n            instanceId = uuid();\n            var initSeqArgs = [ADAPTER_VERSION$1, instanceId];\n            tx.executeSql(initSeq, initSeqArgs, function () {\n              onGetInstanceId();\n            });\n          });\n        });\n      });\n    } else { // version > 0\n\n      var setupDone = function () {\n        var migrated = dbVersion < ADAPTER_VERSION$1;\n        if (migrated) {\n          // update the db version within this transaction\n          tx.executeSql(\'UPDATE \' + META_STORE$1 + \' SET db_version = \' +\n            ADAPTER_VERSION$1);\n        }\n        // notify db.id() callers\n        var sql = \'SELECT dbid FROM \' + META_STORE$1;\n        tx.executeSql(sql, [], function (tx, result) {\n          instanceId = result.rows.item(0).dbid;\n          onGetInstanceId();\n        });\n      };\n\n      // would love to use promises here, but then websql\n      // ends the transaction early\n      var tasks = [\n        runMigration2,\n        runMigration3,\n        runMigration4,\n        runMigration5,\n        runMigration6,\n        runMigration7,\n        setupDone\n      ];\n\n      // run each migration sequentially\n      var i = dbVersion;\n      var nextMigration = function (tx) {\n        tasks[i - 1](tx, nextMigration);\n        i++;\n      };\n      nextMigration(tx);\n    }\n  }\n\n  function setup() {\n    db.transaction(function (tx) {\n      // first check the encoding\n      checkEncoding(tx, function () {\n        // then get the version\n        fetchVersion(tx);\n      });\n    }, websqlError(callback), dbCreated);\n  }\n\n  function fetchVersion(tx) {\n    var sql = \'SELECT sql FROM sqlite_master WHERE tbl_name = \' + META_STORE$1;\n    tx.executeSql(sql, [], function (tx, result) {\n      if (!result.rows.length) {\n        // database hasn\'t even been created yet (version 0)\n        onGetVersion(tx, 0);\n      } else if (!/db_version/.test(result.rows.item(0).sql)) {\n        // table was created, but without the new db_version column,\n        // so add it.\n        tx.executeSql(\'ALTER TABLE \' + META_STORE$1 +\n          \' ADD COLUMN db_version INTEGER\', [], function () {\n          // before version 2, this column didn\'t even exist\n          onGetVersion(tx, 1);\n        });\n      } else { // column exists, we can safely get it\n        tx.executeSql(\'SELECT db_version FROM \' + META_STORE$1,\n          [], function (tx, result) {\n          var dbVersion = result.rows.item(0).db_version;\n          onGetVersion(tx, dbVersion);\n        });\n      }\n    });\n  }\n\n  setup();\n\n  api.type = function () {\n    return \'websql\';\n  };\n\n  api._id = toPromise(function (callback) {\n    callback(null, instanceId);\n  });\n\n  api._info = function (callback) {\n    db.readTransaction(function (tx) {\n      countDocs(tx, function (docCount) {\n        var sql = \'SELECT MAX(seq) AS seq FROM \' + BY_SEQ_STORE$1;\n        tx.executeSql(sql, [], function (tx, res) {\n          var updateSeq = res.rows.item(0).seq || 0;\n          callback(null, {\n            doc_count: docCount,\n            update_seq: updateSeq,\n            // for debugging\n            sqlite_plugin: db._sqlitePlugin,\n            websql_encoding: encoding\n          });\n        });\n      });\n    }, websqlError(callback));\n  };\n\n  api._bulkDocs = function (req, reqOpts, callback) {\n    websqlBulkDocs(opts, req, reqOpts, api, db, websqlChanges, callback);\n  };\n\n  api._get = function (id, opts, callback) {\n    var doc;\n    var metadata;\n    var err;\n    var tx = opts.ctx;\n    if (!tx) {\n      return db.readTransaction(function (txn) {\n        api._get(id, jsExtend.extend({ctx: txn}, opts), callback);\n      });\n    }\n\n    function finish() {\n      callback(err, {doc: doc, metadata: metadata, ctx: tx});\n    }\n\n    var sql;\n    var sqlArgs;\n    if (opts.rev) {\n      sql = select(\n        SELECT_DOCS,\n        [DOC_STORE$1, BY_SEQ_STORE$1],\n        DOC_STORE$1 + \'.id=\' + BY_SEQ_STORE$1 + \'.doc_id\',\n        [BY_SEQ_STORE$1 + \'.doc_id=?\', BY_SEQ_STORE$1 + \'.rev=?\']);\n      sqlArgs = [id, opts.rev];\n    } else {\n      sql = select(\n        SELECT_DOCS,\n        [DOC_STORE$1, BY_SEQ_STORE$1],\n        DOC_STORE_AND_BY_SEQ_JOINER,\n        DOC_STORE$1 + \'.id=?\');\n      sqlArgs = [id];\n    }\n    tx.executeSql(sql, sqlArgs, function (a, results) {\n      if (!results.rows.length) {\n        err = createError(MISSING_DOC, \'missing\');\n        return finish();\n      }\n      var item = results.rows.item(0);\n      metadata = safeJsonParse(item.metadata);\n      if (item.deleted && !opts.rev) {\n        err = createError(MISSING_DOC, \'deleted\');\n        return finish();\n      }\n      doc = unstringifyDoc(item.data, metadata.id, item.rev);\n      finish();\n    });\n  };\n\n  function countDocs(tx, callback) {\n\n    if (api._docCount !== -1) {\n      return callback(api._docCount);\n    }\n\n    // count the total rows\n    var sql = select(\n      \'COUNT(\' + DOC_STORE$1 + \'.id) AS \\\'num\\\'\',\n      [DOC_STORE$1, BY_SEQ_STORE$1],\n      DOC_STORE_AND_BY_SEQ_JOINER,\n      BY_SEQ_STORE$1 + \'.deleted=0\');\n\n    tx.executeSql(sql, [], function (tx, result) {\n      api._docCount = result.rows.item(0).num;\n      callback(api._docCount);\n    });\n  }\n\n  api._allDocs = function (opts, callback) {\n    var results = [];\n    var totalRows;\n\n    var start = \'startkey\' in opts ? opts.startkey : false;\n    var end = \'endkey\' in opts ? opts.endkey : false;\n    var key = \'key\' in opts ? opts.key : false;\n    var descending = \'descending\' in opts ? opts.descending : false;\n    var limit = \'limit\' in opts ? opts.limit : -1;\n    var offset = \'skip\' in opts ? opts.skip : 0;\n    var inclusiveEnd = opts.inclusive_end !== false;\n\n    var sqlArgs = [];\n    var criteria = [];\n\n    if (key !== false) {\n      criteria.push(DOC_STORE$1 + \'.id = ?\');\n      sqlArgs.push(key);\n    } else if (start !== false || end !== false) {\n      if (start !== false) {\n        criteria.push(DOC_STORE$1 + \'.id \' + (descending ? \'<=\' : \'>=\') + \' ?\');\n        sqlArgs.push(start);\n      }\n      if (end !== false) {\n        var comparator = descending ? \'>\' : \'<\';\n        if (inclusiveEnd) {\n          comparator += \'=\';\n        }\n        criteria.push(DOC_STORE$1 + \'.id \' + comparator + \' ?\');\n        sqlArgs.push(end);\n      }\n      if (key !== false) {\n        criteria.push(DOC_STORE$1 + \'.id = ?\');\n        sqlArgs.push(key);\n      }\n    }\n\n    if (opts.deleted !== \'ok\') {\n      // report deleted if keys are specified\n      criteria.push(BY_SEQ_STORE$1 + \'.deleted = 0\');\n    }\n\n    db.readTransaction(function (tx) {\n\n      // first count up the total rows\n      countDocs(tx, function (count) {\n        totalRows = count;\n\n        if (limit === 0) {\n          return;\n        }\n\n        // then actually fetch the documents\n        var sql = select(\n          SELECT_DOCS,\n          [DOC_STORE$1, BY_SEQ_STORE$1],\n          DOC_STORE_AND_BY_SEQ_JOINER,\n          criteria,\n          DOC_STORE$1 + \'.id \' + (descending ? \'DESC\' : \'ASC\')\n          );\n        sql += \' LIMIT \' + limit + \' OFFSET \' + offset;\n\n        tx.executeSql(sql, sqlArgs, function (tx, result) {\n          for (var i = 0, l = result.rows.length; i < l; i++) {\n            var item = result.rows.item(i);\n            var metadata = safeJsonParse(item.metadata);\n            var id = metadata.id;\n            var data = unstringifyDoc(item.data, id, item.rev);\n            var winningRev = data._rev;\n            var doc = {\n              id: id,\n              key: id,\n              value: {rev: winningRev}\n            };\n            if (opts.include_docs) {\n              doc.doc = data;\n              doc.doc._rev = winningRev;\n              if (opts.conflicts) {\n                doc.doc._conflicts = collectConflicts(metadata);\n              }\n              fetchAttachmentsIfNecessary$1(doc.doc, opts, api, tx);\n            }\n            if (item.deleted) {\n              if (opts.deleted === \'ok\') {\n                doc.value.deleted = true;\n                doc.doc = null;\n              } else {\n                continue;\n              }\n            }\n            results.push(doc);\n          }\n        });\n      });\n    }, websqlError(callback), function () {\n      callback(null, {\n        total_rows: totalRows,\n        offset: opts.skip,\n        rows: results\n      });\n    });\n  };\n\n  api._changes = function (opts) {\n    opts = clone(opts);\n\n    if (opts.continuous) {\n      var id = api._name + \':\' + uuid();\n      websqlChanges.addListener(api._name, id, api, opts);\n      websqlChanges.notify(api._name);\n      return {\n        cancel: function () {\n          websqlChanges.removeListener(api._name, id);\n        }\n      };\n    }\n\n    var descending = opts.descending;\n\n    // Ignore the `since` parameter when `descending` is true\n    opts.since = opts.since && !descending ? opts.since : 0;\n\n    var limit = \'limit\' in opts ? opts.limit : -1;\n    if (limit === 0) {\n      limit = 1; // per CouchDB _changes spec\n    }\n\n    var returnDocs;\n    if (\'return_docs\' in opts) {\n      returnDocs = opts.return_docs;\n    } else if (\'returnDocs\' in opts) {\n      // TODO: Remove \'returnDocs\' in favor of \'return_docs\' in a future release\n      returnDocs = opts.returnDocs;\n    } else {\n      returnDocs = true;\n    }\n    var results = [];\n    var numResults = 0;\n\n    function fetchChanges() {\n\n      var selectStmt =\n        DOC_STORE$1 + \'.json AS metadata, \' +\n        DOC_STORE$1 + \'.max_seq AS maxSeq, \' +\n        BY_SEQ_STORE$1 + \'.json AS winningDoc, \' +\n        BY_SEQ_STORE$1 + \'.rev AS winningRev \';\n\n      var from = DOC_STORE$1 + \' JOIN \' + BY_SEQ_STORE$1;\n\n      var joiner = DOC_STORE$1 + \'.id=\' + BY_SEQ_STORE$1 + \'.doc_id\' +\n        \' AND \' + DOC_STORE$1 + \'.winningseq=\' + BY_SEQ_STORE$1 + \'.seq\';\n\n      var criteria = [\'maxSeq > ?\'];\n      var sqlArgs = [opts.since];\n\n      if (opts.doc_ids) {\n        criteria.push(DOC_STORE$1 + \'.id IN \' + qMarks(opts.doc_ids.length));\n        sqlArgs = sqlArgs.concat(opts.doc_ids);\n      }\n\n      var orderBy = \'maxSeq \' + (descending ? \'DESC\' : \'ASC\');\n\n      var sql = select(selectStmt, from, joiner, criteria, orderBy);\n\n      var filter = filterChange(opts);\n      if (!opts.view && !opts.filter) {\n        // we can just limit in the query\n        sql += \' LIMIT \' + limit;\n      }\n\n      var lastSeq = opts.since || 0;\n      db.readTransaction(function (tx) {\n        tx.executeSql(sql, sqlArgs, function (tx, result) {\n          function reportChange(change) {\n            return function () {\n              opts.onChange(change);\n            };\n          }\n          for (var i = 0, l = result.rows.length; i < l; i++) {\n            var item = result.rows.item(i);\n            var metadata = safeJsonParse(item.metadata);\n            lastSeq = item.maxSeq;\n\n            var doc = unstringifyDoc(item.winningDoc, metadata.id,\n              item.winningRev);\n            var change = opts.processChange(doc, metadata, opts);\n            change.seq = item.maxSeq;\n\n            var filtered = filter(change);\n            if (typeof filtered === \'object\') {\n              return opts.complete(filtered);\n            }\n\n            if (filtered) {\n              numResults++;\n              if (returnDocs) {\n                results.push(change);\n              }\n              // process the attachment immediately\n              // for the benefit of live listeners\n              if (opts.attachments && opts.include_docs) {\n                fetchAttachmentsIfNecessary$1(doc, opts, api, tx,\n                  reportChange(change));\n              } else {\n                reportChange(change)();\n              }\n            }\n            if (numResults === limit) {\n              break;\n            }\n          }\n        });\n      }, websqlError(opts.complete), function () {\n        if (!opts.continuous) {\n          opts.complete(null, {\n            results: results,\n            last_seq: lastSeq\n          });\n        }\n      });\n    }\n\n    fetchChanges();\n  };\n\n  api._close = function (callback) {\n    //WebSQL databases do not need to be closed\n    callback();\n  };\n\n  api._getAttachment = function (docId, attachId, attachment, opts, callback) {\n    var res;\n    var tx = opts.ctx;\n    var digest = attachment.digest;\n    var type = attachment.content_type;\n    var sql = \'SELECT escaped, \' +\n      \'CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM \' +\n      ATTACH_STORE$1 + \' WHERE digest=?\';\n    tx.executeSql(sql, [digest], function (tx, result) {\n      // websql has a bug where \\u0000 causes early truncation in strings\n      // and blobs. to work around this, we used to use the hex() function,\n      // but that\'s not performant. after migration 6, we remove \\u0000\n      // and add it back in afterwards\n      var item = result.rows.item(0);\n      var data = item.escaped ? unescapeBlob(item.body) :\n        parseHexString(item.body, encoding);\n      if (opts.binary) {\n        res = binStringToBluffer(data, type);\n      } else {\n        res = btoa$1(data);\n      }\n      callback(null, res);\n    });\n  };\n\n  api._getRevisionTree = function (docId, callback) {\n    db.readTransaction(function (tx) {\n      var sql = \'SELECT json AS metadata FROM \' + DOC_STORE$1 + \' WHERE id = ?\';\n      tx.executeSql(sql, [docId], function (tx, result) {\n        if (!result.rows.length) {\n          callback(createError(MISSING_DOC));\n        } else {\n          var data = safeJsonParse(result.rows.item(0).metadata);\n          callback(null, data.rev_tree);\n        }\n      });\n    });\n  };\n\n  api._doCompaction = function (docId, revs, callback) {\n    if (!revs.length) {\n      return callback();\n    }\n    db.transaction(function (tx) {\n\n      // update doc store\n      var sql = \'SELECT json AS metadata FROM \' + DOC_STORE$1 + \' WHERE id = ?\';\n      tx.executeSql(sql, [docId], function (tx, result) {\n        var metadata = safeJsonParse(result.rows.item(0).metadata);\n        traverseRevTree(metadata.rev_tree, function (isLeaf, pos,\n                                                           revHash, ctx, opts) {\n          var rev = pos + \'-\' + revHash;\n          if (revs.indexOf(rev) !== -1) {\n            opts.status = \'missing\';\n          }\n        });\n\n        var sql = \'UPDATE \' + DOC_STORE$1 + \' SET json = ? WHERE id = ?\';\n        tx.executeSql(sql, [safeJsonStringify(metadata), docId]);\n      });\n\n      compactRevs$1(revs, docId, tx);\n    }, websqlError(callback), function () {\n      callback();\n    });\n  };\n\n  api._getLocal = function (id, callback) {\n    db.readTransaction(function (tx) {\n      var sql = \'SELECT json, rev FROM \' + LOCAL_STORE$1 + \' WHERE id=?\';\n      tx.executeSql(sql, [id], function (tx, res) {\n        if (res.rows.length) {\n          var item = res.rows.item(0);\n          var doc = unstringifyDoc(item.json, id, item.rev);\n          callback(null, doc);\n        } else {\n          callback(createError(MISSING_DOC));\n        }\n      });\n    });\n  };\n\n  api._putLocal = function (doc, opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    delete doc._revisions; // ignore this, trust the rev\n    var oldRev = doc._rev;\n    var id = doc._id;\n    var newRev;\n    if (!oldRev) {\n      newRev = doc._rev = \'0-1\';\n    } else {\n      newRev = doc._rev = \'0-\' + (parseInt(oldRev.split(\'-\')[1], 10) + 1);\n    }\n    var json = stringifyDoc(doc);\n\n    var ret;\n    function putLocal(tx) {\n      var sql;\n      var values;\n      if (oldRev) {\n        sql = \'UPDATE \' + LOCAL_STORE$1 + \' SET rev=?, json=? \' +\n          \'WHERE id=? AND rev=?\';\n        values = [newRev, json, id, oldRev];\n      } else {\n        sql = \'INSERT INTO \' + LOCAL_STORE$1 + \' (id, rev, json) VALUES (?,?,?)\';\n        values = [id, newRev, json];\n      }\n      tx.executeSql(sql, values, function (tx, res) {\n        if (res.rowsAffected) {\n          ret = {ok: true, id: id, rev: newRev};\n          if (opts.ctx) { // return immediately\n            callback(null, ret);\n          }\n        } else {\n          callback(createError(REV_CONFLICT));\n        }\n      }, function () {\n        callback(createError(REV_CONFLICT));\n        return false; // ack that we handled the error\n      });\n    }\n\n    if (opts.ctx) {\n      putLocal(opts.ctx);\n    } else {\n      db.transaction(putLocal, websqlError(callback), function () {\n        if (ret) {\n          callback(null, ret);\n        }\n      });\n    }\n  };\n\n  api._removeLocal = function (doc, opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    var ret;\n\n    function removeLocal(tx) {\n      var sql = \'DELETE FROM \' + LOCAL_STORE$1 + \' WHERE id=? AND rev=?\';\n      var params = [doc._id, doc._rev];\n      tx.executeSql(sql, params, function (tx, res) {\n        if (!res.rowsAffected) {\n          return callback(createError(MISSING_DOC));\n        }\n        ret = {ok: true, id: doc._id, rev: \'0-0\'};\n        if (opts.ctx) { // return immediately\n          callback(null, ret);\n        }\n      });\n    }\n\n    if (opts.ctx) {\n      removeLocal(opts.ctx);\n    } else {\n      db.transaction(removeLocal, websqlError(callback), function () {\n        if (ret) {\n          callback(null, ret);\n        }\n      });\n    }\n  };\n\n  api._destroy = function (opts, callback) {\n    websqlChanges.removeAllListeners(api._name);\n    db.transaction(function (tx) {\n      var stores = [DOC_STORE$1, BY_SEQ_STORE$1, ATTACH_STORE$1, META_STORE$1,\n        LOCAL_STORE$1, ATTACH_AND_SEQ_STORE$1];\n      stores.forEach(function (store) {\n        tx.executeSql(\'DROP TABLE IF EXISTS \' + store, []);\n      });\n    }, websqlError(callback), function () {\n      if (hasLocalStorage()) {\n        delete window.localStorage[\'_pouch__websqldb_\' + api._name];\n        delete window.localStorage[api._name];\n      }\n      callback(null, {\'ok\': true});\n    });\n  };\n}\n\nfunction canOpenTestDB() {\n  try {\n    openDatabase(\'_pouch_validate_websql\', 1, \'\', 1);\n    return true;\n  } catch (err) {\n    return false;\n  }\n}\n\n// WKWebView had a bug where WebSQL would throw a DOM Exception 18\n// (see https://bugs.webkit.org/show_bug.cgi?id=137760 and\n// https://github.com/pouchdb/pouchdb/issues/5079)\n// This has been fixed in latest WebKit, so we try to detect it here.\nfunction isValidWebSQL() {\n  // WKWebView UA:\n  //   Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X)\n  //   AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75\n  // Chrome for iOS UA:\n  //   Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en)\n  //   AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60\n  //   Mobile/9B206 Safari/7534.48.3\n  // Firefox for iOS UA:\n  //   Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4\n  //   (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4\n\n  // indexedDB is null on some UIWebViews and undefined in others\n  // see: https://bugs.webkit.org/show_bug.cgi?id=137034\n  if (typeof indexedDB === \'undefined\' || indexedDB === null ||\n      !/iP(hone|od|ad)/.test(navigator.userAgent)) {\n    // definitely not WKWebView, avoid creating an unnecessary database\n    return true;\n  }\n  // Cache the result in LocalStorage. Reason we do this is because if we\n  // call openDatabase() too many times, Safari craps out in SauceLabs and\n  // starts throwing DOM Exception 14s.\n  var hasLS = hasLocalStorage();\n  // Include user agent in the hash, so that if Safari is upgraded, we don\'t\n  // continually think it\'s broken.\n  var localStorageKey = \'_pouch__websqldb_valid_\' + navigator.userAgent;\n  if (hasLS && localStorage[localStorageKey]) {\n    return localStorage[localStorageKey] === \'1\';\n  }\n  var openedTestDB = canOpenTestDB();\n  if (hasLS) {\n    localStorage[localStorageKey] = openedTestDB ? \'1\' : \'0\';\n  }\n  return openedTestDB;\n}\n\nfunction validWithoutCheckingCordova() {\n  if (typeof openDatabase === \'undefined\') {\n    return false;\n  }\n  if (typeof sqlitePlugin !== \'undefined\') {\n    // Both sqlite-storage and SQLite Plugin 2 create this global object,\n    // which we can check for to determine validity. It should be defined\n    // after the \'deviceready\' event.\n    return true;\n  }\n  return isValidWebSQL();\n}\n\nfunction valid() {\n  // The Cordova SQLite Plugin and SQLite Plugin 2 can be used in cordova apps,\n  // and we can\'t know whether or not the plugin was loaded until after the\n  // \'deviceready\' event. Since it\'s impractical for us to wait for that event\n  // before returning true/false for valid(), we just return true here\n  // and notify the user that they may need a plugin.\n  if (typeof cordova !== \'undefined\') {\n    return true;\n  }\n  return validWithoutCheckingCordova();\n}\n\nfunction createOpenDBFunction(opts) {\n  return function (name, version, description, size) {\n    if (typeof sqlitePlugin !== \'undefined\') {\n      // The SQLite Plugin started deviating pretty heavily from the\n      // standard openDatabase() function, as they started adding more features.\n      // It\'s better to just use their "new" format and pass in a big ol\'\n      // options object. Also there are many options here that may come from\n      // the PouchDB constructor, so we have to grab those.\n      var sqlitePluginOpts = jsExtend.extend({}, opts, {\n        name: name,\n        version: version,\n        description: description,\n        size: size\n      });\n      return sqlitePlugin.openDatabase(sqlitePluginOpts);\n    }\n\n    // Traditional WebSQL API\n    return openDatabase(name, version, description, size);\n  };\n}\n\nfunction WebSQLPouch(opts, callback) {\n  var websql = createOpenDBFunction(opts);\n  var _opts = jsExtend.extend({\n    websql: websql\n  }, opts);\n\n  if (typeof cordova !== \'undefined\' && !validWithoutCheckingCordova()) {\n    guardedConsole(\'error\',\n      \'PouchDB error: you must install a SQLite plugin \' +\n      \'in order for PouchDB to work on this platform. Options:\' +\n      \'\\n - https://github.com/nolanlawson/cordova-plugin-sqlite-2\' +\n      \'\\n - https://github.com/litehelpers/Cordova-sqlite-storage\' +\n      \'\\n - https://github.com/Microsoft/cordova-plugin-websql\');\n  }\n\n  WebSqlPouch$1.call(this, _opts, callback);\n}\n\nWebSQLPouch.valid = valid;\n\nWebSQLPouch.use_prefix = true;\n\nfunction WebSqlPouch (PouchDB) {\n  PouchDB.adapter(\'websql\', WebSQLPouch, true);\n}\n\nfunction wrappedFetch() {\n  var wrappedPromise = {};\n\n  var promise = new PouchPromise(function (resolve, reject) {\n    wrappedPromise.resolve = resolve;\n    wrappedPromise.reject = reject;\n  });\n\n  var args = new Array(arguments.length);\n\n  for (var i = 0; i < args.length; i++) {\n    args[i] = arguments[i];\n  }\n\n  wrappedPromise.promise = promise;\n\n  PouchPromise.resolve().then(function () {\n    return fetch.apply(null, args);\n  }).then(function (response) {\n    wrappedPromise.resolve(response);\n  })["catch"](function (error) {\n    wrappedPromise.reject(error);\n  });\n\n  return wrappedPromise;\n}\n\nfunction fetchRequest(options, callback) {\n  var wrappedPromise, timer, response;\n\n  var headers = new Headers();\n\n  var fetchOptions = {\n    method: options.method,\n    credentials: \'include\',\n    headers: headers\n  };\n\n  if (options.json) {\n    headers.set(\'Accept\', \'application/json\');\n    headers.set(\'Content-Type\', options.headers[\'Content-Type\'] ||\n      \'application/json\');\n  }\n\n  if (options.body && (options.body instanceof Blob)) {\n    readAsArrayBuffer(options.body, function (arrayBuffer) {\n      fetchOptions.body = arrayBuffer;\n    });\n  } else if (options.body &&\n             options.processData &&\n             typeof options.body !== \'string\') {\n    fetchOptions.body = JSON.stringify(options.body);\n  } else if (\'body\' in options) {\n    fetchOptions.body = options.body;\n  } else {\n    fetchOptions.body = null;\n  }\n\n  Object.keys(options.headers).forEach(function (key) {\n    if (options.headers.hasOwnProperty(key)) {\n      headers.set(key, options.headers[key]);\n    }\n  });\n\n  wrappedPromise = wrappedFetch(options.url, fetchOptions);\n\n  if (options.timeout > 0) {\n    timer = setTimeout(function () {\n      wrappedPromise.reject(new Error(\'Load timeout for resource: \' +\n        options.url));\n    }, options.timeout);\n  }\n\n  wrappedPromise.promise.then(function (fetchResponse) {\n    response = {\n      statusCode: fetchResponse.status\n    };\n\n    if (options.timeout > 0) {\n      clearTimeout(timer);\n    }\n\n    if (response.statusCode >= 200 && response.statusCode < 300) {\n      return options.binary ? fetchResponse.blob() : fetchResponse.text();\n    }\n\n    return fetchResponse.json();\n  }).then(function (result) {\n    if (response.statusCode >= 200 && response.statusCode < 300) {\n      callback(null, response, result);\n    } else {\n      callback(result, response);\n    }\n  })["catch"](function (error) {\n    callback(error, response);\n  });\n\n  return {abort: wrappedPromise.reject};\n}\n\nfunction xhRequest(options, callback) {\n\n  var xhr, timer;\n  var timedout = false;\n\n  var abortReq = function () {\n    xhr.abort();\n  };\n\n  var timeoutReq = function () {\n    timedout = true;\n    xhr.abort();\n  };\n\n  if (options.xhr) {\n    xhr = new options.xhr();\n  } else {\n    xhr = new XMLHttpRequest();\n  }\n\n  try {\n    xhr.open(options.method, options.url);\n  } catch (exception) {\n    return callback(new Error(exception.name || \'Url is invalid\'));\n  }\n\n  xhr.withCredentials = (\'withCredentials\' in options) ?\n    options.withCredentials : true;\n\n  if (options.method === \'GET\') {\n    delete options.headers[\'Content-Type\'];\n  } else if (options.json) {\n    options.headers.Accept = \'application/json\';\n    options.headers[\'Content-Type\'] = options.headers[\'Content-Type\'] ||\n      \'application/json\';\n    if (options.body &&\n        options.processData &&\n        typeof options.body !== "string") {\n      options.body = JSON.stringify(options.body);\n    }\n  }\n\n  if (options.binary) {\n    xhr.responseType = \'arraybuffer\';\n  }\n\n  if (!(\'body\' in options)) {\n    options.body = null;\n  }\n\n  for (var key in options.headers) {\n    if (options.headers.hasOwnProperty(key)) {\n      xhr.setRequestHeader(key, options.headers[key]);\n    }\n  }\n\n  if (options.timeout > 0) {\n    timer = setTimeout(timeoutReq, options.timeout);\n    xhr.onprogress = function () {\n      clearTimeout(timer);\n      if(xhr.readyState !== 4) {\n        timer = setTimeout(timeoutReq, options.timeout);\n      }\n    };\n    if (typeof xhr.upload !== \'undefined\') { // does not exist in ie9\n      xhr.upload.onprogress = xhr.onprogress;\n    }\n  }\n\n  xhr.onreadystatechange = function () {\n    if (xhr.readyState !== 4) {\n      return;\n    }\n\n    var response = {\n      statusCode: xhr.status\n    };\n\n    if (xhr.status >= 200 && xhr.status < 300) {\n      var data;\n      if (options.binary) {\n        data = createBlob([xhr.response || \'\'], {\n          type: xhr.getResponseHeader(\'Content-Type\')\n        });\n      } else {\n        data = xhr.responseText;\n      }\n      callback(null, response, data);\n    } else {\n      var err = {};\n      if (timedout) {\n        err = new Error(\'ETIMEDOUT\');\n        err.code = \'ETIMEDOUT\';\n      } else {\n        try {\n          err = JSON.parse(xhr.response);\n        } catch(e) {}\n      }\n      err.status = xhr.status;\n      callback(err);\n    }\n  };\n\n  if (options.body && (options.body instanceof Blob)) {\n    readAsArrayBuffer(options.body, function (arrayBuffer) {\n      xhr.send(arrayBuffer);\n    });\n  } else {\n    xhr.send(options.body);\n  }\n\n  return {abort: abortReq};\n}\n\nfunction testXhr() {\n  try {\n    new XMLHttpRequest();\n    return true;\n  } catch (err) {\n    return false;\n  }\n}\n\nvar hasXhr = testXhr();\n\nfunction ajax$1(options, callback) {\n  if (hasXhr || options.xhr) {\n    return xhRequest(options, callback);\n  } else {\n    return fetchRequest(options, callback);\n  }\n}\n\n// the blob already has a type; do nothing\nvar res$2 = function () {};\n\nfunction defaultBody() {\n  return \'\';\n}\n\nfunction ajaxCore(options, callback) {\n\n  options = clone(options);\n\n  var defaultOptions = {\n    method : "GET",\n    headers: {},\n    json: true,\n    processData: true,\n    timeout: 10000,\n    cache: false\n  };\n\n  options = jsExtend.extend(defaultOptions, options);\n\n  function onSuccess(obj, resp, cb) {\n    if (!options.binary && options.json && typeof obj === \'string\') {\n      /* istanbul ignore next */\n      try {\n        obj = JSON.parse(obj);\n      } catch (e) {\n        // Probably a malformed JSON from server\n        return cb(e);\n      }\n    }\n    if (Array.isArray(obj)) {\n      obj = obj.map(function (v) {\n        if (v.error || v.missing) {\n          return generateErrorFromResponse(v);\n        } else {\n          return v;\n        }\n      });\n    }\n    if (options.binary) {\n      res$2(obj, resp);\n    }\n    cb(null, obj, resp);\n  }\n\n  if (options.json) {\n    if (!options.binary) {\n      options.headers.Accept = \'application/json\';\n    }\n    options.headers[\'Content-Type\'] = options.headers[\'Content-Type\'] ||\n      \'application/json\';\n  }\n\n  if (options.binary) {\n    options.encoding = null;\n    options.json = false;\n  }\n\n  if (!options.processData) {\n    options.json = false;\n  }\n\n  return ajax$1(options, function (err, response, body) {\n\n    if (err) {\n      return callback(generateErrorFromResponse(err));\n    }\n\n    var error;\n    var content_type = response.headers && response.headers[\'content-type\'];\n    var data = body || defaultBody();\n\n    // CouchDB doesn\'t always return the right content-type for JSON data, so\n    // we check for ^{ and }$ (ignoring leading/trailing whitespace)\n    if (!options.binary && (options.json || !options.processData) &&\n        typeof data !== \'object\' &&\n        (/json/.test(content_type) ||\n         (/^[\\s]*\\{/.test(data) && /\\}[\\s]*$/.test(data)))) {\n      try {\n        data = JSON.parse(data.toString());\n      } catch (e) {}\n    }\n\n    if (response.statusCode >= 200 && response.statusCode < 300) {\n      onSuccess(data, response, callback);\n    } else {\n      error = generateErrorFromResponse(data);\n      error.status = response.statusCode;\n      callback(error);\n    }\n  });\n}\n\nfunction ajax(opts, callback) {\n\n  // cache-buster, specifically designed to work around IE\'s aggressive caching\n  // see http://www.dashbay.com/2011/05/internet-explorer-caches-ajax/\n  // Also Safari caches POSTs, so we need to cache-bust those too.\n  var ua = (navigator && navigator.userAgent) ?\n    navigator.userAgent.toLowerCase() : \'\';\n\n  var isSafari = ua.indexOf(\'safari\') !== -1 && ua.indexOf(\'chrome\') === -1;\n  var isIE = ua.indexOf(\'msie\') !== -1;\n  var isEdge = ua.indexOf(\'edge\') !== -1;\n\n  // it appears the new version of safari also caches GETs,\n  // see https://github.com/pouchdb/pouchdb/issues/5010\n  var shouldCacheBust = (isSafari ||\n    ((isIE || isEdge) && opts.method === \'GET\'));\n\n  var cache = \'cache\' in opts ? opts.cache : true;\n\n  var isBlobUrl = /^blob:/.test(opts.url); // don\'t append nonces for blob URLs\n\n  if (!isBlobUrl && (shouldCacheBust || !cache)) {\n    var hasArgs = opts.url.indexOf(\'?\') !== -1;\n    opts.url += (hasArgs ? \'&\' : \'?\') + \'_nonce=\' + Date.now();\n  }\n\n  return ajaxCore(opts, callback);\n}\n\nvar CHANGES_BATCH_SIZE = 25;\nvar MAX_SIMULTANEOUS_REVS = 50;\n\nvar supportsBulkGetMap = {};\n\n// according to http://stackoverflow.com/a/417184/680742,\n// the de facto URL length limit is 2000 characters.\n// but since most of our measurements don\'t take the full\n// URL into account, we fudge it a bit.\n// TODO: we could measure the full URL to enforce exactly 2000 chars\nvar MAX_URL_LENGTH = 1800;\n\nvar log$1 = debug(\'pouchdb:http\');\n\nfunction readAttachmentsAsBlobOrBuffer(row) {\n  var atts = row.doc && row.doc._attachments;\n  if (!atts) {\n    return;\n  }\n  Object.keys(atts).forEach(function (filename) {\n    var att = atts[filename];\n    att.data = b64ToBluffer(att.data, att.content_type);\n  });\n}\n\nfunction encodeDocId(id) {\n  if (/^_design/.test(id)) {\n    return \'_design/\' + encodeURIComponent(id.slice(8));\n  }\n  if (/^_local/.test(id)) {\n    return \'_local/\' + encodeURIComponent(id.slice(7));\n  }\n  return encodeURIComponent(id);\n}\n\nfunction preprocessAttachments$1(doc) {\n  if (!doc._attachments || !Object.keys(doc._attachments)) {\n    return PouchPromise.resolve();\n  }\n\n  return PouchPromise.all(Object.keys(doc._attachments).map(function (key) {\n    var attachment = doc._attachments[key];\n    if (attachment.data && typeof attachment.data !== \'string\') {\n      return new PouchPromise(function (resolve) {\n        blobToBase64(attachment.data, resolve);\n      }).then(function (b64) {\n        attachment.data = b64;\n      });\n    }\n  }));\n}\n\n// Get all the information you possibly can about the URI given by name and\n// return it as a suitable object.\nfunction getHost(name) {\n  // Prase the URI into all its little bits\n  var uri = parseUri(name);\n\n  // Store the user and password as a separate auth object\n  if (uri.user || uri.password) {\n    uri.auth = {username: uri.user, password: uri.password};\n  }\n\n  // Split the path part of the URI into parts using \'/\' as the delimiter\n  // after removing any leading \'/\' and any trailing \'/\'\n  var parts = uri.path.replace(/(^\\/|\\/$)/g, \'\').split(\'/\');\n\n  // Store the first part as the database name and remove it from the parts\n  // array\n  uri.db = parts.pop();\n  // Prevent double encoding of URI component\n  if (uri.db.indexOf(\'%\') === -1) {\n    uri.db = encodeURIComponent(uri.db);\n  }\n\n  // Restore the path by joining all the remaining parts (all the parts\n  // except for the database name) with \'/\'s\n  uri.path = parts.join(\'/\');\n\n  return uri;\n}\n\n// Generate a URL with the host data given by opts and the given path\nfunction genDBUrl(opts, path) {\n  return genUrl(opts, opts.db + \'/\' + path);\n}\n\n// Generate a URL with the host data given by opts and the given path\nfunction genUrl(opts, path) {\n  // If the host already has a path, then we need to have a path delimiter\n  // Otherwise, the path delimiter is the empty string\n  var pathDel = !opts.path ? \'\' : \'/\';\n\n  // If the host already has a path, then we need to have a path delimiter\n  // Otherwise, the path delimiter is the empty string\n  return opts.protocol + \'://\' + opts.host +\n         (opts.port ? (\':\' + opts.port) : \'\') +\n         \'/\' + opts.path + pathDel + path;\n}\n\nfunction paramsToStr(params) {\n  return \'?\' + Object.keys(params).map(function (k) {\n    return k + \'=\' + encodeURIComponent(params[k]);\n  }).join(\'&\');\n}\n\n// Implements the PouchDB API for dealing with CouchDB instances over HTTP\nfunction HttpPouch(opts, callback) {\n  // The functions that will be publicly available for HttpPouch\n  var api = this;\n\n  // Parse the URI given by opts.name into an easy-to-use object\n  var getHostFun = getHost;\n\n  // TODO: this seems to only be used by yarong for the Thali project.\n  // Verify whether or not it\'s still needed.\n  /* istanbul ignore if */\n  if (opts.getHost) {\n    getHostFun = opts.getHost;\n  }\n\n  var host = getHostFun(opts.name, opts);\n  var dbUrl = genDBUrl(host, \'\');\n\n  opts = clone(opts);\n  var ajaxOpts = opts.ajax || {};\n\n  api.getUrl = function () { return dbUrl; };\n  api.getHeaders = function () { return ajaxOpts.headers || {}; };\n\n  if (opts.auth || host.auth) {\n    var nAuth = opts.auth || host.auth;\n    var str = nAuth.username + \':\' + nAuth.password;\n    var token = btoa$1(unescape(encodeURIComponent(str)));\n    ajaxOpts.headers = ajaxOpts.headers || {};\n    ajaxOpts.headers.Authorization = \'Basic \' + token;\n  }\n\n  // Not strictly necessary, but we do this because numerous tests\n  // rely on swapping ajax in and out.\n  api._ajax = ajax;\n\n  function ajax$$(userOpts, options, callback) {\n    var reqAjax = userOpts.ajax || {};\n    var reqOpts = jsExtend.extend(clone(ajaxOpts), reqAjax, options);\n    log$1(reqOpts.method + \' \' + reqOpts.url);\n    return api._ajax(reqOpts, callback);\n  }\n\n  function ajaxPromise(userOpts, opts) {\n    return new PouchPromise(function (resolve, reject) {\n      ajax$$(userOpts, opts, function (err, res) {\n        if (err) {\n          return reject(err);\n        }\n        resolve(res);\n      });\n    });\n  }\n\n  function adapterFun$$(name, fun) {\n    return adapterFun(name, getArguments(function (args) {\n      setup().then(function () {\n        return fun.apply(this, args);\n      })["catch"](function (e) {\n        var callback = args.pop();\n        callback(e);\n      });\n    }));\n  }\n\n  var setupPromise;\n\n  function setup() {\n    // TODO: Remove `skipSetup` in favor of `skip_setup` in a future release\n    if (opts.skipSetup || opts.skip_setup) {\n      return PouchPromise.resolve();\n    }\n\n    // If there is a setup in process or previous successful setup\n    // done then we will use that\n    // If previous setups have been rejected we will try again\n    if (setupPromise) {\n      return setupPromise;\n    }\n\n    var checkExists = {method: \'GET\', url: dbUrl};\n    setupPromise = ajaxPromise({}, checkExists)["catch"](function (err) {\n      if (err && err.status && err.status === 404) {\n        // Doesnt exist, create it\n        explainError(404, \'PouchDB is just detecting if the remote exists.\');\n        return ajaxPromise({}, {method: \'PUT\', url: dbUrl});\n      } else {\n        return PouchPromise.reject(err);\n      }\n    })["catch"](function (err) {\n      // If we try to create a database that already exists, skipped in\n      // istanbul since its catching a race condition.\n      /* istanbul ignore if */\n      if (err && err.status && err.status === 412) {\n        return true;\n      }\n      return PouchPromise.reject(err);\n    });\n\n    setupPromise["catch"](function () {\n      setupPromise = null;\n    });\n\n    return setupPromise;\n  }\n\n  setTimeout(function () {\n    callback(null, api);\n  });\n\n  api.type = function () {\n    return \'http\';\n  };\n\n  api.id = adapterFun$$(\'id\', function (callback) {\n    ajax$$({}, {method: \'GET\', url: genUrl(host, \'\')}, function (err, result) {\n      var uuid = (result && result.uuid) ?\n        (result.uuid + host.db) : genDBUrl(host, \'\');\n      callback(null, uuid);\n    });\n  });\n\n  api.request = adapterFun$$(\'request\', function (options, callback) {\n    options.url = genDBUrl(host, options.url);\n    ajax$$({}, options, callback);\n  });\n\n  // Sends a POST request to the host calling the couchdb _compact function\n  //    version: The version of CouchDB it is running\n  api.compact = adapterFun$$(\'compact\', function (opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    opts = clone(opts);\n    ajax$$(opts, {\n      url: genDBUrl(host, \'_compact\'),\n      method: \'POST\'\n    }, function () {\n      function ping() {\n        api.info(function (err, res) {\n          if (res && !res.compact_running) {\n            callback(null, {ok: true});\n          } else {\n            setTimeout(ping, opts.interval || 200);\n          }\n        });\n      }\n      // Ping the http if it\'s finished compaction\n      ping();\n    });\n  });\n\n  api.bulkGet = adapterFun(\'bulkGet\', function (opts, callback) {\n    var self = this;\n\n    function doBulkGet(cb) {\n      var params = {};\n      if (opts.revs) {\n        params.revs = true;\n      }\n      if (opts.attachments) {\n        /* istanbul ignore next */\n        params.attachments = true;\n      }\n      ajax$$({}, {\n        url: genDBUrl(host, \'_bulk_get\' + paramsToStr(params)),\n        method: \'POST\',\n        body: { docs: opts.docs}\n      }, cb);\n    }\n\n    function doBulkGetShim() {\n      // avoid "url too long error" by splitting up into multiple requests\n      var batchSize = MAX_SIMULTANEOUS_REVS;\n      var numBatches = Math.ceil(opts.docs.length / batchSize);\n      var numDone = 0;\n      var results = new Array(numBatches);\n\n      function onResult(batchNum) {\n        return function (err, res) {\n          // err is impossible because shim returns a list of errs in that case\n          results[batchNum] = res.results;\n          if (++numDone === numBatches) {\n            callback(null, {results: flatten(results)});\n          }\n        };\n      }\n\n      for (var i = 0; i < numBatches; i++) {\n        var subOpts = pick(opts, [\'revs\', \'attachments\']);\n        subOpts.ajax = ajaxOpts;\n        subOpts.docs = opts.docs.slice(i * batchSize,\n          Math.min(opts.docs.length, (i + 1) * batchSize));\n        bulkGet(self, subOpts, onResult(i));\n      }\n    }\n\n    // mark the whole database as either supporting or not supporting _bulk_get\n    var dbUrl = genUrl(host, \'\');\n    var supportsBulkGet = supportsBulkGetMap[dbUrl];\n\n    if (typeof supportsBulkGet !== \'boolean\') {\n      // check if this database supports _bulk_get\n      doBulkGet(function (err, res) {\n        /* istanbul ignore else */\n        if (err) {\n          var status = Math.floor(err.status / 100);\n          /* istanbul ignore else */\n          if (status === 4 || status === 5) { // 40x or 50x\n            supportsBulkGetMap[dbUrl] = false;\n            explainError(\n              err.status,\n              \'PouchDB is just detecting if the remote \' +\n              \'supports the _bulk_get API.\'\n            );\n            doBulkGetShim();\n          } else {\n            callback(err);\n          }\n        } else {\n          supportsBulkGetMap[dbUrl] = true;\n          callback(null, res);\n        }\n      });\n    } else if (supportsBulkGet) {\n      /* istanbul ignore next */\n      doBulkGet(callback);\n    } else {\n      doBulkGetShim();\n    }\n  });\n\n  // Calls GET on the host, which gets back a JSON string containing\n  //    couchdb: A welcome string\n  //    version: The version of CouchDB it is running\n  api._info = function (callback) {\n    setup().then(function () {\n      ajax$$({}, {\n        method: \'GET\',\n        url: genDBUrl(host, \'\')\n      }, function (err, res) {\n        /* istanbul ignore next */\n        if (err) {\n        return callback(err);\n        }\n        res.host = genDBUrl(host, \'\');\n        callback(null, res);\n      });\n    })["catch"](callback);\n  };\n\n  // Get the document with the given id from the database given by host.\n  // The id could be solely the _id in the database, or it may be a\n  // _design/ID or _local/ID path\n  api.get = adapterFun$$(\'get\', function (id, opts, callback) {\n    // If no options were given, set the callback to the second parameter\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    opts = clone(opts);\n\n    // List of parameters to add to the GET request\n    var params = {};\n\n    if (opts.revs) {\n      params.revs = true;\n    }\n\n    if (opts.revs_info) {\n      params.revs_info = true;\n    }\n\n    if (opts.open_revs) {\n      if (opts.open_revs !== "all") {\n        opts.open_revs = JSON.stringify(opts.open_revs);\n      }\n      params.open_revs = opts.open_revs;\n    }\n\n    if (opts.rev) {\n      params.rev = opts.rev;\n    }\n\n    if (opts.conflicts) {\n      params.conflicts = opts.conflicts;\n    }\n\n    id = encodeDocId(id);\n\n    // Set the options for the ajax call\n    var options = {\n      method: \'GET\',\n      url: genDBUrl(host, id + paramsToStr(params))\n    };\n\n    function fetchAttachments(doc) {\n      var atts = doc._attachments;\n      var filenames = atts && Object.keys(atts);\n      if (!atts || !filenames.length) {\n        return;\n      }\n      // we fetch these manually in separate XHRs, because\n      // Sync Gateway would normally send it back as multipart/mixed,\n      // which we cannot parse. Also, this is more efficient than\n      // receiving attachments as base64-encoded strings.\n      function fetch() {\n\n        if (!filenames.length) {\n          return null;\n        }\n\n        var filename = filenames.pop();\n        var att = atts[filename];\n        var path = encodeDocId(doc._id) + \'/\' + encodeAttachmentId(filename) +\n          \'?rev=\' + doc._rev;\n        return ajaxPromise(opts, {\n          method: \'GET\',\n          url: genDBUrl(host, path),\n          binary: true\n        }).then(function (blob) {\n          if (opts.binary) {\n            return blob;\n          }\n          return new PouchPromise(function (resolve) {\n            blobToBase64(blob, resolve);\n          });\n        }).then(function (data) {\n          delete att.stub;\n          delete att.length;\n          att.data = data;\n        });\n      }\n\n      // This limits the number of parallel xhr requests to 5 any time\n      // to avoid issues with maximum browser request limits\n      return new PromisePool(fetch, 5, {promise: PouchPromise}).start();\n    }\n\n    function fetchAllAttachments(docOrDocs) {\n      if (Array.isArray(docOrDocs)) {\n        return PouchPromise.all(docOrDocs.map(function (doc) {\n          if (doc.ok) {\n            return fetchAttachments(doc.ok);\n          }\n        }));\n      }\n      return fetchAttachments(docOrDocs);\n    }\n\n    ajaxPromise(opts, options).then(function (res) {\n      return PouchPromise.resolve().then(function () {\n        if (opts.attachments) {\n          return fetchAllAttachments(res);\n        }\n      }).then(function () {\n        callback(null, res);\n      });\n    })["catch"](callback);\n  });\n\n  // Delete the document given by doc from the database given by host.\n  api.remove = adapterFun$$(\'remove\',\n      function (docOrId, optsOrRev, opts, callback) {\n    var doc;\n    if (typeof optsOrRev === \'string\') {\n      // id, rev, opts, callback style\n      doc = {\n        _id: docOrId,\n        _rev: optsOrRev\n      };\n      if (typeof opts === \'function\') {\n        callback = opts;\n        opts = {};\n      }\n    } else {\n      // doc, opts, callback style\n      doc = docOrId;\n      if (typeof optsOrRev === \'function\') {\n        callback = optsOrRev;\n        opts = {};\n      } else {\n        callback = opts;\n        opts = optsOrRev;\n      }\n    }\n\n    var rev = (doc._rev || opts.rev);\n\n    // Delete the document\n    ajax$$(opts, {\n      method: \'DELETE\',\n      url: genDBUrl(host, encodeDocId(doc._id)) + \'?rev=\' + rev\n    }, callback);\n  });\n\n  function encodeAttachmentId(attachmentId) {\n    return attachmentId.split("/").map(encodeURIComponent).join("/");\n  }\n\n  // Get the attachment\n  api.getAttachment =\n    adapterFun$$(\'getAttachment\', function (docId, attachmentId, opts,\n                                                callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    var params = opts.rev ? (\'?rev=\' + opts.rev) : \'\';\n    var url = genDBUrl(host, encodeDocId(docId)) + \'/\' +\n      encodeAttachmentId(attachmentId) + params;\n    ajax$$(opts, {\n      method: \'GET\',\n      url: url,\n      binary: true\n    }, callback);\n  });\n\n  // Remove the attachment given by the id and rev\n  api.removeAttachment =\n    adapterFun$$(\'removeAttachment\', function (docId, attachmentId, rev,\n                                                   callback) {\n\n    var url = genDBUrl(host, encodeDocId(docId) + \'/\' +\n      encodeAttachmentId(attachmentId)) + \'?rev=\' + rev;\n\n    ajax$$({}, {\n      method: \'DELETE\',\n      url: url\n    }, callback);\n  });\n\n  // Add the attachment given by blob and its contentType property\n  // to the document with the given id, the revision given by rev, and\n  // add it to the database given by host.\n  api.putAttachment =\n    adapterFun$$(\'putAttachment\', function (docId, attachmentId, rev, blob,\n                                                type, callback) {\n    if (typeof type === \'function\') {\n      callback = type;\n      type = blob;\n      blob = rev;\n      rev = null;\n    }\n    var id = encodeDocId(docId) + \'/\' + encodeAttachmentId(attachmentId);\n    var url = genDBUrl(host, id);\n    if (rev) {\n      url += \'?rev=\' + rev;\n    }\n\n    if (typeof blob === \'string\') {\n      // input is assumed to be a base64 string\n      var binary;\n      try {\n        binary = atob$1(blob);\n      } catch (err) {\n        return callback(createError(BAD_ARG,\n                        \'Attachment is not a valid base64 string\'));\n      }\n      blob = binary ? binStringToBluffer(binary, type) : \'\';\n    }\n\n    var opts = {\n      headers: {\'Content-Type\': type},\n      method: \'PUT\',\n      url: url,\n      processData: false,\n      body: blob,\n      timeout: ajaxOpts.timeout || 60000\n    };\n    // Add the attachment\n    ajax$$({}, opts, callback);\n  });\n\n  // Update/create multiple documents given by req in the database\n  // given by host.\n  api._bulkDocs = function (req, opts, callback) {\n    // If new_edits=false then it prevents the database from creating\n    // new revision numbers for the documents. Instead it just uses\n    // the old ones. This is used in database replication.\n    req.new_edits = opts.new_edits;\n\n    setup().then(function () {\n      return PouchPromise.all(req.docs.map(preprocessAttachments$1));\n    }).then(function () {\n      // Update/create the documents\n      ajax$$(opts, {\n        method: \'POST\',\n        url: genDBUrl(host, \'_bulk_docs\'),\n        body: req\n      }, function (err, results) {\n        if (err) {\n          return callback(err);\n        }\n        results.forEach(function (result) {\n          result.ok = true; // smooths out cloudant not adding this\n        });\n        callback(null, results);\n      });\n    })["catch"](callback);\n  };\n\n  // Get a listing of the documents in the database given\n  // by host and ordered by increasing id.\n  api.allDocs = adapterFun$$(\'allDocs\', function (opts, callback) {\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n    opts = clone(opts);\n\n    // List of parameters to add to the GET request\n    var params = {};\n    var body;\n    var method = \'GET\';\n\n    if (opts.conflicts) {\n      params.conflicts = true;\n    }\n\n    if (opts.descending) {\n      params.descending = true;\n    }\n\n    if (opts.include_docs) {\n      params.include_docs = true;\n    }\n\n    // added in CouchDB 1.6.0\n    if (opts.attachments) {\n      params.attachments = true;\n    }\n\n    if (opts.key) {\n      params.key = JSON.stringify(opts.key);\n    }\n\n    if (opts.start_key) {\n      opts.startkey = opts.start_key;\n    }\n\n    if (opts.startkey) {\n      params.startkey = JSON.stringify(opts.startkey);\n    }\n\n    if (opts.end_key) {\n      opts.endkey = opts.end_key;\n    }\n\n    if (opts.endkey) {\n      params.endkey = JSON.stringify(opts.endkey);\n    }\n\n    if (typeof opts.inclusive_end !== \'undefined\') {\n      params.inclusive_end = !!opts.inclusive_end;\n    }\n\n    if (typeof opts.limit !== \'undefined\') {\n      params.limit = opts.limit;\n    }\n\n    if (typeof opts.skip !== \'undefined\') {\n      params.skip = opts.skip;\n    }\n\n    var paramStr = paramsToStr(params);\n\n    if (typeof opts.keys !== \'undefined\') {\n\n      var keysAsString =\n        \'keys=\' + encodeURIComponent(JSON.stringify(opts.keys));\n      if (keysAsString.length + paramStr.length + 1 <= MAX_URL_LENGTH) {\n        // If the keys are short enough, do a GET. we do this to work around\n        // Safari not understanding 304s on POSTs (see issue #1239)\n        paramStr += \'&\' + keysAsString;\n      } else {\n        // If keys are too long, issue a POST request to circumvent GET\n        // query string limits\n        // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options\n        method = \'POST\';\n        body = {keys: opts.keys};\n      }\n    }\n\n    // Get the document listing\n    ajaxPromise(opts, {\n      method: method,\n      url: genDBUrl(host, \'_all_docs\' + paramStr),\n      body: body\n    }).then(function (res) {\n      if (opts.include_docs && opts.attachments && opts.binary) {\n        res.rows.forEach(readAttachmentsAsBlobOrBuffer);\n      }\n      callback(null, res);\n    })["catch"](callback);\n  });\n\n  // Get a list of changes made to documents in the database given by host.\n  // TODO According to the README, there should be two other methods here,\n  // api.changes.addListener and api.changes.removeListener.\n  api._changes = function (opts) {\n\n    // We internally page the results of a changes request, this means\n    // if there is a large set of changes to be returned we can start\n    // processing them quicker instead of waiting on the entire\n    // set of changes to return and attempting to process them at once\n    var batchSize = \'batch_size\' in opts ? opts.batch_size : CHANGES_BATCH_SIZE;\n\n    opts = clone(opts);\n    opts.timeout = (\'timeout\' in opts) ? opts.timeout :\n      (\'timeout\' in ajaxOpts) ? ajaxOpts.timeout :\n      30 * 1000;\n\n    // We give a 5 second buffer for CouchDB changes to respond with\n    // an ok timeout (if a timeout it set)\n    var params = opts.timeout ? {timeout: opts.timeout - (5 * 1000)} : {};\n    var limit = (typeof opts.limit !== \'undefined\') ? opts.limit : false;\n    var returnDocs;\n    if (\'return_docs\' in opts) {\n      returnDocs = opts.return_docs;\n    } else if (\'returnDocs\' in opts) {\n      // TODO: Remove \'returnDocs\' in favor of \'return_docs\' in a future release\n      returnDocs = opts.returnDocs;\n    } else {\n      returnDocs = true;\n    }\n    //\n    var leftToFetch = limit;\n\n    if (opts.style) {\n      params.style = opts.style;\n    }\n\n    if (opts.include_docs || opts.filter && typeof opts.filter === \'function\') {\n      params.include_docs = true;\n    }\n\n    if (opts.attachments) {\n      params.attachments = true;\n    }\n\n    if (opts.continuous) {\n      params.feed = \'longpoll\';\n    }\n\n    if (opts.conflicts) {\n      params.conflicts = true;\n    }\n\n    if (opts.descending) {\n      params.descending = true;\n    }\n\n    if (\'heartbeat\' in opts) {\n      // If the heartbeat value is false, it disables the default heartbeat\n      if (opts.heartbeat) {\n        params.heartbeat = opts.heartbeat;\n      }\n    } else {\n      // Default heartbeat to 10 seconds\n      params.heartbeat = 10000;\n    }\n\n    if (opts.filter && typeof opts.filter === \'string\') {\n      params.filter = opts.filter;\n    }\n\n    if (opts.view && typeof opts.view === \'string\') {\n      params.filter = \'_view\';\n      params.view = opts.view;\n    }\n\n    // If opts.query_params exists, pass it through to the changes request.\n    // These parameters may be used by the filter on the source database.\n    if (opts.query_params && typeof opts.query_params === \'object\') {\n      for (var param_name in opts.query_params) {\n        /* istanbul ignore else */\n        if (opts.query_params.hasOwnProperty(param_name)) {\n          params[param_name] = opts.query_params[param_name];\n        }\n      }\n    }\n\n    var method = \'GET\';\n    var body;\n\n    if (opts.doc_ids) {\n      // set this automagically for the user; it\'s annoying that couchdb\n      // requires both a "filter" and a "doc_ids" param.\n      params.filter = \'_doc_ids\';\n\n      var docIdsJson = JSON.stringify(opts.doc_ids);\n\n      if (docIdsJson.length < MAX_URL_LENGTH) {\n        params.doc_ids = docIdsJson;\n      } else {\n        // anything greater than ~2000 is unsafe for gets, so\n        // use POST instead\n        method = \'POST\';\n        body = {doc_ids: opts.doc_ids };\n      }\n    }\n\n    var xhr;\n    var lastFetchedSeq;\n\n    // Get all the changes starting wtih the one immediately after the\n    // sequence number given by since.\n    var fetch = function (since, callback) {\n      if (opts.aborted) {\n        return;\n      }\n      params.since = since;\n      // "since" can be any kind of json object in Coudant/CouchDB 2.x\n      /* istanbul ignore next */\n      if (typeof params.since === "object") {\n        params.since = JSON.stringify(params.since);\n      }\n\n      if (opts.descending) {\n        if (limit) {\n          params.limit = leftToFetch;\n        }\n      } else {\n        params.limit = (!limit || leftToFetch > batchSize) ?\n          batchSize : leftToFetch;\n      }\n\n      // Set the options for the ajax call\n      var xhrOpts = {\n        method: method,\n        url: genDBUrl(host, \'_changes\' + paramsToStr(params)),\n        timeout: opts.timeout,\n        body: body\n      };\n      lastFetchedSeq = since;\n\n      /* istanbul ignore if */\n      if (opts.aborted) {\n        return;\n      }\n\n      // Get the changes\n      setup().then(function () {\n        xhr = ajax$$(opts, xhrOpts, callback);\n      })["catch"](callback);\n    };\n\n    // If opts.since exists, get all the changes from the sequence\n    // number given by opts.since. Otherwise, get all the changes\n    // from the sequence number 0.\n    var results = {results: []};\n\n    var fetched = function (err, res) {\n      if (opts.aborted) {\n        return;\n      }\n      var raw_results_length = 0;\n      // If the result of the ajax call (res) contains changes (res.results)\n      if (res && res.results) {\n        raw_results_length = res.results.length;\n        results.last_seq = res.last_seq;\n        // For each change\n        var req = {};\n        req.query = opts.query_params;\n        res.results = res.results.filter(function (c) {\n          leftToFetch--;\n          var ret = filterChange(opts)(c);\n          if (ret) {\n            if (opts.include_docs && opts.attachments && opts.binary) {\n              readAttachmentsAsBlobOrBuffer(c);\n            }\n            if (returnDocs) {\n              results.results.push(c);\n            }\n            opts.onChange(c);\n          }\n          return ret;\n        });\n      } else if (err) {\n        // In case of an error, stop listening for changes and call\n        // opts.complete\n        opts.aborted = true;\n        opts.complete(err);\n        return;\n      }\n\n      // The changes feed may have timed out with no results\n      // if so reuse last update sequence\n      if (res && res.last_seq) {\n        lastFetchedSeq = res.last_seq;\n      }\n\n      var finished = (limit && leftToFetch <= 0) ||\n        (res && raw_results_length < batchSize) ||\n        (opts.descending);\n\n      if ((opts.continuous && !(limit && leftToFetch <= 0)) || !finished) {\n        // Queue a call to fetch again with the newest sequence number\n        setTimeout(function () { fetch(lastFetchedSeq, fetched); }, 0);\n      } else {\n        // We\'re done, call the callback\n        opts.complete(null, results);\n      }\n    };\n\n    fetch(opts.since || 0, fetched);\n\n    // Return a method to cancel this method from processing any more\n    return {\n      cancel: function () {\n        opts.aborted = true;\n        if (xhr) {\n          xhr.abort();\n        }\n      }\n    };\n  };\n\n  // Given a set of document/revision IDs (given by req), tets the subset of\n  // those that do NOT correspond to revisions stored in the database.\n  // See http://wiki.apache.org/couchdb/HttpPostRevsDiff\n  api.revsDiff = adapterFun$$(\'revsDiff\', function (req, opts, callback) {\n    // If no options were given, set the callback to be the second parameter\n    if (typeof opts === \'function\') {\n      callback = opts;\n      opts = {};\n    }\n\n    // Get the missing document/revision IDs\n    ajax$$(opts, {\n      method: \'POST\',\n      url: genDBUrl(host, \'_revs_diff\'),\n      body: req\n    }, callback);\n  });\n\n  api._close = function (callback) {\n    callback();\n  };\n\n  api._destroy = function (options, callback) {\n    ajax$$(options, {\n      url: genDBUrl(host, \'\'),\n      method: \'DELETE\'\n    }, function (err, resp) {\n      if (err && err.status && err.status !== 404) {\n        return callback(err);\n      }\n      callback(null, resp);\n    });\n  };\n}\n\n// HttpPouch is a valid adapter.\nHttpPouch.valid = function () {\n  return true;\n};\n\nfunction HttpPouch$1 (PouchDB) {\n  PouchDB.adapter(\'http\', HttpPouch, false);\n  PouchDB.adapter(\'https\', HttpPouch, false);\n}\n\nfunction TaskQueue$1() {\n  this.promise = new PouchPromise(function (fulfill) {fulfill(); });\n}\nTaskQueue$1.prototype.add = function (promiseFactory) {\n  this.promise = this.promise["catch"](function () {\n    // just recover\n  }).then(function () {\n    return promiseFactory();\n  });\n  return this.promise;\n};\nTaskQueue$1.prototype.finish = function () {\n  return this.promise;\n};\n\nfunction createView(opts) {\n  var sourceDB = opts.db;\n  var viewName = opts.viewName;\n  var mapFun = opts.map;\n  var reduceFun = opts.reduce;\n  var temporary = opts.temporary;\n\n  // the "undefined" part is for backwards compatibility\n  var viewSignature = mapFun.toString() + (reduceFun && reduceFun.toString()) +\n    \'undefined\';\n\n  var cachedViews;\n  if (!temporary) {\n    // cache this to ensure we don\'t try to update the same view twice\n    cachedViews = sourceDB._cachedViews = sourceDB._cachedViews || {};\n    if (cachedViews[viewSignature]) {\n      return cachedViews[viewSignature];\n    }\n  }\n\n  var promiseForView = sourceDB.info().then(function (info) {\n\n    var depDbName = info.db_name + \'-mrview-\' +\n      (temporary ? \'temp\' : stringMd5(viewSignature));\n\n    // save the view name in the source db so it can be cleaned up if necessary\n    // (e.g. when the _design doc is deleted, remove all associated view data)\n    function diffFunction(doc) {\n      doc.views = doc.views || {};\n      var fullViewName = viewName;\n      if (fullViewName.indexOf(\'/\') === -1) {\n        fullViewName = viewName + \'/\' + viewName;\n      }\n      var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};\n      /* istanbul ignore if */\n      if (depDbs[depDbName]) {\n        return; // no update necessary\n      }\n      depDbs[depDbName] = true;\n      return doc;\n    }\n    return upsert(sourceDB, \'_local/mrviews\', diffFunction).then(function () {\n      return sourceDB.registerDependentDatabase(depDbName).then(function (res) {\n        var db = res.db;\n        db.auto_compaction = true;\n        var view = {\n          name: depDbName,\n          db: db,\n          sourceDB: sourceDB,\n          adapter: sourceDB.adapter,\n          mapFun: mapFun,\n          reduceFun: reduceFun\n        };\n        return view.db.get(\'_local/lastSeq\')["catch"](function (err) {\n          /* istanbul ignore if */\n          if (err.status !== 404) {\n            throw err;\n          }\n        }).then(function (lastSeqDoc) {\n          view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;\n          if (cachedViews) {\n            view.db.once(\'destroyed\', function () {\n              delete cachedViews[viewSignature];\n            });\n          }\n          return view;\n        });\n      });\n    });\n  });\n\n  if (cachedViews) {\n    cachedViews[viewSignature] = promiseForView;\n  }\n  return promiseForView;\n}\n\nfunction evalfunc(func, emit, sum, log, isArray, toJSON) {\n  return scopedEval(\n    "return (" + func.replace(/;\\s*$/, "") + ");",\n    {\n      emit: emit,\n      sum: sum,\n      log: log,\n      isArray: isArray,\n      toJSON: toJSON\n    }\n  );\n}\n\nvar promisedCallback = function (promise, callback) {\n  if (callback) {\n    promise.then(function (res) {\n      process.nextTick(function () {\n        callback(null, res);\n      });\n    }, function (reason) {\n      process.nextTick(function () {\n        callback(reason);\n      });\n    });\n  }\n  return promise;\n};\n\nvar callbackify = function (fun) {\n  return getArguments(function (args) {\n    var cb = args.pop();\n    var promise = fun.apply(this, args);\n    if (typeof cb === \'function\') {\n      promisedCallback(promise, cb);\n    }\n    return promise;\n  });\n};\n\n// Promise finally util similar to Q.finally\nvar fin = function (promise, finalPromiseFactory) {\n  return promise.then(function (res) {\n    return finalPromiseFactory().then(function () {\n      return res;\n    });\n  }, function (reason) {\n    return finalPromiseFactory().then(function () {\n      throw reason;\n    });\n  });\n};\n\nvar sequentialize = function (queue, promiseFactory) {\n  return function () {\n    var args = arguments;\n    var that = this;\n    return queue.add(function () {\n      return promiseFactory.apply(that, args);\n    });\n  };\n};\n\n// uniq an array of strings, order not guaranteed\n// similar to underscore/lodash _.uniq\nvar uniq = function (arr) {\n  var map = {};\n\n  for (var i = 0, len = arr.length; i < len; i++) {\n    map[\'$\' + arr[i]] = true;\n  }\n\n  var keys = Object.keys(map);\n  var output = new Array(keys.length);\n\n  for (i = 0, len = keys.length; i < len; i++) {\n    output[i] = keys[i].substring(1);\n  }\n  return output;\n};\n\nvar persistentQueues = {};\nvar tempViewQueue = new TaskQueue$1();\nvar CHANGES_BATCH_SIZE$1 = 50;\n\nvar log$2 = guardedConsole.bind(null, \'log\');\n\nfunction parseViewName(name) {\n  // can be either \'ddocname/viewname\' or just \'viewname\'\n  // (where the ddoc name is the same)\n  return name.indexOf(\'/\') === -1 ? [name, name] : name.split(\'/\');\n}\n\nfunction isGenOne(changes) {\n  // only return true if the current change is 1-\n  // and there are no other leafs\n  return changes.length === 1 && /^1-/.test(changes[0].rev);\n}\n\nfunction emitError(db, e) {\n  try {\n    db.emit(\'error\', e);\n  } catch (err) {\n    guardedConsole(\'error\',\n      \'The user\\\'s map/reduce function threw an uncaught error.\\n\' +\n      \'You can debug this error by doing:\\n\' +\n      \'myDatabase.on(\\\'error\\\', function (err) { debugger; });\\n\' +\n      \'Please double-check your map/reduce function.\');\n    guardedConsole(\'error\', e);\n  }\n}\n\nfunction tryCode$1(db, fun, args) {\n  // emit an event if there was an error thrown by a map/reduce function.\n  // putting try/catches in a single function also avoids deoptimizations.\n  try {\n    return {\n      output : fun.apply(null, args)\n    };\n  } catch (e) {\n    emitError(db, e);\n    return {error: e};\n  }\n}\n\nfunction sortByKeyThenValue(x, y) {\n  var keyCompare = pouchdbCollate.collate(x.key, y.key);\n  return keyCompare !== 0 ? keyCompare : pouchdbCollate.collate(x.value, y.value);\n}\n\nfunction sliceResults(results, limit, skip) {\n  skip = skip || 0;\n  if (typeof limit === \'number\') {\n    return results.slice(skip, limit + skip);\n  } else if (skip > 0) {\n    return results.slice(skip);\n  }\n  return results;\n}\n\nfunction rowToDocId(row) {\n  var val = row.value;\n  // Users can explicitly specify a joined doc _id, or it\n  // defaults to the doc _id that emitted the key/value.\n  var docId = (val && typeof val === \'object\' && val._id) || row.id;\n  return docId;\n}\n\nfunction readAttachmentsAsBlobOrBuffer$1(res) {\n  res.rows.forEach(function (row) {\n    var atts = row.doc && row.doc._attachments;\n    if (!atts) {\n      return;\n    }\n    Object.keys(atts).forEach(function (filename) {\n      var att = atts[filename];\n      atts[filename].data = b64ToBluffer(att.data, att.content_type);\n    });\n  });\n}\n\nfunction postprocessAttachments(opts) {\n  return function (res) {\n    if (opts.include_docs && opts.attachments && opts.binary) {\n      readAttachmentsAsBlobOrBuffer$1(res);\n    }\n    return res;\n  };\n}\n\nfunction createBuiltInError(name) {\n  var message = \'builtin \' + name +\n    \' function requires map values to be numbers\' +\n    \' or number arrays\';\n  return new BuiltInError(message);\n}\n\nfunction sum(values) {\n  var result = 0;\n  for (var i = 0, len = values.length; i < len; i++) {\n    var num = values[i];\n    if (typeof num !== \'number\') {\n      if (Array.isArray(num)) {\n        // lists of numbers are also allowed, sum them separately\n        result = typeof result === \'number\' ? [result] : result;\n        for (var j = 0, jLen = num.length; j < jLen; j++) {\n          var jNum = num[j];\n          if (typeof jNum !== \'number\') {\n            throw createBuiltInError(\'_sum\');\n          } else if (typeof result[j] === \'undefined\') {\n            result.push(jNum);\n          } else {\n            result[j] += jNum;\n          }\n        }\n      } else { // not array/number\n        throw createBuiltInError(\'_sum\');\n      }\n    } else if (typeof result === \'number\') {\n      result += num;\n    } else { // add number to array\n      result[0] += num;\n    }\n  }\n  return result;\n}\n\nvar builtInReduce = {\n  _sum: function (keys, values) {\n    return sum(values);\n  },\n\n  _count: function (keys, values) {\n    return values.length;\n  },\n\n  _stats: function (keys, values) {\n    // no need to implement rereduce=true, because Pouch\n    // will never call it\n    function sumsqr(values) {\n      var _sumsqr = 0;\n      for (var i = 0, len = values.length; i < len; i++) {\n        var num = values[i];\n        _sumsqr += (num * num);\n      }\n      return _sumsqr;\n    }\n    return {\n      sum     : sum(values),\n      min     : Math.min.apply(null, values),\n      max     : Math.max.apply(null, values),\n      count   : values.length,\n      sumsqr : sumsqr(values)\n    };\n  }\n};\n\nfunction addHttpParam(paramName, opts, params, asJson) {\n  // add an http param from opts to params, optionally json-encoded\n  var val = opts[paramName];\n  if (typeof val !== \'undefined\') {\n    if (asJson) {\n      val = encodeURIComponent(JSON.stringify(val));\n    }\n    params.push(paramName + \'=\' + val);\n  }\n}\n\nfunction coerceInteger(integerCandidate) {\n  if (typeof integerCandidate !== \'undefined\') {\n    var asNumber = Number(integerCandidate);\n    // prevents e.g. \'1foo\' or \'1.1\' being coerced to 1\n    if (!isNaN(asNumber) && asNumber === parseInt(integerCandidate, 10)) {\n      return asNumber;\n    } else {\n      return integerCandidate;\n    }\n  }\n}\n\nfunction coerceOptions(opts) {\n  opts.group_level = coerceInteger(opts.group_level);\n  opts.limit = coerceInteger(opts.limit);\n  opts.skip = coerceInteger(opts.skip);\n  return opts;\n}\n\nfunction checkPositiveInteger(number) {\n  if (number) {\n    if (typeof number !== \'number\') {\n      return  new QueryParseError(\'Invalid value for integer: "\' +\n      number + \'"\');\n    }\n    if (number < 0) {\n      return new QueryParseError(\'Invalid value for positive integer: \' +\n        \'"\' + number + \'"\');\n    }\n  }\n}\n\nfunction checkQueryParseError(options, fun) {\n  var startkeyName = options.descending ? \'endkey\' : \'startkey\';\n  var endkeyName = options.descending ? \'startkey\' : \'endkey\';\n\n  if (typeof options[startkeyName] !== \'undefined\' &&\n    typeof options[endkeyName] !== \'undefined\' &&\n    pouchdbCollate.collate(options[startkeyName], options[endkeyName]) > 0) {\n    throw new QueryParseError(\'No rows can match your key range, \' +\n    \'reverse your start_key and end_key or set {descending : true}\');\n  } else if (fun.reduce && options.reduce !== false) {\n    if (options.include_docs) {\n      throw new QueryParseError(\'{include_docs:true} is invalid for reduce\');\n    } else if (options.keys && options.keys.length > 1 &&\n        !options.group && !options.group_level) {\n      throw new QueryParseError(\'Multi-key fetches for reduce views must use \' +\n      \'{group: true}\');\n    }\n  }\n  [\'group_level\', \'limit\', \'skip\'].forEach(function (optionName) {\n    var error = checkPositiveInteger(options[optionName]);\n    if (error) {\n      throw error;\n    }\n  });\n}\n\nfunction httpQuery(db, fun, opts) {\n  // List of parameters to add to the PUT request\n  var params = [];\n  var body;\n  var method = \'GET\';\n\n  // If opts.reduce exists and is defined, then add it to the list\n  // of parameters.\n  // If reduce=false then the results are that of only the map function\n  // not the final result of map and reduce.\n  addHttpParam(\'reduce\', opts, params);\n  addHttpParam(\'include_docs\', opts, params);\n  addHttpParam(\'attachments\', opts, params);\n  addHttpParam(\'limit\', opts, params);\n  addHttpParam(\'descending\', opts, params);\n  addHttpParam(\'group\', opts, params);\n  addHttpParam(\'group_level\', opts, params);\n  addHttpParam(\'skip\', opts, params);\n  addHttpParam(\'stale\', opts, params);\n  addHttpParam(\'conflicts\', opts, params);\n  addHttpParam(\'startkey\', opts, params, true);\n  addHttpParam(\'start_key\', opts, params, true);\n  addHttpParam(\'endkey\', opts, params, true);\n  addHttpParam(\'end_key\', opts, params, true);\n  addHttpParam(\'inclusive_end\', opts, params);\n  addHttpParam(\'key\', opts, params, true);\n\n  // Format the list of parameters into a valid URI query string\n  params = params.join(\'&\');\n  params = params === \'\' ? \'\' : \'?\' + params;\n\n  // If keys are supplied, issue a POST to circumvent GET query string limits\n  // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options\n  if (typeof opts.keys !== \'undefined\') {\n    var MAX_URL_LENGTH = 2000;\n    // according to http://stackoverflow.com/a/417184/680742,\n    // the de facto URL length limit is 2000 characters\n\n    var keysAsString =\n      \'keys=\' + encodeURIComponent(JSON.stringify(opts.keys));\n    if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {\n      // If the keys are short enough, do a GET. we do this to work around\n      // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)\n      params += (params[0] === \'?\' ? \'&\' : \'?\') + keysAsString;\n    } else {\n      method = \'POST\';\n      if (typeof fun === \'string\') {\n        body = {keys: opts.keys};\n      } else { // fun is {map : mapfun}, so append to this\n        fun.keys = opts.keys;\n      }\n    }\n  }\n\n  // We are referencing a query defined in the design doc\n  if (typeof fun === \'string\') {\n    var parts = parseViewName(fun);\n    return db.request({\n      method: method,\n      url: \'_design/\' + parts[0] + \'/_view/\' + parts[1] + params,\n      body: body\n    }).then(postprocessAttachments(opts));\n  }\n\n  // We are using a temporary view, terrible for performance, good for testing\n  body = body || {};\n  Object.keys(fun).forEach(function (key) {\n    if (Array.isArray(fun[key])) {\n      body[key] = fun[key];\n    } else {\n      body[key] = fun[key].toString();\n    }\n  });\n  return db.request({\n    method: \'POST\',\n    url: \'_temp_view\' + params,\n    body: body\n  }).then(postprocessAttachments(opts));\n}\n\n// custom adapters can define their own api._query\n// and override the default behavior\n/* istanbul ignore next */\nfunction customQuery(db, fun, opts) {\n  return new PouchPromise(function (resolve, reject) {\n    db._query(fun, opts, function (err, res) {\n      if (err) {\n        return reject(err);\n      }\n      resolve(res);\n    });\n  });\n}\n\n// custom adapters can define their own api._viewCleanup\n// and override the default behavior\n/* istanbul ignore next */\nfunction customViewCleanup(db) {\n  return new PouchPromise(function (resolve, reject) {\n    db._viewCleanup(function (err, res) {\n      if (err) {\n        return reject(err);\n      }\n      resolve(res);\n    });\n  });\n}\n\nfunction defaultsTo(value) {\n  return function (reason) {\n    /* istanbul ignore else */\n    if (reason.status === 404) {\n      return value;\n    } else {\n      throw reason;\n    }\n  };\n}\n\n// returns a promise for a list of docs to update, based on the input docId.\n// the order doesn\'t matter, because post-3.2.0, bulkDocs\n// is an atomic operation in all three adapters.\nfunction getDocsToPersist(docId, view, docIdsToChangesAndEmits) {\n  var metaDocId = \'_local/doc_\' + docId;\n  var defaultMetaDoc = {_id: metaDocId, keys: []};\n  var docData = docIdsToChangesAndEmits[docId];\n  var indexableKeysToKeyValues = docData.indexableKeysToKeyValues;\n  var changes = docData.changes;\n\n  function getMetaDoc() {\n    if (isGenOne(changes)) {\n      // generation 1, so we can safely assume initial state\n      // for performance reasons (avoids unnecessary GETs)\n      return PouchPromise.resolve(defaultMetaDoc);\n    }\n    return view.db.get(metaDocId)["catch"](defaultsTo(defaultMetaDoc));\n  }\n\n  function getKeyValueDocs(metaDoc) {\n    if (!metaDoc.keys.length) {\n      // no keys, no need for a lookup\n      return PouchPromise.resolve({rows: []});\n    }\n    return view.db.allDocs({\n      keys: metaDoc.keys,\n      include_docs: true\n    });\n  }\n\n  function processKvDocs(metaDoc, kvDocsRes) {\n    var kvDocs = [];\n    var oldKeysMap = {};\n\n    for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {\n      var row = kvDocsRes.rows[i];\n      var doc = row.doc;\n      if (!doc) { // deleted\n        continue;\n      }\n      kvDocs.push(doc);\n      oldKeysMap[doc._id] = true;\n      doc._deleted = !indexableKeysToKeyValues[doc._id];\n      if (!doc._deleted) {\n        var keyValue = indexableKeysToKeyValues[doc._id];\n        if (\'value\' in keyValue) {\n          doc.value = keyValue.value;\n        }\n      }\n    }\n\n    var newKeys = Object.keys(indexableKeysToKeyValues);\n    newKeys.forEach(function (key) {\n      if (!oldKeysMap[key]) {\n        // new doc\n        var kvDoc = {\n          _id: key\n        };\n        var keyValue = indexableKeysToKeyValues[key];\n        if (\'value\' in keyValue) {\n          kvDoc.value = keyValue.value;\n        }\n        kvDocs.push(kvDoc);\n      }\n    });\n    metaDoc.keys = uniq(newKeys.concat(metaDoc.keys));\n    kvDocs.push(metaDoc);\n\n    return kvDocs;\n  }\n\n  return getMetaDoc().then(function (metaDoc) {\n    return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {\n      return processKvDocs(metaDoc, kvDocsRes);\n    });\n  });\n}\n\n// updates all emitted key/value docs and metaDocs in the mrview database\n// for the given batch of documents from the source database\nfunction saveKeyValues(view, docIdsToChangesAndEmits, seq) {\n  var seqDocId = \'_local/lastSeq\';\n  return view.db.get(seqDocId)[\n  "catch"](defaultsTo({_id: seqDocId, seq: 0}))\n  .then(function (lastSeqDoc) {\n    var docIds = Object.keys(docIdsToChangesAndEmits);\n    return PouchPromise.all(docIds.map(function (docId) {\n      return getDocsToPersist(docId, view, docIdsToChangesAndEmits);\n    })).then(function (listOfDocsToPersist) {\n      var docsToPersist = flatten(listOfDocsToPersist);\n      lastSeqDoc.seq = seq;\n      docsToPersist.push(lastSeqDoc);\n      // write all docs in a single operation, update the seq once\n      return view.db.bulkDocs({docs : docsToPersist});\n    });\n  });\n}\n\nfunction getQueue(view) {\n  var viewName = typeof view === \'string\' ? view : view.name;\n  var queue = persistentQueues[viewName];\n  if (!queue) {\n    queue = persistentQueues[viewName] = new TaskQueue$1();\n  }\n  return queue;\n}\n\nfunction updateView(view) {\n  return sequentialize(getQueue(view), function () {\n    return updateViewInQueue(view);\n  })();\n}\n\nfunction updateViewInQueue(view) {\n  // bind the emit function once\n  var mapResults;\n  var doc;\n\n  function emit(key, value) {\n    var output = {id: doc._id, key: pouchdbCollate.normalizeKey(key)};\n    // Don\'t explicitly store the value unless it\'s defined and non-null.\n    // This saves on storage space, because often people don\'t use it.\n    if (typeof value !== \'undefined\' && value !== null) {\n      output.value = pouchdbCollate.normalizeKey(value);\n    }\n    mapResults.push(output);\n  }\n\n  var mapFun;\n  // for temp_views one can use emit(doc, emit), see #38\n  if (typeof view.mapFun === "function" && view.mapFun.length === 2) {\n    var origMap = view.mapFun;\n    mapFun = function (doc) {\n      return origMap(doc, emit);\n    };\n  } else {\n    mapFun = evalfunc(view.mapFun.toString(), emit, sum, log$2, Array.isArray,\n      JSON.parse);\n  }\n\n  var currentSeq = view.seq || 0;\n\n  function processChange(docIdsToChangesAndEmits, seq) {\n    return function () {\n      return saveKeyValues(view, docIdsToChangesAndEmits, seq);\n    };\n  }\n\n  var queue = new TaskQueue$1();\n  // TODO(neojski): https://github.com/daleharvey/pouchdb/issues/1521\n\n  return new PouchPromise(function (resolve, reject) {\n\n    function complete() {\n      queue.finish().then(function () {\n        view.seq = currentSeq;\n        resolve();\n      });\n    }\n\n    function processNextBatch() {\n      view.sourceDB.changes({\n        conflicts: true,\n        include_docs: true,\n        style: \'all_docs\',\n        since: currentSeq,\n        limit: CHANGES_BATCH_SIZE$1\n      }).on(\'complete\', function (response) {\n        var results = response.results;\n        if (!results.length) {\n          return complete();\n        }\n        var docIdsToChangesAndEmits = {};\n        for (var i = 0, l = results.length; i < l; i++) {\n          var change = results[i];\n          if (change.doc._id[0] !== \'_\') {\n            mapResults = [];\n            doc = change.doc;\n\n            if (!doc._deleted) {\n              tryCode$1(view.sourceDB, mapFun, [doc]);\n            }\n            mapResults.sort(sortByKeyThenValue);\n\n            var indexableKeysToKeyValues = {};\n            var lastKey;\n            for (var j = 0, jl = mapResults.length; j < jl; j++) {\n              var obj = mapResults[j];\n              var complexKey = [obj.key, obj.id];\n              if (pouchdbCollate.collate(obj.key, lastKey) === 0) {\n                complexKey.push(j); // dup key+id, so make it unique\n              }\n              var indexableKey = pouchdbCollate.toIndexableString(complexKey);\n              indexableKeysToKeyValues[indexableKey] = obj;\n              lastKey = obj.key;\n            }\n            docIdsToChangesAndEmits[change.doc._id] = {\n              indexableKeysToKeyValues: indexableKeysToKeyValues,\n              changes: change.changes\n            };\n          }\n          currentSeq = change.seq;\n        }\n        queue.add(processChange(docIdsToChangesAndEmits, currentSeq));\n        if (results.length < CHANGES_BATCH_SIZE$1) {\n          return complete();\n        }\n        return processNextBatch();\n      }).on(\'error\', onError);\n      /* istanbul ignore next */\n      function onError(err) {\n        reject(err);\n      }\n    }\n\n    processNextBatch();\n  });\n}\n\nfunction reduceView(view, results, options) {\n  if (options.group_level === 0) {\n    delete options.group_level;\n  }\n\n  var shouldGroup = options.group || options.group_level;\n\n  var reduceFun;\n  if (builtInReduce[view.reduceFun]) {\n    reduceFun = builtInReduce[view.reduceFun];\n  } else {\n    reduceFun = evalfunc(\n      view.reduceFun.toString(), null, sum, log$2, Array.isArray, JSON.parse);\n  }\n\n  var groups = [];\n  var lvl = isNaN(options.group_level) ? Number.POSITIVE_INFINITY :\n    options.group_level;\n  results.forEach(function (e) {\n    var last = groups[groups.length - 1];\n    var groupKey = shouldGroup ? e.key : null;\n\n    // only set group_level for array keys\n    if (shouldGroup && Array.isArray(groupKey)) {\n      groupKey = groupKey.slice(0, lvl);\n    }\n\n    if (last && pouchdbCollate.collate(last.groupKey, groupKey) === 0) {\n      last.keys.push([e.key, e.id]);\n      last.values.push(e.value);\n      return;\n    }\n    groups.push({\n      keys: [[e.key, e.id]],\n      values: [e.value],\n      groupKey: groupKey\n    });\n  });\n  results = [];\n  for (var i = 0, len = groups.length; i < len; i++) {\n    var e = groups[i];\n    var reduceTry = tryCode$1(view.sourceDB, reduceFun,\n      [e.keys, e.values, false]);\n    if (reduceTry.error && reduceTry.error instanceof BuiltInError) {\n      // CouchDB returns an error if a built-in errors out\n      throw reduceTry.error;\n    }\n    results.push({\n      // CouchDB just sets the value to null if a non-built-in errors out\n      value: reduceTry.error ? null : reduceTry.output,\n      key: e.groupKey\n    });\n  }\n  // no total_rows/offset when reducing\n  return {rows: sliceResults(results, options.limit, options.skip)};\n}\n\nfunction queryView(view, opts) {\n  return sequentialize(getQueue(view), function () {\n    return queryViewInQueue(view, opts);\n  })();\n}\n\nfunction queryViewInQueue(view, opts) {\n  var totalRows;\n  var shouldReduce = view.reduceFun && opts.reduce !== false;\n  var skip = opts.skip || 0;\n  if (typeof opts.keys !== \'undefined\' && !opts.keys.length) {\n    // equivalent query\n    opts.limit = 0;\n    delete opts.keys;\n  }\n\n  function fetchFromView(viewOpts) {\n    viewOpts.include_docs = true;\n    return view.db.allDocs(viewOpts).then(function (res) {\n      totalRows = res.total_rows;\n      return res.rows.map(function (result) {\n\n        // implicit migration - in older versions of PouchDB,\n        // we explicitly stored the doc as {id: ..., key: ..., value: ...}\n        // this is tested in a migration test\n        /* istanbul ignore next */\n        if (\'value\' in result.doc && typeof result.doc.value === \'object\' &&\n            result.doc.value !== null) {\n          var keys = Object.keys(result.doc.value).sort();\n          // this detection method is not perfect, but it\'s unlikely the user\n          // emitted a value which was an object with these 3 exact keys\n          var expectedKeys = [\'id\', \'key\', \'value\'];\n          if (!(keys < expectedKeys || keys > expectedKeys)) {\n            return result.doc.value;\n          }\n        }\n\n        var parsedKeyAndDocId = pouchdbCollate.parseIndexableString(result.doc._id);\n        return {\n          key: parsedKeyAndDocId[0],\n          id: parsedKeyAndDocId[1],\n          value: (\'value\' in result.doc ? result.doc.value : null)\n        };\n      });\n    });\n  }\n\n  function onMapResultsReady(rows) {\n    var finalResults;\n    if (shouldReduce) {\n      finalResults = reduceView(view, rows, opts);\n    } else {\n      finalResults = {\n        total_rows: totalRows,\n        offset: skip,\n        rows: rows\n      };\n    }\n    if (opts.include_docs) {\n      var docIds = uniq(rows.map(rowToDocId));\n\n      return view.sourceDB.allDocs({\n        keys: docIds,\n        include_docs: true,\n        conflicts: opts.conflicts,\n        attachments: opts.attachments,\n        binary: opts.binary\n      }).then(function (allDocsRes) {\n        var docIdsToDocs = {};\n        allDocsRes.rows.forEach(function (row) {\n          if (row.doc) {\n            docIdsToDocs[\'$\' + row.id] = row.doc;\n          }\n        });\n        rows.forEach(function (row) {\n          var docId = rowToDocId(row);\n          var doc = docIdsToDocs[\'$\' + docId];\n          if (doc) {\n            row.doc = doc;\n          }\n        });\n        return finalResults;\n      });\n    } else {\n      return finalResults;\n    }\n  }\n\n  if (typeof opts.keys !== \'undefined\') {\n    var keys = opts.keys;\n    var fetchPromises = keys.map(function (key) {\n      var viewOpts = {\n        startkey : pouchdbCollate.toIndexableString([key]),\n        endkey   : pouchdbCollate.toIndexableString([key, {}])\n      };\n      return fetchFromView(viewOpts);\n    });\n    return PouchPromise.all(fetchPromises).then(flatten).then(onMapResultsReady);\n  } else { // normal query, no \'keys\'\n    var viewOpts = {\n      descending : opts.descending\n    };\n    if (opts.start_key) {\n        opts.startkey = opts.start_key;\n    }\n    if (opts.end_key) {\n        opts.endkey = opts.end_key;\n    }\n    if (typeof opts.startkey !== \'undefined\') {\n      viewOpts.startkey = opts.descending ?\n        pouchdbCollate.toIndexableString([opts.startkey, {}]) :\n        pouchdbCollate.toIndexableString([opts.startkey]);\n    }\n    if (typeof opts.endkey !== \'undefined\') {\n      var inclusiveEnd = opts.inclusive_end !== false;\n      if (opts.descending) {\n        inclusiveEnd = !inclusiveEnd;\n      }\n\n      viewOpts.endkey = pouchdbCollate.toIndexableString(\n        inclusiveEnd ? [opts.endkey, {}] : [opts.endkey]);\n    }\n    if (typeof opts.key !== \'undefined\') {\n      var keyStart = pouchdbCollate.toIndexableString([opts.key]);\n      var keyEnd = pouchdbCollate.toIndexableString([opts.key, {}]);\n      if (viewOpts.descending) {\n        viewOpts.endkey = keyStart;\n        viewOpts.startkey = keyEnd;\n      } else {\n        viewOpts.startkey = keyStart;\n        viewOpts.endkey = keyEnd;\n      }\n    }\n    if (!shouldReduce) {\n      if (typeof opts.limit === \'number\') {\n        viewOpts.limit = opts.limit;\n      }\n      viewOpts.skip = skip;\n    }\n    return fetchFromView(viewOpts).then(onMapResultsReady);\n  }\n}\n\nfunction httpViewCleanup(db) {\n  return db.request({\n    method: \'POST\',\n    url: \'_view_cleanup\'\n  });\n}\n\nfunction localViewCleanup(db) {\n  return db.get(\'_local/mrviews\').then(function (metaDoc) {\n    var docsToViews = {};\n    Object.keys(metaDoc.views).forEach(function (fullViewName) {\n      var parts = parseViewName(fullViewName);\n      var designDocName = \'_design/\' + parts[0];\n      var viewName = parts[1];\n      docsToViews[designDocName] = docsToViews[designDocName] || {};\n      docsToViews[designDocName][viewName] = true;\n    });\n    var opts = {\n      keys : Object.keys(docsToViews),\n      include_docs : true\n    };\n    return db.allDocs(opts).then(function (res) {\n      var viewsToStatus = {};\n      res.rows.forEach(function (row) {\n        var ddocName = row.key.substring(8);\n        Object.keys(docsToViews[row.key]).forEach(function (viewName) {\n          var fullViewName = ddocName + \'/\' + viewName;\n          /* istanbul ignore if */\n          if (!metaDoc.views[fullViewName]) {\n            // new format, without slashes, to support PouchDB 2.2.0\n            // migration test in pouchdb\'s browser.migration.js verifies this\n            fullViewName = viewName;\n          }\n          var viewDBNames = Object.keys(metaDoc.views[fullViewName]);\n          // design doc deleted, or view function nonexistent\n          var statusIsGood = row.doc && row.doc.views &&\n            row.doc.views[viewName];\n          viewDBNames.forEach(function (viewDBName) {\n            viewsToStatus[viewDBName] =\n              viewsToStatus[viewDBName] || statusIsGood;\n          });\n        });\n      });\n      var dbsToDelete = Object.keys(viewsToStatus).filter(\n        function (viewDBName) { return !viewsToStatus[viewDBName]; });\n      var destroyPromises = dbsToDelete.map(function (viewDBName) {\n        return sequentialize(getQueue(viewDBName), function () {\n          return new db.constructor(viewDBName, db.__opts).destroy();\n        })();\n      });\n      return PouchPromise.all(destroyPromises).then(function () {\n        return {ok: true};\n      });\n    });\n  }, defaultsTo({ok: true}));\n}\n\nvar viewCleanup = callbackify(function () {\n  var db = this;\n  if (db.type() === \'http\') {\n    return httpViewCleanup(db);\n  }\n  /* istanbul ignore next */\n  if (typeof db._viewCleanup === \'function\') {\n    return customViewCleanup(db);\n  }\n  return localViewCleanup(db);\n});\n\nfunction queryPromised(db, fun, opts) {\n  if (db.type() === \'http\') {\n    return httpQuery(db, fun, opts);\n  }\n\n  /* istanbul ignore next */\n  if (typeof db._query === \'function\') {\n    return customQuery(db, fun, opts);\n  }\n\n  if (typeof fun !== \'string\') {\n    // temp_view\n    checkQueryParseError(opts, fun);\n\n    var createViewOpts = {\n      db : db,\n      viewName : \'temp_view/temp_view\',\n      map : fun.map,\n      reduce : fun.reduce,\n      temporary : true\n    };\n    tempViewQueue.add(function () {\n      return createView(createViewOpts).then(function (view) {\n        function cleanup() {\n          return view.db.destroy();\n        }\n        return fin(updateView(view).then(function () {\n          return queryView(view, opts);\n        }), cleanup);\n      });\n    });\n    return tempViewQueue.finish();\n  } else {\n    // persistent view\n    var fullViewName = fun;\n    var parts = parseViewName(fullViewName);\n    var designDocName = parts[0];\n    var viewName = parts[1];\n    return db.get(\'_design/\' + designDocName).then(function (doc) {\n      var fun = doc.views && doc.views[viewName];\n\n      if (!fun || typeof fun.map !== \'string\') {\n        throw new NotFoundError(\'ddoc \' + designDocName +\n        \' has no view named \' + viewName);\n      }\n      checkQueryParseError(opts, fun);\n\n      var createViewOpts = {\n        db : db,\n        viewName : fullViewName,\n        map : fun.map,\n        reduce : fun.reduce\n      };\n      return createView(createViewOpts).then(function (view) {\n        if (opts.stale === \'ok\' || opts.stale === \'update_after\') {\n          if (opts.stale === \'update_after\') {\n            process.nextTick(function () {\n              updateView(view);\n            });\n          }\n          return queryView(view, opts);\n        } else { // stale not ok\n          return updateView(view).then(function () {\n            return queryView(view, opts);\n          });\n        }\n      });\n    });\n  }\n}\n\nvar query = function (fun, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  opts = opts ? coerceOptions(opts) : {};\n\n  if (typeof fun === \'function\') {\n    fun = {map : fun};\n  }\n\n  var db = this;\n  var promise = PouchPromise.resolve().then(function () {\n    return queryPromised(db, fun, opts);\n  });\n  promisedCallback(promise, callback);\n  return promise;\n};\n\nfunction QueryParseError(message) {\n  this.status = 400;\n  this.name = \'query_parse_error\';\n  this.message = message;\n  this.error = true;\n  try {\n    Error.captureStackTrace(this, QueryParseError);\n  } catch (e) {}\n}\n\ninherits(QueryParseError, Error);\n\nfunction NotFoundError(message) {\n  this.status = 404;\n  this.name = \'not_found\';\n  this.message = message;\n  this.error = true;\n  try {\n    Error.captureStackTrace(this, NotFoundError);\n  } catch (e) {}\n}\n\ninherits(NotFoundError, Error);\n\nfunction BuiltInError(message) {\n  this.status = 500;\n  this.name = \'invalid_value\';\n  this.message = message;\n  this.error = true;\n  try {\n    Error.captureStackTrace(this, BuiltInError);\n  } catch (e) {}\n}\n\ninherits(BuiltInError, Error);\n\nvar mapreduce = {\n  query: query,\n  viewCleanup: viewCleanup\n};\n\nfunction isGenOne$1(rev) {\n  return /^1-/.test(rev);\n}\n\nfunction fileHasChanged(localDoc, remoteDoc, filename) {\n  return !localDoc._attachments ||\n         !localDoc._attachments[filename] ||\n         localDoc._attachments[filename].digest !== remoteDoc._attachments[filename].digest;\n}\n\nfunction getDocAttachments(db, doc) {\n  var filenames = Object.keys(doc._attachments);\n  return PouchPromise.all(filenames.map(function (filename) {\n    return db.getAttachment(doc._id, filename, {rev: doc._rev});\n  }));\n}\n\nfunction getDocAttachmentsFromTargetOrSource(target, src, doc) {\n  var doCheckForLocalAttachments = src.type() === \'http\' && target.type() !== \'http\';\n  var filenames = Object.keys(doc._attachments);\n\n  if (!doCheckForLocalAttachments) {\n    return getDocAttachments(src, doc);\n  }\n\n  return target.get(doc._id).then(function (localDoc) {\n    return PouchPromise.all(filenames.map(function (filename) {\n      if (fileHasChanged(localDoc, doc, filename)) {\n        return src.getAttachment(doc._id, filename);\n      }\n\n      return target.getAttachment(localDoc._id, filename);\n    }));\n  })["catch"](function (error) {\n    /* istanbul ignore if */\n    if (error.status !== 404) {\n      throw error;\n    }\n\n    return getDocAttachments(src, doc);\n  });\n}\n\nfunction createBulkGetOpts(diffs) {\n  var requests = [];\n  Object.keys(diffs).forEach(function (id) {\n    var missingRevs = diffs[id].missing;\n    missingRevs.forEach(function (missingRev) {\n      requests.push({\n        id: id,\n        rev: missingRev\n      });\n    });\n  });\n\n  return {\n    docs: requests,\n    revs: true\n  };\n}\n\n//\n// Fetch all the documents from the src as described in the "diffs",\n// which is a mapping of docs IDs to revisions. If the state ever\n// changes to "cancelled", then the returned promise will be rejected.\n// Else it will be resolved with a list of fetched documents.\n//\nfunction getDocs(src, target, diffs, state) {\n  diffs = clone(diffs); // we do not need to modify this\n\n  var resultDocs = [],\n      ok = true;\n\n  function getAllDocs() {\n\n    var bulkGetOpts = createBulkGetOpts(diffs);\n\n    if (!bulkGetOpts.docs.length) { // optimization: skip empty requests\n      return;\n    }\n\n    return src.bulkGet(bulkGetOpts).then(function (bulkGetResponse) {\n      /* istanbul ignore if */\n      if (state.cancelled) {\n        throw new Error(\'cancelled\');\n      }\n      return PouchPromise.all(bulkGetResponse.results.map(function (bulkGetInfo) {\n        return PouchPromise.all(bulkGetInfo.docs.map(function (doc) {\n          var remoteDoc = doc.ok;\n\n          if (doc.error) {\n            // when AUTO_COMPACTION is set, docs can be returned which look\n            // like this: {"missing":"1-7c3ac256b693c462af8442f992b83696"}\n            ok = false;\n          }\n\n          if (!remoteDoc || !remoteDoc._attachments) {\n            return remoteDoc;\n          }\n\n          return getDocAttachmentsFromTargetOrSource(target, src, remoteDoc).then(function (attachments) {\n            var filenames = Object.keys(remoteDoc._attachments);\n            attachments.forEach(function (attachment, i) {\n              var att = remoteDoc._attachments[filenames[i]];\n              delete att.stub;\n              delete att.length;\n              att.data = attachment;\n            });\n\n            return remoteDoc;\n          });\n        }));\n      }))\n\n      .then(function (results) {\n        resultDocs = resultDocs.concat(flatten(results).filter(Boolean));\n      });\n    });\n  }\n\n  function hasAttachments(doc) {\n    return doc._attachments && Object.keys(doc._attachments).length > 0;\n  }\n\n  function fetchRevisionOneDocs(ids) {\n    // Optimization: fetch gen-1 docs and attachments in\n    // a single request using _all_docs\n    return src.allDocs({\n      keys: ids,\n      include_docs: true\n    }).then(function (res) {\n      if (state.cancelled) {\n        throw new Error(\'cancelled\');\n      }\n      res.rows.forEach(function (row) {\n        if (row.deleted || !row.doc || !isGenOne$1(row.value.rev) ||\n            hasAttachments(row.doc)) {\n          // if any of these conditions apply, we need to fetch using get()\n          return;\n        }\n\n        // the doc we got back from allDocs() is sufficient\n        resultDocs.push(row.doc);\n        delete diffs[row.id];\n      });\n    });\n  }\n\n  function getRevisionOneDocs() {\n    // filter out the generation 1 docs and get them\n    // leaving the non-generation one docs to be got otherwise\n    var ids = Object.keys(diffs).filter(function (id) {\n      var missing = diffs[id].missing;\n      return missing.length === 1 && isGenOne$1(missing[0]);\n    });\n    if (ids.length > 0) {\n      return fetchRevisionOneDocs(ids);\n    }\n  }\n\n  function returnResult() {\n    return { ok:ok, docs:resultDocs };\n  }\n\n  return PouchPromise.resolve()\n    .then(getRevisionOneDocs)\n    .then(getAllDocs)\n    .then(returnResult);\n}\n\nvar CHECKPOINT_VERSION = 1;\nvar REPLICATOR = "pouchdb";\n// This is an arbitrary number to limit the\n// amount of replication history we save in the checkpoint.\n// If we save too much, the checkpoing docs will become very big,\n// if we save fewer, we\'ll run a greater risk of having to\n// read all the changes from 0 when checkpoint PUTs fail\n// CouchDB 2.0 has a more involved history pruning,\n// but let\'s go for the simple version for now.\nvar CHECKPOINT_HISTORY_SIZE = 5;\nvar LOWEST_SEQ = 0;\n\nfunction updateCheckpoint(db, id, checkpoint, session, returnValue) {\n  return db.get(id)["catch"](function (err) {\n    if (err.status === 404) {\n      if (db.type() === \'http\') {\n        explainError(\n          404, \'PouchDB is just checking if a remote checkpoint exists.\'\n        );\n      }\n      return {\n        session_id: session,\n        _id: id,\n        history: [],\n        replicator: REPLICATOR,\n        version: CHECKPOINT_VERSION\n      };\n    }\n    throw err;\n  }).then(function (doc) {\n    if (returnValue.cancelled) {\n      return;\n    }\n    // Filter out current entry for this replication\n    doc.history = (doc.history || []).filter(function (item) {\n      return item.session_id !== session;\n    });\n\n    // Add the latest checkpoint to history\n    doc.history.unshift({\n      last_seq: checkpoint,\n      session_id: session\n    });\n\n    // Just take the last pieces in history, to\n    // avoid really big checkpoint docs.\n    // see comment on history size above\n    doc.history = doc.history.slice(0, CHECKPOINT_HISTORY_SIZE);\n\n    doc.version = CHECKPOINT_VERSION;\n    doc.replicator = REPLICATOR;\n\n    doc.session_id = session;\n    doc.last_seq = checkpoint;\n\n    return db.put(doc)["catch"](function (err) {\n      if (err.status === 409) {\n        // retry; someone is trying to write a checkpoint simultaneously\n        return updateCheckpoint(db, id, checkpoint, session, returnValue);\n      }\n      throw err;\n    });\n  });\n}\n\nfunction Checkpointer(src, target, id, returnValue) {\n  this.src = src;\n  this.target = target;\n  this.id = id;\n  this.returnValue = returnValue;\n}\n\nCheckpointer.prototype.writeCheckpoint = function (checkpoint, session) {\n  var self = this;\n  return this.updateTarget(checkpoint, session).then(function () {\n    return self.updateSource(checkpoint, session);\n  });\n};\n\nCheckpointer.prototype.updateTarget = function (checkpoint, session) {\n  return updateCheckpoint(this.target, this.id, checkpoint,\n    session, this.returnValue);\n};\n\nCheckpointer.prototype.updateSource = function (checkpoint, session) {\n  var self = this;\n  if (this.readOnlySource) {\n    return PouchPromise.resolve(true);\n  }\n  return updateCheckpoint(this.src, this.id, checkpoint,\n    session, this.returnValue)[\n    "catch"](function (err) {\n      if (isForbiddenError(err)) {\n        self.readOnlySource = true;\n        return true;\n      }\n      throw err;\n    });\n};\n\nvar comparisons = {\n  "undefined": function (targetDoc, sourceDoc) {\n    // This is the previous comparison function\n    if (pouchdbCollate.collate(targetDoc.last_seq, sourceDoc.last_seq) === 0) {\n      return sourceDoc.last_seq;\n    }\n    /* istanbul ignore next */\n    return 0;\n  },\n  "1": function (targetDoc, sourceDoc) {\n    // This is the comparison function ported from CouchDB\n    return compareReplicationLogs(sourceDoc, targetDoc).last_seq;\n  }\n};\n\nCheckpointer.prototype.getCheckpoint = function () {\n  var self = this;\n  return self.target.get(self.id).then(function (targetDoc) {\n    if (self.readOnlySource) {\n      return PouchPromise.resolve(targetDoc.last_seq);\n    }\n\n    return self.src.get(self.id).then(function (sourceDoc) {\n      // Since we can\'t migrate an old version doc to a new one\n      // (no session id), we just go with the lowest seq in this case\n      /* istanbul ignore if */\n      if (targetDoc.version !== sourceDoc.version) {\n        return LOWEST_SEQ;\n      }\n\n      var version;\n      if (targetDoc.version) {\n        version = targetDoc.version.toString();\n      } else {\n        version = "undefined";\n      }\n\n      if (version in comparisons) {\n        return comparisons[version](targetDoc, sourceDoc);\n      }\n      /* istanbul ignore next */\n      return LOWEST_SEQ;\n    }, function (err) {\n      if (err.status === 404 && targetDoc.last_seq) {\n        return self.src.put({\n          _id: self.id,\n          last_seq: LOWEST_SEQ\n        }).then(function () {\n          return LOWEST_SEQ;\n        }, function (err) {\n          if (isForbiddenError(err)) {\n            self.readOnlySource = true;\n            return targetDoc.last_seq;\n          }\n          /* istanbul ignore next */\n          return LOWEST_SEQ;\n        });\n      }\n      throw err;\n    });\n  })["catch"](function (err) {\n    if (err.status !== 404) {\n      throw err;\n    }\n    return LOWEST_SEQ;\n  });\n};\n// This checkpoint comparison is ported from CouchDBs source\n// they come from here:\n// https://github.com/apache/couchdb-couch-replicator/blob/master/src/couch_replicator.erl#L863-L906\n\nfunction compareReplicationLogs(srcDoc, tgtDoc) {\n  if (srcDoc.session_id === tgtDoc.session_id) {\n    return {\n      last_seq: srcDoc.last_seq,\n      history: srcDoc.history\n    };\n  }\n\n  return compareReplicationHistory(srcDoc.history, tgtDoc.history);\n}\n\nfunction compareReplicationHistory(sourceHistory, targetHistory) {\n  // the erlang loop via function arguments is not so easy to repeat in JS\n  // therefore, doing this as recursion\n  var S = sourceHistory[0];\n  var sourceRest = sourceHistory.slice(1);\n  var T = targetHistory[0];\n  var targetRest = targetHistory.slice(1);\n\n  if (!S || targetHistory.length === 0) {\n    return {\n      last_seq: LOWEST_SEQ,\n      history: []\n    };\n  }\n\n  var sourceId = S.session_id;\n  /* istanbul ignore if */\n  if (hasSessionId(sourceId, targetHistory)) {\n    return {\n      last_seq: S.last_seq,\n      history: sourceHistory\n    };\n  }\n\n  var targetId = T.session_id;\n  if (hasSessionId(targetId, sourceRest)) {\n    return {\n      last_seq: T.last_seq,\n      history: targetRest\n    };\n  }\n\n  return compareReplicationHistory(sourceRest, targetRest);\n}\n\nfunction hasSessionId(sessionId, history) {\n  var props = history[0];\n  var rest = history.slice(1);\n\n  if (!sessionId || history.length === 0) {\n    return false;\n  }\n\n  if (sessionId === props.session_id) {\n    return true;\n  }\n\n  return hasSessionId(sessionId, rest);\n}\n\nfunction isForbiddenError(err) {\n  return typeof err.status === \'number\' && Math.floor(err.status / 100) === 4;\n}\n\nvar STARTING_BACK_OFF = 0;\n\nfunction backOff(opts, returnValue, error, callback) {\n  if (opts.retry === false) {\n    returnValue.emit(\'error\', error);\n    returnValue.removeAllListeners();\n    return;\n  }\n  if (typeof opts.back_off_function !== \'function\') {\n    opts.back_off_function = defaultBackOff;\n  }\n  returnValue.emit(\'requestError\', error);\n  if (returnValue.state === \'active\' || returnValue.state === \'pending\') {\n    returnValue.emit(\'paused\', error);\n    returnValue.state = \'stopped\';\n    var backOffSet = function backoffTimeSet() {\n      opts.current_back_off = STARTING_BACK_OFF;\n    };\n    var removeBackOffSetter = function removeBackOffTimeSet() {\n      returnValue.removeListener(\'active\', backOffSet);\n    };\n    returnValue.once(\'paused\', removeBackOffSetter);\n    returnValue.once(\'active\', backOffSet);\n  }\n\n  opts.current_back_off = opts.current_back_off || STARTING_BACK_OFF;\n  opts.current_back_off = opts.back_off_function(opts.current_back_off);\n  setTimeout(callback, opts.current_back_off);\n}\n\nfunction sortObjectPropertiesByKey(queryParams) {\n  return Object.keys(queryParams).sort(pouchdbCollate.collate).reduce(function (result, key) {\n    result[key] = queryParams[key];\n    return result;\n  }, {});\n}\n\n// Generate a unique id particular to this replication.\n// Not guaranteed to align perfectly with CouchDB\'s rep ids.\nfunction generateReplicationId(src, target, opts) {\n  var docIds = opts.doc_ids ? opts.doc_ids.sort(pouchdbCollate.collate) : \'\';\n  var filterFun = opts.filter ? opts.filter.toString() : \'\';\n  var queryParams = \'\';\n  var filterViewName =  \'\';\n\n  if (opts.filter && opts.query_params) {\n    queryParams = JSON.stringify(sortObjectPropertiesByKey(opts.query_params));\n  }\n\n  if (opts.filter && opts.filter === \'_view\') {\n    filterViewName = opts.view.toString();\n  }\n\n  return PouchPromise.all([src.id(), target.id()]).then(function (res) {\n    var queryData = res[0] + res[1] + filterFun + filterViewName +\n      queryParams + docIds;\n    return new PouchPromise(function (resolve) {\n      binaryMd5(queryData, resolve);\n    });\n  }).then(function (md5sum) {\n    // can\'t use straight-up md5 alphabet, because\n    // the char \'/\' is interpreted as being for attachments,\n    // and + is also not url-safe\n    md5sum = md5sum.replace(/\\//g, \'.\').replace(/\\+/g, \'_\');\n    return \'_local/\' + md5sum;\n  });\n}\n\nfunction replicate$1(src, target, opts, returnValue, result) {\n  var batches = [];               // list of batches to be processed\n  var currentBatch;               // the batch currently being processed\n  var pendingBatch = {\n    seq: 0,\n    changes: [],\n    docs: []\n  }; // next batch, not yet ready to be processed\n  var writingCheckpoint = false;  // true while checkpoint is being written\n  var changesCompleted = false;   // true when all changes received\n  var replicationCompleted = false; // true when replication has completed\n  var last_seq = 0;\n  var continuous = opts.continuous || opts.live || false;\n  var batch_size = opts.batch_size || 100;\n  var batches_limit = opts.batches_limit || 10;\n  var changesPending = false;     // true while src.changes is running\n  var doc_ids = opts.doc_ids;\n  var repId;\n  var checkpointer;\n  var allErrors = [];\n  var changedDocs = [];\n  // Like couchdb, every replication gets a unique session id\n  var session = uuid();\n\n  result = result || {\n    ok: true,\n    start_time: new Date(),\n    docs_read: 0,\n    docs_written: 0,\n    doc_write_failures: 0,\n    errors: []\n  };\n\n  var changesOpts = {};\n  returnValue.ready(src, target);\n\n  function initCheckpointer() {\n    if (checkpointer) {\n      return PouchPromise.resolve();\n    }\n    return generateReplicationId(src, target, opts).then(function (res) {\n      repId = res;\n      checkpointer = new Checkpointer(src, target, repId, returnValue);\n    });\n  }\n\n  function writeDocs() {\n    changedDocs = [];\n\n    if (currentBatch.docs.length === 0) {\n      return;\n    }\n    var docs = currentBatch.docs;\n    return target.bulkDocs({docs: docs, new_edits: false}).then(function (res) {\n      /* istanbul ignore if */\n      if (returnValue.cancelled) {\n        completeReplication();\n        throw new Error(\'cancelled\');\n      }\n      var errors = [];\n      var errorsById = {};\n      res.forEach(function (res) {\n        if (res.error) {\n          result.doc_write_failures++;\n          errors.push(res);\n          errorsById[res.id] = res;\n        }\n      });\n      allErrors = allErrors.concat(errors);\n      result.docs_written += currentBatch.docs.length - errors.length;\n      var non403s = errors.filter(function (error) {\n        return error.name !== \'unauthorized\' && error.name !== \'forbidden\';\n      });\n\n      docs.forEach(function (doc) {\n        var error = errorsById[doc._id];\n        if (error) {\n          returnValue.emit(\'denied\', clone(error));\n        } else {\n          changedDocs.push(doc);\n        }\n      });\n\n      if (non403s.length > 0) {\n        var error = new Error(\'bulkDocs error\');\n        error.other_errors = errors;\n        abortReplication(\'target.bulkDocs failed to write docs\', error);\n        throw new Error(\'bulkWrite partial failure\');\n      }\n    }, function (err) {\n      result.doc_write_failures += docs.length;\n      throw err;\n    });\n  }\n\n  function finishBatch() {\n    if (currentBatch.error) {\n      throw new Error(\'There was a problem getting docs.\');\n    }\n    result.last_seq = last_seq = currentBatch.seq;\n    var outResult = clone(result);\n    if (changedDocs.length) {\n      outResult.docs = changedDocs;\n      returnValue.emit(\'change\', outResult);\n    }\n    writingCheckpoint = true;\n    return checkpointer.writeCheckpoint(currentBatch.seq,\n        session).then(function () {\n      writingCheckpoint = false;\n      /* istanbul ignore if */\n      if (returnValue.cancelled) {\n        completeReplication();\n        throw new Error(\'cancelled\');\n      }\n      currentBatch = undefined;\n      getChanges();\n    })["catch"](onCheckpointError);\n  }\n\n  function getDiffs() {\n    var diff = {};\n    currentBatch.changes.forEach(function (change) {\n      // Couchbase Sync Gateway emits these, but we can ignore them\n      /* istanbul ignore if */\n      if (change.id === "_user/") {\n        return;\n      }\n      diff[change.id] = change.changes.map(function (x) {\n        return x.rev;\n      });\n    });\n    return target.revsDiff(diff).then(function (diffs) {\n      /* istanbul ignore if */\n      if (returnValue.cancelled) {\n        completeReplication();\n        throw new Error(\'cancelled\');\n      }\n      // currentBatch.diffs elements are deleted as the documents are written\n      currentBatch.diffs = diffs;\n    });\n  }\n\n  function getBatchDocs() {\n    return getDocs(src, target, currentBatch.diffs, returnValue).then(function (got) {\n      currentBatch.error = !got.ok;\n      got.docs.forEach(function (doc) {\n        delete currentBatch.diffs[doc._id];\n        result.docs_read++;\n        currentBatch.docs.push(doc);\n      });\n    });\n  }\n\n  function startNextBatch() {\n    if (returnValue.cancelled || currentBatch) {\n      return;\n    }\n    if (batches.length === 0) {\n      processPendingBatch(true);\n      return;\n    }\n    currentBatch = batches.shift();\n    getDiffs()\n      .then(getBatchDocs)\n      .then(writeDocs)\n      .then(finishBatch)\n      .then(startNextBatch)[\n      "catch"](function (err) {\n        abortReplication(\'batch processing terminated with error\', err);\n      });\n  }\n\n\n  function processPendingBatch(immediate) {\n    if (pendingBatch.changes.length === 0) {\n      if (batches.length === 0 && !currentBatch) {\n        if ((continuous && changesOpts.live) || changesCompleted) {\n          returnValue.state = \'pending\';\n          returnValue.emit(\'paused\');\n        }\n        if (changesCompleted) {\n          completeReplication();\n        }\n      }\n      return;\n    }\n    if (\n      immediate ||\n      changesCompleted ||\n      pendingBatch.changes.length >= batch_size\n    ) {\n      batches.push(pendingBatch);\n      pendingBatch = {\n        seq: 0,\n        changes: [],\n        docs: []\n      };\n      if (returnValue.state === \'pending\' || returnValue.state === \'stopped\') {\n        returnValue.state = \'active\';\n        returnValue.emit(\'active\');\n      }\n      startNextBatch();\n    }\n  }\n\n\n  function abortReplication(reason, err) {\n    if (replicationCompleted) {\n      return;\n    }\n    if (!err.message) {\n      err.message = reason;\n    }\n    result.ok = false;\n    result.status = \'aborting\';\n    result.errors.push(err);\n    allErrors = allErrors.concat(err);\n    batches = [];\n    pendingBatch = {\n      seq: 0,\n      changes: [],\n      docs: []\n    };\n    completeReplication();\n  }\n\n\n  function completeReplication() {\n    if (replicationCompleted) {\n      return;\n    }\n    /* istanbul ignore if */\n    if (returnValue.cancelled) {\n      result.status = \'cancelled\';\n      if (writingCheckpoint) {\n        return;\n      }\n    }\n    result.status = result.status || \'complete\';\n    result.end_time = new Date();\n    result.last_seq = last_seq;\n    replicationCompleted = true;\n    var non403s = allErrors.filter(function (error) {\n      return error.name !== \'unauthorized\' && error.name !== \'forbidden\';\n    });\n    if (non403s.length > 0) {\n      var error = allErrors.pop();\n      if (allErrors.length > 0) {\n        error.other_errors = allErrors;\n      }\n      error.result = result;\n      backOff(opts, returnValue, error, function () {\n        replicate$1(src, target, opts, returnValue);\n      });\n    } else {\n      result.errors = allErrors;\n      returnValue.emit(\'complete\', result);\n      returnValue.removeAllListeners();\n    }\n  }\n\n\n  function onChange(change) {\n    /* istanbul ignore if */\n    if (returnValue.cancelled) {\n      return completeReplication();\n    }\n    var filter = filterChange(opts)(change);\n    if (!filter) {\n      return;\n    }\n    pendingBatch.seq = change.seq;\n    pendingBatch.changes.push(change);\n    processPendingBatch(batches.length === 0 && changesOpts.live);\n  }\n\n\n  function onChangesComplete(changes) {\n    changesPending = false;\n    /* istanbul ignore if */\n    if (returnValue.cancelled) {\n      return completeReplication();\n    }\n\n    // if no results were returned then we\'re done,\n    // else fetch more\n    if (changes.results.length > 0) {\n      changesOpts.since = changes.last_seq;\n      getChanges();\n      processPendingBatch(true);\n    } else {\n\n      var complete = function () {\n        if (continuous) {\n          changesOpts.live = true;\n          getChanges();\n        } else {\n          changesCompleted = true;\n        }\n        processPendingBatch(true);\n      };\n\n      // update the checkpoint so we start from the right seq next time\n      if (!currentBatch && changes.results.length === 0) {\n        writingCheckpoint = true;\n        checkpointer.writeCheckpoint(changes.last_seq,\n            session).then(function () {\n          writingCheckpoint = false;\n          result.last_seq = last_seq = changes.last_seq;\n          complete();\n        })[\n        "catch"](onCheckpointError);\n      } else {\n        complete();\n      }\n    }\n  }\n\n\n  function onChangesError(err) {\n    changesPending = false;\n    /* istanbul ignore if */\n    if (returnValue.cancelled) {\n      return completeReplication();\n    }\n    abortReplication(\'changes rejected\', err);\n  }\n\n\n  function getChanges() {\n    if (!(\n      !changesPending &&\n      !changesCompleted &&\n      batches.length < batches_limit\n      )) {\n      return;\n    }\n    changesPending = true;\n    function abortChanges() {\n      changes.cancel();\n    }\n    function removeListener() {\n      returnValue.removeListener(\'cancel\', abortChanges);\n    }\n\n    if (returnValue._changes) { // remove old changes() and listeners\n      returnValue.removeListener(\'cancel\', returnValue._abortChanges);\n      returnValue._changes.cancel();\n    }\n    returnValue.once(\'cancel\', abortChanges);\n\n    var changes = src.changes(changesOpts)\n      .on(\'change\', onChange);\n    changes.then(removeListener, removeListener);\n    changes.then(onChangesComplete)[\n      "catch"](onChangesError);\n\n    if (opts.retry) {\n      // save for later so we can cancel if necessary\n      returnValue._changes = changes;\n      returnValue._abortChanges = abortChanges;\n    }\n  }\n\n\n  function startChanges() {\n    initCheckpointer().then(function () {\n      /* istanbul ignore if */\n      if (returnValue.cancelled) {\n        completeReplication();\n        return;\n      }\n      return checkpointer.getCheckpoint().then(function (checkpoint) {\n        last_seq = checkpoint;\n        changesOpts = {\n          since: last_seq,\n          limit: batch_size,\n          batch_size: batch_size,\n          style: \'all_docs\',\n          doc_ids: doc_ids,\n          return_docs: true // required so we know when we\'re done\n        };\n        if (opts.filter) {\n          if (typeof opts.filter !== \'string\') {\n            // required for the client-side filter in onChange\n            changesOpts.include_docs = true;\n          } else { // ddoc filter\n            changesOpts.filter = opts.filter;\n          }\n        }\n        if (\'heartbeat\' in opts) {\n          changesOpts.heartbeat = opts.heartbeat;\n        }\n        if (\'timeout\' in opts) {\n          changesOpts.timeout = opts.timeout;\n        }\n        if (opts.query_params) {\n          changesOpts.query_params = opts.query_params;\n        }\n        if (opts.view) {\n          changesOpts.view = opts.view;\n        }\n        getChanges();\n      });\n    })["catch"](function (err) {\n      abortReplication(\'getCheckpoint rejected with \', err);\n    });\n  }\n\n  /* istanbul ignore next */\n  function onCheckpointError(err) {\n    writingCheckpoint = false;\n    abortReplication(\'writeCheckpoint completed with error\', err);\n    throw err;\n  }\n\n  /* istanbul ignore if */\n  if (returnValue.cancelled) { // cancelled immediately\n    completeReplication();\n    return;\n  }\n\n  if (!returnValue._addedListeners) {\n    returnValue.once(\'cancel\', completeReplication);\n\n    if (typeof opts.complete === \'function\') {\n      returnValue.once(\'error\', opts.complete);\n      returnValue.once(\'complete\', function (result) {\n        opts.complete(null, result);\n      });\n    }\n    returnValue._addedListeners = true;\n  }\n\n  if (typeof opts.since === \'undefined\') {\n    startChanges();\n  } else {\n    initCheckpointer().then(function () {\n      writingCheckpoint = true;\n      return checkpointer.writeCheckpoint(opts.since, session);\n    }).then(function () {\n      writingCheckpoint = false;\n      /* istanbul ignore if */\n      if (returnValue.cancelled) {\n        completeReplication();\n        return;\n      }\n      last_seq = opts.since;\n      startChanges();\n    })["catch"](onCheckpointError);\n  }\n}\n\n// We create a basic promise so the caller can cancel the replication possibly\n// before we have actually started listening to changes etc\ninherits(Replication, events.EventEmitter);\nfunction Replication() {\n  events.EventEmitter.call(this);\n  this.cancelled = false;\n  this.state = \'pending\';\n  var self = this;\n  var promise = new PouchPromise(function (fulfill, reject) {\n    self.once(\'complete\', fulfill);\n    self.once(\'error\', reject);\n  });\n  self.then = function (resolve, reject) {\n    return promise.then(resolve, reject);\n  };\n  self["catch"] = function (reject) {\n    return promise["catch"](reject);\n  };\n  // As we allow error handling via "error" event as well,\n  // put a stub in here so that rejecting never throws UnhandledError.\n  self["catch"](function () {});\n}\n\nReplication.prototype.cancel = function () {\n  this.cancelled = true;\n  this.state = \'cancelled\';\n  this.emit(\'cancel\');\n};\n\nReplication.prototype.ready = function (src, target) {\n  var self = this;\n  if (self._readyCalled) {\n    return;\n  }\n  self._readyCalled = true;\n\n  function onDestroy() {\n    self.cancel();\n  }\n  src.once(\'destroyed\', onDestroy);\n  target.once(\'destroyed\', onDestroy);\n  function cleanup() {\n    src.removeListener(\'destroyed\', onDestroy);\n    target.removeListener(\'destroyed\', onDestroy);\n  }\n  self.once(\'complete\', cleanup);\n};\n\nfunction toPouch(db, opts) {\n  var PouchConstructor = opts.PouchConstructor;\n  if (typeof db === \'string\') {\n    return new PouchConstructor(db, opts);\n  } else {\n    return db;\n  }\n}\n\nfunction replicate(src, target, opts, callback) {\n\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  if (typeof opts === \'undefined\') {\n    opts = {};\n  }\n\n  if (opts.doc_ids && !Array.isArray(opts.doc_ids)) {\n    throw createError(BAD_REQUEST,\n                       "`doc_ids` filter parameter is not a list.");\n  }\n\n  opts.complete = callback;\n  opts = clone(opts);\n  opts.continuous = opts.continuous || opts.live;\n  opts.retry = (\'retry\' in opts) ? opts.retry : false;\n  /*jshint validthis:true */\n  opts.PouchConstructor = opts.PouchConstructor || this;\n  var replicateRet = new Replication(opts);\n  var srcPouch = toPouch(src, opts);\n  var targetPouch = toPouch(target, opts);\n  replicate$1(srcPouch, targetPouch, opts, replicateRet);\n  return replicateRet;\n}\n\ninherits(Sync, events.EventEmitter);\nfunction sync(src, target, opts, callback) {\n  if (typeof opts === \'function\') {\n    callback = opts;\n    opts = {};\n  }\n  if (typeof opts === \'undefined\') {\n    opts = {};\n  }\n  opts = clone(opts);\n  /*jshint validthis:true */\n  opts.PouchConstructor = opts.PouchConstructor || this;\n  src = toPouch(src, opts);\n  target = toPouch(target, opts);\n  return new Sync(src, target, opts, callback);\n}\n\nfunction Sync(src, target, opts, callback) {\n  var self = this;\n  this.canceled = false;\n\n  var optsPush = opts.push ? jsExtend.extend({}, opts, opts.push) : opts;\n  var optsPull = opts.pull ? jsExtend.extend({}, opts, opts.pull) : opts;\n\n  this.push = replicate(src, target, optsPush);\n  this.pull = replicate(target, src, optsPull);\n\n  this.pushPaused = true;\n  this.pullPaused = true;\n\n  function pullChange(change) {\n    self.emit(\'change\', {\n      direction: \'pull\',\n      change: change\n    });\n  }\n  function pushChange(change) {\n    self.emit(\'change\', {\n      direction: \'push\',\n      change: change\n    });\n  }\n  function pushDenied(doc) {\n    self.emit(\'denied\', {\n      direction: \'push\',\n      doc: doc\n    });\n  }\n  function pullDenied(doc) {\n    self.emit(\'denied\', {\n      direction: \'pull\',\n      doc: doc\n    });\n  }\n  function pushPaused() {\n    self.pushPaused = true;\n    /* istanbul ignore if */\n    if (self.pullPaused) {\n      self.emit(\'paused\');\n    }\n  }\n  function pullPaused() {\n    self.pullPaused = true;\n    /* istanbul ignore if */\n    if (self.pushPaused) {\n      self.emit(\'paused\');\n    }\n  }\n  function pushActive() {\n    self.pushPaused = false;\n    /* istanbul ignore if */\n    if (self.pullPaused) {\n      self.emit(\'active\', {\n        direction: \'push\'\n      });\n    }\n  }\n  function pullActive() {\n    self.pullPaused = false;\n    /* istanbul ignore if */\n    if (self.pushPaused) {\n      self.emit(\'active\', {\n        direction: \'pull\'\n      });\n    }\n  }\n\n  var removed = {};\n\n  function removeAll(type) { // type is \'push\' or \'pull\'\n    return function (event, func) {\n      var isChange = event === \'change\' &&\n        (func === pullChange || func === pushChange);\n      var isDenied = event === \'denied\' &&\n        (func === pullDenied || func === pushDenied);\n      var isPaused = event === \'paused\' &&\n        (func === pullPaused || func === pushPaused);\n      var isActive = event === \'active\' &&\n        (func === pullActive || func === pushActive);\n\n      if (isChange || isDenied || isPaused || isActive) {\n        if (!(event in removed)) {\n          removed[event] = {};\n        }\n        removed[event][type] = true;\n        if (Object.keys(removed[event]).length === 2) {\n          // both push and pull have asked to be removed\n          self.removeAllListeners(event);\n        }\n      }\n    };\n  }\n\n  if (opts.live) {\n    this.push.on(\'complete\', self.pull.cancel.bind(self.pull));\n    this.pull.on(\'complete\', self.push.cancel.bind(self.push));\n  }\n\n  this.on(\'newListener\', function (event) {\n    if (event === \'change\') {\n      self.pull.on(\'change\', pullChange);\n      self.push.on(\'change\', pushChange);\n    } else if (event === \'denied\') {\n      self.pull.on(\'denied\', pullDenied);\n      self.push.on(\'denied\', pushDenied);\n    } else if (event === \'active\') {\n      self.pull.on(\'active\', pullActive);\n      self.push.on(\'active\', pushActive);\n    } else if (event === \'paused\') {\n      self.pull.on(\'paused\', pullPaused);\n      self.push.on(\'paused\', pushPaused);\n    }\n  });\n\n  this.on(\'removeListener\', function (event) {\n    if (event === \'change\') {\n      self.pull.removeListener(\'change\', pullChange);\n      self.push.removeListener(\'change\', pushChange);\n    } else if (event === \'denied\') {\n      self.pull.removeListener(\'denied\', pullDenied);\n      self.push.removeListener(\'denied\', pushDenied);\n    } else if (event === \'active\') {\n      self.pull.removeListener(\'active\', pullActive);\n      self.push.removeListener(\'active\', pushActive);\n    } else if (event === \'paused\') {\n      self.pull.removeListener(\'paused\', pullPaused);\n      self.push.removeListener(\'paused\', pushPaused);\n    }\n  });\n\n  this.pull.on(\'removeListener\', removeAll(\'pull\'));\n  this.push.on(\'removeListener\', removeAll(\'push\'));\n\n  var promise = PouchPromise.all([\n    this.push,\n    this.pull\n  ]).then(function (resp) {\n    var out = {\n      push: resp[0],\n      pull: resp[1]\n    };\n    self.emit(\'complete\', out);\n    if (callback) {\n      callback(null, out);\n    }\n    self.removeAllListeners();\n    return out;\n  }, function (err) {\n    self.cancel();\n    if (callback) {\n      // if there\'s a callback, then the callback can receive\n      // the error event\n      callback(err);\n    } else {\n      // if there\'s no callback, then we\'re safe to emit an error\n      // event, which would otherwise throw an unhandled error\n      // due to \'error\' being a special event in EventEmitters\n      self.emit(\'error\', err);\n    }\n    self.removeAllListeners();\n    if (callback) {\n      // no sense throwing if we\'re already emitting an \'error\' event\n      throw err;\n    }\n  });\n\n  this.then = function (success, err) {\n    return promise.then(success, err);\n  };\n\n  this["catch"] = function (err) {\n    return promise["catch"](err);\n  };\n}\n\nSync.prototype.cancel = function () {\n  if (!this.canceled) {\n    this.canceled = true;\n    this.push.cancel();\n    this.pull.cancel();\n  }\n};\n\nfunction replication(PouchDB) {\n  PouchDB.replicate = replicate;\n  PouchDB.sync = sync;\n}\n\nPouchDB.plugin(IDBPouch)\n  .plugin(WebSqlPouch)\n  .plugin(HttpPouch$1)\n  .plugin(mapreduce)\n  .plugin(replication);\n\nmodule.exports = PouchDB;\n}).call(this,_dereq_(2),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})\n},{"1":1,"10":10,"11":11,"13":13,"15":15,"16":16,"17":17,"18":18,"2":2,"4":4,"5":5,"7":7,"9":9}],4:[function(_dereq_,module,exports){\n\'use strict\';\n\nmodule.exports = argsArray;\n\nfunction argsArray(fun) {\n  return function () {\n    var len = arguments.length;\n    if (len) {\n      var args = [];\n      var i = -1;\n      while (++i < len) {\n        args[i] = arguments[i];\n      }\n      return fun.call(this, args);\n    } else {\n      return fun.call(this, []);\n    }\n  };\n}\n},{}],5:[function(_dereq_,module,exports){\n\n/**\n * This is the web browser implementation of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = _dereq_(6);\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = \'undefined\' != typeof chrome\n               && \'undefined\' != typeof chrome.storage\n                  ? chrome.storage.local\n                  : localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n  \'lightseagreen\',\n  \'forestgreen\',\n  \'goldenrod\',\n  \'dodgerblue\',\n  \'darkorchid\',\n  \'crimson\'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support "%c" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\nfunction useColors() {\n  // is webkit? http://stackoverflow.com/a/16459606/376773\n  return (\'WebkitAppearance\' in document.documentElement.style) ||\n    // is firebug? http://stackoverflow.com/a/398120/376773\n    (window.console && (console.firebug || (console.exception && console.table))) ||\n    // is firefox >= v31?\n    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n    (navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31);\n}\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nexports.formatters.j = function(v) {\n  return JSON.stringify(v);\n};\n\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs() {\n  var args = arguments;\n  var useColors = this.useColors;\n\n  args[0] = (useColors ? \'%c\' : \'\')\n    + this.namespace\n    + (useColors ? \' %c\' : \' \')\n    + args[0]\n    + (useColors ? \'%c \' : \' \')\n    + \'+\' + exports.humanize(this.diff);\n\n  if (!useColors) return args;\n\n  var c = \'color: \' + this.color;\n  args = [args[0], c, \'color: inherit\'].concat(Array.prototype.slice.call(args, 1));\n\n  // the final "%c" is somewhat tricky, because there could be other\n  // arguments passed either before or after the %c, so we need to\n  // figure out the correct index to insert the CSS into\n  var index = 0;\n  var lastC = 0;\n  args[0].replace(/%[a-z%]/g, function(match) {\n    if (\'%%\' === match) return;\n    index++;\n    if (\'%c\' === match) {\n      // we only are interested in the *last* %c\n      // (the user may have provided their own)\n      lastC = index;\n    }\n  });\n\n  args.splice(lastC, 0, c);\n  return args;\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a "function".\n *\n * @api public\n */\n\nfunction log() {\n  // this hackery is required for IE8/9, where\n  // the `console.log` function doesn\'t have \'apply\'\n  return \'object\' === typeof console\n    && console.log\n    && Function.prototype.apply.call(console.log, console, arguments);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\n\nfunction save(namespaces) {\n  try {\n    if (null == namespaces) {\n      exports.storage.removeItem(\'debug\');\n    } else {\n      exports.storage.debug = namespaces;\n    }\n  } catch(e) {}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\n\nfunction load() {\n  var r;\n  try {\n    r = exports.storage.debug;\n  } catch(e) {}\n  return r;\n}\n\n/**\n * Enable namespaces listed in `localStorage.debug` initially.\n */\n\nexports.enable(load());\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage(){\n  try {\n    return window.localStorage;\n  } catch (e) {}\n}\n\n},{"6":6}],6:[function(_dereq_,module,exports){\n\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = debug;\nexports.coerce = coerce;\nexports.disable = disable;\nexports.enable = enable;\nexports.enabled = enabled;\nexports.humanize = _dereq_(12);\n\n/**\n * The currently active debug mode names, and names to skip.\n */\n\nexports.names = [];\nexports.skips = [];\n\n/**\n * Map of special "%n" handling functions, for the debug "format" argument.\n *\n * Valid key names are a single, lowercased letter, i.e. "n".\n */\n\nexports.formatters = {};\n\n/**\n * Previously assigned color.\n */\n\nvar prevColor = 0;\n\n/**\n * Previous log timestamp.\n */\n\nvar prevTime;\n\n/**\n * Select a color.\n *\n * @return {Number}\n * @api private\n */\n\nfunction selectColor() {\n  return exports.colors[prevColor++ % exports.colors.length];\n}\n\n/**\n * Create a debugger with the given `namespace`.\n *\n * @param {String} namespace\n * @return {Function}\n * @api public\n */\n\nfunction debug(namespace) {\n\n  // define the `disabled` version\n  function disabled() {\n  }\n  disabled.enabled = false;\n\n  // define the `enabled` version\n  function enabled() {\n\n    var self = enabled;\n\n    // set `diff` timestamp\n    var curr = +new Date();\n    var ms = curr - (prevTime || curr);\n    self.diff = ms;\n    self.prev = prevTime;\n    self.curr = curr;\n    prevTime = curr;\n\n    // add the `color` if not set\n    if (null == self.useColors) self.useColors = exports.useColors();\n    if (null == self.color && self.useColors) self.color = selectColor();\n\n    var args = Array.prototype.slice.call(arguments);\n\n    args[0] = exports.coerce(args[0]);\n\n    if (\'string\' !== typeof args[0]) {\n      // anything else let\'s inspect with %o\n      args = [\'%o\'].concat(args);\n    }\n\n    // apply any `formatters` transformations\n    var index = 0;\n    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {\n      // if we encounter an escaped % then don\'t increase the array index\n      if (match === \'%%\') return match;\n      index++;\n      var formatter = exports.formatters[format];\n      if (\'function\' === typeof formatter) {\n        var val = args[index];\n        match = formatter.call(self, val);\n\n        // now we need to remove `args[index]` since it\'s inlined in the `format`\n        args.splice(index, 1);\n        index--;\n      }\n      return match;\n    });\n\n    if (\'function\' === typeof exports.formatArgs) {\n      args = exports.formatArgs.apply(self, args);\n    }\n    var logFn = enabled.log || exports.log || console.log.bind(console);\n    logFn.apply(self, args);\n  }\n  enabled.enabled = true;\n\n  var fn = exports.enabled(namespace) ? enabled : disabled;\n\n  fn.namespace = namespace;\n\n  return fn;\n}\n\n/**\n * Enables a debug mode by namespaces. This can include modes\n * separated by a colon and wildcards.\n *\n * @param {String} namespaces\n * @api public\n */\n\nfunction enable(namespaces) {\n  exports.save(namespaces);\n\n  var split = (namespaces || \'\').split(/[\\s,]+/);\n  var len = split.length;\n\n  for (var i = 0; i < len; i++) {\n    if (!split[i]) continue; // ignore empty strings\n    namespaces = split[i].replace(/\\*/g, \'.*?\');\n    if (namespaces[0] === \'-\') {\n      exports.skips.push(new RegExp(\'^\' + namespaces.substr(1) + \'$\'));\n    } else {\n      exports.names.push(new RegExp(\'^\' + namespaces + \'$\'));\n    }\n  }\n}\n\n/**\n * Disable debug output.\n *\n * @api public\n */\n\nfunction disable() {\n  exports.enable(\'\');\n}\n\n/**\n * Returns true if the given mode name is enabled, false otherwise.\n *\n * @param {String} name\n * @return {Boolean}\n * @api public\n */\n\nfunction enabled(name) {\n  var i, len;\n  for (i = 0, len = exports.skips.length; i < len; i++) {\n    if (exports.skips[i].test(name)) {\n      return false;\n    }\n  }\n  for (i = 0, len = exports.names.length; i < len; i++) {\n    if (exports.names[i].test(name)) {\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Coerce `val`.\n *\n * @param {Mixed} val\n * @return {Mixed}\n * @api private\n */\n\nfunction coerce(val) {\n  if (val instanceof Error) return val.stack || val.message;\n  return val;\n}\n\n},{"12":12}],7:[function(_dereq_,module,exports){\n(function (root, factory) {\r\n  /* istanbul ignore next */\r\n  if (typeof define === \'function\' && define.amd) {\r\n    define([], factory)\r\n  } else if (typeof exports === \'object\') {\r\n    module.exports = factory()\r\n  } else {\r\n    root.PromisePool = factory()\r\n    // Legacy API\r\n    root.promisePool = root.PromisePool\r\n  }\r\n})(this, function () {\r\n  \'use strict\'\r\n\r\n  var EventTarget = function () {\r\n    this._listeners = {}\r\n  }\r\n\r\n  EventTarget.prototype.addEventListener = function (type, listener) {\r\n    this._listeners[type] = this._listeners[type] || []\r\n    if (this._listeners[type].indexOf(listener) < 0) {\r\n      this._listeners[type].push(listener)\r\n    }\r\n  }\r\n\r\n  EventTarget.prototype.removeEventListener = function (type, listener) {\r\n    if (this._listeners[type]) {\r\n      var p = this._listeners[type].indexOf(listener)\r\n      if (p >= 0) {\r\n        this._listeners[type].splice(p, 1)\r\n      }\r\n    }\r\n  }\r\n\r\n  EventTarget.prototype.dispatchEvent = function (evt) {\r\n    if (this._listeners[evt.type] && this._listeners[evt.type].length) {\r\n      var listeners = this._listeners[evt.type].slice()\r\n      for (var i = 0, l = listeners.length; i < l; ++i) {\r\n        listeners[i].call(this, evt)\r\n      }\r\n    }\r\n  }\r\n\r\n  var isGenerator = function (func) {\r\n    return (typeof func.constructor === \'function\' &&\r\n      func.constructor.name === \'GeneratorFunction\')\r\n  }\r\n\r\n  var functionToIterator = function (func) {\r\n    return {\r\n      next: function () {\r\n        var promise = func()\r\n        return promise ? {value: promise} : {done: true}\r\n      }\r\n    }\r\n  }\r\n\r\n  var promiseToIterator = function (promise) {\r\n    var called = false\r\n    return {\r\n      next: function () {\r\n        if (called) {\r\n          return {done: true}\r\n        }\r\n        called = true\r\n        return {value: promise}\r\n      }\r\n    }\r\n  }\r\n\r\n  var toIterator = function (obj, Promise) {\r\n    var type = typeof obj\r\n    if (type === \'object\') {\r\n      if (typeof obj.next === \'function\') {\r\n        return obj\r\n      }\r\n      /* istanbul ignore else */\r\n      if (typeof obj.then === \'function\') {\r\n        return promiseToIterator(obj)\r\n      }\r\n    }\r\n    if (type === \'function\') {\r\n      return isGenerator(obj) ? obj() : functionToIterator(obj)\r\n    }\r\n    return promiseToIterator(Promise.resolve(obj))\r\n  }\r\n\r\n  var PromisePoolEvent = function (target, type, data) {\r\n    this.target = target\r\n    this.type = type\r\n    this.data = data\r\n  }\r\n\r\n  var PromisePool = function (source, concurrency, options) {\r\n    EventTarget.call(this)\r\n    if (typeof concurrency !== \'number\' ||\r\n        Math.floor(concurrency) !== concurrency ||\r\n        concurrency < 1) {\r\n      throw new Error(\'Invalid concurrency\')\r\n    }\r\n    this._concurrency = concurrency\r\n    this._options = options || {}\r\n    this._options.promise = this._options.promise || Promise\r\n    this._iterator = toIterator(source, this._options.promise)\r\n    this._done = false\r\n    this._size = 0\r\n    this._promise = null\r\n    this._callbacks = null\r\n  }\r\n  PromisePool.prototype = new EventTarget()\r\n  PromisePool.prototype.constructor = PromisePool\r\n\r\n  PromisePool.prototype.concurrency = function (value) {\r\n    if (typeof value !== \'undefined\') {\r\n      this._concurrency = value\r\n      if (this.active()) {\r\n        this._proceed()\r\n      }\r\n    }\r\n    return this._concurrency\r\n  }\r\n\r\n  PromisePool.prototype.size = function () {\r\n    return this._size\r\n  }\r\n\r\n  PromisePool.prototype.active = function () {\r\n    return !!this._promise\r\n  }\r\n\r\n  PromisePool.prototype.promise = function () {\r\n    return this._promise\r\n  }\r\n\r\n  PromisePool.prototype.start = function () {\r\n    var that = this\r\n    var Promise = this._options.promise\r\n    this._promise = new Promise(function (resolve, reject) {\r\n      that._callbacks = {\r\n        reject: reject,\r\n        resolve: resolve\r\n      }\r\n      that._proceed()\r\n    })\r\n    return this._promise\r\n  }\r\n\r\n  PromisePool.prototype._fireEvent = function (type, data) {\r\n    this.dispatchEvent(new PromisePoolEvent(this, type, data))\r\n  }\r\n\r\n  PromisePool.prototype._settle = function (error) {\r\n    if (error) {\r\n      this._callbacks.reject(error)\r\n    } else {\r\n      this._callbacks.resolve()\r\n    }\r\n    this._promise = null\r\n    this._callbacks = null\r\n  }\r\n\r\n  PromisePool.prototype._onPooledPromiseFulfilled = function (promise, result) {\r\n    this._size--\r\n    if (this.active()) {\r\n      this._fireEvent(\'fulfilled\', {\r\n        promise: promise,\r\n        result: result\r\n      })\r\n      this._proceed()\r\n    }\r\n  }\r\n\r\n  PromisePool.prototype._onPooledPromiseRejected = function (promise, error) {\r\n    this._size--\r\n    if (this.active()) {\r\n      this._fireEvent(\'rejected\', {\r\n        promise: promise,\r\n        error: error\r\n      })\r\n      this._settle(error || new Error(\'Unknown error\'))\r\n    }\r\n  }\r\n\r\n  PromisePool.prototype._trackPromise = function (promise) {\r\n    var that = this\r\n    promise\r\n      .then(function (result) {\r\n        that._onPooledPromiseFulfilled(promise, result)\r\n      }, function (error) {\r\n        that._onPooledPromiseRejected(promise, error)\r\n      })[\'catch\'](function (err) {\r\n        that._settle(new Error(\'Promise processing failed: \' + err))\r\n      })\r\n  }\r\n\r\n  PromisePool.prototype._proceed = function () {\r\n    if (!this._done) {\r\n      var result = null\r\n      while (this._size < this._concurrency &&\r\n          !(result = this._iterator.next()).done) {\r\n        this._size++\r\n        this._trackPromise(result.value)\r\n      }\r\n      this._done = (result === null || !!result.done)\r\n    }\r\n    if (this._done && this._size === 0) {\r\n      this._settle()\r\n    }\r\n  }\r\n\r\n  PromisePool.PromisePoolEvent = PromisePoolEvent\r\n  // Legacy API\r\n  PromisePool.PromisePool = PromisePool\r\n\r\n  return PromisePool\r\n})\r\n\n},{}],8:[function(_dereq_,module,exports){\n(function (global){\n\'use strict\';\nvar Mutation = global.MutationObserver || global.WebKitMutationObserver;\n\nvar scheduleDrain;\n\n{\n  if (Mutation) {\n    var called = 0;\n    var observer = new Mutation(nextTick);\n    var element = global.document.createTextNode(\'\');\n    observer.observe(element, {\n      characterData: true\n    });\n    scheduleDrain = function () {\n      element.data = (called = ++called % 2);\n    };\n  } else if (!global.setImmediate && typeof global.MessageChannel !== \'undefined\') {\n    var channel = new global.MessageChannel();\n    channel.port1.onmessage = nextTick;\n    scheduleDrain = function () {\n      channel.port2.postMessage(0);\n    };\n  } else if (\'document\' in global && \'onreadystatechange\' in global.document.createElement(\'script\')) {\n    scheduleDrain = function () {\n\n      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n      // into the document. Do so, thus queuing up the task. Remember to clean up once it\'s been called.\n      var scriptEl = global.document.createElement(\'script\');\n      scriptEl.onreadystatechange = function () {\n        nextTick();\n\n        scriptEl.onreadystatechange = null;\n        scriptEl.parentNode.removeChild(scriptEl);\n        scriptEl = null;\n      };\n      global.document.documentElement.appendChild(scriptEl);\n    };\n  } else {\n    scheduleDrain = function () {\n      setTimeout(nextTick, 0);\n    };\n  }\n}\n\nvar draining;\nvar queue = [];\n//named nextTick for less confusing stack traces\nfunction nextTick() {\n  draining = true;\n  var i, oldQueue;\n  var len = queue.length;\n  while (len) {\n    oldQueue = queue;\n    queue = [];\n    i = -1;\n    while (++i < len) {\n      oldQueue[i]();\n    }\n    len = queue.length;\n  }\n  draining = false;\n}\n\nmodule.exports = immediate;\nfunction immediate(task) {\n  if (queue.push(task) === 1 && !draining) {\n    scheduleDrain();\n  }\n}\n\n}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})\n},{}],9:[function(_dereq_,module,exports){\nif (typeof Object.create === \'function\') {\n  // implementation from standard node.js \'util\' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n},{}],10:[function(_dereq_,module,exports){\n(function() { \n\n  var slice   = Array.prototype.slice,\n      each    = Array.prototype.forEach;\n\n  var extend = function(obj) {\n    if(typeof obj !== \'object\') throw obj + \' is not an object\' ;\n\n    var sources = slice.call(arguments, 1); \n\n    each.call(sources, function(source) {\n      if(source) {\n        for(var prop in source) {\n          if(typeof source[prop] === \'object\' && obj[prop]) {\n            extend.call(obj, obj[prop], source[prop]);\n          } else {\n            obj[prop] = source[prop];\n          }\n        } \n      }\n    });\n\n    return obj;\n  }\n\n  this.extend = extend;\n\n}).call(this);\n},{}],11:[function(_dereq_,module,exports){\n\'use strict\';\nvar immediate = _dereq_(8);\n\n/* istanbul ignore next */\nfunction INTERNAL() {}\n\nvar handlers = {};\n\nvar REJECTED = [\'REJECTED\'];\nvar FULFILLED = [\'FULFILLED\'];\nvar PENDING = [\'PENDING\'];\n\nmodule.exports = Promise;\n\nfunction Promise(resolver) {\n  if (typeof resolver !== \'function\') {\n    throw new TypeError(\'resolver must be a function\');\n  }\n  this.state = PENDING;\n  this.queue = [];\n  this.outcome = void 0;\n  if (resolver !== INTERNAL) {\n    safelyResolveThenable(this, resolver);\n  }\n}\n\nPromise.prototype["catch"] = function (onRejected) {\n  return this.then(null, onRejected);\n};\nPromise.prototype.then = function (onFulfilled, onRejected) {\n  if (typeof onFulfilled !== \'function\' && this.state === FULFILLED ||\n    typeof onRejected !== \'function\' && this.state === REJECTED) {\n    return this;\n  }\n  var promise = new this.constructor(INTERNAL);\n  if (this.state !== PENDING) {\n    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;\n    unwrap(promise, resolver, this.outcome);\n  } else {\n    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));\n  }\n\n  return promise;\n};\nfunction QueueItem(promise, onFulfilled, onRejected) {\n  this.promise = promise;\n  if (typeof onFulfilled === \'function\') {\n    this.onFulfilled = onFulfilled;\n    this.callFulfilled = this.otherCallFulfilled;\n  }\n  if (typeof onRejected === \'function\') {\n    this.onRejected = onRejected;\n    this.callRejected = this.otherCallRejected;\n  }\n}\nQueueItem.prototype.callFulfilled = function (value) {\n  handlers.resolve(this.promise, value);\n};\nQueueItem.prototype.otherCallFulfilled = function (value) {\n  unwrap(this.promise, this.onFulfilled, value);\n};\nQueueItem.prototype.callRejected = function (value) {\n  handlers.reject(this.promise, value);\n};\nQueueItem.prototype.otherCallRejected = function (value) {\n  unwrap(this.promise, this.onRejected, value);\n};\n\nfunction unwrap(promise, func, value) {\n  immediate(function () {\n    var returnValue;\n    try {\n      returnValue = func(value);\n    } catch (e) {\n      return handlers.reject(promise, e);\n    }\n    if (returnValue === promise) {\n      handlers.reject(promise, new TypeError(\'Cannot resolve promise with itself\'));\n    } else {\n      handlers.resolve(promise, returnValue);\n    }\n  });\n}\n\nhandlers.resolve = function (self, value) {\n  var result = tryCatch(getThen, value);\n  if (result.status === \'error\') {\n    return handlers.reject(self, result.value);\n  }\n  var thenable = result.value;\n\n  if (thenable) {\n    safelyResolveThenable(self, thenable);\n  } else {\n    self.state = FULFILLED;\n    self.outcome = value;\n    var i = -1;\n    var len = self.queue.length;\n    while (++i < len) {\n      self.queue[i].callFulfilled(value);\n    }\n  }\n  return self;\n};\nhandlers.reject = function (self, error) {\n  self.state = REJECTED;\n  self.outcome = error;\n  var i = -1;\n  var len = self.queue.length;\n  while (++i < len) {\n    self.queue[i].callRejected(error);\n  }\n  return self;\n};\n\nfunction getThen(obj) {\n  // Make sure we only access the accessor once as required by the spec\n  var then = obj && obj.then;\n  if (obj && typeof obj === \'object\' && typeof then === \'function\') {\n    return function appyThen() {\n      then.apply(obj, arguments);\n    };\n  }\n}\n\nfunction safelyResolveThenable(self, thenable) {\n  // Either fulfill, reject or reject with error\n  var called = false;\n  function onError(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.reject(self, value);\n  }\n\n  function onSuccess(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.resolve(self, value);\n  }\n\n  function tryToUnwrap() {\n    thenable(onSuccess, onError);\n  }\n\n  var result = tryCatch(tryToUnwrap);\n  if (result.status === \'error\') {\n    onError(result.value);\n  }\n}\n\nfunction tryCatch(func, value) {\n  var out = {};\n  try {\n    out.value = func(value);\n    out.status = \'success\';\n  } catch (e) {\n    out.status = \'error\';\n    out.value = e;\n  }\n  return out;\n}\n\nPromise.resolve = resolve;\nfunction resolve(value) {\n  if (value instanceof this) {\n    return value;\n  }\n  return handlers.resolve(new this(INTERNAL), value);\n}\n\nPromise.reject = reject;\nfunction reject(reason) {\n  var promise = new this(INTERNAL);\n  return handlers.reject(promise, reason);\n}\n\nPromise.all = all;\nfunction all(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== \'[object Array]\') {\n    return this.reject(new TypeError(\'must be an array\'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var values = new Array(len);\n  var resolved = 0;\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    allResolver(iterable[i], i);\n  }\n  return promise;\n  function allResolver(value, i) {\n    self.resolve(value).then(resolveFromAll, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n    function resolveFromAll(outValue) {\n      values[i] = outValue;\n      if (++resolved === len && !called) {\n        called = true;\n        handlers.resolve(promise, values);\n      }\n    }\n  }\n}\n\nPromise.race = race;\nfunction race(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== \'[object Array]\') {\n    return this.reject(new TypeError(\'must be an array\'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    resolver(iterable[i]);\n  }\n  return promise;\n  function resolver(value) {\n    self.resolve(value).then(function (response) {\n      if (!called) {\n        called = true;\n        handlers.resolve(promise, response);\n      }\n    }, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n  }\n}\n\n},{"8":8}],12:[function(_dereq_,module,exports){\n/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} options\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options){\n  options = options || {};\n  if (\'string\' == typeof val) return parse(val);\n  return options.long\n    ? long(val)\n    : short(val);\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = \'\' + str;\n  if (str.length > 10000) return;\n  var match = /^((?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);\n  if (!match) return;\n  var n = parseFloat(match[1]);\n  var type = (match[2] || \'ms\').toLowerCase();\n  switch (type) {\n    case \'years\':\n    case \'year\':\n    case \'yrs\':\n    case \'yr\':\n    case \'y\':\n      return n * y;\n    case \'days\':\n    case \'day\':\n    case \'d\':\n      return n * d;\n    case \'hours\':\n    case \'hour\':\n    case \'hrs\':\n    case \'hr\':\n    case \'h\':\n      return n * h;\n    case \'minutes\':\n    case \'minute\':\n    case \'mins\':\n    case \'min\':\n    case \'m\':\n      return n * m;\n    case \'seconds\':\n    case \'second\':\n    case \'secs\':\n    case \'sec\':\n    case \'s\':\n      return n * s;\n    case \'milliseconds\':\n    case \'millisecond\':\n    case \'msecs\':\n    case \'msec\':\n    case \'ms\':\n      return n;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction short(ms) {\n  if (ms >= d) return Math.round(ms / d) + \'d\';\n  if (ms >= h) return Math.round(ms / h) + \'h\';\n  if (ms >= m) return Math.round(ms / m) + \'m\';\n  if (ms >= s) return Math.round(ms / s) + \'s\';\n  return ms + \'ms\';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction long(ms) {\n  return plural(ms, d, \'day\')\n    || plural(ms, h, \'hour\')\n    || plural(ms, m, \'minute\')\n    || plural(ms, s, \'second\')\n    || ms + \' ms\';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, n, name) {\n  if (ms < n) return;\n  if (ms < n * 1.5) return Math.floor(ms / n) + \' \' + name;\n  return Math.ceil(ms / n) + \' \' + name + \'s\';\n}\n\n},{}],13:[function(_dereq_,module,exports){\n\'use strict\';\n\nvar MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE\nvar MAGNITUDE_DIGITS = 3; // ditto\nvar SEP = \'\'; // set to \'_\' for easier debugging \n\nvar utils = _dereq_(14);\n\nexports.collate = function (a, b) {\n\n  if (a === b) {\n    return 0;\n  }\n\n  a = exports.normalizeKey(a);\n  b = exports.normalizeKey(b);\n\n  var ai = collationIndex(a);\n  var bi = collationIndex(b);\n  if ((ai - bi) !== 0) {\n    return ai - bi;\n  }\n  if (a === null) {\n    return 0;\n  }\n  switch (typeof a) {\n    case \'number\':\n      return a - b;\n    case \'boolean\':\n      return a === b ? 0 : (a < b ? -1 : 1);\n    case \'string\':\n      return stringCollate(a, b);\n  }\n  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);\n};\n\n// couch considers null/NaN/Infinity/-Infinity === undefined,\n// for the purposes of mapreduce indexes. also, dates get stringified.\nexports.normalizeKey = function (key) {\n  switch (typeof key) {\n    case \'undefined\':\n      return null;\n    case \'number\':\n      if (key === Infinity || key === -Infinity || isNaN(key)) {\n        return null;\n      }\n      return key;\n    case \'object\':\n      var origKey = key;\n      if (Array.isArray(key)) {\n        var len = key.length;\n        key = new Array(len);\n        for (var i = 0; i < len; i++) {\n          key[i] = exports.normalizeKey(origKey[i]);\n        }\n      } else if (key instanceof Date) {\n        return key.toJSON();\n      } else if (key !== null) { // generic object\n        key = {};\n        for (var k in origKey) {\n          if (origKey.hasOwnProperty(k)) {\n            var val = origKey[k];\n            if (typeof val !== \'undefined\') {\n              key[k] = exports.normalizeKey(val);\n            }\n          }\n        }\n      }\n  }\n  return key;\n};\n\nfunction indexify(key) {\n  if (key !== null) {\n    switch (typeof key) {\n      case \'boolean\':\n        return key ? 1 : 0;\n      case \'number\':\n        return numToIndexableString(key);\n      case \'string\':\n        // We\'ve to be sure that key does not contain \\u0000\n        // Do order-preserving replacements:\n        // 0 -> 1, 1\n        // 1 -> 1, 2\n        // 2 -> 2, 2\n        return key\n          .replace(/\\u0002/g, \'\\u0002\\u0002\')\n          .replace(/\\u0001/g, \'\\u0001\\u0002\')\n          .replace(/\\u0000/g, \'\\u0001\\u0001\');\n      case \'object\':\n        var isArray = Array.isArray(key);\n        var arr = isArray ? key : Object.keys(key);\n        var i = -1;\n        var len = arr.length;\n        var result = \'\';\n        if (isArray) {\n          while (++i < len) {\n            result += exports.toIndexableString(arr[i]);\n          }\n        } else {\n          while (++i < len) {\n            var objKey = arr[i];\n            result += exports.toIndexableString(objKey) +\n                exports.toIndexableString(key[objKey]);\n          }\n        }\n        return result;\n    }\n  }\n  return \'\';\n}\n\n// convert the given key to a string that would be appropriate\n// for lexical sorting, e.g. within a database, where the\n// sorting is the same given by the collate() function.\nexports.toIndexableString = function (key) {\n  var zero = \'\\u0000\';\n  key = exports.normalizeKey(key);\n  return collationIndex(key) + SEP + indexify(key) + zero;\n};\n\nfunction parseNumber(str, i) {\n  var originalIdx = i;\n  var num;\n  var zero = str[i] === \'1\';\n  if (zero) {\n    num = 0;\n    i++;\n  } else {\n    var neg = str[i] === \'0\';\n    i++;\n    var numAsString = \'\';\n    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);\n    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;\n    if (neg) {\n      magnitude = -magnitude;\n    }\n    i += MAGNITUDE_DIGITS;\n    while (true) {\n      var ch = str[i];\n      if (ch === \'\\u0000\') {\n        break;\n      } else {\n        numAsString += ch;\n      }\n      i++;\n    }\n    numAsString = numAsString.split(\'.\');\n    if (numAsString.length === 1) {\n      num = parseInt(numAsString, 10);\n    } else {\n      num = parseFloat(numAsString[0] + \'.\' + numAsString[1]);\n    }\n    if (neg) {\n      num = num - 10;\n    }\n    if (magnitude !== 0) {\n      // parseFloat is more reliable than pow due to rounding errors\n      // e.g. Number.MAX_VALUE would return Infinity if we did\n      // num * Math.pow(10, magnitude);\n      num = parseFloat(num + \'e\' + magnitude);\n    }\n  }\n  return {num: num, length : i - originalIdx};\n}\n\n// move up the stack while parsing\n// this function moved outside of parseIndexableString for performance\nfunction pop(stack, metaStack) {\n  var obj = stack.pop();\n\n  if (metaStack.length) {\n    var lastMetaElement = metaStack[metaStack.length - 1];\n    if (obj === lastMetaElement.element) {\n      // popping a meta-element, e.g. an object whose value is another object\n      metaStack.pop();\n      lastMetaElement = metaStack[metaStack.length - 1];\n    }\n    var element = lastMetaElement.element;\n    var lastElementIndex = lastMetaElement.index;\n    if (Array.isArray(element)) {\n      element.push(obj);\n    } else if (lastElementIndex === stack.length - 2) { // obj with key+value\n      var key = stack.pop();\n      element[key] = obj;\n    } else {\n      stack.push(obj); // obj with key only\n    }\n  }\n}\n\nexports.parseIndexableString = function (str) {\n  var stack = [];\n  var metaStack = []; // stack for arrays and objects\n  var i = 0;\n\n  while (true) {\n    var collationIndex = str[i++];\n    if (collationIndex === \'\\u0000\') {\n      if (stack.length === 1) {\n        return stack.pop();\n      } else {\n        pop(stack, metaStack);\n        continue;\n      }\n    }\n    switch (collationIndex) {\n      case \'1\':\n        stack.push(null);\n        break;\n      case \'2\':\n        stack.push(str[i] === \'1\');\n        i++;\n        break;\n      case \'3\':\n        var parsedNum = parseNumber(str, i);\n        stack.push(parsedNum.num);\n        i += parsedNum.length;\n        break;\n      case \'4\':\n        var parsedStr = \'\';\n        while (true) {\n          var ch = str[i];\n          if (ch === \'\\u0000\') {\n            break;\n          }\n          parsedStr += ch;\n          i++;\n        }\n        // perform the reverse of the order-preserving replacement\n        // algorithm (see above)\n        parsedStr = parsedStr.replace(/\\u0001\\u0001/g, \'\\u0000\')\n          .replace(/\\u0001\\u0002/g, \'\\u0001\')\n          .replace(/\\u0002\\u0002/g, \'\\u0002\');\n        stack.push(parsedStr);\n        break;\n      case \'5\':\n        var arrayElement = { element: [], index: stack.length };\n        stack.push(arrayElement.element);\n        metaStack.push(arrayElement);\n        break;\n      case \'6\':\n        var objElement = { element: {}, index: stack.length };\n        stack.push(objElement.element);\n        metaStack.push(objElement);\n        break;\n      default:\n        throw new Error(\n          \'bad collationIndex or unexpectedly reached end of input: \' + collationIndex);\n    }\n  }\n};\n\nfunction arrayCollate(a, b) {\n  var len = Math.min(a.length, b.length);\n  for (var i = 0; i < len; i++) {\n    var sort = exports.collate(a[i], b[i]);\n    if (sort !== 0) {\n      return sort;\n    }\n  }\n  return (a.length === b.length) ? 0 :\n    (a.length > b.length) ? 1 : -1;\n}\nfunction stringCollate(a, b) {\n  // See: https://github.com/daleharvey/pouchdb/issues/40\n  // This is incompatible with the CouchDB implementation, but its the\n  // best we can do for now\n  return (a === b) ? 0 : ((a > b) ? 1 : -1);\n}\nfunction objectCollate(a, b) {\n  var ak = Object.keys(a), bk = Object.keys(b);\n  var len = Math.min(ak.length, bk.length);\n  for (var i = 0; i < len; i++) {\n    // First sort the keys\n    var sort = exports.collate(ak[i], bk[i]);\n    if (sort !== 0) {\n      return sort;\n    }\n    // if the keys are equal sort the values\n    sort = exports.collate(a[ak[i]], b[bk[i]]);\n    if (sort !== 0) {\n      return sort;\n    }\n\n  }\n  return (ak.length === bk.length) ? 0 :\n    (ak.length > bk.length) ? 1 : -1;\n}\n// The collation is defined by erlangs ordered terms\n// the atoms null, true, false come first, then numbers, strings,\n// arrays, then objects\n// null/undefined/NaN/Infinity/-Infinity are all considered null\nfunction collationIndex(x) {\n  var id = [\'boolean\', \'number\', \'string\', \'object\'];\n  var idx = id.indexOf(typeof x);\n  //false if -1 otherwise true, but fast!!!!1\n  if (~idx) {\n    if (x === null) {\n      return 1;\n    }\n    if (Array.isArray(x)) {\n      return 5;\n    }\n    return idx < 3 ? (idx + 2) : (idx + 3);\n  }\n  if (Array.isArray(x)) {\n    return 5;\n  }\n}\n\n// conversion:\n// x yyy zz...zz\n// x = 0 for negative, 1 for 0, 2 for positive\n// y = exponent (for negative numbers negated) moved so that it\'s >= 0\n// z = mantisse\nfunction numToIndexableString(num) {\n\n  if (num === 0) {\n    return \'1\';\n  }\n\n  // convert number to exponential format for easier and\n  // more succinct string sorting\n  var expFormat = num.toExponential().split(/e\\+?/);\n  var magnitude = parseInt(expFormat[1], 10);\n\n  var neg = num < 0;\n\n  var result = neg ? \'0\' : \'2\';\n\n  // first sort by magnitude\n  // it\'s easier if all magnitudes are positive\n  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);\n  var magString = utils.padLeft((magForComparison).toString(), \'0\', MAGNITUDE_DIGITS);\n\n  result += SEP + magString;\n\n  // then sort by the factor\n  var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)\n  if (neg) { // for negative reverse ordering\n    factor = 10 - factor;\n  }\n\n  var factorStr = factor.toFixed(20);\n\n  // strip zeros from the end\n  factorStr = factorStr.replace(/\\.?0+$/, \'\');\n\n  result += SEP + factorStr;\n\n  return result;\n}\n\n},{"14":14}],14:[function(_dereq_,module,exports){\n\'use strict\';\n\nfunction pad(str, padWith, upToLength) {\n  var padding = \'\';\n  var targetLength = upToLength - str.length;\n  while (padding.length < targetLength) {\n    padding += padWith;\n  }\n  return padding;\n}\n\nexports.padLeft = function (str, padWith, upToLength) {\n  var padding = pad(str, padWith, upToLength);\n  return padding + str;\n};\n\nexports.padRight = function (str, padWith, upToLength) {\n  var padding = pad(str, padWith, upToLength);\n  return str + padding;\n};\n\nexports.stringLexCompare = function (a, b) {\n\n  var aLen = a.length;\n  var bLen = b.length;\n\n  var i;\n  for (i = 0; i < aLen; i++) {\n    if (i === bLen) {\n      // b is shorter substring of a\n      return 1;\n    }\n    var aChar = a.charAt(i);\n    var bChar = b.charAt(i);\n    if (aChar !== bChar) {\n      return aChar < bChar ? -1 : 1;\n    }\n  }\n\n  if (aLen < bLen) {\n    // a is shorter substring of b\n    return -1;\n  }\n\n  return 0;\n};\n\n/*\n * returns the decimal form for the given integer, i.e. writes\n * out all the digits (in base-10) instead of using scientific notation\n */\nexports.intToDecimalForm = function (int) {\n\n  var isNeg = int < 0;\n  var result = \'\';\n\n  do {\n    var remainder = isNeg ? -Math.ceil(int % 10) : Math.floor(int % 10);\n\n    result = remainder + result;\n    int = isNeg ? Math.ceil(int / 10) : Math.floor(int / 10);\n  } while (int);\n\n\n  if (isNeg && result !== \'0\') {\n    result = \'-\' + result;\n  }\n\n  return result;\n};\n},{}],15:[function(_dereq_,module,exports){\n\'use strict\';\nexports.Map = LazyMap; // TODO: use ES6 map\nexports.Set = LazySet; // TODO: use ES6 set\n// based on https://github.com/montagejs/collections\nfunction LazyMap() {\n  this.store = {};\n}\nLazyMap.prototype.mangle = function (key) {\n  if (typeof key !== "string") {\n    throw new TypeError("key must be a string but Got " + key);\n  }\n  return \'$\' + key;\n};\nLazyMap.prototype.unmangle = function (key) {\n  return key.substring(1);\n};\nLazyMap.prototype.get = function (key) {\n  var mangled = this.mangle(key);\n  if (mangled in this.store) {\n    return this.store[mangled];\n  }\n  return void 0;\n};\nLazyMap.prototype.set = function (key, value) {\n  var mangled = this.mangle(key);\n  this.store[mangled] = value;\n  return true;\n};\nLazyMap.prototype.has = function (key) {\n  var mangled = this.mangle(key);\n  return mangled in this.store;\n};\nLazyMap.prototype.delete = function (key) {\n  var mangled = this.mangle(key);\n  if (mangled in this.store) {\n    delete this.store[mangled];\n    return true;\n  }\n  return false;\n};\nLazyMap.prototype.forEach = function (cb) {\n  var keys = Object.keys(this.store);\n  for (var i = 0, len = keys.length; i < len; i++) {\n    var key = keys[i];\n    var value = this.store[key];\n    key = this.unmangle(key);\n    cb(value, key);\n  }\n};\n\nfunction LazySet(array) {\n  this.store = new LazyMap();\n\n  // init with an array\n  if (array && Array.isArray(array)) {\n    for (var i = 0, len = array.length; i < len; i++) {\n      this.add(array[i]);\n    }\n  }\n}\nLazySet.prototype.add = function (key) {\n  return this.store.set(key, true);\n};\nLazySet.prototype.has = function (key) {\n  return this.store.has(key);\n};\nLazySet.prototype.delete = function (key) {\n  return this.store.delete(key);\n};\n\n},{}],16:[function(_dereq_,module,exports){\n// Generated by CoffeeScript 1.9.2\n(function() {\n  var hasProp = {}.hasOwnProperty,\n    slice = [].slice;\n\n  module.exports = function(source, scope) {\n    var key, keys, value, values;\n    keys = [];\n    values = [];\n    for (key in scope) {\n      if (!hasProp.call(scope, key)) continue;\n      value = scope[key];\n      if (key === \'this\') {\n        continue;\n      }\n      keys.push(key);\n      values.push(value);\n    }\n    return Function.apply(null, slice.call(keys).concat([source])).apply(scope["this"], values);\n  };\n\n}).call(this);\n\n},{}],17:[function(_dereq_,module,exports){\n(function (factory) {\n    if (typeof exports === \'object\') {\n        // Node/CommonJS\n        module.exports = factory();\n    } else if (typeof define === \'function\' && define.amd) {\n        // AMD\n        define(factory);\n    } else {\n        // Browser globals (with support for web workers)\n        var glob;\n\n        try {\n            glob = window;\n        } catch (e) {\n            glob = self;\n        }\n\n        glob.SparkMD5 = factory();\n    }\n}(function (undefined) {\n\n    \'use strict\';\n\n    /*\n     * Fastest md5 implementation around (JKM md5).\n     * Credits: Joseph Myers\n     *\n     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html\n     * @see http://jsperf.com/md5-shootout/7\n     */\n\n    /* this function is much faster,\n      so if possible we use it. Some IEs\n      are the only ones I know of that\n      need the idiotic second function,\n      generated by an if clause.  */\n    var add32 = function (a, b) {\n        return (a + b) & 0xFFFFFFFF;\n    },\n        hex_chr = [\'0\', \'1\', \'2\', \'3\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\', \'a\', \'b\', \'c\', \'d\', \'e\', \'f\'];\n\n\n    function cmn(q, a, b, x, s, t) {\n        a = add32(add32(a, q), add32(x, t));\n        return add32((a << s) | (a >>> (32 - s)), b);\n    }\n\n    function ff(a, b, c, d, x, s, t) {\n        return cmn((b & c) | ((~b) & d), a, b, x, s, t);\n    }\n\n    function gg(a, b, c, d, x, s, t) {\n        return cmn((b & d) | (c & (~d)), a, b, x, s, t);\n    }\n\n    function hh(a, b, c, d, x, s, t) {\n        return cmn(b ^ c ^ d, a, b, x, s, t);\n    }\n\n    function ii(a, b, c, d, x, s, t) {\n        return cmn(c ^ (b | (~d)), a, b, x, s, t);\n    }\n\n    function md5cycle(x, k) {\n        var a = x[0],\n            b = x[1],\n            c = x[2],\n            d = x[3];\n\n        a = ff(a, b, c, d, k[0], 7, -680876936);\n        d = ff(d, a, b, c, k[1], 12, -389564586);\n        c = ff(c, d, a, b, k[2], 17, 606105819);\n        b = ff(b, c, d, a, k[3], 22, -1044525330);\n        a = ff(a, b, c, d, k[4], 7, -176418897);\n        d = ff(d, a, b, c, k[5], 12, 1200080426);\n        c = ff(c, d, a, b, k[6], 17, -1473231341);\n        b = ff(b, c, d, a, k[7], 22, -45705983);\n        a = ff(a, b, c, d, k[8], 7, 1770035416);\n        d = ff(d, a, b, c, k[9], 12, -1958414417);\n        c = ff(c, d, a, b, k[10], 17, -42063);\n        b = ff(b, c, d, a, k[11], 22, -1990404162);\n        a = ff(a, b, c, d, k[12], 7, 1804603682);\n        d = ff(d, a, b, c, k[13], 12, -40341101);\n        c = ff(c, d, a, b, k[14], 17, -1502002290);\n        b = ff(b, c, d, a, k[15], 22, 1236535329);\n\n        a = gg(a, b, c, d, k[1], 5, -165796510);\n        d = gg(d, a, b, c, k[6], 9, -1069501632);\n        c = gg(c, d, a, b, k[11], 14, 643717713);\n        b = gg(b, c, d, a, k[0], 20, -373897302);\n        a = gg(a, b, c, d, k[5], 5, -701558691);\n        d = gg(d, a, b, c, k[10], 9, 38016083);\n        c = gg(c, d, a, b, k[15], 14, -660478335);\n        b = gg(b, c, d, a, k[4], 20, -405537848);\n        a = gg(a, b, c, d, k[9], 5, 568446438);\n        d = gg(d, a, b, c, k[14], 9, -1019803690);\n        c = gg(c, d, a, b, k[3], 14, -187363961);\n        b = gg(b, c, d, a, k[8], 20, 1163531501);\n        a = gg(a, b, c, d, k[13], 5, -1444681467);\n        d = gg(d, a, b, c, k[2], 9, -51403784);\n        c = gg(c, d, a, b, k[7], 14, 1735328473);\n        b = gg(b, c, d, a, k[12], 20, -1926607734);\n\n        a = hh(a, b, c, d, k[5], 4, -378558);\n        d = hh(d, a, b, c, k[8], 11, -2022574463);\n        c = hh(c, d, a, b, k[11], 16, 1839030562);\n        b = hh(b, c, d, a, k[14], 23, -35309556);\n        a = hh(a, b, c, d, k[1], 4, -1530992060);\n        d = hh(d, a, b, c, k[4], 11, 1272893353);\n        c = hh(c, d, a, b, k[7], 16, -155497632);\n        b = hh(b, c, d, a, k[10], 23, -1094730640);\n        a = hh(a, b, c, d, k[13], 4, 681279174);\n        d = hh(d, a, b, c, k[0], 11, -358537222);\n        c = hh(c, d, a, b, k[3], 16, -722521979);\n        b = hh(b, c, d, a, k[6], 23, 76029189);\n        a = hh(a, b, c, d, k[9], 4, -640364487);\n        d = hh(d, a, b, c, k[12], 11, -421815835);\n        c = hh(c, d, a, b, k[15], 16, 530742520);\n        b = hh(b, c, d, a, k[2], 23, -995338651);\n\n        a = ii(a, b, c, d, k[0], 6, -198630844);\n        d = ii(d, a, b, c, k[7], 10, 1126891415);\n        c = ii(c, d, a, b, k[14], 15, -1416354905);\n        b = ii(b, c, d, a, k[5], 21, -57434055);\n        a = ii(a, b, c, d, k[12], 6, 1700485571);\n        d = ii(d, a, b, c, k[3], 10, -1894986606);\n        c = ii(c, d, a, b, k[10], 15, -1051523);\n        b = ii(b, c, d, a, k[1], 21, -2054922799);\n        a = ii(a, b, c, d, k[8], 6, 1873313359);\n        d = ii(d, a, b, c, k[15], 10, -30611744);\n        c = ii(c, d, a, b, k[6], 15, -1560198380);\n        b = ii(b, c, d, a, k[13], 21, 1309151649);\n        a = ii(a, b, c, d, k[4], 6, -145523070);\n        d = ii(d, a, b, c, k[11], 10, -1120210379);\n        c = ii(c, d, a, b, k[2], 15, 718787259);\n        b = ii(b, c, d, a, k[9], 21, -343485551);\n\n        x[0] = add32(a, x[0]);\n        x[1] = add32(b, x[1]);\n        x[2] = add32(c, x[2]);\n        x[3] = add32(d, x[3]);\n    }\n\n    function md5blk(s) {\n        var md5blks = [],\n            i; /* Andy King said do it this way. */\n\n        for (i = 0; i < 64; i += 4) {\n            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);\n        }\n        return md5blks;\n    }\n\n    function md5blk_array(a) {\n        var md5blks = [],\n            i; /* Andy King said do it this way. */\n\n        for (i = 0; i < 64; i += 4) {\n            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);\n        }\n        return md5blks;\n    }\n\n    function md51(s) {\n        var n = s.length,\n            state = [1732584193, -271733879, -1732584194, 271733878],\n            i,\n            length,\n            tail,\n            tmp,\n            lo,\n            hi;\n\n        for (i = 64; i <= n; i += 64) {\n            md5cycle(state, md5blk(s.substring(i - 64, i)));\n        }\n        s = s.substring(i - 64);\n        length = s.length;\n        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);\n        }\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(state, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Beware that the final length might not fit in 32 bits so we take care of that\n        tmp = n * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n\n        md5cycle(state, tail);\n        return state;\n    }\n\n    function md51_array(a) {\n        var n = a.length,\n            state = [1732584193, -271733879, -1732584194, 271733878],\n            i,\n            length,\n            tail,\n            tmp,\n            lo,\n            hi;\n\n        for (i = 64; i <= n; i += 64) {\n            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));\n        }\n\n        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1\n        // containing the last element of the parent array if the sub array specified starts\n        // beyond the length of the parent array - weird.\n        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue\n        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);\n\n        length = a.length;\n        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= a[i] << ((i % 4) << 3);\n        }\n\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(state, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Beware that the final length might not fit in 32 bits so we take care of that\n        tmp = n * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n\n        md5cycle(state, tail);\n\n        return state;\n    }\n\n    function rhex(n) {\n        var s = \'\',\n            j;\n        for (j = 0; j < 4; j += 1) {\n            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];\n        }\n        return s;\n    }\n\n    function hex(x) {\n        var i;\n        for (i = 0; i < x.length; i += 1) {\n            x[i] = rhex(x[i]);\n        }\n        return x.join(\'\');\n    }\n\n    // In some cases the fast add32 function cannot be used..\n    if (hex(md51(\'hello\')) !== \'5d41402abc4b2a76b9719d911017c592\') {\n        add32 = function (x, y) {\n            var lsw = (x & 0xFFFF) + (y & 0xFFFF),\n                msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n            return (msw << 16) | (lsw & 0xFFFF);\n        };\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * ArrayBuffer slice polyfill.\n     *\n     * @see https://github.com/ttaubert/node-arraybuffer-slice\n     */\n\n    if (typeof ArrayBuffer !== \'undefined\' && !ArrayBuffer.prototype.slice) {\n        (function () {\n            function clamp(val, length) {\n                val = (val | 0) || 0;\n\n                if (val < 0) {\n                    return Math.max(val + length, 0);\n                }\n\n                return Math.min(val, length);\n            }\n\n            ArrayBuffer.prototype.slice = function (from, to) {\n                var length = this.byteLength,\n                    begin = clamp(from, length),\n                    end = length,\n                    num,\n                    target,\n                    targetArray,\n                    sourceArray;\n\n                if (to !== undefined) {\n                    end = clamp(to, length);\n                }\n\n                if (begin > end) {\n                    return new ArrayBuffer(0);\n                }\n\n                num = end - begin;\n                target = new ArrayBuffer(num);\n                targetArray = new Uint8Array(target);\n\n                sourceArray = new Uint8Array(this, begin, num);\n                targetArray.set(sourceArray);\n\n                return target;\n            };\n        })();\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * Helpers.\n     */\n\n    function toUtf8(str) {\n        if (/[\\u0080-\\uFFFF]/.test(str)) {\n            str = unescape(encodeURIComponent(str));\n        }\n\n        return str;\n    }\n\n    function utf8Str2ArrayBuffer(str, returnUInt8Array) {\n        var length = str.length,\n           buff = new ArrayBuffer(length),\n           arr = new Uint8Array(buff),\n           i;\n\n        for (i = 0; i < length; i += 1) {\n            arr[i] = str.charCodeAt(i);\n        }\n\n        return returnUInt8Array ? arr : buff;\n    }\n\n    function arrayBuffer2Utf8Str(buff) {\n        return String.fromCharCode.apply(null, new Uint8Array(buff));\n    }\n\n    function concatenateArrayBuffers(first, second, returnUInt8Array) {\n        var result = new Uint8Array(first.byteLength + second.byteLength);\n\n        result.set(new Uint8Array(first));\n        result.set(new Uint8Array(second), first.byteLength);\n\n        return returnUInt8Array ? result : result.buffer;\n    }\n\n    function hexToBinaryString(hex) {\n        var bytes = [],\n            length = hex.length,\n            x;\n\n        for (x = 0; x < length - 1; x += 2) {\n            bytes.push(parseInt(hex.substr(x, 2), 16));\n        }\n\n        return String.fromCharCode.apply(String, bytes);\n    }\n\n    // ---------------------------------------------------\n\n    /**\n     * SparkMD5 OOP implementation.\n     *\n     * Use this class to perform an incremental md5, otherwise use the\n     * static methods instead.\n     */\n\n    function SparkMD5() {\n        // call reset to init the instance\n        this.reset();\n    }\n\n    /**\n     * Appends a string.\n     * A conversion will be applied if an utf8 string is detected.\n     *\n     * @param {String} str The string to be appended\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.append = function (str) {\n        // Converts the string to utf8 bytes if necessary\n        // Then append as binary\n        this.appendBinary(toUtf8(str));\n\n        return this;\n    };\n\n    /**\n     * Appends a binary string.\n     *\n     * @param {String} contents The binary string to be appended\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.appendBinary = function (contents) {\n        this._buff += contents;\n        this._length += contents.length;\n\n        var length = this._buff.length,\n            i;\n\n        for (i = 64; i <= length; i += 64) {\n            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));\n        }\n\n        this._buff = this._buff.substring(i - 64);\n\n        return this;\n    };\n\n    /**\n     * Finishes the incremental computation, reseting the internal state and\n     * returning the result.\n     *\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.prototype.end = function (raw) {\n        var buff = this._buff,\n            length = buff.length,\n            i,\n            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            ret;\n\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);\n        }\n\n        this._finish(tail, length);\n        ret = hex(this._hash);\n\n        if (raw) {\n            ret = hexToBinaryString(ret);\n        }\n\n        this.reset();\n\n        return ret;\n    };\n\n    /**\n     * Resets the internal state of the computation.\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.reset = function () {\n        this._buff = \'\';\n        this._length = 0;\n        this._hash = [1732584193, -271733879, -1732584194, 271733878];\n\n        return this;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @return {Object} The state\n     */\n    SparkMD5.prototype.getState = function () {\n        return {\n            buff: this._buff,\n            length: this._length,\n            hash: this._hash\n        };\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @param {Object} state The state\n     *\n     * @return {SparkMD5} The instance itself\n     */\n    SparkMD5.prototype.setState = function (state) {\n        this._buff = state.buff;\n        this._length = state.length;\n        this._hash = state.hash;\n\n        return this;\n    };\n\n    /**\n     * Releases memory used by the incremental buffer and other additional\n     * resources. If you plan to use the instance again, use reset instead.\n     */\n    SparkMD5.prototype.destroy = function () {\n        delete this._hash;\n        delete this._buff;\n        delete this._length;\n    };\n\n    /**\n     * Finish the final calculation based on the tail.\n     *\n     * @param {Array}  tail   The tail (will be modified)\n     * @param {Number} length The length of the remaining buffer\n     */\n    SparkMD5.prototype._finish = function (tail, length) {\n        var i = length,\n            tmp,\n            lo,\n            hi;\n\n        tail[i >> 2] |= 0x80 << ((i % 4) << 3);\n        if (i > 55) {\n            md5cycle(this._hash, tail);\n            for (i = 0; i < 16; i += 1) {\n                tail[i] = 0;\n            }\n        }\n\n        // Do the final computation based on the tail and length\n        // Beware that the final length may not fit in 32 bits so we take care of that\n        tmp = this._length * 8;\n        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);\n        lo = parseInt(tmp[2], 16);\n        hi = parseInt(tmp[1], 16) || 0;\n\n        tail[14] = lo;\n        tail[15] = hi;\n        md5cycle(this._hash, tail);\n    };\n\n    /**\n     * Performs the md5 hash on a string.\n     * A conversion will be applied if utf8 string is detected.\n     *\n     * @param {String}  str The string\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.hash = function (str, raw) {\n        // Converts the string to utf8 bytes if necessary\n        // Then compute it using the binary function\n        return SparkMD5.hashBinary(toUtf8(str), raw);\n    };\n\n    /**\n     * Performs the md5 hash on a binary string.\n     *\n     * @param {String}  content The binary string\n     * @param {Boolean} raw     True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.hashBinary = function (content, raw) {\n        var hash = md51(content),\n            ret = hex(hash);\n\n        return raw ? hexToBinaryString(ret) : ret;\n    };\n\n    // ---------------------------------------------------\n\n    /**\n     * SparkMD5 OOP implementation for array buffers.\n     *\n     * Use this class to perform an incremental md5 ONLY for array buffers.\n     */\n    SparkMD5.ArrayBuffer = function () {\n        // call reset to init the instance\n        this.reset();\n    };\n\n    /**\n     * Appends an array buffer.\n     *\n     * @param {ArrayBuffer} arr The array to be appended\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.append = function (arr) {\n        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),\n            length = buff.length,\n            i;\n\n        this._length += arr.byteLength;\n\n        for (i = 64; i <= length; i += 64) {\n            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));\n        }\n\n        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);\n\n        return this;\n    };\n\n    /**\n     * Finishes the incremental computation, reseting the internal state and\n     * returning the result.\n     *\n     * @param {Boolean} raw True to get the raw string, false to get the hex string\n     *\n     * @return {String} The result\n     */\n    SparkMD5.ArrayBuffer.prototype.end = function (raw) {\n        var buff = this._buff,\n            length = buff.length,\n            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            i,\n            ret;\n\n        for (i = 0; i < length; i += 1) {\n            tail[i >> 2] |= buff[i] << ((i % 4) << 3);\n        }\n\n        this._finish(tail, length);\n        ret = hex(this._hash);\n\n        if (raw) {\n            ret = hexToBinaryString(ret);\n        }\n\n        this.reset();\n\n        return ret;\n    };\n\n    /**\n     * Resets the internal state of the computation.\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.reset = function () {\n        this._buff = new Uint8Array(0);\n        this._length = 0;\n        this._hash = [1732584193, -271733879, -1732584194, 271733878];\n\n        return this;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @return {Object} The state\n     */\n    SparkMD5.ArrayBuffer.prototype.getState = function () {\n        var state = SparkMD5.prototype.getState.call(this);\n\n        // Convert buffer to a string\n        state.buff = arrayBuffer2Utf8Str(state.buff);\n\n        return state;\n    };\n\n    /**\n     * Gets the internal state of the computation.\n     *\n     * @param {Object} state The state\n     *\n     * @return {SparkMD5.ArrayBuffer} The instance itself\n     */\n    SparkMD5.ArrayBuffer.prototype.setState = function (state) {\n        // Convert string to buffer\n        state.buff = utf8Str2ArrayBuffer(state.buff, true);\n\n        return SparkMD5.prototype.setState.call(this, state);\n    };\n\n    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;\n\n    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;\n\n    /**\n     * Performs the md5 hash on an array buffer.\n     *\n     * @param {ArrayBuffer} arr The array buffer\n     * @param {Boolean}     raw True to get the raw string, false to get the hex one\n     *\n     * @return {String} The result\n     */\n    SparkMD5.ArrayBuffer.hash = function (arr, raw) {\n        var hash = md51_array(new Uint8Array(arr)),\n            ret = hex(hash);\n\n        return raw ? hexToBinaryString(ret) : ret;\n    };\n\n    return SparkMD5;\n}));\n\n},{}],18:[function(_dereq_,module,exports){\n\'use strict\';\n\n/**\n * Stringify/parse functions that don\'t operate\n * recursively, so they avoid call stack exceeded\n * errors.\n */\nexports.stringify = function stringify(input) {\n  var queue = [];\n  queue.push({obj: input});\n\n  var res = \'\';\n  var next, obj, prefix, val, i, arrayPrefix, keys, k, key, value, objPrefix;\n  while ((next = queue.pop())) {\n    obj = next.obj;\n    prefix = next.prefix || \'\';\n    val = next.val || \'\';\n    res += prefix;\n    if (val) {\n      res += val;\n    } else if (typeof obj !== \'object\') {\n      res += typeof obj === \'undefined\' ? null : JSON.stringify(obj);\n    } else if (obj === null) {\n      res += \'null\';\n    } else if (Array.isArray(obj)) {\n      queue.push({val: \']\'});\n      for (i = obj.length - 1; i >= 0; i--) {\n        arrayPrefix = i === 0 ? \'\' : \',\';\n        queue.push({obj: obj[i], prefix: arrayPrefix});\n      }\n      queue.push({val: \'[\'});\n    } else { // object\n      keys = [];\n      for (k in obj) {\n        if (obj.hasOwnProperty(k)) {\n          keys.push(k);\n        }\n      }\n      queue.push({val: \'}\'});\n      for (i = keys.length - 1; i >= 0; i--) {\n        key = keys[i];\n        value = obj[key];\n        objPrefix = (i > 0 ? \',\' : \'\');\n        objPrefix += JSON.stringify(key) + \':\';\n        queue.push({obj: value, prefix: objPrefix});\n      }\n      queue.push({val: \'{\'});\n    }\n  }\n  return res;\n};\n\n// Convenience function for the parse function.\n// This pop function is basically copied from\n// pouchCollate.parseIndexableString\nfunction pop(obj, stack, metaStack) {\n  var lastMetaElement = metaStack[metaStack.length - 1];\n  if (obj === lastMetaElement.element) {\n    // popping a meta-element, e.g. an object whose value is another object\n    metaStack.pop();\n    lastMetaElement = metaStack[metaStack.length - 1];\n  }\n  var element = lastMetaElement.element;\n  var lastElementIndex = lastMetaElement.index;\n  if (Array.isArray(element)) {\n    element.push(obj);\n  } else if (lastElementIndex === stack.length - 2) { // obj with key+value\n    var key = stack.pop();\n    element[key] = obj;\n  } else {\n    stack.push(obj); // obj with key only\n  }\n}\n\nexports.parse = function (str) {\n  var stack = [];\n  var metaStack = []; // stack for arrays and objects\n  var i = 0;\n  var collationIndex,parsedNum,numChar;\n  var parsedString,lastCh,numConsecutiveSlashes,ch;\n  var arrayElement, objElement;\n  while (true) {\n    collationIndex = str[i++];\n    if (collationIndex === \'}\' ||\n        collationIndex === \']\' ||\n        typeof collationIndex === \'undefined\') {\n      if (stack.length === 1) {\n        return stack.pop();\n      } else {\n        pop(stack.pop(), stack, metaStack);\n        continue;\n      }\n    }\n    switch (collationIndex) {\n      case \' \':\n      case \'\\t\':\n      case \'\\n\':\n      case \':\':\n      case \',\':\n        break;\n      case \'n\':\n        i += 3; // \'ull\'\n        pop(null, stack, metaStack);\n        break;\n      case \'t\':\n        i += 3; // \'rue\'\n        pop(true, stack, metaStack);\n        break;\n      case \'f\':\n        i += 4; // \'alse\'\n        pop(false, stack, metaStack);\n        break;\n      case \'0\':\n      case \'1\':\n      case \'2\':\n      case \'3\':\n      case \'4\':\n      case \'5\':\n      case \'6\':\n      case \'7\':\n      case \'8\':\n      case \'9\':\n      case \'-\':\n        parsedNum = \'\';\n        i--;\n        while (true) {\n          numChar = str[i++];\n          if (/[\\d\\.\\-e\\+]/.test(numChar)) {\n            parsedNum += numChar;\n          } else {\n            i--;\n            break;\n          }\n        }\n        pop(parseFloat(parsedNum), stack, metaStack);\n        break;\n      case \'"\':\n        parsedString = \'\';\n        lastCh = void 0;\n        numConsecutiveSlashes = 0;\n        while (true) {\n          ch = str[i++];\n          if (ch !== \'"\' || (lastCh === \'\\\\\' &&\n              numConsecutiveSlashes % 2 === 1)) {\n            parsedString += ch;\n            lastCh = ch;\n            if (lastCh === \'\\\\\') {\n              numConsecutiveSlashes++;\n            } else {\n              numConsecutiveSlashes = 0;\n            }\n          } else {\n            break;\n          }\n        }\n        pop(JSON.parse(\'"\' + parsedString + \'"\'), stack, metaStack);\n        break;\n      case \'[\':\n        arrayElement = { element: [], index: stack.length };\n        stack.push(arrayElement.element);\n        metaStack.push(arrayElement);\n        break;\n      case \'{\':\n        objElement = { element: {}, index: stack.length };\n        stack.push(objElement.element);\n        metaStack.push(objElement);\n        break;\n      default:\n        throw new Error(\n          \'unexpectedly reached end of input: \' + collationIndex);\n    }\n  }\n};\n\n},{}]},{},[3])(3)\n});';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*mev-domain-common@0.0.1#src/main/services/context/Context*/
define('mev-domain-common@0.0.1#src/main/services/context/Context', ['lodash'], function (_) {
    'use strict';
    function ngcomponent($state, $stateParams) {
        _.extend(this, {
            root: function () {
                return $state.$current.locals.globals.project;
            },
            current: function () {
                return $state.$current.path[$state.$current.path.length - 1].locals.globals.analysis || $state.$current.path[$state.$current.path.length - 1].locals.globals.dataset || $state.$current.path[$state.$current.path.length - 1].locals.globals.project;
            },
            setLevel: function (level) {
                this.level = level || 'root';
            },
            getLevel: function () {
                return this.level || 'root';
            },
            get: function (level) {
                var root = this.root();
                if (level === 'root')
                    return root;
                else if (level === 'dataset') {
                    return root ? root.dataset : undefined;
                } else
                    return this.current();
            }
        });
    }
    ngcomponent.$inject = [
        '$state',
        '$stateParams'
    ];
    ngcomponent.$name = 'mevContext';
    ngcomponent.$provider = 'service';
    return ngcomponent;
});
/*mev-domain-common@0.0.1#src/main/services/selection/SelectionLocator*/
define('mev-domain-common@0.0.1#src/main/services/selection/SelectionLocator', ['lodash'], function (_) {
    function mevSelectionLocator(mevContext) {
        this.find = function (dimension, level, param) {
            var context = mevContext.current() || mevContext.root();
            if (level)
                context = mevContext.get(level);
            else
                level = mevContext.getLevel() || 'root';
            if (!context)
                return [];
            if (level === 'root') {
                return mevContext.root().dataset.selections[dimension];
            } else {
                if (context.type) {
                    var selections = [];
                    if (context.params && context.params.control && context.params.experiment) {
                        var name = _.isObject(context.params.control) ? context.params.experiment.name + '+' + context.params.control.name : context.params.experiment + '+' + context.params.control;
                        var unionSet = {
                            name: name,
                            keys: []
                        };
                        _.transform(mevContext.root().dataset.selections[dimension], function (result, selection, index) {
                            if (context.params.dimension === dimension && (selection.name === context.params.control || selection.name === context.params.experiment)) {
                                result.keys = _.union(result.keys, selection.keys);
                            }
                        }, unionSet);
                        if (unionSet.keys.length > 0) {
                            selections.push(unionSet);
                        }
                    }
                    if (context.getFilteredKeys) {
                        var filteredKeys = context.getFilteredKeys(dimension);
                        if (filteredKeys && filteredKeys.length > 0) {
                            selections.push({
                                name: 'current filter',
                                keys: filteredKeys
                            });
                        }
                    }
                    if (context.getOriginalInputKeys) {
                        var filteredKeys = context.getOriginalInputKeys(dimension);
                        if (filteredKeys && filteredKeys.length > 0) {
                            selections.push({
                                name: filteredKeys.displayName || 'original ' + dimension + ' input',
                                keys: filteredKeys
                            });
                        }
                    }
                    if (param && param.id === 'experiment' && context.getExperiment) {
                        selections.push(context.getExperiment());
                    }
                    if (param && param.id === 'control' && context.getControl) {
                        selections.push(context.getControl());
                    }
                    if (context.getSelections) {
                        context.getSelections().map(function (selection) {
                            selection.selected = selection.checked || selection.selected;
                            selections.push(selection);
                        });
                    }
                    return selections;
                } else {
                    return mevContext.root().dataset.selections[dimension];
                }
            }
        };
        this.row = function () {
            return this.find('row');
        };
        this.column = function () {
            return this.find('column');
        };
    }
    mevSelectionLocator.$inject = ['mevContext'];
    mevSelectionLocator.$name = 'mevSelectionLocator';
    mevSelectionLocator.$provider = 'service';
    return mevSelectionLocator;
});
/*mev-domain-common@0.0.1#src/main/services/analysis/AnalysisLocator*/
define('mev-domain-common@0.0.1#src/main/services/analysis/AnalysisLocator', ['lodash'], function (_) {
    function mevAnalysisLocator(mevContext) {
        function isAnalysisOfType(types, analysis) {
            return _.find(types, function (type) {
                return analysis.type === type;
            });
        }
        this.find = function (type) {
            var context = mevContext.current() || mevContext.root();
            if (!context)
                return;
            if (_.isArray(type)) {
                if (context.type && isAnalysisOfType(type, context)) {
                    return [context];
                } else {
                    return _.filter(mevContext.root().dataset.analyses, function (analysis) {
                        return isAnalysisOfType(type, analysis);
                    });
                }
            } else if (_.isString(type)) {
                if (context.type && context.type === type)
                    return [mevContext.current()];
                else
                    return _.filter(mevContext.root().dataset.analyses, function (analysis) {
                        return analysis.type === type;
                    });
            } else if (_.isObject(type)) {
                if (!type.name)
                    throw new Error('meAnalysisLocator - must specify analysis name: ' + JSON.stringify(type));
                return _.find(mevContext.root().dataset.analyses, function (analysis) {
                    return analysis.name === type.name;
                });
            } else {
                return mevContext.root().dataset.analysis;
            }
        };
    }
    mevAnalysisLocator.$inject = ['mevContext'];
    mevAnalysisLocator.$name = 'mevAnalysisLocator';
    mevAnalysisLocator.$provider = 'service';
    return mevAnalysisLocator;
});
/*mev-domain-common@0.0.1#src/main/services/annotations/AnnotationsLocator*/
define('mev-domain-common@0.0.1#src/main/services/annotations/AnnotationsLocator', [], function () {
    function mevSelectionLocator(mevContext, MevAnnotationRepository) {
        this.find = function (dimension) {
            var dataset = mevContext.root().dataset;
            return dataset.getAnnotations(dimension);
        };
        this.row = function () {
            return this.find('row');
        };
        this.column = function () {
            return this.find('column');
        };
    }
    mevSelectionLocator.$inject = [
        'mevContext',
        'mevAnnotationRepository'
    ];
    mevSelectionLocator.$name = 'mevAnnotationsLocator';
    mevSelectionLocator.$provider = 'service';
    return mevSelectionLocator;
});
/*worker-pouch*/
(function (f) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = f();
    } else if (typeof define === 'function' && define.amd) {
        define('worker-pouch', [], f);
    } else {
        var g;
        if (typeof window !== 'undefined') {
            g = window;
        } else if (typeof global !== 'undefined') {
            g = global;
        } else if (typeof self !== 'undefined') {
            g = self;
        } else {
            g = this;
        }
        g.workerPouch = f();
    }
}(function () {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == 'function' && require;
                    if (!u && a)
                        return a(o, !0);
                    if (i)
                        return i(o, !0);
                    var f = new Error('Cannot find module \'' + o + '\'');
                    throw f.code = 'MODULE_NOT_FOUND', f;
                }
                var l = n[o] = { exports: {} };
                t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = typeof require == 'function' && require;
        for (var o = 0; o < r.length; o++)
            s(r[o]);
        return s;
    }({
        1: [
            function (_dereq_, module, exports) {
                'use strict';
                module.exports = function createWorker(code) {
                    var createBlob = _dereq_(7).createBlob;
                    var URLCompat = typeof URL !== 'undefined' ? URL : webkitURL;
                    function makeBlobURI(script) {
                        var blob = createBlob([script], { type: 'text/javascript' });
                        return URLCompat.createObjectURL(blob);
                    }
                    var blob = createBlob([code], { type: 'text/javascript' });
                    return new Worker(makeBlobURI(blob));
                };
            },
            { '7': 7 }
        ],
        2: [
            function (_dereq_, module, exports) {
                (function (global) {
                    'use strict';
                    var utils = _dereq_(7);
                    var clientUtils = _dereq_(4);
                    var uuid = _dereq_(8);
                    var errors = _dereq_(5);
                    var log = _dereq_(10)('pouchdb:worker:client');
                    var preprocessAttachments = clientUtils.preprocessAttachments;
                    var encodeArgs = clientUtils.encodeArgs;
                    var adapterFun = clientUtils.adapterFun;
                    var isSupportedBrowser = _dereq_(3);
                    var createWorker = _dereq_(1);
                    var worker;
                    try {
                        worker = createWorker(_dereq_(9));
                        worker.addEventListener('error', function (e) {
                            if ('console' in global && 'warn' in console) {
                                console.warn('worker threw an error', e.error);
                            }
                        });
                    } catch (e) {
                        if ('console' in global && 'info' in console) {
                            console.info('This browser is not supported by WorkerPouch. ' + 'Please use isSupportedBrowser() to check.', e);
                        }
                    }
                    function WorkerPouch(opts, callback) {
                        var api = this;
                        if (typeof opts === 'string') {
                            var slashIdx = utils.lastIndexOf(opts, '/');
                            opts = {
                                url: opts.substring(0, slashIdx),
                                name: opts.substring(slashIdx + 1)
                            };
                        } else {
                            opts = utils.clone(opts);
                        }
                        log('constructor called', opts);
                        if (!opts.name) {
                            var optsErrMessage = 'Error: you must provide a database name.';
                            console.error(optsErrMessage);
                            return callback(new Error(optsErrMessage));
                        }
                        function handleUncaughtError(content) {
                            try {
                                api.emit('error', content);
                            } catch (err) {
                                console.error('The user\'s map/reduce function threw an uncaught error.\n' + 'You can debug this error by doing:\n' + 'myDatabase.on(\'error\', function (err) { debugger; });\n' + 'Please double-check your map/reduce function.');
                                console.error(content);
                            }
                        }
                        function onReceiveMessage(message) {
                            var messageId = message.messageId;
                            var messageType = message.type;
                            var content = message.content;
                            if (messageType === 'uncaughtError') {
                                handleUncaughtError(content);
                                return;
                            }
                            var cb = api._callbacks[messageId];
                            if (!cb) {
                                log('duplicate message (ignoring)', messageId, messageType, content);
                                return;
                            }
                            log('receive message', api._instanceId, messageId, messageType, content);
                            if (messageType === 'error') {
                                delete api._callbacks[messageId];
                                cb(content);
                            } else if (messageType === 'success') {
                                delete api._callbacks[messageId];
                                cb(null, content);
                            } else {
                                api._changesListeners[messageId](content);
                            }
                        }
                        function workerListener(e) {
                            if (e.data.id === api._instanceId) {
                                onReceiveMessage(e.data);
                            }
                        }
                        function sendMessage(type, args, callback) {
                            var messageId = uuid();
                            log('send message', api._socketId, messageId, type, args);
                            api._callbacks[messageId] = callback;
                            var encodedArgs = encodeArgs(args);
                            worker.postMessage({
                                id: api._instanceId,
                                type: type,
                                messageId: messageId,
                                args: encodedArgs
                            });
                            log('message sent', api._instanceId, messageId);
                        }
                        function sendRawMessage(messageId, type, args) {
                            log('send message', api._socketId, messageId, type, args);
                            var encodedArgs = encodeArgs(args);
                            worker.postMessage({
                                id: api._instanceId,
                                type: type,
                                messageId: messageId,
                                args: encodedArgs
                            });
                            log('message sent', api._instanceId, messageId);
                        }
                        api.type = function () {
                            return 'socket';
                        };
                        api._id = adapterFun('id', function (callback) {
                            sendMessage('id', [], callback);
                        });
                        api.compact = adapterFun('compact', function (opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('compact', [opts], callback);
                        });
                        api._info = function (callback) {
                            sendMessage('info', [], callback);
                        };
                        api.get = adapterFun('get', function (id, opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('get', [
                                id,
                                opts
                            ], callback);
                        });
                        api.remove = adapterFun('remove', function (docOrId, optsOrRev, opts, callback) {
                            var doc;
                            if (typeof optsOrRev === 'string') {
                                doc = {
                                    _id: docOrId,
                                    _rev: optsOrRev
                                };
                                if (typeof opts === 'function') {
                                    callback = opts;
                                    opts = {};
                                }
                            } else {
                                doc = docOrId;
                                if (typeof optsOrRev === 'function') {
                                    callback = optsOrRev;
                                    opts = {};
                                } else {
                                    callback = opts;
                                    opts = optsOrRev;
                                }
                            }
                            var rev = doc._rev || opts.rev;
                            sendMessage('remove', [
                                doc._id,
                                rev
                            ], callback);
                        });
                        api.getAttachment = adapterFun('getAttachment', function (docId, attachmentId, opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('getAttachment', [
                                docId,
                                attachmentId,
                                opts
                            ], callback);
                        });
                        api.removeAttachment = adapterFun('removeAttachment', function (docId, attachmentId, rev, callback) {
                            sendMessage('removeAttachment', [
                                docId,
                                attachmentId,
                                rev
                            ], callback);
                        });
                        api.putAttachment = adapterFun('putAttachment', function (docId, attachmentId, rev, blob, type, callback) {
                            if (typeof type === 'function') {
                                callback = type;
                                type = blob;
                                blob = rev;
                                rev = null;
                            }
                            if (typeof type === 'undefined') {
                                type = blob;
                                blob = rev;
                                rev = null;
                            }
                            if (typeof blob === 'string') {
                                var binary;
                                try {
                                    binary = atob(blob);
                                } catch (err) {
                                    return callback(errors.error(errors.BAD_ARG, 'Attachments need to be base64 encoded'));
                                }
                                blob = utils.createBlob([utils.binaryStringToArrayBuffer(binary)], { type: type });
                            }
                            var args = [
                                docId,
                                attachmentId,
                                rev,
                                blob,
                                type
                            ];
                            sendMessage('putAttachment', args, callback);
                        });
                        api.put = adapterFun('put', utils.getArguments(function (args) {
                            var temp, temptype, opts;
                            var doc = args.shift();
                            var id = '_id' in doc;
                            var callback = args.pop();
                            if (typeof doc !== 'object' || Array.isArray(doc)) {
                                return callback(errors.error(errors.NOT_AN_OBJECT));
                            }
                            doc = utils.clone(doc);
                            preprocessAttachments(doc).then(function () {
                                while (true) {
                                    temp = args.shift();
                                    temptype = typeof temp;
                                    if (temptype === 'string' && !id) {
                                        doc._id = temp;
                                        id = true;
                                    } else if (temptype === 'string' && id && !('_rev' in doc)) {
                                        doc._rev = temp;
                                    } else if (temptype === 'object') {
                                        opts = utils.clone(temp);
                                    }
                                    if (!args.length) {
                                        break;
                                    }
                                }
                                opts = opts || {};
                                sendMessage('put', [
                                    doc,
                                    opts
                                ], callback);
                            })['catch'](callback);
                        }));
                        api.post = adapterFun('post', function (doc, opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            opts = utils.clone(opts);
                            sendMessage('post', [
                                doc,
                                opts
                            ], callback);
                        });
                        api._bulkDocs = function (req, opts, callback) {
                            sendMessage('bulkDocs', [
                                req,
                                opts
                            ], callback);
                        };
                        api._allDocs = function (opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('allDocs', [opts], callback);
                        };
                        api._changes = function (opts) {
                            opts = utils.clone(opts);
                            if (opts.continuous) {
                                var messageId = uuid();
                                api._changesListeners[messageId] = opts.onChange;
                                api._callbacks[messageId] = opts.complete;
                                sendRawMessage(messageId, 'liveChanges', [opts]);
                                return {
                                    cancel: function () {
                                        sendRawMessage(messageId, 'cancelChanges', []);
                                    }
                                };
                            }
                            sendMessage('changes', [opts], function (err, res) {
                                if (err) {
                                    opts.complete(err);
                                    return callback(err);
                                }
                                res.results.forEach(function (change) {
                                    opts.onChange(change);
                                });
                                if (opts.returnDocs === false || opts.return_docs === false) {
                                    res.results = [];
                                }
                                opts.complete(null, res);
                            });
                        };
                        api.revsDiff = adapterFun('revsDiff', function (req, opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('revsDiff', [
                                req,
                                opts
                            ], callback);
                        });
                        api._query = adapterFun('query', function (fun, opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            var funEncoded = fun;
                            if (typeof fun === 'function') {
                                funEncoded = { map: fun };
                            }
                            sendMessage('query', [
                                funEncoded,
                                opts
                            ], callback);
                        });
                        api._viewCleanup = adapterFun('viewCleanup', function (callback) {
                            sendMessage('viewCleanup', [], callback);
                        });
                        api._close = function (callback) {
                            callback();
                        };
                        api.destroy = adapterFun('destroy', function (opts, callback) {
                            if (typeof opts === 'function') {
                                callback = opts;
                                opts = {};
                            }
                            sendMessage('destroy', [], function (err, res) {
                                if (err) {
                                    api.emit('error', err);
                                    return callback(err);
                                }
                                worker.removeEventListener('message', workerListener);
                                api.emit('destroyed');
                                api.constructor.emit('destroyed', api._name);
                                callback(null, res);
                            });
                        });
                        api._instanceId = opts.originalName;
                        api._callbacks = {};
                        api._changesListeners = {};
                        api._name = opts.originalName;
                        worker.addEventListener('message', workerListener);
                        sendMessage('createDatabase', [{
                                name: api._name,
                                auto_compaction: !!opts.auto_compaction
                            }], function (err) {
                            if (err) {
                                return callback(err);
                            }
                            callback(null, api);
                        });
                    }
                    WorkerPouch.valid = function () {
                        return true;
                    };
                    WorkerPouch.isSupportedBrowser = isSupportedBrowser;
                    module.exports = WorkerPouch;
                    if (typeof window !== 'undefined' && window.PouchDB) {
                        window.PouchDB.adapter('worker', module.exports);
                    }
                }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {
                '1': 1,
                '10': 10,
                '3': 3,
                '4': 4,
                '5': 5,
                '7': 7,
                '8': 8,
                '9': 9
            }
        ],
        3: [
            function (_dereq_, module, exports) {
                (function (global) {
                    'use strict';
                    var Promise = _dereq_(15);
                    var createWorker = _dereq_(1);
                    module.exports = function isSupportedBrowser() {
                        return Promise.resolve().then(function () {
                            var worker = createWorker('' + 'self.onmessage = function () {' + '  self.postMessage({' + '    hasIndexedDB: (typeof indexedDB !== "undefined")' + '  });' + '};');
                            return new Promise(function (resolve, reject) {
                                function listener(e) {
                                    worker.terminate();
                                    if (e.data.hasIndexedDB) {
                                        resolve();
                                        return;
                                    }
                                    reject();
                                }
                                function errorListener() {
                                    worker.terminate();
                                    reject();
                                }
                                worker.addEventListener('error', errorListener);
                                worker.addEventListener('message', listener);
                                worker.postMessage({});
                            });
                        }).then(function () {
                            return true;
                        }, function (err) {
                            if ('console' in global && 'info' in console) {
                                console.info('This browser is not supported by WorkerPouch', err);
                            }
                            return false;
                        });
                    };
                }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {
                '1': 1,
                '15': 15
            }
        ],
        4: [
            function (_dereq_, module, exports) {
                (function (process) {
                    'use strict';
                    var utils = _dereq_(7);
                    var log = _dereq_(10)('pouchdb:socket:client');
                    var isBrowser = typeof process === 'undefined' || process.browser;
                    exports.preprocessAttachments = function preprocessAttachments(doc) {
                        if (!doc._attachments || !Object.keys(doc._attachments)) {
                            return utils.Promise.resolve();
                        }
                        return utils.Promise.all(Object.keys(doc._attachments).map(function (key) {
                            var attachment = doc._attachments[key];
                            if (attachment.data && typeof attachment.data !== 'string') {
                                if (isBrowser) {
                                    return new utils.Promise(function (resolve) {
                                        utils.readAsBinaryString(attachment.data, function (binary) {
                                            attachment.data = btoa(binary);
                                            resolve();
                                        });
                                    });
                                } else {
                                    attachment.data = attachment.data.toString('base64');
                                }
                            }
                        }));
                    };
                    function encodeObjectArg(arg) {
                        var funcKeys = [
                            'filter',
                            'map',
                            'reduce'
                        ];
                        var keysToRemove = [
                            'onChange',
                            'processChange',
                            'complete'
                        ];
                        var clonedArg = {};
                        Object.keys(arg).forEach(function (key) {
                            if (keysToRemove.indexOf(key) !== -1) {
                                return;
                            }
                            if (funcKeys.indexOf(key) !== -1 && typeof arg[key] === 'function') {
                                clonedArg[key] = {
                                    type: 'func',
                                    func: arg[key].toString()
                                };
                            } else {
                                clonedArg[key] = arg[key];
                            }
                        });
                        return clonedArg;
                    }
                    exports.encodeArgs = function encodeArgs(args) {
                        var result = [];
                        args.forEach(function (arg) {
                            if (arg === null || typeof arg !== 'object' || Array.isArray(arg) || arg instanceof Blob || arg instanceof Date) {
                                result.push(arg);
                            } else {
                                result.push(encodeObjectArg(arg));
                            }
                        });
                        return result;
                    };
                    exports.padInt = function padInt(i, len) {
                        var res = i.toString();
                        while (res.length < len) {
                            res = '0' + res;
                        }
                        return res;
                    };
                    exports.adapterFun = function adapterFun(name, callback) {
                        function logApiCall(self, name, args) {
                            if (!log.enabled) {
                                return;
                            }
                            var logArgs = [
                                self._db_name,
                                name
                            ];
                            for (var i = 0; i < args.length - 1; i++) {
                                logArgs.push(args[i]);
                            }
                            log.apply(null, logArgs);
                            var origCallback = args[args.length - 1];
                            args[args.length - 1] = function (err, res) {
                                var responseArgs = [
                                    self._db_name,
                                    name
                                ];
                                responseArgs = responseArgs.concat(err ? [
                                    'error',
                                    err
                                ] : [
                                    'success',
                                    res
                                ]);
                                log.apply(null, responseArgs);
                                origCallback(err, res);
                            };
                        }
                        return utils.toPromise(utils.getArguments(function (args) {
                            if (this._closed) {
                                return utils.Promise.reject(new Error('database is closed'));
                            }
                            var self = this;
                            logApiCall(self, name, args);
                            if (!this.taskqueue.isReady) {
                                return new utils.Promise(function (fulfill, reject) {
                                    self.taskqueue.addTask(function (failed) {
                                        if (failed) {
                                            reject(failed);
                                        } else {
                                            fulfill(self[name].apply(self, args));
                                        }
                                    });
                                });
                            }
                            return callback.apply(this, args);
                        }));
                    };
                }.call(this, _dereq_(19)));
            },
            {
                '10': 10,
                '19': 19,
                '7': 7
            }
        ],
        5: [
            function (_dereq_, module, exports) {
                'use strict';
                var inherits = _dereq_(12);
                inherits(PouchError, Error);
                function PouchError(opts) {
                    Error.call(opts.reason);
                    this.status = opts.status;
                    this.name = opts.error;
                    this.message = opts.reason;
                    this.error = true;
                }
                PouchError.prototype.toString = function () {
                    return JSON.stringify({
                        status: this.status,
                        name: this.name,
                        message: this.message
                    });
                };
                exports.UNAUTHORIZED = new PouchError({
                    status: 401,
                    error: 'unauthorized',
                    reason: 'Name or password is incorrect.'
                });
                exports.MISSING_BULK_DOCS = new PouchError({
                    status: 400,
                    error: 'bad_request',
                    reason: 'Missing JSON list of \'docs\''
                });
                exports.MISSING_DOC = new PouchError({
                    status: 404,
                    error: 'not_found',
                    reason: 'missing'
                });
                exports.REV_CONFLICT = new PouchError({
                    status: 409,
                    error: 'conflict',
                    reason: 'Document update conflict'
                });
                exports.INVALID_ID = new PouchError({
                    status: 400,
                    error: 'invalid_id',
                    reason: '_id field must contain a string'
                });
                exports.MISSING_ID = new PouchError({
                    status: 412,
                    error: 'missing_id',
                    reason: '_id is required for puts'
                });
                exports.RESERVED_ID = new PouchError({
                    status: 400,
                    error: 'bad_request',
                    reason: 'Only reserved document ids may start with underscore.'
                });
                exports.NOT_OPEN = new PouchError({
                    status: 412,
                    error: 'precondition_failed',
                    reason: 'Database not open'
                });
                exports.UNKNOWN_ERROR = new PouchError({
                    status: 500,
                    error: 'unknown_error',
                    reason: 'Database encountered an unknown error'
                });
                exports.BAD_ARG = new PouchError({
                    status: 500,
                    error: 'badarg',
                    reason: 'Some query argument is invalid'
                });
                exports.INVALID_REQUEST = new PouchError({
                    status: 400,
                    error: 'invalid_request',
                    reason: 'Request was invalid'
                });
                exports.QUERY_PARSE_ERROR = new PouchError({
                    status: 400,
                    error: 'query_parse_error',
                    reason: 'Some query parameter is invalid'
                });
                exports.DOC_VALIDATION = new PouchError({
                    status: 500,
                    error: 'doc_validation',
                    reason: 'Bad special document member'
                });
                exports.BAD_REQUEST = new PouchError({
                    status: 400,
                    error: 'bad_request',
                    reason: 'Something wrong with the request'
                });
                exports.NOT_AN_OBJECT = new PouchError({
                    status: 400,
                    error: 'bad_request',
                    reason: 'Document must be a JSON object'
                });
                exports.DB_MISSING = new PouchError({
                    status: 404,
                    error: 'not_found',
                    reason: 'Database not found'
                });
                exports.IDB_ERROR = new PouchError({
                    status: 500,
                    error: 'indexed_db_went_bad',
                    reason: 'unknown'
                });
                exports.WSQ_ERROR = new PouchError({
                    status: 500,
                    error: 'web_sql_went_bad',
                    reason: 'unknown'
                });
                exports.LDB_ERROR = new PouchError({
                    status: 500,
                    error: 'levelDB_went_went_bad',
                    reason: 'unknown'
                });
                exports.FORBIDDEN = new PouchError({
                    status: 403,
                    error: 'forbidden',
                    reason: 'Forbidden by design doc validate_doc_update function'
                });
                exports.INVALID_REV = new PouchError({
                    status: 400,
                    error: 'bad_request',
                    reason: 'Invalid rev format'
                });
                exports.FILE_EXISTS = new PouchError({
                    status: 412,
                    error: 'file_exists',
                    reason: 'The database could not be created, the file already exists.'
                });
                exports.MISSING_STUB = new PouchError({
                    status: 412,
                    error: 'missing_stub'
                });
                exports.error = function (error, reason, name) {
                    function CustomPouchError(reason) {
                        for (var p in error) {
                            if (typeof error[p] !== 'function') {
                                this[p] = error[p];
                            }
                        }
                        if (name !== undefined) {
                            this.name = name;
                        }
                        if (reason !== undefined) {
                            this.reason = reason;
                        }
                    }
                    CustomPouchError.prototype = PouchError.prototype;
                    return new CustomPouchError(reason);
                };
                exports.getErrorTypeByProp = function (prop, value, reason) {
                    var errors = exports;
                    var keys = Object.keys(errors).filter(function (key) {
                        var error = errors[key];
                        return typeof error !== 'function' && error[prop] === value;
                    });
                    var key = reason && keys.filter(function (key) {
                        var error = errors[key];
                        return error.message === reason;
                    })[0] || keys[0];
                    return key ? errors[key] : null;
                };
                exports.generateErrorFromResponse = function (res) {
                    var error, errName, errType, errMsg, errReason;
                    var errors = exports;
                    errName = res.error === true && typeof res.name === 'string' ? res.name : res.error;
                    errReason = res.reason;
                    errType = errors.getErrorTypeByProp('name', errName, errReason);
                    if (res.missing || errReason === 'missing' || errReason === 'deleted' || errName === 'not_found') {
                        errType = errors.MISSING_DOC;
                    } else if (errName === 'doc_validation') {
                        errType = errors.DOC_VALIDATION;
                        errMsg = errReason;
                    } else if (errName === 'bad_request' && errType.message !== errReason) {
                        if (errReason.indexOf('unknown stub attachment') === 0) {
                            errType = errors.MISSING_STUB;
                            errMsg = errReason;
                        } else {
                            errType = errors.BAD_REQUEST;
                        }
                    }
                    if (!errType) {
                        errType = errors.getErrorTypeByProp('status', res.status, errReason) || errors.UNKNOWN_ERROR;
                    }
                    error = errors.error(errType, errReason, errName);
                    if (errMsg) {
                        error.message = errMsg;
                    }
                    if (res.id) {
                        error.id = res.id;
                    }
                    if (res.status) {
                        error.status = res.status;
                    }
                    if (res.statusText) {
                        error.name = res.statusText;
                    }
                    if (res.missing) {
                        error.missing = res.missing;
                    }
                    return error;
                };
            },
            { '12': 12 }
        ],
        6: [
            function (_dereq_, module, exports) {
                'use strict';
                function isBinaryObject(object) {
                    return object instanceof ArrayBuffer || typeof Blob !== 'undefined' && object instanceof Blob;
                }
                function cloneArrayBuffer(buff) {
                    if (typeof buff.slice === 'function') {
                        return buff.slice(0);
                    }
                    var target = new ArrayBuffer(buff.byteLength);
                    var targetArray = new Uint8Array(target);
                    var sourceArray = new Uint8Array(buff);
                    targetArray.set(sourceArray);
                    return target;
                }
                function cloneBinaryObject(object) {
                    if (object instanceof ArrayBuffer) {
                        return cloneArrayBuffer(object);
                    }
                    return object.slice(0, object.size, object.type);
                }
                module.exports = function clone(object) {
                    var newObject;
                    var i;
                    var len;
                    if (!object || typeof object !== 'object') {
                        return object;
                    }
                    if (Array.isArray(object)) {
                        newObject = [];
                        for (i = 0, len = object.length; i < len; i++) {
                            newObject[i] = clone(object[i]);
                        }
                        return newObject;
                    }
                    if (object instanceof Date) {
                        return object.toISOString();
                    }
                    if (isBinaryObject(object)) {
                        return cloneBinaryObject(object);
                    }
                    newObject = {};
                    for (i in object) {
                        if (Object.prototype.hasOwnProperty.call(object, i)) {
                            var value = clone(object[i]);
                            if (typeof value !== 'undefined') {
                                newObject[i] = value;
                            }
                        }
                    }
                    return newObject;
                };
            },
            {}
        ],
        7: [
            function (_dereq_, module, exports) {
                (function (process) {
                    'use strict';
                    var Promise = _dereq_(15);
                    exports.lastIndexOf = function lastIndexOf(str, char) {
                        for (var i = str.length - 1; i >= 0; i--) {
                            if (str.charAt(i) === char) {
                                return i;
                            }
                        }
                        return -1;
                    };
                    exports.clone = _dereq_(6);
                    exports.once = function once(fun) {
                        var called = false;
                        return exports.getArguments(function (args) {
                            if (called) {
                                console.trace();
                                throw new Error('once called  more than once');
                            } else {
                                called = true;
                                fun.apply(this, args);
                            }
                        });
                    };
                    exports.getArguments = function getArguments(fun) {
                        return function () {
                            var len = arguments.length;
                            var args = new Array(len);
                            var i = -1;
                            while (++i < len) {
                                args[i] = arguments[i];
                            }
                            return fun.call(this, args);
                        };
                    };
                    exports.toPromise = function toPromise(func) {
                        return exports.getArguments(function (args) {
                            var self = this;
                            var tempCB = typeof args[args.length - 1] === 'function' ? args.pop() : false;
                            var usedCB;
                            if (tempCB) {
                                usedCB = function (err, resp) {
                                    process.nextTick(function () {
                                        tempCB(err, resp);
                                    });
                                };
                            }
                            var promise = new Promise(function (fulfill, reject) {
                                try {
                                    var callback = exports.once(function (err, mesg) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            fulfill(mesg);
                                        }
                                    });
                                    args.push(callback);
                                    func.apply(self, args);
                                } catch (e) {
                                    reject(e);
                                }
                            });
                            if (usedCB) {
                                promise.then(function (result) {
                                    usedCB(null, result);
                                }, usedCB);
                            }
                            promise.cancel = function () {
                                return this;
                            };
                            return promise;
                        });
                    };
                    exports.inherits = _dereq_(12);
                    exports.Promise = Promise;
                    var binUtil = _dereq_(14);
                    exports.createBlob = binUtil.createBlob;
                    exports.readAsArrayBuffer = binUtil.readAsArrayBuffer;
                    exports.readAsBinaryString = binUtil.readAsBinaryString;
                    exports.binaryStringToArrayBuffer = binUtil.binaryStringToArrayBuffer;
                    exports.arrayBufferToBinaryString = binUtil.arrayBufferToBinaryString;
                }.call(this, _dereq_(19)));
            },
            {
                '12': 12,
                '14': 14,
                '15': 15,
                '19': 19,
                '6': 6
            }
        ],
        8: [
            function (_dereq_, module, exports) {
                'use strict';
                var chars = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz').split('');
                function getValue(radix) {
                    return 0 | Math.random() * radix;
                }
                function uuid(len, radix) {
                    radix = radix || chars.length;
                    var out = '';
                    var i = -1;
                    if (len) {
                        while (++i < len) {
                            out += chars[getValue(radix)];
                        }
                        return out;
                    }
                    while (++i < 36) {
                        switch (i) {
                        case 8:
                        case 13:
                        case 18:
                        case 23:
                            out += '-';
                            break;
                        case 19:
                            out += chars[getValue(16) & 3 | 8];
                            break;
                        default:
                            out += chars[getValue(16)];
                        }
                    }
                    return out;
                }
                module.exports = uuid;
            },
            {}
        ],
        9: [
            function (_dereq_, module, exports) {
            },
            {}
        ],
        10: [
            function (_dereq_, module, exports) {
                exports = module.exports = _dereq_(11);
                exports.log = log;
                exports.formatArgs = formatArgs;
                exports.save = save;
                exports.load = load;
                exports.useColors = useColors;
                exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
                exports.colors = [
                    'lightseagreen',
                    'forestgreen',
                    'goldenrod',
                    'dodgerblue',
                    'darkorchid',
                    'crimson'
                ];
                function useColors() {
                    return 'WebkitAppearance' in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
                }
                exports.formatters.j = function (v) {
                    return JSON.stringify(v);
                };
                function formatArgs() {
                    var args = arguments;
                    var useColors = this.useColors;
                    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
                    if (!useColors)
                        return args;
                    var c = 'color: ' + this.color;
                    args = [
                        args[0],
                        c,
                        'color: inherit'
                    ].concat(Array.prototype.slice.call(args, 1));
                    var index = 0;
                    var lastC = 0;
                    args[0].replace(/%[a-z%]/g, function (match) {
                        if ('%%' === match)
                            return;
                        index++;
                        if ('%c' === match) {
                            lastC = index;
                        }
                    });
                    args.splice(lastC, 0, c);
                    return args;
                }
                function log() {
                    return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
                }
                function save(namespaces) {
                    try {
                        if (null == namespaces) {
                            exports.storage.removeItem('debug');
                        } else {
                            exports.storage.debug = namespaces;
                        }
                    } catch (e) {
                    }
                }
                function load() {
                    var r;
                    try {
                        r = exports.storage.debug;
                    } catch (e) {
                    }
                    return r;
                }
                exports.enable(load());
                function localstorage() {
                    try {
                        return window.localStorage;
                    } catch (e) {
                    }
                }
            },
            { '11': 11 }
        ],
        11: [
            function (_dereq_, module, exports) {
                exports = module.exports = debug;
                exports.coerce = coerce;
                exports.disable = disable;
                exports.enable = enable;
                exports.enabled = enabled;
                exports.humanize = _dereq_(13);
                exports.names = [];
                exports.skips = [];
                exports.formatters = {};
                var prevColor = 0;
                var prevTime;
                function selectColor() {
                    return exports.colors[prevColor++ % exports.colors.length];
                }
                function debug(namespace) {
                    function disabled() {
                    }
                    disabled.enabled = false;
                    function enabled() {
                        var self = enabled;
                        var curr = +new Date();
                        var ms = curr - (prevTime || curr);
                        self.diff = ms;
                        self.prev = prevTime;
                        self.curr = curr;
                        prevTime = curr;
                        if (null == self.useColors)
                            self.useColors = exports.useColors();
                        if (null == self.color && self.useColors)
                            self.color = selectColor();
                        var args = Array.prototype.slice.call(arguments);
                        args[0] = exports.coerce(args[0]);
                        if ('string' !== typeof args[0]) {
                            args = ['%o'].concat(args);
                        }
                        var index = 0;
                        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
                            if (match === '%%')
                                return match;
                            index++;
                            var formatter = exports.formatters[format];
                            if ('function' === typeof formatter) {
                                var val = args[index];
                                match = formatter.call(self, val);
                                args.splice(index, 1);
                                index--;
                            }
                            return match;
                        });
                        if ('function' === typeof exports.formatArgs) {
                            args = exports.formatArgs.apply(self, args);
                        }
                        var logFn = enabled.log || exports.log || console.log.bind(console);
                        logFn.apply(self, args);
                    }
                    enabled.enabled = true;
                    var fn = exports.enabled(namespace) ? enabled : disabled;
                    fn.namespace = namespace;
                    return fn;
                }
                function enable(namespaces) {
                    exports.save(namespaces);
                    var split = (namespaces || '').split(/[\s,]+/);
                    var len = split.length;
                    for (var i = 0; i < len; i++) {
                        if (!split[i])
                            continue;
                        namespaces = split[i].replace(/\*/g, '.*?');
                        if (namespaces[0] === '-') {
                            exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                        } else {
                            exports.names.push(new RegExp('^' + namespaces + '$'));
                        }
                    }
                }
                function disable() {
                    exports.enable('');
                }
                function enabled(name) {
                    var i, len;
                    for (i = 0, len = exports.skips.length; i < len; i++) {
                        if (exports.skips[i].test(name)) {
                            return false;
                        }
                    }
                    for (i = 0, len = exports.names.length; i < len; i++) {
                        if (exports.names[i].test(name)) {
                            return true;
                        }
                    }
                    return false;
                }
                function coerce(val) {
                    if (val instanceof Error)
                        return val.stack || val.message;
                    return val;
                }
            },
            { '13': 13 }
        ],
        12: [
            function (_dereq_, module, exports) {
                if (typeof Object.create === 'function') {
                    module.exports = function inherits(ctor, superCtor) {
                        ctor.super_ = superCtor;
                        ctor.prototype = Object.create(superCtor.prototype, {
                            constructor: {
                                value: ctor,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                    };
                } else {
                    module.exports = function inherits(ctor, superCtor) {
                        ctor.super_ = superCtor;
                        var TempCtor = function () {
                        };
                        TempCtor.prototype = superCtor.prototype;
                        ctor.prototype = new TempCtor();
                        ctor.prototype.constructor = ctor;
                    };
                }
            },
            {}
        ],
        13: [
            function (_dereq_, module, exports) {
                var s = 1000;
                var m = s * 60;
                var h = m * 60;
                var d = h * 24;
                var y = d * 365.25;
                module.exports = function (val, options) {
                    options = options || {};
                    if ('string' == typeof val)
                        return parse(val);
                    return options['long'] ? long(val) : short(val);
                };
                function parse(str) {
                    str = '' + str;
                    if (str.length > 10000)
                        return;
                    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                    if (!match)
                        return;
                    var n = parseFloat(match[1]);
                    var type = (match[2] || 'ms').toLowerCase();
                    switch (type) {
                    case 'years':
                    case 'year':
                    case 'yrs':
                    case 'yr':
                    case 'y':
                        return n * y;
                    case 'days':
                    case 'day':
                    case 'd':
                        return n * d;
                    case 'hours':
                    case 'hour':
                    case 'hrs':
                    case 'hr':
                    case 'h':
                        return n * h;
                    case 'minutes':
                    case 'minute':
                    case 'mins':
                    case 'min':
                    case 'm':
                        return n * m;
                    case 'seconds':
                    case 'second':
                    case 'secs':
                    case 'sec':
                    case 's':
                        return n * s;
                    case 'milliseconds':
                    case 'millisecond':
                    case 'msecs':
                    case 'msec':
                    case 'ms':
                        return n;
                    }
                }
                function short(ms) {
                    if (ms >= d)
                        return Math.round(ms / d) + 'd';
                    if (ms >= h)
                        return Math.round(ms / h) + 'h';
                    if (ms >= m)
                        return Math.round(ms / m) + 'm';
                    if (ms >= s)
                        return Math.round(ms / s) + 's';
                    return ms + 'ms';
                }
                function long(ms) {
                    return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
                }
                function plural(ms, n, name) {
                    if (ms < n)
                        return;
                    if (ms < n * 1.5)
                        return Math.floor(ms / n) + ' ' + name;
                    return Math.ceil(ms / n) + ' ' + name + 's';
                }
            },
            {}
        ],
        14: [
            function (_dereq_, module, exports) {
                (function (global) {
                    'use strict';
                    function createBlob(parts, properties) {
                        parts = parts || [];
                        properties = properties || {};
                        try {
                            return new Blob(parts, properties);
                        } catch (e) {
                            if (e.name !== 'TypeError') {
                                throw e;
                            }
                            var BlobBuilder = global.BlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder || global.WebKitBlobBuilder;
                            var builder = new BlobBuilder();
                            for (var i = 0; i < parts.length; i += 1) {
                                builder.append(parts[i]);
                            }
                            return builder.getBlob(properties.type);
                        }
                    }
                    function arrayBufferToBinaryString(buffer) {
                        var binary = '';
                        var bytes = new Uint8Array(buffer);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        return binary;
                    }
                    function binaryStringToArrayBuffer(bin) {
                        var length = bin.length;
                        var buf = new ArrayBuffer(length);
                        var arr = new Uint8Array(buf);
                        for (var i = 0; i < length; i++) {
                            arr[i] = bin.charCodeAt(i);
                        }
                        return buf;
                    }
                    function readAsBinaryString(blob, callback) {
                        var reader = new FileReader();
                        var hasBinaryString = typeof reader.readAsBinaryString === 'function';
                        reader.onloadend = function (e) {
                            var result = e.target.result || '';
                            if (hasBinaryString) {
                                return callback(result);
                            }
                            callback(arrayBufferToBinaryString(result));
                        };
                        if (hasBinaryString) {
                            reader.readAsBinaryString(blob);
                        } else {
                            reader.readAsArrayBuffer(blob);
                        }
                    }
                    function readAsArrayBuffer(blob, callback) {
                        var reader = new FileReader();
                        reader.onloadend = function (e) {
                            var result = e.target.result || new ArrayBuffer(0);
                            callback(result);
                        };
                        reader.readAsArrayBuffer(blob);
                    }
                    module.exports = {
                        createBlob: createBlob,
                        readAsArrayBuffer: readAsArrayBuffer,
                        readAsBinaryString: readAsBinaryString,
                        binaryStringToArrayBuffer: binaryStringToArrayBuffer,
                        arrayBufferToBinaryString: arrayBufferToBinaryString
                    };
                }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {}
        ],
        15: [
            function (_dereq_, module, exports) {
                'use strict';
                module.exports = _dereq_(16);
            },
            { '16': 16 }
        ],
        16: [
            function (_dereq_, module, exports) {
                'use strict';
                module.exports = typeof Promise === 'function' ? Promise : _dereq_(18);
            },
            { '18': 18 }
        ],
        17: [
            function (_dereq_, module, exports) {
                (function (global) {
                    'use strict';
                    var Mutation = global.MutationObserver || global.WebKitMutationObserver;
                    var scheduleDrain;
                    {
                        if (Mutation) {
                            var called = 0;
                            var observer = new Mutation(nextTick);
                            var element = global.document.createTextNode('');
                            observer.observe(element, { characterData: true });
                            scheduleDrain = function () {
                                element.data = called = ++called % 2;
                            };
                        } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                            var channel = new global.MessageChannel();
                            channel.port1.onmessage = nextTick;
                            scheduleDrain = function () {
                                channel.port2.postMessage(0);
                            };
                        } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                            scheduleDrain = function () {
                                var scriptEl = global.document.createElement('script');
                                scriptEl.onreadystatechange = function () {
                                    nextTick();
                                    scriptEl.onreadystatechange = null;
                                    scriptEl.parentNode.removeChild(scriptEl);
                                    scriptEl = null;
                                };
                                global.document.documentElement.appendChild(scriptEl);
                            };
                        } else {
                            scheduleDrain = function () {
                                setTimeout(nextTick, 0);
                            };
                        }
                    }
                    var draining;
                    var queue = [];
                    function nextTick() {
                        draining = true;
                        var i, oldQueue;
                        var len = queue.length;
                        while (len) {
                            oldQueue = queue;
                            queue = [];
                            i = -1;
                            while (++i < len) {
                                oldQueue[i]();
                            }
                            len = queue.length;
                        }
                        draining = false;
                    }
                    module.exports = immediate;
                    function immediate(task) {
                        if (queue.push(task) === 1 && !draining) {
                            scheduleDrain();
                        }
                    }
                }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {}
        ],
        18: [
            function (_dereq_, module, exports) {
                'use strict';
                var immediate = _dereq_(17);
                function INTERNAL() {
                }
                var handlers = {};
                var REJECTED = ['REJECTED'];
                var FULFILLED = ['FULFILLED'];
                var PENDING = ['PENDING'];
                var UNHANDLED;
                module.exports = exports = Promise;
                function Promise(resolver) {
                    if (typeof resolver !== 'function') {
                        throw new TypeError('resolver must be a function');
                    }
                    this.state = PENDING;
                    this.queue = [];
                    this.outcome = void 0;
                    if (resolver !== INTERNAL) {
                        safelyResolveThenable(this, resolver);
                    }
                }
                Promise.prototype['catch'] = function (onRejected) {
                    return this.then(null, onRejected);
                };
                Promise.prototype.then = function (onFulfilled, onRejected) {
                    if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
                        return this;
                    }
                    var promise = new this.constructor(INTERNAL);
                    if (this.state !== PENDING) {
                        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                        unwrap(promise, resolver, this.outcome);
                    } else {
                        this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                    }
                    return promise;
                };
                function QueueItem(promise, onFulfilled, onRejected) {
                    this.promise = promise;
                    if (typeof onFulfilled === 'function') {
                        this.onFulfilled = onFulfilled;
                        this.callFulfilled = this.otherCallFulfilled;
                    }
                    if (typeof onRejected === 'function') {
                        this.onRejected = onRejected;
                        this.callRejected = this.otherCallRejected;
                    }
                }
                QueueItem.prototype.callFulfilled = function (value) {
                    handlers.resolve(this.promise, value);
                };
                QueueItem.prototype.otherCallFulfilled = function (value) {
                    unwrap(this.promise, this.onFulfilled, value);
                };
                QueueItem.prototype.callRejected = function (value) {
                    handlers.reject(this.promise, value);
                };
                QueueItem.prototype.otherCallRejected = function (value) {
                    unwrap(this.promise, this.onRejected, value);
                };
                function unwrap(promise, func, value) {
                    immediate(function () {
                        var returnValue;
                        try {
                            returnValue = func(value);
                        } catch (e) {
                            return handlers.reject(promise, e);
                        }
                        if (returnValue === promise) {
                            handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
                        } else {
                            handlers.resolve(promise, returnValue);
                        }
                    });
                }
                handlers.resolve = function (self, value) {
                    var result = tryCatch(getThen, value);
                    if (result.status === 'error') {
                        return handlers.reject(self, result.value);
                    }
                    var thenable = result.value;
                    if (thenable) {
                        safelyResolveThenable(self, thenable);
                    } else {
                        self.state = FULFILLED;
                        self.outcome = value;
                        var i = -1;
                        var len = self.queue.length;
                        while (++i < len) {
                            self.queue[i].callFulfilled(value);
                        }
                    }
                    return self;
                };
                handlers.reject = function (self, error) {
                    self.state = REJECTED;
                    self.outcome = error;
                    var i = -1;
                    var len = self.queue.length;
                    while (++i < len) {
                        self.queue[i].callRejected(error);
                    }
                    return self;
                };
                function getThen(obj) {
                    var then = obj && obj.then;
                    if (obj && typeof obj === 'object' && typeof then === 'function') {
                        return function appyThen() {
                            then.apply(obj, arguments);
                        };
                    }
                }
                function safelyResolveThenable(self, thenable) {
                    var called = false;
                    function onError(value) {
                        if (called) {
                            return;
                        }
                        called = true;
                        handlers.reject(self, value);
                    }
                    function onSuccess(value) {
                        if (called) {
                            return;
                        }
                        called = true;
                        handlers.resolve(self, value);
                    }
                    function tryToUnwrap() {
                        thenable(onSuccess, onError);
                    }
                    var result = tryCatch(tryToUnwrap);
                    if (result.status === 'error') {
                        onError(result.value);
                    }
                }
                function tryCatch(func, value) {
                    var out = {};
                    try {
                        out.value = func(value);
                        out.status = 'success';
                    } catch (e) {
                        out.status = 'error';
                        out.value = e;
                    }
                    return out;
                }
                exports.resolve = resolve;
                function resolve(value) {
                    if (value instanceof this) {
                        return value;
                    }
                    return handlers.resolve(new this(INTERNAL), value);
                }
                exports.reject = reject;
                function reject(reason) {
                    var promise = new this(INTERNAL);
                    return handlers.reject(promise, reason);
                }
                exports.all = all;
                function all(iterable) {
                    var self = this;
                    if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                        return this.reject(new TypeError('must be an array'));
                    }
                    var len = iterable.length;
                    var called = false;
                    if (!len) {
                        return this.resolve([]);
                    }
                    var values = new Array(len);
                    var resolved = 0;
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while (++i < len) {
                        allResolver(iterable[i], i);
                    }
                    return promise;
                    function allResolver(value, i) {
                        self.resolve(value).then(resolveFromAll, function (error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                        function resolveFromAll(outValue) {
                            values[i] = outValue;
                            if (++resolved === len && !called) {
                                called = true;
                                handlers.resolve(promise, values);
                            }
                        }
                    }
                }
                exports.race = race;
                function race(iterable) {
                    var self = this;
                    if (Object.prototype.toString.call(iterable) !== '[object Array]') {
                        return this.reject(new TypeError('must be an array'));
                    }
                    var len = iterable.length;
                    var called = false;
                    if (!len) {
                        return this.resolve([]);
                    }
                    var i = -1;
                    var promise = new this(INTERNAL);
                    while (++i < len) {
                        resolver(iterable[i]);
                    }
                    return promise;
                    function resolver(value) {
                        self.resolve(value).then(function (response) {
                            if (!called) {
                                called = true;
                                handlers.resolve(promise, response);
                            }
                        }, function (error) {
                            if (!called) {
                                called = true;
                                handlers.reject(promise, error);
                            }
                        });
                    }
                }
            },
            { '17': 17 }
        ],
        19: [
            function (_dereq_, module, exports) {
                var process = module.exports = {};
                var queue = [];
                var draining = false;
                function drainQueue() {
                    if (draining) {
                        return;
                    }
                    draining = true;
                    var currentQueue;
                    var len = queue.length;
                    while (len) {
                        currentQueue = queue;
                        queue = [];
                        var i = -1;
                        while (++i < len) {
                            currentQueue[i]();
                        }
                        len = queue.length;
                    }
                    draining = false;
                }
                process.nextTick = function (fun) {
                    queue.push(fun);
                    if (!draining) {
                        setTimeout(drainQueue, 0);
                    }
                };
                process.title = 'browser';
                process.browser = true;
                process.env = {};
                process.argv = [];
                process.version = '';
                process.versions = {};
                function noop() {
                }
                process.on = noop;
                process.addListener = noop;
                process.once = noop;
                process.off = noop;
                process.removeListener = noop;
                process.removeAllListeners = noop;
                process.emit = noop;
                process.binding = function (name) {
                    throw new Error('process.binding is not supported');
                };
                process.cwd = function () {
                    return '/';
                };
                process.chdir = function (dir) {
                    throw new Error('process.chdir is not supported');
                };
                process.umask = function () {
                    return 0;
                };
            },
            {}
        ],
        20: [
            function (_dereq_, module, exports) {
                'use strict';
                module.exports = _dereq_(2);
            },
            { '2': 2 }
        ]
    }, {}, [20])(20);
}));
/*mev-domain-common@0.0.1#src/main/services/db/mevDb*/
define('mev-domain-common@0.0.1#src/main/services/db/mevDb', [
    'lodash',
    'pouchdb',
    'worker-pouch'
], function (_, PouchDB) {
    'use strict';
    var service = function mevDbService(mevContext, mevSettings, $q, $rootScope, $timeout) {
        var _self = this;
        var pouchdb = window && window.PouchDB ? window.PouchDB : PouchDB;
        var db = new pouchdb('mev', { adapter: 'worker' });
        function ensureDataset() {
            var dataset = mevContext.get('dataset');
            if (!dataset)
                throw new Error('Could not locate dataset for current context: ' + JSON.stringify(mevContext));
            return dataset;
        }
        function getDataset(datasetId) {
            if (mevSettings.db.enabled)
                return db.get(datasetId);
            else {
                var deferred = $q.defer();
                deferred.reject({
                    status: 501,
                    message: 'Local db is disabled'
                });
                return deferred.promise;
            }
        }
        function putDataset(dataset, isRetry) {
            return getDataset(dataset.id).catch(function (e) {
                if (e.status === 404) {
                    delete dataset._rev;
                    return _.assign(dataset, { _id: dataset.id });
                } else
                    throw e;
            }).then(function (doc) {
                dataset._id = dataset.id;
                dataset._rev = doc._rev;
                var clone = _.cloneDeep(dataset);
                clone.$promise = undefined;
                clone._annotations = undefined;
                clone.values = [];
                clone.analyses = [];
                _firePutStarted(dataset.id, 'dataset');
                return db.put(JSON.parse(JSON.stringify(clone))).then(function () {
                    _firePutCompleted(dataset.id, 'dataset');
                    return arguments[0];
                }).catch(function () {
                    _firePutCompleted(dataset.id, 'dataset');
                    return arguments[0];
                });
            }).catch(function (e) {
                if (e.status === 409)
                    putDataset(dataset, true);
                else if (e.status === 501)
                    console.warn('Warning saving dataset locally', e);
                else {
                    console.error('Error saving dataset locally:', e, dataset);
                    throw e;
                }
            });
        }
        function getDatasets() {
            if (mevSettings.db.enabled)
                return db.allDocs().then(function (result) {
                    return _.uniq(result.rows.filter(function (doc) {
                        return doc.id.indexOf('/values64') > -1;
                    }).map(function (doc) {
                        return doc.id.split('/')[0];
                    }));
                });
            else
                return $q.when([]);
        }
        function formatDocId(path, datasetId) {
            datasetId = datasetId ? datasetId : ensureDataset().id;
            path = _.isArray(path) ? path.join('/') : path;
            return datasetId + '/' + path;
        }
        function _rejectDisabled() {
            var deferred = $q.defer();
            deferred.reject({
                status: 404,
                message: 'Local db is disabled'
            });
            return deferred.promise;
        }
        function getDatasetValues(datasetId) {
            if (!mevSettings.db.enabled)
                _rejectDisabled();
            return db.getAttachment(formatDocId('values', datasetId), 'all');
        }
        function getDatasetValues64(datasetId) {
            if (!mevSettings.db.enabled)
                _rejectDisabled();
            return db.getAttachment(formatDocId('values64', datasetId), 'chunk0');
        }
        function putDatasetValues(blob, datasetId) {
            _firePutStarted(datasetId || ensureDataset().id, 'values');
            if (!mevSettings.db.enabled)
                return;
            var doc = {
                _id: formatDocId('values'),
                _attachments: {
                    'all': {
                        data: blob,
                        type: 'application/octet-stream',
                        content_type: 'application/octet-stream'
                    }
                }
            };
            db.put(doc).then(function () {
                _firePutCompleted(ensureDataset().id, 'values');
            }).catch(function () {
                _firePutCompleted(ensureDataset().id, 'values');
            });
        }
        function _removeDocByRow(doc) {
            return db.remove(doc.id, doc.value.rev);
        }
        function _getAllDatasetDocs(datasetId) {
            return db.allDocs({
                startKey: datasetId,
                endKey: datasetId + '\uFFFF'
            }).then(function (docs) {
                _.remove(docs.rows, function (row) {
                    return row.id !== datasetId && row.id.indexOf(datasetId + '/') !== 0;
                });
                return docs;
            });
        }
        function deleteDataset(datasetId) {
            return _getAllDatasetDocs(datasetId).then(function (docs) {
                return db.bulkDocs(docs.rows.map(function (row) {
                    return {
                        _id: row.id,
                        _rev: row.value.rev,
                        _deleted: true
                    };
                }));
            });
        }
        function getAnalyses(datasetId) {
            if (!mevSettings.db.enabled)
                return $q.when([]);
            return db.allDocs().then(function (result) {
                return result.rows.filter(function (doc) {
                    return doc.id.indexOf(formatDocId(['analysis'], datasetId)) > -1;
                });
            }).then(function (docs) {
                return docs.map(function (doc) {
                    return doc.id.replace(formatDocId(['analysis'], datasetId), '').replace('/', '');
                });
            });
        }
        function getAnalysesAll(datasetId) {
            return getAnalyses(datasetId).then(function (analysisNames) {
                return $q.all(analysisNames.map(getAnalysis.bind(null, datasetId)));
            });
        }
        function getAnalysis(datasetId, analysisId) {
            if (!mevSettings.db.enabled)
                return _rejectDisabled();
            return db.get(formatDocId([
                'analysis',
                analysisId
            ], datasetId));
        }
        function putAnalysis(datasetId, analysis, isRetry) {
            if (!mevSettings.db.enabled)
                return _rejectDisabled();
            if (!isRetry)
                $rootScope.$broadcast('mev:db:put:started', datasetId, analysis);
            return getAnalysis(datasetId, analysis.name).catch(function (e) {
                if (e.status === 404) {
                    delete analysis._rev;
                    return _.assign(analysis, {
                        _id: formatDocId([
                            'analysis',
                            analysis.name
                        ], datasetId)
                    });
                } else
                    throw new Error('Error putting analysis' + JSON.stringify(e));
            }).then(function (doc) {
                analysis._rev = doc._rev;
                return db.put(JSON.parse(JSON.stringify(analysis)));
            }).then(function () {
                $rootScope.$broadcast('mev:db:put:completed', datasetId, analysis);
            }).catch(function (e) {
                if (e.status === 409)
                    putAnalysis(datasetId, analysis, true);
                else {
                    console.error('Error saving analysis locally:', datasetId, analysis, e);
                    throw e;
                }
            });
        }
        function deleteAnalysis(datasetId, analysisName) {
            return getAnalysis(datasetId, analysisName).then(function (doc) {
                return db.remove(doc);
            });
        }
        function _firePutStarted(dataset, item) {
            $rootScope.$broadcast('mev:db:put:started', dataset, item);
        }
        function _firePutCompleted(dataset, item) {
            $timeout(function () {
                $rootScope.$broadcast('mev:db:put:completed', dataset, item);
            });
        }
        function putAnnotations(datasetId, dimension, blob, isRetry) {
            if (!mevSettings.db.enabled)
                return;
            if (!isRetry)
                _firePutStarted(datasetId, dimension);
            var annotation = {
                _id: formatDocId([
                    'annotations',
                    dimension
                ], datasetId),
                _attachments: {
                    'all': {
                        data: blob,
                        type: 'application/octet-stream',
                        content_type: 'application/octet-stream'
                    }
                }
            };
            db.get(formatDocId([
                'annotations',
                dimension
            ], datasetId)).catch(function (e) {
                if (e.status === 404)
                    return annotation;
            }).then(function (doc) {
                annotation._rev = doc._rev;
                return db.put(annotation);
            }).catch(function (e) {
                if (e.status === 409)
                    putAnnotations(datasetId, dimension, blob, true);
                else
                    throw e;
            }).then(_firePutCompleted.bind(_self, datasetId, dimension)).catch(_firePutCompleted.bind(_self, datasetId, dimension));
        }
        function getAnnotations(datasetId, dimension) {
            return db.getAttachment(formatDocId([
                'annotations',
                dimension
            ], datasetId), 'all');
        }
        var status = {};
        function getStatus(datasetId) {
            var keys = datasetId ? _.filter(_.keys(status), function (key) {
                return key.indexOf(datasetId) === 0;
            }) : _.keys(status);
            var msg = 'saved';
            if (keys.length > 0)
                msg = 'saving ' + datasetId ? keys[0].replace(datasetId + ':', '') : keys[0];
            return msg;
        }
        function _formatStatusKey(dataset, item) {
            return dataset + ':' + item;
        }
        $rootScope.$on('mev:db:put:started', function (event, dataset, item) {
            status[_formatStatusKey(dataset, item)] = {
                dataset: dataset,
                item: item
            };
        });
        $rootScope.$on('mev:db:put:completed', function (event, dataset, item) {
            delete status[_formatStatusKey(dataset, item)];
        });
        return {
            getDataset: getDataset,
            putDataset: putDataset,
            deleteDataset: deleteDataset,
            getDatasets: getDatasets,
            getDatasetValues: getDatasetValues,
            putDatasetValues: putDatasetValues,
            getDatasetValues64: getDatasetValues64,
            getAnalysis: getAnalysis,
            putAnalysis: putAnalysis,
            getAnalyses: getAnalyses,
            getAnalysesAll: getAnalysesAll,
            deleteAnalysis: deleteAnalysis,
            putAnnotations: putAnnotations,
            getAnnotations: getAnnotations,
            getStatus: getStatus,
            firePutStarted: _firePutStarted,
            firePutCompleted: _firePutCompleted,
            onPutStarted: function (callback) {
                $rootScope.$on('mev:db:put:started', callback);
            },
            onPutCmopleted: function (callback) {
                $rootScope.$on('mev:db:put:cmopleted', callback);
            }
        };
    };
    service.$name = 'mevDb';
    service.$provider = 'service';
    service.$inject = [
        'mevContext',
        'mevSettings',
        '$q',
        '$rootScope',
        '$timeout'
    ];
    return service;
});
/*bowser@1.9.2#src/bowser*/
define('bowser@1.9.2#src/bowser', function (require, exports, module) {
    !function (root, name, definition) {
        if (typeof module != 'undefined' && module.exports)
            module.exports = definition();
        else if (typeof define == 'function' && define.amd)
            define(name, definition);
        else
            root[name] = definition();
    }(this, 'bowser', function () {
        var t = true;
        function detect(ua) {
            function getFirstMatch(regex) {
                var match = ua.match(regex);
                return match && match.length > 1 && match[1] || '';
            }
            function getSecondMatch(regex) {
                var match = ua.match(regex);
                return match && match.length > 1 && match[2] || '';
            }
            var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(), likeAndroid = /like android/i.test(ua), android = !likeAndroid && /android/i.test(ua), nexusMobile = /nexus\s*[0-6]\s*/i.test(ua), nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua), chromeos = /CrOS/.test(ua), silk = /silk/i.test(ua), sailfish = /sailfish/i.test(ua), tizen = /tizen/i.test(ua), webos = /(web|hpw)os/i.test(ua), windowsphone = /windows phone/i.test(ua), samsungBrowser = /SamsungBrowser/i.test(ua), windows = !windowsphone && /windows/i.test(ua), mac = !iosdevice && !silk && /macintosh/i.test(ua), linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua), edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i), tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua), mobile = !tablet && /[^-]mobi/i.test(ua), xbox = /xbox/i.test(ua), result;
            if (/opera/i.test(ua)) {
                result = {
                    name: 'Opera',
                    opera: t,
                    version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/opr\/|opios/i.test(ua)) {
                result = {
                    name: 'Opera',
                    opera: t,
                    version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (/SamsungBrowser/i.test(ua)) {
                result = {
                    name: 'Samsung Internet for Android',
                    samsungBrowser: t,
                    version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/coast/i.test(ua)) {
                result = {
                    name: 'Opera Coast',
                    coast: t,
                    version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/yabrowser/i.test(ua)) {
                result = {
                    name: 'Yandex Browser',
                    yandexbrowser: t,
                    version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                };
            } else if (/ucbrowser/i.test(ua)) {
                result = {
                    name: 'UC Browser',
                    ucbrowser: t,
                    version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/mxios/i.test(ua)) {
                result = {
                    name: 'Maxthon',
                    maxthon: t,
                    version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/epiphany/i.test(ua)) {
                result = {
                    name: 'Epiphany',
                    epiphany: t,
                    version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/puffin/i.test(ua)) {
                result = {
                    name: 'Puffin',
                    puffin: t,
                    version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                };
            } else if (/sleipnir/i.test(ua)) {
                result = {
                    name: 'Sleipnir',
                    sleipnir: t,
                    version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (/k-meleon/i.test(ua)) {
                result = {
                    name: 'K-Meleon',
                    kMeleon: t,
                    version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                };
            } else if (windowsphone) {
                result = {
                    name: 'Windows Phone',
                    osname: 'Windows Phone',
                    windowsphone: t
                };
                if (edgeVersion) {
                    result.msedge = t;
                    result.version = edgeVersion;
                } else {
                    result.msie = t;
                    result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
                }
            } else if (/msie|trident/i.test(ua)) {
                result = {
                    name: 'Internet Explorer',
                    msie: t,
                    version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                };
            } else if (chromeos) {
                result = {
                    name: 'Chrome',
                    osname: 'Chrome OS',
                    chromeos: t,
                    chromeBook: t,
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                };
            } else if (/edg([ea]|ios)/i.test(ua)) {
                result = {
                    name: 'Microsoft Edge',
                    msedge: t,
                    version: edgeVersion
                };
            } else if (/vivaldi/i.test(ua)) {
                result = {
                    name: 'Vivaldi',
                    vivaldi: t,
                    version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (sailfish) {
                result = {
                    name: 'Sailfish',
                    osname: 'Sailfish OS',
                    sailfish: t,
                    version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                };
            } else if (/seamonkey\//i.test(ua)) {
                result = {
                    name: 'SeaMonkey',
                    seamonkey: t,
                    version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                };
            } else if (/firefox|iceweasel|fxios/i.test(ua)) {
                result = {
                    name: 'Firefox',
                    firefox: t,
                    version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                };
                if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                    result.firefoxos = t;
                    result.osname = 'Firefox OS';
                }
            } else if (silk) {
                result = {
                    name: 'Amazon Silk',
                    silk: t,
                    version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                };
            } else if (/phantom/i.test(ua)) {
                result = {
                    name: 'PhantomJS',
                    phantom: t,
                    version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                };
            } else if (/slimerjs/i.test(ua)) {
                result = {
                    name: 'SlimerJS',
                    slimer: t,
                    version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
                };
            } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                result = {
                    name: 'BlackBerry',
                    osname: 'BlackBerry OS',
                    blackberry: t,
                    version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                };
            } else if (webos) {
                result = {
                    name: 'WebOS',
                    osname: 'WebOS',
                    webos: t,
                    version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                };
                /touchpad\//i.test(ua) && (result.touchpad = t);
            } else if (/bada/i.test(ua)) {
                result = {
                    name: 'Bada',
                    osname: 'Bada',
                    bada: t,
                    version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                };
            } else if (tizen) {
                result = {
                    name: 'Tizen',
                    osname: 'Tizen',
                    tizen: t,
                    version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (/qupzilla/i.test(ua)) {
                result = {
                    name: 'QupZilla',
                    qupzilla: t,
                    version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
                };
            } else if (/chromium/i.test(ua)) {
                result = {
                    name: 'Chromium',
                    chromium: t,
                    version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
                };
            } else if (/chrome|crios|crmo/i.test(ua)) {
                result = {
                    name: 'Chrome',
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                };
            } else if (android) {
                result = {
                    name: 'Android',
                    version: versionIdentifier
                };
            } else if (/safari|applewebkit/i.test(ua)) {
                result = {
                    name: 'Safari',
                    safari: t
                };
                if (versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (iosdevice) {
                result = { name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod' };
                if (versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (/googlebot/i.test(ua)) {
                result = {
                    name: 'Googlebot',
                    googlebot: t,
                    version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
                };
            } else {
                result = {
                    name: getFirstMatch(/^(.*)\/(.*) /),
                    version: getSecondMatch(/^(.*)\/(.*) /)
                };
            }
            if (!result.msedge && /(apple)?webkit/i.test(ua)) {
                if (/(apple)?webkit\/537\.36/i.test(ua)) {
                    result.name = result.name || 'Blink';
                    result.blink = t;
                } else {
                    result.name = result.name || 'Webkit';
                    result.webkit = t;
                }
                if (!result.version && versionIdentifier) {
                    result.version = versionIdentifier;
                }
            } else if (!result.opera && /gecko\//i.test(ua)) {
                result.name = result.name || 'Gecko';
                result.gecko = t;
                result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
            }
            if (!result.windowsphone && (android || result.silk)) {
                result.android = t;
                result.osname = 'Android';
            } else if (!result.windowsphone && iosdevice) {
                result[iosdevice] = t;
                result.ios = t;
                result.osname = 'iOS';
            } else if (mac) {
                result.mac = t;
                result.osname = 'macOS';
            } else if (xbox) {
                result.xbox = t;
                result.osname = 'Xbox';
            } else if (windows) {
                result.windows = t;
                result.osname = 'Windows';
            } else if (linux) {
                result.linux = t;
                result.osname = 'Linux';
            }
            function getWindowsVersion(s) {
                switch (s) {
                case 'NT':
                    return 'NT';
                case 'XP':
                    return 'XP';
                case 'NT 5.0':
                    return '2000';
                case 'NT 5.1':
                    return 'XP';
                case 'NT 5.2':
                    return '2003';
                case 'NT 6.0':
                    return 'Vista';
                case 'NT 6.1':
                    return '7';
                case 'NT 6.2':
                    return '8';
                case 'NT 6.3':
                    return '8.1';
                case 'NT 10.0':
                    return '10';
                default:
                    return undefined;
                }
            }
            var osVersion = '';
            if (result.windows) {
                osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i));
            } else if (result.windowsphone) {
                osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
            } else if (result.mac) {
                osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
                osVersion = osVersion.replace(/[_\s]/g, '.');
            } else if (iosdevice) {
                osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                osVersion = osVersion.replace(/[_\s]/g, '.');
            } else if (android) {
                osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
            } else if (result.webos) {
                osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
            } else if (result.blackberry) {
                osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
            } else if (result.bada) {
                osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
            } else if (result.tizen) {
                osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
            }
            if (osVersion) {
                result.osversion = osVersion;
            }
            var osMajorVersion = !result.windows && osVersion.split('.')[0];
            if (tablet || nexusTablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion >= 4 && !mobile) || result.silk) {
                result.tablet = t;
            } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || nexusMobile || result.blackberry || result.webos || result.bada) {
                result.mobile = t;
            }
            if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.vivaldi && result.version >= 1 || result.chrome && result.version >= 20 || result.samsungBrowser && result.version >= 4 || result.firefox && result.version >= 20 || result.safari && result.version >= 6 || result.opera && result.version >= 10 || result.ios && result.osversion && result.osversion.split('.')[0] >= 6 || result.blackberry && result.version >= 10.1 || result.chromium && result.version >= 20) {
                result.a = t;
            } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20 || result.safari && result.version < 6 || result.opera && result.version < 10 || result.ios && result.osversion && result.osversion.split('.')[0] < 6 || result.chromium && result.version < 20) {
                result.c = t;
            } else
                result.x = t;
            return result;
        }
        var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');
        bowser.test = function (browserList) {
            for (var i = 0; i < browserList.length; ++i) {
                var browserItem = browserList[i];
                if (typeof browserItem === 'string') {
                    if (browserItem in bowser) {
                        return true;
                    }
                }
            }
            return false;
        };
        function getVersionPrecision(version) {
            return version.split('.').length;
        }
        function map(arr, iterator) {
            var result = [], i;
            if (Array.prototype.map) {
                return Array.prototype.map.call(arr, iterator);
            }
            for (i = 0; i < arr.length; i++) {
                result.push(iterator(arr[i]));
            }
            return result;
        }
        function compareVersions(versions) {
            var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
            var chunks = map(versions, function (version) {
                var delta = precision - getVersionPrecision(version);
                version = version + new Array(delta + 1).join('.0');
                return map(version.split('.'), function (chunk) {
                    return new Array(20 - chunk.length).join('0') + chunk;
                }).reverse();
            });
            while (--precision >= 0) {
                if (chunks[0][precision] > chunks[1][precision]) {
                    return 1;
                } else if (chunks[0][precision] === chunks[1][precision]) {
                    if (precision === 0) {
                        return 0;
                    }
                } else {
                    return -1;
                }
            }
        }
        function isUnsupportedBrowser(minVersions, strictMode, ua) {
            var _bowser = bowser;
            if (typeof strictMode === 'string') {
                ua = strictMode;
                strictMode = void 0;
            }
            if (strictMode === void 0) {
                strictMode = false;
            }
            if (ua) {
                _bowser = detect(ua);
            }
            var version = '' + _bowser.version;
            for (var browser in minVersions) {
                if (minVersions.hasOwnProperty(browser)) {
                    if (_bowser[browser]) {
                        if (typeof minVersions[browser] !== 'string') {
                            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
                        }
                        return compareVersions([
                            version,
                            minVersions[browser]
                        ]) < 0;
                    }
                }
            }
            return strictMode;
        }
        function check(minVersions, strictMode, ua) {
            return !isUnsupportedBrowser(minVersions, strictMode, ua);
        }
        bowser.isUnsupportedBrowser = isUnsupportedBrowser;
        bowser.compareVersions = compareVersions;
        bowser.check = check;
        bowser._detect = detect;
        bowser.detect = detect;
        return bowser;
    });
});
/*mev-domain-common@0.0.1#src/main/services/settings/Settings*/
define('mev-domain-common@0.0.1#src/main/services/settings/Settings', ['bowser'], function (bowser) {
    'use strict';
    var service = function () {
        this.db = { enabled: !bowser.chrome || bowser.chrome && bowser.version > 43 };
    };
    service.$inject = [];
    service.$provider = 'service';
    service.$name = 'mevSettings';
    return service;
});
/*mev-domain-common@0.0.1#src/main/services/alert/AlertService*/
define('mev-domain-common@0.0.1#src/main/services/alert/AlertService', [], function () {
    var service = function ($rootScope) {
        function raiseAlert(level, message, heading) {
            $rootScope.$broadcast('mev:alert', {
                message: message,
                heading: heading,
                level: level
            });
        }
        return {
            success: function (message, header, callback, params) {
                raiseAlert('success', message, header);
            },
            error: function (message, header, callback, params) {
                raiseAlert('error', message, header);
            },
            info: function (message, header, callback, params) {
                raiseAlert('info', message, header);
            }
        };
    };
    service.$inject = ['$rootScope'];
    service.$name = 'mevAlertService';
    service.$provider = 'service';
    return service;
});
/*mev-domain-common@0.0.1#src/main/view/db/status/mevDbStatusDirective*/
define('mev-domain-common@0.0.1#src/main/view/db/status/mevDbStatusDirective', [], function () {
    'use strict';
    var directive = function (mevDb, mevContext, $interval, $q, $rootScope) {
        return {
            restrict: 'EAC',
            template: '<div ng-if="vm.dataset">status: {{ vm.showActive() }} ({{ vm.getStatus() }})</div>' + '<div ng-if="!vm.dataset">status: {{ vm.getStatus() }}</div>',
            controller: [
                '$scope',
                'mevDb',
                function (scope, mevDb) {
                    var _self = this;
                    _self.getStatus = mevDb.getStatus;
                    _self._isActive = false;
                    _self.showActive = function () {
                        return _self._isActive ? 'active' : 'offline';
                    };
                    function _setActive(isActive) {
                        _self._isActive = isActive ? true : false;
                    }
                    ;
                    function _checkActive() {
                        var dataset = mevContext.get('dataset');
                        return (dataset ? dataset.getIsActive() : $q.when(false)).then(_setActive);
                    }
                    _checkActive();
                    var intervalPromise = $interval(_checkActive, 11 * 60000);
                    var contextListener = $rootScope.$watch(mevContext.get.bind(mevContext, 'dataset'), function (newVal, oldVal) {
                        _self.dataset = newVal;
                        _checkActive();
                    });
                    scope.$on('$destroy', function () {
                        $interval.cancel(intervalPromise);
                        contextListener();
                    });
                }
            ],
            controllerAs: 'vm'
        };
    };
    directive.$name = 'mevDbStatus';
    directive.$provider = 'directive';
    directive.$inject = [
        'mevDb',
        'mevContext',
        '$interval',
        '$q',
        '$rootScope'
    ];
    return directive;
});
/*mev-domain-common@0.0.1#src/main/mev-domain-common*/
define('mev-domain-common@0.0.1#src/main/mev-domain-common', [
    'mui',
    'angular-ui-router',
    './services/context/Context',
    './services/selection/SelectionLocator',
    './services/analysis/AnalysisLocator',
    './services/annotations/AnnotationsLocator',
    './services/db/mevDb',
    './services/settings/Settings',
    './services/alert/AlertService',
    './view/db/status/mevDbStatusDirective'
], function (ng) {
    'use strict';
    return ng.module('mevDomainCommon', arguments, arguments);
});
/*angular-resource@1.5.11#angular-resource*/
define('angular-resource@1.5.11#angular-resource', [
    'module',
    '@loader'
], function (module, loader) {
    loader.get('@@global-helpers').prepareGlobal(module.id, []);
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '/**\n * @license AngularJS v1.5.11\n * (c) 2010-2017 Google, Inc. http://angularjs.org\n * License: MIT\n */\n(function(window, angular) {\'use strict\';\n\nvar $resourceMinErr = angular.$$minErr(\'$resource\');\n\n// Helper functions and regex to lookup a dotted path on an object\n// stopping at undefined/null.  The path must be composed of ASCII\n// identifiers (just like $parse)\nvar MEMBER_NAME_REGEX = /^(\\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;\n\nfunction isValidDottedPath(path) {\n  return (path != null && path !== \'\' && path !== \'hasOwnProperty\' &&\n      MEMBER_NAME_REGEX.test(\'.\' + path));\n}\n\nfunction lookupDottedPath(obj, path) {\n  if (!isValidDottedPath(path)) {\n    throw $resourceMinErr(\'badmember\', \'Dotted member path "@{0}" is invalid.\', path);\n  }\n  var keys = path.split(\'.\');\n  for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj); i++) {\n    var key = keys[i];\n    obj = (obj !== null) ? obj[key] : undefined;\n  }\n  return obj;\n}\n\n/**\n * Create a shallow copy of an object and clear other fields from the destination\n */\nfunction shallowClearAndCopy(src, dst) {\n  dst = dst || {};\n\n  angular.forEach(dst, function(value, key) {\n    delete dst[key];\n  });\n\n  for (var key in src) {\n    if (src.hasOwnProperty(key) && !(key.charAt(0) === \'$\' && key.charAt(1) === \'$\')) {\n      dst[key] = src[key];\n    }\n  }\n\n  return dst;\n}\n\n/**\n * @ngdoc module\n * @name ngResource\n * @description\n *\n * # ngResource\n *\n * The `ngResource` module provides interaction support with RESTful services\n * via the $resource service.\n *\n *\n * <div doc-module-components="ngResource"></div>\n *\n * See {@link ngResource.$resourceProvider} and {@link ngResource.$resource} for usage.\n */\n\n/**\n * @ngdoc provider\n * @name $resourceProvider\n *\n * @description\n *\n * Use `$resourceProvider` to change the default behavior of the {@link ngResource.$resource}\n * service.\n *\n * ## Dependencies\n * Requires the {@link ngResource } module to be installed.\n *\n */\n\n/**\n * @ngdoc service\n * @name $resource\n * @requires $http\n * @requires ng.$log\n * @requires $q\n * @requires ng.$timeout\n *\n * @description\n * A factory which creates a resource object that lets you interact with\n * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.\n *\n * The returned resource object has action methods which provide high-level behaviors without\n * the need to interact with the low level {@link ng.$http $http} service.\n *\n * Requires the {@link ngResource `ngResource`} module to be installed.\n *\n * By default, trailing slashes will be stripped from the calculated URLs,\n * which can pose problems with server backends that do not expect that\n * behavior.  This can be disabled by configuring the `$resourceProvider` like\n * this:\n *\n * ```js\n     app.config([\'$resourceProvider\', function($resourceProvider) {\n       // Don\'t strip trailing slashes from calculated URLs\n       $resourceProvider.defaults.stripTrailingSlashes = false;\n     }]);\n * ```\n *\n * @param {string} url A parameterized URL template with parameters prefixed by `:` as in\n *   `/user/:username`. If you are using a URL with a port number (e.g.\n *   `http://example.com:8080/api`), it will be respected.\n *\n *   If you are using a url with a suffix, just add the suffix, like this:\n *   `$resource(\'http://example.com/resource.json\')` or `$resource(\'http://example.com/:id.json\')`\n *   or even `$resource(\'http://example.com/resource/:resource_id.:format\')`\n *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be\n *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you\n *   can escape it with `/\\.`.\n *\n * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in\n *   `actions` methods. If a parameter value is a function, it will be called every time\n *   a param value needs to be obtained for a request (unless the param was overridden). The function\n *   will be passed the current data value as an argument.\n *\n *   Each key value in the parameter object is first bound to url template if present and then any\n *   excess keys are appended to the url search query after the `?`.\n *\n *   Given a template `/path/:verb` and parameter `{verb:\'greet\', salutation:\'Hello\'}` results in\n *   URL `/path/greet?salutation=Hello`.\n *\n *   If the parameter value is prefixed with `@`, then the value for that parameter will be\n *   extracted from the corresponding property on the `data` object (provided when calling a\n *   "non-GET" action method).\n *   For example, if the `defaultParam` object is `{someParam: \'@someProp\'}` then the value of\n *   `someParam` will be `data.someProp`.\n *   Note that the parameter will be ignored, when calling a "GET" action method (i.e. an action\n *   method that does not accept a request body)\n *\n * @param {Object.<Object>=} actions Hash with declaration of custom actions that should extend\n *   the default set of resource actions. The declaration should be created in the format of {@link\n *   ng.$http#usage $http.config}:\n *\n *       {action1: {method:?, params:?, isArray:?, headers:?, ...},\n *        action2: {method:?, params:?, isArray:?, headers:?, ...},\n *        ...}\n *\n *   Where:\n *\n *   - **`action`** \u2013 {string} \u2013 The name of action. This name becomes the name of the method on\n *     your resource object.\n *   - **`method`** \u2013 {string} \u2013 Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,\n *     `DELETE`, `JSONP`, etc).\n *   - **`params`** \u2013 {Object=} \u2013 Optional set of pre-bound parameters for this action. If any of\n *     the parameter value is a function, it will be called every time when a param value needs to\n *     be obtained for a request (unless the param was overridden). The function will be passed the\n *     current data value as an argument.\n *   - **`url`** \u2013 {string} \u2013 action specific `url` override. The url templating is supported just\n *     like for the resource-level urls.\n *   - **`isArray`** \u2013 {boolean=} \u2013 If true then the returned object for this action is an array,\n *     see `returns` section.\n *   - **`transformRequest`** \u2013\n *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` \u2013\n *     transform function or an array of such functions. The transform function takes the http\n *     request body and headers and returns its transformed (typically serialized) version.\n *     By default, transformRequest will contain one function that checks if the request data is\n *     an object and serializes it using `angular.toJson`. To prevent this behavior, set\n *     `transformRequest` to an empty array: `transformRequest: []`\n *   - **`transformResponse`** \u2013\n *     `{function(data, headersGetter, status)|Array.<function(data, headersGetter, status)>}` \u2013\n *     transform function or an array of such functions. The transform function takes the http\n *     response body, headers and status and returns its transformed (typically deserialized)\n *     version.\n *     By default, transformResponse will contain one function that checks if the response looks\n *     like a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior,\n *     set `transformResponse` to an empty array: `transformResponse: []`\n *   - **`cache`** \u2013 `{boolean|Cache}` \u2013 If true, a default $http cache will be used to cache the\n *     GET request, otherwise if a cache instance built with\n *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for\n *     caching.\n *   - **`timeout`** \u2013 `{number}` \u2013 timeout in milliseconds.<br />\n *     **Note:** In contrast to {@link ng.$http#usage $http.config}, {@link ng.$q promises} are\n *     **not** supported in $resource, because the same value would be used for multiple requests.\n *     If you are looking for a way to cancel requests, you should use the `cancellable` option.\n *   - **`cancellable`** \u2013 `{boolean}` \u2013 if set to true, the request made by a "non-instance" call\n *     will be cancelled (if not already completed) by calling `$cancelRequest()` on the call\'s\n *     return value. Calling `$cancelRequest()` for a non-cancellable or an already\n *     completed/cancelled request will have no effect.<br />\n *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the\n *     XHR object. See\n *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)\n *     for more information.\n *   - **`responseType`** - `{string}` - see\n *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).\n *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -\n *     `response` and `responseError`. Both `response` and `responseError` interceptors get called\n *     with `http response` object. See {@link ng.$http $http interceptors}.\n *\n * @param {Object} options Hash with custom settings that should extend the\n *   default `$resourceProvider` behavior.  The supported options are:\n *\n *   - **`stripTrailingSlashes`** \u2013 {boolean} \u2013 If true then the trailing\n *   slashes from any calculated URL will be stripped. (Defaults to true.)\n *   - **`cancellable`** \u2013 {boolean} \u2013 If true, the request made by a "non-instance" call will be\n *   cancelled (if not already completed) by calling `$cancelRequest()` on the call\'s return value.\n *   This can be overwritten per action. (Defaults to false.)\n *\n * @returns {Object} A resource "class" object with methods for the default set of resource actions\n *   optionally extended with custom `actions`. The default set contains these actions:\n *   ```js\n *   { \'get\':    {method:\'GET\'},\n *     \'save\':   {method:\'POST\'},\n *     \'query\':  {method:\'GET\', isArray:true},\n *     \'remove\': {method:\'DELETE\'},\n *     \'delete\': {method:\'DELETE\'} };\n *   ```\n *\n *   Calling these methods invoke an {@link ng.$http} with the specified http method,\n *   destination and parameters. When the data is returned from the server then the object is an\n *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it\n *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,\n *   read, update, delete) on server-side data like this:\n *   ```js\n *   var User = $resource(\'/user/:userId\', {userId:\'@id\'});\n *   var user = User.get({userId:123}, function() {\n *     user.abc = true;\n *     user.$save();\n *   });\n *   ```\n *\n *   It is important to realize that invoking a $resource object method immediately returns an\n *   empty reference (object or array depending on `isArray`). Once the data is returned from the\n *   server the existing reference is populated with the actual data. This is a useful trick since\n *   usually the resource is assigned to a model which is then rendered by the view. Having an empty\n *   object results in no rendering, once the data arrives from the server then the object is\n *   populated with the data and the view automatically re-renders itself showing the new data. This\n *   means that in most cases one never has to write a callback function for the action methods.\n *\n *   The action methods on the class object or instance object can be invoked with the following\n *   parameters:\n *\n *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`\n *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`\n *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`\n *\n *\n *   Success callback is called with (value (Object|Array), responseHeaders (Function),\n *   status (number), statusText (string)) arguments, where the value is the populated resource\n *   instance or collection object. The error callback is called with (httpResponse) argument.\n *\n *   Class actions return empty instance (with additional properties below).\n *   Instance actions return promise of the action.\n *\n *   The Resource instances and collections have these additional properties:\n *\n *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this\n *     instance or collection.\n *\n *     On success, the promise is resolved with the same resource instance or collection object,\n *     updated with data from server. This makes it easy to use in\n *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view\n *     rendering until the resource(s) are loaded.\n *\n *     On failure, the promise is rejected with the {@link ng.$http http response} object, without\n *     the `resource` property.\n *\n *     If an interceptor object was provided, the promise will instead be resolved with the value\n *     returned by the interceptor.\n *\n *   - `$resolved`: `true` after first server interaction is completed (either with success or\n *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in\n *      data-binding.\n *\n *   The Resource instances and collections have these additional methods:\n *\n *   - `$cancelRequest`: If there is a cancellable, pending request related to the instance or\n *      collection, calling this method will abort the request.\n *\n *   The Resource instances have these additional methods:\n *\n *   - `toJSON`: It returns a simple object without any of the extra properties added as part of\n *     the Resource API. This object can be serialized through {@link angular.toJson} safely\n *     without attaching Angular-specific fields. Notice that `JSON.stringify` (and\n *     `angular.toJson`) automatically use this method when serializing a Resource instance\n *     (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)).\n *\n * @example\n *\n * # Credit card resource\n *\n * ```js\n     // Define CreditCard class\n     var CreditCard = $resource(\'/user/:userId/card/:cardId\',\n      {userId:123, cardId:\'@id\'}, {\n       charge: {method:\'POST\', params:{charge:true}}\n      });\n\n     // We can retrieve a collection from the server\n     var cards = CreditCard.query(function() {\n       // GET: /user/123/card\n       // server returns: [ {id:456, number:\'1234\', name:\'Smith\'} ];\n\n       var card = cards[0];\n       // each item is an instance of CreditCard\n       expect(card instanceof CreditCard).toEqual(true);\n       card.name = "J. Smith";\n       // non GET methods are mapped onto the instances\n       card.$save();\n       // POST: /user/123/card/456 {id:456, number:\'1234\', name:\'J. Smith\'}\n       // server returns: {id:456, number:\'1234\', name: \'J. Smith\'};\n\n       // our custom method is mapped as well.\n       card.$charge({amount:9.99});\n       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:\'1234\', name:\'J. Smith\'}\n     });\n\n     // we can create an instance as well\n     var newCard = new CreditCard({number:\'0123\'});\n     newCard.name = "Mike Smith";\n     newCard.$save();\n     // POST: /user/123/card {number:\'0123\', name:\'Mike Smith\'}\n     // server returns: {id:789, number:\'0123\', name: \'Mike Smith\'};\n     expect(newCard.id).toEqual(789);\n * ```\n *\n * The object returned from this function execution is a resource "class" which has "static" method\n * for each action in the definition.\n *\n * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and\n * `headers`.\n *\n * @example\n *\n * # User resource\n *\n * When the data is returned from the server then the object is an instance of the resource type and\n * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD\n * operations (create, read, update, delete) on server-side data.\n\n   ```js\n     var User = $resource(\'/user/:userId\', {userId:\'@id\'});\n     User.get({userId:123}, function(user) {\n       user.abc = true;\n       user.$save();\n     });\n   ```\n *\n * It\'s worth noting that the success callback for `get`, `query` and other methods gets passed\n * in the response that came from the server as well as $http header getter function, so one\n * could rewrite the above example and get access to http headers as:\n *\n   ```js\n     var User = $resource(\'/user/:userId\', {userId:\'@id\'});\n     User.get({userId:123}, function(user, getResponseHeaders){\n       user.abc = true;\n       user.$save(function(user, putResponseHeaders) {\n         //user => saved user object\n         //putResponseHeaders => $http header getter\n       });\n     });\n   ```\n *\n * You can also access the raw `$http` promise via the `$promise` property on the object returned\n *\n   ```\n     var User = $resource(\'/user/:userId\', {userId:\'@id\'});\n     User.get({userId:123})\n         .$promise.then(function(user) {\n           $scope.user = user;\n         });\n   ```\n *\n * @example\n *\n * # Creating a custom \'PUT\' request\n *\n * In this example we create a custom method on our resource to make a PUT request\n * ```js\n *    var app = angular.module(\'app\', [\'ngResource\', \'ngRoute\']);\n *\n *    // Some APIs expect a PUT request in the format URL/object/ID\n *    // Here we are creating an \'update\' method\n *    app.factory(\'Notes\', [\'$resource\', function($resource) {\n *    return $resource(\'/notes/:id\', null,\n *        {\n *            \'update\': { method:\'PUT\' }\n *        });\n *    }]);\n *\n *    // In our controller we get the ID from the URL using ngRoute and $routeParams\n *    // We pass in $routeParams and our Notes factory along with $scope\n *    app.controller(\'NotesCtrl\', [\'$scope\', \'$routeParams\', \'Notes\',\n                                      function($scope, $routeParams, Notes) {\n *    // First get a note object from the factory\n *    var note = Notes.get({ id:$routeParams.id });\n *    $id = note.id;\n *\n *    // Now call update passing in the ID first then the object you are updating\n *    Notes.update({ id:$id }, note);\n *\n *    // This will PUT /notes/ID with the note object in the request payload\n *    }]);\n * ```\n *\n * @example\n *\n * # Cancelling requests\n *\n * If an action\'s configuration specifies that it is cancellable, you can cancel the request related\n * to an instance or collection (as long as it is a result of a "non-instance" call):\n *\n   ```js\n     // ...defining the `Hotel` resource...\n     var Hotel = $resource(\'/api/hotel/:id\', {id: \'@id\'}, {\n       // Let\'s make the `query()` method cancellable\n       query: {method: \'get\', isArray: true, cancellable: true}\n     });\n\n     // ...somewhere in the PlanVacationController...\n     ...\n     this.onDestinationChanged = function onDestinationChanged(destination) {\n       // We don\'t care about any pending request for hotels\n       // in a different destination any more\n       this.availableHotels.$cancelRequest();\n\n       // Let\'s query for hotels in \'<destination>\'\n       // (calls: /api/hotel?location=<destination>)\n       this.availableHotels = Hotel.query({location: destination});\n     };\n   ```\n *\n */\nangular.module(\'ngResource\', [\'ng\']).\n  provider(\'$resource\', function ResourceProvider() {\n    var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\\/\\/[^/]*/;\n\n    var provider = this;\n\n    /**\n     * @ngdoc property\n     * @name $resourceProvider#defaults\n     * @description\n     * Object containing default options used when creating `$resource` instances.\n     *\n     * The default values satisfy a wide range of usecases, but you may choose to overwrite any of\n     * them to further customize your instances. The available properties are:\n     *\n     * - **stripTrailingSlashes** \u2013 `{boolean}` \u2013 If true, then the trailing slashes from any\n     *   calculated URL will be stripped.<br />\n     *   (Defaults to true.)\n     * - **cancellable** \u2013 `{boolean}` \u2013 If true, the request made by a "non-instance" call will be\n     *   cancelled (if not already completed) by calling `$cancelRequest()` on the call\'s return\n     *   value. For more details, see {@link ngResource.$resource}. This can be overwritten per\n     *   resource class or action.<br />\n     *   (Defaults to false.)\n     * - **actions** - `{Object.<Object>}` - A hash with default actions declarations. Actions are\n     *   high-level methods corresponding to RESTful actions/methods on resources. An action may\n     *   specify what HTTP method to use, what URL to hit, if the return value will be a single\n     *   object or a collection (array) of objects etc. For more details, see\n     *   {@link ngResource.$resource}. The actions can also be enhanced or overwritten per resource\n     *   class.<br />\n     *   The default actions are:\n     *   ```js\n     *   {\n     *     get: {method: \'GET\'},\n     *     save: {method: \'POST\'},\n     *     query: {method: \'GET\', isArray: true},\n     *     remove: {method: \'DELETE\'},\n     *     delete: {method: \'DELETE\'}\n     *   }\n     *   ```\n     *\n     * #### Example\n     *\n     * For example, you can specify a new `update` action that uses the `PUT` HTTP verb:\n     *\n     * ```js\n     *   angular.\n     *     module(\'myApp\').\n     *     config([\'$resourceProvider\', function ($resourceProvider) {\n     *       $resourceProvider.defaults.actions.update = {\n     *         method: \'PUT\'\n     *       };\n     *     });\n     * ```\n     *\n     * Or you can even overwrite the whole `actions` list and specify your own:\n     *\n     * ```js\n     *   angular.\n     *     module(\'myApp\').\n     *     config([\'$resourceProvider\', function ($resourceProvider) {\n     *       $resourceProvider.defaults.actions = {\n     *         create: {method: \'POST\'},\n     *         get:    {method: \'GET\'},\n     *         getAll: {method: \'GET\', isArray:true},\n     *         update: {method: \'PUT\'},\n     *         delete: {method: \'DELETE\'}\n     *       };\n     *     });\n     * ```\n     *\n     */\n    this.defaults = {\n      // Strip slashes by default\n      stripTrailingSlashes: true,\n\n      // Make non-instance requests cancellable (via `$cancelRequest()`)\n      cancellable: false,\n\n      // Default actions configuration\n      actions: {\n        \'get\': {method: \'GET\'},\n        \'save\': {method: \'POST\'},\n        \'query\': {method: \'GET\', isArray: true},\n        \'remove\': {method: \'DELETE\'},\n        \'delete\': {method: \'DELETE\'}\n      }\n    };\n\n    this.$get = [\'$http\', \'$log\', \'$q\', \'$timeout\', function($http, $log, $q, $timeout) {\n\n      var noop = angular.noop,\n        forEach = angular.forEach,\n        extend = angular.extend,\n        copy = angular.copy,\n        isArray = angular.isArray,\n        isDefined = angular.isDefined,\n        isFunction = angular.isFunction,\n        isNumber = angular.isNumber;\n\n      /**\n       * We need our custom method because encodeURIComponent is too aggressive and doesn\'t follow\n       * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set\n       * (pchar) allowed in path segments:\n       *    segment       = *pchar\n       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"\n       *    pct-encoded   = "%" HEXDIG HEXDIG\n       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"\n       *    sub-delims    = "!" / "$" / "&" / "\'" / "(" / ")"\n       *                     / "*" / "+" / "," / ";" / "="\n       */\n      function encodeUriSegment(val) {\n        return encodeUriQuery(val, true).\n          replace(/%26/gi, \'&\').\n          replace(/%3D/gi, \'=\').\n          replace(/%2B/gi, \'+\');\n      }\n\n\n      /**\n       * This method is intended for encoding *key* or *value* parts of query component. We need a\n       * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn\'t\n       * have to be encoded per http://tools.ietf.org/html/rfc3986:\n       *    query       = *( pchar / "/" / "?" )\n       *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"\n       *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"\n       *    pct-encoded   = "%" HEXDIG HEXDIG\n       *    sub-delims    = "!" / "$" / "&" / "\'" / "(" / ")"\n       *                     / "*" / "+" / "," / ";" / "="\n       */\n      function encodeUriQuery(val, pctEncodeSpaces) {\n        return encodeURIComponent(val).\n          replace(/%40/gi, \'@\').\n          replace(/%3A/gi, \':\').\n          replace(/%24/g, \'$\').\n          replace(/%2C/gi, \',\').\n          replace(/%20/g, (pctEncodeSpaces ? \'%20\' : \'+\'));\n      }\n\n      function Route(template, defaults) {\n        this.template = template;\n        this.defaults = extend({}, provider.defaults, defaults);\n        this.urlParams = {};\n      }\n\n      Route.prototype = {\n        setUrlParams: function(config, params, actionUrl) {\n          var self = this,\n            url = actionUrl || self.template,\n            val,\n            encodedVal,\n            protocolAndDomain = \'\';\n\n          var urlParams = self.urlParams = {};\n          forEach(url.split(/\\W/), function(param) {\n            if (param === \'hasOwnProperty\') {\n              throw $resourceMinErr(\'badname\', \'hasOwnProperty is not a valid parameter name.\');\n            }\n            if (!(new RegExp(\'^\\\\d+$\').test(param)) && param &&\n              (new RegExp(\'(^|[^\\\\\\\\]):\' + param + \'(\\\\W|$)\').test(url))) {\n              urlParams[param] = {\n                isQueryParamValue: (new RegExp(\'\\\\?.*=:\' + param + \'(?:\\\\W|$)\')).test(url)\n              };\n            }\n          });\n          url = url.replace(/\\\\:/g, \':\');\n          url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function(match) {\n            protocolAndDomain = match;\n            return \'\';\n          });\n\n          params = params || {};\n          forEach(self.urlParams, function(paramInfo, urlParam) {\n            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];\n            if (isDefined(val) && val !== null) {\n              if (paramInfo.isQueryParamValue) {\n                encodedVal = encodeUriQuery(val, true);\n              } else {\n                encodedVal = encodeUriSegment(val);\n              }\n              url = url.replace(new RegExp(\':\' + urlParam + \'(\\\\W|$)\', \'g\'), function(match, p1) {\n                return encodedVal + p1;\n              });\n            } else {\n              url = url.replace(new RegExp(\'(/?):\' + urlParam + \'(\\\\W|$)\', \'g\'), function(match,\n                  leadingSlashes, tail) {\n                if (tail.charAt(0) === \'/\') {\n                  return tail;\n                } else {\n                  return leadingSlashes + tail;\n                }\n              });\n            }\n          });\n\n          // strip trailing slashes and set the url (unless this behavior is specifically disabled)\n          if (self.defaults.stripTrailingSlashes) {\n            url = url.replace(/\\/+$/, \'\') || \'/\';\n          }\n\n          // then replace collapse `/.` if found in the last URL path segment before the query\n          // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`\n          url = url.replace(/\\/\\.(?=\\w+($|\\?))/, \'.\');\n          // replace escaped `/\\.` with `/.`\n          config.url = protocolAndDomain + url.replace(/\\/\\\\\\./, \'/.\');\n\n\n          // set params - delegate param encoding to $http\n          forEach(params, function(value, key) {\n            if (!self.urlParams[key]) {\n              config.params = config.params || {};\n              config.params[key] = value;\n            }\n          });\n        }\n      };\n\n\n      function resourceFactory(url, paramDefaults, actions, options) {\n        var route = new Route(url, options);\n\n        actions = extend({}, provider.defaults.actions, actions);\n\n        function extractParams(data, actionParams) {\n          var ids = {};\n          actionParams = extend({}, paramDefaults, actionParams);\n          forEach(actionParams, function(value, key) {\n            if (isFunction(value)) { value = value(data); }\n            ids[key] = value && value.charAt && value.charAt(0) === \'@\' ?\n              lookupDottedPath(data, value.substr(1)) : value;\n          });\n          return ids;\n        }\n\n        function defaultResponseInterceptor(response) {\n          return response.resource;\n        }\n\n        function Resource(value) {\n          shallowClearAndCopy(value || {}, this);\n        }\n\n        Resource.prototype.toJSON = function() {\n          var data = extend({}, this);\n          delete data.$promise;\n          delete data.$resolved;\n          delete data.$cancelRequest;\n          return data;\n        };\n\n        forEach(actions, function(action, name) {\n          var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);\n          var numericTimeout = action.timeout;\n          var cancellable = isDefined(action.cancellable) ?\n              action.cancellable : route.defaults.cancellable;\n\n          if (numericTimeout && !isNumber(numericTimeout)) {\n            $log.debug(\'ngResource:\\n\' +\n                       \'  Only numeric values are allowed as `timeout`.\\n\' +\n                       \'  Promises are not supported in $resource, because the same value would \' +\n                       \'be used for multiple requests. If you are looking for a way to cancel \' +\n                       \'requests, you should use the `cancellable` option.\');\n            delete action.timeout;\n            numericTimeout = null;\n          }\n\n          Resource[name] = function(a1, a2, a3, a4) {\n            var params = {}, data, success, error;\n\n            switch (arguments.length) {\n              case 4:\n                error = a4;\n                success = a3;\n                // falls through\n              case 3:\n              case 2:\n                if (isFunction(a2)) {\n                  if (isFunction(a1)) {\n                    success = a1;\n                    error = a2;\n                    break;\n                  }\n\n                  success = a2;\n                  error = a3;\n                  // falls through\n                } else {\n                  params = a1;\n                  data = a2;\n                  success = a3;\n                  break;\n                }\n                // falls through\n              case 1:\n                if (isFunction(a1)) success = a1;\n                else if (hasBody) data = a1;\n                else params = a1;\n                break;\n              case 0: break;\n              default:\n                throw $resourceMinErr(\'badargs\',\n                  \'Expected up to 4 arguments [params, data, success, error], got {0} arguments\',\n                  arguments.length);\n            }\n\n            var isInstanceCall = this instanceof Resource;\n            var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));\n            var httpConfig = {};\n            var responseInterceptor = action.interceptor && action.interceptor.response ||\n              defaultResponseInterceptor;\n            var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||\n              undefined;\n            var timeoutDeferred;\n            var numericTimeoutPromise;\n\n            forEach(action, function(value, key) {\n              switch (key) {\n                default:\n                  httpConfig[key] = copy(value);\n                  break;\n                case \'params\':\n                case \'isArray\':\n                case \'interceptor\':\n                case \'cancellable\':\n                  break;\n              }\n            });\n\n            if (!isInstanceCall && cancellable) {\n              timeoutDeferred = $q.defer();\n              httpConfig.timeout = timeoutDeferred.promise;\n\n              if (numericTimeout) {\n                numericTimeoutPromise = $timeout(timeoutDeferred.resolve, numericTimeout);\n              }\n            }\n\n            if (hasBody) httpConfig.data = data;\n            route.setUrlParams(httpConfig,\n              extend({}, extractParams(data, action.params || {}), params),\n              action.url);\n\n            var promise = $http(httpConfig).then(function(response) {\n              var data = response.data;\n\n              if (data) {\n                // Need to convert action.isArray to boolean in case it is undefined\n                if (isArray(data) !== (!!action.isArray)) {\n                  throw $resourceMinErr(\'badcfg\',\n                      \'Error in resource configuration for action `{0}`. Expected response to \' +\n                      \'contain an {1} but got an {2} (Request: {3} {4})\', name, action.isArray ? \'array\' : \'object\',\n                    isArray(data) ? \'array\' : \'object\', httpConfig.method, httpConfig.url);\n                }\n                if (action.isArray) {\n                  value.length = 0;\n                  forEach(data, function(item) {\n                    if (typeof item === \'object\') {\n                      value.push(new Resource(item));\n                    } else {\n                      // Valid JSON values may be string literals, and these should not be converted\n                      // into objects. These items will not have access to the Resource prototype\n                      // methods, but unfortunately there\n                      value.push(item);\n                    }\n                  });\n                } else {\n                  var promise = value.$promise;     // Save the promise\n                  shallowClearAndCopy(data, value);\n                  value.$promise = promise;         // Restore the promise\n                }\n              }\n              response.resource = value;\n\n              return response;\n            }, function(response) {\n              (error || noop)(response);\n              return $q.reject(response);\n            });\n\n            promise[\'finally\'](function() {\n              value.$resolved = true;\n              if (!isInstanceCall && cancellable) {\n                value.$cancelRequest = noop;\n                $timeout.cancel(numericTimeoutPromise);\n                timeoutDeferred = numericTimeoutPromise = httpConfig.timeout = null;\n              }\n            });\n\n            promise = promise.then(\n              function(response) {\n                var value = responseInterceptor(response);\n                (success || noop)(value, response.headers, response.status, response.statusText);\n                return value;\n              },\n              responseErrorInterceptor);\n\n            if (!isInstanceCall) {\n              // we are creating instance / collection\n              // - set the initial promise\n              // - return the instance / collection\n              value.$promise = promise;\n              value.$resolved = false;\n              if (cancellable) value.$cancelRequest = timeoutDeferred.resolve;\n\n              return value;\n            }\n\n            // instance call\n            return promise;\n          };\n\n\n          Resource.prototype[\'$\' + name] = function(params, success, error) {\n            if (isFunction(params)) {\n              error = success; success = params; params = {};\n            }\n            var result = Resource[name].call(this, params, this, success, error);\n            return result.$promise || result;\n          };\n        });\n\n        Resource.bind = function(additionalParamDefaults) {\n          var extendedParamDefaults = extend({}, paramDefaults, additionalParamDefaults);\n          return resourceFactory(url, extendedParamDefaults, actions, options);\n        };\n\n        return Resource;\n      }\n\n      return resourceFactory;\n    }];\n  });\n\n\n})(window, window.angular);\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*angular-resource@1.5.11#index*/
define('angular-resource@1.5.11#index', function (require, exports, module) {
    require('./angular-resource');
    module.exports = 'ngResource';
});
/*mev-dataset@0.0.1#src/main/dataset/lib/datasetStatistics*/
define('mev-dataset@0.0.1#src/main/dataset/lib/datasetStatistics', [], function () {
    return function () {
        var self = this;
        return {
            percentile: function (percent) {
                var f = Math.floor((self.sortedValues.length - 1) * 0.01 * parseFloat(percent)), c = Math.ceil((self.sortedValues.length - 1) * 0.01 * parseFloat(percent));
                return (self.values[self.sortedValues[f]].value + self.values[self.sortedValues[c]].value) / 2;
            },
            max: function () {
                return this.percentile(100);
            },
            min: function () {
                return this.percentile(0);
            },
            median: function () {
                return this.percentile(50);
            },
            quartile: function (q) {
                return this.percentile(q * 25);
            },
            contingency: function (experiment) {
                if (!experiment.groups || !experiment.dimension || experiment.threshold == undefined || !experiment.population) {
                    throw new TypeError('Missing experment attribute.' + ' Groups: ' + experiment.groups + ' Dimension: ' + experiment.dimension + ' Threshold: ' + experiment.threshold);
                    return;
                }
                if (experiment.groups.length > 2 || experiment.groups.length < 2) {
                    throw new RangeError('Group length incorrect. Expected: 2. Received: ' + experiment.groups.length);
                    return;
                }
                for (group in experiment.groups) {
                    if (experiment.groups[group].length < 1) {
                        throw new RangeError('Group with no elements found! Requires at least one element.');
                    }
                }
                for (element in experiment.groups[0]) {
                    if (experiment.groups[1].indexOf(experiment.groups[0][element]) >= 0) {
                        throw new TypeError('Intersection of groups is not null. Element in both groups: ' + experiment.groups[0][element]);
                    }
                }
                var table = [
                    {
                        above: 0,
                        below: 0
                    },
                    {
                        above: 0,
                        below: 0
                    }
                ];
                for (group in experiment.groups) {
                    for (member in experiment.groups[group]) {
                        if (experiment.dimension == 'column') {
                            if (self.get([
                                    experiment.groups[group][member],
                                    experiment.population
                                ]).value >= experiment.threshold) {
                                table[group].above++;
                            } else {
                                table[group].below++;
                            }
                        }
                        if (experiment.dimension == 'row') {
                            if (self.get([
                                    experiment.population,
                                    experiment.groups[group][member]
                                ]).value >= experiment.threshold) {
                                table[group].above++;
                            } else {
                                table[group].below++;
                            }
                        }
                    }
                }
                return table;
            }
        };
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/selectionSort*/
define('mev-dataset@0.0.1#src/main/dataset/lib/selectionSort', [], function () {
    function exchange(arr, i, j) {
        var hold = arr[j];
        arr[j] = arr[i];
        arr[i] = hold;
    }
    function randomize(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i];
        }
    }
    return function (keyF) {
        var self = this;
        var keyf = function (j) {
            return parseFloat(j.value);
        };
        if (keyF) {
            keyf = keyF;
        }
        var pivot = 0;
        while (pivot < self.values.length) {
            var leader = {
                value: Number.POSITIVE_INFINITY,
                index: undefined,
                place: undefined
            };
            for (var ind = pivot; ind < self.sortedValues.length; ind++) {
                if (keyf(self.values[self.sortedValues[ind]]) < leader.value) {
                    leader.index = ind;
                    leader.value = keyf(self.values[self.sortedValues[ind]]);
                    leader.place = self.sortedValues[ind];
                }
            }
            self.sortedValues[leader.index] = self.sortedValues[pivot];
            self.sortedValues[pivot] = leader.place;
            pivot++;
        }
        ;
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/selectionHelpers*/
define('mev-dataset@0.0.1#src/main/dataset/lib/selectionHelpers', [], function () {
    return {
        selectionIntersect: function (params) {
            var self = this;
            var set1, set2;
            self.selections[params.dimension].map(function (selection) {
                if (selection.name == params.selection1) {
                    set1 = selection;
                }
                if (selection.name == params.selection2) {
                    set2 = selection;
                }
            });
            if (!set1 || !set2) {
                return [];
            } else {
                var intersection = [];
                for (var i = 0; i < set1.keys.length; i++) {
                    for (var j = 0; j < set2.keys.length; j++) {
                        if (set1.keys[i] == set2.keys[j]) {
                            intersection.push(set1.keys[i]);
                        }
                    }
                }
                return intersection;
            }
        }
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/expressionModule*/
(function () {
    define('mev-dataset@0.0.1#src/main/dataset/lib/expressionModule', [], function () {
        return {
            'retrieve': function (searchValue) {
                var self = this;
                if (searchValue['row'] && !searchValue['column']) {
                    return self.column.keys.map(function (col) {
                        return self.expression.get([
                            searchValue['row'],
                            col
                        ]);
                    }).filter(function (exp) {
                        return typeof exp != 'undefined';
                    });
                } else if (searchValue['column'] && !searchValue['row']) {
                    return self.row.keys.map(function (row) {
                        return self.expression.get([
                            row,
                            searchValue['column']
                        ]);
                    }).filter(function (exp) {
                        return typeof exp != 'undefined';
                    });
                } else if (searchValue['column'] && searchValue['row']) {
                    var elem = [self.expression.get([
                            searchValue['row'],
                            searchValue['column']
                        ])];
                    return elem.filter(function (exp) {
                        return typeof exp != 'undefined';
                    });
                } else {
                    return [];
                }
            }
        };
    });
}());
/*q@1.4.1#q*/
(function (definition) {
    'use strict';
    if (typeof bootstrap === 'function') {
        bootstrap('promise', definition);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define('q@1.4.1#q', definition);
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }
    } else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
        var global = typeof window !== 'undefined' ? window : self;
        var previousQ = global.Q;
        global.Q = definition();
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };
    } else {
        throw new Error('This environment was not anticipated by Q. Please file a bug.');
    }
}(function () {
    'use strict';
    var hasStacks = false;
    try {
        throw new Error();
    } catch (e) {
        hasStacks = !!e.stack;
    }
    var qStartingLine = captureLine();
    var qFileName;
    var noop = function () {
    };
    var nextTick = function () {
        var head = {
            task: void 0,
            next: null
        };
        var tail = head;
        var flushing = false;
        var requestTick = void 0;
        var isNodeJS = false;
        var laterQueue = [];
        function flush() {
            var task, domain;
            while (head.next) {
                head = head.next;
                task = head.task;
                head.task = void 0;
                domain = head.domain;
                if (domain) {
                    head.domain = void 0;
                    domain.enter();
                }
                runSingle(task, domain);
            }
            while (laterQueue.length) {
                task = laterQueue.pop();
                runSingle(task);
            }
            flushing = false;
        }
        function runSingle(task, domain) {
            try {
                task();
            } catch (e) {
                if (isNodeJS) {
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }
                    throw e;
                } else {
                    setTimeout(function () {
                        throw e;
                    }, 0);
                }
            }
            if (domain) {
                domain.exit();
            }
        }
        nextTick = function (task) {
            tail = tail.next = {
                task: task,
                domain: isNodeJS && process.domain,
                next: null
            };
            if (!flushing) {
                flushing = true;
                requestTick();
            }
        };
        if (typeof process === 'object' && process.toString() === '[object process]' && process.nextTick) {
            isNodeJS = true;
            requestTick = function () {
                process.nextTick(flush);
            };
        } else if (typeof setImmediate === 'function') {
            if (typeof window !== 'undefined') {
                requestTick = setImmediate.bind(window, flush);
            } else {
                requestTick = function () {
                    setImmediate(flush);
                };
            }
        } else if (typeof MessageChannel !== 'undefined') {
            var channel = new MessageChannel();
            channel.port1.onmessage = function () {
                requestTick = requestPortTick;
                channel.port1.onmessage = flush;
                flush();
            };
            var requestPortTick = function () {
                channel.port2.postMessage(0);
            };
            requestTick = function () {
                setTimeout(flush, 0);
                requestPortTick();
            };
        } else {
            requestTick = function () {
                setTimeout(flush, 0);
            };
        }
        nextTick.runAfter = function (task) {
            laterQueue.push(task);
            if (!flushing) {
                flushing = true;
                requestTick();
            }
        };
        return nextTick;
    }();
    var call = Function.call;
    function uncurryThis(f) {
        return function () {
            return call.apply(f, arguments);
        };
    }
    var array_slice = uncurryThis(Array.prototype.slice);
    var array_reduce = uncurryThis(Array.prototype.reduce || function (callback, basis) {
        var index = 0, length = this.length;
        if (arguments.length === 1) {
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        for (; index < length; index++) {
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    });
    var array_indexOf = uncurryThis(Array.prototype.indexOf || function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    });
    var array_map = uncurryThis(Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    });
    var object_create = Object.create || function (prototype) {
        function Type() {
        }
        Type.prototype = prototype;
        return new Type();
    };
    var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
    var object_keys = Object.keys || function (object) {
        var keys = [];
        for (var key in object) {
            if (object_hasOwnProperty(object, key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    var object_toString = uncurryThis(Object.prototype.toString);
    function isObject(value) {
        return value === Object(value);
    }
    function isStopIteration(exception) {
        return object_toString(exception) === '[object StopIteration]' || exception instanceof QReturnValue;
    }
    var QReturnValue;
    if (typeof ReturnValue !== 'undefined') {
        QReturnValue = ReturnValue;
    } else {
        QReturnValue = function (value) {
            this.value = value;
        };
    }
    var STACK_JUMP_SEPARATOR = 'From previous event:';
    function makeStackTraceLong(error, promise) {
        if (hasStacks && promise.stack && typeof error === 'object' && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack) {
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(error.stack);
            var concatedStacks = stacks.join('\n' + STACK_JUMP_SEPARATOR + '\n');
            error.stack = filterStackString(concatedStacks);
        }
    }
    function filterStackString(stackString) {
        var lines = stackString.split('\n');
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        return desiredLines.join('\n');
    }
    function isNodeFrame(stackLine) {
        return stackLine.indexOf('(module.js:') !== -1 || stackLine.indexOf('(node.js:') !== -1;
    }
    function getFileNameAndLineNumber(stackLine) {
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            return [
                attempt1[1],
                Number(attempt1[2])
            ];
        }
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
            return [
                attempt2[1],
                Number(attempt2[2])
            ];
        }
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            return [
                attempt3[1],
                Number(attempt3[2])
            ];
        }
    }
    function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
            return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
    }
    function captureLine() {
        if (!hasStacks) {
            return;
        }
        try {
            throw new Error();
        } catch (e) {
            var lines = e.stack.split('\n');
            var firstLine = lines[0].indexOf('@') > 0 ? lines[1] : lines[2];
            var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
            if (!fileNameAndLineNumber) {
                return;
            }
            qFileName = fileNameAndLineNumber[0];
            return fileNameAndLineNumber[1];
        }
    }
    function deprecate(callback, name, alternative) {
        return function () {
            if (typeof console !== 'undefined' && typeof console.warn === 'function') {
                console.warn(name + ' is deprecated, use ' + alternative + ' instead.', new Error('').stack);
            }
            return callback.apply(callback, arguments);
        };
    }
    function Q(value) {
        if (value instanceof Promise) {
            return value;
        }
        if (isPromiseAlike(value)) {
            return coerce(value);
        } else {
            return fulfill(value);
        }
    }
    Q.resolve = Q;
    Q.nextTick = nextTick;
    Q.longStackSupport = false;
    if (typeof process === 'object' && process && process.env && process.env.Q_DEBUG) {
        Q.longStackSupport = true;
    }
    Q.defer = defer;
    function defer() {
        var messages = [], progressListeners = [], resolvedPromise;
        var deferred = object_create(defer.prototype);
        var promise = object_create(Promise.prototype);
        promise.promiseDispatch = function (resolve, op, operands) {
            var args = array_slice(arguments);
            if (messages) {
                messages.push(args);
                if (op === 'when' && operands[1]) {
                    progressListeners.push(operands[1]);
                }
            } else {
                Q.nextTick(function () {
                    resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
                });
            }
        };
        promise.valueOf = function () {
            if (messages) {
                return promise;
            }
            var nearerValue = nearer(resolvedPromise);
            if (isPromise(nearerValue)) {
                resolvedPromise = nearerValue;
            }
            return nearerValue;
        };
        promise.inspect = function () {
            if (!resolvedPromise) {
                return { state: 'pending' };
            }
            return resolvedPromise.inspect();
        };
        if (Q.longStackSupport && hasStacks) {
            try {
                throw new Error();
            } catch (e) {
                promise.stack = e.stack.substring(e.stack.indexOf('\n') + 1);
            }
        }
        function become(newPromise) {
            resolvedPromise = newPromise;
            promise.source = newPromise;
            array_reduce(messages, function (undefined, message) {
                Q.nextTick(function () {
                    newPromise.promiseDispatch.apply(newPromise, message);
                });
            }, void 0);
            messages = void 0;
            progressListeners = void 0;
        }
        deferred.promise = promise;
        deferred.resolve = function (value) {
            if (resolvedPromise) {
                return;
            }
            become(Q(value));
        };
        deferred.fulfill = function (value) {
            if (resolvedPromise) {
                return;
            }
            become(fulfill(value));
        };
        deferred.reject = function (reason) {
            if (resolvedPromise) {
                return;
            }
            become(reject(reason));
        };
        deferred.notify = function (progress) {
            if (resolvedPromise) {
                return;
            }
            array_reduce(progressListeners, function (undefined, progressListener) {
                Q.nextTick(function () {
                    progressListener(progress);
                });
            }, void 0);
        };
        return deferred;
    }
    defer.prototype.makeNodeResolver = function () {
        var self = this;
        return function (error, value) {
            if (error) {
                self.reject(error);
            } else if (arguments.length > 2) {
                self.resolve(array_slice(arguments, 1));
            } else {
                self.resolve(value);
            }
        };
    };
    Q.Promise = promise;
    Q.promise = promise;
    function promise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError('resolver must be a function.');
        }
        var deferred = defer();
        try {
            resolver(deferred.resolve, deferred.reject, deferred.notify);
        } catch (reason) {
            deferred.reject(reason);
        }
        return deferred.promise;
    }
    promise.race = race;
    promise.all = all;
    promise.reject = reject;
    promise.resolve = Q;
    Q.passByCopy = function (object) {
        return object;
    };
    Promise.prototype.passByCopy = function () {
        return this;
    };
    Q.join = function (x, y) {
        return Q(x).join(y);
    };
    Promise.prototype.join = function (that) {
        return Q([
            this,
            that
        ]).spread(function (x, y) {
            if (x === y) {
                return x;
            } else {
                throw new Error('Can\'t join: not the same: ' + x + ' ' + y);
            }
        });
    };
    Q.race = race;
    function race(answerPs) {
        return promise(function (resolve, reject) {
            for (var i = 0, len = answerPs.length; i < len; i++) {
                Q(answerPs[i]).then(resolve, reject);
            }
        });
    }
    Promise.prototype.race = function () {
        return this.then(Q.race);
    };
    Q.makePromise = Promise;
    function Promise(descriptor, fallback, inspect) {
        if (fallback === void 0) {
            fallback = function (op) {
                return reject(new Error('Promise does not support operation: ' + op));
            };
        }
        if (inspect === void 0) {
            inspect = function () {
                return { state: 'unknown' };
            };
        }
        var promise = object_create(Promise.prototype);
        promise.promiseDispatch = function (resolve, op, args) {
            var result;
            try {
                if (descriptor[op]) {
                    result = descriptor[op].apply(promise, args);
                } else {
                    result = fallback.call(promise, op, args);
                }
            } catch (exception) {
                result = reject(exception);
            }
            if (resolve) {
                resolve(result);
            }
        };
        promise.inspect = inspect;
        if (inspect) {
            var inspected = inspect();
            if (inspected.state === 'rejected') {
                promise.exception = inspected.reason;
            }
            promise.valueOf = function () {
                var inspected = inspect();
                if (inspected.state === 'pending' || inspected.state === 'rejected') {
                    return promise;
                }
                return inspected.value;
            };
        }
        return promise;
    }
    Promise.prototype.toString = function () {
        return '[object Promise]';
    };
    Promise.prototype.then = function (fulfilled, rejected, progressed) {
        var self = this;
        var deferred = defer();
        var done = false;
        function _fulfilled(value) {
            try {
                return typeof fulfilled === 'function' ? fulfilled(value) : value;
            } catch (exception) {
                return reject(exception);
            }
        }
        function _rejected(exception) {
            if (typeof rejected === 'function') {
                makeStackTraceLong(exception, self);
                try {
                    return rejected(exception);
                } catch (newException) {
                    return reject(newException);
                }
            }
            return reject(exception);
        }
        function _progressed(value) {
            return typeof progressed === 'function' ? progressed(value) : value;
        }
        Q.nextTick(function () {
            self.promiseDispatch(function (value) {
                if (done) {
                    return;
                }
                done = true;
                deferred.resolve(_fulfilled(value));
            }, 'when', [function (exception) {
                    if (done) {
                        return;
                    }
                    done = true;
                    deferred.resolve(_rejected(exception));
                }]);
        });
        self.promiseDispatch(void 0, 'when', [
            void 0,
            function (value) {
                var newValue;
                var threw = false;
                try {
                    newValue = _progressed(value);
                } catch (e) {
                    threw = true;
                    if (Q.onerror) {
                        Q.onerror(e);
                    } else {
                        throw e;
                    }
                }
                if (!threw) {
                    deferred.notify(newValue);
                }
            }
        ]);
        return deferred.promise;
    };
    Q.tap = function (promise, callback) {
        return Q(promise).tap(callback);
    };
    Promise.prototype.tap = function (callback) {
        callback = Q(callback);
        return this.then(function (value) {
            return callback.fcall(value).thenResolve(value);
        });
    };
    Q.when = when;
    function when(value, fulfilled, rejected, progressed) {
        return Q(value).then(fulfilled, rejected, progressed);
    }
    Promise.prototype.thenResolve = function (value) {
        return this.then(function () {
            return value;
        });
    };
    Q.thenResolve = function (promise, value) {
        return Q(promise).thenResolve(value);
    };
    Promise.prototype.thenReject = function (reason) {
        return this.then(function () {
            throw reason;
        });
    };
    Q.thenReject = function (promise, reason) {
        return Q(promise).thenReject(reason);
    };
    Q.nearer = nearer;
    function nearer(value) {
        if (isPromise(value)) {
            var inspected = value.inspect();
            if (inspected.state === 'fulfilled') {
                return inspected.value;
            }
        }
        return value;
    }
    Q.isPromise = isPromise;
    function isPromise(object) {
        return object instanceof Promise;
    }
    Q.isPromiseAlike = isPromiseAlike;
    function isPromiseAlike(object) {
        return isObject(object) && typeof object.then === 'function';
    }
    Q.isPending = isPending;
    function isPending(object) {
        return isPromise(object) && object.inspect().state === 'pending';
    }
    Promise.prototype.isPending = function () {
        return this.inspect().state === 'pending';
    };
    Q.isFulfilled = isFulfilled;
    function isFulfilled(object) {
        return !isPromise(object) || object.inspect().state === 'fulfilled';
    }
    Promise.prototype.isFulfilled = function () {
        return this.inspect().state === 'fulfilled';
    };
    Q.isRejected = isRejected;
    function isRejected(object) {
        return isPromise(object) && object.inspect().state === 'rejected';
    }
    Promise.prototype.isRejected = function () {
        return this.inspect().state === 'rejected';
    };
    var unhandledReasons = [];
    var unhandledRejections = [];
    var reportedUnhandledRejections = [];
    var trackUnhandledRejections = true;
    function resetUnhandledRejections() {
        unhandledReasons.length = 0;
        unhandledRejections.length = 0;
        if (!trackUnhandledRejections) {
            trackUnhandledRejections = true;
        }
    }
    function trackRejection(promise, reason) {
        if (!trackUnhandledRejections) {
            return;
        }
        if (typeof process === 'object' && typeof process.emit === 'function') {
            Q.nextTick.runAfter(function () {
                if (array_indexOf(unhandledRejections, promise) !== -1) {
                    process.emit('unhandledRejection', reason, promise);
                    reportedUnhandledRejections.push(promise);
                }
            });
        }
        unhandledRejections.push(promise);
        if (reason && typeof reason.stack !== 'undefined') {
            unhandledReasons.push(reason.stack);
        } else {
            unhandledReasons.push('(no stack) ' + reason);
        }
    }
    function untrackRejection(promise) {
        if (!trackUnhandledRejections) {
            return;
        }
        var at = array_indexOf(unhandledRejections, promise);
        if (at !== -1) {
            if (typeof process === 'object' && typeof process.emit === 'function') {
                Q.nextTick.runAfter(function () {
                    var atReport = array_indexOf(reportedUnhandledRejections, promise);
                    if (atReport !== -1) {
                        process.emit('rejectionHandled', unhandledReasons[at], promise);
                        reportedUnhandledRejections.splice(atReport, 1);
                    }
                });
            }
            unhandledRejections.splice(at, 1);
            unhandledReasons.splice(at, 1);
        }
    }
    Q.resetUnhandledRejections = resetUnhandledRejections;
    Q.getUnhandledReasons = function () {
        return unhandledReasons.slice();
    };
    Q.stopUnhandledRejectionTracking = function () {
        resetUnhandledRejections();
        trackUnhandledRejections = false;
    };
    resetUnhandledRejections();
    Q.reject = reject;
    function reject(reason) {
        var rejection = Promise({
            'when': function (rejected) {
                if (rejected) {
                    untrackRejection(this);
                }
                return rejected ? rejected(reason) : this;
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return {
                state: 'rejected',
                reason: reason
            };
        });
        trackRejection(rejection, reason);
        return rejection;
    }
    Q.fulfill = fulfill;
    function fulfill(value) {
        return Promise({
            'when': function () {
                return value;
            },
            'get': function (name) {
                return value[name];
            },
            'set': function (name, rhs) {
                value[name] = rhs;
            },
            'delete': function (name) {
                delete value[name];
            },
            'post': function (name, args) {
                if (name === null || name === void 0) {
                    return value.apply(void 0, args);
                } else {
                    return value[name].apply(value, args);
                }
            },
            'apply': function (thisp, args) {
                return value.apply(thisp, args);
            },
            'keys': function () {
                return object_keys(value);
            }
        }, void 0, function inspect() {
            return {
                state: 'fulfilled',
                value: value
            };
        });
    }
    function coerce(promise) {
        var deferred = defer();
        Q.nextTick(function () {
            try {
                promise.then(deferred.resolve, deferred.reject, deferred.notify);
            } catch (exception) {
                deferred.reject(exception);
            }
        });
        return deferred.promise;
    }
    Q.master = master;
    function master(object) {
        return Promise({
            'isDef': function () {
            }
        }, function fallback(op, args) {
            return dispatch(object, op, args);
        }, function () {
            return Q(object).inspect();
        });
    }
    Q.spread = spread;
    function spread(value, fulfilled, rejected) {
        return Q(value).spread(fulfilled, rejected);
    }
    Promise.prototype.spread = function (fulfilled, rejected) {
        return this.all().then(function (array) {
            return fulfilled.apply(void 0, array);
        }, rejected);
    };
    Q.async = async;
    function async(makeGenerator) {
        return function () {
            function continuer(verb, arg) {
                var result;
                if (typeof StopIteration === 'undefined') {
                    try {
                        result = generator[verb](arg);
                    } catch (exception) {
                        return reject(exception);
                    }
                    if (result.done) {
                        return Q(result.value);
                    } else {
                        return when(result.value, callback, errback);
                    }
                } else {
                    try {
                        result = generator[verb](arg);
                    } catch (exception) {
                        if (isStopIteration(exception)) {
                            return Q(exception.value);
                        } else {
                            return reject(exception);
                        }
                    }
                    return when(result, callback, errback);
                }
            }
            var generator = makeGenerator.apply(this, arguments);
            var callback = continuer.bind(continuer, 'next');
            var errback = continuer.bind(continuer, 'throw');
            return callback();
        };
    }
    Q.spawn = spawn;
    function spawn(makeGenerator) {
        Q.done(Q.async(makeGenerator)());
    }
    Q['return'] = _return;
    function _return(value) {
        throw new QReturnValue(value);
    }
    Q.promised = promised;
    function promised(callback) {
        return function () {
            return spread([
                this,
                all(arguments)
            ], function (self, args) {
                return callback.apply(self, args);
            });
        };
    }
    Q.dispatch = dispatch;
    function dispatch(object, op, args) {
        return Q(object).dispatch(op, args);
    }
    Promise.prototype.dispatch = function (op, args) {
        var self = this;
        var deferred = defer();
        Q.nextTick(function () {
            self.promiseDispatch(deferred.resolve, op, args);
        });
        return deferred.promise;
    };
    Q.get = function (object, key) {
        return Q(object).dispatch('get', [key]);
    };
    Promise.prototype.get = function (key) {
        return this.dispatch('get', [key]);
    };
    Q.set = function (object, key, value) {
        return Q(object).dispatch('set', [
            key,
            value
        ]);
    };
    Promise.prototype.set = function (key, value) {
        return this.dispatch('set', [
            key,
            value
        ]);
    };
    Q.del = Q['delete'] = function (object, key) {
        return Q(object).dispatch('delete', [key]);
    };
    Promise.prototype.del = Promise.prototype['delete'] = function (key) {
        return this.dispatch('delete', [key]);
    };
    Q.mapply = Q.post = function (object, name, args) {
        return Q(object).dispatch('post', [
            name,
            args
        ]);
    };
    Promise.prototype.mapply = Promise.prototype.post = function (name, args) {
        return this.dispatch('post', [
            name,
            args
        ]);
    };
    Q.send = Q.mcall = Q.invoke = function (object, name) {
        return Q(object).dispatch('post', [
            name,
            array_slice(arguments, 2)
        ]);
    };
    Promise.prototype.send = Promise.prototype.mcall = Promise.prototype.invoke = function (name) {
        return this.dispatch('post', [
            name,
            array_slice(arguments, 1)
        ]);
    };
    Q.fapply = function (object, args) {
        return Q(object).dispatch('apply', [
            void 0,
            args
        ]);
    };
    Promise.prototype.fapply = function (args) {
        return this.dispatch('apply', [
            void 0,
            args
        ]);
    };
    Q['try'] = Q.fcall = function (object) {
        return Q(object).dispatch('apply', [
            void 0,
            array_slice(arguments, 1)
        ]);
    };
    Promise.prototype.fcall = function () {
        return this.dispatch('apply', [
            void 0,
            array_slice(arguments)
        ]);
    };
    Q.fbind = function (object) {
        var promise = Q(object);
        var args = array_slice(arguments, 1);
        return function fbound() {
            return promise.dispatch('apply', [
                this,
                args.concat(array_slice(arguments))
            ]);
        };
    };
    Promise.prototype.fbind = function () {
        var promise = this;
        var args = array_slice(arguments);
        return function fbound() {
            return promise.dispatch('apply', [
                this,
                args.concat(array_slice(arguments))
            ]);
        };
    };
    Q.keys = function (object) {
        return Q(object).dispatch('keys', []);
    };
    Promise.prototype.keys = function () {
        return this.dispatch('keys', []);
    };
    Q.all = all;
    function all(promises) {
        return when(promises, function (promises) {
            var pendingCount = 0;
            var deferred = defer();
            array_reduce(promises, function (undefined, promise, index) {
                var snapshot;
                if (isPromise(promise) && (snapshot = promise.inspect()).state === 'fulfilled') {
                    promises[index] = snapshot.value;
                } else {
                    ++pendingCount;
                    when(promise, function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    }, deferred.reject, function (progress) {
                        deferred.notify({
                            index: index,
                            value: progress
                        });
                    });
                }
            }, void 0);
            if (pendingCount === 0) {
                deferred.resolve(promises);
            }
            return deferred.promise;
        });
    }
    Promise.prototype.all = function () {
        return all(this);
    };
    Q.any = any;
    function any(promises) {
        if (promises.length === 0) {
            return Q.resolve();
        }
        var deferred = Q.defer();
        var pendingCount = 0;
        array_reduce(promises, function (prev, current, index) {
            var promise = promises[index];
            pendingCount++;
            when(promise, onFulfilled, onRejected, onProgress);
            function onFulfilled(result) {
                deferred.resolve(result);
            }
            function onRejected() {
                pendingCount--;
                if (pendingCount === 0) {
                    deferred.reject(new Error('Can\'t get fulfillment value from any promise, all ' + 'promises were rejected.'));
                }
            }
            function onProgress(progress) {
                deferred.notify({
                    index: index,
                    value: progress
                });
            }
        }, undefined);
        return deferred.promise;
    }
    Promise.prototype.any = function () {
        return any(this);
    };
    Q.allResolved = deprecate(allResolved, 'allResolved', 'allSettled');
    function allResolved(promises) {
        return when(promises, function (promises) {
            promises = array_map(promises, Q);
            return when(all(array_map(promises, function (promise) {
                return when(promise, noop, noop);
            })), function () {
                return promises;
            });
        });
    }
    Promise.prototype.allResolved = function () {
        return allResolved(this);
    };
    Q.allSettled = allSettled;
    function allSettled(promises) {
        return Q(promises).allSettled();
    }
    Promise.prototype.allSettled = function () {
        return this.then(function (promises) {
            return all(array_map(promises, function (promise) {
                promise = Q(promise);
                function regardless() {
                    return promise.inspect();
                }
                return promise.then(regardless, regardless);
            }));
        });
    };
    Q.fail = Q['catch'] = function (object, rejected) {
        return Q(object).then(void 0, rejected);
    };
    Promise.prototype.fail = Promise.prototype['catch'] = function (rejected) {
        return this.then(void 0, rejected);
    };
    Q.progress = progress;
    function progress(object, progressed) {
        return Q(object).then(void 0, void 0, progressed);
    }
    Promise.prototype.progress = function (progressed) {
        return this.then(void 0, void 0, progressed);
    };
    Q.fin = Q['finally'] = function (object, callback) {
        return Q(object)['finally'](callback);
    };
    Promise.prototype.fin = Promise.prototype['finally'] = function (callback) {
        callback = Q(callback);
        return this.then(function (value) {
            return callback.fcall().then(function () {
                return value;
            });
        }, function (reason) {
            return callback.fcall().then(function () {
                throw reason;
            });
        });
    };
    Q.done = function (object, fulfilled, rejected, progress) {
        return Q(object).done(fulfilled, rejected, progress);
    };
    Promise.prototype.done = function (fulfilled, rejected, progress) {
        var onUnhandledError = function (error) {
            Q.nextTick(function () {
                makeStackTraceLong(error, promise);
                if (Q.onerror) {
                    Q.onerror(error);
                } else {
                    throw error;
                }
            });
        };
        var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;
        if (typeof process === 'object' && process && process.domain) {
            onUnhandledError = process.domain.bind(onUnhandledError);
        }
        promise.then(void 0, onUnhandledError);
    };
    Q.timeout = function (object, ms, error) {
        return Q(object).timeout(ms, error);
    };
    Promise.prototype.timeout = function (ms, error) {
        var deferred = defer();
        var timeoutId = setTimeout(function () {
            if (!error || 'string' === typeof error) {
                error = new Error(error || 'Timed out after ' + ms + ' ms');
                error.code = 'ETIMEDOUT';
            }
            deferred.reject(error);
        }, ms);
        this.then(function (value) {
            clearTimeout(timeoutId);
            deferred.resolve(value);
        }, function (exception) {
            clearTimeout(timeoutId);
            deferred.reject(exception);
        }, deferred.notify);
        return deferred.promise;
    };
    Q.delay = function (object, timeout) {
        if (timeout === void 0) {
            timeout = object;
            object = void 0;
        }
        return Q(object).delay(timeout);
    };
    Promise.prototype.delay = function (timeout) {
        return this.then(function (value) {
            var deferred = defer();
            setTimeout(function () {
                deferred.resolve(value);
            }, timeout);
            return deferred.promise;
        });
    };
    Q.nfapply = function (callback, args) {
        return Q(callback).nfapply(args);
    };
    Promise.prototype.nfapply = function (args) {
        var deferred = defer();
        var nodeArgs = array_slice(args);
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
    Q.nfcall = function (callback) {
        var args = array_slice(arguments, 1);
        return Q(callback).nfapply(args);
    };
    Promise.prototype.nfcall = function () {
        var nodeArgs = array_slice(arguments);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
    Q.nfbind = Q.denodeify = function (callback) {
        var baseArgs = array_slice(arguments, 1);
        return function () {
            var nodeArgs = baseArgs.concat(array_slice(arguments));
            var deferred = defer();
            nodeArgs.push(deferred.makeNodeResolver());
            Q(callback).fapply(nodeArgs).fail(deferred.reject);
            return deferred.promise;
        };
    };
    Promise.prototype.nfbind = Promise.prototype.denodeify = function () {
        var args = array_slice(arguments);
        args.unshift(this);
        return Q.denodeify.apply(void 0, args);
    };
    Q.nbind = function (callback, thisp) {
        var baseArgs = array_slice(arguments, 2);
        return function () {
            var nodeArgs = baseArgs.concat(array_slice(arguments));
            var deferred = defer();
            nodeArgs.push(deferred.makeNodeResolver());
            function bound() {
                return callback.apply(thisp, arguments);
            }
            Q(bound).fapply(nodeArgs).fail(deferred.reject);
            return deferred.promise;
        };
    };
    Promise.prototype.nbind = function () {
        var args = array_slice(arguments, 0);
        args.unshift(this);
        return Q.nbind.apply(void 0, args);
    };
    Q.nmapply = Q.npost = function (object, name, args) {
        return Q(object).npost(name, args);
    };
    Promise.prototype.nmapply = Promise.prototype.npost = function (name, args) {
        var nodeArgs = array_slice(args || []);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch('post', [
            name,
            nodeArgs
        ]).fail(deferred.reject);
        return deferred.promise;
    };
    Q.nsend = Q.nmcall = Q.ninvoke = function (object, name) {
        var nodeArgs = array_slice(arguments, 2);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(object).dispatch('post', [
            name,
            nodeArgs
        ]).fail(deferred.reject);
        return deferred.promise;
    };
    Promise.prototype.nsend = Promise.prototype.nmcall = Promise.prototype.ninvoke = function (name) {
        var nodeArgs = array_slice(arguments, 1);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch('post', [
            name,
            nodeArgs
        ]).fail(deferred.reject);
        return deferred.promise;
    };
    Q.nodeify = nodeify;
    function nodeify(object, nodeback) {
        return Q(object).nodeify(nodeback);
    }
    Promise.prototype.nodeify = function (nodeback) {
        if (nodeback) {
            this.then(function (value) {
                Q.nextTick(function () {
                    nodeback(null, value);
                });
            }, function (error) {
                Q.nextTick(function () {
                    nodeback(error);
                });
            });
        } else {
            return this;
        }
    };
    Q.noConflict = function () {
        throw new Error('Q.noConflict only works when Q is used as a global');
    };
    var qEndingLine = captureLine();
    return Q;
}));
/*mev-dataset@0.0.1#src/main/dataset/lib/DatasetValues32*/
define('mev-dataset@0.0.1#src/main/dataset/lib/DatasetValues32', ['q'], function (q) {
    return function ValueStore(dataset, $http, $rootScope) {
        var self = this;
        var dataPromise = init();
        function init() {
            return fetchDataValues();
        }
        function fetchDataValues() {
            return q.when({});
            var valuesPromise = $http.get('/dataset/' + dataset.id + '/data/values', {
                params: { format: 'binary' },
                responseType: 'arraybuffer',
                headers: { 'Accept': 'application/octet-stream' }
            }).then(function (values) {
                var ab = values.data;
                var dataview = new DataView(ab);
                console.debug('swap: array', ab.byteLength);
                dataset.valuesBuffer = ab;
                dataset.dataview = dataview;
                $rootScope.$broadcast('mui:model:dataset:values:loaded');
                return ab;
            });
            return valuesPromise;
        }
        function getItemIndex(r, c) {
            return dataset.column.keys.length * r + c;
        }
        function keyToIndex(row, column) {
            var r = dataset.rowLabels2Indexes[row];
            var c = dataset.columnLabels2Indexes[column];
            return getItemIndex(r, c);
        }
        function getByIndex(index) {
            if (dataset.dataview) {
                return dataset.dataview.getFloat32(index * Float32Array.BYTES_PER_ELEMENT, false);
            }
        }
        function getByKey(labelPair) {
            if (dataset.dataview) {
                var index = keyToIndex(labelPair[0], labelPair[1]);
                return getByIndex(index);
            }
        }
        function getSome(shownCells) {
            if (dataset.dataview) {
                for (var i = 0; i < shownCells.length; i++) {
                    var index = keyToIndex(shownCells[i].row, shownCells[i].column);
                    shownCells[i].index = index;
                    shownCells[i].value = getByIndex(index);
                }
            }
            return q.when(shownCells);
        }
        function getDict(shownCells) {
            return dataPromise.then(function () {
                var dict = {};
                for (var i = 0; i < shownCells.length; i++) {
                    var rowName = shownCells[i].row;
                    var columnName = shownCells[i].column;
                    if (!dict[rowName]) {
                        dict[rowName] = {};
                    }
                    if (!dict[rowName][columnName]) {
                        dict[rowName][columnName] = {
                            value: getByKey([
                                rowName,
                                columnName
                            ])
                        };
                    }
                }
                ;
                return dict;
            });
        }
        return {
            getByKey: getByKey,
            getSome: getSome,
            getDict: getDict
        };
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/DatasetValuesJson*/
define('mev-dataset@0.0.1#src/main/dataset/lib/DatasetValuesJson', ['q'], function (q) {
    return function ValueStore(dataset, $http, $rootScope) {
        var self = this;
        self.values = dataset.values;
        function getItemIndex(r, c) {
            return dataset.column.keys.length * r + c;
        }
        function keyToIndex(row, column) {
            var r = dataset.rowLabels2Indexes[row];
            var c = dataset.columnLabels2Indexes[column];
            return getItemIndex(r, c);
        }
        function getByIndex(index) {
            return self.values[index].value;
        }
        function getByKey(labelPair) {
            var index = keyToIndex(labelPair[0], labelPair[1]);
            return getByIndex(index);
        }
        function getSome(shownCells) {
            for (var i = 0; i < shownCells.length; i++) {
                var index = keyToIndex(shownCells[i].row, shownCells[i].column);
                shownCells[i].index = index;
                shownCells[i].value = getByIndex(index);
            }
            return q.when(shownCells);
        }
        function getDict(shownCells) {
            var dict = {};
            for (var i = 0; i < shownCells.length; i++) {
                var rowName = shownCells[i].row;
                var columnName = shownCells[i].column;
                if (!dict[rowName]) {
                    dict[rowName] = {};
                }
                if (!dict[rowName][columnName]) {
                    dict[rowName][columnName] = {
                        value: getByKey([
                            rowName,
                            columnName
                        ])
                    };
                }
            }
            return dict;
        }
        return {
            getByKey: getByKey,
            getSome: getSome,
            getDict: getDict
        };
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/DatasetValues*/
define('mev-dataset@0.0.1#src/main/dataset/lib/DatasetValues', [
    './DatasetValues32',
    './DatasetValuesJson'
], function (DatasetValues32, DatasetValuesJson) {
    return function ValueStore(dataset, $http, $rootScope, datasetRespObj) {
        var self = this;
        var instance;
        if (datasetRespObj && datasetRespObj.values.length > 0)
            instance = new DatasetValuesJson(dataset, $http, $rootScope);
        else
            instance = new DatasetValues32(dataset, $http, $rootScope);
        return {
            getByKey: instance.getByKey.bind(instance),
            getSome: instance.getSome.bind(instance),
            getDict: instance.getDict.bind(instance)
        };
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/DatasetClass*/
define('mev-dataset@0.0.1#src/main/dataset/lib/DatasetClass', [
    './datasetStatistics',
    './selectionSort',
    './selectionHelpers',
    './expressionModule',
    './DatasetValues'
], function (datasetStatistics, selectionSort, selectionHelpers, expressionModule, DatasetValues) {
    'use strict';
    function inversion() {
        var self = this;
        var obj = Object.create(null);
        self.map(function (label, index) {
            obj[label] = index;
        });
        return obj;
    }
    function ranger(n) {
        var r = [];
        for (var i = 0; i < n; i++) {
            r.push(i);
        }
        return r;
    }
    return function (datasetName, datasetRespObj, $http, $rootScope) {
        if (!datasetName) {
            throw new TypeError('datasetName parameter not defined');
        }
        if (!datasetRespObj) {
            throw new TypeError('datasetRespObj parameter not defined');
        }
        var self = this;
        this.id = datasetName;
        this.datasetName = datasetName;
        this.column = datasetRespObj.column;
        this.row = datasetRespObj.row;
        this.columnLabels2Indexes = inversion.call(datasetRespObj.column.keys);
        this.rowLabels2Indexes = inversion.call(datasetRespObj.row.keys);
        this.column.indexOf = function (label) {
            return self.columnLabels2Indexes[label];
        };
        this.row.indexOf = function (label) {
            return self.columnLabels2Indexes[label];
        };
        this.selections = {
            column: datasetRespObj.column.selections,
            row: datasetRespObj.row.selections,
            intersection: function (params) {
                return selectionHelpers.selectionIntersect.call(self, params);
            }
        };
        this.analyses = datasetRespObj.analyses || [];
        this.values = datasetRespObj.values;
        this.valueStore = new DatasetValues(this, $http, $rootScope, this);
        this.expression = {
            values: datasetRespObj.values,
            data: {
                getRow: function (index) {
                    var row = [];
                    for (var c = 0; c < self.column.keys.length; c++) {
                        row.push({
                            value: datasetRespObj.dataview.getFloat64((index + c) * Float64Array.BYTES_PER_ELEMENT, false),
                            row: self.row.keys[index],
                            column: self.column.keys[c]
                        });
                    }
                    return row;
                }
            },
            max: datasetRespObj.max,
            min: datasetRespObj.min,
            avg: datasetRespObj.avg,
            tryGet: this.valueStore.getByKey,
            getSome: this.valueStore.getSome,
            getDict: this.valueStore.getDict,
            get: function (labelPair) {
                var r = self.rowLabels2Indexes[labelPair[0]];
                var c = self.columnLabels2Indexes[labelPair[1]];
                return {
                    value: datasetRespObj.dataview.getFloat64((r * self.column.keys.length + c) * Float64Array.BYTES_PER_ELEMENT, false),
                    row: labelPair[0],
                    column: labelPair[1]
                };
            },
            statistics: datasetStatistics,
            ranger: ranger
        };
        this.expression.sort = selectionSort;
        for (var k = 0; k < datasetRespObj.values.length; k++) {
            if (datasetRespObj.values[k].value % 1 !== 0) {
                self.expression.hasNonIntegerValues = true;
                break;
            }
        }
        this.expression.retrieve = function (input) {
            return expressionModule.retrieve.call(self, input);
        };
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/AnalysisClass*/
define('mev-dataset@0.0.1#src/main/dataset/lib/AnalysisClass', ['lodash'], function (_) {
    return function (initialData) {
        var self = this;
        var internalViewTypes = { 'Hierarchical Clustering': 'tree' };
        self.randomId = Math.random().toString(36).substring(7);
        self.viewType = internalViewTypes[initialData.type];
        _.extend(self, initialData);
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/loadAnalyses*/
define('mev-dataset@0.0.1#src/main/dataset/lib/loadAnalyses', ['./AnalysisClass'], function (AnalysisClass) {
    return function () {
        var self = this;
        self.analyses = [];
        var defaultAnalyses = [];
        return self.analysis.getAll({ datasetName: self.datasetName }).$promise.then(function (response) {
            var requests = [];
            var analyses = [];
            response.names.map(function (name) {
                var request = self.analysis.get({
                    datasetName: self.datasetName,
                    analysisName: name
                }, function (res) {
                    var analysis = new AnalysisClass(res);
                    var sessionStorageKey = self.datasetName + '.' + name;
                    console.debug('sessionStorageKey get', sessionStorageKey);
                    params = JSON.parse(sessionStorage.getItem(self.datasetName + '.' + name));
                    analysis.params = params;
                    console.debug('LoadAnalysis', analysis.name, analysis);
                    analyses.push(analysis);
                });
                requests.push(request.$promise);
            });
            return self.$q.all(requests).then(function (response) {
                self.analyses.length = 0;
                console.debug('qall', response);
                analyses.map(function (analysis) {
                    self.analyses.push(analysis);
                });
                return self.analyses;
            });
        }).then(function (response) {
            console.debug('qall2', response);
            self.analysisEventBus.analysisLoadedAll();
        });
        ;
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/setSelections*/
define('mev-dataset@0.0.1#src/main/dataset/lib/setSelections', [], function () {
    return function (dimension, selections) {
        var self = this;
        self[dimension].selections = selections;
        self.selections[dimension] = selections;
        return null;
    };
});
/*mev-dataset@0.0.1#src/main/dataset/lib/resetSelections*/
define('mev-dataset@0.0.1#src/main/dataset/lib/resetSelections', [], function () {
    return function (dimension) {
        var self = this;
        if (dimension) {
            return self.selection.getAll({
                'datasetName': self.datasetName,
                'dimension': dimension
            }, function (response) {
                self.setSelections(dimension, response.selections);
                return response.selections;
            });
        } else {
            var row = self.selection.getAll({
                'datasetName': self.datasetName,
                'dimension': 'row'
            }, function (response) {
                self.setSelections('row', response.selections);
                return response.selections;
            });
            return row.$promnise.then(function () {
                self.selection.getAll({
                    'datasetName': self.datasetName,
                    'dimension': 'column'
                }, function (response) {
                    self.setSelections('column', response.selections);
                    return response.selections;
                });
            });
        }
        ;
    };
});
/*mev-dataset@0.0.1#src/main/dataset/Dataset*/
'use strict';
define('mev-dataset@0.0.1#src/main/dataset/Dataset', [
    'mui',
    './lib/DatasetClass',
    './lib/loadAnalyses',
    './lib/setSelections',
    './lib/resetSelections'
], function (angular, DatasetClass, loadAnalyses, setSelections, resetSelections) {
    return angular.module('Mev.DatasetMock', []).factory('DatasetFactory', [
        '$q',
        '$http',
        '$rootScope',
        function ($q, $http, $rootScope, AnalysisResourceService, SelectionResourceService, analysisEventBus, DashboardItems) {
            return function (datasetName, datasetResponseObj) {
                var dataset = new DatasetClass(datasetName, datasetResponseObj, $http, $rootScope);
                dataset.analysis = AnalysisResourceService;
                console.debug('api:AnalysisResourceService', AnalysisResourceService, dataset.analysis);
                dataset.selection = SelectionResourceService;
                dataset.$q = $q;
                dataset.analysisEventBus = analysisEventBus;
                dataset.loadAnalyses = loadAnalyses;
                dataset.setSelections = setSelections;
                dataset.resetSelections = resetSelections;
                dataset.getAnnotations = function (dimension) {
                    if (!this._annotations)
                        this._annotations = {
                            row: {
                                getFields: function () {
                                    return [];
                                }
                            },
                            column: {
                                getFields: function () {
                                    return [];
                                }
                            }
                        };
                    return this._annotations[dimension];
                };
                return dataset;
            };
        }
    ]);
});
/*mev-dataset@0.0.1#src/main/endpoint/rest/DatasetRest*/
define('mev-dataset@0.0.1#src/main/endpoint/rest/DatasetRest', ['lodash'], function (_) {
    var DatasetRest = function ($resource, $q, $http, $rootScope, mevDb) {
        var resource = $resource('/dataset/:datasetName/data', { format: 'json' }, {
            'get': { method: 'GET' },
            'getAll': {
                url: '/dataset',
                method: 'GET',
                isArray: true
            },
            'subset': {
                url: '/dataset/:datasetName/data/subset/export',
                method: 'POST'
            },
            'delete': {
                url: '/dataset/:datasetName',
                method: 'DELETE'
            }
        });
        var DatasetResource = Object.create(resource);
        DatasetResource.get = function (params, data, callback) {
            var deferred = $q.defer();
            var cache = {
                $promise: deferred.promise,
                $resolved: false
            };
            var cachePromise = mevDb.getDataset(params.datasetName).catch(function (e) {
                if (e.status === 404 || e.status === 501) {
                    _.assign(cache, resource.get(params, data, callback));
                    return cache.$promise.then(function (response) {
                        mevDb.putDataset(_.assign(response, { id: params.datasetName }));
                        return response;
                    });
                }
            }).then(function (response) {
                return deferred.resolve(_.extend(response, { $promise: cache.$promise }));
            });
            return cache;
        };
        DatasetResource.getAll = function (params, data, callback) {
            var datasetsResource = resource.getAll(params, data, callback);
            datasetsResource.$promise.then(function (response) {
                $rootScope.$broadcast('mev:datasets:list:refreshed', response);
            });
            return datasetsResource;
        };
        DatasetResource.subset = function (params, data, callback) {
            data.name = params.datasetName + '--' + data.name;
            var datasetsResource = resource.subset(params, data, callback);
            datasetsResource.$promise.then(function (response) {
                $http({
                    method: 'POST',
                    url: '/annotations/' + params.datasetName + '/annotation/row' + '/export?destId=' + data.name
                });
                $http({
                    method: 'POST',
                    url: '/annotations/' + params.datasetName + '/annotation/column' + '/export?destId=' + data.name
                });
                DatasetResource.getAll();
            });
            return datasetsResource;
        };
        DatasetResource.uploadFile = function (file, cbProgress, cbCompleted) {
            var formdata = new FormData();
            formdata.append('upload', file);
            formdata.append('name', file.name);
            var xhr = new XMLHttpRequest();
            if (cbProgress)
                xhr.upload.onprogress = function (event) {
                    console.debug('upload', event);
                    if (event.lengthComputable)
                        cbProgress(Math.floor(event.loaded / event.total * 100), event);
                };
            xhr.onreadystatechange = function () {
                console.debug('xhr', xhr);
                if (xhr.readyState == 4 && xhr.status == 200) {
                    $rootScope.$apply($rootScope.$broadcast.bind($rootScope, 'mev:dataset:uploaded', file));
                    if (cbCompleted)
                        cbCompleted();
                    DatasetResource.getAll();
                }
                ;
            };
            xhr.open('POST', '/dataset', true);
            xhr.send(formdata);
            $rootScope.$apply($rootScope.$broadcast.bind($rootScope, 'mev:dataset:upload:started', file));
        };
        DatasetResource.activate = function (dataset) {
            return mevDb.getDataset(dataset.id).then(function (dataset) {
                return mevDb.getDatasetValues64(dataset.id).then(function (values) {
                    var formdata = new FormData();
                    formdata.append('name', dataset.id);
                    formdata.append('rows', dataset.row.keys);
                    formdata.append('rowSelections', JSON.stringify(dataset.row.selections));
                    formdata.append('columns', dataset.column.keys);
                    formdata.append('columnSelections', JSON.stringify(dataset.column.selections));
                    formdata.append('upload', values);
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function (e) {
                        return;
                    });
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            $rootScope.$broadcast('mev:dataset:activated', dataset);
                            DatasetResource.getAll();
                        }
                        ;
                    };
                    xhr.open('POST', '/import/binary', true);
                    xhr.send(formdata);
                });
            });
        };
        function formatDatasetName(name) {
            return _.endsWith(name, '.zip') ? name.substring(0, name.length - 4) : name;
        }
        DatasetResource.importZip = function (file, cbProgress, cbCompleted) {
            return mevDb.deleteDataset(formatDatasetName(file.name)).then(function () {
                var formdata = new FormData();
                formdata.append('upload', file);
                formdata.append('name', file.name);
                var xhr = new XMLHttpRequest();
                if (cbProgress)
                    xhr.upload.onprogress = function (event) {
                        console.debug('upload', event);
                        if (event.lengthComputable)
                            cbProgress(Math.floor(event.loaded / event.total * 100), event);
                    };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        $rootScope.$apply($rootScope.$broadcast.bind($rootScope, 'mev:dataset:imported', file));
                        if (cbCompleted)
                            cbCompleted();
                        DatasetResource.getAll();
                    }
                    ;
                };
                xhr.open('POST', '/import/zip', true);
                xhr.send(formdata);
                $rootScope.$apply($rootScope.$broadcast.bind($rootScope, 'mev:dataset:import:started', file));
            });
        };
        DatasetResource.export = function (dataset) {
            return mevDb.getDataset(dataset.id).then(function (dataset) {
                return mevDb.getAnalysesAll(dataset.id).then(function (analyses) {
                    var formdata = new FormData();
                    formdata.append('name', dataset.id);
                    formdata.append('rows', dataset.row.keys);
                    formdata.append('rowSelections', JSON.stringify(dataset.row.selections));
                    formdata.append('columns', dataset.column.keys);
                    formdata.append('columnSelections', JSON.stringify(dataset.column.selections));
                    analyses.forEach(function (analysis) {
                        formdata.append('analyses', JSON.stringify(analysis));
                    });
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function (e) {
                        return;
                    });
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            $rootScope.$broadcast('mev:dataset:exported', dataset);
                            var blob = new Blob([xhr.response], { type: 'octet/stream' });
                            var fileName = dataset.id + '.zip';
                            saveAs(blob, fileName);
                        }
                        ;
                    };
                    xhr.open('POST', '/export/zip', true);
                    xhr.responseType = 'arraybuffer';
                    xhr.setRequestHeader('Accept', 'application/octet-stream');
                    xhr.send(formdata);
                });
            });
        };
        DatasetResource.delete = function (params, data, callback) {
            var datasetsResource = resource.delete(params, data, callback);
            datasetsResource.$promise.then(function (response) {
                DatasetResource.getAll();
            }).catch(function (e) {
                throw e;
            });
            return datasetsResource;
        };
        return DatasetResource;
    };
    DatasetRest.$inject = [
        '$resource',
        '$q',
        '$http',
        '$rootScope',
        'mevDb'
    ];
    DatasetRest.$name = 'mevDatasetRest';
    DatasetRest.$provider = 'service';
    return DatasetRest;
});
/*mev-dataset@0.0.1#src/main/endpoint/rest/SelectionRest*/
define('mev-dataset@0.0.1#src/main/endpoint/rest/SelectionRest', ['lodash'], function (_) {
    var SelectionRest = function ($resource, $routeParams, $http, datasetResource, $rootScope, $q, mevWorkspace, mevDb) {
        var resource = $resource('/dataset/:datasetName/:dimension/selection', { 'format': 'json' }, {
            'getAll': {
                'url': '/dataset/:datasetName/:dimension/selections',
                'method': 'GET'
            },
            'get': {
                'method': 'GET',
                'url': '/dataset/:datasetName/:dimension/selection/:selectionName'
            },
            'post': {
                'method': 'POST',
                'url': '/dataset/:datasetName/:dimension/selection/'
            },
            'put': {
                'method': 'PUT',
                'url': '/dataset/:datasetName/:dimension/selection/'
            },
            'export': {
                'method': 'POST',
                'url': '/dataset/:datasetName/:dimension/selection/export'
            },
            'delete': {
                'method': 'DELETE',
                'url': '/dataset/:datasetName/:dimension/selection/:selectionName'
            }
        });
        var SelectionResource = Object.create(resource);
        SelectionResource.post = function (params, data, callback) {
            var result = resource.post(params, data, callback);
            result.$promise.then(function (response) {
                $rootScope.$broadcast('mui:dataset:selections:added', params.dimension, params, data, response);
            });
            return result;
        };
        SelectionResource.put = function (params, data, callback) {
            var result = resource.put(params, data, callback);
            result.$promise.then(function (response) {
                $rootScope.$broadcast('mui:dataset:selections:added', params.dimension, params, data, response);
            });
            return result;
        };
        SelectionResource.getAll = function (params, callback) {
            var deferred = $q.defer();
            var cache = {
                $promise: deferred.promise,
                $resolved: false
            };
            mevWorkspace.getDataset(params.datasetName).then(function (dataset) {
                if (dataset && dataset.isActive) {
                    return resource.getAll(params).$promise.then(function (response) {
                        return response.selections.map(function (selection) {
                            selection.type = params.dimension;
                            return selection;
                        });
                    });
                } else {
                    return [];
                }
            }).then(function (remote) {
                return mevDb.getDataset(params.datasetName).catch(function (e) {
                    if (e.status === 501)
                        return undefined;
                    else
                        throw e;
                }).then(function (dataset) {
                    var remoteAndLocal = dataset ? _.unionBy(remote, dataset[params.dimension].selections, function (selection) {
                        return selection.name;
                    }) : remote;
                    if (callback)
                        callback({ selections: remoteAndLocal });
                    deferred.resolve(remoteAndLocal);
                    return remoteAndLocal;
                });
            }).catch(function (e) {
                console.error('Error fetching selection list: ', params, e);
                deferred.reject(e);
                throw e;
            });
            return cache;
        };
        SelectionResource.export = function (params, data, callback) {
            data.name = params.datasetName + '--' + data.name;
            var result = resource.export(params, data, callback);
            result.$promise.then(function (response) {
                $http({
                    method: 'POST',
                    url: '/annotations/' + params.datasetName + '/annotation/row' + '/export?destId=' + data.name
                });
                $http({
                    method: 'POST',
                    url: '/annotations/' + params.datasetName + '/annotation/column' + '/export?destId=' + data.name
                });
                datasetResource.getAll();
            });
        };
        SelectionResource.delete = function (params, data, callback) {
            var deferred = $q.defer();
            var cache = {
                $promise: deferred.promise,
                $resolved: false
            };
            mevWorkspace.getDataset(params.datasetName).then(function (dataset) {
                if (dataset && dataset.isActive) {
                    return resource.delete(params, data, callback).$promise.then(function (response) {
                        return response;
                    }).catch(function (e) {
                        if (e.status === 404)
                            return e;
                        else
                            throw e;
                    });
                } else {
                    return { status: 200 };
                }
            }).then(function (remote) {
                if (remote.status && (remote.status === 200 || remote.status === 404))
                    return mevDb.getDataset(params.datasetName).then(function (dataset) {
                        _.remove(dataset[params.dimension].selections, function (selection) {
                            return selection.name === params.selectionName;
                        });
                        return mevDb.putDataset(dataset).then(function (local) {
                            if (callback)
                                callback(remote);
                            deferred.resolve(remote);
                            return remote;
                        });
                    });
                else {
                    throw new Error('Failed to delete selection');
                }
            }).then(function (response) {
                $rootScope.$broadcast('mui:dataset:selections:deleted', params.dimension, params, response);
            }).catch(function (e) {
                console.error('Error fetching selection list: ', params, e);
                deferred.reject(e);
                throw e;
            });
            return cache;
        };
        return SelectionResource;
    };
    SelectionRest.$inject = [
        '$resource',
        '$routeParams',
        '$http',
        'mevDatasetRest',
        '$rootScope',
        '$q',
        'mevWorkspace',
        'mevDb'
    ];
    SelectionRest.$name = 'mevSelectionRest';
    SelectionRest.$provider = 'service';
    return SelectionRest;
});
/*mev-dataset@0.0.1#src/main/mev-dataset*/
define('mev-dataset@0.0.1#src/main/mev-dataset', [
    'mui',
    'angular-resource',
    './dataset/Dataset',
    './endpoint/rest/DatasetRest',
    './endpoint/rest/SelectionRest'
], function (ng) {
    'use strict';
    return ng.module('mevDataset', arguments, arguments);
});
/*mev-annotations@0.0.1#src/main/endpoint/AnnotationProjectIdResource*/
define('mev-annotations@0.0.1#src/main/endpoint/AnnotationProjectIdResource', ['mui'], function () {
    function component($resource, $stateParams) {
        url = '/annotations/:datasetName/annotation/:dimension/get-project-id';
        var AnnotationProjectIdResource = $resource(url, { format: 'json' });
        this.get = function (dimension, datasetId) {
            return AnnotationProjectIdResource.get({
                datasetName: $stateParams.datasetId || datasetId,
                dimension: dimension || 'column'
            }).$promise;
        };
    }
    component.$name = 'AnnotationProjectIdResource';
    component.$inject = [
        '$resource',
        '$stateParams'
    ];
    component.$provider = 'service';
    return component;
});
/*mev-annotations@0.0.1#src/main/endpoint/AnnotationFieldsResource*/
define('mev-annotations@0.0.1#src/main/endpoint/AnnotationFieldsResource', ['mui'], function () {
    function component($q, $resource, $stateParams, AnnotationProjectIdResource) {
        var _self = this;
        var url = '/annotations/:datasetName/annotation/:dimension/new/dataset/command/core/get-columns-info';
        this.AnnotationFieldsResource = $resource(url, { datasetName: $stateParams.datasetId }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
        this.get = function (dimension) {
            return AnnotationProjectIdResource.get(dimension).then(function (data) {
                if (data.project <= 0)
                    return $q.when({ error: -1 });
                else
                    data.datasetName = $stateParams.datasetId;
                data.dimension = dimension;
                var fieldsPromise = _self.AnnotationFieldsResource.get(data).$promise;
                fieldsPromise.params = data;
                return fieldsPromise;
            });
        };
    }
    component.$name = 'AnnotationFieldsResource';
    component.$inject = [
        '$q',
        '$resource',
        '$stateParams',
        'AnnotationProjectIdResource'
    ];
    component.$provider = 'service';
    return component;
});
/*mev-annotations@0.0.1#src/main/endpoint/AnnotationValuesResource*/
define('mev-annotations@0.0.1#src/main/endpoint/AnnotationValuesResource', ['mui'], function () {
    function component($q, $resource, $stateParams, AnnotationProjectIdResource) {
        var _self = this;
        var url = '/annotations/:datasetName/annotation/:dimension/new/dataset/command/core/get-rows';
        this.AnnotationValuesResource = $resource(url, {
            datasetName: $stateParams.datasetId,
            limit: 30000
        });
        this.get = function (dimension) {
            return AnnotationProjectIdResource.get(dimension).then(function (data) {
                if (data.project <= 0)
                    return $q.when({ error: 'OpenRefine - project not found' });
                else
                    data.datasetName = $stateParams.datasetId;
                data.dimension = dimension;
                return _self.AnnotationValuesResource.get(data).$promise;
            });
        };
    }
    component.$name = 'AnnotationValuesResource';
    component.$inject = [
        '$q',
        '$resource',
        '$stateParams',
        'AnnotationProjectIdResource'
    ];
    component.$provider = 'service';
    return component;
});
/*mev-annotations@0.0.1#src/main/endpoint/AnnotationExportResource*/
define('mev-annotations@0.0.1#src/main/endpoint/AnnotationExportResource', ['lodash'], function (_) {
    'use strict';
    var component = function ($http, $q, $stateParams, AnnotationProjectIdResource) {
        function AnnotationNotFoundOnServerError() {
            var temp = Error.apply(this, arguments);
            temp.name = this.name = 'AnnotationNotFoundOnServer';
            this.stack = temp.stack;
            this.message = temp.message;
        }
        AnnotationNotFoundOnServerError.prototype = Object.create(Error.prototype, {
            constructor: {
                value: AnnotationNotFoundOnServerError,
                writable: true,
                configurable: true
            }
        });
        var source = {
            export: function (datasetId, dimension) {
                datasetId = $stateParams.datasetId || datasetId;
                var url = '/annotations/' + datasetId + '/annotation/' + dimension + '/new/dataset/command/core/export-project/' + datasetId + '.google-refine.tar.gz';
                return AnnotationProjectIdResource.get(dimension, datasetId).then(function (response) {
                    if (response.project <= 0) {
                        throw new AnnotationNotFoundOnServerError('Could not find ' + dimension + ' annotations for dataset ' + datasetId + ' at ' + url);
                    }
                    return $http.post(url, {}, {
                        params: { project: response.project },
                        responseType: 'arraybuffer',
                        headers: { 'Accept': 'application/x-gzip' }
                    });
                });
            },
            import: function (datasetId, dimension, data) {
                var deferred = $q.defer();
                var url = '/annotations/' + datasetId + '/annotation/' + dimension + '/import';
                var formdata = new FormData();
                formdata.append('upload', data);
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function (e) {
                    return;
                });
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200)
                            deferred.resolve(200);
                        else
                            deferred.reject(xhr.status);
                    }
                    ;
                };
                xhr.open('POST', url, true);
                xhr.send(formdata);
                return deferred.promise;
            }
        };
        _.assign(this, source);
    };
    component.$name = 'AnnotationExportResource';
    component.$provider = 'service';
    component.$inject = [
        '$http',
        '$q',
        '$stateParams',
        'AnnotationProjectIdResource'
    ];
    return component;
});
/*mev-annotations@0.0.1#src/main/model/AnnotationRepository*/
define('mev-annotations@0.0.1#src/main/model/AnnotationRepository', [], function () {
    'use strict';
    var AnnotationRepository = function ($rootScope, $q, AnnotationFieldsResource, AnnotationValuesResource, AnnotationProjectIdResource, AnnotationExportResource, mevDb) {
        return function (dimension) {
            var _self = this;
            var _projectId = false;
            var _fieldNameToIndexMap = {};
            var _columns;
            var _fieldsPromise;
            var _valuesPromise;
            var _initPromise;
            var _dimension = dimension;
            function _createFieldNameToIndexMap(columns) {
                _columns = columns;
                for (var i = 0; i < columns.length; i++) {
                    _fieldNameToIndexMap[columns[i].name] = i;
                    columns[i].idx = i;
                }
                console.debug('AnnotationRepository', _fieldNameToIndexMap);
                return columns;
            }
            function _isOld() {
                return AnnotationProjectIdResource.get(dimension).then(function (data) {
                    if (_projectId && _projectId !== data.project) {
                        return true;
                    } else if (!_projectId) {
                        _projectId = data.project;
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            _self.loadAnnotations = function (reload) {
                if (_initPromise && !reload)
                    return _initPromise;
                _fieldsPromise = AnnotationFieldsResource.get(dimension);
                _valuesPromise = AnnotationValuesResource.get(dimension);
                _initPromise = $q.all({
                    columns: _fieldsPromise,
                    rows: _valuesPromise
                });
                _fieldsPromise.then(_createFieldNameToIndexMap);
                return _initPromise;
            };
            _self.saveAnnotations = function (project, dimension) {
                var datasetId = project.metadata.customMetadata.datasetName;
                dimension = dimension || _dimension || (project.metadata.customMetadata.dimension ? project.metadata.customMetadata.dimension.toLowerCase() : undefined);
                console.debug('loaded column annotations', project, datasetId, dimension);
                return _self.export(datasetId, dimension).then(function (blob) {
                    return mevDb.putAnnotations(datasetId, dimension, blob);
                });
            };
            $rootScope.$on('openRefine:loadedAnnotations:row', function (event, project) {
                console.debug('loaded row annotations', project);
                return _self.saveAnnotations(project);
            });
            $rootScope.$on('openRefine:loadedAnnotations:column', function (event, project) {
                console.debug('loaded column annotations', project);
                return _self.saveAnnotations(project);
            });
            _self.getFields = function () {
                return _isOld().then(function (isOld) {
                    if (isOld) {
                        _self.loadAnnotations(true);
                    }
                    return _fieldsPromise.then(function () {
                        return _columns;
                    });
                });
            };
            _self.getDataKeyVal = function (fields) {
                return _self.loadAnnotations().then(function (data) {
                    var results = [];
                    if (typeof data.columns.error != 'undefined' || typeof data.rows.error != 'undefined')
                        return results;
                    for (var irow = 0; irow < data.rows.rows.length; irow++) {
                        var curRow = data.rows.rows[irow];
                        var rowValues = curRow.cells;
                        for (var ifield = 0; ifield < fields.length; ifield++) {
                            var curFieldName = fields[ifield];
                            var curFieldIndex = _fieldNameToIndexMap[curFieldName];
                            if (typeof curFieldIndex != 'undefined') {
                                results.push({
                                    columnId: curFieldName,
                                    key: rowValues[0].v,
                                    value: rowValues[curFieldIndex].v
                                });
                            }
                        }
                    }
                    return results;
                });
            };
            _self.getDataTable = function (fields) {
                return _self.loadAnnotations().then(function (data) {
                    var results = [];
                    if (typeof data.columns.error != 'undefined' || typeof data.rows.error != 'undefined')
                        return results;
                    var keyColumn = data.columns.find(function (column) {
                        return column.name.toLowerCase() === 'sampleid' || column.name.toLowerCase() === 'id' || column.name.toLowerCase() === 'mevid';
                    });
                    var keyIdx = keyColumn ? keyColumn.idx : 0;
                    for (var irow = 0; irow < data.rows.rows.length; irow++) {
                        var curRow = data.rows.rows[irow];
                        var rowValues = curRow.cells;
                        var row = { key: rowValues[keyIdx].v };
                        for (var ifield = 0; ifield < fields.length; ifield++) {
                            var curFieldName = fields[ifield];
                            var curFieldIndex = _fieldNameToIndexMap[curFieldName];
                            if (typeof curFieldIndex != 'undefined') {
                                row[curFieldName] = rowValues[curFieldIndex].v;
                            }
                        }
                        results.push(row);
                    }
                    return results;
                });
            };
            _self.getMapping = function (field, key) {
                return _self.loadAnnotations().then(function (data) {
                    var fromIndex = key ? _fieldNameToIndexMap[key] : _fieldNameToIndexMap['probeset_id'] ? _fieldNameToIndexMap['probeset_id'] : 6;
                    var toIndex = _fieldNameToIndexMap[field];
                    var map = {};
                    if (typeof data.columns.error != 'undefined')
                        throw new Error('Error in AnnotationRepository columns:' + data.columns.error);
                    else if (typeof data.rows.error != 'undefined')
                        throw new Error('Error in AnnotationRepository rows:' + data.rows.error);
                    for (var irow = 0; irow < data.rows.rows.length; irow++) {
                        var curRow = data.rows.rows[irow];
                        var rowValues = curRow.cells;
                        if (rowValues[fromIndex])
                            map[rowValues[fromIndex].v] = rowValues[toIndex].v;
                    }
                    return map;
                });
            };
            _self.export = function (datasetId, dimension) {
                return AnnotationExportResource.export(datasetId, dimension).then(function (response) {
                    console.debug(response);
                    return new Blob([response.data], { type: 'application/x-gzip' });
                }).catch(function (e) {
                    throw e;
                });
            };
            _self.import = function (datasetId, dimension) {
                mevDb.getAnnotations(datasetId, dimension).then(function (blob) {
                    return AnnotationExportResource.import(datasetId, dimension, blob);
                }).catch(function (e) {
                    console.error('Error importing annotatinos', datasetId, dimension);
                    throw e;
                });
            };
        };
    };
    AnnotationRepository.$name = 'mevAnnotationRepository';
    AnnotationRepository.$inject = [
        '$rootScope',
        '$q',
        'AnnotationFieldsResource',
        'AnnotationValuesResource',
        'AnnotationProjectIdResource',
        'AnnotationExportResource',
        'mevDb'
    ];
    AnnotationRepository.$provider = 'factory';
    return AnnotationRepository;
});
/*mev-annotations@0.0.1#src/main/utils/OpenRefineBridge*/
define('mev-annotations@0.0.1#src/main/utils/OpenRefineBridge', [
    'jquery',
    'angular'
], function (jquery, angular) {
    OpenRefineBridge = {
        addSelectionSet: function (selection) {
            console.debug('in addSelectionSet');
            console.debug('selection', selection);
            var elm = document.querySelector('#selectionSetMgr');
            var selectionSetMgrDOM = angular.element(elm);
            var rootScope = angular.element(document).scope();
            if (rootScope.$state) {
                rootScope.$state.go('^.' + selection.dimension.toLowerCase() + 'Set', { setId: selection.name });
            }
            var selectionSetManagerScope = selectionSetMgrDOM.scope();
            console.debug('selectionSetManagerScope:', selectionSetManagerScope);
            if (selectionSetManagerScope) {
                selectionSetManagerScope.addItem(selection);
            } else {
                rootScope.$broadcast('mui:dataset:selections:added', selection.dimension.toLowerCase(), selection);
            }
        },
        loadedProject: function (theProject) {
            var rootScope = angular.element(document).scope();
            ;
            console.debug('loadedProject', theProject);
            if (theProject.metadata.customMetadata.dimension === 'COLUMN')
                rootScope.$broadcast('openRefine:loadedAnnotations:column', theProject);
            else if (theProject.metadata.customMetadata.dimension === 'ROW')
                rootScope.$broadcast('openRefine:loadedAnnotations:row', theProject);
            else
                rootScope.$broadcast('openRefine:loadedAnnotations', theProject);
        },
        openDataset: function (dataset) {
            console.debug('in openDataset');
            console.debug('dataset:' + angular.toJson(dataset));
            jquery('#import-presets-modal').modal('hide');
            jquery('div.modal-backdrop').hide();
            var rootScope = angular.element(document).scope();
            if (rootScope.$state) {
                rootScope.$state.go('root.dataset.home', { datasetId: dataset.name });
                return;
            }
            var datasetUrl = '/#/dataset/' + dataset.name + '/';
            window.location.replace(datasetUrl);
        },
        showPresetList: function () {
            var elm = document.querySelector('#presetMgr');
            var presetMgrDOM = angular.element(elm);
            var presetManagerScope = presetMgrDOM.scope();
            var presetManagerController = presetMgrDOM.controller();
            console.debug('presetManagerScope:' + angular.toJson(presetManagerScope));
            console.debug('presetManagerScope.orderByColumn:' + presetManagerScope.orderByColumn);
            console.debug('presetManagerController.orderByColumn:' + presetManagerController.orderByColumn);
            presetManagerScope.showPresetList();
            presetManagerScope.$apply();
        }
    };
    return OpenRefineBridge;
});
/*mev-annotations@0.0.1#src/main/mevAnnotations.module*/
define('mev-annotations@0.0.1#src/main/mevAnnotations.module', [
    'mui',
    './endpoint/AnnotationProjectIdResource',
    './endpoint/AnnotationFieldsResource',
    './endpoint/AnnotationValuesResource',
    './endpoint/AnnotationExportResource',
    './model/AnnotationRepository',
    './utils/OpenRefineBridge'
], function (ng) {
    'use strict';
    return ng.module('mevAnnotations', arguments, arguments);
});
/*mev-workspace@0.0.1#src/main/model/Workspace*/
define('mev-workspace@0.0.1#src/main/model/Workspace', ['lodash'], function (_) {
    'use strict';
    var service = function ($http, $q, mevDb, DatasetResource) {
        function getDatasets() {
            var localDbsPromise = mevDb.getDatasets().then(function (dbs) {
                return dbs;
            }).catch(function (err) {
                throw err;
            });
            var remoteDbsPromise = $http({
                method: 'GET',
                url: '/dataset',
                params: { format: 'json' }
            }).then(function (remoteDbs, status, headers, config) {
                return remoteDbs.data;
            });
            var allDbsPromise = $q.all([
                localDbsPromise,
                remoteDbsPromise
            ]).then(function (dbs) {
                var local = dbs[0];
                var remote = dbs[1];
                console.debug('workspace local', local);
                console.debug('workspace remote', remote);
                var active = remote.map(function (name) {
                    return {
                        id: name,
                        name: name,
                        isActive: true,
                        getStatus: mevDb.getStatus.bind(mevDb, name)
                    };
                });
                var inactive = _.difference(local, remote).map(function (name) {
                    return {
                        id: name,
                        name: name,
                        isActive: false,
                        getStatus: mevDb.getStatus.bind(mevDb, name)
                    };
                });
                return _.concat(active, inactive);
            }).catch(function (e) {
                throw e;
            });
            return allDbsPromise;
        }
        function activateDataset(datasetId) {
        }
        function getActiveDatasets() {
            return getDatasets().then(function (datasets) {
                return datasets.filter(function (dataset) {
                    return dataset.isActive;
                });
            });
        }
        function getInactiveDatasets() {
            return getDatasets().then(function (datasets) {
                return datasets.filter(function (dataset) {
                    return !dataset.isActive;
                });
            });
        }
        function activateDataset(dataset) {
            return DatasetResource.activate(dataset);
        }
        function exportDataset(dataset) {
            return DatasetResource.export(dataset);
        }
        function deleteDataset(datasetId) {
            return mevDb.deleteDataset(datasetId);
        }
        function getDataset(datasetId) {
            return getDatasets().then(function (datasets) {
                return datasets.find(function (dataset) {
                    return dataset.id === datasetId;
                });
            });
        }
        function deactivate(datasetId) {
            return DatasetResource.delete({ datasetName: datasetId }).$promise;
        }
        function saveEmail(email) {
        }
        this.getDatasets = getDatasets;
        this.getActiveDatasets = getActiveDatasets;
        this.getInactiveDatasets = getInactiveDatasets;
        this.activateDataset = activateDataset;
        this.deleteDataset = deleteDataset;
        this.getDataset = getDataset;
        this.exportDataset = exportDataset;
        this.deactivate = deactivate;
        this.saveEmail = saveEmail;
    };
    service.$inject = [
        '$http',
        '$q',
        'mevDb',
        'mevDatasetRest'
    ];
    service.$name = 'mevWorkspace';
    service.$provider = 'service';
    return service;
});
/*mev-workspace@0.0.1#src/main/router/WorkspaceState*/
define('mev-workspace@0.0.1#src/main/router/WorkspaceState', [], function () {
    var config = function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
        $stateProvider.state('root.datasets.workspace', {
            url: '/workspace',
            parent: 'root.datasets',
            displayName: false,
            views: { 'workspace@root.datasets': { template: '<div mev-workspace-list></div>' } },
            sticky: true
        });
        ;
    };
    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];
    config.$provider = 'config';
    return config;
});
/*mev-workspace@0.0.1#src/main/router/WorkspaceStateInit*/
define('mev-workspace@0.0.1#src/main/router/WorkspaceStateInit', [], function () {
    'use strict';
    var run = function ($rootScope, $state, $stickyState, $q, $urlRouter) {
        $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
            var inactive = $stickyState.getInactiveStates();
            if (!inactive.find(function (state) {
                    return state.name === 'root.datasets.workspace';
                }) && $state.includes('root.datasets') && toState.name !== 'root.datasets.workspace' && fromState.name !== 'root.datasets.workspace') {
                $state.go('root.datasets.workspace', undefined, { location: false }).then(function () {
                    $state.go(toState, toParams);
                });
            }
        });
        var preloadStates = $state.get().filter(function (state) {
            return state.preload;
        });
        var initialPromise = $q.when();
        var preloadPromise = preloadStates.reduce(function (prevPromise, preloadState) {
            return prevPromise.then(function () {
                return $state.go(preloadState, undefined, { location: false });
            });
        }, initialPromise);
        preloadPromise.then(function () {
            $urlRouter.listen();
        });
    };
    run.$inject = [
        '$rootScope',
        '$state',
        '$stickyState',
        '$q',
        '$urlRouter'
    ];
    run.$provider = 'run';
    return run;
});
/*mev-workspace@0.0.1#src/main/view/list/WorkspaceList.tpl.html!system-text@0.1.0#text*/
define('mev-workspace@0.0.1#src/main/view/list/WorkspaceList.tpl.html!system-text@0.1.0#text', function (require, exports, module) {
    module.exports = '<table class="table table-hover table-condensed">\n    <thead>\n    <tr>\n        <th>Your datasets</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-show="datasetsByStatus.active.length>0" ng-repeat="row in datasetsByStatus.active">\n        <!--  <td><a href="#/dataset/{{row}}"> <i class="icon-file"></i> {{row}}</a></td> -->\n        <td>\n            <a href="#/dataset/{{row}}" ui-sref="root.dataset.home({datasetId: row.id})">\n                <i class="icon-file"></i> {{row.id}}\n            </a>\n            <a href="" ng-click="vm.export(row)" title="download zip" class="btn btn-xs">\n                <i ng-class="{\'fa fa-file-archive-o\': !vm.getExportStatus(row.id), \'fa fa-spinner fa-spin\': vm.getExportStatus(row.id)}"></i>\n            </a>\n            <a href="" ng-click="vm.deactivate(row.id)" title="deactivate" class="btn btn-xs">\n                <i class="fa fa-close"></i>\n            </a>\n            &nbsp;\n            <span class="pull-right">\n                <i ng-show="vm.isSaved(row)" class="fa fa-check-circle"></i>\n                <i ng-hide="vm.isSaved(row)" class="fa fa-spinner fa-spin"></i>\n            </span>\n        </td>\n    <tr>\n    <tr ng-show="datasetsByStatus.active.length<=0">\n    <td><a ui-sref="root.datasets.imports.upload">Upload</a> your data file (tsv)\n        or import a curated <a ui-sref="root.datasets.imports.tcga">TCGA</a>\n        or <a ui-sref="root.datasets.imports.geods">GEO</a> dataset</td>\n    <tr>\n    </tbody>\n</table>\n<table ng-show="datasetsByStatus.inactive.length>0" class="table table-hover table-condensed">\n    <thead>\n    <tr>\n        <th>Offline datasets</th>\n    </tr>\n    </thead>\n    <tbody>\n    <tr ng-repeat="row in datasetsByStatus.inactive">\n        <!--  <td><a href="#/dataset/{{row}}"> <i class="icon-file"></i> {{row}}</a></td> -->\n        <td >\n            <span>{{row.id}}</span>\n            <a href="" ng-click="vm.activate(row)" title="activate" class="btn btn-xs">\n                <i ng-hide="row.status===\'activating\'" class="glyphicon glyphicon-cloud-upload"></i>\n                <i ng-show="row.status===\'activating\'" class="fa fa-spinner fa-spin"></i>\n            </a>\n            <a href="#/dataset/{{row}}" ui-sref="root.dataset.home({datasetId: row.id})" title="view readonly" class="btn btn-xs">\n                <i class="glyphicon glyphicon-eye-open"></i>\n            </a>\n            <a href="" ng-click="vm.delete(row.id)" title="delete" class="btn btn-xs">\n                <i class="fa fa-close"></i>\n            </a>\n        </td>\n    <tr>\n    </tbody>\n</table>';
});
/*mev-workspace@0.0.1#src/main/view/list/WorkspaceListDirective*/
define('mev-workspace@0.0.1#src/main/view/list/WorkspaceListDirective', [
    './WorkspaceList.tpl.html',
    './WorkspaceList.less'
], function (tempalte) {
    var directive = function (mevWorkspace, mevAnnotationRepository, $timeout) {
        return {
            restrict: 'EAC',
            template: tempalte,
            scope: {},
            link: function (scope, elm, attr, ctrl) {
                function updateDatasetList() {
                    mevWorkspace.getDatasets().then(function (datasets) {
                        scope.datasets = datasets;
                        scope.datasetsByStatus = {
                            active: scope.datasets.filter(function (dataset) {
                                return dataset.isActive;
                            }),
                            inactive: scope.datasets.filter(function (dataset) {
                                return !dataset.isActive;
                            })
                        };
                    });
                }
                scope.vm = {
                    activate: function (dataset) {
                        dataset.status = 'activating';
                        mevWorkspace.activateDataset(dataset);
                    },
                    delete: function (datasetId) {
                        if (confirm('Delete dataset \'' + datasetId + '\'?'))
                            return mevWorkspace.deleteDataset(datasetId).then(updateDatasetList);
                    },
                    deactivate: function (datasetId) {
                        if (confirm('Deactivate dataset \'' + datasetId + '\'?'))
                            return mevWorkspace.deactivate(datasetId).then(updateDatasetList);
                    },
                    showStatus: function (row) {
                        var status = row.getStatus();
                        return status;
                    },
                    isSaved: function (row) {
                        return row.getStatus() === 'saved';
                    },
                    export: function (dataset) {
                        this.exportStatus[dataset.id] = true;
                        mevWorkspace.exportDataset(dataset);
                    },
                    exportStatus: {},
                    getExportStatus: function (datasetId) {
                        return this.exportStatus[datasetId];
                    }
                };
                scope.$on('mev:datasets:list:refreshed', function () {
                    updateDatasetList();
                });
                updateDatasetList();
                scope.$on('mev:dataset:activated', function (event, dataset) {
                    dataset.status = 'active';
                    var row = new mevAnnotationRepository('row');
                    row.import(dataset.id, 'row');
                    var column = new mevAnnotationRepository('column');
                    column.import(dataset.id, 'column');
                });
                scope.$on('mev:dataset:exported', function (event, dataset) {
                    $timeout(function () {
                        scope.vm.exportStatus[dataset.id] = false;
                    });
                });
            }
        };
    };
    directive.$name = 'mevWorkspaceList';
    directive.$provider = 'directive';
    directive.$inject = [
        'mevWorkspace',
        'mevAnnotationRepository',
        '$timeout'
    ];
    return directive;
});
/*mev-workspace@0.0.1#src/main/view/upload/UploadDataset.tpl.html!system-text@0.1.0#text*/
define('mev-workspace@0.0.1#src/main/view/upload/UploadDataset.tpl.html!system-text@0.1.0#text', function (require, exports, module) {
    module.exports = '<button class="btn btn-block btn-danger">\n    <span ng-show="vm.status===\'idle\'">Upload</span>\n    <span ng-show="vm.status===\'uploading\'">Upload {{vm.percent}}%</span>\n    <span ng-show="vm.status===\'processing\'">Processing <i class="fa fa-spinner fa-spin"></i></span>\n</button>\n<input id="upload-input" type="file" size="chars" multiple >\n\n\n';
});
/*mev-workspace@0.0.1#src/main/view/upload/UploadDatasetDirective*/
define('mev-workspace@0.0.1#src/main/view/upload/UploadDatasetDirective', [
    'lodash',
    './UploadDataset.tpl.html'
], function (_, template) {
    var directive = function (DatasetResource) {
        return {
            restrict: 'CEA',
            template: template,
            link: function (scope, elem, attrs) {
                var elButton = elem.find('.btn');
                var elInput = elem.find('input');
                elButton.click(function () {
                    elInput.click();
                });
                scope.vm = {
                    status: 'idle',
                    uploadProgress: function (progress, event) {
                        scope.$apply(function () {
                            scope.vm.percent = progress;
                            if (progress >= 100)
                                scope.vm.status = 'processing';
                            else
                                scope.vm.status = 'uploading';
                        });
                    },
                    completed: function (event) {
                        scope.vm.status = 'idle';
                    }
                };
                elInput.on('change', function () {
                    var input = elInput[0], files = new Array();
                    for (var i = 0; i < input.files.length; i++) {
                        files.push(input.files[i]);
                        if (files.length == input.files.length) {
                            files.map(function (file) {
                                if (_.endsWith(file.name, '.zip'))
                                    DatasetResource.importZip(file, scope.vm.uploadProgress, scope.vm.completed);
                                else
                                    DatasetResource.uploadFile(file, scope.vm.uploadProgress, scope.vm.completed);
                            });
                        }
                    }
                });
            }
        };
    };
    directive.$name = 'mevDatasetUpload';
    directive.$inject = ['mevDatasetRest'];
    directive.$provider = 'directive';
    return directive;
});
/*mev-workspace@0.0.1#src/main/mev-workspace*/
define('mev-workspace@0.0.1#src/main/mev-workspace', [
    'mui',
    'pouchdb',
    'mev-domain-common',
    'mev-dataset',
    'mev-annotations',
    'angular-ui-router',
    'ui-router-extras',
    './model/Workspace',
    './router/WorkspaceState',
    './router/WorkspaceStateInit',
    './view/list/WorkspaceListDirective',
    './view/upload/UploadDatasetDirective'
], function (ng) {
    return ng.module('mev-workspace', ['ct.ui.router.extras'], arguments);
});
/*app/domain/navigator/domain.navigator.module*/
define('app/domain/navigator/domain.navigator.module', ['ng'], function (ng) {
    var module = ng.module('mui.domain.navigator', []);
    module.factory('Navigator', [
        '$state',
        function ($state) {
            function Navigator() {
                this.openProject = function (project) {
                    $state.go('root.project', { id: project.id });
                };
                this.newProject = function () {
                    $state.go('root.project');
                };
                this.importDataset = function (datasource, dataset) {
                    $state.go('root.import', {
                        datasourceId: datasource.id,
                        datasetId: dataset.id
                    });
                };
                this.goHome = function () {
                    $state.go('root.home');
                };
                this.openDataset = function () {
                };
                this.openAnnotations = function (dataset, dimension) {
                    $state.go('root.dataset.annotations', {
                        datasetId: dataset.id,
                        dimension: dimension
                    });
                };
            }
            return new Navigator();
        }
    ]);
    return module;
});
/*app/domain/analysis/genesd/SigGenesFactory*/
define('app/domain/analysis/genesd/SigGenesFactory', [], function () {
    'use strict';
    var SigGenesFactory = function () {
        return function SigGenesFactory(n, genes, values, headers) {
            var _self = this;
            var genes = genes;
            var values = values;
            var aHeaders;
            if (Array.isArray(headers)) {
                aHeaders = headers;
            } else {
                aHeaders = [
                    {
                        'name': 'ID',
                        'field': 'geneId',
                        'icon': 'search'
                    },
                    {
                        'name': 'Deviation',
                        'field': 'value',
                        'icon': n > 0 ? '>=' : '<='
                    }
                ];
                if (typeof headers === 'string') {
                    aHeaders[1].name = headers;
                }
            }
            function formatData(genes, values) {
                return genes.map(function (gene, i) {
                    return {
                        geneId: gene,
                        value: values[i]
                    };
                });
            }
            function getN(n) {
                if (n > 0)
                    return formatData(genes.slice(0, n), values.slice(0, n));
                else
                    return formatData(genes.slice(genes.length + n), values.slice(values.length + n));
            }
            return {
                keys: genes.slice(0, 19),
                data: getN(n),
                headers: aHeaders
            };
        };
    };
    SigGenesFactory.$name = 'SigGenesFactory';
    SigGenesFactory.$inject = [];
    return SigGenesFactory;
});
/*app/domain/analysis/genesd/domain.analysis.genesd.module*/
define('app/domain/analysis/genesd/domain.analysis.genesd.module', [
    'ng',
    './SigGenesFactory'
], function (ng) {
    return ng.module('mui.domain.analysis.genesd', arguments, arguments);
});
/*app/domain/analysis/domain.analysis.module*/
define('app/domain/analysis/domain.analysis.module', [
    'ng',
    './genesd/domain.analysis.genesd.module'
], function (ng) {
    var module = ng.module('mui.domain.analysis', arguments, arguments);
    return module;
});
/*app/domain/project/model/MevProject*/
define('app/domain/project/model/MevProject', ['ng'], function (ng) {
    'use strict';
    var ProjectFactory = function ProjectFactory(DS) {
        return DS.defineResource({
            name: 'Project',
            endpoint: 'project',
            idAttribute: 'name',
            relations: {
                hasMany: {
                    Dataset: {
                        localField: 'datasets',
                        foreignKey: 'projectName',
                        enumerable: true
                    }
                }
            }
        });
    };
    ProjectFactory.$inject = ['DS'];
    return ProjectFactory;
});
/*app/domain/project/domain.project.module*/
define('app/domain/project/domain.project.module', [
    'ng',
    './model/MevProject'
], function (ng, MevProject) {
    var module = ng.module('mui.domain.project', ['mui.domain.dataset']);
    module.factory('MevProject', MevProject);
    return module;
});
/*app/domain/dataset/dashboard/services/dashboardItemsService*/
define('app/domain/dataset/dashboard/services/dashboardItemsService', [], function () {
    var DashboardItems = function DashboardItems() {
        return function () {
            var _self = this;
            this['GeneSD'] = {
                name: 'GeneSD',
                launch: {
                    analysisType: 'genesd',
                    analysisName: 'GeneSD'
                }
            };
            this['GeneMAD'] = {
                name: 'GeneMAD',
                launch: {
                    analysisType: 'genemad',
                    analysisName: 'GeneMAD'
                }
            };
            this['PCA'] = {
                name: 'PCA',
                launch: {
                    analysisType: 'pca',
                    analysisName: 'PCA'
                }
            };
            this['Histogram'] = {
                name: 'Histogram',
                launch: {
                    analysisType: 'histogram',
                    analysisName: 'Histogram'
                }
            };
            this.$add = function (item) {
                _self[item.name] = item;
            };
        };
    };
    DashboardItems.$name = 'DashboardItems';
    DashboardItems.provider = 'factory';
    DashboardItems.$inject = [];
    return DashboardItems;
});
/*app/domain/dataset/dashboard/services/dashboardsService*/
define('app/domain/dataset/dashboard/services/dashboardsService', [], function () {
    var Dashboards = function Dashboards(DashboardItems) {
        var _self = this;
        this.$add = function (item) {
            _self[item.name] = item;
        };
        this.$new = function (id) {
        };
    };
    Dashboards.$name = 'Dashboards';
    Dashboards.provider = 'service';
    Dashboards.$inject = ['DashboardItems'];
    return Dashboards;
});
/*app/domain/dataset/dashboard/DashboardFactory*/
define('app/domain/dataset/dashboard/DashboardFactory', [], function () {
    var DashboardFactory = function DashboardFactory() {
        return function () {
            var _self = this;
            this.items = {
                'Original Data': {
                    name: 'Original Data',
                    templateUrl: 'app/views/dataset/_templates/dataset.heatmap.tpl.html',
                    viewModel: 'DatasetHeatmapVMFactory'
                }
            };
            this.add = function (item) {
                _self.items[item.name] = item;
            };
        };
    };
    DashboardFactory.$name = 'DashboardFactory';
    DashboardFactory.$inject = [];
    return DashboardFactory;
});
/*app/domain/dataset/dashboard/domain.dataset.dashboard.module*/
define('app/domain/dataset/dashboard/domain.dataset.dashboard.module', [
    'ng',
    './services/dashboardItemsService',
    './services/dashboardsService',
    './DashboardFactory'
], function (ng) {
    return ng.module('mui.domain.dataset.dashboard', [], arguments);
});
/*app/domain/dataset/domain.dataset.module*/
define('app/domain/dataset/domain.dataset.module', [
    'ng',
    './dashboard/domain.dataset.dashboard.module'
], function (ng, project) {
    var module = ng.module('mui.domain.dataset', arguments, arguments);
    var DatasetFactory = function DatasetFactory(DS) {
        return DS.defineResource({
            name: 'Dataset',
            endpoint: 'dataset',
            idAttribute: 'name',
            relations: {
                belongsTo: {
                    Project: {
                        localField: 'project',
                        localKey: 'projectName',
                        parent: true,
                        enumerable: true
                    }
                }
            }
        });
    };
    DatasetFactory.$inject = ['DS'];
    module.factory('MevDataset', DatasetFactory);
    return module;
});
/*app/domain/domain.module*/
define('app/domain/domain.module', [
    'mui',
    './navigator/domain.navigator.module',
    './analysis/domain.analysis.module',
    './presets/domain.presets.module',
    './project/domain.project.module',
    './dataset/domain.dataset.module'
], function (ng, navigatorMod, modAnalsys, modPresets, modProject, modDataset) {
    var module = ng.module('mui.domain', arguments, arguments);
    return module;
});
/*blob@0.0.4#index*/
define('blob@0.0.4#index', function (require, exports, module) {
    (function (global) {
        var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
        var blobSupported = function () {
            try {
                var a = new Blob(['hi']);
                return a.size === 2;
            } catch (e) {
                return false;
            }
        }();
        var blobSupportsArrayBufferView = blobSupported && function () {
            try {
                var b = new Blob([new Uint8Array([
                        1,
                        2
                    ])]);
                return b.size === 2;
            } catch (e) {
                return false;
            }
        }();
        var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
        function mapArrayBufferViews(ary) {
            for (var i = 0; i < ary.length; i++) {
                var chunk = ary[i];
                if (chunk.buffer instanceof ArrayBuffer) {
                    var buf = chunk.buffer;
                    if (chunk.byteLength !== buf.byteLength) {
                        var copy = new Uint8Array(chunk.byteLength);
                        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                        buf = copy.buffer;
                    }
                    ary[i] = buf;
                }
            }
        }
        function BlobBuilderConstructor(ary, options) {
            options = options || {};
            var bb = new BlobBuilder();
            mapArrayBufferViews(ary);
            for (var i = 0; i < ary.length; i++) {
                bb.append(ary[i]);
            }
            return options.type ? bb.getBlob(options.type) : bb.getBlob();
        }
        ;
        function BlobConstructor(ary, options) {
            mapArrayBufferViews(ary);
            return new Blob(ary, options || {});
        }
        ;
        module.exports = function () {
            if (blobSupported) {
                return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
            } else if (blobBuilderSupported) {
                return BlobBuilderConstructor;
            } else {
                return undefined;
            }
        }();
    }(function () {
        return this;
    }()));
});
/*immediate@3.0.6#lib/index*/
define('immediate@3.0.6#lib/index', function (require, exports, module) {
    (function (global) {
        'use strict';
        var Mutation = global.MutationObserver || global.WebKitMutationObserver;
        var scheduleDrain;
        if (process.browser) {
            if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global.document.createTextNode('');
                observer.observe(element, { characterData: true });
                scheduleDrain = function () {
                    element.data = called = ++called % 2;
                };
            } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                var channel = new global.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function () {
                    channel.port2.postMessage(0);
                };
            } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                scheduleDrain = function () {
                    var scriptEl = global.document.createElement('script');
                    scriptEl.onreadystatechange = function () {
                        nextTick();
                        scriptEl.onreadystatechange = null;
                        scriptEl.parentNode.removeChild(scriptEl);
                        scriptEl = null;
                    };
                    global.document.documentElement.appendChild(scriptEl);
                };
            } else {
                scheduleDrain = function () {
                    setTimeout(nextTick, 0);
                };
            }
        } else {
            scheduleDrain = function () {
                process.nextTick(nextTick);
            };
        }
        var draining;
        var queue = [];
        function nextTick() {
            draining = true;
            var i, oldQueue;
            var len = queue.length;
            while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;
                while (++i < len) {
                    oldQueue[i]();
                }
                len = queue.length;
            }
            draining = false;
        }
        module.exports = immediate;
        function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
            }
        }
    }(function () {
        return this;
    }()));
});
/*lie@3.1.0#lib/index*/
define('lie@3.1.0#lib/index', function (require, exports, module) {
    'use strict';
    var immediate = require('immediate');
    function INTERNAL() {
    }
    var handlers = {};
    var REJECTED = ['REJECTED'];
    var FULFILLED = ['FULFILLED'];
    var PENDING = ['PENDING'];
    if (!process.browser) {
        var UNHANDLED = ['UNHANDLED'];
    }
    module.exports = Promise;
    function Promise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError('resolver must be a function');
        }
        this.state = PENDING;
        this.queue = [];
        this.outcome = void 0;
        if (!process.browser) {
            this.handled = UNHANDLED;
        }
        if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
        }
    }
    Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
            return this;
        }
        var promise = new this.constructor(INTERNAL);
        if (!process.browser) {
            if (this.handled === UNHANDLED) {
                this.handled = null;
            }
        }
        if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
        } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
        }
        return promise;
    };
    function QueueItem(promise, onFulfilled, onRejected) {
        this.promise = promise;
        if (typeof onFulfilled === 'function') {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
        }
        if (typeof onRejected === 'function') {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
        }
    }
    QueueItem.prototype.callFulfilled = function (value) {
        handlers.resolve(this.promise, value);
    };
    QueueItem.prototype.otherCallFulfilled = function (value) {
        unwrap(this.promise, this.onFulfilled, value);
    };
    QueueItem.prototype.callRejected = function (value) {
        handlers.reject(this.promise, value);
    };
    QueueItem.prototype.otherCallRejected = function (value) {
        unwrap(this.promise, this.onRejected, value);
    };
    function unwrap(promise, func, value) {
        immediate(function () {
            var returnValue;
            try {
                returnValue = func(value);
            } catch (e) {
                return handlers.reject(promise, e);
            }
            if (returnValue === promise) {
                handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
            } else {
                handlers.resolve(promise, returnValue);
            }
        });
    }
    handlers.resolve = function (self, value) {
        var result = tryCatch(getThen, value);
        if (result.status === 'error') {
            return handlers.reject(self, result.value);
        }
        var thenable = result.value;
        if (thenable) {
            safelyResolveThenable(self, thenable);
        } else {
            self.state = FULFILLED;
            self.outcome = value;
            var i = -1;
            var len = self.queue.length;
            while (++i < len) {
                self.queue[i].callFulfilled(value);
            }
        }
        return self;
    };
    handlers.reject = function (self, error) {
        self.state = REJECTED;
        self.outcome = error;
        if (!process.browser) {
            if (self.handled === UNHANDLED) {
                immediate(function () {
                    if (self.handled === UNHANDLED) {
                        process.emit('unhandledRejection', error, self);
                    }
                });
            }
        }
        var i = -1;
        var len = self.queue.length;
        while (++i < len) {
            self.queue[i].callRejected(error);
        }
        return self;
    };
    function getThen(obj) {
        var then = obj && obj.then;
        if (obj && typeof obj === 'object' && typeof then === 'function') {
            return function appyThen() {
                then.apply(obj, arguments);
            };
        }
    }
    function safelyResolveThenable(self, thenable) {
        var called = false;
        function onError(value) {
            if (called) {
                return;
            }
            called = true;
            handlers.reject(self, value);
        }
        function onSuccess(value) {
            if (called) {
                return;
            }
            called = true;
            handlers.resolve(self, value);
        }
        function tryToUnwrap() {
            thenable(onSuccess, onError);
        }
        var result = tryCatch(tryToUnwrap);
        if (result.status === 'error') {
            onError(result.value);
        }
    }
    function tryCatch(func, value) {
        var out = {};
        try {
            out.value = func(value);
            out.status = 'success';
        } catch (e) {
            out.status = 'error';
            out.value = e;
        }
        return out;
    }
    Promise.resolve = resolve;
    function resolve(value) {
        if (value instanceof this) {
            return value;
        }
        return handlers.resolve(new this(INTERNAL), value);
    }
    Promise.reject = reject;
    function reject(reason) {
        var promise = new this(INTERNAL);
        return handlers.reject(promise, reason);
    }
    Promise.all = all;
    function all(iterable) {
        var self = this;
        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
            return this.resolve([]);
        }
        var values = new Array(len);
        var resolved = 0;
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
            allResolver(iterable[i], i);
        }
        return promise;
        function allResolver(value, i) {
            self.resolve(value).then(resolveFromAll, function (error) {
                if (!called) {
                    called = true;
                    handlers.reject(promise, error);
                }
            });
            function resolveFromAll(outValue) {
                values[i] = outValue;
                if (++resolved === len && !called) {
                    called = true;
                    handlers.resolve(promise, values);
                }
            }
        }
    }
    Promise.race = race;
    function race(iterable) {
        var self = this;
        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
            return this.resolve([]);
        }
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
            resolver(iterable[i]);
        }
        return promise;
        function resolver(value) {
            self.resolve(value).then(function (response) {
                if (!called) {
                    called = true;
                    handlers.resolve(promise, response);
                }
            }, function (error) {
                if (!called) {
                    called = true;
                    handlers.reject(promise, error);
                }
            });
        }
    }
});
/*native-or-lie@1.0.0#index*/
define('native-or-lie@1.0.0#index', function (require, exports, module) {
    module.exports = typeof Promise === 'function' ? Promise : require('lie');
});
/*blob-util@1.2.1#lib/index*/
define('blob-util@1.2.1#lib/index', function (require, exports, module) {
    'use strict';
    var Blob = require('blob');
    var Promise = require('native-or-lie');
    function binaryStringToArrayBuffer(binary) {
        var length = binary.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);
        var i = -1;
        while (++i < length) {
            arr[i] = binary.charCodeAt(i);
        }
        return buf;
    }
    function arrayBufferToBinaryString(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var length = bytes.byteLength;
        var i = -1;
        while (++i < length) {
            binary += String.fromCharCode(bytes[i]);
        }
        return binary;
    }
    function loadImage(src, crossOrigin) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            if (crossOrigin) {
                img.crossOrigin = crossOrigin;
            }
            img.onload = function () {
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }
    function imgToCanvas(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        return canvas;
    }
    function createBlob(parts, options) {
        options = options || {};
        if (typeof options === 'string') {
            options = { type: options };
        }
        return new Blob(parts, options);
    }
    function createObjectURL(blob) {
        return (window.URL || window.webkitURL).createObjectURL(blob);
    }
    function revokeObjectURL(url) {
        return (window.URL || window.webkitURL).revokeObjectURL(url);
    }
    function blobToBinaryString(blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            var hasBinaryString = typeof reader.readAsBinaryString === 'function';
            reader.onloadend = function (e) {
                var result = e.target.result || '';
                if (hasBinaryString) {
                    return resolve(result);
                }
                resolve(arrayBufferToBinaryString(result));
            };
            reader.onerror = reject;
            if (hasBinaryString) {
                reader.readAsBinaryString(blob);
            } else {
                reader.readAsArrayBuffer(blob);
            }
        });
    }
    function base64StringToBlob(base64, type) {
        return Promise.resolve().then(function () {
            var parts = [binaryStringToArrayBuffer(atob(base64))];
            return type ? createBlob(parts, { type: type }) : createBlob(parts);
        });
    }
    function binaryStringToBlob(binary, type) {
        return Promise.resolve().then(function () {
            return base64StringToBlob(btoa(binary), type);
        });
    }
    function blobToBase64String(blob) {
        return blobToBinaryString(blob).then(function (binary) {
            return btoa(binary);
        });
    }
    function dataURLToBlob(dataURL) {
        return Promise.resolve().then(function () {
            var type = dataURL.match(/data:([^;]+)/)[1];
            var base64 = dataURL.replace(/^[^,]+,/, '');
            var buff = binaryStringToArrayBuffer(atob(base64));
            return createBlob([buff], { type: type });
        });
    }
    function imgSrcToDataURL(src, type, crossOrigin, quality) {
        type = type || 'image/png';
        return loadImage(src, crossOrigin).then(function (img) {
            return imgToCanvas(img);
        }).then(function (canvas) {
            return canvas.toDataURL(type, quality);
        });
    }
    function canvasToBlob(canvas, type, quality) {
        return Promise.resolve().then(function () {
            if (typeof canvas.toBlob === 'function') {
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve, type, quality);
                });
            }
            return dataURLToBlob(canvas.toDataURL(type, quality));
        });
    }
    function imgSrcToBlob(src, type, crossOrigin, quality) {
        type = type || 'image/png';
        return loadImage(src, crossOrigin).then(function (img) {
            return imgToCanvas(img);
        }).then(function (canvas) {
            return canvasToBlob(canvas, type, quality);
        });
    }
    function arrayBufferToBlob(buffer, type) {
        return Promise.resolve().then(function () {
            return createBlob([buffer], type);
        });
    }
    function blobToArrayBuffer(blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var result = e.target.result || new ArrayBuffer(0);
                resolve(result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    }
    module.exports = {
        createBlob: createBlob,
        createObjectURL: createObjectURL,
        revokeObjectURL: revokeObjectURL,
        imgSrcToBlob: imgSrcToBlob,
        imgSrcToDataURL: imgSrcToDataURL,
        canvasToBlob: canvasToBlob,
        dataURLToBlob: dataURLToBlob,
        blobToBase64String: blobToBase64String,
        base64StringToBlob: base64StringToBlob,
        binaryStringToBlob: binaryStringToBlob,
        blobToBinaryString: blobToBinaryString,
        arrayBufferToBlob: arrayBufferToBlob,
        blobToArrayBuffer: blobToArrayBuffer
    };
});