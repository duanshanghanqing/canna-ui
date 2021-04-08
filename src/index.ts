import { App } from 'vue';
import { default as Layout } from './components/Layout/index.vue';
import { default as Drawer } from './components/Drawer/index.vue';

export const install = (app: App<any>) => {
    app.component(Layout.name, Layout);
    app.component(Drawer.name, Drawer);
}

export default {
    install,
};
