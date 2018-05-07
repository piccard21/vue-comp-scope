import Vue from 'vue'
import App from './App.vue'
import comp02 from './components/Comp-02.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// you have to use .default
// @see: https://forum.vuejs.org/t/solved-using-standalone-version-but-getting-failed-to-mount-component-template-or-render-function-not-defined/19569
Vue.component('comp-01', require('./components/Comp-01.vue').default);
Vue.component('comp-02', comp02);


const requireComponent = require.context(
    // The relative path of the components folder
    './components/base',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /.*.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
    console.info('fileName', fileName);

    // Get component config
    const componentConfig = requireComponent(fileName)
    console.info('componentConfig', componentConfig);

    // Get PascalCase name of component
    const componentName = upperFirst(camelCase(
        // Strip the leading `'./` and extension from the filename
        fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
    console.info('componentName', componentName);

    // Register component globally
    Vue.component(componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig)
})



new Vue({
    el: '#app',
    render: h => h(App)
})