'use strict';
const expect = require('chai').expect;
import feedeater from '../lib/main';
import _test_data from './test_data.json';

describe('Feed Eater', () => {
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
      expect(feedeater.consumer).to.exist;
    });
    it('should execute consume method', () => {
      let feed = feedeater.consumer.consume(_test_data.consumer.google_rss_url);
      expect(feed).to.not.be.null;
    });
    it('should execute consume method and get data', () => {
      let feed = feedeater.consumer.consume(_test_data.consumer.google_rss_url);
      return feed.then( (data) => {
        expect(data).to.not.be.null;
      });
    });
    it('should execute consume method on alternate url and get data', () => {
      let feed = feedeater.consumer.consume(_test_data.consumer.topix_rss_url);
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

});
