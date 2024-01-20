import components from './components';
import 'microtip/microtip.css'
import './assets/css/index.css';

export default {
    install(Vue) {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                Vue.component(component.name, component);
            }
        }
    }
};


