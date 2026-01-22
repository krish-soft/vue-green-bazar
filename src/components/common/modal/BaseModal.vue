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
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

/* props */
const props = defineProps({
  size: { type: String, default: "modal-md" },
  icon: { type: String, default: "" },
  scrollable: { type: Boolean, default: false },
});

/* refs */
const modalEl = ref(null);
let instance = null;

/* lifecycle */
onMounted(() => {
  instance = new Modal(modalEl.value, {
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
