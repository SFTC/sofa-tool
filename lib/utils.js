const prefix = require('./config').prefix;

const utils = {};

/**
 * from SofaButton => button
 * from Button => button
 */
utils.getPureComponentName = (componentName) => {
  let pureName = componentName;
  if (componentName) {
    pureName = componentName.toLowerCase();
    if (pureName.indexOf(prefix) === 0) {
      pureName = pureName.substring(prefix.length);
    }
  }
  return pureName;
}

/**
 * PascalCase
 * from SofaButton => SofaButton
 * from button => SofaButton
 */
utils.getComponentName = (componentName) => {
  const pureName = utils.getPureComponentName(componentName);
  return `${utils.setFirstLetterUpper(prefix)}${utils.setFirstLetterUpper(pureName)}`;
}

/**
 * Hyphen
 * from SofaButton => sofa-button
 * from Button => sofa-button
 */
utils.getHyphenComponentName = (componentName) => {
  const pureName = utils.getPureComponentName(componentName);
  return `${prefix}-${pureName}`;
}


utils.setFirstLetterUpper = (word) => {
  if (word) {
    return `${word.substring(0, 1).toUpperCase()}${word.substring(1).toLowerCase()}`;
  }
  return ''
}

module.exports = utils;