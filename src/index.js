import components from './components';
import styles from './css/index.css';

const VueFinder = {
    install(Vue) {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                Vue.component(component.name, component);
            }
        }
    }
};

export default VueFinder;
