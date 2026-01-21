<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="offcanvasEl"
  >
    <!-- HEADER -->
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title d-flex align-items-center gap-2">
        <i v-if="icon" :class="icon"></i>
        <slot name="title" />
      </h5>
      <button type="button" class="btn-close" @click="hide"></button>
    </div>

    <!-- BODY -->
    <div class="offcanvas-body">
      <slot />
    </div>

    <!-- FOOTER -->
    <div class="border-top p-3 d-flex justify-content-end gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from "vue";
import { Offcanvas } from "bootstrap";

const props = defineProps({
  icon: { type: String, default: "" },
});

const offcanvasEl = ref(null);
let instance = null;

onMounted(() => {
  instance = new Offcanvas(offcanvasEl.value, {
    backdrop: true,
    keyboard: false,
  });
});

const show = () => instance.show();
const hide = () => instance.hide();

defineExpose({ show, hide });
</script>
