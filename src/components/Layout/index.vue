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
          <a-sub-menu :key="itme.id" v-if="itme.children && itme.children.length > 0">
            <template #title>
              <span>
                <component v-bind:is="'MailOutlined'" />
                <span>{{ itme.name }}</span>
              </span>
            </template>
            <a-menu-item v-for="childrenItme of itme.children" :key="childrenItme.id">{{ childrenItme.name }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="itme.id">
            <component v-bind:is="'PieChartOutlined'" />
            <span>{{ itme.name }}</span>
          </a-menu-item>
        </template>

        <!-- <a-menu-item key="1">
          <PieChartOutlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <DesktopOutlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <InboxOutlined />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <MailOutlined />
              <span>Navigation One</span>
            </span>
          </template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <AppstoreOutlined />
              <span>Navigation Two</span>
            </span>
          </template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>-->
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
import { defineComponent, reactive, toRefs, watch } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "canna-layout",
  props: {
    menuList: {
      type: Array,
      // required: true,
      default: [],
    },
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
    };
  },
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
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