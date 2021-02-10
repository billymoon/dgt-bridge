// var exports = {
// }, _dewExec = false;
// var exports1 = {
// }, _dewExec1 = false;

function dew(exports1) {
    // if (_dewExec1) return exports1;
    // _dewExec1 = true;
    class MarkProcessor {
        constructor(visitor, string, marks){
            this.visitor = visitor;
            this.string = string;
            this.marks = marks;
            this.index = 0;
        }
        hasMark(pos) {
            if (pos === void 0) {
                pos = 0;
            }
            return this.index + pos < this.marks.length;
        }
        getMark(pos) {
            if (pos === void 0) {
                pos = 0;
            }
            return this.marks[this.index + pos];
        }
        shift() {
            this.index += 1;
        }
        process() {
            var mark = this.marks[this.index];
            this.shift();
            var func = this.visitor[mark.name];
            if (!func) throw new Error('Unknown handler: ' + mark.name);
            return func.call(this.visitor, this, mark);
        }
        processString() {
            this.shift();
            return this.processStringEnd();
        }
        processStringEnd() {
            var prev = this.marks[this.index - 1];
            var curr = this.marks[this.index];
            this.shift();
            return this.string.slice(prev.position, curr.position);
        }
    }
    function _asyncIterator(iterable) {
        var method;
        if (typeof Symbol !== "undefined") {
            if (Symbol.asyncIterator) {
                method = iterable[Symbol.asyncIterator];
                if (method != null) return method.call(iterable);
            }
            if (Symbol.iterator) {
                method = iterable[Symbol.iterator];
                if (method != null) return method.call(iterable);
            }
        }
        throw new TypeError("Object is not async iterable");
    }
    function _AwaitValue(value) {
        this.wrapped = value;
    }
    function _AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
            return new Promise(function(resolve, reject) {
                var request = {
                    key: key,
                    arg: arg,
                    resolve: resolve,
                    reject: reject,
                    next: null
                };
                if (back) {
                    back = back.next = request;
                } else {
                    front = back = request;
                    resume(key, arg);
                }
            });
        }
        function resume(key, arg) {
            try {
                var result = gen[key](arg);
                var value = result.value;
                var wrappedAwait = value instanceof _AwaitValue;
                Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg1) {
                    if (wrappedAwait) {
                        resume(key === "return" ? "return" : "next", arg1);
                        return;
                    }
                    settle(result.done ? "return" : "normal", arg1);
                }, function(err) {
                    resume("throw", err);
                });
            } catch (err) {
                settle("throw", err);
            }
        }
        function settle(type, value) {
            switch(type){
                case "return":
                    front.resolve({
                        value: value,
                        done: true
                    });
                    break;
                case "throw":
                    front.reject(value);
                    break;
                default:
                    front.resolve({
                        value: value,
                        done: false
                    });
                    break;
            }
            front = front.next;
            if (front) {
                resume(front.key, front.arg);
            } else {
                back = null;
            }
        }
        this._invoke = send;
        if (typeof gen.return !== "function") {
            this.return = undefined;
        }
    }
    if (typeof Symbol === "function" && Symbol.asyncIterator) {
        _AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
            return this;
        };
    }
    _AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
    };
    _AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
    };
    _AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
    };
    function _wrapAsyncGenerator(fn) {
        return function() {
            return new _AsyncGenerator(fn.apply(this, arguments));
        };
    }
    function _awaitAsyncGenerator(value) {
        return new _AwaitValue(value);
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function _extends() {
        _extends = Object.assign || function(target) {
            for(var i = 1; i < arguments.length; i++){
                var source = arguments[i];
                for(var key in source){
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it;
        if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                return function() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        it = o[Symbol.iterator]();
        return it.next.bind(it);
    }
    function getType(data) {
        if (data === null || typeof data === 'undefined') return 'null';
        if (Array.isArray(data)) return 'array';
        if (data instanceof Range1) return 'range';
        if (data instanceof Pair) return 'pair';
        if (data instanceof Path) return 'path';
        return typeof data;
    }
    class StaticValue {
        constructor(data){
            this.data = data;
        }
        getType() {
            return getType(this.data);
        }
        get() {
            var _this2 = this;
            return _asyncToGenerator(function*() {
                return _this2.data;
            })();
        }
        [Symbol.asyncIterator]() {
            if (Array.isArray(this.data)) {
                return (function*(data1) {
                    for(var _iterator4 = _createForOfIteratorHelperLoose(data1), _step4; !(_step4 = _iterator4()).done;){
                        var element = _step4.value;
                        yield new StaticValue(element);
                    }
                })(this.data);
            } else {
                throw new Error('Cannot iterate over: ' + this.getType());
            }
        }
        getBoolean() {
            return typeof this.data === 'boolean' && this.data === true;
        }
    }
    var NULL_VALUE = new StaticValue(null);
    var TRUE_VALUE = new StaticValue(true);
    var FALSE_VALUE = new StaticValue(false);
    class StreamValue {
        constructor(generator){
            this.generator = generator;
            this.ticker = null;
            this.isDone = false;
            this.data = [];
        }
        getType() {
            return 'array';
        }
        get() {
            var _this3 = this;
            return _asyncToGenerator(function*() {
                var result = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError;
                try {
                    for(var _iterator = _asyncIterator(_this3), _step, _value; (_step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion); _iteratorNormalCompletion = true){
                        var value = _value;
                        result.push((yield value.get()));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            yield _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return result;
            })();
        }
        [Symbol.asyncIterator]() {
            var _this = this;
            return _wrapAsyncGenerator(function*() {
                var i = 0;
                while(true){
                    for(; i < _this.data.length; i++){
                        yield _this.data[i];
                    }
                    if (_this.isDone) return;
                    yield _awaitAsyncGenerator(_this._nextTick());
                }
            })();
        }
        getBoolean() {
            return false;
        }
        _nextTick() {
            var _this4 = this;
            if (this.ticker) return this.ticker;
            var currentResolver;
            var setupTicker = ()=>{
                this.ticker = new Promise((resolve)=>{
                    currentResolver = resolve;
                });
            };
            var tick = ()=>{
                currentResolver();
                setupTicker();
            };
            var fetch = function() {
                var _ref2 = _asyncToGenerator(function*() {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2;
                    try {
                        for(var _iterator2 = _asyncIterator(_this4.generator()), _step2, _value2; (_step2 = yield _iterator2.next(), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _step2.value, !_iteratorNormalCompletion2); _iteratorNormalCompletion2 = true){
                            var value = _value2;
                            _this4.data.push(value);
                            tick();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                yield _iterator2.return();
                            }
                        } finally{
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                    _this4.isDone = true;
                    tick();
                });
                return function fetch() {
                    return _ref2.apply(this, arguments);
                };
            }();
            setupTicker();
            fetch();
            return this.ticker;
        }
    }
    class MapperValue {
        constructor(value2){
            this.value = value2;
        }
        getType() {
            return 'array';
        }
        get() {
            var _this5 = this;
            return _asyncToGenerator(function*() {
                return yield _this5.value.get();
            })();
        }
        [Symbol.asyncIterator]() {
            var value1 = this.value;
            var iterator = value1[Symbol.asyncIterator];
            return iterator.call(this.value);
        }
        getBoolean() {
            return false;
        }
    }
    class Range1 {
        constructor(left, right, exclusive){
            this.left = left;
            this.right = right;
            this.exclusive = exclusive;
        }
        static isConstructible(leftType, rightType) {
            if (leftType === rightType) {
                if (leftType === 'number') return true;
                if (leftType === 'string') return true;
                if (leftType === 'boolean') return true;
            }
            return false;
        }
        isExclusive() {
            return this.exclusive;
        }
        toJSON() {
            return [
                this.left,
                this.right
            ];
        }
    }
    class Pair {
        constructor(first, second){
            this.first = first;
            this.second = second;
        }
        toJSON() {
            return [
                this.first,
                this.second
            ];
        }
    }
    function escapeRegExp(string1) {
        return string1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function pathRegExp(pattern) {
        var re = [];
        for(var _iterator5 = _createForOfIteratorHelperLoose(pattern.split('.')), _step5; !(_step5 = _iterator5()).done;){
            var part = _step5.value;
            if (part === '*') {
                re.push('[^.]+');
            } else if (part === '**') {
                re.push('.*');
            } else {
                re.push(escapeRegExp(part));
            }
        }
        return new RegExp("^" + re.join('.') + "$");
    }
    class Path {
        constructor(pattern){
            this.pattern = pattern;
            this.patternRe = pathRegExp(pattern);
        }
        matches(str) {
            return this.patternRe.test(str);
        }
        toJSON() {
            return this.pattern;
        }
    }
    function fromNumber(num) {
        if (Number.isFinite(num)) {
            return new StaticValue(num);
        } else {
            return NULL_VALUE;
        }
    }
    function isIterator(obj) {
        return obj && typeof obj.next === 'function';
    }
    function fromJS(val) {
        if (isIterator(val)) {
            return new StreamValue(_wrapAsyncGenerator(function*() {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3;
                try {
                    for(var _iterator3 = _asyncIterator(val), _step3, _value3; (_step3 = yield _awaitAsyncGenerator(_iterator3.next()), _iteratorNormalCompletion3 = _step3.done, _value3 = yield _awaitAsyncGenerator(_step3.value), !_iteratorNormalCompletion3); _iteratorNormalCompletion3 = true){
                        var value1 = _value3;
                        yield new StaticValue(value1);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                            yield _awaitAsyncGenerator(_iterator3.return());
                        }
                    } finally{
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }));
        } else if (val === null || val === undefined) {
            return NULL_VALUE;
        } else {
            return new StaticValue(val);
        }
    }
    var TYPE_ORDER = {
        number: 1,
        string: 2,
        boolean: 3
    };
    function partialCompare(a, b) {
        var aType = getType(a);
        var bType = getType(b);
        if (aType !== bType) return null;
        switch(aType){
            case 'number':
            case 'boolean':
                return a - b;
            case 'string':
                return a < b ? -1 : a > b ? 1 : 0;
        }
        return null;
    }
    function totalCompare(a, b) {
        var aType = getType(a);
        var bType = getType(b);
        var aTypeOrder = TYPE_ORDER[aType] || 100;
        var bTypeOrder = TYPE_ORDER[bType] || 100;
        if (aTypeOrder !== bTypeOrder) {
            return aTypeOrder - bTypeOrder;
        }
        var result = partialCompare(a, b);
        if (result === null) result = 0;
        return result;
    }
    function hasReference(value1, id) {
        switch(getType(value1)){
            case 'array':
                for(var _iterator3 = _createForOfIteratorHelperLoose(value1), _step3; !(_step3 = _iterator3()).done;){
                    var v = _step3.value;
                    if (hasReference(v, id)) return true;
                }
                break;
            case 'object':
                if (value1._ref === id) return true;
                for(var _i = 0, _Object$values = Object.values(value1); _i < _Object$values.length; _i++){
                    var _v = _Object$values[_i];
                    if (hasReference(_v, id)) return true;
                }
                break;
        }
        return false;
    }
    function countUTF8(str) {
        var count = 0;
        for(var i = 0; i < str.length; i++){
            var code = str.charCodeAt(i);
            if (code >= 55296 && code <= 56319) {
                continue;
            }
            count++;
        }
        return count;
    }
    var functions = {
    };
    functions.coalesce = (function() {
        var _coalesce = _asyncToGenerator(function*(args, scope, execute) {
            for(var _iterator4 = _createForOfIteratorHelperLoose(args), _step4; !(_step4 = _iterator4()).done;){
                var arg = _step4.value;
                var value1 = yield execute(arg, scope);
                if (value1.getType() !== 'null') return value1;
            }
            return NULL_VALUE;
        });
        function coalesce(_x, _x2, _x3) {
            return _coalesce.apply(this, arguments);
        }
        return coalesce;
    })();
    functions.count = (function() {
        var _count = _asyncToGenerator(function*(args, scope, execute) {
            var inner = yield execute(args[0], scope);
            if (inner.getType() !== 'array') return NULL_VALUE;
            var num = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError;
            try {
                for(var _iterator = _asyncIterator(inner), _step, _value; (_step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion); _iteratorNormalCompletion = true){
                    var _ = _value;
                    num++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        yield _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return new StaticValue(num);
        });
        function count(_x4, _x5, _x6) {
            return _count.apply(this, arguments);
        }
        return count;
    })();
    functions.count.arity = 1;
    functions.defined = (function() {
        var _defined = _asyncToGenerator(function*(args, scope, execute) {
            var inner = yield execute(args[0], scope);
            return inner.getType() === 'null' ? FALSE_VALUE : TRUE_VALUE;
        });
        function defined(_x7, _x8, _x9) {
            return _defined.apply(this, arguments);
        }
        return defined;
    })();
    functions.defined.arity = 1;
    functions.identity = (function() {
        var _identity = _asyncToGenerator(function*(args) {
            return new StaticValue('me');
        });
        function identity(_x10) {
            return _identity.apply(this, arguments);
        }
        return identity;
    })();
    functions.identity.arity = 0;
    functions.length = (function() {
        var _length = _asyncToGenerator(function*(args, scope, execute) {
            var inner = yield execute(args[0], scope);
            if (inner.getType() === 'string') {
                var data1 = yield inner.get();
                return fromNumber(countUTF8(data1));
            }
            return NULL_VALUE;
        });
        function length(_x11, _x12, _x13) {
            return _length.apply(this, arguments);
        }
        return length;
    })();
    functions.length.arity = 1;
    functions.path = (function() {
        var _path = _asyncToGenerator(function*(args, scope, execute) {
            var inner = yield execute(args[0], scope);
            if (inner.getType() !== 'string') return NULL_VALUE;
            var str = yield inner.get();
            return new StaticValue(new Path(str));
        });
        function path(_x14, _x15, _x16) {
            return _path.apply(this, arguments);
        }
        return path;
    })();
    functions.path.arity = 1;
    functions.select = (function() {
        var _select = _asyncToGenerator(function*(args, scope, execute) {
            var seenFallback = false;
            for(var _iterator5 = _createForOfIteratorHelperLoose(args), _step5; !(_step5 = _iterator5()).done;){
                var arg = _step5.value;
                if (seenFallback) return NULL_VALUE;
                if (arg.type === 'Pair') ;
                else {
                    seenFallback = true;
                }
            }
            for(var _iterator6 = _createForOfIteratorHelperLoose(args), _step6; !(_step6 = _iterator6()).done;){
                var _arg = _step6.value;
                if (_arg.type === 'Pair') {
                    var cond = yield execute(_arg.left, scope);
                    if (cond.getBoolean()) {
                        return yield execute(_arg.right, scope);
                    }
                } else {
                    return yield execute(_arg, scope);
                }
            }
            return NULL_VALUE;
        });
        function select(_x17, _x18, _x19) {
            return _select.apply(this, arguments);
        }
        return select;
    })();
    functions.references = (function() {
        var _references = _asyncToGenerator(function*(args, scope, execute) {
            var idValue = yield execute(args[0], scope);
            if (idValue.getType() !== 'string') return FALSE_VALUE;
            var id = yield idValue.get();
            var scopeValue = scope.value;
            return hasReference(scopeValue, id) ? TRUE_VALUE : FALSE_VALUE;
        });
        function references(_x20, _x21, _x22) {
            return _references.apply(this, arguments);
        }
        return references;
    })();
    functions.references.arity = 1;
    functions.round = (function() {
        var _round = _asyncToGenerator(function*(args, scope, execute) {
            var value1 = yield execute(args[0], scope);
            if (value1.getType() !== 'number') return NULL_VALUE;
            var num = yield value1.get();
            var prec = 0;
            if (args.length === 2) {
                var precValue = yield execute(args[1], scope);
                if (precValue.getType() !== 'number') return NULL_VALUE;
                prec = yield precValue.get();
            }
            if (prec === 0) {
                return fromNumber(Math.round(num));
            } else {
                return fromNumber(Number(num.toFixed(prec)));
            }
        });
        function round(_x23, _x24, _x25) {
            return _round.apply(this, arguments);
        }
        return round;
    })();
    functions.round.arity = (count)=>count >= 1 && count <= 2
    ;
    functions.now = (function() {
        var _now = _asyncToGenerator(function*(args, scope) {
            return new StaticValue(scope.timestamp);
        });
        function now(_x26, _x27) {
            return _now.apply(this, arguments);
        }
        return now;
    })();
    functions.now.arity = 0;
    var pipeFunctions = {
    };
    pipeFunctions.order = (function() {
        var _order = _asyncToGenerator(function*(base, args, scope, execute) {
            yield true;
            if (base.getType() !== 'array') return NULL_VALUE;
            var mappers = [];
            var directions = [];
            var n = 0;
            for(var _iterator7 = _createForOfIteratorHelperLoose(args), _step7; !(_step7 = _iterator7()).done;){
                var mapper = _step7.value;
                var direction = 'asc';
                if (mapper.type === 'Desc') {
                    direction = 'desc';
                    mapper = mapper.base;
                } else if (mapper.type === 'Asc') {
                    mapper = mapper.base;
                }
                mappers.push(mapper);
                directions.push(direction);
                n++;
            }
            var aux = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2;
            try {
                for(var _iterator2 = _asyncIterator(base), _step2, _value2; (_step2 = yield _iterator2.next(), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _step2.value, !_iteratorNormalCompletion2); _iteratorNormalCompletion2 = true){
                    var value1 = _value2;
                    var newScope = scope.createNested(value1);
                    var tuple = [
                        (yield value1.get())
                    ];
                    for(var i = 0; i < n; i++){
                        var result = yield execute(mappers[i], newScope);
                        tuple.push((yield result.get()));
                    }
                    aux.push(tuple);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        yield _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
            aux.sort((aTuple, bTuple)=>{
                for(var _i2 = 0; _i2 < n; _i2++){
                    var c = totalCompare(aTuple[_i2 + 1], bTuple[_i2 + 1]);
                    if (directions[_i2] === 'desc') c = -c;
                    if (c !== 0) return c;
                }
                return 0;
            });
            return new StaticValue(aux.map((v)=>v[0]
            ));
        });
        function order(_x28, _x29, _x30, _x31) {
            return _order.apply(this, arguments);
        }
        return order;
    })();
    pipeFunctions.order.arity = (count)=>count >= 1
    ;
    function State() {
    }
    function Step(token, position) {
        this.token = token;
        this.position = position;
        this.nextFrames = [];
        this.acceptedContexts = [];
        this.callers = {
        };
    }
    Step.prototype.hasNextFrames = function hasNextFrames() {
        return this.nextFrames.length > 0;
    };
    Step.prototype.addNextFrame = function addNextFrame(frame) {
        this.nextFrames.push(frame);
    };
    Step.prototype.wasAccepted = function wasAccepted() {
        return this.acceptedContexts.length > 0;
    };
    Step.prototype.addAccept = function addAccept(context) {
        this.acceptedContexts.push(context);
    };
    Step.prototype.addMark = function addMark(name, context, nextState) {
        var mark = {
            type: "mark",
            name: name,
            position: this.position
        };
        var marks1 = context.marks ? {
            type: "concat",
            left: context.marks,
            right: mark
        } : mark;
        var nextContext = new Context(context.caller, marks1);
        var nextFrame = new Frame(nextContext);
        nextState.p(this, nextFrame);
        addNextFrame(this, nextFrame);
    };
    Step.prototype.startCall = function startCall(ruleId) {
        var caller = this.callers[ruleId];
        if (!caller) {
            caller = new Caller();
            this.callers[ruleId] = caller;
            var callContext = new Context(caller, null);
            var callFrame = new Frame(callContext);
            var states = ruleInitialStates[ruleId];
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                state.p(this, callFrame);
            }
            addNextFrame(this, callFrame);
        }
        return caller;
    };
    Step.prototype.returnCall = function returnCall(ruleId, frame) {
        var caller = frame.context.caller;
        var returns = caller.returns;
        for(var i = 0; i < returns.length; i++){
            var ret = returns[i];
            var callerContext = ret[0];
            var state = ret[1];
            var leftMarks = callerContext.marks;
            var rightMarks = frame.context.marks;
            var marks1 = leftMarks && rightMarks ? {
                type: "concat",
                left: callerContext.marks,
                right: frame.context.marks
            } : leftMarks || rightMarks;
            var context = new Context(callerContext.caller, marks1);
            var nextFrame = new Frame(context);
            state.p(this, nextFrame);
            addNextFrame(this, nextFrame);
        }
    };
    function Caller() {
        this.returns = [];
    }
    Caller.prototype.addReturn = function(context, nextState) {
        this.returns.push([
            context,
            nextState
        ]);
    };
    function Context(caller, marks1) {
        this.caller = caller;
        this.marks = marks1;
    }
    function Frame(context) {
        this.context = context;
        this.nextStates = [];
    }
    Frame.prototype.addNextState = function addNextState(state) {
        this.nextStates.push(state);
    };
    Frame.prototype.eachNextState = function eachNextState(fn) {
        this.nextStates.forEach(fn);
    };
    Frame.prototype.hasNextStates = function hasNextStates() {
        return this.nextStates.length > 0;
    };
    Frame.prototype.copy = function copy() {
        return new Frame(this.context, this.marks);
    };
    function processToken(token, position, frames) {
        var step = new Step(token, position);
        for(var i = 0; i < frames.length; i++){
            var frame = frames[i];
            processFrame(step, frame);
        }
        return step;
    }
    function processFrame(step, frame) {
        var newFrame = frame.copy();
        frame.eachNextState(function(state) {
            state.p(step, newFrame);
        });
        addNextFrame(step, newFrame);
    }
    function addNextFrame(step, frame) {
        if (frame.hasNextStates()) {
            step.addNextFrame(frame);
        }
    }
    function flattenMarks(marks1) {
        if (!marks1) return [];
        var queue = [
            marks1
        ];
        var result = [];
        while(queue.length){
            var m = queue.shift();
            if (m.type === "concat") {
                queue.unshift(m.left, m.right);
            } else if (m.type === "mark") {
                result.push(m);
            } else {
                throw new Error("unknown mark type: " + m.type);
            }
        }
        return result;
    }
    function parse(input) {
        var frames = initialFrames;
        var i = 0;
        for(; i < input.length; i++){
            var token = input.charCodeAt(i);
            var step = processToken(token, i, frames);
            if (!step.hasNextFrames()) {
                return {
                    type: "error",
                    position: i
                };
            }
            frames = step.nextFrames;
        }
        step = processToken(null, i, frames);
        if (!step.wasAccepted()) {
            return {
                type: "error",
                position: i
            };
        }
        var ctx = step.acceptedContexts[0];
        var marks1 = flattenMarks(ctx.marks);
        return {
            type: "success",
            marks: marks1
        };
    }
    var state0 = new State();
    var state1 = new State();
    var state2 = new State();
    var state3 = new State();
    var state4 = new State();
    var state5 = new State();
    var state6 = new State();
    var state7 = new State();
    var state8 = new State();
    var state9 = new State();
    var state10 = new State();
    var state11 = new State();
    var state12 = new State();
    var state13 = new State();
    var state14 = new State();
    var state15 = new State();
    var state16 = new State();
    var state17 = new State();
    var state18 = new State();
    var state19 = new State();
    var state20 = new State();
    var state21 = new State();
    var state22 = new State();
    var state23 = new State();
    var state24 = new State();
    var state25 = new State();
    var state26 = new State();
    var state27 = new State();
    var state28 = new State();
    var state29 = new State();
    var state30 = new State();
    var state31 = new State();
    var state32 = new State();
    var state33 = new State();
    var state34 = new State();
    var state35 = new State();
    var state36 = new State();
    var state37 = new State();
    var state38 = new State();
    var state39 = new State();
    var state40 = new State();
    var state41 = new State();
    var state42 = new State();
    var state43 = new State();
    var state44 = new State();
    var state45 = new State();
    var state46 = new State();
    var state47 = new State();
    var state48 = new State();
    var state49 = new State();
    var state50 = new State();
    var state51 = new State();
    var state52 = new State();
    var state53 = new State();
    var state54 = new State();
    var state55 = new State();
    var state56 = new State();
    var state57 = new State();
    var state58 = new State();
    var state59 = new State();
    var state60 = new State();
    var state61 = new State();
    var state62 = new State();
    var state63 = new State();
    var state64 = new State();
    var state65 = new State();
    var state66 = new State();
    var state67 = new State();
    var state68 = new State();
    var state69 = new State();
    var state70 = new State();
    var state71 = new State();
    var state72 = new State();
    var state73 = new State();
    var state74 = new State();
    var state75 = new State();
    var state76 = new State();
    var state77 = new State();
    var state78 = new State();
    var state79 = new State();
    var state80 = new State();
    var state81 = new State();
    var state82 = new State();
    var state83 = new State();
    var state84 = new State();
    var state85 = new State();
    var state86 = new State();
    var state87 = new State();
    var state88 = new State();
    var state89 = new State();
    var state90 = new State();
    var state91 = new State();
    var state92 = new State();
    var state93 = new State();
    var state94 = new State();
    var state95 = new State();
    var state96 = new State();
    var state97 = new State();
    var state98 = new State();
    var state99 = new State();
    var state100 = new State();
    var state101 = new State();
    var state102 = new State();
    var state103 = new State();
    var state104 = new State();
    var state105 = new State();
    var state106 = new State();
    var state107 = new State();
    var state108 = new State();
    var state109 = new State();
    var state110 = new State();
    var state111 = new State();
    var state112 = new State();
    var state113 = new State();
    var state114 = new State();
    var state115 = new State();
    var state116 = new State();
    var state117 = new State();
    var state118 = new State();
    var state119 = new State();
    var state120 = new State();
    var state121 = new State();
    var state122 = new State();
    var state123 = new State();
    var state124 = new State();
    var state125 = new State();
    var state126 = new State();
    var state127 = new State();
    var state128 = new State();
    var state129 = new State();
    var state130 = new State();
    var state131 = new State();
    var state132 = new State();
    var state133 = new State();
    var state134 = new State();
    var state135 = new State();
    var state136 = new State();
    var state137 = new State();
    var state138 = new State();
    var state139 = new State();
    var state140 = new State();
    var state141 = new State();
    var state142 = new State();
    var state143 = new State();
    var state144 = new State();
    var state145 = new State();
    var state146 = new State();
    var state147 = new State();
    var state148 = new State();
    var state149 = new State();
    var state150 = new State();
    var state151 = new State();
    var state152 = new State();
    var state153 = new State();
    var state154 = new State();
    var state155 = new State();
    var state156 = new State();
    var state157 = new State();
    var state158 = new State();
    var state159 = new State();
    var state160 = new State();
    var state161 = new State();
    var state162 = new State();
    var state163 = new State();
    var state164 = new State();
    var state165 = new State();
    var state166 = new State();
    var state167 = new State();
    var state168 = new State();
    var state169 = new State();
    var state170 = new State();
    var state171 = new State();
    var state172 = new State();
    var state173 = new State();
    var state174 = new State();
    var state175 = new State();
    var state176 = new State();
    var state177 = new State();
    var state178 = new State();
    var state179 = new State();
    var state180 = new State();
    var state181 = new State();
    var state182 = new State();
    var state183 = new State();
    var state184 = new State();
    var state185 = new State();
    var state186 = new State();
    var state187 = new State();
    var state188 = new State();
    var state189 = new State();
    var state190 = new State();
    var state191 = new State();
    var state192 = new State();
    var state193 = new State();
    var state194 = new State();
    var state195 = new State();
    var state196 = new State();
    var state197 = new State();
    var state198 = new State();
    var state199 = new State();
    var state200 = new State();
    var state201 = new State();
    var state202 = new State();
    var state203 = new State();
    var state204 = new State();
    var state205 = new State();
    var state206 = new State();
    var state207 = new State();
    var state208 = new State();
    var state209 = new State();
    var state210 = new State();
    var state211 = new State();
    var state212 = new State();
    var state213 = new State();
    var state214 = new State();
    var state215 = new State();
    var state216 = new State();
    var state217 = new State();
    var state218 = new State();
    var state219 = new State();
    var state220 = new State();
    var state221 = new State();
    var state222 = new State();
    var state223 = new State();
    var state224 = new State();
    var state225 = new State();
    var state226 = new State();
    var state227 = new State();
    var state228 = new State();
    var state229 = new State();
    var state230 = new State();
    var state231 = new State();
    var state232 = new State();
    var state233 = new State();
    var state234 = new State();
    var state235 = new State();
    var state236 = new State();
    var state237 = new State();
    var state238 = new State();
    var state239 = new State();
    var state240 = new State();
    var state241 = new State();
    var state242 = new State();
    var state243 = new State();
    var state244 = new State();
    var state245 = new State();
    var state246 = new State();
    var state247 = new State();
    var state248 = new State();
    var state249 = new State();
    var state250 = new State();
    var state251 = new State();
    var state252 = new State();
    var state253 = new State();
    var state254 = new State();
    var state255 = new State();
    var state256 = new State();
    var state257 = new State();
    var state258 = new State();
    var state259 = new State();
    var state260 = new State();
    var state261 = new State();
    var state262 = new State();
    var state263 = new State();
    var state264 = new State();
    var state265 = new State();
    var state266 = new State();
    var state267 = new State();
    var state268 = new State();
    var state269 = new State();
    var state270 = new State();
    var state271 = new State();
    var state272 = new State();
    var state273 = new State();
    var state274 = new State();
    var state275 = new State();
    var state276 = new State();
    var state277 = new State();
    var state278 = new State();
    var state279 = new State();
    var state280 = new State();
    var state281 = new State();
    var state282 = new State();
    var state283 = new State();
    var state284 = new State();
    var state285 = new State();
    var state286 = new State();
    var state287 = new State();
    var state288 = new State();
    var state289 = new State();
    var state290 = new State();
    var state291 = new State();
    var state292 = new State();
    var state293 = new State();
    var state294 = new State();
    var state295 = new State();
    var state296 = new State();
    var state297 = new State();
    var state298 = new State();
    var state299 = new State();
    var state300 = new State();
    var state301 = new State();
    var state302 = new State();
    var state303 = new State();
    var state304 = new State();
    var state305 = new State();
    var state306 = new State();
    var state307 = new State();
    var state308 = new State();
    var state309 = new State();
    var state310 = new State();
    var state311 = new State();
    var state312 = new State();
    var state313 = new State();
    var state314 = new State();
    var state315 = new State();
    var state316 = new State();
    var state317 = new State();
    var state318 = new State();
    var state319 = new State();
    var state320 = new State();
    var state321 = new State();
    var state322 = new State();
    var state323 = new State();
    var state324 = new State();
    var state325 = new State();
    var state326 = new State();
    var state327 = new State();
    var state328 = new State();
    var state329 = new State();
    var state330 = new State();
    var state331 = new State();
    var state332 = new State();
    var state333 = new State();
    var state334 = new State();
    var state335 = new State();
    var state336 = new State();
    var state337 = new State();
    var state338 = new State();
    var state339 = new State();
    var state340 = new State();
    var state341 = new State();
    var state342 = new State();
    var state343 = new State();
    var state344 = new State();
    var state345 = new State();
    var state346 = new State();
    var state347 = new State();
    var state348 = new State();
    var state349 = new State();
    var state350 = new State();
    var state351 = new State();
    var state352 = new State();
    var state353 = new State();
    var state354 = new State();
    var state355 = new State();
    var state356 = new State();
    var state357 = new State();
    var state358 = new State();
    var state359 = new State();
    var state360 = new State();
    var state361 = new State();
    var state362 = new State();
    var state363 = new State();
    var state364 = new State();
    var state365 = new State();
    var state366 = new State();
    var state367 = new State();
    var state368 = new State();
    var state369 = new State();
    var state370 = new State();
    var state371 = new State();
    var state372 = new State();
    var state373 = new State();
    var state374 = new State();
    var state375 = new State();
    var state376 = new State();
    var state377 = new State();
    var state378 = new State();
    state0.p = function(step, frame) {
        step.startCall("main").addReturn(frame.context, state1);
    };
    state0.id = 0;
    state1.p = function(step, frame) {
        step.addAccept(frame.context);
    };
    state1.id = 1;
    state2.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state3);
        step.startCall("EXPR^1").addReturn(frame.context, state4);
    };
    state2.id = 2;
    state3.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state3);
        step.startCall("EXPR^1").addReturn(frame.context, state4);
    };
    state3.id = 3;
    state4.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state5);
        step.returnCall("main", frame);
    };
    state4.id = 4;
    state5.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state5);
        step.returnCall("main", frame);
    };
    state5.id = 5;
    state6.p = function(step, frame) {
        var token = step.token;
        if (token === 9) {
            frame.addNextState(state7);
        }
        if (token === 10) {
            frame.addNextState(state8);
        }
        if (token === 11) {
            frame.addNextState(state9);
        }
        if (token === 12) {
            frame.addNextState(state10);
        }
        if (token === 13) {
            frame.addNextState(state11);
        }
        if (token === 32) {
            frame.addNextState(state12);
        }
        if (token === 133) {
            frame.addNextState(state13);
        }
        if (token === 160) {
            frame.addNextState(state14);
        }
    };
    state6.id = 6;
    state7.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state7.id = 7;
    state8.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state8.id = 8;
    state9.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state9.id = 9;
    state10.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state10.id = 10;
    state11.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state11.id = 11;
    state12.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state12.id = 12;
    state13.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state13.id = 13;
    state14.p = function(step, frame) {
        step.returnCall("SPACE", frame);
    };
    state14.id = 14;
    state15.p = function(step, frame) {
        var token = step.token;
        if (token === 47) {
            frame.addNextState(state16);
        }
    };
    state15.id = 15;
    state16.p = function(step, frame) {
        var token = step.token;
        if (token === 47) {
            frame.addNextState(state17);
        }
    };
    state16.id = 16;
    state17.p = function(step, frame) {
        var token = step.token;
        if (token <= 9) {
            frame.addNextState(state18);
        }
        if (token >= 11) {
            frame.addNextState(state19);
        }
    };
    state17.id = 17;
    state18.p = function(step, frame) {
        var token = step.token;
        if (token <= 9) {
            frame.addNextState(state18);
        }
        if (token >= 11) {
            frame.addNextState(state19);
        }
        step.startCall("COMMENT_END").addReturn(frame.context, state20);
    };
    state18.id = 18;
    state19.p = function(step, frame) {
        var token = step.token;
        if (token <= 9) {
            frame.addNextState(state18);
        }
        if (token >= 11) {
            frame.addNextState(state19);
        }
        step.startCall("COMMENT_END").addReturn(frame.context, state20);
    };
    state19.id = 19;
    state20.p = function(step, frame) {
        step.returnCall("COMMENT", frame);
    };
    state20.id = 20;
    state21.p = function(step, frame) {
        var token = step.token;
        if (token === 10) {
            frame.addNextState(state22);
        }
    };
    state21.id = 21;
    state22.p = function(step, frame) {
        step.returnCall("COMMENT_END", frame);
    };
    state22.id = 22;
    state23.p = function(step, frame) {
        step.startCall("SPACE").addReturn(frame.context, state24);
        step.startCall("COMMENT").addReturn(frame.context, state25);
    };
    state23.id = 23;
    state24.p = function(step, frame) {
        step.returnCall("IGN", frame);
    };
    state24.id = 24;
    state25.p = function(step, frame) {
        step.returnCall("IGN", frame);
    };
    state25.id = 25;
    state26.p = function(step, frame) {
        var token = step.token;
        if (token === 124) {
            frame.addNextState(state27);
        }
    };
    state26.id = 26;
    state27.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state28);
        step.returnCall("PIPE", frame);
    };
    state27.id = 27;
    state28.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state28);
        step.returnCall("PIPE", frame);
    };
    state28.id = 28;
    state29.p = function(step, frame) {
        step.addMark("parent", frame.context, state30);
        step.addMark("dblparent", frame.context, state31);
    };
    state29.id = 29;
    state30.p = function(step, frame) {
        var token = step.token;
        if (token === 94) {
            frame.addNextState(state32);
        }
    };
    state30.id = 30;
    state31.p = function(step, frame) {
        step.startCall("PARENT").addReturn(frame.context, state33);
    };
    state31.id = 31;
    state32.p = function(step, frame) {
        step.returnCall("PARENT", frame);
    };
    state32.id = 32;
    state33.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state34);
        }
    };
    state33.id = 33;
    state34.p = function(step, frame) {
        var token = step.token;
        if (token === 94) {
            frame.addNextState(state35);
        }
    };
    state34.id = 34;
    state35.p = function(step, frame) {
        step.returnCall("PARENT", frame);
    };
    state35.id = 35;
    state36.p = function(step, frame) {
        var token = step.token;
        if (token >= 97 && token <= 122) {
            frame.addNextState(state37);
        }
        if (token >= 65 && token <= 90) {
            frame.addNextState(state38);
        }
        if (token === 95) {
            frame.addNextState(state39);
        }
    };
    state36.id = 36;
    state37.p = function(step, frame) {
        step.returnCall("IDENT_FST", frame);
    };
    state37.id = 37;
    state38.p = function(step, frame) {
        step.returnCall("IDENT_FST", frame);
    };
    state38.id = 38;
    state39.p = function(step, frame) {
        step.returnCall("IDENT_FST", frame);
    };
    state39.id = 39;
    state40.p = function(step, frame) {
        var token = step.token;
        step.startCall("IDENT_FST").addReturn(frame.context, state41);
        if (token >= 48 && token <= 57) {
            frame.addNextState(state42);
        }
    };
    state40.id = 40;
    state41.p = function(step, frame) {
        step.returnCall("IDENT_REST", frame);
    };
    state41.id = 41;
    state42.p = function(step, frame) {
        step.returnCall("IDENT_REST", frame);
    };
    state42.id = 42;
    state43.p = function(step, frame) {
        step.startCall("IDENT_FST").addReturn(frame.context, state44);
    };
    state43.id = 43;
    state44.p = function(step, frame) {
        var token = step.token;
        step.startCall("IDENT_REST").addReturn(frame.context, state45);
        if ((token <= 96 || token >= 123) && (token <= 64 || token >= 91) && (token <= 47 || token >= 58)) step.returnCall("IDENT", frame);
    };
    state44.id = 44;
    state45.p = function(step, frame) {
        var token = step.token;
        step.startCall("IDENT_REST").addReturn(frame.context, state45);
        if ((token <= 96 || token >= 123) && (token <= 64 || token >= 91) && (token <= 47 || token >= 58)) step.returnCall("IDENT", frame);
    };
    state45.id = 45;
    state46.p = function(step, frame) {
        var token = step.token;
        if (token === 42) {
            frame.addNextState(state47);
        }
    };
    state46.id = 46;
    state47.p = function(step, frame) {
        var token = step.token;
        if (token <= 41 || token >= 43) step.returnCall("STAR", frame);
    };
    state47.id = 47;
    state48.p = function(step, frame) {
        var token = step.token;
        if (token === 61) {
            frame.addNextState(state49);
        }
        if (token === 33) {
            frame.addNextState(state50);
        }
        if (token === 62) {
            frame.addNextState(state51);
        }
        if (token === 62) {
            frame.addNextState(state52);
        }
        if (token === 60) {
            frame.addNextState(state53);
        }
        if (token === 60) {
            frame.addNextState(state54);
        }
        if (token === 105) {
            frame.addNextState(state55);
        }
        if (token === 109) {
            frame.addNextState(state56);
        }
    };
    state48.id = 48;
    state49.p = function(step, frame) {
        var token = step.token;
        if (token === 61) {
            frame.addNextState(state57);
        }
    };
    state49.id = 49;
    state50.p = function(step, frame) {
        var token = step.token;
        if (token === 61) {
            frame.addNextState(state58);
        }
    };
    state50.id = 50;
    state51.p = function(step, frame) {
        var token = step.token;
        if (token === 61) {
            frame.addNextState(state59);
        }
    };
    state51.id = 51;
    state52.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state52.id = 52;
    state53.p = function(step, frame) {
        var token = step.token;
        if (token === 61) {
            frame.addNextState(state60);
        }
    };
    state53.id = 53;
    state54.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state54.id = 54;
    state55.p = function(step, frame) {
        var token = step.token;
        if (token === 110) {
            frame.addNextState(state61);
        }
    };
    state55.id = 55;
    state56.p = function(step, frame) {
        var token = step.token;
        if (token === 97) {
            frame.addNextState(state62);
        }
    };
    state56.id = 56;
    state57.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state57.id = 57;
    state58.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state58.id = 58;
    state59.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state59.id = 59;
    state60.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state60.id = 60;
    state61.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state61.id = 61;
    state62.p = function(step, frame) {
        var token = step.token;
        if (token === 116) {
            frame.addNextState(state63);
        }
    };
    state62.id = 62;
    state63.p = function(step, frame) {
        var token = step.token;
        if (token === 99) {
            frame.addNextState(state64);
        }
    };
    state63.id = 63;
    state64.p = function(step, frame) {
        var token = step.token;
        if (token === 104) {
            frame.addNextState(state65);
        }
    };
    state64.id = 64;
    state65.p = function(step, frame) {
        step.returnCall("COMP_OP", frame);
    };
    state65.id = 65;
    state66.p = function(step, frame) {
        step.addMark("func_call", frame.context, state67);
    };
    state66.id = 66;
    state67.p = function(step, frame) {
        step.startCall("IDENT").addReturn(frame.context, state68);
    };
    state67.id = 67;
    state68.p = function(step, frame) {
        step.addMark("func_name_end", frame.context, state69);
    };
    state68.id = 68;
    state69.p = function(step, frame) {
        var token = step.token;
        if (token === 40) {
            frame.addNextState(state70);
        }
    };
    state69.id = 69;
    state70.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state71);
        step.startCall("FUNC_ARGS").addReturn(frame.context, state72);
        step.addMark("func_args_end", frame.context, state73);
    };
    state70.id = 70;
    state71.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state71);
        step.startCall("FUNC_ARGS").addReturn(frame.context, state72);
        step.addMark("func_args_end", frame.context, state73);
    };
    state71.id = 71;
    state72.p = function(step, frame) {
        step.addMark("func_args_end", frame.context, state73);
    };
    state72.id = 72;
    state73.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state74);
        if (token === 41) {
            frame.addNextState(state75);
        }
    };
    state73.id = 73;
    state74.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state74);
        if (token === 41) {
            frame.addNextState(state75);
        }
    };
    state74.id = 74;
    state75.p = function(step, frame) {
        step.returnCall("FUNC_CALL", frame);
    };
    state75.id = 75;
    state76.p = function(step, frame) {
        step.startCall("EXPR^1").addReturn(frame.context, state77);
    };
    state76.id = 76;
    state77.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state78);
        if (token === 44) {
            frame.addNextState(state80);
        }
        step.returnCall("FUNC_ARGS", frame);
    };
    state77.id = 77;
    state78.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state78);
        if (token === 44) {
            frame.addNextState(state80);
        }
        step.returnCall("FUNC_ARGS", frame);
    };
    state78.id = 78;
    state79.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state79);
        step.startCall("EXPR^1").addReturn(frame.context, state81);
    };
    state79.id = 79;
    state80.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state79);
        step.startCall("EXPR^1").addReturn(frame.context, state81);
    };
    state80.id = 80;
    state81.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state82);
        if (token === 44) {
            frame.addNextState(state80);
        }
        step.returnCall("FUNC_ARGS", frame);
    };
    state81.id = 81;
    state82.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state82);
        if (token === 44) {
            frame.addNextState(state80);
        }
        step.returnCall("FUNC_ARGS", frame);
    };
    state82.id = 82;
    state83.p = function(step, frame) {
        step.addMark("sci", frame.context, state84);
        step.addMark("float", frame.context, state85);
        step.addMark("integer", frame.context, state86);
    };
    state83.id = 83;
    state84.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state87);
    };
    state84.id = 84;
    state85.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state95);
    };
    state85.id = 85;
    state86.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state99);
    };
    state86.id = 86;
    state87.p = function(step, frame) {
        var token = step.token;
        step.startCall("DIGIT").addReturn(frame.context, state87);
        if (token === 46) {
            frame.addNextState(state89);
        }
        if (token === 101) {
            frame.addNextState(state90);
        }
        if (token === 69) {
            frame.addNextState(state91);
        }
    };
    state87.id = 87;
    state88.p = function(step, frame) {
        var token = step.token;
        step.startCall("DIGIT").addReturn(frame.context, state88);
        if (token === 101) {
            frame.addNextState(state90);
        }
        if (token === 69) {
            frame.addNextState(state91);
        }
    };
    state88.id = 88;
    state89.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state88);
    };
    state89.id = 89;
    state90.p = function(step, frame) {
        step.startCall("SIGN").addReturn(frame.context, state92);
        step.startCall("DIGIT").addReturn(frame.context, state93);
    };
    state90.id = 90;
    state91.p = function(step, frame) {
        step.startCall("SIGN").addReturn(frame.context, state92);
        step.startCall("DIGIT").addReturn(frame.context, state93);
    };
    state91.id = 91;
    state92.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state93);
    };
    state92.id = 92;
    state93.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state93);
        step.addMark("sci_end", frame.context, state94);
    };
    state93.id = 93;
    state94.p = function(step, frame) {
        step.returnCall("NUMBER", frame);
    };
    state94.id = 94;
    state95.p = function(step, frame) {
        var token = step.token;
        step.startCall("DIGIT").addReturn(frame.context, state95);
        if (token === 46) {
            frame.addNextState(state96);
        }
    };
    state95.id = 95;
    state96.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state97);
    };
    state96.id = 96;
    state97.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state97);
        step.addMark("float_end", frame.context, state98);
    };
    state97.id = 97;
    state98.p = function(step, frame) {
        step.returnCall("NUMBER", frame);
    };
    state98.id = 98;
    state99.p = function(step, frame) {
        step.startCall("DIGIT").addReturn(frame.context, state99);
        step.addMark("integer_end", frame.context, state100);
    };
    state99.id = 99;
    state100.p = function(step, frame) {
        step.returnCall("NUMBER", frame);
    };
    state100.id = 100;
    state101.p = function(step, frame) {
        var token = step.token;
        if (token >= 48 && token <= 57) {
            frame.addNextState(state102);
        }
    };
    state101.id = 101;
    state102.p = function(step, frame) {
        step.returnCall("DIGIT", frame);
    };
    state102.id = 102;
    state103.p = function(step, frame) {
        var token = step.token;
        if (token === 43) {
            frame.addNextState(state104);
        }
        if (token === 45) {
            frame.addNextState(state105);
        }
    };
    state103.id = 103;
    state104.p = function(step, frame) {
        step.returnCall("SIGN", frame);
    };
    state104.id = 104;
    state105.p = function(step, frame) {
        step.returnCall("SIGN", frame);
    };
    state105.id = 105;
    state106.p = function(step, frame) {
        var token = step.token;
        if (token === 34) {
            frame.addNextState(state107);
        }
        if (token === 39) {
            frame.addNextState(state108);
        }
    };
    state106.id = 106;
    state107.p = function(step, frame) {
        step.addMark("str_begin", frame.context, state109);
    };
    state107.id = 107;
    state108.p = function(step, frame) {
        step.addMark("str_begin", frame.context, state113);
    };
    state108.id = 108;
    state109.p = function(step, frame) {
        step.startCall("DSTRING_CHAR").addReturn(frame.context, state110);
        step.addMark("str_end", frame.context, state111);
    };
    state109.id = 109;
    state110.p = function(step, frame) {
        step.startCall("DSTRING_CHAR").addReturn(frame.context, state110);
        step.addMark("str_end", frame.context, state111);
    };
    state110.id = 110;
    state111.p = function(step, frame) {
        var token = step.token;
        if (token === 34) {
            frame.addNextState(state112);
        }
    };
    state111.id = 111;
    state112.p = function(step, frame) {
        step.returnCall("STRING", frame);
    };
    state112.id = 112;
    state113.p = function(step, frame) {
        step.startCall("SSTRING_CHAR").addReturn(frame.context, state114);
        step.addMark("str_end", frame.context, state115);
    };
    state113.id = 113;
    state114.p = function(step, frame) {
        step.startCall("SSTRING_CHAR").addReturn(frame.context, state114);
        step.addMark("str_end", frame.context, state115);
    };
    state114.id = 114;
    state115.p = function(step, frame) {
        var token = step.token;
        if (token === 39) {
            frame.addNextState(state116);
        }
    };
    state115.id = 115;
    state116.p = function(step, frame) {
        step.returnCall("STRING", frame);
    };
    state116.id = 116;
    state117.p = function(step, frame) {
        var token = step.token;
        if (token === 92) {
            frame.addNextState(state118);
        }
        if ((token <= 33 || token >= 35) && (token <= 91 || token >= 93)) {
            frame.addNextState(state119);
        }
    };
    state117.id = 117;
    state118.p = function(step, frame) {
        {
            frame.addNextState(state120);
        }
    };
    state118.id = 118;
    state119.p = function(step, frame) {
        step.returnCall("DSTRING_CHAR", frame);
    };
    state119.id = 119;
    state120.p = function(step, frame) {
        step.returnCall("DSTRING_CHAR", frame);
    };
    state120.id = 120;
    state121.p = function(step, frame) {
        var token = step.token;
        if (token === 92) {
            frame.addNextState(state122);
        }
        if ((token <= 38 || token >= 40) && (token <= 91 || token >= 93)) {
            frame.addNextState(state123);
        }
    };
    state121.id = 121;
    state122.p = function(step, frame) {
        {
            frame.addNextState(state124);
        }
    };
    state122.id = 122;
    state123.p = function(step, frame) {
        step.returnCall("SSTRING_CHAR", frame);
    };
    state123.id = 123;
    state124.p = function(step, frame) {
        step.returnCall("SSTRING_CHAR", frame);
    };
    state124.id = 124;
    state125.p = function(step, frame) {
        step.addMark("array", frame.context, state126);
    };
    state125.id = 125;
    state126.p = function(step, frame) {
        var token = step.token;
        if (token === 91) {
            frame.addNextState(state127);
        }
    };
    state126.id = 126;
    state127.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state128);
        step.startCall("ARRAY_ELEMENT").addReturn(frame.context, state130);
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state127.id = 127;
    state128.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state128);
        step.startCall("ARRAY_ELEMENT").addReturn(frame.context, state130);
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state128.id = 128;
    state129.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state129);
        if (token === 44) {
            frame.addNextState(state132);
        }
        if (token === 44) {
            frame.addNextState(state136);
        }
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state129.id = 129;
    state130.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state129);
        if (token === 44) {
            frame.addNextState(state132);
        }
        if (token === 44) {
            frame.addNextState(state136);
        }
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state130.id = 130;
    state131.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state131);
        step.startCall("ARRAY_ELEMENT").addReturn(frame.context, state133);
    };
    state131.id = 131;
    state132.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state131);
        step.startCall("ARRAY_ELEMENT").addReturn(frame.context, state133);
    };
    state132.id = 132;
    state133.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state134);
        if (token === 44) {
            frame.addNextState(state132);
        }
        if (token === 44) {
            frame.addNextState(state136);
        }
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state133.id = 133;
    state134.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state134);
        if (token === 44) {
            frame.addNextState(state132);
        }
        if (token === 44) {
            frame.addNextState(state136);
        }
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state134.id = 134;
    state135.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state135);
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state135.id = 135;
    state136.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state135);
        if (token === 93) {
            frame.addNextState(state137);
        }
    };
    state136.id = 136;
    state137.p = function(step, frame) {
        step.addMark("array_end", frame.context, state138);
    };
    state137.id = 137;
    state138.p = function(step, frame) {
        step.returnCall("ARRAY", frame);
    };
    state138.id = 138;
    state139.p = function(step, frame) {
        step.addMark("array_splat", frame.context, state140);
        step.startCall("EXPR^1").addReturn(frame.context, state141);
    };
    state139.id = 139;
    state140.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state142);
        }
    };
    state140.id = 140;
    state141.p = function(step, frame) {
        step.returnCall("ARRAY_ELEMENT", frame);
    };
    state141.id = 141;
    state142.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state143);
        }
    };
    state142.id = 142;
    state143.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state144);
        }
    };
    state143.id = 143;
    state144.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state145);
        step.startCall("EXPR^1").addReturn(frame.context, state141);
    };
    state144.id = 144;
    state145.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state145);
        step.startCall("EXPR^1").addReturn(frame.context, state141);
    };
    state145.id = 145;
    state146.p = function(step, frame) {
        step.addMark("object", frame.context, state147);
    };
    state146.id = 146;
    state147.p = function(step, frame) {
        var token = step.token;
        if (token === 123) {
            frame.addNextState(state148);
        }
    };
    state147.id = 147;
    state148.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state149);
        step.startCall("OBJECT_PAIR").addReturn(frame.context, state151);
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state148.id = 148;
    state149.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state149);
        step.startCall("OBJECT_PAIR").addReturn(frame.context, state151);
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state149.id = 149;
    state150.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state150);
        if (token === 44) {
            frame.addNextState(state153);
        }
        if (token === 44) {
            frame.addNextState(state157);
        }
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state150.id = 150;
    state151.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state150);
        if (token === 44) {
            frame.addNextState(state153);
        }
        if (token === 44) {
            frame.addNextState(state157);
        }
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state151.id = 151;
    state152.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state152);
        step.startCall("OBJECT_PAIR").addReturn(frame.context, state154);
    };
    state152.id = 152;
    state153.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state152);
        step.startCall("OBJECT_PAIR").addReturn(frame.context, state154);
    };
    state153.id = 153;
    state154.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state155);
        if (token === 44) {
            frame.addNextState(state153);
        }
        if (token === 44) {
            frame.addNextState(state157);
        }
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state154.id = 154;
    state155.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state155);
        if (token === 44) {
            frame.addNextState(state153);
        }
        if (token === 44) {
            frame.addNextState(state157);
        }
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state155.id = 155;
    state156.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state156);
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state156.id = 156;
    state157.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state156);
        if (token === 125) {
            frame.addNextState(state158);
        }
    };
    state157.id = 157;
    state158.p = function(step, frame) {
        step.addMark("object_end", frame.context, state159);
    };
    state158.id = 158;
    state159.p = function(step, frame) {
        step.returnCall("OBJECT", frame);
    };
    state159.id = 159;
    state160.p = function(step, frame) {
        step.addMark("object_pair", frame.context, state161);
        step.addMark("object_expr", frame.context, state162);
        step.addMark("object_splat_this", frame.context, state163);
        step.addMark("object_splat", frame.context, state164);
    };
    state160.id = 160;
    state161.p = function(step, frame) {
        step.startCall("STRING").addReturn(frame.context, state165);
    };
    state161.id = 161;
    state162.p = function(step, frame) {
        step.startCall("EXPR^1").addReturn(frame.context, state170);
    };
    state162.id = 162;
    state163.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state171);
        }
    };
    state163.id = 163;
    state164.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state174);
        }
    };
    state164.id = 164;
    state165.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state166);
        if (token === 58) {
            frame.addNextState(state167);
        }
    };
    state165.id = 165;
    state166.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state166);
        if (token === 58) {
            frame.addNextState(state167);
        }
    };
    state166.id = 166;
    state167.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state168);
        step.startCall("EXPR^1").addReturn(frame.context, state169);
    };
    state167.id = 167;
    state168.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state168);
        step.startCall("EXPR^1").addReturn(frame.context, state169);
    };
    state168.id = 168;
    state169.p = function(step, frame) {
        step.returnCall("OBJECT_PAIR", frame);
    };
    state169.id = 169;
    state170.p = function(step, frame) {
        step.returnCall("OBJECT_PAIR", frame);
    };
    state170.id = 170;
    state171.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state172);
        }
    };
    state171.id = 171;
    state172.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state173);
        }
    };
    state172.id = 172;
    state173.p = function(step, frame) {
        step.returnCall("OBJECT_PAIR", frame);
    };
    state173.id = 173;
    state174.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state175);
        }
    };
    state174.id = 174;
    state175.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state176);
        }
    };
    state175.id = 175;
    state176.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state177);
        step.startCall("EXPR^1").addReturn(frame.context, state178);
    };
    state176.id = 176;
    state177.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state177);
        step.startCall("EXPR^1").addReturn(frame.context, state178);
    };
    state177.id = 177;
    state178.p = function(step, frame) {
        step.returnCall("OBJECT_PAIR", frame);
    };
    state178.id = 178;
    state179.p = function(step, frame) {
        step.addMark("pair", frame.context, state180);
        step.startCall("EXPR^2").addReturn(frame.context, state181);
    };
    state179.id = 179;
    state180.p = function(step, frame) {
        step.startCall("EXPR^2").addReturn(frame.context, state182);
    };
    state180.id = 180;
    state181.p = function(step, frame) {
        step.returnCall("EXPR^1", frame);
    };
    state181.id = 181;
    state182.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state183);
        if (token === 61) {
            frame.addNextState(state184);
        }
    };
    state182.id = 182;
    state183.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state183);
        if (token === 61) {
            frame.addNextState(state184);
        }
    };
    state183.id = 183;
    state184.p = function(step, frame) {
        var token = step.token;
        if (token === 62) {
            frame.addNextState(state185);
        }
    };
    state184.id = 184;
    state185.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state186);
        step.startCall("EXPR^2").addReturn(frame.context, state187);
    };
    state185.id = 185;
    state186.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state186);
        step.startCall("EXPR^2").addReturn(frame.context, state187);
    };
    state186.id = 186;
    state187.p = function(step, frame) {
        step.returnCall("EXPR^1", frame);
    };
    state187.id = 187;
    state188.p = function(step, frame) {
        step.addMark("or", frame.context, state189);
        step.startCall("EXPR^3").addReturn(frame.context, state190);
    };
    state188.id = 188;
    state189.p = function(step, frame) {
        step.startCall("EXPR^2").addReturn(frame.context, state191);
    };
    state189.id = 189;
    state190.p = function(step, frame) {
        step.returnCall("EXPR^2", frame);
    };
    state190.id = 190;
    state191.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state192);
        if (token === 124) {
            frame.addNextState(state193);
        }
    };
    state191.id = 191;
    state192.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state192);
        if (token === 124) {
            frame.addNextState(state193);
        }
    };
    state192.id = 192;
    state193.p = function(step, frame) {
        var token = step.token;
        if (token === 124) {
            frame.addNextState(state194);
        }
    };
    state193.id = 193;
    state194.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state195);
        step.startCall("EXPR^3").addReturn(frame.context, state196);
    };
    state194.id = 194;
    state195.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state195);
        step.startCall("EXPR^3").addReturn(frame.context, state196);
    };
    state195.id = 195;
    state196.p = function(step, frame) {
        step.returnCall("EXPR^2", frame);
    };
    state196.id = 196;
    state197.p = function(step, frame) {
        step.addMark("and", frame.context, state198);
        step.startCall("EXPR^4").addReturn(frame.context, state199);
    };
    state197.id = 197;
    state198.p = function(step, frame) {
        step.startCall("EXPR^3").addReturn(frame.context, state200);
    };
    state198.id = 198;
    state199.p = function(step, frame) {
        step.returnCall("EXPR^3", frame);
    };
    state199.id = 199;
    state200.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state201);
        if (token === 38) {
            frame.addNextState(state202);
        }
    };
    state200.id = 200;
    state201.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state201);
        if (token === 38) {
            frame.addNextState(state202);
        }
    };
    state201.id = 201;
    state202.p = function(step, frame) {
        var token = step.token;
        if (token === 38) {
            frame.addNextState(state203);
        }
    };
    state202.id = 202;
    state203.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state204);
        step.startCall("EXPR^4").addReturn(frame.context, state205);
    };
    state203.id = 203;
    state204.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state204);
        step.startCall("EXPR^4").addReturn(frame.context, state205);
    };
    state204.id = 204;
    state205.p = function(step, frame) {
        step.returnCall("EXPR^3", frame);
    };
    state205.id = 205;
    state206.p = function(step, frame) {
        step.addMark("comp", frame.context, state207);
        step.addMark("asc", frame.context, state208);
        step.addMark("desc", frame.context, state209);
        step.startCall("EXPR^5").addReturn(frame.context, state210);
    };
    state206.id = 206;
    state207.p = function(step, frame) {
        step.startCall("EXPR^5").addReturn(frame.context, state211);
    };
    state207.id = 207;
    state208.p = function(step, frame) {
        step.startCall("EXPR^4").addReturn(frame.context, state218);
    };
    state208.id = 208;
    state209.p = function(step, frame) {
        step.startCall("EXPR^4").addReturn(frame.context, state223);
    };
    state209.id = 209;
    state210.p = function(step, frame) {
        step.returnCall("EXPR^4", frame);
    };
    state210.id = 210;
    state211.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state212);
        step.addMark("op", frame.context, state213);
    };
    state211.id = 211;
    state212.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state212);
        step.addMark("op", frame.context, state213);
    };
    state212.id = 212;
    state213.p = function(step, frame) {
        step.startCall("COMP_OP").addReturn(frame.context, state214);
    };
    state213.id = 213;
    state214.p = function(step, frame) {
        step.addMark("end", frame.context, state215);
    };
    state214.id = 214;
    state215.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state216);
        step.startCall("EXPR^5").addReturn(frame.context, state217);
    };
    state215.id = 215;
    state216.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state216);
        step.startCall("EXPR^5").addReturn(frame.context, state217);
    };
    state216.id = 216;
    state217.p = function(step, frame) {
        step.returnCall("EXPR^4", frame);
    };
    state217.id = 217;
    state218.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state219);
        if (token === 97) {
            frame.addNextState(state220);
        }
    };
    state218.id = 218;
    state219.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state219);
        if (token === 97) {
            frame.addNextState(state220);
        }
    };
    state219.id = 219;
    state220.p = function(step, frame) {
        var token = step.token;
        if (token === 115) {
            frame.addNextState(state221);
        }
    };
    state220.id = 220;
    state221.p = function(step, frame) {
        var token = step.token;
        if (token === 99) {
            frame.addNextState(state222);
        }
    };
    state221.id = 221;
    state222.p = function(step, frame) {
        step.returnCall("EXPR^4", frame);
    };
    state222.id = 222;
    state223.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state224);
        if (token === 100) {
            frame.addNextState(state225);
        }
    };
    state223.id = 223;
    state224.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state224);
        if (token === 100) {
            frame.addNextState(state225);
        }
    };
    state224.id = 224;
    state225.p = function(step, frame) {
        var token = step.token;
        if (token === 101) {
            frame.addNextState(state226);
        }
    };
    state225.id = 225;
    state226.p = function(step, frame) {
        var token = step.token;
        if (token === 115) {
            frame.addNextState(state227);
        }
    };
    state226.id = 226;
    state227.p = function(step, frame) {
        var token = step.token;
        if (token === 99) {
            frame.addNextState(state228);
        }
    };
    state227.id = 227;
    state228.p = function(step, frame) {
        step.returnCall("EXPR^4", frame);
    };
    state228.id = 228;
    state229.p = function(step, frame) {
        step.addMark("inc_range", frame.context, state230);
        step.addMark("exc_range", frame.context, state231);
        step.startCall("EXPR^6").addReturn(frame.context, state232);
    };
    state229.id = 229;
    state230.p = function(step, frame) {
        step.startCall("EXPR^6").addReturn(frame.context, state233);
    };
    state230.id = 230;
    state231.p = function(step, frame) {
        step.startCall("EXPR^6").addReturn(frame.context, state239);
    };
    state231.id = 231;
    state232.p = function(step, frame) {
        step.returnCall("EXPR^5", frame);
    };
    state232.id = 232;
    state233.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state234);
        if (token === 46) {
            frame.addNextState(state235);
        }
    };
    state233.id = 233;
    state234.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state234);
        if (token === 46) {
            frame.addNextState(state235);
        }
    };
    state234.id = 234;
    state235.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state236);
        }
    };
    state235.id = 235;
    state236.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state237);
        step.startCall("EXPR^6").addReturn(frame.context, state238);
    };
    state236.id = 236;
    state237.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state237);
        step.startCall("EXPR^6").addReturn(frame.context, state238);
    };
    state237.id = 237;
    state238.p = function(step, frame) {
        step.returnCall("EXPR^5", frame);
    };
    state238.id = 238;
    state239.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state240);
        if (token === 46) {
            frame.addNextState(state241);
        }
    };
    state239.id = 239;
    state240.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state240);
        if (token === 46) {
            frame.addNextState(state241);
        }
    };
    state240.id = 240;
    state241.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state242);
        }
    };
    state241.id = 241;
    state242.p = function(step, frame) {
        var token = step.token;
        if (token === 46) {
            frame.addNextState(state243);
        }
    };
    state242.id = 242;
    state243.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state244);
        step.startCall("EXPR^6").addReturn(frame.context, state245);
    };
    state243.id = 243;
    state244.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state244);
        step.startCall("EXPR^6").addReturn(frame.context, state245);
    };
    state244.id = 244;
    state245.p = function(step, frame) {
        step.returnCall("EXPR^5", frame);
    };
    state245.id = 245;
    state246.p = function(step, frame) {
        step.addMark("add", frame.context, state247);
        step.addMark("sub", frame.context, state248);
        step.startCall("EXPR^7").addReturn(frame.context, state249);
    };
    state246.id = 246;
    state247.p = function(step, frame) {
        step.startCall("EXPR^6").addReturn(frame.context, state250);
    };
    state247.id = 247;
    state248.p = function(step, frame) {
        step.startCall("EXPR^6").addReturn(frame.context, state255);
    };
    state248.id = 248;
    state249.p = function(step, frame) {
        step.returnCall("EXPR^6", frame);
    };
    state249.id = 249;
    state250.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state251);
        if (token === 43) {
            frame.addNextState(state252);
        }
    };
    state250.id = 250;
    state251.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state251);
        if (token === 43) {
            frame.addNextState(state252);
        }
    };
    state251.id = 251;
    state252.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state253);
        step.startCall("EXPR^7").addReturn(frame.context, state254);
    };
    state252.id = 252;
    state253.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state253);
        step.startCall("EXPR^7").addReturn(frame.context, state254);
    };
    state253.id = 253;
    state254.p = function(step, frame) {
        step.returnCall("EXPR^6", frame);
    };
    state254.id = 254;
    state255.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state256);
        if (token === 45) {
            frame.addNextState(state257);
        }
    };
    state255.id = 255;
    state256.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state256);
        if (token === 45) {
            frame.addNextState(state257);
        }
    };
    state256.id = 256;
    state257.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state258);
        step.startCall("EXPR^7").addReturn(frame.context, state259);
    };
    state257.id = 257;
    state258.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state258);
        step.startCall("EXPR^7").addReturn(frame.context, state259);
    };
    state258.id = 258;
    state259.p = function(step, frame) {
        step.returnCall("EXPR^6", frame);
    };
    state259.id = 259;
    state260.p = function(step, frame) {
        step.addMark("mul", frame.context, state261);
        step.addMark("div", frame.context, state262);
        step.addMark("mod", frame.context, state263);
        step.startCall("EXPR^9").addReturn(frame.context, state264);
    };
    state260.id = 260;
    state261.p = function(step, frame) {
        step.startCall("EXPR^7").addReturn(frame.context, state265);
    };
    state261.id = 261;
    state262.p = function(step, frame) {
        step.startCall("EXPR^7").addReturn(frame.context, state270);
    };
    state262.id = 262;
    state263.p = function(step, frame) {
        step.startCall("EXPR^7").addReturn(frame.context, state275);
    };
    state263.id = 263;
    state264.p = function(step, frame) {
        step.returnCall("EXPR^7", frame);
    };
    state264.id = 264;
    state265.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state266);
        step.startCall("STAR").addReturn(frame.context, state267);
    };
    state265.id = 265;
    state266.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state266);
        step.startCall("STAR").addReturn(frame.context, state267);
    };
    state266.id = 266;
    state267.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state268);
        step.startCall("EXPR^9").addReturn(frame.context, state269);
    };
    state267.id = 267;
    state268.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state268);
        step.startCall("EXPR^9").addReturn(frame.context, state269);
    };
    state268.id = 268;
    state269.p = function(step, frame) {
        step.returnCall("EXPR^7", frame);
    };
    state269.id = 269;
    state270.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state271);
        if (token === 47) {
            frame.addNextState(state272);
        }
    };
    state270.id = 270;
    state271.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state271);
        if (token === 47) {
            frame.addNextState(state272);
        }
    };
    state271.id = 271;
    state272.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state273);
        step.startCall("EXPR^9").addReturn(frame.context, state274);
    };
    state272.id = 272;
    state273.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state273);
        step.startCall("EXPR^9").addReturn(frame.context, state274);
    };
    state273.id = 273;
    state274.p = function(step, frame) {
        step.returnCall("EXPR^7", frame);
    };
    state274.id = 274;
    state275.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state276);
        if (token === 37) {
            frame.addNextState(state277);
        }
    };
    state275.id = 275;
    state276.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state276);
        if (token === 37) {
            frame.addNextState(state277);
        }
    };
    state276.id = 276;
    state277.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state278);
        step.startCall("EXPR^9").addReturn(frame.context, state279);
    };
    state277.id = 277;
    state278.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state278);
        step.startCall("EXPR^9").addReturn(frame.context, state279);
    };
    state278.id = 278;
    state279.p = function(step, frame) {
        step.returnCall("EXPR^7", frame);
    };
    state279.id = 279;
    state280.p = function(step, frame) {
        step.addMark("pow", frame.context, state281);
        step.startCall("EXPR^11").addReturn(frame.context, state282);
    };
    state280.id = 280;
    state281.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state283);
    };
    state281.id = 281;
    state282.p = function(step, frame) {
        step.returnCall("EXPR^9", frame);
    };
    state282.id = 282;
    state283.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state284);
        if (token === 42) {
            frame.addNextState(state285);
        }
    };
    state283.id = 283;
    state284.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state284);
        if (token === 42) {
            frame.addNextState(state285);
        }
    };
    state284.id = 284;
    state285.p = function(step, frame) {
        var token = step.token;
        if (token === 42) {
            frame.addNextState(state286);
        }
    };
    state285.id = 285;
    state286.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state287);
        step.startCall("EXPR^9").addReturn(frame.context, state288);
    };
    state286.id = 286;
    state287.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state287);
        step.startCall("EXPR^9").addReturn(frame.context, state288);
    };
    state287.id = 287;
    state288.p = function(step, frame) {
        step.returnCall("EXPR^9", frame);
    };
    state288.id = 288;
    state289.p = function(step, frame) {
        var token = step.token;
        step.startCall("NUMBER").addReturn(frame.context, state290);
        step.startCall("STRING").addReturn(frame.context, state291);
        step.startCall("ARRAY").addReturn(frame.context, state292);
        step.startCall("OBJECT").addReturn(frame.context, state293);
        step.addMark("star", frame.context, state294);
        step.addMark("this", frame.context, state295);
        step.startCall("PARENT").addReturn(frame.context, state296);
        step.addMark("paren", frame.context, state297);
        if (token === 36) {
            frame.addNextState(state298);
        }
        step.addMark("ident", frame.context, state299);
        step.startCall("FUNC_CALL").addReturn(frame.context, state300);
        step.addMark("neg", frame.context, state301);
        step.addMark("pos", frame.context, state302);
        step.addMark("not", frame.context, state303);
        if (token === 105) {
            frame.addNextState(state304);
        }
        step.addMark("deref", frame.context, state305);
        step.addMark("attr_cond", frame.context, state306);
        step.addMark("attr_ident", frame.context, state307);
        step.addMark("pipecall", frame.context, state308);
        step.addMark("project", frame.context, state309);
        step.addMark("filter", frame.context, state310);
        step.addMark("arr_expr", frame.context, state311);
    };
    state289.id = 289;
    state290.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state290.id = 290;
    state291.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state291.id = 291;
    state292.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state292.id = 292;
    state293.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state293.id = 293;
    state294.p = function(step, frame) {
        step.startCall("STAR").addReturn(frame.context, state312);
    };
    state294.id = 294;
    state295.p = function(step, frame) {
        var token = step.token;
        if (token === 64) {
            frame.addNextState(state313);
        }
    };
    state295.id = 295;
    state296.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state296.id = 296;
    state297.p = function(step, frame) {
        var token = step.token;
        if (token === 40) {
            frame.addNextState(state314);
        }
    };
    state297.id = 297;
    state298.p = function(step, frame) {
        step.addMark("param", frame.context, state319);
    };
    state298.id = 298;
    state299.p = function(step, frame) {
        step.startCall("IDENT").addReturn(frame.context, state322);
    };
    state299.id = 299;
    state300.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state300.id = 300;
    state301.p = function(step, frame) {
        var token = step.token;
        if (token === 45) {
            frame.addNextState(state324);
        }
    };
    state301.id = 301;
    state302.p = function(step, frame) {
        var token = step.token;
        if (token === 43) {
            frame.addNextState(state327);
        }
    };
    state302.id = 302;
    state303.p = function(step, frame) {
        var token = step.token;
        if (token === 33) {
            frame.addNextState(state330);
        }
    };
    state303.id = 303;
    state304.p = function(step, frame) {
        var token = step.token;
        if (token === 115) {
            frame.addNextState(state333);
        }
    };
    state304.id = 304;
    state305.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state336);
    };
    state305.id = 305;
    state306.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state343);
    };
    state306.id = 306;
    state307.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state352);
    };
    state307.id = 307;
    state308.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state358);
    };
    state308.id = 308;
    state309.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state362);
    };
    state309.id = 309;
    state310.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state366);
    };
    state310.id = 310;
    state311.p = function(step, frame) {
        step.startCall("EXPR^11").addReturn(frame.context, state374);
    };
    state311.id = 311;
    state312.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state312.id = 312;
    state313.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state313.id = 313;
    state314.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state315);
        step.startCall("EXPR^1").addReturn(frame.context, state316);
    };
    state314.id = 314;
    state315.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state315);
        step.startCall("EXPR^1").addReturn(frame.context, state316);
    };
    state315.id = 315;
    state316.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state317);
        if (token === 41) {
            frame.addNextState(state318);
        }
    };
    state316.id = 316;
    state317.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state317);
        if (token === 41) {
            frame.addNextState(state318);
        }
    };
    state317.id = 317;
    state318.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state318.id = 318;
    state319.p = function(step, frame) {
        step.startCall("IDENT").addReturn(frame.context, state320);
    };
    state319.id = 319;
    state320.p = function(step, frame) {
        step.addMark("param_end", frame.context, state321);
    };
    state320.id = 320;
    state321.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state321.id = 321;
    state322.p = function(step, frame) {
        step.addMark("ident_end", frame.context, state323);
    };
    state322.id = 322;
    state323.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state323.id = 323;
    state324.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state325);
        step.startCall("EXPR^9").addReturn(frame.context, state326);
    };
    state324.id = 324;
    state325.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state325);
        step.startCall("EXPR^9").addReturn(frame.context, state326);
    };
    state325.id = 325;
    state326.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state326.id = 326;
    state327.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state328);
        step.startCall("EXPR^11").addReturn(frame.context, state329);
    };
    state327.id = 327;
    state328.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state328);
        step.startCall("EXPR^11").addReturn(frame.context, state329);
    };
    state328.id = 328;
    state329.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state329.id = 329;
    state330.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state331);
        step.startCall("EXPR^11").addReturn(frame.context, state332);
    };
    state330.id = 330;
    state331.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state331);
        step.startCall("EXPR^11").addReturn(frame.context, state332);
    };
    state331.id = 331;
    state332.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state332.id = 332;
    state333.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state334);
        step.startCall("EXPR^11").addReturn(frame.context, state335);
    };
    state333.id = 333;
    state334.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state334);
        step.startCall("EXPR^11").addReturn(frame.context, state335);
    };
    state334.id = 334;
    state335.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state335.id = 335;
    state336.p = function(step, frame) {
        var token = step.token;
        if (token === 45) {
            frame.addNextState(state337);
        }
    };
    state336.id = 336;
    state337.p = function(step, frame) {
        var token = step.token;
        if (token === 62) {
            frame.addNextState(state338);
        }
    };
    state337.id = 337;
    state338.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state339);
        step.addMark("deref_field", frame.context, state340);
        step.returnCall("EXPR^11", frame);
    };
    state338.id = 338;
    state339.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state339);
        step.addMark("deref_field", frame.context, state340);
    };
    state339.id = 339;
    state340.p = function(step, frame) {
        step.startCall("IDENT").addReturn(frame.context, state341);
    };
    state340.id = 340;
    state341.p = function(step, frame) {
        step.addMark("end", frame.context, state342);
    };
    state341.id = 341;
    state342.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state342.id = 342;
    state343.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state344);
        if (token === 46) {
            frame.addNextState(state345);
        }
    };
    state343.id = 343;
    state344.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state344);
        if (token === 46) {
            frame.addNextState(state345);
        }
    };
    state344.id = 344;
    state345.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state346);
        if (token === 91) {
            frame.addNextState(state347);
        }
    };
    state345.id = 345;
    state346.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state346);
        if (token === 91) {
            frame.addNextState(state347);
        }
    };
    state346.id = 346;
    state347.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state348);
        step.startCall("EXPR^1").addReturn(frame.context, state349);
    };
    state347.id = 347;
    state348.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state348);
        step.startCall("EXPR^1").addReturn(frame.context, state349);
    };
    state348.id = 348;
    state349.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state350);
        if (token === 93) {
            frame.addNextState(state351);
        }
    };
    state349.id = 349;
    state350.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state350);
        if (token === 93) {
            frame.addNextState(state351);
        }
    };
    state350.id = 350;
    state351.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state351.id = 351;
    state352.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state353);
        if (token === 46) {
            frame.addNextState(state354);
        }
    };
    state352.id = 352;
    state353.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state353);
        if (token === 46) {
            frame.addNextState(state354);
        }
    };
    state353.id = 353;
    state354.p = function(step, frame) {
        step.addMark("ident", frame.context, state355);
    };
    state354.id = 354;
    state355.p = function(step, frame) {
        step.startCall("IDENT").addReturn(frame.context, state356);
    };
    state355.id = 355;
    state356.p = function(step, frame) {
        step.addMark("ident_end", frame.context, state357);
    };
    state356.id = 356;
    state357.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state357.id = 357;
    state358.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state359);
        step.startCall("PIPE").addReturn(frame.context, state360);
    };
    state358.id = 358;
    state359.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state359);
        step.startCall("PIPE").addReturn(frame.context, state360);
    };
    state359.id = 359;
    state360.p = function(step, frame) {
        step.startCall("FUNC_CALL").addReturn(frame.context, state361);
    };
    state360.id = 360;
    state361.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state361.id = 361;
    state362.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state363);
        step.startCall("PIPE").addReturn(frame.context, state364);
        step.startCall("OBJECT").addReturn(frame.context, state365);
    };
    state362.id = 362;
    state363.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state363);
        step.startCall("PIPE").addReturn(frame.context, state364);
        step.startCall("OBJECT").addReturn(frame.context, state365);
    };
    state363.id = 363;
    state364.p = function(step, frame) {
        step.startCall("OBJECT").addReturn(frame.context, state365);
    };
    state364.id = 364;
    state365.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state365.id = 365;
    state366.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state367);
        step.startCall("PIPE").addReturn(frame.context, state368);
        if (token === 91) {
            frame.addNextState(state369);
        }
    };
    state366.id = 366;
    state367.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state367);
        step.startCall("PIPE").addReturn(frame.context, state368);
        if (token === 91) {
            frame.addNextState(state369);
        }
    };
    state367.id = 367;
    state368.p = function(step, frame) {
        var token = step.token;
        if (token === 91) {
            frame.addNextState(state369);
        }
    };
    state368.id = 368;
    state369.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state370);
        step.startCall("EXPR^1").addReturn(frame.context, state371);
    };
    state369.id = 369;
    state370.p = function(step, frame) {
        step.startCall("IGN").addReturn(frame.context, state370);
        step.startCall("EXPR^1").addReturn(frame.context, state371);
    };
    state370.id = 370;
    state371.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state372);
        if (token === 93) {
            frame.addNextState(state373);
        }
    };
    state371.id = 371;
    state372.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state372);
        if (token === 93) {
            frame.addNextState(state373);
        }
    };
    state372.id = 372;
    state373.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state373.id = 373;
    state374.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state375);
        step.startCall("PIPE").addReturn(frame.context, state376);
        if (token === 91) {
            frame.addNextState(state377);
        }
    };
    state374.id = 374;
    state375.p = function(step, frame) {
        var token = step.token;
        step.startCall("IGN").addReturn(frame.context, state375);
        step.startCall("PIPE").addReturn(frame.context, state376);
        if (token === 91) {
            frame.addNextState(state377);
        }
    };
    state375.id = 375;
    state376.p = function(step, frame) {
        var token = step.token;
        if (token === 91) {
            frame.addNextState(state377);
        }
    };
    state376.id = 376;
    state377.p = function(step, frame) {
        var token = step.token;
        if (token === 93) {
            frame.addNextState(state378);
        }
    };
    state377.id = 377;
    state378.p = function(step, frame) {
        step.returnCall("EXPR^11", frame);
    };
    state378.id = 378;
    var initialContext = new Context(null, null);
    var initialFrame = new Frame(initialContext);
    initialFrame.addNextState(state0);
    var initialFrames = [
        initialFrame
    ];
    var ruleInitialStates = {
    };
    ruleInitialStates["main"] = [
        state2
    ];
    ruleInitialStates["SPACE"] = [
        state6
    ];
    ruleInitialStates["COMMENT"] = [
        state15
    ];
    ruleInitialStates["COMMENT_END"] = [
        state21
    ];
    ruleInitialStates["IGN"] = [
        state23
    ];
    ruleInitialStates["PIPE"] = [
        state26
    ];
    ruleInitialStates["PARENT"] = [
        state29
    ];
    ruleInitialStates["IDENT_FST"] = [
        state36
    ];
    ruleInitialStates["IDENT_REST"] = [
        state40
    ];
    ruleInitialStates["IDENT"] = [
        state43
    ];
    ruleInitialStates["STAR"] = [
        state46
    ];
    ruleInitialStates["COMP_OP"] = [
        state48
    ];
    ruleInitialStates["FUNC_CALL"] = [
        state66
    ];
    ruleInitialStates["FUNC_ARGS"] = [
        state76
    ];
    ruleInitialStates["NUMBER"] = [
        state83
    ];
    ruleInitialStates["DIGIT"] = [
        state101
    ];
    ruleInitialStates["SIGN"] = [
        state103
    ];
    ruleInitialStates["STRING"] = [
        state106
    ];
    ruleInitialStates["DSTRING_CHAR"] = [
        state117
    ];
    ruleInitialStates["SSTRING_CHAR"] = [
        state121
    ];
    ruleInitialStates["ARRAY"] = [
        state125
    ];
    ruleInitialStates["ARRAY_ELEMENT"] = [
        state139
    ];
    ruleInitialStates["OBJECT"] = [
        state146
    ];
    ruleInitialStates["OBJECT_PAIR"] = [
        state160
    ];
    ruleInitialStates["EXPR^1"] = [
        state179
    ];
    ruleInitialStates["EXPR^2"] = [
        state188
    ];
    ruleInitialStates["EXPR^3"] = [
        state197
    ];
    ruleInitialStates["EXPR^4"] = [
        state206
    ];
    ruleInitialStates["EXPR^5"] = [
        state229
    ];
    ruleInitialStates["EXPR^6"] = [
        state246
    ];
    ruleInitialStates["EXPR^7"] = [
        state260
    ];
    ruleInitialStates["EXPR^9"] = [
        state280
    ];
    ruleInitialStates["EXPR^11"] = [
        state289
    ];
    function isValueNode(node) {
        return node.type === 'Value';
    }
    function isNumber(node) {
        return isValueNode(node) && typeof node.value === 'number';
    }
    function isString(node) {
        return isValueNode(node) && typeof node.value === 'string';
    }
    var ESCAPE_SEQUENCE = {
        "'": "'",
        '"': '"',
        '\\': '\\',
        '/': '/',
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t'
    };
    function expandHex(str) {
        var charCode = parseInt(str, 16);
        return String.fromCharCode(charCode);
    }
    function expandEscapeSequence(str) {
        var re = /\\(['"/\\bfnrt]|u([A-Fa-f0-9]{4})|u\{([A-Fa-f0-9]+)\})/g;
        return str.replace(re, (_, esc, u1, u2)=>{
            if (u1) return expandHex(u1);
            if (u2) return expandHex(u2);
            return ESCAPE_SEQUENCE[esc];
        });
    }
    class GroqQueryError extends Error {
    }
    var BUILDER = {
        paren (p) {
            var inner = p.process();
            return {
                type: 'Parenthesis',
                base: inner
            };
        },
        filter (p) {
            var base = p.process();
            var query = p.process();
            if (isNumber(query)) {
                return {
                    type: 'Element',
                    base,
                    index: query
                };
            }
            if (isString(query)) {
                return {
                    type: 'Attribute',
                    base,
                    name: query.value
                };
            }
            if (query.type === 'Range') {
                return {
                    type: 'Slice',
                    base,
                    left: query.left,
                    right: query.right,
                    isExclusive: query.isExclusive
                };
            }
            return {
                type: 'Filter',
                base,
                query
            };
        },
        project (p) {
            var base = p.process();
            var query = p.process();
            return {
                type: 'Projection',
                base,
                query
            };
        },
        star () {
            return {
                type: 'Star'
            };
        },
        this () {
            return {
                type: 'This'
            };
        },
        parent () {
            return {
                type: 'Parent',
                n: 1
            };
        },
        dblparent (p) {
            var next = p.process();
            return {
                type: 'Parent',
                n: next.n + 1
            };
        },
        ident (p) {
            var name = p.processStringEnd();
            if (name === 'null') return {
                type: 'Value',
                value: null
            };
            if (name === 'true') return {
                type: 'Value',
                value: true
            };
            if (name === 'false') return {
                type: 'Value',
                value: false
            };
            return {
                type: 'Identifier',
                name: name
            };
        },
        attr_ident (p) {
            var base = p.process();
            var name = p.processString();
            return {
                type: 'Attribute',
                base,
                name
            };
        },
        arr_expr (p) {
            var base = p.process();
            return {
                type: 'Mapper',
                base
            };
        },
        inc_range (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'Range',
                left: left1,
                right: right1,
                isExclusive: false
            };
        },
        exc_range (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'Range',
                left: left1,
                right: right1,
                isExclusive: true
            };
        },
        neg (p) {
            var base = p.process();
            if (base.type === 'Value' && typeof base.value === 'number') {
                return {
                    type: 'Value',
                    value: -base.value
                };
            }
            return {
                type: 'Neg',
                base
            };
        },
        pos (p) {
            var base = p.process();
            if (isNumber(base)) {
                return {
                    type: 'Value',
                    value: +base.value
                };
            }
            return {
                type: 'Pos',
                base
            };
        },
        add (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '+',
                left: left1,
                right: right1
            };
        },
        sub (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '-',
                left: left1,
                right: right1
            };
        },
        mul (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '*',
                left: left1,
                right: right1
            };
        },
        div (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '/',
                left: left1,
                right: right1
            };
        },
        mod (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '%',
                left: left1,
                right: right1
            };
        },
        pow (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: '**',
                left: left1,
                right: right1
            };
        },
        deref (p) {
            var base = p.process();
            var nextMark = p.getMark();
            var result = {
                type: 'Deref',
                base
            };
            if (nextMark && nextMark.name === 'deref_field') {
                var name = p.processString();
                return {
                    type: 'Attribute',
                    base: result,
                    name
                };
            }
            return result;
        },
        comp (p) {
            var left1 = p.process();
            var op = p.processString();
            var right1 = p.process();
            return {
                type: 'OpCall',
                op: op,
                left: left1,
                right: right1
            };
        },
        str_begin (p) {
            var value1 = expandEscapeSequence(p.processStringEnd());
            return {
                type: 'Value',
                value: value1
            };
        },
        integer (p) {
            var strValue = p.processStringEnd();
            return {
                type: 'Value',
                value: Number(strValue)
            };
        },
        float (p) {
            var strValue = p.processStringEnd();
            return {
                type: 'Value',
                value: Number(strValue)
            };
        },
        sci (p) {
            var strValue = p.processStringEnd();
            return {
                type: 'Value',
                value: Number(strValue)
            };
        },
        pair (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'Pair',
                left: left1,
                right: right1
            };
        },
        object (p) {
            var attributes = [];
            while(p.getMark().name !== 'object_end'){
                attributes.push(p.process());
            }
            p.shift();
            return {
                type: 'Object',
                attributes
            };
        },
        object_expr (p) {
            var value1 = p.process();
            if (value1.type === 'Pair') {
                return {
                    type: 'ObjectConditionalSplat',
                    condition: value1.left,
                    value: value1.right
                };
            }
            return {
                type: 'ObjectAttribute',
                key: {
                    type: 'Value',
                    value: extractPropertyKey(value1)
                },
                value: value1
            };
        },
        object_pair (p) {
            var key = p.process();
            var value1 = p.process();
            return {
                type: 'ObjectAttribute',
                key: key,
                value: value1
            };
        },
        object_splat (p) {
            var value1 = p.process();
            return {
                type: 'ObjectSplat',
                value: value1
            };
        },
        object_splat_this () {
            return {
                type: 'ObjectSplat',
                value: {
                    type: 'This'
                }
            };
        },
        array (p) {
            var elements = [];
            while(p.getMark().name !== 'array_end'){
                var isSplat = false;
                if (p.getMark().name === 'array_splat') {
                    isSplat = true;
                    p.shift();
                }
                var value1 = p.process();
                elements.push({
                    type: 'ArrayElement',
                    value: value1,
                    isSplat
                });
            }
            p.shift();
            return {
                type: 'Array',
                elements: elements
            };
        },
        func_call (p) {
            var name = p.processStringEnd();
            var args = [];
            while(p.getMark().name !== 'func_args_end'){
                args.push(p.process());
            }
            p.shift();
            var func = functions[name];
            if (!func) {
                throw new GroqQueryError("Undefined function: " + name);
            }
            validateArity(name, func.arity, args.length);
            return {
                type: 'FuncCall',
                func,
                name,
                args
            };
        },
        pipecall (p) {
            var base = p.process();
            var name = p.processString();
            var args = [];
            while(true){
                var markName = p.getMark().name;
                if (markName === 'func_args_end') break;
                if (name === 'order') {
                    if (markName === 'asc') {
                        p.shift();
                        args.push({
                            type: 'Asc',
                            base: p.process()
                        });
                        continue;
                    } else if (markName === 'desc') {
                        p.shift();
                        args.push({
                            type: 'Desc',
                            base: p.process()
                        });
                        continue;
                    }
                }
                args.push(p.process());
            }
            p.shift();
            var func = pipeFunctions[name];
            if (!func) {
                throw new GroqQueryError("Undefined pipe function: " + name);
            }
            validateArity(name, func.arity, args.length);
            return {
                type: 'PipeFuncCall',
                func,
                base,
                name: func.name,
                args
            };
        },
        and (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'And',
                left: left1,
                right: right1
            };
        },
        or (p) {
            var left1 = p.process();
            var right1 = p.process();
            return {
                type: 'Or',
                left: left1,
                right: right1
            };
        },
        not (p) {
            var base = p.process();
            return {
                type: 'Not',
                base
            };
        },
        asc (p) {
            throw new GroqQueryError('unexpected asc');
        },
        desc (p) {
            throw new GroqQueryError('unexpected desc');
        },
        param (p) {
            var name = p.processStringEnd();
            return {
                type: 'Parameter',
                name
            };
        }
    };
    var NESTED_PROPERTY_TYPES = [
        'Deref',
        'Projection',
        'Mapper',
        'Filter',
        'Element',
        'Slice'
    ];
    function isNestedPropertyType(node) {
        return NESTED_PROPERTY_TYPES.includes(node.type);
    }
    function extractPropertyKey(node) {
        if (node.type === 'Identifier') {
            return node.name;
        }
        if (isNestedPropertyType(node)) {
            return extractPropertyKey(node.base);
        }
        throw new GroqQueryError('Cannot determine property key for type: ' + node.type);
    }
    function validateArity(name, arity, count) {
        if (typeof arity === 'number') {
            if (count !== arity) {
                throw new GroqQueryError("Incorrect number of arguments to function " + name + "(). Expected " + arity + ", got " + count + ".");
            }
        } else if (arity) {
            if (!arity(count)) {
                throw new GroqQueryError("Incorrect number of arguments to function " + name + "().");
            }
        }
    }
    class GroqSyntaxError extends Error {
        constructor(position){
            super("Syntax error in GROQ query at position " + position);
            this.name = 'GroqSyntaxError';
            this.position = position;
        }
    }
    function parse$1(input) {
        var result = parse(input);
        if (result.type === 'error') throw new GroqSyntaxError(result.position);
        var processor = new MarkProcessor(BUILDER, input, result.marks);
        return processor.process();
    }
    var isEqual = equality;
    function equality(_x, _x2) {
        return _equality.apply(this, arguments);
    }
    function _equality() {
        _equality = _asyncToGenerator(function*(a, b) {
            var aType = a.getType();
            var bType = b.getType();
            if (aType !== bType) return false;
            if (aType === 'number' || aType === 'string' || aType === 'boolean' || aType === 'null') {
                return (yield a.get()) === (yield b.get());
            }
            return false;
        });
        return _equality.apply(this, arguments);
    }
    function matchText(tokens, patterns) {
        if (tokens.length === 0 || patterns.length === 0) return false;
        return patterns.every((pattern1)=>pattern1(tokens)
        );
    }
    function matchTokenize(text) {
        return text.match(/[A-Za-z0-9]+/g);
    }
    function matchAnalyzePattern(text) {
        var terms = text.match(/[A-Za-z0-9*]+/g) || [];
        var termsRe = terms.map((term)=>new RegExp('^' + term.replace(/\*/g, '.*') + '$', 'i')
        );
        return (tokens)=>termsRe.every((re)=>tokens.some((token)=>re.test(token)
                )
            )
        ;
    }
    function gatherText(_x, _x2) {
        return _gatherText.apply(this, arguments);
    }
    function _gatherText() {
        _gatherText = _asyncToGenerator(function*(value1, cb) {
            switch(value1.getType()){
                case 'string':
                    {
                        cb((yield value1.get()));
                        return true;
                    }
                case 'array':
                    {
                        var success = true;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError;
                        try {
                            for(var _iterator = _asyncIterator(value1), _step, _value; (_step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion); _iteratorNormalCompletion = true){
                                var part = _value;
                                if (part.getType() === 'string') {
                                    cb((yield part.get()));
                                } else {
                                    success = false;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    yield _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        return success;
                    }
                default:
                    {
                        return false;
                    }
            }
        });
        return _gatherText.apply(this, arguments);
    }
    var operators = {
        '==': function() {
            var _eq = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield execute(left1, scope);
                var b = yield execute(right1, scope);
                var result = yield isEqual(a, b);
                return result ? TRUE_VALUE : FALSE_VALUE;
            });
            function eq(_x, _x2, _x3, _x4) {
                return _eq.apply(this, arguments);
            }
            return eq;
        }(),
        '!=': function() {
            var _neq = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield execute(left1, scope);
                var b = yield execute(right1, scope);
                var result = yield isEqual(a, b);
                return result ? FALSE_VALUE : TRUE_VALUE;
            });
            function neq(_x5, _x6, _x7, _x8) {
                return _neq.apply(this, arguments);
            }
            return neq;
        }(),
        '>': function() {
            var _gt = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield (yield execute(left1, scope)).get();
                var b = yield (yield execute(right1, scope)).get();
                var result = partialCompare(a, b);
                if (result === null) {
                    return NULL_VALUE;
                } else {
                    return result > 0 ? TRUE_VALUE : FALSE_VALUE;
                }
            });
            function gt(_x9, _x10, _x11, _x12) {
                return _gt.apply(this, arguments);
            }
            return gt;
        }(),
        '>=': function() {
            var _gte = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield (yield execute(left1, scope)).get();
                var b = yield (yield execute(right1, scope)).get();
                var result = partialCompare(a, b);
                if (result === null) {
                    return NULL_VALUE;
                } else {
                    return result >= 0 ? TRUE_VALUE : FALSE_VALUE;
                }
            });
            function gte(_x13, _x14, _x15, _x16) {
                return _gte.apply(this, arguments);
            }
            return gte;
        }(),
        '<': function() {
            var _lt = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield (yield execute(left1, scope)).get();
                var b = yield (yield execute(right1, scope)).get();
                var result = partialCompare(a, b);
                if (result === null) {
                    return NULL_VALUE;
                } else {
                    return result < 0 ? TRUE_VALUE : FALSE_VALUE;
                }
            });
            function lt(_x17, _x18, _x19, _x20) {
                return _lt.apply(this, arguments);
            }
            return lt;
        }(),
        '<=': function() {
            var _lte = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield (yield execute(left1, scope)).get();
                var b = yield (yield execute(right1, scope)).get();
                var result = partialCompare(a, b);
                if (result === null) {
                    return NULL_VALUE;
                } else {
                    return result <= 0 ? TRUE_VALUE : FALSE_VALUE;
                }
            });
            function lte(_x21, _x22, _x23, _x24) {
                return _lte.apply(this, arguments);
            }
            return lte;
        }(),
        in: function() {
            var _inop = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield execute(left1, scope);
                var choices = yield execute(right1, scope);
                switch(choices.getType()){
                    case 'array':
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError;
                        try {
                            for(var _iterator = _asyncIterator(choices), _step, _value; (_step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion); _iteratorNormalCompletion = true){
                                var b = _value;
                                if (yield isEqual(a, b)) {
                                    return TRUE_VALUE;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    yield _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        return FALSE_VALUE;
                    case 'range':
                        var value1 = yield a.get();
                        var range = yield choices.get();
                        var leftCmp = partialCompare(value1, range.left);
                        if (leftCmp === null) return NULL_VALUE;
                        var rightCmp = partialCompare(value1, range.right);
                        if (rightCmp === null) return NULL_VALUE;
                        if (range.isExclusive()) {
                            return leftCmp >= 0 && rightCmp < 0 ? TRUE_VALUE : FALSE_VALUE;
                        } else {
                            return leftCmp >= 0 && rightCmp <= 0 ? TRUE_VALUE : FALSE_VALUE;
                        }
                    case 'path':
                        if (a.getType() !== 'string') return NULL_VALUE;
                        var str = yield a.get();
                        var path = yield choices.get();
                        return path.matches(str) ? TRUE_VALUE : FALSE_VALUE;
                }
                return NULL_VALUE;
            });
            function inop(_x25, _x26, _x27, _x28) {
                return _inop.apply(this, arguments);
            }
            return inop;
        }(),
        match: function() {
            var _match = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var text = yield execute(left1, scope);
                var pattern1 = yield execute(right1, scope);
                var tokens = [];
                var patterns = [];
                yield gatherText(text, (part)=>{
                    tokens = tokens.concat(matchTokenize(part));
                });
                var didSucceed = yield gatherText(pattern1, (part)=>{
                    patterns = patterns.concat(matchAnalyzePattern(part));
                });
                if (!didSucceed) return FALSE_VALUE;
                var matched = matchText(tokens, patterns);
                return matched ? TRUE_VALUE : FALSE_VALUE;
            });
            function match(_x29, _x30, _x31, _x32) {
                return _match.apply(this, arguments);
            }
            return match;
        }(),
        '+': function() {
            var _plus = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield execute(left1, scope);
                var b = yield execute(right1, scope);
                var aType = a.getType();
                var bType = b.getType();
                if (aType === 'number' && bType === 'number' || aType === 'string' && bType === 'string') {
                    return new StaticValue((yield a.get()) + (yield b.get()));
                }
                if (aType === 'array' && bType === 'array') {
                    return new StaticValue((yield a.get()).concat((yield b.get())));
                }
                if (aType === 'object' && bType === 'object') {
                    return new StaticValue(_extends({
                    }, (yield a.get()), (yield b.get())));
                }
                return NULL_VALUE;
            });
            function plus(_x33, _x34, _x35, _x36) {
                return _plus.apply(this, arguments);
            }
            return plus;
        }(),
        '-': numericOperator((a, b)=>a - b
        ),
        '*': numericOperator((a, b)=>a * b
        ),
        '/': numericOperator((a, b)=>a / b
        ),
        '%': numericOperator((a, b)=>a % b
        ),
        '**': numericOperator((a, b)=>Math.pow(a, b)
        )
    };
    function numericOperator(impl) {
        return (function() {
            var _ref = _asyncToGenerator(function*(left1, right1, scope, execute) {
                var a = yield execute(left1, scope);
                var b = yield execute(right1, scope);
                var aType = a.getType();
                var bType = b.getType();
                if (aType === 'number' && bType === 'number') {
                    var result = impl((yield a.get()), (yield b.get()));
                    return fromNumber(result);
                }
                return NULL_VALUE;
            });
            return function(_x37, _x38, _x39, _x40) {
                return _ref.apply(this, arguments);
            };
        })();
    }
    function inMapper(value1, fn) {
        if (value1 instanceof MapperValue) {
            return new MapperValue(new StreamValue(_wrapAsyncGenerator(function*() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError;
                try {
                    for(var _iterator = _asyncIterator(value1), _step, _value; (_step = yield _awaitAsyncGenerator(_iterator.next()), _iteratorNormalCompletion = _step.done, _value = yield _awaitAsyncGenerator(_step.value), !_iteratorNormalCompletion); _iteratorNormalCompletion = true){
                        var elementValue = _value;
                        yield fn(elementValue);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            yield _awaitAsyncGenerator(_iterator.return());
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            })));
        } else {
            return fn(value1);
        }
    }
    class Scope {
        constructor(params, source, value1, parent){
            this.params = params;
            this.source = source;
            this.value = value1;
            this.parent = parent;
            this.timestamp = parent ? parent.timestamp : new Date().toISOString();
        }
        createNested(value) {
            return new Scope(this.params, this.source, value, this);
        }
    }
    function execute(node, scope) {
        if (typeof EXECUTORS[node.type] === 'undefined') {
            throw new Error('No executor for node.type=' + node.type);
        }
        var func = EXECUTORS[node.type];
        return func(node, scope);
    }
    var EXECUTORS = {
        This (_, scope) {
            return scope.value;
        },
        Star (_, scope) {
            return scope.source;
        },
        Parameter (_ref6, scope) {
            var name = _ref6.name;
            return fromJS(scope.params[name]);
        },
        Parent (node, scope) {
            var current = scope;
            for(var i = 0; i < node.n; i++){
                if (!current.parent) {
                    return NULL_VALUE;
                }
                current = current.parent;
            }
            return current.value;
        },
        OpCall (_ref7, scope) {
            var op = _ref7.op, left1 = _ref7.left, right1 = _ref7.right;
            var func = operators[op];
            if (!func) throw new Error('Unknown operator: ' + op);
            return func(left1, right1, scope, execute);
        },
        FuncCall (_ref8, scope) {
            var func = _ref8.func, args = _ref8.args;
            return func(args, scope, execute);
        },
        PipeFuncCall (_ref9, scope) {
            return _asyncToGenerator(function*() {
                var func = _ref9.func, base = _ref9.base, args = _ref9.args;
                var baseValue = yield execute(base, scope);
                return func(baseValue, args, scope, execute);
            })();
        },
        Filter (_ref10, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref10.base, query = _ref10.query;
                var baseValue = yield execute(base, scope);
                return inMapper(baseValue, function() {
                    var _ref11 = _asyncToGenerator(function*(value3) {
                        if (value3.getType() !== 'array') return NULL_VALUE;
                        return new StreamValue(_wrapAsyncGenerator(function*() {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2;
                            try {
                                for(var _iterator2 = _asyncIterator(value3), _step2, _value2; (_step2 = yield _awaitAsyncGenerator(_iterator2.next()), _iteratorNormalCompletion2 = _step2.done, _value2 = yield _awaitAsyncGenerator(_step2.value), !_iteratorNormalCompletion2); _iteratorNormalCompletion2 = true){
                                    var element = _value2;
                                    var newScope = scope.createNested(element);
                                    var condValue = yield _awaitAsyncGenerator(execute(query, newScope));
                                    if (condValue.getBoolean()) yield element;
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                        yield _awaitAsyncGenerator(_iterator2.return());
                                    }
                                } finally{
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }));
                    });
                    return function(_x) {
                        return _ref11.apply(this, arguments);
                    };
                }());
            })();
        },
        Element (_ref12, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref12.base, index = _ref12.index;
                var baseValue = yield execute(base, scope);
                return inMapper(baseValue, function() {
                    var _ref13 = _asyncToGenerator(function*(arrayValue) {
                        if (arrayValue.getType() !== 'array') return NULL_VALUE;
                        var idxValue = yield execute(index, scope);
                        if (idxValue.getType() !== 'number') return NULL_VALUE;
                        var array = yield arrayValue.get();
                        var idx = yield idxValue.get();
                        if (idx < 0) {
                            idx = array.length + idx;
                        }
                        if (idx >= 0 && idx < array.length) {
                            return new StaticValue(array[idx]);
                        } else {
                            return NULL_VALUE;
                        }
                    });
                    return function(_x2) {
                        return _ref13.apply(this, arguments);
                    };
                }());
            })();
        },
        Slice (_ref14, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref14.base, left1 = _ref14.left, right1 = _ref14.right, isExclusive = _ref14.isExclusive;
                var baseValue = yield execute(base, scope);
                return inMapper(baseValue, function() {
                    var _ref15 = _asyncToGenerator(function*(arrayValue) {
                        if (arrayValue.getType() !== 'array') return NULL_VALUE;
                        var leftIdxValue = yield execute(left1, scope);
                        var rightIdxValue = yield execute(right1, scope);
                        if (leftIdxValue.getType() !== 'number' || rightIdxValue.getType() !== 'number') {
                            return NULL_VALUE;
                        }
                        var array = yield arrayValue.get();
                        var leftIdx = yield leftIdxValue.get();
                        var rightIdx = yield rightIdxValue.get();
                        if (leftIdx < 0) leftIdx = array.length + leftIdx;
                        if (rightIdx < 0) rightIdx = array.length + rightIdx;
                        if (!isExclusive) rightIdx++;
                        if (leftIdx < 0) leftIdx = 0;
                        if (rightIdx < 0) rightIdx = 0;
                        return new StaticValue(array.slice(leftIdx, rightIdx));
                    });
                    return function(_x3) {
                        return _ref15.apply(this, arguments);
                    };
                }());
            })();
        },
        Attribute (_ref16, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref16.base, name = _ref16.name;
                var baseValue = yield execute(base, scope);
                return inMapper(baseValue, function() {
                    var _ref17 = _asyncToGenerator(function*(value3) {
                        if (value3.getType() === 'object') {
                            var data1 = yield value3.get();
                            if (data1.hasOwnProperty(name)) {
                                return new StaticValue(data1[name]);
                            }
                        }
                        return NULL_VALUE;
                    });
                    return function(_x4) {
                        return _ref17.apply(this, arguments);
                    };
                }());
            })();
        },
        Identifier (_ref18, scope) {
            return _asyncToGenerator(function*() {
                var name = _ref18.name;
                if (scope.value.getType() === 'object') {
                    var data1 = yield scope.value.get();
                    if (data1.hasOwnProperty(name)) {
                        return new StaticValue(data1[name]);
                    }
                }
                return NULL_VALUE;
            })();
        },
        Value (_ref19) {
            var value3 = _ref19.value;
            return new StaticValue(value3);
        },
        Mapper (_ref20, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref20.base;
                var baseValue = yield execute(base, scope);
                if (baseValue.getType() !== 'array') return baseValue;
                if (baseValue instanceof MapperValue) {
                    return new MapperValue(new StreamValue(_wrapAsyncGenerator(function*() {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3;
                        try {
                            for(var _iterator3 = _asyncIterator(baseValue), _step3, _value3; (_step3 = yield _awaitAsyncGenerator(_iterator3.next()), _iteratorNormalCompletion3 = _step3.done, _value3 = yield _awaitAsyncGenerator(_step3.value), !_iteratorNormalCompletion3); _iteratorNormalCompletion3 = true){
                                var element = _value3;
                                if (element.getType() === 'array') {
                                    var _iteratorNormalCompletion4 = true;
                                    var _didIteratorError4 = false;
                                    var _iteratorError4;
                                    try {
                                        for(var _iterator4 = _asyncIterator(element), _step4, _value4; (_step4 = yield _awaitAsyncGenerator(_iterator4.next()), _iteratorNormalCompletion4 = _step4.done, _value4 = yield _awaitAsyncGenerator(_step4.value), !_iteratorNormalCompletion4); _iteratorNormalCompletion4 = true){
                                            var subelement = _value4;
                                            yield subelement;
                                        }
                                    } catch (err) {
                                        _didIteratorError4 = true;
                                        _iteratorError4 = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                                                yield _awaitAsyncGenerator(_iterator4.return());
                                            }
                                        } finally{
                                            if (_didIteratorError4) {
                                                throw _iteratorError4;
                                            }
                                        }
                                    }
                                } else {
                                    yield NULL_VALUE;
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                    yield _awaitAsyncGenerator(_iterator3.return());
                                }
                            } finally{
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    })));
                } else {
                    return new MapperValue(baseValue);
                }
            })();
        },
        Parenthesis (_ref21, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref21.base;
                var baseValue = yield execute(base, scope);
                if (baseValue instanceof MapperValue) {
                    baseValue = baseValue.value;
                }
                return baseValue;
            })();
        },
        Projection (_ref22, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref22.base, query = _ref22.query;
                var baseValue = yield execute(base, scope);
                if (baseValue.getType() === 'null') return NULL_VALUE;
                if (baseValue.getType() === 'array') {
                    return new StreamValue(_wrapAsyncGenerator(function*() {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5;
                        try {
                            for(var _iterator5 = _asyncIterator(baseValue), _step5, _value5; (_step5 = yield _awaitAsyncGenerator(_iterator5.next()), _iteratorNormalCompletion5 = _step5.done, _value5 = yield _awaitAsyncGenerator(_step5.value), !_iteratorNormalCompletion5); _iteratorNormalCompletion5 = true){
                                var value3 = _value5;
                                var _newScope = scope.createNested(value3);
                                var newValue = yield _awaitAsyncGenerator(execute(query, _newScope));
                                yield newValue;
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                                    yield _awaitAsyncGenerator(_iterator5.return());
                                }
                            } finally{
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }));
                }
                var newScope = scope.createNested(baseValue);
                return yield execute(query, newScope);
            })();
        },
        Deref (_ref23, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref23.base;
                var baseValue = yield execute(base, scope);
                return inMapper(baseValue, function() {
                    var _ref24 = _asyncToGenerator(function*(baseValue1) {
                        if (scope.source.getType() !== 'array') return NULL_VALUE;
                        if (baseValue1.getType() !== 'object') return NULL_VALUE;
                        var id = (yield baseValue1.get())._ref;
                        if (typeof id !== 'string') return NULL_VALUE;
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6;
                        try {
                            for(var _iterator6 = _asyncIterator(scope.source), _step6, _value6; (_step6 = yield _iterator6.next(), _iteratorNormalCompletion6 = _step6.done, _value6 = yield _step6.value, !_iteratorNormalCompletion6); _iteratorNormalCompletion6 = true){
                                var doc = _value6;
                                if (id === doc.data._id) {
                                    return doc;
                                }
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                                    yield _iterator6.return();
                                }
                            } finally{
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }
                        return NULL_VALUE;
                    });
                    return function(_x5) {
                        return _ref24.apply(this, arguments);
                    };
                }());
            })();
        },
        Object (_ref25, scope) {
            return _asyncToGenerator(function*() {
                var attributes = _ref25.attributes;
                var result = {
                };
                for(var _iterator8 = _createForOfIteratorHelperLoose(attributes), _step8; !(_step8 = _iterator8()).done;){
                    var attr = _step8.value;
                    var attrType = attr.type;
                    switch(attr.type){
                        case 'ObjectAttribute':
                            {
                                var key = yield execute(attr.key, scope);
                                if (key.getType() !== 'string') continue;
                                var value3 = yield execute(attr.value, scope);
                                if (value3.getType() === 'null') {
                                    delete result[key.data];
                                    break;
                                }
                                result[key.data] = yield value3.get();
                                break;
                            }
                        case 'ObjectConditionalSplat':
                            {
                                var cond = yield execute(attr.condition, scope);
                                if (!cond.getBoolean()) continue;
                                var _value8 = yield execute(attr.value, scope);
                                if (_value8.getType() !== 'object') continue;
                                Object.assign(result, _value8.data);
                                break;
                            }
                        case 'ObjectSplat':
                            {
                                var _value9 = yield execute(attr.value, scope);
                                if (_value9.getType('object')) {
                                    Object.assign(result, _value9.data);
                                }
                                break;
                            }
                        default:
                            throw new Error('Unknown node type: ' + attrType);
                    }
                }
                return new StaticValue(result);
            })();
        },
        Array (_ref26, scope) {
            var elements = _ref26.elements;
            return new StreamValue(_wrapAsyncGenerator(function*() {
                for(var _iterator9 = _createForOfIteratorHelperLoose(elements), _step9; !(_step9 = _iterator9()).done;){
                    var element = _step9.value;
                    var value3 = yield _awaitAsyncGenerator(execute(element.value, scope));
                    if (element.isSplat) {
                        if (value3.getType() === 'array') {
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7;
                            try {
                                for(var _iterator7 = _asyncIterator(value3), _step7, _value7; (_step7 = yield _awaitAsyncGenerator(_iterator7.next()), _iteratorNormalCompletion7 = _step7.done, _value7 = yield _awaitAsyncGenerator(_step7.value), !_iteratorNormalCompletion7); _iteratorNormalCompletion7 = true){
                                    var v = _value7;
                                    yield v;
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                                        yield _awaitAsyncGenerator(_iterator7.return());
                                    }
                                } finally{
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }
                        }
                    } else {
                        yield value3;
                    }
                }
            }));
        },
        Range (_ref27, scope) {
            return _asyncToGenerator(function*() {
                var left1 = _ref27.left, right1 = _ref27.right, isExclusive = _ref27.isExclusive;
                var leftValue = yield execute(left1, scope);
                var rightValue = yield execute(right1, scope);
                if (!Range1.isConstructible(leftValue.getType(), rightValue.getType())) {
                    return NULL_VALUE;
                }
                var range = new Range1((yield leftValue.get()), (yield rightValue.get()), isExclusive);
                return new StaticValue(range);
            })();
        },
        Pair (_ref28, scope) {
            return _asyncToGenerator(function*() {
                var left1 = _ref28.left, right1 = _ref28.right;
                var leftValue = yield execute(left1, scope);
                var rightValue = yield execute(right1, scope);
                var pair = new Pair((yield leftValue.get()), (yield rightValue.get()));
                return new StaticValue(pair);
            })();
        },
        Or (_ref29, scope) {
            return _asyncToGenerator(function*() {
                var left1 = _ref29.left, right1 = _ref29.right;
                var leftValue = yield execute(left1, scope);
                var rightValue = yield execute(right1, scope);
                if (leftValue.getType() === 'boolean') {
                    if (leftValue.data === true) return TRUE_VALUE;
                }
                if (rightValue.getType() === 'boolean') {
                    if (rightValue.data === true) return TRUE_VALUE;
                }
                if (leftValue.getType() !== 'boolean') return NULL_VALUE;
                if (rightValue.getType() !== 'boolean') return NULL_VALUE;
                return FALSE_VALUE;
            })();
        },
        And (_ref30, scope) {
            return _asyncToGenerator(function*() {
                var left1 = _ref30.left, right1 = _ref30.right;
                var leftValue = yield execute(left1, scope);
                var rightValue = yield execute(right1, scope);
                if (leftValue.getType() === 'boolean') {
                    if (leftValue.data === false) return FALSE_VALUE;
                }
                if (rightValue.getType() === 'boolean') {
                    if (rightValue.data === false) return FALSE_VALUE;
                }
                if (leftValue.getType() !== 'boolean') return NULL_VALUE;
                if (rightValue.getType() !== 'boolean') return NULL_VALUE;
                return TRUE_VALUE;
            })();
        },
        Not (_ref31, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref31.base;
                var value3 = yield execute(base, scope);
                if (value3.getType() !== 'boolean') {
                    return NULL_VALUE;
                }
                return value3.getBoolean() ? FALSE_VALUE : TRUE_VALUE;
            })();
        },
        Neg (_ref32, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref32.base;
                var value3 = yield execute(base, scope);
                if (value3.getType() !== 'number') return NULL_VALUE;
                return fromNumber(-(yield value3.get()));
            })();
        },
        Pos (_ref33, scope) {
            return _asyncToGenerator(function*() {
                var base = _ref33.base;
                var value3 = yield execute(base, scope);
                if (value3.getType() !== 'number') return NULL_VALUE;
                return fromNumber((yield value3.get()));
            })();
        },
        Asc () {
            return _asyncToGenerator(function*() {
                return NULL_VALUE;
            })();
        },
        Desc () {
            return _asyncToGenerator(function*() {
                return NULL_VALUE;
            })();
        }
    };
    function evaluate(_x6, _x7) {
        return _evaluate.apply(this, arguments);
    }
    function _evaluate() {
        _evaluate = _asyncToGenerator(function*(tree, options) {
            if (options === void 0) {
                options = {
                };
            }
            var root = fromJS(options.root);
            var dataset = fromJS(options.dataset);
            var params1 = _extends({
            }, options.params);
            var scope = new Scope(params1, dataset, root, null);
            return yield execute(tree, scope);
        });
        return _evaluate.apply(this, arguments);
    }
    exports1.evaluate = evaluate;
    exports1.parse = parse$1;
    return exports1;
}
// function dew1() {
//     if (_dewExec) return exports;
//     _dewExec = true;
//     {
//         exports = dew();
//     }
//     return exports;
// }
// const __default = dew1();
// const __default1 = __default;
// export { __default1 as default };

dew(window.groq = {});