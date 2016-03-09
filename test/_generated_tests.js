/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _main = __webpack_require__(2);

	var _main2 = _interopRequireDefault(_main);

	var _test_data2 = __webpack_require__(11);

	var _test_data3 = _interopRequireDefault(_test_data2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var expect = __webpack_require__(12).expect;


	describe('Feed Eater', function () {
	  it('should not be undefined', function () {
	    expect(_main2.default).to.exist;
	  });
	  it('should provide version number access method', function () {
	    expect(_main2.default.getVersion).to.exist;
	  });
	  it('should provide version number', function () {
	    expect(_main2.default.getVersion()).to.not.be.null;
	  });

	  describe('Feed Eater - Consumer Service', function () {
	    it('should provide consumer service', function () {
	      expect(_main2.default.consumer).to.exist;
	    });
	    it('should execute consume method', function () {
	      var feed = _main2.default.consumer.consume(_test_data3.default.consumer.google_rss_url);
	      expect(feed).to.not.be.null;
	    });
	    it('should execute consume method and get data', function () {
	      var feed = _main2.default.consumer.consume(_test_data3.default.consumer.google_rss_url);
	      return feed.then(function (data) {
	        expect(data).to.not.be.null;
	      });
	    });
	    it('should execute consume method on alternate url and get data', function () {
	      var feed = _main2.default.consumer.consume(_test_data3.default.consumer.topix_rss_url);
	      return feed.then(function (data) {
	        expect(data).to.not.be.null;
	      });
	    });
	  });

	  describe('Feed Eater - Cache Service', function () {
	    it('should provide caching service', function () {
	      expect(_main2.default.cache).to.exist;
	    });
	    it('should not have test data in cache service', function () {
	      expect(_main2.default.cache.dataExists('test-data')).to.be.false;
	    });
	    it('should cache test data in cache service', function () {
	      expect(_main2.default.cache.dataExists('test-data')).to.be.false;
	      _main2.default.cache.addToDataCache('test-data', _test_data3.default);
	      expect(_main2.default.cache.dataExists('test-data')).to.be.true;
	    });
	    it('should get the right data from cache service', function () {
	      _main2.default.cache.addToDataCache('test-data', _test_data3.default);
	      expect(_main2.default.cache.dataExists('test-data')).to.be.true;
	      expect(_main2.default.cache.getCachedData('test-data')).to.equal(_test_data3.default);
	    });
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _package = __webpack_require__(3);

	var _package2 = _interopRequireDefault(_package);

	var _consumer = __webpack_require__(4);

	var _consumer2 = _interopRequireDefault(_consumer);

	var _cache = __webpack_require__(8);

	var _cache2 = _interopRequireDefault(_cache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getVersion = function getVersion() {
	  return _package2.default.version;
	};

	var feedeater = function feedeater() {
	  return {
	    getVersion: getVersion,
	    consumer: _consumer2.default,
	    cache: _cache2.default
	  };
	};

	exports.default = feedeater();

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"name": "feed-eater",
		"version": "0.0.1",
		"description": "RSS Feed Consumer And Parsing Service",
		"license": "MIT",
		"author": {
			"name": "Mockery Jones",
			"url": "http://github.com/mockeryjones"
		},
		"homepage": "https://github.com/mockeryjones/feed-eater",
		"repository": {
			"type": "git",
			"url": "git@github.com:mockeryjones/feed-eater.git"
		},
		"contributors": [
			"Mockery Jones <mockeryjones@gmail.com>"
		],
		"scripts": {
			"help": "npm run",
			"clean": "rm -rf node_modules reports dist test/_generated_tests.js",
			"prepare": "npm install",
			"prepare:dir": "mkdir -p reports dist && rm -rf test/_generated_tests.js",
			"lint": "eslint client/*/*.jsx -f checkstyle > reports/jshint-checkstyle.xml",
			"_test": "multi='spec=- xunit=reports/mocha-xunit.xml' mocha --reporter mocha-multi test/_generated_tests.js",
			"test": "rm -rf test/_generated_tests.js && webpack --progress --config webpack-test-config.js && npm run _test",
			"build:js": "webpack --optimize-minimize",
			"build": "npm run prepare && npm run prepare:dir && npm run lint && npm run build:js && npm run test",
			"start": "node dist/fead.eater.js"
		},
		"dependencies": {
			"babel-preset-es2015": "^6.3.13",
			"babel-preset-react": "^6.3.13",
			"request": "2.69.0",
			"promise": "7.1.1",
			"when": "3.7.x",
			"feedparser": "1.1.4",
			"xml2js": "0.4.16",
			"lodash": "3.10.x",
			"moment-timezone": "0.5.1",
			"numeral": "1.5.3",
			"object-hash": "0.9.3"
		},
		"devDependencies": {
			"babel-core": "6.3.x",
			"babel-loader": "6.2.0",
			"chai": "^3.4.0",
			"eslint": "^1.10.0",
			"json-loader": "^0.5.2",
			"jszip": "^2.5.0",
			"less": "2.5.3",
			"mocha": "^2.3.0",
			"mocha-multi": "^0.7.2",
			"toastr": "^2.1.2",
			"watch-run": "^1.2.4",
			"webpack": "^1.12.9",
			"webpack-dev-server": "^1.14.0"
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _request = __webpack_require__(5);

	var _request2 = _interopRequireDefault(_request);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _xml2js = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var consume = function consume(url) {
	    return new Promise(function (resolve, reject) {
	        (0, _request2.default)({ url: url }, function (err, res, body) {
	            if (err) {
	                return reject(err);
	            } else if (res.statusCode !== 200) {
	                err = new Error("Unexpected status code: " + res.statusCode);
	                err.res = res;
	                return reject(err);
	            }
	            (0, _xml2js.parseString)(body, function (err, result) {
	                resolve(result);
	            });
	        });
	    });
	}; /** simple rss to json http requestor */


	var consumer = function consumer() {
	    return {
	        consume: consume
	    };
	};

	exports.default = consumer();

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("promise");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("xml2js");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _objectHash = __webpack_require__(9);

	var _objectHash2 = _interopRequireDefault(_objectHash);

	var _momentTimezone = __webpack_require__(10);

	var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dataStore = {};

	var getQueryHash = function getQueryHash(query) {
	  return (0, _objectHash2.default)(query);
	};

	var dataExists = function dataExists(query) {
	  var query_hash = getQueryHash(query);
	  if (dataStore[query_hash] !== undefined) {
	    return true;
	  } else {
	    return false;
	  }
	};

	var getCachedData = function getCachedData(query) {
	  var query_hash = getQueryHash(query);
	  return dataStore[query_hash].data;
	};

	var addToDataCache = function addToDataCache(query, data) {
	  var query_hash = getQueryHash(query);
	  var entry = {
	    data: data,
	    time: (0, _momentTimezone2.default)().format()
	  };
	  dataStore[query_hash] = entry;
	};

	var removeFromCache = function removeFromCache(query) {
	  var query_hash = getQueryHash(query);
	  dataStore[query_hash] = undefined;
	};

	var cache = function cache() {
	  return {
	    dataExists: dataExists,
	    getCachedData: getCachedData,
	    addToDataCache: addToDataCache,
	    removeFromCache: removeFromCache
	  };
	};

	exports.default = cache();

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("object-hash");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("moment-timezone");

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		"consumer": {
			"google_rss_url": "https://news.google.de/news/feeds?pz=1&cf=all&ned=en&hl=en&q=Russia&output=rss",
			"topix_rss_url": "http://www.topix.com/rss/world/russia"
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ }
/******/ ]);