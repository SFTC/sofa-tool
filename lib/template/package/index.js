import {{ComponentName}} from './src/main';

/* istanbul ignore next */
{{ComponentName}}.install = (Vue) => {
  Vue.component({{ComponentName}}.name, {{ComponentName}});
};

export default {{ComponentName}};
