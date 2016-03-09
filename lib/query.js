import feed_services from './config/feed_services.json';
import _ from 'lodash';

let getAllQueries = (keyword) => {
  let query = {};
  _.each(feed_services, (service) {
    query[service.name] = service.path.replace('{QUERY}', keyword);
  });

  return query;
};

let getQueryForService = (keyword, service_key) => {
  let query = null;
  _.each(feed_services, (service) {
    if(service.name === service_key) {
      query = service.path.replace('{QUERY}', keyword);
  });

  return query;
}

let getQueryForServices = (keyword, service_keys) => {
  let query = {};
  _.each(feed_services, (service) {
    if (_.indexOf(service_keys, service.name) > -1)  {
      query[service.name] = service.path.replace('{QUERY}', keyword);
    }
  });
  return query;
}

let query = () => {
  return {
    getAllQueries: getAllQueries,
    getQueryForService: getQueryForService,
    getQueryForServices: getQueryForServices
  };
};

export default query();
