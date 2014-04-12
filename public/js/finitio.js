!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Finitio=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
Finitio = _dereq_("./lib/finitio")
module.exports = Finitio
module.exports.VERSION = "0.1.0"

},{"./lib/finitio":4}],2:[function(_dereq_,module,exports){
(function() {
  var System, factory;

  factory = new (_dereq_('../support/factory'));

  System = {};

  System.Any = factory.any("Any");

  System.Null = factory.sub_type(System.Any, (function(v) {
    return v === null;
  }), 'Null');

  System.Undefined = factory.sub_type(System.Any, (function(v) {
    return v === void 0;
  }), 'Undefined');

  System.Boolean = factory.builtin(Boolean);

  System.Number = factory.builtin(Number);

  System.Integer = factory.sub_type(System.Number, (function(n) {
    return n % 1 === 0;
  }), "Integer");

  System.Real = factory.sub_type(System.Number, (function(n) {
    return !(n % 1 === 0);
  }), "Real");

  System.string = factory.builtin(String);

  module.exports = System;

}).call(this);

},{"../support/factory":10}],3:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, FinitioError, KeyError, NotImplementedError, TypeError,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FinitioError = (function(_super) {
    __extends(FinitioError, _super);

    function FinitioError(message, cause) {
      this.message = message;
      this.cause = cause;
      FinitioError.__super__.constructor.call(this, this.message);
    }

    return FinitioError;

  })(Error);

  KeyError = (function(_super) {
    __extends(KeyError, _super);

    function KeyError(message) {
      this.message = message;
      KeyError.__super__.constructor.call(this, this.message);
    }

    return KeyError;

  })(FinitioError);

  ArgumentError = (function(_super) {
    __extends(ArgumentError, _super);

    function ArgumentError(message, arg) {
      var clazz;
      this.message = message;
      this.arg = arg;
      if (arguments.length === 2) {
        clazz = typeof this.arg === "undefined" ? "undefined" : this.arg === null ? "null" : this.arg.constructor.name;
        this.message += " " + clazz;
      }
      ArgumentError.__super__.constructor.call(this, this.message);
    }

    return ArgumentError;

  })(FinitioError);

  TypeError = (function(_super) {
    __extends(TypeError, _super);

    function TypeError(message, cause, location) {
      this.message = message;
      this.cause = cause;
      this.location = location;
      TypeError.__super__.constructor.call(this, this.message, this.cause);
      if (this.location == null) {
        this.location = "";
      }
    }

    return TypeError;

  })(FinitioError);

  NotImplementedError = (function(_super) {
    __extends(NotImplementedError, _super);

    function NotImplementedError(clazz, method) {
      NotImplementedError.__super__.constructor.call(this, "Missing " + clazz.constructor.name + "#" + method);
    }

    return NotImplementedError;

  })(FinitioError);

  module.exports = {
    Error: Error,
    ArgumentError: ArgumentError,
    NotImplementedError: NotImplementedError,
    TypeError: TypeError,
    KeyError: KeyError
  };

}).call(this);

},{}],4:[function(_dereq_,module,exports){
(function (__dirname){
(function() {
  var $u, Finitio, Parser, TypeFactory;

  $u = _dereq_('./support/utils');

  TypeFactory = _dereq_('./support/factory');

  Parser = _dereq_('./syntax/parser');

  Finitio = (function() {
    var method, _i, _len, _ref;

    function Finitio() {}

    Finitio.VERSION = "0.0.1";

    Finitio.FACTORY = new TypeFactory;

    _ref = TypeFactory.PUBLIC_DSL_METHODS;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      Finitio[method] = Finitio.FACTORY[method].bind(Finitio.FACTORY);
    }

    Finitio.parse = function(source, options) {
      return Parser.parse(source, options || {});
    };

    Finitio.system = function(identifier) {
      var content, path;
      path = Path.join(__dirname, "" + identifier + ".fio");
      if (fs.existsSync(path)) {
        content = fs.readFileSync(path).toString();
        return this.parse(content);
      } else {
        throw new Error("Unknown system " + identifier);
      }
    };

    Finitio.DEFAULT_SYSTEM = _dereq_("./Finitio/default");

    return Finitio;

  })();

  $u.extend(Finitio, _dereq_('./errors'));

  $u.extend(Finitio, _dereq_('./support/contracts'));

  module.exports = Finitio;

}).call(this);

}).call(this,"/lib")
},{"./Finitio/default":2,"./errors":3,"./support/contracts":8,"./support/factory":10,"./support/utils":12,"./syntax/parser":13}],5:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, Attribute, KeyError, Type, TypeError, _ref;

  Type = _dereq_('../type');

  _ref = _dereq_('../errors'), KeyError = _ref.KeyError, ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

  Attribute = (function() {
    function Attribute(name, type) {
      this.name = name;
      this.type = type;
      if (typeof this.name !== "string") {
        throw new ArgumentError("String expected for attribute name, got", this.name);
      }
      if (!(this.type instanceof Type)) {
        throw new ArgumentError("Type expected for attribute domain, got", this.type);
      }
    }

    Attribute.prototype.fetchOn = function(arg, callback) {
      if (typeof arg !== "object") {
        throw new ArgumentError("Object expected, got", arg);
      }
      if (arg[this.name] == null) {
        if (callback != null) {
          return callback();
        } else {
          throw new KeyError("Key `" + this.name + "` not found");
        }
      }
      return arg[this.name];
    };

    Attribute.prototype.toName = function() {
      return "" + this.name + ": " + this.type;
    };

    Attribute.prototype.equals = function(other) {
      if (!(other instanceof Attribute)) {
        return null;
      }
      return this.name === other.name && this.type.equals(other.type);
    };

    return Attribute;

  })();

  module.exports = Attribute;

}).call(this);

},{"../errors":3,"../type":15}],6:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, CollectionType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  ArgumentError = _dereq_('../errors').ArgumentError;

  CollectionType = (function(_super) {
    __extends(CollectionType, _super);

    function CollectionType(elmType, name) {
      this.elmType = elmType;
      this.name = name;
      if (!(this.elmType instanceof Type)) {
        throw new ArgumentError("Finitio.Type expected, got", this.elmType);
      }
      CollectionType.__super__.constructor.call(this, this.name);
    }

    CollectionType.prototype.equals = function(other) {
      if (!(other instanceof this.constructor)) {
        return false;
      }
      return this.elmType.equals(other.elmType);
    };

    return CollectionType;

  })(Type);

  module.exports = CollectionType;

}).call(this);

},{"../errors":3,"../type":15}],7:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, Constraint, TypeError, _ref;

  _ref = _dereq_('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

  Constraint = (function() {
    function Constraint(name, _native) {
      this.name = name;
      this["native"] = _native;
      if (typeof this.name !== "string") {
        throw new ArgumentError("String expected for constraint name, got", this.name);
      }
    }

    Constraint.prototype.isAnonymous = function() {
      return this.name === 'default';
    };

    Constraint.prototype.accept = function(arg) {
      if (typeof this["native"] === "function") {
        if (this["native"](arg)) {
          return true;
        }
      } else if (this["native"].constructor === RegExp) {
        if (this["native"].test(arg)) {
          return true;
        }
      }
      return false;
    };

    Constraint.prototype.equals = function(other) {
      if (!(other instanceof Constraint)) {
        return false;
      }
      return this["native"] === other["native"];
    };

    return Constraint;

  })();

  module.exports = Constraint;

}).call(this);

},{"../errors":3}],8:[function(_dereq_,module,exports){
ArgumentError = _dereq_("../errors").TypeError;
DressHelper   = _dereq_("./dress_helper")

var $cs = {};

$cs.DateTime = {

  /**
   * Check if `d` is a valid date object.
   */
  isValidDate: function(d) {
    var toString = Object.prototype.toString;
    return (toString.call(d) === "[object Date]") && !isNaN(d.getTime());
  },

  /**
   * Information contract for Date/Time objects <-> ISO8601 String.
   *
   * See http://www.w3.org/TR/NOTE-datetime
   */
  iso8601: {

    /**
     * Dress a String `s` conforming to ISO8601 to a Date object. Raises
     * an ArgumentError if anything goes wrong.
     */
    dress: function(s) {
      var d = new Date(s);
      if ($cs.DateTime.isValidDate(d)) {
        return d;
      } else {
        throw new ArgumentError("Invalid Date string `" + s + "`");
      }
    },

    /**
     * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
     * unless `d` is a valid date.
     */
    undress: function(d) {
      if ($cs.DateTime.isValidDate(d)) {
        return d.toISOString();
      } else {
        throw new ArgumentError("Invalid Date `" + s + "`");
      }
    }

  }
}

module.exports = {Contracts: $cs}

},{"../errors":3,"./dress_helper":9}],9:[function(_dereq_,module,exports){
(function() {
  var $u, DressHelper, TypeError, _typeToString, _valueToString;

  TypeError = _dereq_('../errors').TypeError;

  $u = _dereq_('./utils');

  DressHelper = (function() {
    function DressHelper() {
      this.stack = [];
    }

    DressHelper.prototype.iterate = function(value, callback) {
      return $u.each(value, (function(_this) {
        return function(elm, index) {
          return _this.deeper(index, function() {
            return callback(elm, index);
          });
        };
      })(this));
    };

    DressHelper.prototype.deeper = function(location, callback) {
      var err, res, _err;
      _err = null;
      try {
        this.stack.push(location.toString());
        return res = callback();
      } catch (_error) {
        err = _error;
        return _err = err;
      } finally {
        this.stack.pop();
        if (_err === null) {
          res;
        } else {
          throw _err;
        }
      }
    };

    DressHelper.prototype.justTry = function(rescueOn, callback) {
      var err, _ref;
      if (callback == null) {
        _ref = [rescueOn, callback], callback = _ref[0], rescueOn = _ref[1];
      }
      if (rescueOn == null) {
        rescueOn = TypeError;
      }
      try {
        return [true, callback()];
      } catch (_error) {
        err = _error;
        if (err instanceof rescueOn) {
          return [false, null];
        } else {
          throw err;
        }
      }
    };

    DressHelper.prototype["try"] = function(type, value, callback) {
      var err;
      try {
        return callback();
      } catch (_error) {
        err = _error;
        if (err instanceof TypeError) {
          return this.failed(type, value, err);
        } else {
          throw err;
        }
      }
    };

    DressHelper.prototype.failed = function(type, value, cause) {
      var msg;
      if (cause == null) {
        cause = null;
      }
      msg = this.defaultErrorMessage(type, value);
      throw new TypeError(msg, cause, this.location());
    };

    DressHelper.prototype.fail = function(msg, cause) {
      if (cause == null) {
        cause = null;
      }
      throw new TypeError(msg, cause, this.location());
    };

    DressHelper.prototype.defaultErrorMessage = function(type, value) {
      var type_s, value_s, _ref;
      _ref = [_valueToString(value), _typeToString(type)], value_s = _ref[0], type_s = _ref[1];
      return "Invalid value `" + value_s + "` for " + type_s;
    };

    DressHelper.prototype.location = function() {
      return this.stack.join('/');
    };

    return DressHelper;

  })();

  _valueToString = function(value) {
    var s;
    if (value === void 0) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    s = value.toString();
    if (s.length > 25) {
      s = "" + (s.substring(0, 25)) + "...";
    }
    if (value instanceof Array) {
      s = "[" + s + "]";
    }
    return s;
  };

  _typeToString = function(type) {
    return type.name.toString();
  };

  module.exports = DressHelper;

}).call(this);

},{"../errors":3,"./utils":12}],10:[function(_dereq_,module,exports){
(function() {
  var $u, AdType, AnyType, ArgumentError, Attribute, BuiltinType, Constraint, Heading, NotImplementedError, RelationType, SeqType, SetType, SubType, TupleType, Type, TypeFactory, UnionType, fail, isNativeType, isRegexp, _ref,
    __slice = [].slice;

  Type = _dereq_('../type');

  Attribute = _dereq_('./attribute');

  Heading = _dereq_('./heading');

  Constraint = _dereq_('./constraint');

  $u = _dereq_('./utils');

  AnyType = _dereq_('../type/any_type');

  AdType = _dereq_('../type/ad_type');

  SeqType = _dereq_('../type/seq_type');

  SetType = _dereq_('../type/set_type');

  SubType = _dereq_('../type/sub_type');

  TupleType = _dereq_('../type/tuple_type');

  UnionType = _dereq_('../type/union_type');

  BuiltinType = _dereq_('../type/builtin_type');

  RelationType = _dereq_('../type/relation_type');

  _ref = _dereq_('../errors'), NotImplementedError = _ref.NotImplementedError, ArgumentError = _ref.ArgumentError;

  TypeFactory = (function() {
    TypeFactory.PUBLIC_DSL_METHODS = ['jsType', 'any', 'builtin', 'adt', 'sub_type', 'union', 'seq', 'set', 'tuple', 'relation', 'type'];

    function TypeFactory(world) {
      this.world = {
        'Number': Number,
        'String': String,
        'Boolean': Boolean,
        'Date': Date
      };
      $u.extend(this.world, world);
    }

    TypeFactory.prototype.type = function(t, name, callback) {
      var _ref1;
      if (callback == null) {
        if (typeof name === "function") {
          _ref1 = [name, callback], callback = _ref1[0], name = _ref1[1];
        }
      }
      if (callback != null) {
        return this.sub_type(this.type(t, name), callback);
      }
      if (t instanceof Type) {
        return t;
      } else if (isNativeType(t)) {
        return new BuiltinType(t, name || t.constructor.name);
      } else if (isRegexp(t)) {
        return this.sub_type(String, t);
      } else if (t instanceof Array) {
        if (t.length !== 1) {
          fail("Array of arity 1 expected, got", t);
        }
        return this.seq(t[0], name);
      } else if (typeof t === "object") {
        return this.tuple(t, name);
      } else {
        return fail("Unable to factor a Finitio.Type from `" + t + "`");
      }
    };

    TypeFactory.prototype.jsType = function(t) {
      var parts;
      if (typeof t === 'string') {
        parts = t.split('.');
        return $u.inject(parts, this.world, function(memo, part) {
          if (!memo[part]) {
            throw new ArgumentError("Unknown type " + t + " (no member " + part + " on " + memo + ")");
          }
          return memo[part];
        });
      } else if (isNativeType(t) || t instanceof Function) {
        return t;
      } else {
        return fail("JS primitive expected, got `" + t + "`");
      }
    };

    TypeFactory.prototype.name = function(name) {
      if (!(!(name != null) || ((name.constructor === String) && name.trim().length > 1))) {
        fail("Wrong type name `" + name + "`");
      }
      if (name != null) {
        return name.trim();
      } else {
        return null;
      }
    };

    TypeFactory.prototype.constraint = function(_name, _native) {
      var _ref1;
      if (_name instanceof Constraint) {
        return _name;
      }
      if (typeof _name !== "string") {
        _ref1 = ['default', _name], _name = _ref1[0], _native = _ref1[1];
      }
      return new Constraint(_name, _native);
    };

    TypeFactory.prototype.constraints = function(constraints, callback) {
      var constrs;
      constrs = [];
      if (callback != null) {
        constrs.push(this.constraint('default', callback));
      }
      if (constraints != null) {
        if (constraints.constructor === Array) {
          $u.each(constraints, (function(_this) {
            return function(c) {
              return constrs.push(_this.constraint(c));
            };
          })(this));
        } else if (constraints.constructor === RegExp) {
          constrs.push(this.constraint(constraints));
        } else if (typeof constraints === "object") {
          $u.each(constraints, (function(_this) {
            return function(c, n) {
              return constrs.push(_this.constraint(n, c));
            };
          })(this));
        } else {
          constrs.push(this.constraint(constraints));
        }
      }
      return constrs;
    };

    TypeFactory.prototype.attribute = function(name, type) {
      return new Attribute(name, this.type(type));
    };

    TypeFactory.prototype.attributes = function(attributes) {
      var attr;
      if (typeof attributes !== "object") {
        fail("Hash expected, got ", attributes);
      }
      attr = [];
      $u.each(attributes, (function(_this) {
        return function(type, name) {
          return attr.push(_this.attribute(name, type));
        };
      })(this));
      return attr;
    };

    TypeFactory.prototype.heading = function(heading) {
      if (heading instanceof Heading) {
        return heading;
      }
      if (heading.heading != null) {
        return heading.heading;
      }
      if (heading.constructor === Array) {
        return new Heading(heading);
      } else if (typeof heading === "object") {
        return new Heading(this.attributes(heading));
      } else {
        return fail("Heading expected, got", heading);
      }
    };

    TypeFactory.prototype.contracts = function(contracts) {
      var invalid;
      if (typeof contracts !== "object") {
        fail("Hash expected, got", contracts);
      }
      invalid = $u.filter($u.keys(contracts), function(k) {
        return k instanceof String;
      });
      if (invalid.length > 0) {
        fail("Invalid contract names `" + invalid + "`");
      }
      return contracts;
    };

    TypeFactory.prototype.any = function(name) {
      if (name == null) {
        name = null;
      }
      name = this.name(name);
      return new AnyType(name);
    };

    TypeFactory.prototype.builtin = function(primitive, _name) {
      if (_name == null) {
        _name = null;
      }
      primitive = this.jsType(primitive);
      _name = this.name(_name);
      return new BuiltinType(primitive, _name);
    };

    TypeFactory.prototype.adt = function(primitive, _contracts, _name) {
      var contracts;
      if (_name == null) {
        _name = null;
      }
      if (primitive != null) {
        primitive = this.jsType(primitive);
      }
      contracts = this.contracts(_contracts);
      _name = this.name(_name);
      return new AdType(primitive, _contracts, _name);
    };

    TypeFactory.prototype.sub_type = function(superType, _constraints, _name, callback) {
      var _ref1, _ref2;
      if (callback == null) {
        if (typeof _name === "function") {
          _ref1 = [_name, callback], callback = _ref1[0], _name = _ref1[1];
        }
      }
      if (callback == null) {
        if (typeof _constraints === "function") {
          _ref2 = [_constraints, callback], callback = _ref2[0], _constraints = _ref2[1];
        }
      }
      superType = this.type(superType);
      _constraints = this.constraints(_constraints, callback);
      _name = this.name(_name);
      return new SubType(superType, _constraints, _name);
    };

    TypeFactory.prototype.union = function() {
      var args, candidates, _name, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref1 = [[], null], candidates = _ref1[0], _name = _ref1[1];
      $u.each(args, (function(_this) {
        return function(arg) {
          if (arg.constructor === Array) {
            return candidates = $u.map(arg, function(t) {
              return _this.type(t);
            });
          } else if (arg.constructor === String) {
            return _name = _this.name(_name);
          } else {
            return candidates.push(arg);
          }
        };
      })(this));
      return new UnionType(candidates, _name);
    };

    TypeFactory.prototype.seq = function(elmType, name) {
      elmType = this.type(elmType);
      name = this.name(name);
      return new SeqType(elmType, name);
    };

    TypeFactory.prototype.set = function(elmType, name) {
      elmType = this.type(elmType);
      name = this.name(name);
      return new SetType(elmType, name);
    };

    TypeFactory.prototype.tuple = function(heading, name) {
      heading = this.heading(heading);
      name = this.name(name);
      return new TupleType(heading, name);
    };

    TypeFactory.prototype.relation = function(heading, name) {
      heading = this.heading(heading);
      name = this.name(name);
      return new RelationType(heading, name);
    };

    return TypeFactory;

  })();

  isNativeType = function(t) {
    var match;
    if (t == null) {
      return false;
    }
    match = $u.find([Number, Boolean, String], function(primitive) {
      return t === primitive;
    });
    return match != null;
  };

  isRegexp = function(t) {
    if (t == null) {
      return false;
    }
    return t.constructor === RegExp;
  };

  fail = function(msg, type) {
    if (type != null) {
      throw new ArgumentError(msg, type);
    } else {
      throw new ArgumentError(msg);
    }
  };

  module.exports = TypeFactory;

}).call(this);

},{"../errors":3,"../type":15,"../type/ad_type":16,"../type/any_type":17,"../type/builtin_type":18,"../type/relation_type":19,"../type/seq_type":20,"../type/set_type":21,"../type/sub_type":22,"../type/tuple_type":23,"../type/union_type":24,"./attribute":5,"./constraint":7,"./heading":11,"./utils":12}],11:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, Attribute, Heading, TypeError, _ref;

  _ref = _dereq_('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

  Attribute = _dereq_('./attribute');

  $u = _dereq_('./utils');

  Heading = (function() {
    function Heading(attributes) {
      if (!($u.isArray(attributes) && $u.every(attributes, function(a) {
        return a instanceof Attribute;
      }))) {
        throw new ArgumentError("Array of Attribute expected");
      }
      this.attributes = {};
      $u.each(attributes, (function(_this) {
        return function(attr) {
          if (_this.attributes[attr.name] != null) {
            throw new ArgumentError("Attribute names must be unique");
          }
          return _this.attributes[attr.name] = attr;
        };
      })(this));
    }

    Heading.prototype.size = function() {
      return $u.size(this.attributes);
    };

    Heading.prototype.isEmpty = function() {
      return this.size() === 0;
    };

    Heading.prototype.each = function(callback) {
      return $u.each($u.values(this.attributes), callback);
    };

    Heading.prototype.toName = function() {
      return $u.map($u.values(this.attributes), function(a) {
        return a.toName();
      }).join(', ');
    };

    Heading.prototype.names = function() {
      return $u.map($u.values(this.attributes), function(a) {
        return a.name;
      });
    };

    Heading.prototype.equals = function(other) {
      var valid;
      if (!(other instanceof Heading)) {
        return null;
      }
      if ($u.size(this.attributes) !== $u.size(other.attributes)) {
        return false;
      }
      valid = $u.every(this.attributes, function(attr, name) {
        var other_attr;
        other_attr = other.attributes[name];
        return attr.equals(other_attr);
      });
      return valid;
    };

    return Heading;

  })();

  module.exports = Heading;

}).call(this);

},{"../errors":3,"./attribute":5,"./utils":12}],12:[function(_dereq_,module,exports){
var ArgumentError = _dereq_("../errors").ArgumentError;

//
var Utilities = $u = {};

//******* Utilities

/**
  * Returns whether or not the parameter is an array
  *
  * Uses native `isArray` if present
  */
$u.isArray = function(obj){
  if (Array.isArray){
    return Array.isArray(obj);
  } else {
    return toString.call(obj) == '[object Array]';
  }
}

/**
  * Detects whether the javascript environment is a browser or not (node)
  */
$u.isBrowser = function(){
  return !(typeof exports !== 'undefined' && this.exports !== exports);
}

/**
  * Returns wheter or not the parameter is an object
  */
$u.isObject = function(obj){
  return Object(obj) === obj;
}

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a deep copy
  */
$u.deepClone = function(obj) {
  if (obj === null || obj === undefined) {
    throw new ArgumentError("Object expected, got", obj);
  }

  if (!$u.isObject(obj)){
    return obj;
  }

  else if (obj instanceof Function){
    return obj
  }

  else if ($u.isArray(obj)){
    return obj.slice();
  }

  else {
    var copy = {}
    $u.each(obj, function(v, k){
      copy[k] = $u.deepClone(v);
    })
    return copy;
  }
};

/**
  * Returns a new copy of an object (array, object or string supported)
  * !! Performs a shallow copy
  */
$u.clone = function(obj) {
  if (obj === null || obj === undefined){
    throw new ArgumentError("Object expected, got", obj);
  }

  if (!$u.isObject(obj)){
    return obj;
  }

  return $u.isArray(obj) ? obj.slice() : $u.extend({}, obj);
};

/**
  * Extends the given object with all the properties of the passsed-in obejct(s)
  */
$u.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  $u.each(args, function(source){
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

//******* ARRAY

$u.zip = function(dest) {
  if (!($u.isArray(dest))) {
    throw new ArgumentError("Array expected, got", dest);
  }

  //
  var sources = Array.prototype.slice.call(arguments, 1);

  // Check validity first
  $u.each(sources, function(source){
    if (!($u.isArray(source))) {
      throw new ArgumentError("Array expected, got", source);
    }
    if ($u.size(source) != $u.size(dest)) {
      throw new ArgumentError("Source(s) and destination Arrays must have same size");
    }
  })

  // Zip!
  var result = $u.map(dest, function(v, i){
    var array = [];
    array.push(v);
    $u.each(sources, function(source){
      array.push(source[i]);
    })
    return array;
  });

  return result;
}

$u.difference = function(objA, objB) {
  if (!($u.isArray(objA))) {
    throw new ArgumentError("Array expected, got", objA);
  }

  if (!($u.isArray(objB))) {
    throw new ArgumentError("Array expected, got", objB);
  }

  return $u.filter(objA, function(v){
    return !$u.contains(objB, v);
  });
}

$u.uniq = function(array, isSorted){
  if (!($u.isArray(array))) {
    throw new ArgumentError("Array expected, got", array);
  }
  if (typeof(isSorted) == "undefined"){
    isSorted = false;
  }
  var result = [];
  var seen = [];
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];
    if (isSorted ? (!i || seen !== value) : !$u.contains(seen, value)) {
      if (isSorted) seen = value;
      else seen.push(value);
      result.push(array[i]);
    }
  }
  return result;
};

$u.inject = function(obj, start, callback){
  // no date, regexp, undefined or null please
  if (!(obj instanceof Array)) {
    throw new ArgumentError("Array expected, got", obj);
  }
  res = start
  for (var i=0; i<obj.length; i++) {
    res = callback(res, obj[i]);
  }
  return res;
},

//******* ENUMERABLE

/**
  * Returns whether or not a given object is enumerable
  */
$u.isEnumerable = function(obj){
  if (obj === undefined || obj === null || obj instanceof RegExp ||
      obj instanceof Date || typeof(obj) == "boolean"){
    return false;
  }
  return true;
}

/**
  * Iterates over an Enumerable (String, Array, Object)
  * ! warning: Doesn't iterates RegExp, Date, Boolean, undefined, null
  *
  * On String:  callback(character, position)
  * On Array:   callback(value, position)
  * On Objects: callback(value, key)
  *
  * TODO: use *forEach* if present
  */
$u.each = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null){
    throw new Error("Function expected, got null")
  }
  if (callback === undefined){
    callback = function(){}
  }

  // no date, regexp, undefined or null please
  if (!($u.isEnumerable(obj))) {
    throw new ArgumentError("Enumerable (Array, Object, String) expected, got", obj);
  }

  // Strings
  if (typeof(obj) == "string"){
    return $u.each(obj.split(""), callback)
  }

  // Arrays
  if (typeof(obj) == "array"){
    for(var i=0; i<obj.length; i++){
      callback(obj[i], i);
    }
    return;
  }

  // Objects
  for (var key in obj){
    if (obj.hasOwnProperty(key)){
      callback(obj[key], key);
    }
  }
}

