const Metalsmith = require('metalsmith');
const path = require('path');
const consolidate = require('consolidate');
const async = require('async');
const fs = require('fs');

const config = require('./config');
const utils = require('./utils');

const copyTemplate = (componentName, author) => {
  const params = {
    PureName: utils.getPureComponentName(componentName),
    ComponentName: utils.getComponentName(componentName),
    HyphenComponentName: utils.getHyphenComponentName(componentName),
    author
  }
  return Promise.all([
    copyPackage(params),
    copyTest(params),
  ])
}

const copyTest = (params) => {
  const pureName = params.PureName;
  const originPath = path.resolve(__dirname, 'template', 'component.spec.js');
  const destPath = path.resolve(process.cwd(), 'test/unit/specs', `${pureName}.spec.js`);

  return new Promise((resolve, reject) => {
    fs.readFile(originPath, 'utf8', (err, data) => {
      if (err) reject(err);
      consolidate.handlebars.render(data, params, function(err, res){
        if (err) reject(err);
        fs.writeFile(destPath, res, 'utf8', (err) => {
          if (err) reject(err);
          resolve(true);
        })
      });
    });
  })
}

const copyPackage = (params) => {
  const pureName = params.PureName;
  const templatePath = path.resolve(__dirname, 'template/package');
  const destPath = path.resolve(process.cwd(), 'packages', pureName);

  const metalsmith = Metalsmith(templatePath);
  const metadata = metalsmith.metadata();
  
  metadata.PureName = params.PureName;
  metadata.ComponentName =params.ComponentName;
  metadata.HyphenComponentName = params.HyphenComponentName;
  metadata.author = params.author;

  const p = function(resolve, reject) {
    metalsmith.clean(false)
    .use(filter)
    .use(updateContent)
    .source('.')
    .destination(destPath) 
    .build((err, files) => {
      if (err) {
        reject(err);
      } else {
        console.log('Finish copy');
        resolve(true);
      }
    })
  }
  return new Promise(p);
}

const filter = (files, metalsmith, callback) => {
  var filter = ['.DS_Store'];
  delete files[filter[0]];
  callback();
};

const updateContent = (files, metalsmith, callback) => {
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  async.each(keys, run, callback);

  function run(file, callback){
    var str = files[file].contents.toString();
    consolidate.handlebars.render(str, metadata, function(err, res){
      if (err) {
        console.log('wrong', file, err);
        return callback(err);
      }
      console.log('success', file);
      files[file].contents = new Buffer(res);
      callback();
    });
  }
};

module.exports = copyTemplate;
