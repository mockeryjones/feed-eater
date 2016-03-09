import pkg from '../package.json';
import consumer from './consumer';
import cache from './cache';

let getVersion = () => {
  return pkg.version;
};

let feedeater = () => {
  return {
    getVersion: getVersion,
    consumer: consumer,
    cache: cache
  };
};

export default feedeater();
