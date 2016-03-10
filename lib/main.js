import pkg from '../package.json';
import consumer from './consumer';
import cache from './cache';
import query from './query';

let getVersion = () => {
  return pkg.version;
};

let feedeater = () => {
  return {
    getVersion: getVersion,
    consumer: consumer,
    cache: cache,
    query: query
  };
};

export default feedeater();
