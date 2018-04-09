#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const request = require('superagent');
const gi = require('git-info');

const jsonstoreKey = '94f0f3c9e704c6c7626e117daa563cfb633a0944c0e285366487cddabbab4ab0';
commander
  .version('0.0.1')
  .option('-c, --create [value]', 'Create new Sofa-Component')
  .option('-d, --delete [value]', 'Delete a Sofa-Component declare')
  .parse(process.argv)

gi('author', function(err, result) {
  console.log(result);
});

if (commander.create) {
  const componentName = commander.create;
  request
    .get(`https://www.jsonstore.io/${jsonstoreKey}/${componentName}`)
    .end((err, res) => {
      if (res.body && res.body.result) {
        console.log(`${componentName} is already exist, please change a other name , or run *sofa -d ${componentName}* to delete the declare`)
      } else if (res.body ** res.body.ok) {
        // request
        //   .post(`https://www.jsonstore.io/${jsonstoreKey}/${componentName}`)
        //   .send({
        //     name: componentName,
        //     create:
        //   })

      }
    })
}

// curl -XPOST -H "Content-type: application/json" -d '{"name": "lichun"}' 'https://www.jsonstore.io/94f0f3c9e704c6c7626e117daa563cfb633a0944c0e285366487cddabbab4ab0/lichun'

// curl -XGET 'https://www.jsonstore.io/94f0f3c9e704c6c7626e117daa563cfb633a0944c0e285366487cddabbab4ab0/lichun'