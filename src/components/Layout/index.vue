<template>
  <a-layout class="canna-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <a-menu
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
      >
        <template v-for="itme of menuList" :key="itme.id">
          <a-sub-menu
            :key="itme.id"
            v-if="itme.children && itme.children.length > 0"
          >
            <template #title>
              <span>
                <component v-bind:is="'MailOutlined'" />
                <span>{{ itme.name }}</span>
              </span>
            </template>
            <a-menu-item
              v-for="childrenItme of itme.children"
              :key="childrenItme.id"
              >{{ childrenItme.name }}</a-menu-item
            >
          </a-sub-menu>
          <a-menu-item v-else :key="itme.id">
            <component v-bind:is="'PieChartOutlined'" />
            <span>{{ itme.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="trigger-box">
          <menu-unfold-outlined
            v-if="collapsed"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else @click="() => (collapsed = !collapsed)" />
        </div>
        <div class="header-content">
          <slot name="header"></slot>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  PropType,
  getCurrentInstance,
} from "vue";
import * as icons from "@ant-design/icons-vue";

interface IMenuListItemProp {
  id: never;
  children: any[];
  name: string;
  path: string;
}

export default defineComponent({
  name: "canna-layout",
  props: {
    menuList: {
      type: Array as PropType<IMenuListItemProp[]>,
      // required: true,
      default: [],
    },
  },
  // watch: {
  //   $route(to, from) {
  //     sessionStorage.setItem('to.path', to.path);
  //     console.log(to.path);
  //   }
  // },
  setup(props, context) {
    // 获取路由信息
    const instance: any = getCurrentInstance();
    const proxy: any = instance.proxy;
    // console.log(proxy.$root.$route);
    const location: string = proxy.$root.$router.options.history.location;
    // console.log(location);

    const state = reactive({
      menuList: props.menuList,
      collapsed: false,
      selectedKeys: [],
      openKeys: [],
      preOpenKeys: [],
    });

    // 设置菜单
    watch(
      () => props.menuList,
      (newValue, oldValue): void => {
        state.menuList = newValue;
        if (newValue.length > 0) {
          // 高亮当前访问的路径的菜单
          function selectMenu(
            arr: IMenuListItemProp[],
            parentItem?: IMenuListItemProp
          ): void {
            for (const item of arr) {
              if (item.path === location) {
                // 设置高亮的节点
                state.selectedKeys = [item.id];
                if (parentItem) {
                  // 设置打开的节点
                  state.openKeys = [parentItem.id];
                  state.preOpenKeys = [parentItem.id];
                }
              } else {
                selectMenu(item.children, item);
              }
            }
          }
          selectMenu(newValue);
          // state.selectedKeys = [newValue[0].id]; // 默认选中，后面改成当前路径
        }
      }
    );

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    // window.addEventListener("pushState", function (e) {
    //   console.log("change pushState");
    // });
    // window.addEventListener("replaceState", function (e) {
    //   console.log("change replaceState");
    // });

    return {
      ...toRefs(state),
    };
  },
  components: {
    ...icons,
  },
});
</script>
<style>
html,
body {
  overflow: hidden;
}
.canna-layout .ant-layout-sider-children {
  overflow: auto;
}
</style>
<style lang="less" scoped>
.canna-layout {
  height: 100vh;

  .layout-header {
    background: #fff;
    padding: 0;
    display: flex;
    .trigger-box {
      width: 50px;
      height: 100%;
      // background-color: aqua;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .layout-content {
    margin: 16px 16px 0;
    padding: 10px;
    background: #fff;
    min-height: 280px;
    overflow: auto;
    border-radius: 10px 10px 0 0;
    .header-content {
      flex: 1;
      height: 100%;
      // background-color: red;
      overflow: hidden;
    }
  }
}
</style>