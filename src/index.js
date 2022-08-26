import components from './components';
import './assets/css/index.css';
import 'microtip/microtip.css'

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


