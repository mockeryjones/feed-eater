/** query constructor used to generate urls appropriate for various rss providing services **/
/** feed services are defined in /lib/config/feed_services.json, however the plan is to allow
    service resources to be configurable via module functions **/

import feed_services from './config/feed_services.json';
import _ from 'lodash';

let getAllQueries = (keyword) => {
  let query = {};
  _.each(feed_services, (service) => {
    query[service.name] = service.path.replace('{QUERY}', keyword);
  });

  return query;
};

let getQueryForService = (keyword, service_key) => {
  let path = null;
  _.each(feed_services, (service) => {
    if(service.name === service_key) {
      path = service.path.replace('{QUERY}', keyword);
    }
  });
  let query = {};
  query[service_key] = path;
  return query;
}

let getQueryForServices = (keyword, service_keys) => {
  let query = {};
  _.each(feed_services, (service) => {
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
