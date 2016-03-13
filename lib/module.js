/**
 exposes the sub-modules as a set of library functions.
*/
import pkg from '../package.json';
import eater from './eater';
import cache from './cache';
import query from './query';
import loader from './loader';

let getVersion = () => {
  return pkg.version;
};

let feedeater = () => {
  return {
    getVersion: getVersion,
    eater: eater,
    cache: cache,
    query: query,
    loader: loader
  };
};

export default feedeater();
