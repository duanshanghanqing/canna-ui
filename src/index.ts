import { App } from 'vue';
import { default as Layout } from './components/Layout/index.vue';

export const install = (app: App<any>) => {
    app.component(Layout.name, Layout);
}

export default {
    install,
};
