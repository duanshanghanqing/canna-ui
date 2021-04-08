import { default as Layout } from './components/Layout/index.vue';
import { default as Drawer } from './components/Drawer/index.vue';
export const install = (app) => {
    app.component(Layout.name, Layout);
    app.component(Drawer.name, Drawer);
};
export default {
    install,
};
//# sourceMappingURL=index.js.map