import query from './query';
import _ from 'lodash';
import when from 'when';
import eater from './eater';

let buildQueryList = list => {
  let _list =[];
  _.each(list, data => {
      if(data.services !== undefined) {
        data.query = query.getQueryForServices(data.keyword, data.services);
      } else {
        data.query = query.getAllQueries(data.keyword);
      }
      _list.push(data);
  });
  return _list;
};

let buildQueriesForKeyword = (keyword, services) => {
  let query = {};
  query.keyword = keyword;
  if(services !== undefined) {
    query.query = query.getQueryForServices(keyword, services);
  } else {
    query.query = query.getAllQueries(keyword);
  }
  return query;
};

let getQueryPromises = query_obj => {
  let requests = [];
  let _keys = _.keys(query_obj.query);
  _.each(_keys , key => {
    requests.push(eater.consume(query_obj.query[key]));
  });
  //I thought about defining an execution handler for this method
  //but then i realised this is really just another type of promise.
  //let the caller decide what to do with the results.  this is just
  //a convenience method fow wrapping a bunch of feed requests into one bundle.
  return when.settle(requests);
};

let buildQueryPlan = list => {
  let _list = [];
  _.each(list, data => {
      let data_promise = getQueryPromises(data);
      data.promise = data_promise;
      _list.push(data);
  });
  return _list;
};

let executePlan = list => {
  _.each(list, query => {
    query.promise.then( data => {
      console.log('loaded ' + query.keyword);
      console.log(data);
    }, err => {
      console.log('error for query ' + query.keyword);
      console.log(err);
    });
  });
};

let loader = () => {
  return {
    buildQueryList: buildQueryList,
    getQueryPromises: getQueryPromises,
    buildQueryPlan: buildQueryPlan,
    executePlan: executePlan
  };
};

export default loader();
