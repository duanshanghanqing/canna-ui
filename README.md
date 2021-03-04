# canna-ui

    A component library based on vue3 and ant-design-vue encapsulation

## install

    npm i --save ant-design-vue@next canna-ui

## use
    
    import { createApp } from 'vue';
    import App from './App.vue';
    import Antd from 'ant-design-vue';
    import 'ant-design-vue/dist/antd.css';
    import Canna from 'canna-ui';

    const app = createApp(App);
    app.use(Antd);
    app.use(Canna);
    app.mount('#root');

### App.vue

    <template>
        <canna-layout :menuList="menuList">
        <template v-slot:header>
            <div>We want to put the page header here</div>
        </template>
        </canna-layout>
    </template>