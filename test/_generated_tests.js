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

	var _countries = __webpack_require__(16);

	var _countries2 = _interopRequireDefault(_countries);

	var _lodash = __webpack_require__(13);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _test_data2 = __webpack_require__(17);

	var _test_data3 = _interopRequireDefault(_test_data2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var expect = __webpack_require__(18).expect;


	describe('Feed Eater', function () {

	  var pickRandomFromZeroTo = function pickRandomFromZeroTo(max) {
	    var rnd = Math.floor(Math.random() * 100);
	    return rnd > -1 && rnd <= max ? rnd : pickRandomFromZeroTo(max);
	  };

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
	      expect(_main2.default.eater).to.exist;
	    });
	    it('should execute consume method', function () {
	      var feed = _main2.default.eater.consume(_test_data3.default.consumer.google_rss_url);
	      expect(feed).to.not.be.null;
	    });
	    it('should execute consume method and get data', function () {
	      var feed = _main2.default.eater.consume(_test_data3.default.consumer.google_rss_url);
	      return feed.then(function (data) {
	        expect(data).to.not.be.null;
	      });
	    });
	    it('should execute consume method on alternate url and get data', function () {
	      var feed = _main2.default.eater.consume(_test_data3.default.consumer.topix_rss_url);
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

	  describe('Feed Eater - Query Service', function () {
	    it('should provide query building service', function () {
	      expect(_main2.default.query).to.exist;
	    });
	    it('should build all queries for test keyword', function () {
	      var queries = _main2.default.query.getAllQueries(_test_data3.default.query.test_query);
	      var q_keys = _lodash2.default.keys(queries);
	      expect(q_keys.length).to.be.above(2);
	    });
	    it('should build only two for test keyword', function () {
	      var queries = _main2.default.query.getQueryForServices(_test_data3.default.query.test_query, _test_data3.default.query.search_only_services);
	      var q_keys = _lodash2.default.keys(queries);
	      expect(q_keys.length).to.be.equal(2);
	    });
	    it('should build only one for test keyword', function () {
	      var queries = _main2.default.query.getQueryForServices(_test_data3.default.query.test_query, _test_data3.default.query.one_service_array);
	      var q_keys = _lodash2.default.keys(queries);
	      expect(q_keys.length).to.be.equal(1);
	    });
	    it('should build only one (the other way) for test keyword', function () {
	      var queries = _main2.default.query.getQueryForService(_test_data3.default.query.test_query, _test_data3.default.query.single_service);
	      var q_keys = _lodash2.default.keys(queries);
	      expect(q_keys.length).to.be.equal(1);
	    });
	  });

	  describe('Feed Eater - Loader Service', function () {
	    it('should provide keyword loading service', function () {
	      expect(_main2.default.loader).to.exist;
	    });
	    it('should associate queries with predefined keyword list', function () {
	      var queries = _main2.default.loader.buildQueryList(_countries2.default);
	      expect(queries.length).to.be.above(100);
	    });
	    it('should attempt to fetch data given a query collection', function () {
	      var queries = _main2.default.loader.buildQueryList(_countries2.default);
	      var query_bundle = queries[pickRandomFromZeroTo(queries.length - 1)];
	      var query_promises = _main2.default.loader.getQueryPromises(query_bundle);
	      return query_promises.then(function (data) {
	        expect(data).to.not.be.null;
	        expect(data.length).to.be.equal(3);
	      });
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

	var _eater = __webpack_require__(4);

	var _eater2 = _interopRequireDefault(_eater);

	var _cache = __webpack_require__(8);

	var _cache2 = _interopRequireDefault(_cache);

	var _query = __webpack_require__(11);

	var _query2 = _interopRequireDefault(_query);

	var _loader = __webpack_require__(14);

	var _loader2 = _interopRequireDefault(_loader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getVersion = function getVersion() {
	  return _package2.default.version;
	};

	var feedeater = function feedeater() {
	  return {
	    getVersion: getVersion,
	    eater: _eater2.default,
	    cache: _cache2.default,
	    query: _query2.default,
	    loader: _loader2.default
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
			"start": "node dist/feed.eater.js test 2"
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


	var eater = function eater() {
	    return {
	        consume: consume
	    };
	};

	exports.default = eater();

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

	/** simple object cache **/


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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _feed_services = __webpack_require__(12);

	var _feed_services2 = _interopRequireDefault(_feed_services);

	var _lodash = __webpack_require__(13);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** query constructor used to generate urls appropriate for various rss providing services **/
	/** feed services are defined in /lib/config/feed_services.json, however the plan is to allow
	    service resources to be configurable via module functions **/

	var getAllQueries = function getAllQueries(keyword) {
	  var query = {};
	  _lodash2.default.each(_feed_services2.default, function (service) {
	    var service_keyword = keyword.replace(/ /g, service.query_spacer);
	    query[service.name] = service.path.replace('{QUERY}', service_keyword.toLowerCase());
	  });

	  return query;
	};

	var getQueryForService = function getQueryForService(keyword, service_key) {
	  var path = null;
	  _lodash2.default.each(_feed_services2.default, function (service) {
	    if (service.name === service_key) {
	      var service_keyword = keyword.replace(/ /g, service.query_spacer.toLowerCase());
	      path = service.path.replace('{QUERY}', service_keyword);
	    }
	  });
	  var query = {};
	  query[service_key] = path;
	  return query;
	};

	var getQueryForServices = function getQueryForServices(keyword, service_keys) {
	  var query = {};
	  _lodash2.default.each(_feed_services2.default, function (service) {
	    if (_lodash2.default.indexOf(service_keys, service.name) > -1) {
	      var service_keyword = keyword.replace(/ /g, service.query_spacer);
	      query[service.name] = service.path.replace('{QUERY}', service_keyword.toLowerCase());
	    }
	  });
	  return query;
	};

	var query = function query() {
	  return {
	    getAllQueries: getAllQueries,
	    getQueryForService: getQueryForService,
	    getQueryForServices: getQueryForServices
	  };
	};

	exports.default = query();

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
		"name": "google",
		"path": "https://news.google.de/news/feeds?pz=1&cf=all&ned=en&hl=en&q={QUERY}&output=rss",
		"query_spacer": "+"
	}, {
		"name": "topix-world-news",
		"path": "http://www.topix.com/rss/world/{QUERY}",
		"query_spacer": "-"
	}, {
		"name": "bing",
		"path": "http://www.bing.com/news/search?q={QUERY}&FORM=HDRSC6&format=rss",
		"query_spacer": "+"
	}];

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _query = __webpack_require__(11);

	var _query2 = _interopRequireDefault(_query);

	var _lodash = __webpack_require__(13);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _when = __webpack_require__(15);

	var _when2 = _interopRequireDefault(_when);

	var _eater = __webpack_require__(4);

	var _eater2 = _interopRequireDefault(_eater);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var buildQueryList = function buildQueryList(list) {
	  var _list = [];
	  _lodash2.default.each(list, function (data) {
	    if (data.services !== undefined) {
	      data.query = _query2.default.getQueryForServices(data.keyword, data.services);
	    } else {
	      data.query = _query2.default.getAllQueries(data.keyword);
	    }
	    _list.push(data);
	  });
	  return _list;
	};

	var buildQueriesForKeyword = function buildQueriesForKeyword(keyword, services) {
	  var query = {};
	  query.keyword = keyword;
	  if (services !== undefined) {
	    query.query = query.getQueryForServices(keyword, services);
	  } else {
	    query.query = query.getAllQueries(keyword);
	  }
	  return query;
	};

	var getQueryPromises = function getQueryPromises(query_obj) {
	  var requests = [];
	  var _keys = _lodash2.default.keys(query_obj.query);
	  _lodash2.default.each(_keys, function (key) {
	    requests.push(_eater2.default.consume(query_obj.query[key]));
	  });
	  //I thought about defining an execution handler for this method
	  //but then i realised this is really just another type of promise.
	  //let the caller decide what to do with the results.  this is just
	  //a convenience method fow wrapping a bunch of feed requests into one bundle.
	  return _when2.default.settle(requests);
	};

	var buildQueryPlan = function buildQueryPlan(list) {
	  var _list = [];
	  _lodash2.default.each(list, function (data) {
	    var data_promise = getQueryPromises(data);
	    data.promise = data_promise;
	    _list.push(data);
	  });
	  return _list;
	};

	var executePlan = function executePlan(list) {
	  _lodash2.default.each(list, function (query) {
	    query.promise.then(function (data) {
	      console.log('results for query ' + JSON.stringify(query, null, 4));
	      console.log(data);
	    }, function (err) {
	      console.log('error for query ' + JSON.stringify(query, null, 4));
	      console.log(err);
	    });
	  });
	};

	var loader = function loader() {
	  return {
	    buildQueryList: buildQueryList,
	    getQueryPromises: getQueryPromises,
	    buildQueryPlan: buildQueryPlan,
	    executePlan: executePlan
	  };
	};

	exports.default = loader();

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("when");

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
		"keyword": "Afghanistan",
		"id": "AF"
	}, {
		"keyword": "Åland Islands",
		"id": "AX"
	}, {
		"keyword": "Albania",
		"id": "AL"
	}, {
		"keyword": "Algeria",
		"id": "DZ"
	}, {
		"keyword": "American Samoa",
		"id": "AS"
	}, {
		"keyword": "Andorra",
		"id": "AD"
	}, {
		"keyword": "Angola",
		"id": "AO"
	}, {
		"keyword": "Anguilla",
		"id": "AI"
	}, {
		"keyword": "Antarctica",
		"id": "AQ"
	}, {
		"keyword": "Antigua and Barbuda",
		"id": "AG"
	}, {
		"keyword": "Argentina",
		"id": "AR"
	}, {
		"keyword": "Armenia",
		"id": "AM"
	}, {
		"keyword": "Aruba",
		"id": "AW"
	}, {
		"keyword": "Australia",
		"id": "AU"
	}, {
		"keyword": "Austria",
		"id": "AT"
	}, {
		"keyword": "Azerbaijan",
		"id": "AZ"
	}, {
		"keyword": "Bahamas",
		"id": "BS"
	}, {
		"keyword": "Bahrain",
		"id": "BH"
	}, {
		"keyword": "Bangladesh",
		"id": "BD"
	}, {
		"keyword": "Barbados",
		"id": "BB"
	}, {
		"keyword": "Belarus",
		"id": "BY"
	}, {
		"keyword": "Belgium",
		"id": "BE"
	}, {
		"keyword": "Belize",
		"id": "BZ"
	}, {
		"keyword": "Benin",
		"id": "BJ"
	}, {
		"keyword": "Bermuda",
		"id": "BM"
	}, {
		"keyword": "Bhutan",
		"id": "BT"
	}, {
		"keyword": "Bolivia",
		"id": "BO"
	}, {
		"keyword": "Bosnia and Herzegovina",
		"id": "BA"
	}, {
		"keyword": "Botswana",
		"id": "BW"
	}, {
		"keyword": "Bouvet Island",
		"id": "BV"
	}, {
		"keyword": "Brazil",
		"id": "BR"
	}, {
		"keyword": "British Indian Ocean Territory",
		"id": "IO"
	}, {
		"keyword": "Brunei Darussalam",
		"id": "BN"
	}, {
		"keyword": "Bulgaria",
		"id": "BG"
	}, {
		"keyword": "Burkina Faso",
		"id": "BF"
	}, {
		"keyword": "Burundi",
		"id": "BI"
	}, {
		"keyword": "Cambodia",
		"id": "KH"
	}, {
		"keyword": "Cameroon",
		"id": "CM"
	}, {
		"keyword": "Canada",
		"id": "CA"
	}, {
		"keyword": "Cape Verde",
		"id": "CV"
	}, {
		"keyword": "Cayman Islands",
		"id": "KY"
	}, {
		"keyword": "Central African Republic",
		"id": "CF"
	}, {
		"keyword": "Chad",
		"id": "TD"
	}, {
		"keyword": "Chile",
		"id": "CL"
	}, {
		"keyword": "China",
		"id": "CN"
	}, {
		"keyword": "Christmas Island",
		"id": "CX"
	}, {
		"keyword": "Cocos (Keeling) Islands",
		"id": "CC"
	}, {
		"keyword": "Colombia",
		"id": "CO"
	}, {
		"keyword": "Comoros",
		"id": "KM"
	}, {
		"keyword": "Congo",
		"id": "CG"
	}, {
		"keyword": "Congo, The Democratic Republic of the",
		"id": "CD"
	}, {
		"keyword": "Cook Islands",
		"id": "CK"
	}, {
		"keyword": "Costa Rica",
		"id": "CR"
	}, {
		"keyword": "Cote D'Ivoire",
		"id": "CI"
	}, {
		"keyword": "Croatia",
		"id": "HR"
	}, {
		"keyword": "Cuba",
		"id": "CU"
	}, {
		"keyword": "Cyprus",
		"id": "CY"
	}, {
		"keyword": "Czech Republic",
		"id": "CZ"
	}, {
		"keyword": "Denmark",
		"id": "DK"
	}, {
		"keyword": "Djibouti",
		"id": "DJ"
	}, {
		"keyword": "Dominica",
		"id": "DM"
	}, {
		"keyword": "Dominican Republic",
		"id": "DO"
	}, {
		"keyword": "Ecuador",
		"id": "EC"
	}, {
		"keyword": "Egypt",
		"id": "EG"
	}, {
		"keyword": "El Salvador",
		"id": "SV"
	}, {
		"keyword": "Equatorial Guinea",
		"id": "GQ"
	}, {
		"keyword": "Eritrea",
		"id": "ER"
	}, {
		"keyword": "Estonia",
		"id": "EE"
	}, {
		"keyword": "Ethiopia",
		"id": "ET"
	}, {
		"keyword": "Falkland Islands (Malvinas)",
		"id": "FK"
	}, {
		"keyword": "Faroe Islands",
		"id": "FO"
	}, {
		"keyword": "Fiji",
		"id": "FJ"
	}, {
		"keyword": "Finland",
		"id": "FI"
	}, {
		"keyword": "France",
		"id": "FR"
	}, {
		"keyword": "French Guiana",
		"id": "GF"
	}, {
		"keyword": "French Polynesia",
		"id": "PF"
	}, {
		"keyword": "French Southern Territories",
		"id": "TF"
	}, {
		"keyword": "Gabon",
		"id": "GA"
	}, {
		"keyword": "Gambia",
		"id": "GM"
	}, {
		"keyword": "Georgia",
		"id": "GE"
	}, {
		"keyword": "Germany",
		"id": "DE"
	}, {
		"keyword": "Ghana",
		"id": "GH"
	}, {
		"keyword": "Gibraltar",
		"id": "GI"
	}, {
		"keyword": "Greece",
		"id": "GR"
	}, {
		"keyword": "Greenland",
		"id": "GL"
	}, {
		"keyword": "Grenada",
		"id": "GD"
	}, {
		"keyword": "Guadeloupe",
		"id": "GP"
	}, {
		"keyword": "Guam",
		"id": "GU"
	}, {
		"keyword": "Guatemala",
		"id": "GT"
	}, {
		"keyword": "Guernsey",
		"id": "GG"
	}, {
		"keyword": "Guinea",
		"id": "GN"
	}, {
		"keyword": "Guinea-Bissau",
		"id": "GW"
	}, {
		"keyword": "Guyana",
		"id": "GY"
	}, {
		"keyword": "Haiti",
		"id": "HT"
	}, {
		"keyword": "Heard Island and Mcdonald Islands",
		"id": "HM"
	}, {
		"keyword": "Holy See (Vatican City State)",
		"id": "VA"
	}, {
		"keyword": "Honduras",
		"id": "HN"
	}, {
		"keyword": "Hong Kong",
		"id": "HK"
	}, {
		"keyword": "Hungary",
		"id": "HU"
	}, {
		"keyword": "Iceland",
		"id": "IS"
	}, {
		"keyword": "India",
		"id": "IN"
	}, {
		"keyword": "Indonesia",
		"id": "ID"
	}, {
		"keyword": "Iran, Islamic Republic Of",
		"id": "IR"
	}, {
		"keyword": "Iraq",
		"id": "IQ"
	}, {
		"keyword": "Ireland",
		"id": "IE"
	}, {
		"keyword": "Isle of Man",
		"id": "IM"
	}, {
		"keyword": "Israel",
		"id": "IL"
	}, {
		"keyword": "Italy",
		"id": "IT"
	}, {
		"keyword": "Jamaica",
		"id": "JM"
	}, {
		"keyword": "Japan",
		"id": "JP"
	}, {
		"keyword": "Jersey",
		"id": "JE"
	}, {
		"keyword": "Jordan",
		"id": "JO"
	}, {
		"keyword": "Kazakhstan",
		"id": "KZ"
	}, {
		"keyword": "Kenya",
		"id": "KE"
	}, {
		"keyword": "Kiribati",
		"id": "KI"
	}, {
		"keyword": "Democratic People's Republic of Korea",
		"id": "KP"
	}, {
		"keyword": "Korea, Republic of",
		"id": "KR"
	}, {
		"keyword": "Kosovo",
		"id": "XK"
	}, {
		"keyword": "Kuwait",
		"id": "KW"
	}, {
		"keyword": "Kyrgyzstan",
		"id": "KG"
	}, {
		"keyword": "Lao People's Democratic Republic",
		"id": "LA"
	}, {
		"keyword": "Latvia",
		"id": "LV"
	}, {
		"keyword": "Lebanon",
		"id": "LB"
	}, {
		"keyword": "Lesotho",
		"id": "LS"
	}, {
		"keyword": "Liberia",
		"id": "LR"
	}, {
		"keyword": "Libyan Arab Jamahiriya",
		"id": "LY"
	}, {
		"keyword": "Liechtenstein",
		"id": "LI"
	}, {
		"keyword": "Lithuania",
		"id": "LT"
	}, {
		"keyword": "Luxembourg",
		"id": "LU"
	}, {
		"keyword": "Macao",
		"id": "MO"
	}, {
		"keyword": "Macedonia, The Former Yugoslav Republic of",
		"id": "MK"
	}, {
		"keyword": "Madagascar",
		"id": "MG"
	}, {
		"keyword": "Malawi",
		"id": "MW"
	}, {
		"keyword": "Malaysia",
		"id": "MY"
	}, {
		"keyword": "Maldives",
		"id": "MV"
	}, {
		"keyword": "Mali",
		"id": "ML"
	}, {
		"keyword": "Malta",
		"id": "MT"
	}, {
		"keyword": "Marshall Islands",
		"id": "MH"
	}, {
		"keyword": "Martinique",
		"id": "MQ"
	}, {
		"keyword": "Mauritania",
		"id": "MR"
	}, {
		"keyword": "Mauritius",
		"id": "MU"
	}, {
		"keyword": "Mayotte",
		"id": "YT"
	}, {
		"keyword": "Mexico",
		"id": "MX"
	}, {
		"keyword": "Micronesia, Federated States of",
		"id": "FM"
	}, {
		"keyword": "Moldova, Republic of",
		"id": "MD"
	}, {
		"keyword": "Monaco",
		"id": "MC"
	}, {
		"keyword": "Mongolia",
		"id": "MN"
	}, {
		"keyword": "Montenegro",
		"id": "ME"
	}, {
		"keyword": "Montserrat",
		"id": "MS"
	}, {
		"keyword": "Morocco",
		"id": "MA"
	}, {
		"keyword": "Mozambique",
		"id": "MZ"
	}, {
		"keyword": "Myanmar",
		"id": "MM"
	}, {
		"keyword": "Namibia",
		"id": "NA"
	}, {
		"keyword": "Nauru",
		"id": "NR"
	}, {
		"keyword": "Nepal",
		"id": "NP"
	}, {
		"keyword": "Netherlands",
		"id": "NL"
	}, {
		"keyword": "Netherlands Antilles",
		"id": "AN"
	}, {
		"keyword": "New Caledonia",
		"id": "NC"
	}, {
		"keyword": "New Zealand",
		"id": "NZ"
	}, {
		"keyword": "Nicaragua",
		"id": "NI"
	}, {
		"keyword": "Niger",
		"id": "NE"
	}, {
		"keyword": "Nigeria",
		"id": "NG"
	}, {
		"keyword": "Niue",
		"id": "NU"
	}, {
		"keyword": "Norfolk Island",
		"id": "NF"
	}, {
		"keyword": "Northern Mariana Islands",
		"id": "MP"
	}, {
		"keyword": "Norway",
		"id": "NO"
	}, {
		"keyword": "Oman",
		"id": "OM"
	}, {
		"keyword": "Pakistan",
		"id": "PK"
	}, {
		"keyword": "Palau",
		"id": "PW"
	}, {
		"keyword": "Palestinian Territory, Occupied",
		"id": "PS"
	}, {
		"keyword": "Panama",
		"id": "PA"
	}, {
		"keyword": "Papua New Guinea",
		"id": "PG"
	}, {
		"keyword": "Paraguay",
		"id": "PY"
	}, {
		"keyword": "Peru",
		"id": "PE"
	}, {
		"keyword": "Philippines",
		"id": "PH"
	}, {
		"keyword": "Pitcairn",
		"id": "PN"
	}, {
		"keyword": "Poland",
		"id": "PL"
	}, {
		"keyword": "Portugal",
		"id": "PT"
	}, {
		"keyword": "Puerto Rico",
		"id": "PR"
	}, {
		"keyword": "Qatar",
		"id": "QA"
	}, {
		"keyword": "Reunion",
		"id": "RE"
	}, {
		"keyword": "Romania",
		"id": "RO"
	}, {
		"keyword": "Russian Federation",
		"id": "RU"
	}, {
		"keyword": "Rwanda",
		"id": "RW"
	}, {
		"keyword": "Saint Helena",
		"id": "SH"
	}, {
		"keyword": "Saint Kitts and Nevis",
		"id": "KN"
	}, {
		"keyword": "Saint Lucia",
		"id": "LC"
	}, {
		"keyword": "Saint Pierre and Miquelon",
		"id": "PM"
	}, {
		"keyword": "Saint Vincent and the Grenadines",
		"id": "VC"
	}, {
		"keyword": "Samoa",
		"id": "WS"
	}, {
		"keyword": "San Marino",
		"id": "SM"
	}, {
		"keyword": "Sao Tome and Principe",
		"id": "ST"
	}, {
		"keyword": "Saudi Arabia",
		"id": "SA"
	}, {
		"keyword": "Senegal",
		"id": "SN"
	}, {
		"keyword": "Serbia",
		"id": "RS"
	}, {
		"keyword": "Seychelles",
		"id": "SC"
	}, {
		"keyword": "Sierra Leone",
		"id": "SL"
	}, {
		"keyword": "Singapore",
		"id": "SG"
	}, {
		"keyword": "Slovakia",
		"id": "SK"
	}, {
		"keyword": "Slovenia",
		"id": "SI"
	}, {
		"keyword": "Solomon Islands",
		"id": "SB"
	}, {
		"keyword": "Somalia",
		"id": "SO"
	}, {
		"keyword": "South Africa",
		"id": "ZA"
	}, {
		"keyword": "South Georgia and the South Sandwich Islands",
		"id": "GS"
	}, {
		"keyword": "Spain",
		"id": "ES"
	}, {
		"keyword": "Sri Lanka",
		"id": "LK"
	}, {
		"keyword": "Sudan",
		"id": "SD"
	}, {
		"keyword": "Suriname",
		"id": "SR"
	}, {
		"keyword": "Svalbard and Jan Mayen",
		"id": "SJ"
	}, {
		"keyword": "Swaziland",
		"id": "SZ"
	}, {
		"keyword": "Sweden",
		"id": "SE"
	}, {
		"keyword": "Switzerland",
		"id": "CH"
	}, {
		"keyword": "Syrian Arab Republic",
		"id": "SY"
	}, {
		"keyword": "Taiwan",
		"id": "TW"
	}, {
		"keyword": "Tajikistan",
		"id": "TJ"
	}, {
		"keyword": "Tanzania, United Republic of",
		"id": "TZ"
	}, {
		"keyword": "Thailand",
		"id": "TH"
	}, {
		"keyword": "Timor-Leste",
		"id": "TL"
	}, {
		"keyword": "Togo",
		"id": "TG"
	}, {
		"keyword": "Tokelau",
		"id": "TK"
	}, {
		"keyword": "Tonga",
		"id": "TO"
	}, {
		"keyword": "Trinidad and Tobago",
		"id": "TT"
	}, {
		"keyword": "Tunisia",
		"id": "TN"
	}, {
		"keyword": "Turkey",
		"id": "TR"
	}, {
		"keyword": "Turkmenistan",
		"id": "TM"
	}, {
		"keyword": "Turks and Caicos Islands",
		"id": "TC"
	}, {
		"keyword": "Tuvalu",
		"id": "TV"
	}, {
		"keyword": "Uganda",
		"id": "UG"
	}, {
		"keyword": "Ukraine",
		"id": "UA"
	}, {
		"keyword": "United Arab Emirates",
		"id": "AE"
	}, {
		"keyword": "United Kingdom",
		"id": "GB"
	}, {
		"keyword": "United States",
		"id": "US"
	}, {
		"keyword": "United States Minor Outlying Islands",
		"id": "UM"
	}, {
		"keyword": "Uruguay",
		"id": "UY"
	}, {
		"keyword": "Uzbekistan",
		"id": "UZ"
	}, {
		"keyword": "Vanuatu",
		"id": "VU"
	}, {
		"keyword": "Venezuela",
		"id": "VE"
	}, {
		"keyword": "Viet Nam",
		"id": "VN"
	}, {
		"keyword": "Virgin Islands, British",
		"id": "VG"
	}, {
		"keyword": "Virgin Islands, U.S.",
		"id": "VI"
	}, {
		"keyword": "Wallis and Futuna",
		"id": "WF"
	}, {
		"keyword": "Western Sahara",
		"id": "EH"
	}, {
		"keyword": "Yemen",
		"id": "YE"
	}, {
		"keyword": "Zambia",
		"id": "ZM"
	}, {
		"keyword": "Zimbabwe",
		"id": "ZW"
	}];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		"consumer": {
			"google_rss_url": "https://news.google.de/news/feeds?pz=1&cf=all&ned=en&hl=en&q=Russia&output=rss",
			"topix_rss_url": "http://www.topix.com/rss/world/russia"
		},
		"query": {
			"test_query": "russia",
			"services": ["google", "topix-world-news", "bing"],
			"search_only_services": ["google", "bing"],
			"one_service_array": ["bing"],
			"single_service": "google"
		},
		"loader": {
			"query_index": 17
		}
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ }
/******/ ]);