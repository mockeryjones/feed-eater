/**
  sometimes you just have one of those days.  you futz around with code for 5 hours and end
  up commiting nothing more than a miniscule code style tweak and a not so witty comment :(
*/

const expect = require('chai').expect;
import feedeater from '../lib/module';
import countries from '../lib/config/countries.json';
import _ from 'lodash';
import _test_data from './test_data.json';

describe('Feed Eater', () => {

  let pickRandomFromZeroTo = (max) => {
    let rnd = Math.floor(Math.random() * 100);
    return (rnd > -1 && rnd <= max) ? rnd : pickRandomFromZeroTo(max);
  };

  it('should not be undefined', () => {
    expect(feedeater).to.exist;
  });
  it('should provide version number access method', () => {
    expect(feedeater.getVersion).to.exist;
  });
  it('should provide version number', () => {
    expect(feedeater.getVersion()).to.not.be.null;
  });

  describe('Feed Eater - Consumer Service', () => {
    it('should provide consumer service', () => {
      expect(feedeater.eater).to.exist;
    });
    it('should execute consume method', () => {
      let feed = feedeater.eater.consume(_test_data.consumer.bing_rss_url);
      expect(feed).to.not.be.null;
    });
    it('should execute consume method and get data', () => {
      let feed = feedeater.eater.consume(_test_data.consumer.bing_rss_url);
      return feed.then( (data) => {
        expect(data).to.not.be.null;
      });
    });
    it('should execute consume method on alternate url and get data', () => {
      let feed = feedeater.eater.consume(_test_data.consumer.topix_rss_url);
      return feed.then( (data) => {
        expect(data).to.not.be.null;
      });
    });
  });

  describe('Feed Eater - Cache Service', () => {
    it('should provide caching service', () => {
      expect(feedeater.cache).to.exist;
    });
    it('should not have test data in cache service', () => {
      expect(feedeater.cache.dataExists('test-data')).to.be.false;
    });
    it('should cache test data in cache service', () => {
      expect(feedeater.cache.dataExists('test-data')).to.be.false;
      feedeater.cache.addToDataCache('test-data',_test_data)
      expect(feedeater.cache.dataExists('test-data')).to.be.true;
    });
    it('should get the right data from cache service', () => {
      feedeater.cache.addToDataCache('test-data',_test_data)
      expect(feedeater.cache.dataExists('test-data')).to.be.true;
      expect(feedeater.cache.getCachedData('test-data')).to.equal(_test_data);
    });
  });

  describe('Feed Eater - Query Service', () => {
    it('should provide query building service', () => {
      expect(feedeater.query).to.exist;
    });
    it('should build all queries for test keyword', () => {
      let queries = feedeater.query.getAllQueries(_test_data.query.test_query);
      let q_keys =_.keys(queries);
      expect(q_keys.length).to.be.equal(2);
    });
    it('should build only two for test keyword', () => {
      let queries = feedeater.query.getQueryForServices(_test_data.query.test_query, _test_data.query.search_only_services);
      let q_keys =_.keys(queries);
      expect(q_keys.length).to.be.equal(2);
    });
    it('should build only one for test keyword', () => {
      let queries = feedeater.query.getQueryForServices(_test_data.query.test_query, _test_data.query.one_service_array);
      let q_keys =_.keys(queries);
      expect(q_keys.length).to.be.equal(1);
    });
    it('should build only one (the other way) for test keyword', () => {
      let queries = feedeater.query.getQueryForService(_test_data.query.test_query, _test_data.query.single_service);
      let q_keys =_.keys(queries);
      expect(q_keys.length).to.be.equal(1);
    });
  });

  describe('Feed Eater - Loader Service', () => {
    it('should provide keyword loading service', () => {
      expect(feedeater.loader).to.exist;
    });
    it('should associate queries with predefined keyword list', () => {
      let queries = feedeater.loader.buildQueryList(countries);
      expect(queries.length).to.be.above(100);
    });
    it('should attempt to fetch data given a query collection', () => {
        let queries = feedeater.loader.buildQueryList(countries);
        let query_bundle = queries[pickRandomFromZeroTo(queries.length - 1)];
        let query_promises = feedeater.loader.getQueryPromises(query_bundle);
        return query_promises.then( data => {
          expect(data).to.not.be.null;
          expect(data.length).to.be.equal(2);
        });
    });
  });

});
