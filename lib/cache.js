/** simple object cache **/
import hash from 'object-hash';
import moment from 'moment-timezone';

let dataStore = {};

let getQueryHash = (query) => {
  return hash(query);
};

let dataExists = (query) => {
  let query_hash = getQueryHash(query);
  if (dataStore[query_hash] !== undefined) {
    return true;
  } else {
    return false;
  }
};

let getCachedData = (query) => {
  let query_hash = getQueryHash(query);
  return dataStore[query_hash].data;
};

let addToDataCache = (query, data) => {
  let query_hash = getQueryHash(query);
  let entry = {
    data: data,
    time: moment().format()
  }
  dataStore[query_hash] = entry;
};

let removeFromCache = (query) => {
  let query_hash = getQueryHash(query);
  dataStore[query_hash] = undefined;
};

let cache = () => {
    return {
      dataExists: dataExists,
      getCachedData: getCachedData,
      addToDataCache: addToDataCache,
      removeFromCache: removeFromCache
    };
};

export default cache();