/**
  * Returns true if all of the iteration over the enumerable pass the predicate truth test
  *
  * Uses #each to iterate
  * TODO: delegate to *every* if present
  */
$u.every = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    $u.each(obj, function(v, k){
      var pass = callback(v, k);
      if (pass !== true){
        throw "fail";
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (e != "fail"){
      throw e;
    }
    return false;
  }

  return true;
}

/**
  * Returns the first element that apsses a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.find = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  // TODO: review this. How can we stop iterating
  // as soon as possible? (other than using exceptions)
  try {
    $u.each(obj, function(v, k){
      var pass = callback(v, k);
      if (pass == true){
        throw {found: v};
      }
    });
  } catch (e) {
    // If a real exception was raised, forward it
    if (typeof(e.found) == "undefined"){
      throw e;
    }
    return e.found;
  }

  return null;
}

/**
  * Returns the values of an enumerable that pass a truth test
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.filter = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  var values = [];
  $u.each(obj, function(v){
    if (callback(v)){
      values.push(v);
    }
  });
  return values;
}

/**
  * Returns the values of an enumerable that don't pass the truth test
  * (the exact opposite as $u.filter)
  *
  * Uses #each to iterate
  * TODO: use *every* if present
  */
$u.reject = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }

  var values = [];
  $u.each(obj, function(v){
    if (!callback(v)){
      values.push(v);
    }
  });
  return values;
}

