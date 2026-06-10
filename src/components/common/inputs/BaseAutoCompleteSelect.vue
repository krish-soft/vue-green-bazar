<template>
  <div class="autocomplete-root" :class="rootClasses">
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <input
      ref="inputRef"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder"
      :value="searchText"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      @input="onInput"
      @focus="openDropdown"
      @blur="handleBlur"
    />

    <ul
      v-if="open && filteredOptions.length"
      class="list-group w-100 shadow"
      :class="dropdownClasses"
      :style="dropdownStyle"
    >
      <li
        v-for="item in filteredOptions"
        :key="item[valueKey]"
        class="list-group-item list-group-item-action"
        @mousedown.prevent="selectItem(item)"
      >
        {{ resolveLabel(item) }}
      </li>
    </ul>

    <div
      v-if="open && !filteredOptions.length"
      class="border bg-white p-2 text-muted w-100"
      :class="emptyStateClasses"
      :style="emptyStateStyle"
    >
      No results found
    </div>

    <div v-if="helpText && !error" class="form-text">{{ helpText }}</div>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: [String, Number, null],
  options: { type: Array, default: () => [] },

  /* 🔥 labelKey can be string | array | function */
  labelKey: {
    type: [String, Array, Function],
    required: true,
  },

  valueKey: { type: String, required: true },

  label: String,
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  error: String,
  helpText: String,
  staticDropdown: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const searchText = ref("");
const inputRef = ref(null);

const rootClasses = computed(() => ({
  "mb-3": !props.compact,
  "position-relative": !props.staticDropdown,
}));

const dropdownClasses = computed(() => ({
  "position-absolute": !props.staticDropdown,
  "mt-1": props.staticDropdown,
  "autocomplete-overlay": !props.staticDropdown,
}));

const dropdownStyle = computed(() => ({
  maxHeight: "220px",
  overflowY: "auto",
  zIndex: props.staticDropdown ? undefined : 1050,
}));

const emptyStateClasses = computed(() => ({
  "position-absolute": !props.staticDropdown,
  "mt-1": props.staticDropdown,
  "autocomplete-overlay": !props.staticDropdown,
}));

const emptyStateStyle = computed(() => ({
  zIndex: props.staticDropdown ? undefined : 1050,
}));

/* 🔑 Resolve label */
const resolveLabel = (item) => {
  if (typeof props.labelKey === "function") {
    return props.labelKey(item);
  }

  if (Array.isArray(props.labelKey)) {
    return props.labelKey
      .map(k => k.split(".").reduce((o, i) => o?.[i], item))
      .filter(Boolean)
      .join(" | ");
  }

  return props.labelKey
    .split(".")
    .reduce((o, i) => o?.[i], item) ?? "";
};

/* Sync existing value */
watch(
  [() => props.modelValue, () => props.options],
  ([val, opts]) => {
    const match = opts.find(o => o?.[props.valueKey] === val);
    searchText.value = match ? resolveLabel(match) : "";
  },
  { immediate: true }
);

/* Filter */
const filteredOptions = computed(() => {
  if (!searchText.value) return props.options;

  return props.options.filter(item =>
    resolveLabel(item)
      .toLowerCase()
      .includes(searchText.value.toLowerCase())
  );
});

/* Events */
const openDropdown = () => {
  if (!props.disabled && !props.readonly) open.value = true;
};

const onInput = (e) => {
  searchText.value = e.target.value;
  open.value = true;
  emit("update:modelValue", null);
};

const selectItem = (item) => {
  searchText.value = resolveLabel(item);
  emit("update:modelValue", item[props.valueKey]);
  open.value = false;
};

const handleBlur = () => {
  setTimeout(() => {
    open.value = false;
    const match = props.options.find(
      o => resolveLabel(o) === searchText.value
    );
    if (!match) {
      searchText.value = "";
      emit("update:modelValue", null);
    }
  }, 150);
};
</script>

<style scoped>
.autocomplete-root {
  width: 100%;
}

.autocomplete-overlay {
  top: 100%;
  left: 0;
}
</style>


<!-- Usage 


// Single key

<BaseAutoCompleteSelect
  v-model="form.zone_id"
  :options="zoneData"
  label="Zone"
  label-key="name"
  value-key="id"
/>

// Multiple keys

<BaseAutoCompleteSelect
  v-model="form.zone_id"
  :options="zoneData"
  label="Zone"
  :label-key="['code','name']"
  value-key="id"
/>

// Nested keys
<BaseAutoCompleteSelect
  v-model="form.zone_id"
  :options="zoneData"
  label="Zone"
  :label-key="['state.name','state.iso_code','name']"
  value-key="id"
/>

// 🔹 Full custom formatter (BEST)

<BaseAutoCompleteSelect
  v-model="form.zone_id"
  :options="zoneData"
  label="Zone"
  :label-key="z => `${z.state.name} (${z.state.iso_code}) - ${z.name}`"
  value-key="id"
/>


-->