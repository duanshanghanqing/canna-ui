<template>
  <a-drawer
    :width="width"
    :title="title"
    :placement="placement"
    :closable="closable"
    v-model:visible="visible"
    :after-visible-change="onAfterVisibleChange"
  >
    <div class="body"><slot></slot></div>
    <div class="footer" v-if="footer"><slot name="footer"></slot></div>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "canna-drawer",
  props: {
    width: {
      default: 500,
      type: Number,
      required: false,
    },
    title: {
      default: "标题",
      type: String,
      required: false,
    },
    placement: {
      default: "right",
      type: String,
      required: false,
    },
    closable: {
      default: false,
      type: Boolean,
      required: false,
    },
    onAfterVisibleChange: {
      default: () => {},
      type: Function,
      required: false,
    },
    footer: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log("visible", bool);
    };

    const open = () => {
      visible.value = true;
    };

    const close = () => {
      visible.value = false;
    };

    return {
      visible,
      afterVisibleChange,
      open,
      close,
    };
  },
});
</script>
<style lang="less" scoped>
.body {
  height: 60vh;
  // background-color: red;
  overflow-y: auto;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 4px 4px;
}
</style>
