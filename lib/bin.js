import feedeater from './module';
import countries from './config/countries.json';
import _ from 'lodash';


let requiredQueries = feedeater.loader.buildQueryList(countries);
let plan = feedeater.loader.buildQueryPlan(requiredQueries);
let promised = feedeater.loader.executePlan(plan);
_.each(promised, promise => {
  console.log(promise.keyword);
  promise.data.then(resp => {
    console.log('LOADED');
  }, err => {
    console.log('RESPONSE ERROR ' + promise.query);
  });
});
