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
import { ref, onMounted } from "vue";
import { Offcanvas } from "bootstrap";

/* props */
const props = defineProps({
  icon: { type: String, default: "" },
});

/* refs */
const offcanvasEl = ref(null);
let instance = null;

/* lifecycle */
onMounted(() => {
  instance = new Offcanvas(offcanvasEl.value, {
    backdrop: true,
    keyboard: false,
  });
});

/* methods */
const show = () => instance?.show();
const hide = () => instance?.hide();

/* expose to parent */
defineExpose({ show, hide });
</script>
