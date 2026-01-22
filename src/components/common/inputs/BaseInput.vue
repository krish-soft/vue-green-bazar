<template>
  <div class="mb-3">
    <!-- Label -->
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- TEXTAREA -->
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      v-bind="$attrs"
      @input="emitValue"
      @blur="onBlur"
    ></textarea>

    <!-- INPUT -->
    <input
      v-else
      :id="id"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :step="computedStep"
      :min="min"
      :max="max"
      v-bind="$attrs"
      @input="onInput"
      @blur="onBlur"
    />

    <!-- Help -->
    <div v-if="helpText && !error" class="form-text">
      {{ helpText }}
    </div>

    <!-- Error -->
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },

  type: {
    type: String,
    default: "text",
  },

  label: String,
  placeholder: String,
  id: String,

  /* textarea */
  rows: {
    type: [String, Number],
    default: 3,
  },

  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,

  size: {
    type: String,
    default: "md",
    validator: v => ["sm", "md", "lg"].includes(v),
  },

  integer: {
    type: Boolean,
    default: false,
  },
  step: {
    type: [String, Number],
    default: null,
  },
  min: {
    type: [String, Number],
    default: null,
  },
  max: {
    type: [String, Number],
    default: null,
  },

  error: {
    type: String,
    default: "",
  },
  helpText: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["update:modelValue", "blur"])

const emitValue = (e) => {
  emit("update:modelValue", e.target.value)
}

const onInput = (e) => {
  let value = e.target.value

  if (props.type === "number") {
    if (value === "") {
      emit("update:modelValue", "")
      return
    }

    if (props.integer) {
      const intVal = parseInt(value, 10)
      emit("update:modelValue", isNaN(intVal) ? "" : intVal)
      return
    }

    const numVal = Number(value)
    emit("update:modelValue", isNaN(numVal) ? "" : numVal)
    return
  }

  emit("update:modelValue", value)
}

const onBlur = () => {
  emit("blur")
}

const computedStep = computed(() => {
  if (props.type !== "number") return null
  if (props.step !== null) return props.step
  return props.integer ? 1 : "any"
})

const inputClass = computed(() => [
  "form-control",
  {
    "form-control-sm": props.size === "sm",
    "form-control-lg": props.size === "lg",
    "is-invalid": !!props.error,
  },
])
</script>
