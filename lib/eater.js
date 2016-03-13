/** simple rss to json http requestor */
import request from 'request';
import promise  from 'promise';
import { parseString } from 'xml2js';

let consume = (url) => {
  return new Promise( (resolve, reject) => {
      request({ url: url }, function (err, res, body) {
          if (err) {
              return reject(err);
          } else if (res.statusCode !== 200) {
              err = new Error("Unexpected status code: " + res.statusCode);
              err.res = res;
              return resolve(err);
          }
          parseString(body, (err, result) => {
            resolve(result);
          });
      });
  });
};

let eater = () => {
  return {
    consume:consume
  };
};

export default eater();