/**
  * Produces a new array of values by mapping each value in list through a
  * transformation function
  *
  * Uses #each to iterate
  * TODO: use *map* if present
  */
$u.map = function(obj, callback){
  // callback can be undefined, but can't be null
  if (callback === null || callback === undefined){
    throw new ArgumentError("Function expected, got", callback)
  }
  var values = [];
  $u.each(obj, function(v, k){
    values.push(callback(v, k));
  });
  return values;
}

/**
  * Returns the values of an Enumerable (Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-enumerable
  *
  * Uses #each to iterate
  */
$u.values = function(obj){
  if (obj instanceof Array){
    return obj;
  }
  var values = [];
  $u.each(obj, function(v){
    values.push(v);
  })

  return values;
}

/**
  * Returns the keys of an Enumerable (Enumerable (String, Array, Object)
  *
  * String: array of character positions
  * Array: array of indices
  * Objects: array of keys
  *
  * ! warning: throws error if called for a non-enumerable
  * ! warning: all keys will be strings, whatever is the enumerable
  *
  * Uses #each to iterate
  */
$u.keys = function(obj){
  var keys = [];
  $u.each(obj, function(v, k){
    keys.push(k);
  })

  return keys;
}

/**
  * Returns the number of values of an Enumerable (String, Array, Object)
  *
  * ! warning: throws error if called for a non-object (even Array)
  *
  * Uses #each to iterate
  */
