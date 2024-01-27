import components from './components.js';
import 'microtip/microtip.css'
import './assets/css/index.css';

export default {
    /** @param {import('vue').App} app */
    install(app) {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                app.component(component.name, component);
            }
        }
    }
};


