(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "finitio",
  "version": "0.1.0",
  "description": "Finitio is a language for capturing information structure.",
  "main": "index.js",
  "author": "Louis Lambeau <louislambeau@gmail.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/llambeau/finitio.js"
  },
  "keywords": [
    "finitio",
    "typing",
    "system",
    "json",
    "serialization",
    "validation"
  ],
  "analyze": true,
  "bin": {
    "finitio-js": "./bin/finitio-js"
  },
  "scripts": {
    "test": "grunt",
    "build": "grunt compile",
    "prepublish": "grunt compile"
  },
  "dependencies": {
    "commander": "~2.2.0"
  },
  "devDependencies": {
    "coffee-script": "~1.7.1",
    "cucumber": "~0.4.0",
    "underscore": "~1.6.0",
    "shelljs": "~0.2.6",
    "should": "~3.1.2",
    "browserify": "~3.32.0",
    "coffeeify": "~0.6.0",
    "pegjs": "~0.8.0",
    "grunt": "~0.4.2",
    "grunt-cli": "~0.1.6",
    "grunt-contrib-connect": "~0.7.1",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-browserify": "~2.0.8",
    "grunt-coffeelint": "0.0.8",
    "grunt-cucumber": "git://github.com/llambeau/grunt-cucumber-js.git#master",
    "grunt-saucelabs": "~5.0.1",
    "grunt-mocha-test": "~0.9.4",
    "grunt-contrib-coffee": "~0.10.1",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-peg": "~1.3.1",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-fixtures2js": "~0.1",
    "grunt-shell": "~0.7.0"
  }
}

},{}],2:[function(require,module,exports){
(function() {
  var $u, Finitio, extendWorld;

  $u = require('./finitio/support/utils');

  Finitio = (function() {
    function Finitio() {}

    Finitio.VERSION = require('../package.json').version;

    Finitio.CONFORMANCE = "0.4";

    Finitio.World = {
      'Finitio': Finitio,
      'JsTypes': {
        'Finitio': Finitio,
        'Number': Number,
        'String': String,
        'Boolean': Boolean,
        'Date': Date,
        'Function': Function,
        'RegExp': RegExp
      },
      'importResolver': require('./finitio/resolver')
    };

    Finitio.world = function() {
      var arg, world, _i, _len;
      world = $u.clone(Finitio.World);
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        arg = arguments[_i];
        if (arg) {
          extendWorld(world, arg);
        }
      }
      return world;
    };

    Finitio.parse = function(source, options) {
      return this.Parser.parse(source, options || {});
    };

    Finitio.system = function(source, world) {
      if (typeof source === 'string') {
        source = this.parse(source);
      }
      return this.Meta.System.dress(source, this.world(world));
    };

    Finitio.bundleFile = function(path, world) {
      return (new this.Bundler(this.world(world))).addFile(path).flush();
    };

    Finitio.bundleSource = function(source, world) {
      return (new this.Bundler(this.world(world))).addSource(source).flush();
    };

    return Finitio;

  })();

  extendWorld = function(world, ext) {
    var k, v, _results;
    _results = [];
    for (k in ext) {
      v = ext[k];
      if (k === 'JsTypes') {
        _results.push(world[k] = $u.extend(world[k], v));
      } else {
        _results.push(world[k] = v);
      }
    }
    return _results;
  };

  Finitio.TypeError = require('./finitio/errors').TypeError;

  Finitio.Utils = require('./finitio/support/utils');

  Finitio.Contracts = require('./finitio/contracts');

  Finitio.Attribute = require('./finitio/support/attribute');

  Finitio.Contract = require('./finitio/support/contract');

  Finitio.Heading = require('./finitio/support/heading');

  Finitio.Constraint = require('./finitio/support/constraint');

  Finitio.System = require('./finitio/system');

  Finitio.Parser = require('./finitio/parser');

  Finitio.Bundler = require('./finitio/bundler');

  Finitio.Type = require('./finitio/type');

  Finitio.TypeDef = require('./finitio/type/type_def');

  Finitio.TypeRef = require('./finitio/type/type_ref');

  Finitio.AdType = require('./finitio/type/ad_type');

  Finitio.AnyType = require('./finitio/type/any_type');

  Finitio.BuiltinType = require('./finitio/type/builtin_type');

  Finitio.RelationType = require('./finitio/type/relation_type');

  Finitio.SeqType = require('./finitio/type/seq_type');

  Finitio.SetType = require('./finitio/type/set_type');

  Finitio.StructType = require('./finitio/type/struct_type');

  Finitio.SubType = require('./finitio/type/sub_type');

  Finitio.TupleType = require('./finitio/type/tuple_type');

  Finitio.UnionType = require('./finitio/type/union_type');

  Finitio.Meta = require('./finitio/support/meta');

  module.exports = Finitio;

}).call(this);

},{"../package.json":1,"./finitio/bundler":3,"./finitio/contracts":4,"./finitio/errors":9,"./finitio/parser":10,"./finitio/resolver":11,"./finitio/support/attribute":13,"./finitio/support/constraint":15,"./finitio/support/contract":16,"./finitio/support/heading":19,"./finitio/support/meta":22,"./finitio/support/utils":23,"./finitio/system":24,"./finitio/type":25,"./finitio/type/ad_type":26,"./finitio/type/any_type":27,"./finitio/type/builtin_type":28,"./finitio/type/relation_type":29,"./finitio/type/seq_type":30,"./finitio/type/set_type":31,"./finitio/type/struct_type":32,"./finitio/type/sub_type":33,"./finitio/type/tuple_type":34,"./finitio/type/type_def":35,"./finitio/type/type_ref":36,"./finitio/type/union_type":37}],3:[function(require,module,exports){
(function() {
  var $u, Bundler, Meta, Parser, fs;

  Parser = require('./parser');

  Meta = require('./support/meta');

  $u = require('./support/utils');

  fs = require('fs');

  Bundler = (function() {
    var TEMPLATE;

    TEMPLATE = "module.exports = (function(){\n  var ss = JSONDATA;\n  var r = function(fallback){\n    return function(path, w, options){\n      var s = ss[path];\n      if (s){\n        if (options && options.raw){\n          return [ path, s ];\n        } else {\n          return w.Finitio.system(s, w);\n        }\n      } else if (fallback) {\n        return fallback(path, w, options);\n      } else {\n        throw new Error('Unable to resolve: `' + path + '`');\n      }\n    };\n  };\n  return function(w, options){\n    if (!w) { w = require('finit' + 'io.js').World; }\n    w = w.Finitio.world(w, {\n      importResolver: r(w.importResolver)\n    });\n    return w.importResolver('URL', w, options);\n  };\n})();";

    function Bundler(world) {
      this.world = world;
      this.systems = {};
    }

    Bundler.prototype.flush = function() {
      return TEMPLATE.replace(/^[ ]{4}/, '').replace(/JSONDATA/, JSON.stringify(this.systems)).replace(/URL/, this.world.sourceUrl);
    };

    Bundler.prototype.addDirectory = function(path) {
      throw new Error("Bundling directories is not supported");
    };

    Bundler.prototype.addFile = function(path) {
      var src;
      if (fs.lstatSync(path).isDirectory()) {
        this.addDirectory(path);
      } else {
        src = fs.readFileSync(path).toString();
        this.addSource(src);
      }
      return this;
    };

    Bundler.prototype.addSource = function(source) {
      this._bundle(this.world.Finitio.parse(source), this.world);
      return this;
    };

    Bundler.prototype._bundle = function(system, world) {
      var imp, newWorld, pair, _i, _len, _ref, _results;
      if (world.check) {
        world.Finitio.system(system, world);
      }
      this.systems[world.sourceUrl] = system;
      if (!system.imports) {
        return;
      }
      _ref = system.imports;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        imp = _ref[_i];
        pair = world.importResolver(imp.from, world, {
          raw: true
        });
        imp.from = pair[0];
        newWorld = world.Finitio.world(world, {
          sourceUrl: pair[0]
        });
        _results.push(this._bundle(pair[1], newWorld));
      }
      return _results;
    };

    return Bundler;

  })();

  module.exports = Bundler;

}).call(this);

},{"./parser":10,"./support/meta":22,"./support/utils":23,"fs":39}],4:[function(require,module,exports){
(function() {
  module.exports = {
    Date: require('./contracts/date'),
    Time: require('./contracts/time'),
    Expression: require('./contracts/expression'),
    JsType: require('./contracts/js_type')
  };

}).call(this);

},{"./contracts/date":5,"./contracts/expression":6,"./contracts/js_type":7,"./contracts/time":8}],5:[function(require,module,exports){
module.exports = (function(){
  var isValidDate = function(d) {
    var toString = Object.prototype.toString;
    return (toString.call(d) === "[object Date]") && !isNaN(d.getTime());
  };
  return {

    /**
     * Information contract for Date objects <-> ISO8601 String.
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
        if (isValidDate(d)) {
          return d;
        } else {
          throw new Error("Invalid Date string `" + s + "`");
        }
      },

      /**
       * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
       * unless `d` is a valid date.
       */
      undress: function(d) {
        if (isValidDate(d)) {
          var yyyy = d.getFullYear().toString();
          var mm = (d.getMonth()+1).toString();
          var dd  = d.getDate().toString();
          return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);
        } else {
          throw new Error("Invalid Date `" + d + "`");
        }
      }

    }

  };
})();


},{}],6:[function(require,module,exports){
module.exports = (function(){
  return {

    defn: {

      dress: function(args){
        if (!/^return/.test(args[args.length-1])){
          args[args.length-1] = 'return ' + args[args.length-1];
        }
        var fn = Function.apply(Function, args);
        fn.defn = args;
        return fn;
      },

      undress: function(fn){
        if (!fn.defn){
          throw new Error('No defn found: ' + fn.toString());
        }
        return fn.defn;
      }

    }

  };
})();


},{}],7:[function(require,module,exports){
module.exports = (function(){
  return {

    name: {

      dress: function(name, world){
        var resolved = null;
        if (world){
          resolved = (new Function("world", "return world." + name + ";"))(world);
        } else {
          resolved = (new Function("return " + name + ";"))();
        }
        if (resolved){
          return resolved;
        } else {
          msg = "Unknown javascript type: `" + name + "` (";
          msg += Object.keys(world).toString();
          msg += ")";
          throw new Error(msg);
        }
      },

      undress: function(fn){
        throw new Error("Unimplemented");
      }

    }

  };
})();


},{}],8:[function(require,module,exports){
module.exports = (function(){
  var isValidDate = function(d) {
    var toString = Object.prototype.toString;
    return (toString.call(d) === "[object Date]") && !isNaN(d.getTime());
  };
  return {

    /**
     * Information contract for Time objects <-> ISO8601 String.
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
        if (isValidDate(d)) {
          return d;
        } else {
          throw new Error("Invalid Date string `" + s + "`");
        }
      },

      /**
       * Undress a Date object `d` to an IS08601 String. Raises an ArgumentError
       * unless `d` is a valid date.
       */
      undress: function(d) {
        if (isValidDate(d)) {
          return d.toISOString();
        } else {
          throw new Error("Invalid Date `" + s + "`");
        }
      }

    }

  };
})();


},{}],9:[function(require,module,exports){
(function() {
  var $u, TypeError, appendPath, computeCauses, computeMessage, computeRootCauses,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $u = require('./support/utils');

  TypeError = (function(_super) {
    __extends(TypeError, _super);

    function TypeError(info) {
      $u.extend(this, info);
      this.message = computeMessage(this);
      TypeError.__super__.constructor.call(this, this.message, this.rootCause);
    }

    Object.defineProperty(TypeError.prototype, 'locatedMessage', {
      get: function() {
        if (this.location != null) {
          return "[" + this.location + "] " + this.message;
        } else {
          return this.message;
        }
      }
    });

    Object.defineProperty(TypeError.prototype, 'causes', {
      get: function() {
        return this.causesCache != null ? this.causesCache : this.causesCache = this.children && computeCauses(this);
      }
    });

    Object.defineProperty(TypeError.prototype, 'cause', {
      get: function() {
        return this.causes && this.causes[0];
      }
    });

    Object.defineProperty(TypeError.prototype, 'rootCauses', {
      get: function() {
        return this.rootCausesCache != null ? this.rootCausesCache : this.rootCausesCache = computeRootCauses(this, []);
      }
    });

    Object.defineProperty(TypeError.prototype, 'rootCause', {
      get: function() {
        return this.rootCauses[this.rootCauses.length - 1];
      }
    });

    TypeError.prototype.explain = function() {
      var c, str, _i, _len, _ref;
      str = this.locatedMessage + "\n";
      if (this.rootCauses) {
        _ref = this.rootCauses;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          str += "  " + c.locatedMessage + "\n";
        }
      }
      return str;
    };

    TypeError.prototype.explainTree = function(depth) {
      var c, i, str, _i, _j, _len, _ref;
      str = '';
      if (depth == null) {
        depth = 0;
      }
      for (i = _i = 0; 0 <= depth ? _i < depth : _i > depth; i = 0 <= depth ? ++_i : --_i) {
        str += "  ";
      }
      str += this.locatedMessage + "\n";
      if (this.causes != null) {
        _ref = this.causes;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          c = _ref[_j];
          str += c.explainTree(depth + 1);
        }
      }
      return str;
    };

    return TypeError;

  })(Error);

  computeMessage = function(info) {
    var data, i, msg, _ref;
    msg = info.error;
    if (msg instanceof Array) {
      _ref = msg, msg = _ref[0], data = _ref[1];
      i = -1;
      return msg.replace(/\$\{([a-zA-Z]+)\}/g, (function(_this) {
        return function(match) {
          var param;
          i += 1;
          param = match.slice(2, match.length - 1);
          return $u.toString(info[param] || data[i]);
        };
      })(this));
    } else if (typeof msg === 'string') {
      return msg;
    } else {
      return info.toString();
    }
  };

  computeCauses = function(error) {
    return $u.map(error.children, function(c) {
      c.location = appendPath(error.location, c.location);
      if (c instanceof TypeError) {
        return c;
      } else if (c instanceof Error) {
        return new TypeError({
          error: c.message,
          location: c.location
        });
      } else {
        return new TypeError(c);
      }
    });
  };

  computeRootCauses = function(error, cache) {
    if (error.causes) {
      $u.each(error.causes, function(cause) {
        return computeRootCauses(cause, cache);
      });
    } else {
      cache.push(error);
    }
    return cache;
  };

  appendPath = function(parent, child) {
    if (child == null) {
      return parent;
    }
    if (parent == null) {
      return child;
    }
    return parent + '/' + child;
  };

  module.exports = {
    TypeError: TypeError
  };

}).call(this);

},{"./support/utils":23}],10:[function(require,module,exports){
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

        peg$startRuleFunctions = { system: peg$parsesystem, type: peg$parsetype, heading: peg$parseheading, attribute: peg$parseattribute, contract: peg$parsecontract, constraint: peg$parseconstraint, literal: peg$parseliteral, metadata: peg$parsemetadata, lambda_expr: peg$parselambda_expr, type_def: peg$parsetype_def, import_def: peg$parseimport_def },
        peg$startRuleFunction  = peg$parsesystem,

        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = function(is, ds, meta, main) {
            var system = {
              types: ds
            };
            if (is && is.length>0) {
              system.imports = is;
            }
            if (main){
              main = { name: 'Main', type: main };
              if (meta){
                main.metadata = meta;
              }
              system.types.push(main);
            }
            return system;
          },
        peg$c3 = [],
        peg$c4 = function(head, tail) {
            return headTailToArray(head, tail);
          },
        peg$c5 = "@import",
        peg$c6 = { type: "literal", value: "@import", description: "\"@import\"" },
        peg$c7 = "as",
        peg$c8 = { type: "literal", value: "as", description: "\"as\"" },
        peg$c9 = function(s, q) {
            return { qualifier: q, from: s }
          },
        peg$c10 = function(s) {
            return { from: s }
          },
        peg$c11 = "=",
        peg$c12 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c13 = function(m, n, t) {
            return metadatize({ name: n, type: t }, m);
          },
        peg$c14 = function(m, head, tail) {
            var cs = headTailToArray(head, tail);
            return { union: metadatize({ candidates: cs }) };
          },
        peg$c15 = function(m, t, cs) {
            return { sub: metadatize({ superType: t, constraints: cs }, m) };
          },
        peg$c16 = "(",
        peg$c17 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c18 = ")",
        peg$c19 = { type: "literal", value: ")", description: "\")\"" },
        peg$c20 = function(n, cs) {
            for (var i=0; i<cs.length; i++){
              cs[i].native = [n, cs[i].native];
            }
            return cs;
          },
        peg$c21 = function(c) {
            return [c];
          },
        peg$c22 = ":",
        peg$c23 = { type: "literal", value: ":", description: "\":\"" },
        peg$c24 = function(m, n, e) {
            return metadatize({ name: n, native: e.trim() }, m);
          },
        peg$c25 = function(e) {
            return { native: e.trim() };
          },
        peg$c26 = "{",
        peg$c27 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c28 = "}",
        peg$c29 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c30 = function(m, h) {
            return { tuple: metadatize({ heading: h }, m) };
          },
        peg$c31 = "{{",
        peg$c32 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c33 = "}}",
        peg$c34 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c35 = function(m, h) {
            return { relation: metadatize({ heading: h }, m) };
          },
        peg$c36 = function(head, tail, d) {
            var attributes = headTailToArray(head, tail);
            var info = { attributes: attributes };
            if (d){
              info.options = { allowExtra: true };
            }
            return info;
          },
        peg$c37 = "?",
        peg$c38 = { type: "literal", value: "?", description: "\"?\"" },
        peg$c39 = function(m, n, optional, t) {
            var info = { name: n, type: t };
            if (optional){
              info.required = false;
            }
            return metadatize(info, m);
          },
        peg$c40 = function(m, t) {
            return { set: metadatize({ elmType: t }, m) };
          },
        peg$c41 = "[",
        peg$c42 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c43 = "]",
        peg$c44 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c45 = function(m, t) {
            return { seq: metadatize({ elmType: t }, m) };
          },
        peg$c46 = "<",
        peg$c47 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c48 = ">",
        peg$c49 = { type: "literal", value: ">", description: "\">\"" },
        peg$c50 = function(m, head, tail) {
            var ts = headTailToArray(head, tail);
            return { struct: metadatize({ componentTypes: ts }, m) };
          },
        peg$c51 = function(p, cs) {
            if (!p){ p = {}; }
            var contracts = [], contract;
            for (var i=0; i<cs.length; i++){
              contract = cs[i];
              if (!contract.external && !contract.explicit){
                if (p.jsType){
                  contract.internal = p.jsType;
                } else {
                  contract.identity = {};
                }
              }
              contracts[i] = contract;
            }
            p.contracts = contracts;
            return { adt: p };
          },
        peg$c52 = ".",
        peg$c53 = { type: "literal", value: ".", description: "\".\"" },
        peg$c54 = function(m, t) {
            var r = {};
            if (t){
              r.jsType = t[1];
            }
            return metadatize(r, m);
          },
        peg$c55 = "\\",
        peg$c56 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c57 = function(b, up, down) {
            b.explicit = { dress: up, undress: down };
            return b;
          },
        peg$c58 = function(b, t) {
            b.external = t;
            return b;
          },
        peg$c59 = function(m, n, t) {
            return metadatize({ name: n, infoType: t }, m);
          },
        peg$c60 = function(m) {
            return { any: metadatize({}, m) };
          },
        peg$c61 = function(m, name) {
            return { builtin: metadatize({ jsType: name }, m) };
          },
        peg$c62 = function(p) {
            return { ref: { typeName: p } };
          },
        peg$c63 = "|",
        peg$c64 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c65 = function(n, e) {
            return [ n.trim(), e.trim() ];
          },
        peg$c66 = "()",
        peg$c67 = { type: "literal", value: "()", description: "\"()\"" },
        peg$c68 = void 0,
        peg$c69 = /^[(,)]/,
        peg$c70 = { type: "class", value: "[(,)]", description: "[(,)]" },
        peg$c71 = { type: "any", description: "any character" },
        peg$c72 = "/-",
        peg$c73 = { type: "literal", value: "/-", description: "\"/-\"" },
        peg$c74 = "-/",
        peg$c75 = { type: "literal", value: "-/", description: "\"-/\"" },
        peg$c76 = function(head, tail) {
            var attrs = headTailToArray(head, tail);
            var metadata = {};
            for (var i=0; i<attrs.length; i++){
              metadata[attrs[i][0]] = attrs[i][1];
            }
            return metadata;
          },
        peg$c77 = function(t) {
            return{ description: t.toString().trim() };
          },
        peg$c78 = function(n, v) {
            return [ n, v ];
          },
        peg$c79 = /^["]/,
        peg$c80 = { type: "class", value: "[\"]", description: "[\"]" },
        peg$c81 = /^[\\]/,
        peg$c82 = { type: "class", value: "[\\\\]", description: "[\\\\]" },
        peg$c83 = function(s) {
            return s.substring(1, s.length-1).replace(/\\"/, '"');
          },
        peg$c84 = /^[1-9]/,
        peg$c85 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c86 = /^[0-9]/,
        peg$c87 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c88 = /^[0]/,
        peg$c89 = { type: "class", value: "[0]", description: "[0]" },
        peg$c90 = /^[\-]/,
        peg$c91 = { type: "class", value: "[\\-]", description: "[\\-]" },
        peg$c92 = function(s) {
            return parseInt(s);
          },
        peg$c93 = function(s) {
            return parseFloat(s);
          },
        peg$c94 = "true",
        peg$c95 = { type: "literal", value: "true", description: "\"true\"" },
        peg$c96 = function() { return true;  },
        peg$c97 = "false",
        peg$c98 = { type: "literal", value: "false", description: "\"false\"" },
        peg$c99 = function() { return false; },
        peg$c100 = /^[a-z]/,
        peg$c101 = { type: "class", value: "[a-z]", description: "[a-z]" },
        peg$c102 = /^[a-z0-9]/,
        peg$c103 = { type: "class", value: "[a-z0-9]", description: "[a-z0-9]" },
        peg$c104 = /^[a-zA-Z_]/,
        peg$c105 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c106 = /^[a-zA-Z0-9_]/,
        peg$c107 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c108 = /^[A-Z]/,
        peg$c109 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c110 = /^[a-zA-Z:]/,
        peg$c111 = { type: "class", value: "[a-zA-Z:]", description: "[a-zA-Z:]" },
        peg$c112 = "/",
        peg$c113 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c114 = /^[a-zA-Z0-9:.]/,
        peg$c115 = { type: "class", value: "[a-zA-Z0-9:.]", description: "[a-zA-Z0-9:.]" },
        peg$c116 = /^[ \n\t]/,
        peg$c117 = { type: "class", value: "[ \\n\\t]", description: "[ \\n\\t]" },
        peg$c118 = "...",
        peg$c119 = { type: "literal", value: "...", description: "\"...\"" },
        peg$c120 = ",",
        peg$c121 = { type: "literal", value: ",", description: "\",\"" },
        peg$c122 = "#",
        peg$c123 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c124 = /^[\n]/,
        peg$c125 = { type: "class", value: "[\\n]", description: "[\\n]" },
        peg$c126 = /^[ \t\n]/,
        peg$c127 = { type: "class", value: "[ \\t\\n]", description: "[ \\t\\n]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$cache = {},
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
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      var key    = peg$currPos * 58 + 0,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsespacing();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseimports();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedefinitions();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemetadata();
                if (s6 === peg$FAILED) {
                  s6 = peg$c1;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsespacing();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseunion_type();
                    if (s8 === peg$FAILED) {
                      s8 = peg$c1;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsespacing();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parseeof();
                        if (s10 !== peg$FAILED) {
                          peg$reportedPos = s0;
                          s1 = peg$c2(s2, s4, s6, s8);
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
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseimports() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 1,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseimport_def();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseimport_def();
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
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseimport_def();
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
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c4(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseimport_def() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 2,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c5) {
        s1 = peg$c5;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespaces();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesystem_from();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespaces();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c7) {
                s5 = peg$c7;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespaces();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsetype_qualifier();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c9(s3, s7);
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
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c5) {
          s1 = peg$c5;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsespaces();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesystem_from();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c10(s3);
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
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedefinitions() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 3,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsetype_def();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsespacing();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsetype_def();
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
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parsespacing();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsetype_def();
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
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c4(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype_def() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 4,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetype_name();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c11;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseunion_type();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c13(s1, s2, s6);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype() {
      var s0;

      var key    = peg$currPos * 58 + 5,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseunion_type();

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunion_type() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 6,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesub_type();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parsepipe();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsesub_type();
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
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parsepipe();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsesub_type();
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
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c14(s1, s2, s3);
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
      if (s0 === peg$FAILED) {
        s0 = peg$parsesub_type();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsesub_type() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 58 + 7,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parserel_type();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseconstraint();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c15(s1, s2, s3);
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
      if (s0 === peg$FAILED) {
        s0 = peg$parserel_type();
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseconstraint() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 8,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c16;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsepipe();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseconstraints();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c18;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c19); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c20(s3, s5);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseconstraints() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 9,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsenamed_constraint();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsenamed_constraint();
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
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenamed_constraint();
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
        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c4(s1, s2);
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
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseunnamed_constraint();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c21(s1);
        }
        s0 = s1;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsenamed_constraint() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 10,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseconstraint_name();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c22;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c23); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseexpression();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s1, s2, s5);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseunnamed_constraint() {
      var s0, s1;

      var key    = peg$currPos * 58 + 11,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseexpression();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c25(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parserel_type() {
      var s0;

      var key    = peg$currPos * 58 + 12,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parserelation_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetuple_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecollection_type();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetuple_type() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 13,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c26;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseheading();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c28;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c29); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c30(s1, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parserelation_type() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 14,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c31) {
          s2 = peg$c31;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c32); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseheading();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c33) {
                  s6 = peg$c33;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c34); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c35(s1, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseheading() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 15,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseattribute();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseattribute();
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
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseattribute();
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
        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedots();
            if (s4 === peg$FAILED) {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c36(s1, s2, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 16,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute_name();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c22;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 63) {
                s5 = peg$c37;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c38); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseunion_type();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c39(s1, s2, s5, s7);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecollection_type() {
      var s0;

      var key    = peg$currPos * 58 + 17,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parseset_type();
      if (s0 === peg$FAILED) {
        s0 = peg$parseseq_type();
        if (s0 === peg$FAILED) {
          s0 = peg$parsestruct_type();
          if (s0 === peg$FAILED) {
            s0 = peg$parseterm_type();
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseset_type() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 18,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c26;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseunion_type();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s6 = peg$c28;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c29); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c40(s1, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseseq_type() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 19,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c41;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c42); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespacing();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseunion_type();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s6 = peg$c43;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c44); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c45(s1, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestruct_type() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 20,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c46;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseunion_type();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseunion_type();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseunion_type();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseopt_comma();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s6 = peg$c48;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c49); }
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c50(s1, s3, s4);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseterm_type() {
      var s0;

      var key    = peg$currPos * 58 + 21,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsead_type() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 58 + 22,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsead_type_preamble();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecontracts();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c51(s1, s3);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsead_type_preamble() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 23,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c52;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsebuiltin_type_name();
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
          peg$reportedPos = s0;
          s1 = peg$c54(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecontracts() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 24,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecontract();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseopt_comma();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsecontract();
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
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseopt_comma();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecontract();
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
        if (s2 !== peg$FAILED) {
          s3 = peg$parseopt_comma();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c4(s1, s2);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecontract() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 25,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecontract_base();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s3 = peg$c55;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c56); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parselambda_expr();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s6 = peg$c55;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c56); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parselambda_expr();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c57(s1, s4, s7);
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
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecontract_base();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsespacing();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c52;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c53); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsebuiltin_type_name();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c58(s1, s4);
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
        if (s0 === peg$FAILED) {
          s0 = peg$parsecontract_base();
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecontract_base() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 26,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c46;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecontract_name();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s4 = peg$c48;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c49); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseunion_type();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c59(s1, s3, s6);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseany_type() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 27,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c52;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c60(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsebuiltin_type() {
      var s0, s1, s2, s3;

      var key    = peg$currPos * 58 + 28,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsemetadata();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c52;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebuiltin_type_name();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c61(s1, s3);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype_ref() {
      var s0, s1;

      var key    = peg$currPos * 58 + 29,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsetype_path();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c62(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parselambda_expr() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      var key    = peg$currPos * 58 + 30,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c16;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevar_name();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespacing();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 124) {
                s5 = peg$c63;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c64); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsespacing();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseexpression();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsespacing();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c18;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c19); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c65(s3, s7);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseexpression() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 31,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseparen_expression() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 32,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c66) {
        s1 = peg$c66;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c67); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c16;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexpression();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c18;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c19); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseany_expression() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 33,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      if (peg$c69.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c70); }
      }
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = peg$c68;
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
          if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          if (peg$c69.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c70); }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c68;
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
              if (peg$silentFails === 0) { peg$fail(peg$c71); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemetadata() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 34,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c72) {
        s1 = peg$c72;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c73); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespacing();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemetaattr();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseopt_comma();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsemetaattr();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseopt_comma();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsemetaattr();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsespacing();
              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c74) {
                  s6 = peg$c74;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c75); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsespacing();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c76(s3, s4);
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
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c72) {
          s1 = peg$c72;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c73); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c74) {
            s6 = peg$c74;
            peg$currPos += 2;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c75); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c68;
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
              if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$currPos;
              peg$silentFails++;
              if (input.substr(peg$currPos, 2) === peg$c74) {
                s6 = peg$c74;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c75); }
              }
              peg$silentFails--;
              if (s6 === peg$FAILED) {
                s5 = peg$c68;
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
                  if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s3 = input.substring(s2, peg$currPos);
          }
          s2 = s3;
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c74) {
              s3 = peg$c74;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c75); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsespacing();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c77(s2);
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
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsemetaattr() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 35,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parseattribute_name();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespaces();
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c22;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c23); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespaces();
            if (s4 === peg$FAILED) {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseliteral();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c78(s1, s5);
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseliteral() {
      var s0;

      var key    = peg$currPos * 58 + 36,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$parsestring_literal();
      if (s0 === peg$FAILED) {
        s0 = peg$parsereal_literal();
        if (s0 === peg$FAILED) {
          s0 = peg$parseinteger_literal();
          if (s0 === peg$FAILED) {
            s0 = peg$parseboolean_literal();
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsestring_literal() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 37,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      if (peg$c79.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c80); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$currPos;
        if (peg$c81.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c82); }
        }
        if (s6 !== peg$FAILED) {
          if (peg$c79.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c80); }
          }
          if (s7 !== peg$FAILED) {
            s6 = [s6, s7];
            s5 = s6;
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$c0;
        }
        if (s5 === peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$currPos;
          peg$silentFails++;
          if (peg$c79.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c80); }
          }
          peg$silentFails--;
          if (s7 === peg$FAILED) {
            s6 = peg$c68;
          } else {
            peg$currPos = s6;
            s6 = peg$c0;
          }
          if (s6 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c71); }
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$currPos;
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c82); }
          }
          if (s6 !== peg$FAILED) {
            if (peg$c79.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c80); }
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            s6 = peg$currPos;
            peg$silentFails++;
            if (peg$c79.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c80); }
            }
            peg$silentFails--;
            if (s7 === peg$FAILED) {
              s6 = peg$c68;
            } else {
              peg$currPos = s6;
              s6 = peg$c0;
            }
            if (s6 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c71); }
              }
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
          }
        }
        if (s4 !== peg$FAILED) {
          if (peg$c79.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c80); }
          }
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c83(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseinteger_literal() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 38,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      if (peg$c84.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c85); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        if (peg$c86.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c87); }
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          if (peg$c86.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c87); }
          }
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
      if (s2 === peg$FAILED) {
        if (peg$c88.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c89); }
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (peg$c90.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c91); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseinteger_literal();
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
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c92(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsereal_literal() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 39,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      s3 = peg$parseinteger_literal();
      if (s3 === peg$FAILED) {
        s3 = peg$c1;
      }
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c52;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s4 !== peg$FAILED) {
          s5 = [];
          if (peg$c86.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c87); }
          }
          if (s6 !== peg$FAILED) {
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              if (peg$c86.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c87); }
              }
            }
          } else {
            s5 = peg$c0;
          }
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c93(s1);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseboolean_literal() {
      var s0, s1;

      var key    = peg$currPos * 58 + 40,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c94) {
        s1 = peg$c94;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c95); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c96();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c97) {
          s1 = peg$c97;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c98); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c99();
        }
        s0 = s1;
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsevar_name() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 41,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      if (peg$c100.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c100.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c101); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecontract_name() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 42,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c100.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c102.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c103); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c102.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c103); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseconstraint_name() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 43,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c100.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c104.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c105); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c104.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c105); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseattribute_name() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 44,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c100.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c106.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c107); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c106.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c107); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype_name() {
      var s0, s1, s2, s3, s4, s5;

      var key    = peg$currPos * 58 + 45,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      s3 = peg$parsetype_qualifier();
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s4 = peg$c52;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
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
      if (s2 === peg$FAILED) {
        s2 = peg$c1;
      }
      if (s2 !== peg$FAILED) {
        if (peg$c108.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c109); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c110.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c111); }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c110.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c111); }
            }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype_qualifier() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 46,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c100.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c102.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c103); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c102.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c103); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsetype_path() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      var key    = peg$currPos * 58 + 47,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsetype_name();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s5 = peg$c112;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c113); }
        }
        if (s5 !== peg$FAILED) {
          s6 = [];
          if (peg$c106.test(input.charAt(peg$currPos))) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c107); }
          }
          if (s7 !== peg$FAILED) {
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              if (peg$c106.test(input.charAt(peg$currPos))) {
                s7 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c107); }
              }
            }
          } else {
            s6 = peg$c0;
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
          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c112;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c113); }
          }
          if (s5 !== peg$FAILED) {
            s6 = [];
            if (peg$c106.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c107); }
            }
            if (s7 !== peg$FAILED) {
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                if (peg$c106.test(input.charAt(peg$currPos))) {
                  s7 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c107); }
                }
              }
            } else {
              s6 = peg$c0;
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsebuiltin_type_name() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 48,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      if (peg$c114.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c114.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c115); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsesystem_from() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 49,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      if (peg$c116.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c117); }
      }
      peg$silentFails--;
      if (s4 === peg$FAILED) {
        s3 = peg$c68;
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
          if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          if (peg$c116.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c117); }
          }
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c68;
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
              if (peg$silentFails === 0) { peg$fail(peg$c71); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsedots() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 50,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c118) {
          s3 = peg$c118;
          peg$currPos += 3;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c119); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsepipe() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 51,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 124) {
          s3 = peg$c63;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecomma() {
      var s0, s1, s2, s3, s4;

      var key    = peg$currPos * 58 + 52,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsespacing();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s3 = peg$c120;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c121); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsespacing();
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseopt_comma() {
      var s0, s1;

      var key    = peg$currPos * 58 + 53,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$parsecomma();
      if (s1 === peg$FAILED) {
        s1 = peg$parsespacing();
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsespacing() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 54,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6;

      var key    = peg$currPos * 58 + 55,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c122;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c123); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$currPos;
        s5 = peg$currPos;
        peg$silentFails++;
        if (peg$c124.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c125); }
        }
        peg$silentFails--;
        if (s6 === peg$FAILED) {
          s5 = peg$c68;
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
            if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          if (peg$c124.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c125); }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = peg$c68;
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
              if (peg$silentFails === 0) { peg$fail(peg$c71); }
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
          if (peg$c124.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c125); }
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

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parsespaces() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 56,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = [];
      if (peg$c126.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c127); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c126.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c127); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }

    function peg$parseeof() {
      var s0, s1, s2;

      var key    = peg$currPos * 58 + 57,
          cached = peg$cache[key];

      if (cached) {
        peg$currPos = cached.nextPos;
        return cached.result;
      }

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c71); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c68;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      peg$cache[key] = { nextPos: peg$currPos, result: s0 };

      return s0;
    }


      // Converts head:X tail(... X)* to an array of Xs
      function headTailToArray(head, tail) {
        var result = (head ? [ head ] : []);
        for (var i = 0; i < tail.length; i++) {
          result[i+1] = tail[i][tail[i].length-1];
        }
        return result;
      }

      // Sets metadata on arg if defined
      function metadatize(arg, metadata) {
        if (metadata){
          arg.metadata = metadata;
        }
        return arg;
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
},{}],11:[function(require,module,exports){
(function (__dirname){
module.exports = (function(){
  var data = require('./stdlib/data');

  // Builds a resolver instance with preconditions and base function `r`
  var resolver = function(pres, r){
    return function(path, world){
      for (var i=0; i<pres.length; i++){
        if (!pres[i](path, world)){
          return null;
        }
      }
      return r(path, world);
    }
  };

  // ----------------------------------------------------------- File resolver

  var findFile = function(origin, extension, candidates){
    try {
      var extended = origin + (extension || '');
      fs.statSync(extended);
      return [ extended, extension || extended.match(/(\.[a-z]{3,4})$/)[1] ];
    } catch (e) {
      if (candidates.length == 0){
        throw new Error("No such file: `" + origin + "`");
      } else {
        return findFile(origin, candidates[0], candidates.slice(1));
      }
    }
  };

  // Matches file:// and resolve it through `fs`, therefore working under
  // node.js environment only
  var fs = require('fs');
  var file = resolver([
    function(path){ return !!fs; },
  ], function(path, world){
    var match = path.match(/^file:\/\/(.*?)$/);
    if (!match) {
      return null;
    }

    // check that it's an existing file
    var pair = findFile(match[1], null, ['.fio', '.json']);
    var file = pair[0], extension = pair[1];
    var src  = fs.readFileSync(file).toString();
    var system = null;

    // load according to the extension
    switch (extension) {
      case '.fio':
        system = world.Finitio.parse(src);
        break;
      case '.json':
        system = JSON.parse(src);
        break;
      default:
        throw new Error("Unrecognized extension: `" + extension + "`");
    }

    // return the pair now
    return [ path, system ];
  });

  // ------------------------------------------------------- Relative resolver

  // Matches ./ and ../ imports and resolve them recursively after making
  // them absolute
  var relative = resolver([
  ], function(path, world){
    var match = path.match(/^(\.\/)|^(\.\.\/)/);
    if (!match){
      return null;
    }

    var url = world.sourceUrl;
    if (!url){
      throw new Error("Unable to resolve relative path: `" + path + "`");
    }

    // relative -> absolute
    url = url.replace(/\/[^\/]+$/, '');
    if (match[2]) {
      // ../ -> parent folder
      url = url.replace(/\/[^\/]+$/, '');
    }
    url = url + '/' + path.slice(match[0].length);

    // delegate the job
    return world.importResolver(url, world, {raw: true});
  });

  // --------------------------------------------------- Standard lib resolver

  // Matches finitio/... and resolve it through the standard library either
  // on disk (if fs is available), or through the web
  var stdlib = resolver([
    function(path){ return !!__dirname; }
  ], function(path, world){
    var match = path.match(/^finitio\/(.*)$/);
    if (!match){
      return null;
    }

    // establish the paths
    var name = match[1];
    try {
      return require('./stdlib/' + name)(world, {raw: true});
    } catch (e) {
      throw new Error("No such stdlib system: `" + path + "`", e);
    }
  });

  // ------------------------------------------------- Chain of responsibility

  var main = function(path, world, options){
    var keys = Object.keys(main);
    var k, strategy, pair;
    for (var i=0; i<keys.length; i++) {
      strategy = main[keys[i]];
      pair = strategy(path, world);
      if (pair){
        if (options && options.raw){
          return pair;
        } else {
          var newWorld = world.Finitio.world(world, { sourceUrl: pair[0] });
          return world.Finitio.system(pair[1], newWorld);
        }
      }
    }
    throw new Error("Unable to resolve: `" + path + "`");
  }
  main.File = file;
  main.StdLib = stdlib;
  main.Relative = relative;

  return main;
})();

}).call(this,"/build/src/finitio")
},{"./stdlib/data":12,"fs":39}],12:[function(require,module,exports){
module.exports = (function(){
  var ss = {"http://finitio.io/0.4/stdlib/data":{"types":[{"name":"Any","type":{"any":{}},"metadata":{"description":"Recognizes everything"}},{"name":"Nil","type":{"sub":{"superType":{"any":{}},"constraints":[{"native":["v","v === null"]}]}},"metadata":{"description":"Recognizes JavaScript's null"}},{"name":"Boolean","type":{"builtin":{"jsType":"Boolean"}},"metadata":{"description":"Recognizes true and false"}},{"name":"True","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === true"]}]}},"metadata":{"description":"Only true"}},{"name":"False","type":{"sub":{"superType":{"builtin":{"jsType":"Boolean"}},"constraints":[{"native":["b","b === false"]}]}},"metadata":{"description":"Only false"}},{"name":"Numeric","type":{"builtin":{"jsType":"Number"}},"metadata":{"description":"Recognizes any number"}},{"name":"Real","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","(n===0.0) || !(n % 1 === 0)"]}]}},"metadata":{"description":"Recognizes only real numbers"}},{"name":"Integer","type":{"sub":{"superType":{"builtin":{"jsType":"Number"}},"constraints":[{"native":["n","n % 1 === 0"]}]}},"metadata":{"description":"Recognizes only integer numbers"}},{"name":"String","type":{"builtin":{"jsType":"String"}},"metadata":{"description":"Recognizes every string"}},{"name":"Date","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Date.iso8601"}]}},"metadata":{"description":"Recognizes valid dates"}},{"name":"Time","type":{"adt":{"jsType":"Date","contracts":[{"name":"iso8601","infoType":{"builtin":{"jsType":"String"}},"external":"Finitio.Contracts.Time.iso8601"}]}},"metadata":{"description":"Recognizes valid times"}}]}};
  var r = function(fallback){
    return function(path, w, options){
      var s = ss[path];
      if (s){
        if (options && options.raw){
          return [ path, s ];
        } else {
          return w.Finitio.system(s, w);
        }
      } else if (fallback) {
        return fallback(path, w, options);
      } else {
        throw new Error('Unable to resolve: `' + path + '`');
      }
    };
  };
  return function(w, options){
    if (!w) { w = require('finit' + 'io.js').World; }
    w = w.Finitio.world(w, {
      importResolver: r(w.importResolver)
    });
    return w.importResolver('http://finitio.io/0.4/stdlib/data', w, options);
  };
})();

},{}],13:[function(require,module,exports){
(function() {
  var $u, Attribute, ObjectType, Type;

  $u = require('./utils');

  ObjectType = require('./ic').ObjectType;

  Type = require('../type');

  Attribute = (function() {
    ObjectType(Attribute, ['name', 'type', 'required', 'metadata']);

    function Attribute(name, type, required, metadata) {
      this.name = name;
      this.type = type;
      this.required = required;
      this.metadata = metadata;
      if (typeof this.name !== "string") {
        $u.argumentError("String expected for attribute name, got:", this.name);
      }
      if (!(this.type instanceof Type)) {
        $u.argumentError("Type expected for attribute domain, got:", this.type);
      }
      if (this.required == null) {
        this.required = true;
      }
      if (typeof this.required !== "boolean") {
        $u.argumentError("Boolean expected for required, got:", this.required);
      }
    }

    Attribute.prototype.fetchType = function() {
      return this.type;
    };

    Attribute.prototype.fetchOn = function(arg, callback) {
      if (typeof arg !== "object") {
        $u.argumentError("Object expected, got:", arg);
      }
      if (arg[this.name] == null) {
        if (callback != null) {
          return callback();
        } else {
          throw new Error("Key `" + this.name + "` not found");
        }
      }
      return arg[this.name];
    };

    Attribute.prototype.toName = function() {
      if (this.required) {
        return "" + this.name + ": " + this.type;
      } else {
        return "" + this.name + " :? " + this.type;
      }
    };

    Attribute.prototype.isSuperAttributeOf = function(other) {
      return (this === other) || (this.name === other.name && (!this.required || other.required) && this.type.isSuperTypeOf(other.type));
    };

    Attribute.prototype.equals = function(other) {
      return (this === other) || (other instanceof Attribute && (this.name === other.name) && (this.required === other.required) && this.type.equals(other.type));
    };

    Attribute.prototype.resolveProxies = function(system) {
      return this.type.resolveProxies(system);
    };

    return Attribute;

  })();

  module.exports = Attribute;

}).call(this);

},{"../type":25,"./ic":20,"./utils":23}],14:[function(require,module,exports){
(function() {
  var $u, CollectionType, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $u = require('./utils');

  Type = require('../type');

  CollectionType = (function(_super) {
    __extends(CollectionType, _super);

    function CollectionType(elmType, name, metadata) {
      this.elmType = elmType;
      this.name = name;
      this.metadata = metadata;
      if (!(this.elmType instanceof Type)) {
        $u.argumentError("Finitio.Type expected, got:", this.elmType);
      }
      CollectionType.__super__.constructor.call(this, this.name, this.metadata);
    }

    CollectionType.prototype._equals = function(other) {
      return (this === other) || (other instanceof this.constructor && this.elmType.equals(other.elmType)) || CollectionType.__super__._equals.apply(this, arguments);
    };

    CollectionType.prototype._isSuperTypeOf = function(other) {
      return (this === other) || (other instanceof this.constructor && this.elmType.isSuperTypeOf(other.elmType)) || CollectionType.__super__._isSuperTypeOf.apply(this, arguments);
    };

    CollectionType.prototype._undress = function(value, as) {
      var from, to;
      from = this.elmType;
      to = as.elmType;
      if (to.isSuperTypeOf(from)) {
        return value;
      }
      return $u.map(value, function(v) {
        return from.undress(v, to);
      });
    };

    return CollectionType;

  })(Type);

  module.exports = CollectionType;

}).call(this);

},{"../type":25,"./utils":23}],15:[function(require,module,exports){
(function() {
  var $u, AbstractType, Constraint,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $u = require('./utils');

  AbstractType = require('./ic').AbstractType;

  Constraint = (function() {
    function Constraint(name, _native, metadata) {
      this.name = name;
      this["native"] = _native;
      this.metadata = metadata;
      if ((this.name != null) && typeof this.name !== "string") {
        $u.argumentError("String expected for constraint name, got: ", this.name);
      }
    }

    Constraint.prototype.isAnonymous = function() {
      return this.name == null;
    };

    Constraint.prototype.accept = function(arg) {
      throw new Error("Constraint is an abstract class");
    };

    Constraint.prototype.equals = function(other) {
      return (this === other) || (other instanceof Constraint && this["native"] === other["native"]);
    };

    return Constraint;

  })();

  Constraint.Native = (function(_super) {
    __extends(Native, _super);

    function Native() {
      return Native.__super__.constructor.apply(this, arguments);
    }

    Native.prototype.kind = 'native';

    Native.prototype.accept = function(arg) {
      return this["native"](arg);
    };

    return Native;

  })(Constraint);

  Constraint.Regexp = (function(_super) {
    __extends(Regexp, _super);

    function Regexp() {
      return Regexp.__super__.constructor.apply(this, arguments);
    }

    Regexp.prototype.kind = 'regexp';

    Regexp.prototype.accept = function(arg) {
      return this["native"].test(arg);
    };

    return Regexp;

  })(Constraint);

  AbstractType(Constraint, [Constraint.Native, Constraint.Regexp], ['name', 'native', 'metadata'], 1);

  module.exports = Constraint;

}).call(this);

},{"./ic":20,"./utils":23}],16:[function(require,module,exports){
(function() {
  var $u, AbstractType, Contract, Type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractType = require('./ic').AbstractType;

  $u = require('./utils');

  Type = require('../type');

  Contract = (function() {
    function Contract(name, infoType, _native, metadata) {
      this.name = name;
      this.infoType = infoType;
      this["native"] = _native;
      this.metadata = metadata;
      if (!$u.isString(this.name)) {
        $u.argumentError("String expected, got:", this.name);
      }
      if (!(this.infoType instanceof Type)) {
        $u.argumentError("Finitio.Type expected, got:", this.infoType);
      }
    }

    Contract.prototype.fetchType = function() {
      return this.infoType;
    };

    Contract.prototype.resolveProxies = function(system) {
      return this.infoType.resolveProxies(system);
    };

    return Contract;

  })();

  Contract.Explicit = (function(_super) {
    __extends(Explicit, _super);

    function Explicit() {
      return Explicit.__super__.constructor.apply(this, arguments);
    }

    Explicit.prototype.kind = 'explicit';

    Explicit.prototype.dress = function(value, world) {
      return this["native"].dress(value, world);
    };

    Explicit.prototype.undress = function(value, to) {
      return this["native"].undress(value);
    };

    return Explicit;

  })(Contract);

  Contract.External = (function(_super) {
    __extends(External, _super);

    function External() {
      return External.__super__.constructor.apply(this, arguments);
    }

    External.prototype.kind = 'external';

    External.prototype.dress = function(value, world) {
      return this["native"].dress(value, world);
    };

    External.prototype.undress = function(value, to) {
      return this["native"].undress(value);
    };

    return External;

  })(Contract);

  Contract.Internal = (function(_super) {
    __extends(Internal, _super);

    function Internal() {
      return Internal.__super__.constructor.apply(this, arguments);
    }

    Internal.prototype.kind = 'internal';

    Internal.prototype.dress = function(value, world) {
      return this["native"][this.name](value, world);
    };

    Internal.prototype.undress = function(value, to) {
      return value['to' + $u.capitalize(this.name)]();
    };

    return Internal;

  })(Contract);

  Contract.Identity = (function(_super) {
    __extends(Identity, _super);

    function Identity() {
      return Identity.__super__.constructor.apply(this, arguments);
    }

    Identity.prototype.kind = 'identity';

    Identity.prototype.dress = function(value, world) {
      return value;
    };

    Identity.prototype.undress = function(value, to) {
      return value;
    };

    return Identity;

  })(Contract);

  AbstractType(Contract, [Contract.Explicit, Contract.External, Contract.Internal, Contract.Identity], ['name', 'infoType', 'native', 'metadata'], 2);

  module.exports = Contract;

}).call(this);

},{"../type":25,"./ic":20,"./utils":23}],17:[function(require,module,exports){
(function() {
  var DressMonad, setErrorLocation;

  DressMonad = (function() {
    function DressMonad(world, result, error) {
      this.world = world;
      this.result = result;
      this.error = error;
    }

    DressMonad.prototype.success = function(result) {
      return new DressMonad(this.world, result, void 0);
    };

    DressMonad.prototype.failure = function(context, error, causes) {
      error = {
        error: error
      };
      if (causes != null) {
        error.children = causes;
      }
      return new DressMonad(this.world, void 0, error);
    };

    DressMonad.prototype.find = function(collection, callback, onFailure) {
      var causes, element, i, m, _i, _ref;
      causes = [];
      for (i = _i = 0, _ref = collection.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        element = collection[i];
        m = callback(element, i);
        if (m.isSuccess()) {
          return m;
        } else {
          if (m.error.location == null) {
            setErrorLocation(m.error, element, i);
          }
          causes.push(m.error);
        }
      }
      return onFailure(causes);
    };

    DressMonad.prototype.refine = function(base, collection, callback, onFailure) {
      var causes, element, i, m, _i, _ref;
      if (base.isSuccess()) {
        causes = [];
        for (i = _i = 0, _ref = collection.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          element = collection[i];
          m = callback(base, element, i);
          if (m.isFailure()) {
            if (m.error.location == null) {
              setErrorLocation(m.error, element, i);
            }
            causes.push(m.error);
            if (this.isFailfast()) {
              break;
            }
          }
        }
        if (causes.length === 0) {
          return base;
        }
        return onFailure(causes);
      } else {
        return onFailure([base.error]);
      }
    };

    DressMonad.prototype.map = function(collection, mapper, onFailure) {
      var callback, result, success;
      result = [];
      success = this.success(result);
      callback = function(_, elm, index) {
        var m;
        m = mapper(elm, index);
        return m.onSuccess(function(elmResult) {
          result.push(elmResult);
          return m;
        });
      };
      return this.refine(success, collection, callback, onFailure);
    };

    DressMonad.prototype.isFailfast = function() {
      return this.world && this.world.failfast;
    };

    DressMonad.prototype.isSuccess = function() {
      return this.error === void 0;
    };

    DressMonad.prototype.isFailure = function() {
      return !this.isSuccess();
    };

    DressMonad.prototype.onSuccess = function(callback) {
      if (!this.isSuccess()) {
        return this;
      }
      return callback(this.result);
    };

    DressMonad.prototype.onFailure = function(callback) {
      if (this.isSuccess()) {
        return this;
      }
      return callback(this.error);
    };

    return DressMonad;

  })();

  setErrorLocation = function(error, element, index) {
    var loc;
    loc = element.name;
    if (loc == null) {
      loc = index;
    }
    return error.location = loc;
  };

  module.exports = DressMonad;

}).call(this);

},{}],18:[function(require,module,exports){
(function() {
  var $u;

  $u = require('./utils');

  module.exports = function(clazz, plural, singular, extractor) {
    if (singular == null) {
      singular = plural.slice(0, plural.length - 1);
    }
    if (extractor == null) {
      extractor = function(name) {
        return this[plural][name];
      };
    }
    clazz.prototype.fetch = function(name, callback) {
      var extracted;
      extracted = extractor.bind(this)(name);
      if (extracted != null) {
        return extracted;
      } else if (callback != null) {
        return callback(this, name);
      } else {
        throw new Error("No such " + singular + " `" + name + "`");
      }
    };
    return clazz.prototype.fetchPath = function(path, callback) {
      var f;
      f = $u.inject(path.split('/'), this, function(memo, name) {
        return memo && memo.fetch && memo.fetch(name, function() {
          return null;
        });
      });
      if (f != null) {
        return f;
      } else if (callback != null) {
        return callback();
      } else {
        throw new Error("No such " + singular + " `" + path + "`");
      }
    };
  };

}).call(this);

},{"./utils":23}],19:[function(require,module,exports){
(function() {
  var $u, Attribute, Fetchable, Heading, ObjectType;

  ObjectType = require('./ic').ObjectType;

  $u = require('./utils');

  Fetchable = require('./fetchable');

  Attribute = require('./attribute');

  Heading = (function() {
    var DEFAULT_OPTIONS, _attributesByName;

    ObjectType(Heading, ['attributes', 'options']);

    Fetchable(Heading, 'attributes', 'attribute', function(name) {
      return this.getAttr(name);
    });

    DEFAULT_OPTIONS = {
      allowExtra: false
    };

    function Heading(attributes, options) {
      var names;
      this.attributes = attributes;
      this.options = options;
      if (!($u.isArray(this.attributes) && $u.every(this.attributes, function(a) {
        return a instanceof Attribute;
      }))) {
        $u.argumentError("Array of Attribute expected");
      }
      names = {};
      $u.each(this.attributes, (function(_this) {
        return function(attr) {
          if (names[attr.name] != null) {
            $u.argumentError("Attribute names must be unique");
          }
          return names[attr.name] = attr;
        };
      })(this));
      if (this.options == null) {
        this.options = {};
      }
      if (!$u.isObject(this.options)) {
        $u.argumentError("Hash of options expected");
      }
      this.options = $u.extend({}, DEFAULT_OPTIONS, options);
    }

    Heading.prototype.getAttr = function(name) {
      return $u.find(this.attributes, function(a) {
        return a.name === name;
      });
    };

    Heading.prototype.size = function() {
      return this.attributes.length;
    };

    Heading.prototype.isEmpty = function() {
      return this.size() === 0;
    };

    Heading.prototype.allowExtra = function() {
      return this.options['allowExtra'];
    };

    Heading.prototype.multi = function() {
      return this.options['allowExtra'] || $u.any(this.attributes, function(a) {
        return !a.required;
      });
    };

    Heading.prototype.each = function(callback) {
      return $u.each(this.attributes, callback);
    };

    Heading.prototype.toName = function() {
      return $u.map(this.attributes, function(a) {
        return a.toName();
      }).join(', ');
    };

    Heading.prototype.names = function() {
      return $u.map(this.attributes, function(a) {
        return a.name;
      });
    };

    Heading.prototype.isSuperHeadingOf = function(other) {
      var l, r, s, _ref;
      if (this === other) {
        return true;
      }
      if (!(other instanceof Heading)) {
        return false;
      }
      _ref = $u.triSplit(_attributesByName(this), _attributesByName(other)), s = _ref[0], l = _ref[1], r = _ref[2];
      return $u.every(s, function(pair) {
        return pair[0].isSuperAttributeOf(pair[1]);
      }) && $u.every(l, function(a) {
        return !a.required;
      }) && (this.allowExtra() || !(other.allowExtra())) && (this.allowExtra() || $u.isEmpty(r));
    };

    Heading.prototype.equals = function(other) {
      return (this === other) || (other instanceof Heading && this.attributesEquals(other) && this.optionsEquals(other));
    };

    Heading.prototype.attributesEquals = function(other) {
      return this.attributes.length === other.attributes.length && $u.every(this.attributes, function(attr) {
        return attr.equals(other.getAttr(attr.name));
      });
    };

    Heading.prototype.optionsEquals = function(other) {
      return $u.size(this.options) === $u.size(other.options) && $u.every(this.options, function(opt, name) {
        return opt === other.options[name];
      });
    };

    _attributesByName = function(self) {
      var h;
      h = {};
      $u.each(self.attributes, function(a) {
        return h[a.name] = a;
      });
      return h;
    };

    Heading.prototype.resolveProxies = function(system) {
      return $u.each(this.attributes, function(a) {
        return a.resolveProxies(system);
      });
    };

    return Heading;

  })();

  module.exports = Heading;

}).call(this);

},{"./attribute":13,"./fetchable":18,"./ic":20,"./utils":23}],20:[function(require,module,exports){
module.exports = (function(){
  var $u = require('./utils');
  var ic = {};

  function invokeConstructor(c, args){
    // create a fake constructor
    var T = function(){};
    T.prototype = c.prototype;

    // create an instance
    var inst = new T();

    // call the real constructor now
    var ret = c.apply(inst, args);

    // return the instance
    return Object(ret) === ret ? ret : inst;
  };

  ic.AbstractType = function(base, subs, properties, rawindex){

    base.info = function(from){
      var sub = $u.find(subs, function(s){ return !!from[s.prototype.kind]; });
      if (sub){
        var args = [], arg;
        for (var i=0; i<properties.length; i++){
          var propname = (i==rawindex ? sub.prototype.kind : properties[i]);
          var propval  = from[propname];
          if (propval){
            args[i] = propval;
          }
        }
        return invokeConstructor(sub, args);
      } else {
        dump = JSON.stringify(from)
        $u.argumentError("Unrecognized " + base.name + " info: ", dump);
      }
    };

    base.prototype.toInfo = function(){
      var to = {};
      for (var i=0; i<properties.length; i++){
        var name  = (i == rawindex ? this.kind : properties[i]);
        var value = this[properties[i]];
        if (value != undefined) {
          to[name] = value;
        }
      }
      return to;
    };

  };

  ic.ObjectType = function(base, properties, onDressed){

    base.info = function(from, world){
      var args = [];
      for (var i=0; i<properties.length; i++){
        var propval = from[properties[i]];
        if (propval != undefined){
          args[i] = propval;
        }
      };
      var inst = invokeConstructor(base, args);
      if (onDressed){
        onDressed(inst, world);
      }
      return inst;
    };

    base.prototype.toInfo = function(){
      var to = {};
      for (var i=0; i<properties.length; i++){
        var name  = properties[i];
        var value = this[name];
        if (value != undefined) {
          to[name] = value;
        }
      }
      return to;
    };

  };

  ic.TypeType = function(base, generator, properties){
    base.prototype.generator = generator;
    ic.ObjectType(base, properties);
  };

  return ic;
})();
},{"./utils":23}],21:[function(require,module,exports){
(function() {
  var Import, ObjectType;

  ObjectType = require('../support/ic').ObjectType;

  Import = (function() {
    ObjectType(Import, ['from', 'qualifier'], function(imp, world) {
      return imp.system = world.importResolver(imp.from, world);
    });

    function Import(from, qualifier) {
      this.from = from;
      this.qualifier = qualifier;
    }

    return Import;

  })();

  module.exports = Import;

}).call(this);

},{"../support/ic":20}],22:[function(require,module,exports){
module.exports = (function(){
  var $u           = require('../support/utils');
  var Attribute    = require('../support/attribute');
  var Heading      = require('../support/heading');
  var Contract     = require('../support/contract');
  var Constraint   = require('../support/constraint');
  var Import       = require('../support/import');
  var Contracts    = require('../contracts');
  var Type         = require('../type');
  var AdType       = require('../type/ad_type');
  var BuiltinType  = require('../type/builtin_type');
  var TupleType    = require('../type/tuple_type');
  var RelationType = require('../type/relation_type');
  var UnionType    = require('../type/union_type');
  var SeqType      = require('../type/seq_type');
  var SetType      = require('../type/set_type');
  var AnyType      = require('../type/any_type');
  var StructType   = require('../type/struct_type');
  var SubType      = require('../type/sub_type');
  var TypeRef      = require('../type/type_ref');
  var TypeDef      = require('../type/type_def');
  var System       = require('../system');

  var Js   = {};
  var Meta = { Js: Js };

  // -------------------------------------------------------------- Javascript

  Js.Object  = BuiltinType.info({ jsType: Object  });

  Js.String  = BuiltinType.info({ jsType: String  });

  Js.Boolean = BuiltinType.info({ jsType: Boolean });

  Js.Type = AdType.info({
    jsType: Function,
    contracts: [
      Contract.info({
        name: 'jsTypeName',
        infoType: Js.String,
        explicit: {
          dress: function(name, world){
            return Contracts.JsType.name.dress(name, world.JsTypes);
          },
          undress: Contracts.JsType.name.undress
        }
      })
    ]
  });

  Js.Empty = SubType.info({
    superType: AnyType.info({}),
    constraints: [
      Constraint.info({
        name: "default",
        native: function(v){
          if (v===null || v===undefined){ return false; }
          for (k in v){ return false; }
          return true;
        }
      })
    ]
  });

  // --------------------------------------------------------------- Functions
  Js.FunctionDefn = SeqType.info({elmType: Js.String});
  Js.Function = AdType.info({
    jsType: Function,
    contracts: [
      Contract.info({
        name:      'defn',
        infoType:  Js.FunctionDefn,
        external:  Contracts.Expression.defn
      })
    ]
  });

  // ----------------------------------------------------------------- RegExps

  Js.RegExp = AdType.info({
    jsType: RegExp,
    contracts: [
      Contract.info({
        name:      'src',
        infoType:  Js.String,
        explicit: {
          dress:   function(src){ return new RegExp(src) },
          undress: function(rx) { return rx.source;  }
        }
      })
    ]
  })

  // ------------------------------------------------------------------ Shared

  var metadataAttr = Attribute.info({
    name: 'metadata',
    type: Js.Object,
    required: false
  });

  // ------------------------------------------------------------------- Tools

  var levelUp = function(name, jsType, infoType, contractName){
    return AdType.info({
      jsType: jsType,
      contracts: [
        Contract.info({
          name:      contractName,
          infoType:  infoType,
          internal:  jsType
        })
      ]
    });
  };

  var object = function(name, jsType, attributes){
    attributes.push(metadataAttr);
    var infoType = TupleType.info({
      heading: Heading.info({ attributes: attributes })
    });
    var adType = levelUp(name, jsType, infoType, 'info');
    return adType;
  };

  // -------------------------------------------------------------------- Type
  var typeCandidates = [
    BuiltinType.info({ jsType: Type })
  ];

  Meta.Type = levelUp('Type', Type, UnionType.info({
    candidates: typeCandidates
  }), 'factor');

  Meta.Types = SeqType.info({
    elmType: Meta.Type
  });

  var type = function(name, jsType, attributes){
    // information type
    var infoType = TupleType.info({
      heading: Heading.info({
        attributes: attributes.concat([ metadataAttr ])
      })
    });

    // corresponding ADT
    var adType = levelUp(name, jsType, infoType, 'info');

    // corresponding factory
    var factorType = TupleType.info({
      heading: Heading.info({
        attributes: [
          Attribute.info({ name: name.toLowerCase(), type: adType })
        ]
      })
    });

    typeCandidates.push(factorType);
    return adType;
  };

  // --------------------------------------------------------------- Attribute

  Meta.Attribute = object('Attribute', Attribute, [
    Attribute.info({ name: 'name',     type: Js.String  }),
    Attribute.info({ name: 'type',     type: Meta.Type  }),
    Attribute.info({ name: 'required', type: Js.Boolean, required: false })
  ]);
  Meta.Attributes = SeqType.info({ elmType: Meta.Attribute });

  // ----------------------------------------------------------------- Heading

  Meta.HeadingOptions = TupleType.info({
    heading: Heading.info({
      attributes: [
        Attribute.info({ name: 'allowExtra', type: Js.Boolean })
      ]
    })
  });

  Meta.Heading = object('Heading', Heading, [
    Attribute.info({ name: 'attributes', type: Meta.Attributes     }),
    Attribute.info({ name: 'options',    type: Meta.HeadingOptions, required: false })
  ]);

  // ---------------------------------------------------------------- Contract

  Meta.Contract = UnionType.info({
    candidates: [],
    name: 'Contract'
  });
  Meta.Contracts = SeqType.info({ elmType: Meta.Contract });

  var contract = function(name, jsType, attributes){
    var c = object(name, Contract, attributes.concat([
      Attribute.info({ name: 'name',      type: Js.String   }),
      Attribute.info({ name: 'infoType',  type: Meta.Type   }),
    ]));
    Meta.Contract.candidates.push(c);
    return c;
  };

  Meta.Contract.Explicit = contract('Explicit', Contract.Explicit, [
    Attribute.info({
      name: 'explicit',
      type: TupleType.info({
        heading: Heading.info({
          attributes: [
            Attribute.info({ name: "dress",   type: Js.Function }),
            Attribute.info({ name: "undress", type: Js.Function })
          ]
        })
      })
    })
  ]);

  Meta.Contract.Internal = contract('Internal', Contract.Internal, [
    Attribute.info({ name: 'internal', type: Js.Type })
  ]);

  Meta.Contract.External = contract('External', Contract.External, [
    Attribute.info({ name: 'external', type: Js.Type })
  ]);

  Meta.Contract.Identity = contract('Identity', Contract.Identity, [
    Attribute.info({ name: 'identity', type: Js.Empty })
  ]);

  // -------------------------------------------------------------- Constraint

  Meta.Constraint = UnionType.info({
    candidates: [],
    name: 'Constraint'
  });
  Meta.Constraints = SeqType.info({ elmType: Meta.Constraint });

  var constraint = function(name, jsType, attributes){
    var c = object(name, Constraint, attributes.concat([
      Attribute.info({ name: 'name', type: Js.String, required: false })
    ]));
    Meta.Constraint.candidates.push(c);
    return c;
  };

  Meta.Constraint.Native = constraint('Native', Constraint.Native, [
    Attribute.info({ name: 'native', type: Js.Function })
  ]);

  Meta.Constraint.Regexp = constraint('RegExp', Constraint.Regexp, [
    Attribute.info({ name: 'regexp', type: Js.RegExp })
  ]);

  // ------------------------------------------------------------------- Types

  Meta.AnyType = type('Any', AnyType, [
  ]);

  Meta.AdType = type('Adt', AdType, [
    Attribute.info({ name: 'jsType',    type: Js.Type, required: false }),
    Attribute.info({ name: 'contracts', type: Meta.Contracts })
  ]);

  Meta.BuiltinType = type('Builtin', BuiltinType, [
    Attribute.info({ name: 'jsType', type: Js.Type })
  ]);

  Meta.SubType = type('Sub', SubType, [
    Attribute.info({ name: 'superType',   type: Meta.Type }),
    Attribute.info({ name: 'constraints', type: Meta.Constraints })
  ]);

  Meta.RelationType = type('Relation', RelationType, [
    Attribute.info({ name: 'heading', type: Meta.Heading })
  ]);

  Meta.TupleType = type('Tuple', TupleType, [
    Attribute.info({ name: 'heading', type: Meta.Heading })
  ]);

  Meta.SeqType = type('Seq', SeqType, [
    Attribute.info({ name: 'elmType', type: Meta.Type })
  ]);

  Meta.SetType = type('Set', SetType, [
    Attribute.info({ name: 'elmType', type: Meta.Type })
  ]);

  Meta.StructType = type('Struct', StructType, [
    Attribute.info({ name: 'componentTypes', type: Meta.Types })
  ]);

  Meta.UnionType = type('Union', UnionType, [
    Attribute.info({ name: 'candidates', type: Meta.Types })
  ]);

  Meta.TypeRef = type('Ref', TypeRef, [
    Attribute.info({ name: 'typeName', type: Js.String })
  ]);

  // ------------------------------------------------------------------ System

  Meta.TypeDef = object('TypeDef', TypeDef, [
    Attribute.info({ name: 'name',  type: Js.String }),
    Attribute.info({ name: 'type',  type: Meta.Type }),
  ]);
  Meta.TypeDefs = SeqType.info({ elmType: Meta.TypeDef });

  var systemAttrs = [
    Attribute.info({ name: 'types', type: Meta.TypeDefs }),
  ];
  Meta.System  = object('System', System, systemAttrs);
  Meta.Systems = SeqType.info({ elmType: Meta.System });

  Meta.Import = object('Import', Import, [
    Attribute.info({ name: 'qualifier', type: Js.String, required: false }),
    Attribute.info({ name: 'from',      type: Js.String })
  ]);
  Meta.Imports = SeqType.info({ elmType: Meta.Import });

  systemAttrs.push(Attribute.info({ name: 'imports', type: Meta.Imports, required: false }));

  return Meta;
})();

},{"../contracts":4,"../support/attribute":13,"../support/constraint":15,"../support/contract":16,"../support/heading":19,"../support/import":21,"../support/utils":23,"../system":24,"../type":25,"../type/ad_type":26,"../type/any_type":27,"../type/builtin_type":28,"../type/relation_type":29,"../type/seq_type":30,"../type/set_type":31,"../type/struct_type":32,"../type/sub_type":33,"../type/tuple_type":34,"../type/type_def":35,"../type/type_ref":36,"../type/union_type":37}],23:[function(require,module,exports){
module.exports = (function(){
  var $u = {};

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
  };

  /**
    * Detects whether the javascript environment is a browser or not (node)
    * (naive approach)
    */
  $u.isBrowser = function(){
    return typeof(window) === 'object';
  };

  /**
    * Returns wheter or not the parameter is an object
    */
  $u.isObject = function(obj){
    return Object(obj) === obj;
  };

  /**
    * Returns wheter or not the parameter is a string
    */
  $u.isString = function(arg){
    return Object.prototype.toString.call(arg) == "[object String]";
  };

  /**
    * Returns wheter or not the parameter is a function
    */
  $u.isFunction = function(arg){
    return Object.prototype.toString.call(arg) == "[object Function]";
  };

  /**
    * Returns a new copy of an object (array, object or string supported)
    * !! Performs a deep copy
    */
  $u.deepClone = function(obj) {
    if (obj === null || obj === undefined) {
      $u.argumentError("Object expected, got", obj);
    }

    if (!$u.isObject(obj)){
      return obj;
    }

    else if (obj instanceof Function){
      return obj;
    }

    else if ($u.isArray(obj)){
      return obj.slice();
    }

    else {
      var copy = {};
      $u.each(obj, function(v, k){
        copy[k] = $u.deepClone(v);
      });
      return copy;
    }
  };

  /**
    * Returns a new copy of an object (array, object or string supported)
    * !! Performs a shallow copy
    */
  $u.clone = function(obj) {
    if (obj === null || obj === undefined){
      $u.argumentError("Object expected, got", obj);
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

  $u.triSplit = function(x, y) {
    var attrs = null,
        shared = {},
        left = {},
        right = {},
        cur = null;

    // start with x
    attrs = $u.keys(x);
    for (var i=0; i<attrs.length; i++){
      cur = attrs[i];
      if (y[cur] === undefined){
        left[cur] = x[cur];
      } else {
        shared[cur] = [x[cur], y[cur]];
      }
    }

    // continue with y
    attrs = $u.keys(y);
    for (i=0; i<attrs.length; i++){
      cur = attrs[i];
      if (shared[cur] === undefined){
        right[cur] = y[cur];
      }
    }

    return [shared, left, right];
  };

  //******* ARRAY

  $u.zip = function(dest) {
    if (!($u.isArray(dest))) {
      $u.argumentError("Array expected, got", dest);
    }

    //
    var sources = Array.prototype.slice.call(arguments, 1);

    // Check validity first
    $u.each(sources, function(source){
      if (!($u.isArray(source))) {
        $u.argumentError("Array expected, got", source);
      }
      if ($u.size(source) != $u.size(dest)) {
        $u.argumentError("Source(s) and destination Arrays must have same size");
      }
    });

    // Zip!
    var result = $u.map(dest, function(v, i){
      var array = [];
      array.push(v);
      $u.each(sources, function(source){
        array.push(source[i]);
      });
      return array;
    });

    return result;
  };

  $u.difference = function(objA, objB) {
    if (!($u.isArray(objA))) {
      $u.argumentError("Array expected, got", objA);
    }

    if (!($u.isArray(objB))) {
      $u.argumentError("Array expected, got", objB);
    }

    return $u.filter(objA, function(v){
      return !$u.contains(objB, v);
    });
  };

  $u.uniq = function(array, isSorted){
    if (!($u.isArray(array))) {
      $u.argumentError("Array expected, got", array);
    }
    if (typeof(isSorted) == "undefined"){
      isSorted = false;
    }
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted ? (!i || seen !== value) : !$u.contains(seen, value)) {
        if (isSorted) {
          seen = value;
        } else {
          seen.push(value);
        }
        result.push(array[i]);
      }
    }
    return result;
  };

  $u.inject = function(obj, start, callback){
    // no date, regexp, undefined or null please
    if (!(obj instanceof Array)) {
      $u.argumentError("Array expected, got", obj);
    }
    res = start;
    for (var i=0; i<obj.length; i++) {
      res = callback(res, obj[i]);
    }
    return res;
  };

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
  };

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
      throw new Error("Function expected, got null");
    }
    if (callback === undefined){
      callback = function(){};
    }

    // no date, regexp, undefined or null please
    if (!($u.isEnumerable(obj))) {
      throw new Error("Enumerable (Array, Object, String) expected, got " + obj);
    }

    // Strings
    if (typeof(obj) == "string"){
      return $u.each(obj.split(""), callback);
    }

    // Arrays
    if (obj instanceof Array){
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
  };

  /**
    * Returns true if all of the iteration over the enumerable pass the predicate truth test
    *
    * Uses #each to iterate
    * TODO: delegate to *every* if present
    */
  $u.every = function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null || callback === undefined){
      $u.argumentError("Function expected, got", callback);
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
  };

  /**
    * Returns the first element that apsses a truth test
    *
    * Uses #each to iterate
    * TODO: use *every* if present
    */
  $u.find = function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null || callback === undefined){
      $u.argumentError("Function expected, got", callback);
    }

    // TODO: review this. How can we stop iterating
    // as soon as possible? (other than using exceptions)
    try {
      $u.each(obj, function(v, k){
        var pass = callback(v, k);
        if (pass){
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
  };

  /**
    * Returns true if any of the iteration over the enumerable pass the predicate truth test
    *
    * Uses #each to iterate
    */
  $u.any = function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null || callback === undefined){
      $u.argumentError("Function expected, got", callback);
    }

    // TODO: review this. How can we stop iterating
    // as soon as possible? (other than using exceptions)
    try {
      $u.each(obj, function(v, k){
        var pass = callback(v, k);
        if (pass === true){
          throw "gotcha";
        }
      });
    } catch (e) {
      // If a real exception was raised, forward it
      if (e != "gotcha"){
        throw e;
      }
      return true;
    }

    return false;
  };

  /**
    * Returns the values of an enumerable that pass a truth test
    *
    * Uses #each to iterate
    * TODO: use *every* if present
    */
  $u.filter = function(obj, callback){
    // callback can be undefined, but can't be null
    if (callback === null || callback === undefined){
      $u.argumentError("Function expected, got", callback);
    }

    var values = [];
    $u.each(obj, function(v){
      if (callback(v)){
        values.push(v);
      }
    });
    return values;
  };

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
      $u.argumentError("Function expected, got", callback);
    }

    var values = [];
    $u.each(obj, function(v){
      if (!callback(v)){
        values.push(v);
      }
    });
    return values;
  };

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
      $u.argumentError("Function expected, got", callback);
    }
    var values = [];
    $u.each(obj, function(v, k){
      values.push(callback(v, k));
    });
    return values;
  };

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
    });
    return values;
  };

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
    });
    return keys;
  };

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
  };

  /**
    * Returns whether or not an enumerable is empty
    */
  $u.isEmpty = function(obj){
    return $u.size(obj) === 0;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  $u.contains = $u.include = function(obj, target) {
    if (!$u.isEnumerable(obj)){
      $u.argumentError("Enumerable (Array, Object, String) expected, got", obj);
    }
    var nativeIndexOf = Array.prototype.indexOf;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
      return obj.indexOf(target) != -1;
    }
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
      $u.argumentError("String expected, got", obj);
    }
    if (obj.trim() === ""){
      return obj;
    }

    var string = obj,
        tokens = null,
        i = null;

    // Remove underscores
    if (string.indexOf("_") != -1){

      tokens = string.split("_");

      for(i=0; i<tokens.length; i++){
        tokens[i] = $u.capitalize(tokens[i]);
      }

      string = tokens.join('');
    }

    // Remove spaces
    if (string.indexOf(" ") != -1){

      tokens = string.split(" ");

      for(i=0; i<tokens.length; i++){
        tokens[i] = $u.capitalize(tokens[i]);
      }

      string = tokens.join('');
    }

    // Capitalize first letter
    string = string[0].toUpperCase() + string.slice(1);
    return string;
  };

  $u.toString = function(value){
    if (value === undefined){
      return 'undefined';
    } else if (value === null) {
      return 'null';
    } else {
      var s = value.toString();
      if (s == "[object Object]"){
        s = JSON.stringify(value);
      }
      if (s.length>30){
        s = s.substring(0, 30) + '...';
      }
      if (value instanceof Array){
        s = "[" + s + "]";
      }
      return s;
    }
  };

  // ---------------------------------------------------------- Error Management

  $u.argumentError = function(){
    var msg = "";
    var toString = function(arg){
      if (arg === null) {
        return "null";
      } else if (arg === undefined){
        return "undefined";
      } else {
        return arg.toString();
      }
    };
    $u.each(arguments, function(arg){
      if (msg.length !== 0){
        msg += " ";
      }
      msg += toString(arg);
    });
    throw new Error(msg);
  };

  $u.notImplemented = function(obj, meth){
    throw new Error(obj.constructor.name + "#" + meth);
  };

  $u.dressError = function(failure){
    var E = require("../errors").TypeError;
    throw new E(failure);
  };

  $u.undressError = function(msg, cause, location){
    throw new Error(msg, cause, location);
  };

  //

  return $u;
})();

},{"../errors":9}],24:[function(require,module,exports){
(function() {
  var $u, Fetchable, ObjectType, System, Type;

  ObjectType = require('./support/ic').ObjectType;

  $u = require('./support/utils');

  Fetchable = require('./support/fetchable');

  Type = require('./type');

  System = (function() {
    ObjectType(System, ['imports', 'types'], function(s) {
      return $u.each(s.types, function(t) {
        return t.resolveProxies(s);
      });
    });

    System.REF_RGX = /^(?:([a-z][a-z0-9]*)\.)?(.*?)$/;

    function System(imports, types) {
      this.imports = imports;
      this.types = types;
      if (this.imports == null) {
        this.imports = [];
      }
      if (this.types == null) {
        this.types = [];
      }
      $u.each(this.types, (function(_this) {
        return function(t) {
          return _this[t.name] = t.trueOne();
        };
      })(this));
    }

    Fetchable(System, "types", "type", function(name) {
      return $u.find(this.types, function(t) {
        return t.name === name;
      });
    });

    System.prototype.resolve = function(ref, callback) {
      var match, relevant;
      match = ref.match(System.REF_RGX);
      if (match[1]) {
        return this._resolveQualified(match, callback);
      } else {
        relevant = $u.filter(this.imports, function(i) {
          return !i.qualifier;
        });
        return this._resolveImported([
          {
            system: this
          }
        ].concat(relevant), ref, callback);
      }
    };

    System.prototype.dress = function(value, world) {
      if (!this.Main) {
        throw new Error("No main on System");
      }
      return this.Main.dress(value, world);
    };

    System.prototype.clone = function() {
      return new System($u.clone(this.imports), $u.clone(this.types));
    };

    System.prototype._resolveQualified = function(match, callback) {
      var imp, sub;
      if (callback == null) {
        callback = this._onResolveFailure(match[0]);
      }
      imp = $u.find(this.imports, function(u) {
        return u.qualifier === match[1];
      });
      if (sub = imp && imp.system) {
        return this._resolveSingle(sub, match[2], callback);
      } else {
        return this._onResolveFailure(match[0])();
      }
    };

    System.prototype._resolveImported = function(chain, ref, callback) {
      if (callback == null) {
        callback = this._onResolveFailure(ref);
      }
      return chain[0].system.fetchPath(ref, (function(_this) {
        return function() {
          if (chain.length > 1) {
            return _this._resolveImported(chain.slice(1), ref, callback);
          } else {
            return callback();
          }
        };
      })(this));
    };

    System.prototype._resolveSingle = function(system, ref, callback) {
      return system.fetchPath(ref, callback);
    };

    System.prototype._onResolveFailure = function(ref) {
      return function() {
        throw new Error("No such type `" + ref + "`");
      };
    };

    return System;

  })();

  module.exports = System;

}).call(this);

},{"./support/fetchable":18,"./support/ic":20,"./support/utils":23,"./type":25}],25:[function(require,module,exports){
(function() {
  var $u, DressMonad, Type;

  $u = require('./support/utils');

  DressMonad = require('./support/dress_monad');

  Type = (function() {
    function Type(metadata) {
      this.metadata = metadata;
    }

    Type.factor = function(from) {
      return from[Object.keys(from)[0]];
    };

    Type.prototype.toFactor = function() {
      var to;
      to = {};
      to[this.generator] = this;
      return to;
    };

    Type.prototype.include = function(value) {
      return this._include(value);
    };

    Type.prototype._include = function(value) {
      return $u.notImplemented(this, "include");
    };

    Type.prototype.dress = function(value, world) {
      var monad;
      monad = this.mDress(value, new DressMonad(world));
      if (monad.isSuccess()) {
        return monad.result;
      } else {
        return $u.dressError(monad.error);
      }
    };

    Type.prototype.mDress = function(value, Monad) {
      return this._mDress(value, Monad);
    };

    Type.prototype._mDress = function(value, Monad) {
      return $u.notImplemented(this, "_mDress");
    };

    Type.prototype.undress = function(value, as) {
      return this._undress(value, as.trueOne());
    };

    Type.prototype._undress = function(value, as) {
      if (as.isSuperTypeOf(this)) {
        return value;
      }
      if (as.include(value)) {
        return value;
      }
      return $u.undressError("Unable to undress `" + value + "` from " + this + " to `" + as + "`");
    };

    Type.prototype.isSuperTypeOf = function(other) {
      return this._isSuperTypeOf(other.trueOne());
    };

    Type.prototype._isSuperTypeOf = function(other) {
      return this.equals(other) || other._isSubTypeOf(this);
    };

    Type.prototype._isSubTypeOf = function(other) {
      return false;
    };

    Type.prototype.fetchType = function() {
      return this;
    };

    Type.prototype.isFake = function() {
      return false;
    };

    Type.prototype.trueOne = function() {
      return this;
    };

    Type.prototype.equals = function(other) {
      return (other instanceof Type) && this._equals(other.trueOne());
    };

    Type.prototype._equals = function(other) {
      return this === other;
    };

    return Type;

  })();

  module.exports = Type;

}).call(this);

},{"./support/dress_monad":17,"./support/utils":23}],26:[function(require,module,exports){
(function() {
  var $u, AdType, Contract, Fetchable, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Fetchable = require('../support/fetchable');

  Contract = require('../support/contract');

  Type = require('../type');

  AdType = (function(_super) {
    __extends(AdType, _super);

    TypeType(AdType, 'adt', ['jsType', 'contracts', 'metadata']);

    function AdType(jsType, contracts, metadata) {
      this.jsType = jsType;
      this.contracts = contracts;
      this.metadata = metadata;
      if (this.jsType && !(this.jsType instanceof Function)) {
        $u.argumentError("Constructor (function) expected, got:", this.jsType);
      }
      if (!$u.isArray(this.contracts)) {
        $u.argumentError("[Contract] expected, got:", this.contracts);
      }
      if (!$u.every(this.contracts, function(c) {
        return c instanceof Contract;
      })) {
        $u.argumentError("[Contract] expected, got:", this.contracts);
      }
      AdType.__super__.constructor.call(this, this.metadata);
    }

    Fetchable(AdType, "contracts", "contract", function(name) {
      return $u.find(this.contracts, function(c) {
        return c.name === name;
      });
    });

    AdType.prototype.contractNames = function() {
      return $u.map(this.contracts, function(c) {
        return c.name;
      });
    };

    AdType.prototype._include = function(value) {
      return value.constructor === this.jsType;
    };

    AdType.prototype._mDress = function(value, Monad) {
      var callback, onFailure;
      if (this.jsType && value instanceof this.jsType) {
        return Monad.success(value);
      }
      callback = function(contract) {
        var m;
        m = contract.infoType.mDress(value, Monad);
        return m.onSuccess((function(_this) {
          return function(result) {
            var e;
            try {
              return Monad.success(contract.dress(result, Monad.world));
            } catch (_error) {
              e = _error;
              return Monad.failure(_this, "Dresser failed: " + e.message, [e]);
            }
          };
        })(this));
      };
      onFailure = (function(_this) {
        return function(causes) {
          var params;
          params = [_this.jsType && _this.jsType.name || 'value', value];
          return Monad.failure(_this, ["Invalid ${typeName}: `${value}`", params], causes);
        };
      })(this);
      return Monad.find(this.contracts, callback, onFailure);
    };

    AdType.prototype._undress = function(value, as) {
      var candidate;
      if (!this.jsType) {
        return value;
      }
      candidate = null;
      if ($u.size(this.contracts) === 1) {
        candidate = this.contracts[0];
      } else {
        candidate = $u.find(this.contracts, function(c) {
          return c.infoType.isSuperTypeOf(as);
        });
      }
      if (candidate != null) {
        return candidate.infoType.undress(candidate.undress(value), as);
      } else {
        return AdType.__super__._undress.apply(this, arguments);
      }
    };

    AdType.prototype.resolveProxies = function(system) {
      return $u.each(this.contracts, function(c) {
        return c.resolveProxies(system);
      });
    };

    return AdType;

  })(Type);

  module.exports = AdType;

}).call(this);

},{"../support/contract":16,"../support/fetchable":18,"../support/ic":20,"../support/utils":23,"../type":25}],27:[function(require,module,exports){
(function() {
  var AnyType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  Type = require('../type');

  AnyType = (function(_super) {
    __extends(AnyType, _super);

    TypeType(AnyType, 'any', ['metadata']);

    function AnyType(metadata) {
      this.metadata = metadata;
      AnyType.__super__.constructor.call(this, this.metadata);
    }

    AnyType.prototype._mDress = function(value, Monad) {
      return Monad.success(value);
    };

    AnyType.prototype._include = function(value) {
      return true;
    };

    AnyType.prototype._isSuperTypeOf = function(other) {
      return true;
    };

    AnyType.prototype._equals = function(other) {
      return (other instanceof AnyType) || AnyType.__super__._equals.apply(this, arguments);
    };

    AnyType.prototype.resolveProxies = function(system) {};

    return AnyType;

  })(Type);

  module.exports = AnyType;

}).call(this);

},{"../support/ic":20,"../type":25}],28:[function(require,module,exports){
(function() {
  var BuiltinType, Type, TypeType,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  Type = require('../type');

  BuiltinType = (function(_super) {
    __extends(BuiltinType, _super);

    TypeType(BuiltinType, 'builtin', ['jsType', 'metadata']);

    function BuiltinType(jsType, metadata) {
      this.jsType = jsType;
      this.metadata = metadata;
      this._equals = __bind(this._equals, this);
      BuiltinType.__super__.constructor.call(this, this.metadata);
    }

    BuiltinType.prototype._mDress = function(value, Monad) {
      var params;
      if (this.include(value)) {
        return Monad.success(value);
      } else {
        params = [this.jsType.name, value];
        return Monad.failure(this, ["Invalid ${typeName}: `${value}`", params]);
      }
    };

    BuiltinType.prototype._include = function(value) {
      return value instanceof this.jsType || ((value != null) && value.constructor === this.jsType);
    };

    BuiltinType.prototype._equals = function(other) {
      return (this === other) || (other instanceof BuiltinType && other.jsType === this.jsType) || BuiltinType.__super__._equals.apply(this, arguments);
    };

    BuiltinType.prototype.toString = function() {
      return this.jsType.name.toString();
    };

    BuiltinType.prototype.resolveProxies = function(system) {};

    return BuiltinType;

  })(Type);

  module.exports = BuiltinType;

}).call(this);

},{"../support/ic":20,"../type":25}],29:[function(require,module,exports){
(function() {
  var $u, CollectionType, Heading, RelationType, TupleType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  Type = require('../type');

  CollectionType = require('../support/collection_type');

  TupleType = require('../type/tuple_type');

  Heading = require('../support/heading');

  $u = require('../support/utils');

  RelationType = (function(_super) {
    __extends(RelationType, _super);

    TypeType(RelationType, 'relation', ['heading', 'metadata']);

    function RelationType(heading, metadata) {
      this.heading = heading;
      this.metadata = metadata;
      RelationType.__super__.constructor.call(this, this.metadata);
      if (!(this.heading instanceof Heading)) {
        $u.argumentError("Heading expected, got:", this.heading);
      }
    }

    RelationType.prototype.fetch = function() {
      return this.heading.fetch.apply(this.heading, arguments);
    };

    RelationType.prototype.tupleType = function() {
      return this.tupleTypeCache != null ? this.tupleTypeCache : this.tupleTypeCache = new TupleType(this.heading);
    };

    RelationType.prototype._include = function(value) {
      return value instanceof Array && $u.every(value, (function(_this) {
        return function(tuple) {
          return _this.tupleType().include(tuple);
        };
      })(this));
    };

    RelationType.prototype._mDress = function(value, Monad) {
      var index, mapper, onFailure, tupleType;
      if (!(value instanceof Array)) {
        return Monad.failure(this, ["Array expected, got: `${value}`", [value]]);
      }
      tupleType = this.tupleType();
      index = {};
      mapper = function(elm) {
        var m;
        m = tupleType.mDress(elm, Monad);
        return m.onSuccess((function(_this) {
          return function(tuple) {
            var h;
            h = JSON.stringify(tuple);
            if (index[h]) {
              return Monad.failure(_this, ["Duplicate Tuple: `${value}`", [tuple]]);
            } else {
              index[h] = tuple;
              return m;
            }
          };
        })(this));
      };
      onFailure = (function(_this) {
        return function(causes) {
          return Monad.failure(_this, ["Invalid ${typeName}", ["Relation"]], causes);
        };
      })(this);
      return Monad.map(value, mapper, onFailure);
    };

    RelationType.prototype._undress = function(value, as) {
      var from, to;
      if (!(as instanceof RelationType || as instanceof CollectionType)) {
        $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
      from = this.tupleType();
      to = as instanceof RelationType ? as.tupleType() : as.elmType;
      return $u.map(value, function(val) {
        return from.undress(val, to);
      });
    };

    RelationType.prototype._isSuperTypeOf = function(other) {
      return (this === other) || (other instanceof RelationType && this.heading.isSuperHeadingOf(other.heading));
    };

    RelationType.prototype._equals = function(other) {
      return (this === other) || (other instanceof RelationType && this.heading.equals(other.heading)) || RelationType.__super__._equals.apply(this, arguments);
    };

    RelationType.prototype.resolveProxies = function(system) {
      return this.heading.resolveProxies(system);
    };

    return RelationType;

  })(Type);

  module.exports = RelationType;

}).call(this);

},{"../support/collection_type":14,"../support/heading":19,"../support/ic":20,"../support/utils":23,"../type":25,"../type/tuple_type":34}],30:[function(require,module,exports){
(function() {
  var $u, CollectionType, SeqType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  CollectionType = require('../support/collection_type');

  SeqType = (function(_super) {
    __extends(SeqType, _super);

    function SeqType() {
      return SeqType.__super__.constructor.apply(this, arguments);
    }

    TypeType(SeqType, 'seq', ['elmType', 'metadata']);

    SeqType.prototype._include = function(value) {
      return value instanceof Array && $u.every(value, (function(_this) {
        return function(v) {
          return _this.elmType.include(v);
        };
      })(this));
    };

    SeqType.prototype._mDress = function(value, Monad) {
      var mapper, onFailure;
      if (!(value instanceof Array)) {
        return Monad.failure(this, ["Array expected, got: `${value}`", [value]]);
      }
      mapper = (function(_this) {
        return function(elm) {
          return _this.elmType.mDress(elm, Monad);
        };
      })(this);
      onFailure = (function(_this) {
        return function(causes) {
          return Monad.failure(_this, ["Invalid ${typeName}", ["Sequence"]], causes);
        };
      })(this);
      return Monad.map(value, mapper, onFailure);
    };

    SeqType.prototype._undress = function(value, as) {
      if (!(as instanceof SeqType)) {
        $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
      return SeqType.__super__._undress.apply(this, arguments);
    };

    SeqType.prototype.resolveProxies = function(system) {
      return this.elmType.resolveProxies(system);
    };

    return SeqType;

  })(CollectionType);

  module.exports = SeqType;

}).call(this);

},{"../support/collection_type":14,"../support/ic":20,"../support/utils":23,"../type":25}],31:[function(require,module,exports){
(function() {
  var $u, CollectionType, SetType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  CollectionType = require('../support/collection_type');

  SetType = (function(_super) {
    __extends(SetType, _super);

    function SetType() {
      return SetType.__super__.constructor.apply(this, arguments);
    }

    TypeType(SetType, 'set', ['elmType', 'metadata']);

    SetType.prototype._include = function(value) {
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

    SetType.prototype._mDress = function(value, Monad) {
      var findDuplicate, m, mapper, onFailure;
      if (!(value instanceof Array)) {
        return Monad.failure(this, ["Array expected, got: `${value}`", [value]]);
      }
      mapper = (function(_this) {
        return function(elm) {
          return _this.elmType.mDress(elm, Monad);
        };
      })(this);
      onFailure = (function(_this) {
        return function(causes) {
          return Monad.failure(_this, ["Invalid ${typeName}", ["Set"]], causes);
        };
      })(this);
      m = Monad.map(value, mapper, onFailure);
      findDuplicate = function(set) {
        return $u.find(set, function(elm, i) {
          return set.indexOf(elm) !== i;
        });
      };
      return m.onSuccess((function(_this) {
        return function(set) {
          var d, err;
          if (!(d = findDuplicate(set))) {
            return m;
          }
          err = Monad.failure(_this, ["Duplicate value: `${value}`", [d]]);
          return err.onFailure(function(cause) {
            return Monad.failure(_this, "Invalid Set", [cause]);
          });
        };
      })(this));
    };

    SetType.prototype._undress = function(value, as) {
      if (!(as instanceof CollectionType)) {
        $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
      return SetType.__super__._undress.apply(this, arguments);
    };

    SetType.prototype.resolveProxies = function(system) {
      return this.elmType.resolveProxies(system);
    };

    return SetType;

  })(CollectionType);

  module.exports = SetType;

}).call(this);

},{"../support/collection_type":14,"../support/ic":20,"../support/utils":23,"../type":25}],32:[function(require,module,exports){
(function() {
  var $u, CollectionType, StructType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  CollectionType = require('../support/collection_type');

  StructType = (function(_super) {
    __extends(StructType, _super);

    TypeType(StructType, 'struct', ['componentTypes', 'metadata']);

    function StructType(componentTypes, metadata) {
      var wrongType;
      this.componentTypes = componentTypes;
      this.metadata = metadata;
      StructType.__super__.constructor.call(this, this.metadata);
      if (!$u.isArray(this.componentTypes)) {
        $u.argumentError("[Finitio::Type] expected, got:", this.componentTypes);
      }
      wrongType = $u.find(this.componentTypes, function(t) {
        return !(t instanceof Type);
      });
      if (wrongType != null) {
        $u.argumentError("[Finitio::Type] expected, got:", wrongType);
      }
    }

    StructType.prototype.size = function() {
      return $u.size(this.componentTypes);
    };

    StructType.prototype._include = function(value) {
      return $u.isArray(value) && $u.size(value) === $u.size(this.componentTypes) && $u.every($u.zip(value, this.componentTypes), function(valueAndKey) {
        var type;
        value = valueAndKey[0], type = valueAndKey[1];
        return type.include(value);
      });
    };

    StructType.prototype._mDress = function(value, Monad) {
      var mapper, onFailure;
      if (!(value instanceof Array)) {
        return Monad.failure(this, ["Array expected, got: `${value}`", [value]]);
      }
      if (value.length !== this.size()) {
        return Monad.failure(this, ["Struct size mismatch: ${a} for ${b}", [value.length, this.size()]]);
      }
      mapper = (function(_this) {
        return function(type, index) {
          return type.mDress(value[index], Monad);
        };
      })(this);
      onFailure = (function(_this) {
        return function(causes) {
          var params;
          params = ['Struct', value];
          return Monad.failure(_this, ["Invalid ${typeName}: `${value}`", params], causes);
        };
      })(this);
      return Monad.map(this.componentTypes, mapper, onFailure);
    };

    StructType.prototype._undress = function(value, as) {
      var from, to;
      if (!(as instanceof StructType)) {
        $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
      if (as.size() !== this.size()) {
        $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
      from = this.componentTypes;
      to = as.componentTypes;
      return $u.map(value, function(v, i) {
        return from[i].undress(v, to[i]);
      });
    };

    StructType.prototype._isSuperTypeOf = function(other) {
      return (this === other) || (other instanceof StructType && $u.size(this.componentTypes) === $u.size(other.componentTypes) && $u.every($u.zip(this.componentTypes, other.componentTypes), function(cs) {
        return cs[0].isSuperTypeOf(cs[1]);
      }));
    };

    StructType.prototype._equals = function(other) {
      return (this === other) || (other instanceof StructType && this.headingEquals(other)) || StructType.__super__._equals.apply(this, arguments);
    };

    StructType.prototype.headingEquals = function(other) {
      return $u.size(this.componentTypes) === $u.size(other.componentTypes) && $u.every(this.componentTypes, function(t, i) {
        return other.componentTypes[i].equals(t);
      });
    };

    StructType.prototype.resolveProxies = function(system) {
      return $u.each(this.componentTypes, function(c) {
        return c.resolveProxies(system);
      });
    };

    return StructType;

  })(Type);

  module.exports = StructType;

}).call(this);

},{"../support/collection_type":14,"../support/ic":20,"../support/utils":23,"../type":25}],33:[function(require,module,exports){
(function() {
  var $u, Constraint, Fetchable, SubType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Fetchable = require('../support/fetchable');

  Type = require('../type');

  Constraint = require('../support/constraint');

  SubType = (function(_super) {
    __extends(SubType, _super);

    TypeType(SubType, 'sub', ['superType', 'constraints', 'metadata']);

    function SubType(superType, constraints, metadata) {
      this.superType = superType;
      this.constraints = constraints;
      this.metadata = metadata;
      if (!(this.superType instanceof Type)) {
        $u.argumentError("Finitio.Type expected, got", this.superType);
      }
      if (this.constraints.constructor !== Array) {
        $u.argumentError("Array expected for constraints, got", this.constraints);
      }
      if (!(this.constraints.length > 0)) {
        $u.argumentError("Empty constraints not allowed on SubType");
      }
      if (!$u.every(this.constraints, function(c) {
        return c instanceof Constraint;
      })) {
        $u.argumentError("Array of constraints expected, got", this.constraints);
      }
      SubType.__super__.constructor.call(this, this.metadata);
    }

    Fetchable(SubType, "constraints", "constraint", function(name) {
      return $u.find(this.constraints, function(c) {
        return c.name === name;
      });
    });

    SubType.prototype._mDress = function(value, Monad) {
      var callback, onFailure, success;
      success = this.superType.mDress(value, Monad);
      callback = function(_, constraint) {
        var msg, params;
        if (constraint.accept(success.result)) {
          return success;
        } else {
          if (constraint.name != null) {
            msg = "Invalid ${typeName} (not ${cName}): `${value}`";
            params = ['value', constraint.name, value];
          } else {
            msg = "Invalid ${typeName}: `${value}`";
            params = ['value', value];
          }
          return Monad.failure(constraint, [msg, params]);
        }
      };
      onFailure = (function(_this) {
        return function(causes) {
          return Monad.failure(_this, causes[0].error);
        };
      })(this);
      return Monad.refine(success, this.constraints, callback, onFailure);
    };

    SubType.prototype._include = function(value) {
      return this.superType.include(value) && $u.every(this.constraints, function(c) {
        return c.accept(value);
      });
    };

    SubType.prototype._isSubTypeOf = function(other) {
      return other.isSuperTypeOf(this.superType);
    };

    SubType.prototype._equals = function(other) {
      return (this === other) || (other instanceof SubType && this.superTypeEquals(other) && this.constraintsEquals(other)) || SubType.__super__._equals.apply(this, arguments);
    };

    SubType.prototype.superTypeEquals = function(other) {
      return this.superType.equals(other.superType);
    };

    SubType.prototype.constraintsEquals = function(other) {
      return this.constraints.length === other.constraints.length && $u.every($u.zip(this.constraints, other.constraints), function(pair) {
        return pair[0].equals(pair[1]);
      });
    };

    SubType.prototype.resolveProxies = function(system) {
      return this.superType.resolveProxies(system);
    };

    return SubType;

  })(Type);

  module.exports = SubType;

}).call(this);

},{"../support/constraint":15,"../support/fetchable":18,"../support/ic":20,"../support/utils":23,"../type":25}],34:[function(require,module,exports){
(function() {
  var $u, CollectionType, Heading, TupleType, Type, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  Heading = require('../support/heading');

  CollectionType = require('../support/collection_type');

  TupleType = (function(_super) {
    var _attributesHash;

    __extends(TupleType, _super);

    TypeType(TupleType, 'tuple', ['heading', 'metadata']);

    function TupleType(heading, metadata) {
      this.heading = heading;
      this.metadata = metadata;
      if (!(this.heading instanceof Heading)) {
        $u.argumentError("Heading expected, got:", this.heading);
      }
      TupleType.__super__.constructor.call(this, this.metadata);
    }

    TupleType.prototype.fetch = function() {
      return this.heading.fetch.apply(this.heading, arguments);
    };

    TupleType.prototype._include = function(value) {
      if (typeof value !== "object") {
        return false;
      }
      if (!this.areAttributesValid(value)) {
        return false;
      }
      return $u.every(this.heading.attributes, function(attribute) {
        var attr_val;
        if (value[attribute.name] != null) {
          attr_val = value[attribute.name];
          return attribute.type.include(attr_val);
        } else {
          return true;
        }
      });
    };

    TupleType.prototype._mDress = function(value, Monad) {
      var attributes, callback, onFailure, result, success;
      if (!(value instanceof Object)) {
        return Monad.failure(this, ["Invalid Tuple: `${value}`", [value]]);
      }
      result = {};
      success = Monad.success(result);
      callback = (function(_this) {
        return function(_, attrName) {
          var attr, attrValue, m, subm;
          attr = _this.heading.getAttr(attrName) || null;
          attrValue = value[attrName];
          if ((attrValue === void 0) && (attr != null) && attr.required) {
            m = Monad.failure(attrName, ["Missing attribute `${attrName}`", [attrName]]);
            return m.onFailure(function(f) {
              f.location = attrName;
              return m;
            });
          } else if ((attr == null) && !_this.heading.allowExtra()) {
            m = Monad.failure(attrName, ["Unrecognized attribute `${attrName}`", [attrName]]);
            return m.onFailure(function(f) {
              f.location = attrName;
              return m;
            });
          } else if ((attr != null) && (attrValue !== void 0)) {
            subm = attr.type.mDress(attrValue, Monad);
            subm.onFailure(function(error) {
              error.location = attrName;
              return subm;
            });
            return subm.onSuccess(function(val) {
              result[attrName] = val;
              return success;
            });
          } else if (attrValue !== void 0) {
            result[attrName] = attrValue;
            return success;
          } else {
            return success;
          }
        };
      })(this);
      onFailure = (function(_this) {
        return function(causes) {
          var params;
          params = ['Tuple', value];
          return Monad.failure(_this, ["Invalid ${typeName}", params], causes);
        };
      })(this);
      attributes = _attributesHash(this.heading);
      $u.extend(attributes, value);
      attributes = Object.keys(attributes);
      return Monad.refine(success, attributes, callback, onFailure);
    };

    TupleType.prototype._undress = function(value, as) {
      var l, r, s, undressed, _ref;
      if (!(as instanceof TupleType)) {
        $u.undressError("Tuple cannot undress to `" + as + "` (" + as.constructor + ").");
      }
      _ref = $u.triSplit(_attributesHash(this.heading), _attributesHash(as.heading)), s = _ref[0], l = _ref[1], r = _ref[2];
      if ($u.find(l, function(a) {
        return a.required;
      })) {
        $u.undressError("Tuple undress does not allow projecting " + l);
      }
      if (!$u.isEmpty(r)) {
        $u.undressError("Tuple undress does not support missing " + r);
      }
      if (!$u.every(s, function(pair) {
        return pair[0].required === pair[1].required;
      })) {
        $u.undressError("Tuple undress requires optional attributes to agree");
      }
      undressed = {};
      this.heading.each(function(attribute) {
        var attrName, attrType, attrValue, targType;
        attrName = attribute.name;
        attrType = attribute.type;
        attrValue = value[attrName];
        if (attrValue !== void 0) {
          targType = as.heading.getAttr(attrName).type;
          return undressed[attribute.name] = attrType.undress(attrValue, targType);
        }
      });
      return undressed;
    };

    TupleType.prototype._isSuperTypeOf = function(other) {
      return (this === other) || (other instanceof TupleType && this.heading.isSuperHeadingOf(other.heading));
    };

    TupleType.prototype._equals = function(other) {
      return (this === other) || (other instanceof TupleType && this.heading.equals(other.heading)) || TupleType.__super__._equals.apply(this, arguments);
    };

    _attributesHash = function(heading) {
      var h;
      h = {};
      heading.each(function(a) {
        return h[a.name] = a;
      });
      return h;
    };

    TupleType.prototype.attributeNames = function() {
      return $u.map(this.heading.attributes, function(a) {
        return a.name;
      });
    };

    TupleType.prototype.requiredAttributeNames = function() {
      return $u.map($u.values($u.filter(this.heading.attributes, function(a) {
        return a.required;
      })), function(a) {
        return a.name;
      });
    };

    TupleType.prototype.extraAttributes = function(value) {
      return $u.difference($u.keys(value), this.attributeNames());
    };

    TupleType.prototype.missingAttributes = function(value) {
      return $u.difference(this.requiredAttributeNames(), $u.keys(value));
    };

    TupleType.prototype.areAttributesValid = function(value) {
      return (this.heading.allowExtra() || $u.isEmpty(this.extraAttributes(value))) && $u.isEmpty(this.missingAttributes(value));
    };

    TupleType.prototype.resolveProxies = function(system) {
      return this.heading.resolveProxies(system);
    };

    return TupleType;

  })(Type);

  module.exports = TupleType;

}).call(this);

},{"../support/collection_type":14,"../support/heading":19,"../support/ic":20,"../support/utils":23,"../type":25}],35:[function(require,module,exports){
(function() {
  var $u, ObjectType, Type, TypeDef,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ObjectType = require('../support/ic').ObjectType;

  Type = require('../type');

  $u = require('../support/utils');

  TypeDef = (function(_super) {
    __extends(TypeDef, _super);

    ObjectType(TypeDef, ['type', 'name', 'metadata']);

    function TypeDef(type, name, metadata) {
      this.type = type;
      this.name = name;
      this.metadata = metadata;
      if (!this.name) {
        $u.argumentError("Name cannot be null on TypeDef");
      }
      TypeDef.__super__.constructor.call(this, this.metadata);
      this.generator = this.type.generator;
    }

    TypeDef.prototype.fetch = function() {
      return this.type.fetch.apply(this.type, arguments);
    };

    TypeDef.prototype._include = function(value) {
      return this.type.include(value);
    };

    TypeDef.prototype._mDress = function(value, Monad) {
      var m;
      m = this.type.mDress(value, Monad);
      return m.onFailure((function(_this) {
        return function(cause) {
          if (_this.name === 'Main') {
            cause.typeName = 'Data';
          } else {
            cause.typeName = _this.name;
          }
          return m;
        };
      })(this));
    };

    TypeDef.prototype._undress = function(value, as) {
      return this.type.undress(value, as);
    };

    TypeDef.prototype._isSuperTypeOf = function(child) {
      return this.type.isSuperTypeOf(child);
    };

    TypeDef.prototype._isSubTypeOf = function(sup) {
      return this.type._isSubTypeOf(sup);
    };

    TypeDef.prototype._equals = function(other) {
      return this.type.equals(other);
    };

    TypeDef.prototype.isFake = function() {
      return true;
    };

    TypeDef.prototype.trueOne = function() {
      return this.type;
    };

    TypeDef.prototype.resolveProxies = function(system) {
      return this.type.resolveProxies(system);
    };

    return TypeDef;

  })(Type);

  module.exports = TypeDef;

}).call(this);

},{"../support/ic":20,"../support/utils":23,"../type":25}],36:[function(require,module,exports){
(function() {
  var $u, Type, TypeRef, TypeType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  TypeRef = (function(_super) {
    __extends(TypeRef, _super);

    TypeType(TypeRef, 'ref', ['typeName', 'metadata']);

    function TypeRef(typeName, metadata, target) {
      this.typeName = typeName;
      this.metadata = metadata;
      this.target = target;
      if (!this.typeName) {
        $u.argumentError("Proxied ref cannot be null on TypeRef");
      }
      TypeRef.__super__.constructor.call(this, this.metadata);
    }

    TypeRef.prototype.fetch = function() {
      var r;
      r = this.resolved();
      return r.fetch.apply(r, arguments);
    };

    TypeRef.prototype._include = function(value) {
      return this.resolved().include(value);
    };

    TypeRef.prototype._mDress = function(value, Monad) {
      return this.resolved().mDress(value, Monad);
    };

    TypeRef.prototype._undress = function(value, as) {
      return this.resolved().undress(value, as);
    };

    TypeRef.prototype._isSuperTypeOf = function(child) {
      return this.resolved().isSuperTypeOf(child);
    };

    TypeRef.prototype._isSubTypeOf = function(sup) {
      return this.resolved()._isSubTypeOf(sup);
    };

    TypeRef.prototype._equals = function(other) {
      return this.resolved().equals(other);
    };

    TypeRef.prototype.isFake = function() {
      return true;
    };

    TypeRef.prototype.trueOne = function() {
      return this.resolved().trueOne();
    };

    TypeRef.prototype.resolve = function(system) {
      return this.target != null ? this.target : this.target = system.resolve(this.typeName).fetchType();
    };

    TypeRef.prototype.resolveProxies = function(system) {
      return this.resolve(system);
    };

    TypeRef.prototype.resolved = function() {
      if (!this.target) {
        throw new Error("Proxy is not resolved");
      }
      return this.target;
    };

    return TypeRef;

  })(Type);

  module.exports = TypeRef;

}).call(this);

},{"../support/ic":20,"../support/utils":23,"../type":25}],37:[function(require,module,exports){
(function() {
  var $u, Type, TypeType, UnionType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TypeType = require('../support/ic').TypeType;

  $u = require('../support/utils');

  Type = require('../type');

  UnionType = (function(_super) {
    __extends(UnionType, _super);

    TypeType(UnionType, 'union', ['candidates', 'metadata']);

    function UnionType(candidates, metadata) {
      this.candidates = candidates;
      this.metadata = metadata;
      $u.each(this.candidates, function(c) {
        if (!(c instanceof Type)) {
          return $u.argumentError("Finitio.Type expected, got:", c);
        }
      });
      UnionType.__super__.constructor.call(this, this.metadata);
    }

    UnionType.prototype._mDress = function(value, Monad) {
      var callback, onFailure;
      callback = function(candidate) {
        return candidate.mDress(value, Monad);
      };
      onFailure = (function(_this) {
        return function(causes) {
          var params;
          params = ['value', value];
          return Monad.failure(_this, ["Invalid ${typeName}: `${value}`", params], causes);
        };
      })(this);
      return Monad.find(this.candidates, callback, onFailure);
    };

    UnionType.prototype._undress = function(value, as) {
      var using;
      if (this === as) {
        return value;
      }
      if ((using = $u.find(this.candidates, function(c) {
        return as.isSuperTypeOf(c);
      }))) {
        return using.undress(value, as);
      } else if ((using = $u.find(this.candidates, function(c) {
        return c.include(value);
      }))) {
        return using.undress(value, as);
      } else {
        return $u.undressError("Unable to undress `" + value + "` to `" + as + "`");
      }
    };

    UnionType.prototype._include = function(value) {
      var found;
      found = $u.find(this.candidates, function(c) {
        return c.include(value);
      });
      return found != null;
    };

    UnionType.prototype._isSuperTypeOf = function(other) {
      return (this === other) || ($u.any(this.candidates, function(c) {
        return c.isSuperTypeOf(other);
      })) || (other instanceof UnionType && $u.every(other.candidates, (function(_this) {
        return function(d) {
          return $u.any(_this.candidates, function(c) {
            return c.isSuperTypeOf(d);
          });
        };
      })(this))) || UnionType.__super__._isSuperTypeOf.apply(this, arguments);
    };

    UnionType.prototype._equals = function(other) {
      return (this === other) || (other instanceof UnionType && this.candidatesEquals(other, true)) || UnionType.__super__._equals.apply(this, arguments);
    };

    UnionType.prototype.candidatesEquals = function(other, andback) {
      var ok;
      ok = $u.every(this.candidates, function(c) {
        return $u.any(other.candidates, function(c2) {
          return c.equals(c2);
        });
      });
      return ok && (!andback || other.candidatesEquals(this, false));
    };

    UnionType.prototype.resolveProxies = function(system) {
      return $u.each(this.candidates, function(c) {
        return c.resolveProxies(system);
      });
    };

    return UnionType;

  })(Type);

  module.exports = UnionType;

}).call(this);

},{"../support/ic":20,"../support/utils":23,"../type":25}],38:[function(require,module,exports){
module.exports = Finitio = require("./build/src/finitio");

},{"./build/src/finitio":2}],39:[function(require,module,exports){

},{}]},{},[38])