$u.size = function(obj){
  var values = $u.values(obj);
  return values.length;
}

// Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.
$u.contains = $u.include = function(obj, target) {
  if (!$u.isEnumerable(obj)){
    throw new ArgumentError("Enumerable (Array, Object, String) expected, got", obj);
  }
  var nativeIndexOf = Array.prototype.indexOf;
  if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
  var found = $u.find(obj, function(v){
    return v === target;
  });
  return found != null;
};

//******* STRINGS

/**
  * Capitalizes a string
  *
  * foo => Foo
  * fooBar => FooBar
  * foo bar => FooBar
  * foo_bar => FooBar
  **/
$u.capitalize = function(obj){
  if (typeof(obj) != "string"){
    throw new ArgumentError("String expected, got", obj)
  }
  if (obj.trim() == ""){
    return obj;
  }

  var string = obj;

  // Remove underscores
  if (string.indexOf("_") != -1){

    var tokens = string.split("_");

    for(var i=0; i<tokens.length; i++){
      tokens[i] = $u.capitalize(tokens[i]);
    }

    string = tokens.join('');
  }

  // Remove spaces
  if (string.indexOf(" ") != -1){

    tokens = string.split(" ");
    for(var i=0; i<tokens.length; i++){
      tokens[i] = $u.capitalize(tokens[i])
    }

    string = tokens.join('')
  }

  // Capitalize first letter
  string = string[0].toUpperCase() + string.slice(1);
  return string;
}

