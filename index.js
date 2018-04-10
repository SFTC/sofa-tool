#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const createJsonStore = require('./lib/createJsonstore');
const checkJsonStore = require('./lib/checkJsonstore');
const deleteJsonStore = require('./lib/deleteJsonStore');
const copyTemplate = require('./lib/copyTemplate');
const user = require('./lib/getUserInfo');

commander
  .version('0.0.1')
  .option('-c, --create [value]', 'create new Sofa-Component')
  .option('-d, --delete [value]', 'delete a Sofa-Component declare')
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
      } else {
        console.log(chalk.yellow(`${componentName} is already exist, please change a other name , or run *sofa -d ${componentName}* to delete the declare`));
      }
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
}

if (commander.delete) {
  const componentName = commander.delete;
  checkJsonStore(componentName).then((res) => {
    if (!res) {
      deleteJsonStore(componentName)
    } else {
      console.log(chalk.yellow(`can not find ${componentName}, please check your spell`));
    }
  })
}
