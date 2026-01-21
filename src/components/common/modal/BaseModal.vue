<template>
  <div class="modal fade" ref="modalEl" tabindex="-1">
    <div
      class="modal-dialog modal-dialog-centered"
      :class="[size, scrollable && 'modal-dialog-scrollable']"
    >
      <div class="modal-content shadow-sm rounded-3">
        <!-- HEADER -->
        <div class="modal-header bg-light">
          <h5 class="modal-title d-flex align-items-center gap-2">
            <i v-if="icon" :class="icon"></i>
            <slot name="title" />
          </h5>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body px-4 py-3">
          <slot />
        </div>

        <!-- FOOTER -->
        <div class="modal-footer bg-light px-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  size: { type: String, default: "modal-md" }, // modal-sm | modal-md | modal-lg | modal-xl
  icon: { type: String, default: "" },
  scrollable: { type: Boolean, default: false },
});

const modalEl = ref(null);
let instance = null;

onMounted(() => {
  instance = new Modal(modalEl.value, {
  backdrop: true,   // ✅ THIS IS WHE
    keyboard: false,
   
  });
});

const show = () => instance.show();
const hide = () => instance.hide();

defineExpose({ show, hide });
</script>