//
module.exports = Utilities

},{"../errors":3}],13:[function(_dereq_,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { system: peg$parsesystem, type: peg$parsetype, attribute: peg$parseattribute, heading: peg$parseheading },
        peg$startRuleFunction  = peg$parsesystem,

        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = function(m) {
            if (m){ options.system.main = m }
            return options.system;
          },
        peg$c3 = [],
        peg$c4 = "=",
        peg$c5 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c6 = function(n, t) {
            t.name = n;
            options.system.addType(t);
            return t;
          },
        peg$c7 = "|",
        peg$c8 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c9 = function(head, tail) {
              return Factory.union(headTailToArray(head, tail));
            },
        peg$c10 = function(t, c) {
              return Factory.sub_type(t, c)
            },
        peg$c11 = "(",
        peg$c12 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c13 = ")",
        peg$c14 = { type: "literal", value: ")", description: "\")\"" },
        peg$c15 = function(n, c) {
            return compileConstraints(n, c)
          },
        peg$c16 = ",",
        peg$c17 = { type: "literal", value: ",", description: "\",\"" },
        peg$c18 = function(head, tail) {
              return headTailToArray(head, tail);
            },
        peg$c19 = function(c) {
            return [c];
          },
        peg$c20 = ":",
        peg$c21 = { type: "literal", value: ":", description: "\":\"" },
        peg$c22 = function(n, e) {
            return [n, e];
          },
        peg$c23 = function(e) {
            return ['default', e];
          },
        peg$c24 = "{",
        peg$c25 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c26 = "}",
        peg$c27 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c28 = function(h) {
            return Factory.tuple(h)
          },
        peg$c29 = "{{",
        peg$c30 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c31 = "}}",
        peg$c32 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c33 = function(h) {
            return Factory.relation(h)
          },
        peg$c34 = function(head, tail) {
              return Factory.heading(headTailToArray(head, tail));
            },
        peg$c35 = function(n, t) {
            return Factory.attribute(n, t)
          },
        peg$c36 = function(t) {
            return Factory.set(t)
          },
        peg$c37 = "[",
        peg$c38 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c39 = "]",
        peg$c40 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c41 = function(t) {
            return Factory.seq(t)
          },
        peg$c42 = ".",
        peg$c43 = { type: "literal", value: ".", description: "\".\"" },
        peg$c44 = function(t, cs) {
            var jsType = (t) ? Factory.jsType(t[1]) : null;
            var contracts = compileContracts(cs, jsType);
            return Factory.adt(jsType, contracts);
          },
        peg$c45 = function(head, tail) {
            return headTailToArray(head, tail);
          },
        peg$c46 = "<",
        peg$c47 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c48 = ">",
        peg$c49 = { type: "literal", value: ">", description: "\">\"" },
        peg$c50 = function(n, t, d) {
            return [ n, t, d ];
          },
        peg$c51 = "\\",
        peg$c52 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c53 = function(up, down) {
              return [ up, down ];
            },
        peg$c54 = function(t) {
            pair = Factory.jsType(t);
            return extractExternalDressers(pair);
          },
        peg$c55 = function(n, e) {
            return compileLambda(n, e);
          },
        peg$c56 = function() {
            return Factory.any();
          },
        peg$c57 = function(name) {
            return Factory.builtin(name);
          },
        peg$c58 = function(n) {
            return options.system.fetch(n);
          },
        peg$c59 = "()",
        peg$c60 = { type: "literal", value: "()", description: "\"()\"" },
        peg$c61 = void 0,
        peg$c62 = /^[(,)]/,
        peg$c63 = { type: "class", value: "[(,)]", description: "[(,)]" },
        peg$c64 = { type: "any", description: "any character" },
        peg$c65 = /^[a-z]/,
        peg$c66 = { type: "class", value: "[a-z]", description: "[a-z]" },
        peg$c67 = /^[a-z0-9]/,
        peg$c68 = { type: "class", value: "[a-z0-9]", description: "[a-z0-9]" },
        peg$c69 = /^[a-zA-Z_]/,
        peg$c70 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c71 = /^[a-zA-Z0-9_]/,
        peg$c72 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c73 = /^[A-Z]/,
        peg$c74 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c75 = /^[a-zA-Z]/,
        peg$c76 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c77 = /^[a-zA-Z0-9:.]/,
        peg$c78 = { type: "class", value: "[a-zA-Z0-9:.]", description: "[a-zA-Z0-9:.]" },
        peg$c79 = "#",
        peg$c80 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c81 = /^[\n]/,
        peg$c82 = { type: "class", value: "[\\n]", description: "[\\n]" },
        peg$c83 = /^[ \t\n]/,
        peg$c84 = { type: "class", value: "[ \\t\\n]", description: "[ \\t\\n]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsesystem() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsedefinitions();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeof();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c2(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsedefinitions() {
      var s0, s1, s2, s3;

      s0 = [];
      s1 = peg$currPos;
      s2 = peg$parsespacing();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsetype_def();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$currPos;
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetype_def();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parsetype_def() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsetype_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseunion_type();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c6(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetype() {
      var s0;

      s0 = peg$parseunion_type();

      return s0;
    }

    function peg$parseunion_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsesub_type();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 124) {
          s4 = peg$c7;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsesub_type();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 124) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesub_type();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c9(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsesub_type();
      }

      return s0;
    }

    function peg$parsesub_type() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parserel_type();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseconstraint_fn();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c10(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parserel_type();
      }

      return s0;
    }

    function peg$parseconstraint_fn() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s5 = peg$c7;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseconstraints();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsespacing();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c13;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c14); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c15(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconstraints() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsenamed_constraint();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c16;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsespacing();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsenamed_constraint();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c16;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsespacing();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsenamed_constraint();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c18(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseunnamed_constraint();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsenamed_constraint() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseconstraint_name();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s2 = peg$c20;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c21); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexpression();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s1, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseunnamed_constraint() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c23(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parserel_type() {
      var s0;

      s0 = peg$parserelation_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetuple_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecollection_type();
        }
      }

      return s0;
    }

    function peg$parsetuple_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseheading();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c26;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c27); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c28(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c29) {
        s1 = peg$c29;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseheading();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c31) {
                s5 = peg$c31;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c32); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c33(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseheading() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseattribute();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c16;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsespacing();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseattribute();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c16;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsespacing();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseattribute();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c34(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsespacing();
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseattribute_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c20;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c21); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseunion_type();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c35(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecollection_type() {
      var s0;

      s0 = peg$parseset_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parseseq_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parseterm_type();
        }
      }

      return s0;
    }

    function peg$parseset_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c24;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c26;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c27); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c36(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseseq_type() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c37;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c39;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c40); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c41(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseterm_type() {
      var s0;

      s0 = peg$parsead_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parsebuiltin_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parseany_type();
          if (s0 === peg$FAILED) {
            s0 = peg$parsetype_ref();
          }
        }
      }

      return s0;
    }

    function peg$parsead_type() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c42;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsebuiltin_type_name();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecontracts();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c44(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecontracts() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsecontract();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c16;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsespacing();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsecontract();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c16;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsespacing();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsecontract();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c45(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecontract() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c46;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecontract_name();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c48;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c49); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseunion_type();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsedressers();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c1;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c50(s2, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsedressers() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c51;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselambda_expr();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 92) {
              s4 = peg$c51;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c52); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parselambda_expr();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c53(s2, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c43); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsebuiltin_type_name();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c54(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parselambda_expr() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s5 = peg$c7;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseexpression();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsespacing();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c13;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c14); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c55(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseany_type() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c56();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsebuiltin_type() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsebuiltin_type_name();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c57(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetype_ref() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsetype_name();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c58(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseparen_expression();
      if (s2 === peg$FAILED) {
        s2 = peg$parseany_expression();
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseparen_expression();
          if (s2 === peg$FAILED) {
            s2 = peg$parseany_expression();
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseparen_expression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c59) {
        s1 = peg$c59;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c60); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c11;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c13;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c14); }
            }
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseany_expression() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      if (peg$c62.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c63); }
      }
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = peg$c61;
      } else {
        peg$currPos = s3;
        s3 = peg$c0;
      }
      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          if (peg$c62.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c63); }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c61;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c64); }
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsevar_name() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c65.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c66); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecontract_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c67.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c68); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c67.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c68); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstraint_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c69.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c69.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c70); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseattribute_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c66); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c71.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c71.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c72); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsetype_name() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c73.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c75.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c76); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c75.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c76); }
            }
          }
        } else {
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsebuiltin_type_name() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c77.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c78); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c77.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c78); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsespacing() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsespaces();
      if (s2 === peg$FAILED) {
        s2 = peg$parsecomment();
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsespaces();
        if (s2 === peg$FAILED) {
          s2 = peg$parsecomment();
        }
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c79;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c80); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$currPos;
        peg$silentFails++;
        if (peg$c81.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c82); }
        }
        peg$silentFails--;
        if (s6 === peg$FAILED) {
          s5 = peg$c61;
        } else {
          peg$currPos = s5;
          s5 = peg$c0;
        }
        if (s5 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c64); }
          }
          if (s6 !== peg$FAILED) {
            s5 = [s5, s6];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c82); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c61;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c64); }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
        }
        if (s3 !== peg$FAILED) {
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c82); }
          }
          if (s4 === peg$FAILED) {
            s4 = peg$c1;
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsespaces() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c83.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c84); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c83.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c84); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseeof() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c61;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }


      if (!options.world) {
        options.world = {};
      }
      if (!options.system) {
        System = _dereq_('../system');
        options.system = new System();
      }
      if (!options.factory) {
        TypeFactory = _dereq_('../support/factory');
        options.factory = new TypeFactory(options.world);
      }
      Factory = options.factory;

      // converts head:X tail(... X)* to an array of Xs
      function headTailToArray(head, tail) {
        var result = [ head ];
        for (var i = 0; i < tail.length; i++) {
          result[i+1] = tail[i][tail[i].length-1];
        }
        return result;
      }

      // compile an open expression given the varname for closing it
      function compileLambda(varname, expr) {
        var src = "x = function(" + varname + ")" + "{ return " + expr + "; }";
        try {
          return eval(src);
        } catch(e) {
          error("Syntax error in: `" + expr + "`");
        }
      }

      // compile a [ [n1, expr1], ... ] to an array of constraints
      function compileConstraints(varname, defs) {
        var cs = [];
        for (var i = 0; i < defs.length; i++) {
          var name = defs[i][0];
          var expr = defs[i][1];
          var fn   = compileLambda(varname, expr);
          cs[i] = Factory.constraint(name, fn);
        }
        return cs;
      }

      // Extract dress/undress function from `from`
      function extractExternalDressers(from) {
        if (from && from.dress instanceof Function && from.undress instanceof Function) {
          return [ from.dress, from.undress ];
        } else {
          error("Invalid information contractor `" + from + "`");
        }
      }

      // Extract dress/undress internal functions from `from`
      function extractInternalDressers(contractName, from) {
        if (from && from[contractName] instanceof Function) {
          var undName = 'to' + contractName.charAt(0).toUpperCase()
                             + contractName.slice(1);
          var undresser = function(value) {
            return value[undName]();
          }
          return [ from[contractName], undresser ];
        } else {
          error("Invalid information contractor `" + from + "`");
        }
      }

      // compile a [ name, type, [dress, undres]? ] to a contract representation
      function compileContract(c, jsType) {
        if (c[2] === null) {
          if (jsType) {
            c[2] = extractInternalDressers(c[0], jsType);
          } else {
            var identity = function(x){ return x; }
            c[2] = [ identity, identity ];
          }
        }
        return [ c[1], c[2][0], c[2][1] ];
      }

      // compile a [ [ name, type, [dress, undress]? ] ] to an object with
      // contracts by name
      function compileContracts(cs, jsType) {
        var contracts = {};
        for (var i = 0; i<cs.length; i++) {
          contracts[cs[i][0]] = compileContract(cs[i], jsType);
        }
        return contracts;
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

},{"../support/factory":10,"../system":14}],14:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, Error, KeyError, Parser, System, Type, TypeFactory, _ref;

  _ref = _dereq_('./errors'), Error = _ref.Error, KeyError = _ref.KeyError, ArgumentError = _ref.ArgumentError;

  Type = _dereq_('./type');

  TypeFactory = _dereq_('./support/factory');

  Parser = _dereq_('./syntax/parser');

  System = (function() {
    function System(types, main) {
      var method, name, type, _i, _len, _ref1, _ref2;
      this.types = types;
      this.main = main;
      if (this.types == null) {
        this.types = {};
      }
      if (this.main == null) {
        this.main = null;
      }
      if (this.factory == null) {
        this.factory = new TypeFactory;
      }
      _ref1 = this.types;
      for (name in _ref1) {
        type = _ref1[name];
        this[type.name] = type;
      }
      _ref2 = TypeFactory.PUBLIC_DSL_METHODS;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        method = _ref2[_i];
        this[method] = this.factory[method].bind(this.factory);
      }
    }

    System.prototype.addType = function(type) {
      if (!(type instanceof Type)) {
        throw new ArgumentError("Finitio.Type expected, got", type);
      }
      if (this.types[type.name] != null) {
        throw new Error("Duplicate type name `" + type.name + "`");
      }
      this.types[type.name] = type;
      return this[type.name] = type;
    };

    System.prototype.getType = function(name) {
      return this.types[name];
    };

    System.prototype.fetch = function(name, callback) {
      if (this.types[name] != null) {
        return this.types[name];
      }
      if (callback == null) {
        throw new KeyError("No type found: " + name);
      }
      return callback();
    };

    System.prototype.merge = function(other) {
      var merged_main, merged_types;
      if (!(other instanceof System)) {
        throw new ArgumentError("Finitio.System expected, got", other);
      }
      merged_types = $u.extend({}, this.types, other.types);
      merged_main = other.main || this.main;
      return new System(merged_types, merged_main);
    };

    System.prototype.parse = function(source) {
      return Parser.parse(source, {
        system: this.clone()
      });
    };

    System.prototype.dress = function(value) {
      if (!this.main) {
        throw new Error("No main on System");
      }
      return this.main.dress(value);
    };

    System.prototype.clone = function() {
      return new System($u.clone(this.types), this.main);
    };

    return System;

  })();

  module.exports = System;

}).call(this);

},{"./errors":3,"./support/factory":10,"./syntax/parser":13,"./type":15}],15:[function(_dereq_,module,exports){
(function() {
  var ArgumentError, NotImplementedError, Type, _ref;

  _ref = _dereq_('./errors'), ArgumentError = _ref.ArgumentError, NotImplementedError = _ref.NotImplementedError;

  Type = (function() {
    function Type(name) {
      this.name = name;
      if ((this.name != null) && typeof this.name !== "string") {
        throw new ArgumentError("String expected, got", this.name);
      }
      if (this.name == null) {
        this.name = this.defaultName();
      }
    }

    Type.prototype.dress = function() {
      throw new NotImplementedError(this, "up");
    };

    Type.prototype.toString = function() {
      return this.name.toString();
    };

    return Type;

  })();

  module.exports = Type;

}).call(this);

},{"./errors":3}],16:[function(_dereq_,module,exports){
(function() {
  var $u, AdType, ArgumentError, DressHelper, Type, TypeError, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = _dereq_('../errors'), ArgumentError = _ref.ArgumentError, TypeError = _ref.TypeError;

  DressHelper = _dereq_('../support/dress_helper');

  Type = _dereq_('../type');

  $u = _dereq_('../support/utils');

  AdType = (function(_super) {
    __extends(AdType, _super);

    function AdType(jsType, contracts, name) {
      var invalid;
      this.jsType = jsType;
      this.contracts = contracts;
      this.name = name;
      if (this.jsType && !(this.jsType instanceof Function)) {
        throw new ArgumentError("Constructor (function) expected, got", this.jsType);
      }
      if (typeof this.contracts !== "object") {
        throw new ArgumentError("Hash expected, got", this.contracts);
      }
      invalid = $u.reject($u.values(this.contracts), function(v) {
        return v instanceof Array && v.length === 3 && v[0] instanceof Type && v[1] instanceof Function && v[2] instanceof Function;
      });
      if (invalid.length !== 0) {
        throw new ArgumentError("Invalid contracts `" + invalid + "`");
      }
      AdType.__super__.constructor.call(this, this.name);
    }

    AdType.prototype.contractNames = function() {
      return $u.keys(this.contracts);
    };

    AdType.prototype.defaultName = function() {
      return (this.jsType && this.jsType.name) || "Anonymous";
    };

    AdType.prototype.include = function(value) {
      return value.constructor === this.jsType;
    };

    AdType.prototype.dress = function(value, helper) {
      var candidate, infoType, success, uped, upper, _ref1;
      if (helper == null) {
        helper = new DressHelper;
      }
      if (this.jsType && value instanceof this.jsType) {
        return value;
      }
      uped = null;
      candidate = $u.find(this.contracts, function(contract, name) {
        var infotype, success, upper, _ref1;
        infotype = contract[0], upper = contract[1];
        _ref1 = helper.justTry(function() {
          return infotype.dress(value, helper);
        }), success = _ref1[0], uped = _ref1[1];
        return success;
      });
      if (candidate != null) {
        infoType = candidate[0], upper = candidate[1];
        _ref1 = helper.justTry(Error, function() {
          return upper(uped);
        }), success = _ref1[0], uped = _ref1[1];
        if (success) {
          return uped;
        }
      }
      return helper.failed(this, value);
    };

    return AdType;

  })(Type);

  module.exports = AdType;

}).call(this);

},{"../errors":3,"../support/dress_helper":9,"../support/utils":12,"../type":15}],17:[function(_dereq_,module,exports){
(function() {
  var AnyType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  AnyType = (function(_super) {
    __extends(AnyType, _super);

    function AnyType(name) {
      this.name = name;
      AnyType.__super__.constructor.call(this, this.name);
    }

    AnyType.prototype.dress = function(value, helper) {
      return value;
    };

    AnyType.prototype.defaultName = function() {
      return "Any";
    };

    AnyType.prototype.include = function(value) {
      return true;
    };

    AnyType.prototype.equals = function(other) {
      if (!(other instanceof AnyType)) {
        return false;
      }
      return true;
    };

    return AnyType;

  })(Type);

  module.exports = AnyType;

}).call(this);

},{"../type":15}],18:[function(_dereq_,module,exports){
(function() {
  var BuiltinType, DressHelper, NotImplementedError, Type,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  NotImplementedError = _dereq_('../errors').NotImplementedError;

  DressHelper = _dereq_('../support/dress_helper');

  Type = _dereq_('../type');

  BuiltinType = (function(_super) {
    __extends(BuiltinType, _super);

    function BuiltinType(jsType, name) {
      this.jsType = jsType;
      this.name = name;
      this.equals = __bind(this.equals, this);
      BuiltinType.__super__.constructor.call(this, this.name);
    }

    BuiltinType.prototype.dress = function(value, helper) {
      if (helper == null) {
        helper = new DressHelper;
      }
      if (value === null || value === void 0) {
        helper.failed(this, value);
      }
      if (value.constructor !== this.jsType) {
        helper.failed(this, value);
      }
      return value;
    };

    BuiltinType.prototype.defaultName = function() {
      return this.jsType.name;
    };

    BuiltinType.prototype.include = function(value) {
      return value.constructor === this.jsType;
    };

    BuiltinType.prototype.equals = function(other) {
      if (!(other instanceof BuiltinType)) {
        return false;
      }
      return other.jsType === this.jsType;
    };

    return BuiltinType;

  })(Type);

  module.exports = BuiltinType;

}).call(this);

},{"../errors":3,"../support/dress_helper":9,"../type":15}],19:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, DressHelper, Heading, RelationType, TupleType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  TupleType = _dereq_('./tuple_type');

  Heading = _dereq_('../support/heading');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  RelationType = (function(_super) {
    __extends(RelationType, _super);

    function RelationType(heading, name) {
      this.heading = heading;
      this.name = name;
      if (!(this.heading instanceof Heading)) {
        throw new ArgumentError("Heading expected, got", this.heading);
      }
      this.tupleType = new TupleType(heading);
      RelationType.__super__.constructor.call(this, this.name);
    }

    RelationType.prototype.defaultName = function() {
      return "{{" + (this.heading.toName()) + "}}";
    };

    RelationType.prototype.include = function(value) {
      var v, _i, _len;
      if (value === null || value === void 0) {
        return false;
      }
      if (value.constructor !== Array) {
        return false;
      }
      for (_i = 0, _len = value.length; _i < _len; _i++) {
        v = value[_i];
        if (!this.tupleType.include(v)) {
          return false;
        }
      }
      return true;
    };

    RelationType.prototype.dress = function(value, helper) {
      var set;
      if (helper == null) {
        helper = new DressHelper;
      }
      if (!(typeof value === "object" || typeof value === "array")) {
        helper.failed(this, value);
      }
      set = {};
      helper.iterate(value, (function(_this) {
        return function(tuple, index) {
          var key;
          tuple = _this.tupleType.dress(tuple, helper);
          key = JSON.stringify(tuple);
          if (set[key] != null) {
            helper.fail("Duplicate tuple");
          }
          return set[key] = tuple;
        };
      })(this));
      return $u.values(set);
    };

    RelationType.prototype.equals = function(other) {
      if (!(other instanceof RelationType)) {
        return false;
      }
      return this.heading.equals(other.heading);
    };

    return RelationType;

  })(Type);

  module.exports = RelationType;

}).call(this);

},{"../errors":3,"../support/dress_helper":9,"../support/heading":11,"../support/utils":12,"../type":15,"./tuple_type":23}],20:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, CollectionType, DressHelper, SeqType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  CollectionType = _dereq_('../support/collection_type');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  SeqType = (function(_super) {
    __extends(SeqType, _super);

    function SeqType() {
      return SeqType.__super__.constructor.apply(this, arguments);
    }

    SeqType.prototype.include = function(value) {
      return value instanceof Array && $u.every(value, (function(_this) {
        return function(v) {
          return _this.elmType.include(v);
        };
      })(this));
    };

    SeqType.prototype.dress = function(value, helper) {
      var array;
      if (helper == null) {
        helper = new DressHelper;
      }
      if (!(value instanceof Array)) {
        helper.failed(this, value);
      }
      array = [];
      helper.iterate(value, (function(_this) {
        return function(elm, index) {
          return array.push(_this.elmType.dress(elm, helper));
        };
      })(this));
      return array;
    };

    SeqType.prototype.defaultName = function() {
      return "[" + this.elmType.name + "]";
    };

    return SeqType;

  })(CollectionType);

  module.exports = SeqType;

}).call(this);

},{"../errors":3,"../support/collection_type":6,"../support/dress_helper":9,"../support/utils":12,"../type":15}],21:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, CollectionType, DressHelper, SetType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  CollectionType = _dereq_('../support/collection_type');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  SetType = (function(_super) {
    __extends(SetType, _super);

    function SetType() {
      return SetType.__super__.constructor.apply(this, arguments);
    }

    SetType.prototype.include = function(value) {
      if (!(value instanceof Array)) {
        return false;
      }
      if (!$u.every(value, (function(_this) {
        return function(v) {
          return _this.elmType.include(v);
        };
      })(this))) {
        return false;
      }
      return $u.uniq(value).length === value.length;
    };

    SetType.prototype.dress = function(value, helper) {
      var array;
      if (helper == null) {
        helper = new DressHelper;
      }
      if (!(value instanceof Array)) {
        helper.failed(this, value);
      }
      array = [];
      helper.iterate(value, (function(_this) {
        return function(elm, index) {
          var dressed;
          dressed = _this.elmType.dress(elm, helper);
          if ($u.include(array, dressed)) {
            return helper.fail("Duplicate value `" + dressed + "`");
          } else {
            return array.push(dressed);
          }
        };
      })(this));
      return array;
    };

    SetType.prototype.defaultName = function() {
      return "{" + this.elmType.name + "}";
    };

    return SetType;

  })(CollectionType);

  module.exports = SetType;

}).call(this);

},{"../errors":3,"../support/collection_type":6,"../support/dress_helper":9,"../support/utils":12,"../type":15}],22:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, Constraint, DressHelper, SubType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  Constraint = _dereq_('../support/constraint');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  SubType = (function(_super) {
    __extends(SubType, _super);

    function SubType(superType, constraints, name) {
      this.superType = superType;
      this.constraints = constraints;
      this.name = name;
      if (this.name == null) {
        this.name = null;
      }
      if (!(this.superType instanceof Type)) {
        throw new ArgumentError("Finitio.Type expected, got", this.superType);
      }
      if (this.constraints.constructor !== Array) {
        throw new ArgumentError("Array expected for constraints, got", this.constraints);
      }
      if (!(this.constraints.length > 0)) {
        throw new ArgumentError("Empty constraints not allowed on SubType");
      }
      if (!$u.every(this.constraints, function(c) {
        return c.constructor === Constraint;
      })) {
        throw new ArgumentError("Array of constraints expected, got", this.constraints);
      }
      SubType.__super__.constructor.call(this, this.name);
    }

    SubType.prototype.dress = function(value, helper) {
      var uped;
      if (helper == null) {
        helper = new DressHelper;
      }
      uped = helper["try"](this, value, (function(_this) {
        return function() {
          return _this.superType.dress(value, helper);
        };
      })(this));
      $u.each(this.constraints, (function(_this) {
        return function(constraint) {
          var msg;
          if (constraint.accept(uped)) {
            return;
          }
          msg = helper.defaultErrorMessage(_this, value);
          if (!_this.defaultConstraint(constraint)) {
            msg += " (not " + constraint.name + ")";
          }
          return helper.fail(msg);
        };
      })(this));
      return uped;
    };

    SubType.prototype.defaultName = function() {
      return $u.capitalize(this.constraints[0].name);
    };

    SubType.prototype.include = function(value) {
      return this.superType.include(value) && $u.every(this.constraints, function(c) {
        return c.accept(value);
      });
    };

    SubType.prototype.equals = function(other) {
      if (!(other instanceof SubType)) {
        return false;
      }
      return this.superType.equals(other.superType) && this.constraints.length === other.constraints.length && $u.every($u.zip(this.constraints, other.constraints), function(pair) {
        return pair[0].equals(pair[1]);
      });
    };

    SubType.prototype.defaultConstraint = function(constraint) {
      return constraint.isAnonymous() || $u.capitalize(constraint.name) === this.name;
    };

    return SubType;

  })(Type);

  module.exports = SubType;

}).call(this);

},{"../errors":3,"../support/constraint":7,"../support/dress_helper":9,"../support/utils":12,"../type":15}],23:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, DressHelper, Heading, TupleType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  Heading = _dereq_('../support/heading');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  TupleType = (function(_super) {
    __extends(TupleType, _super);

    function TupleType(heading, name) {
      this.heading = heading;
      this.name = name;
      if (!(this.heading instanceof Heading)) {
        throw new ArgumentError("Heading expected, got", this.heading);
      }
      if (this.name == null) {
        this.name = null;
      }
      TupleType.__super__.constructor.call(this, this.name);
    }

    TupleType.prototype.dress = function(value, helper) {
      var extra, uped;
      if (helper == null) {
        helper = new DressHelper;
      }
      if (!(value instanceof Object)) {
        helper.failed(this, value);
      }
      uped = {};
      if ($u.size(value) > $u.size(this.heading.names())) {
        extra = $u.difference($u.keys(value), this.heading.names());
        helper.fail("Unrecognized attribute `" + extra[0] + "`");
      }
      $u.each(this.heading.attributes, function(attribute) {
        var val;
        val = attribute.fetchOn(value, function() {
          return helper.fail("Missing attribute `" + attribute.name + "`");
        });
        return helper.deeper(attribute.name, function() {
          return uped[attribute.name] = attribute.type.dress(val, helper);
        });
      });
      return uped;
    };

    TupleType.prototype.include = function(value) {
      if (typeof value !== "object") {
        return false;
      }
      if ($u.size(value) > $u.size(this.heading.attributes)) {
        return false;
      }
      return $u.every(this.heading.attributes, function(attribute) {
        var attr_val;
        if (value[attribute.name] == null) {
          return false;
        }
        attr_val = value[attribute.name];
        return attribute.type.include(attr_val);
      });
    };

    TupleType.prototype.defaultName = function() {
      return "{" + (this.heading.toName()) + "}";
    };

    TupleType.prototype.equals = function(other) {
      if (!(other instanceof TupleType)) {
        return false;
      }
      return this.heading.equals(other.heading);
    };

    return TupleType;

  })(Type);

  module.exports = TupleType;

}).call(this);

},{"../errors":3,"../support/dress_helper":9,"../support/heading":11,"../support/utils":12,"../type":15}],24:[function(_dereq_,module,exports){
(function() {
  var $u, ArgumentError, DressHelper, Type, UnionType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Type = _dereq_('../type');

  DressHelper = _dereq_('../support/dress_helper');

  ArgumentError = _dereq_('../errors').ArgumentError;

  $u = _dereq_('../support/utils');

  UnionType = (function(_super) {
    __extends(UnionType, _super);

    function UnionType(candidates, name) {
      this.candidates = candidates;
      this.name = name;
      if (this.name == null) {
        this.name = null;
      }
      $u.each(this.candidates, function(c) {
        if (!(c instanceof Type)) {
          throw new ArgumentError("Finitio.Type expected, got", c);
        }
      });
      UnionType.__super__.constructor.call(this, this.name);
    }

    UnionType.prototype.dress = function(value, helper) {
      var match;
      if (helper == null) {
        helper = new DressHelper;
      }
      match = $u.find(this.candidates, function(c) {
        var success, uped, _ref;
        _ref = helper.justTry(function() {
          return c.dress(value, helper);
        }), success = _ref[0], uped = _ref[1];
        return success;
      });
      if (match != null) {
        return match.dress(value, helper);
      }
      return helper.failed(this, value);
    };

    UnionType.prototype.include = function(value) {
      var found;
      found = $u.find(this.candidates, function(c) {
        return c.include(value);
      });
      return found != null;
    };

    UnionType.prototype.defaultName = function() {
      return $u.map(this.candidates, function(c) {
        return c.name;
      }).join('|');
    };

    UnionType.prototype.equals = function(other) {
      if (!(other instanceof UnionType)) {
        return false;
      }
      if ($u.size(other.candidates) !== $u.size(this.candidates)) {
        return false;
      }
      $u.each(this.candidates, function(c, i) {
        if (!other.candidates[i].equals(c)) {
          return false;
        }
      });
      return true;
    };

    return UnionType;

  })(Type);

  module.exports = UnionType;

}).call(this);

},{"../errors":3,"../support/dress_helper":9,"../support/utils":12,"../type":15}]},{},[1])
(1)
});