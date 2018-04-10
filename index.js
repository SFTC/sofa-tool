#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const createJsonStore = require('./lib/createJsonstore');
const checkJsonStore = require('./lib/checkJsonstore');
const copyTemplate = require('./lib/copyTemplate');
const user = require('./lib/getUserInfo');

commander
  .version('0.0.1')
  .option('-c, --create [value]', 'Create new Sofa-Component')
  .option('-d, --delete [value]', 'Delete a Sofa-Component declare')
  .parse(process.argv)

if (commander.create) {
  const componentName = commander.create;
  user.getUserInfo().then((author) => {
    checkJsonStore(componentName).then((res) => {
      if (res) { // create
        copyTemplate(componentName, author).then(() => {
          createJsonStore(componentName, author);
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
}
