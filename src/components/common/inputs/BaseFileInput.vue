<template>
    <div class="mb-3">
        <!-- Label -->
        <label v-if="label" :for="id" class="form-label">
            {{ label }}
            <span v-if="required" class="text-danger">*</span>
        </label>

        <!-- FILE INPUT -->
        <input ref="fileInput" :id="id" type="file" :class="inputClass" :multiple="multiple" :accept="accept"
            :disabled="disabled" :required="required" @change="onFileChange" />

        <!-- Selected Files -->
        <div v-if="fileNames.length" class="form-text">
            <div v-for="(name, i) in fileNames" :key="i">
                {{ name }}
            </div>
        </div>

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
import { ref, computed, watch } from "vue"

/* ---------------- PROPS ---------------- */
const props = defineProps({
    modelValue: {
        type: [File, Array, null],
        default: null,
    },

    label: String,
    id: String,

    multiple: {
        type: Boolean,
        default: false,
    },

    accept: {
        type: String,
        default: "",
    },

    disabled: Boolean,
    required: Boolean,

    size: {
        type: String,
        default: "md",
        validator: v => ["sm", "md", "lg"].includes(v),
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

/* ---------------- EMITS ---------------- */
const emit = defineEmits(["update:modelValue"])

/* ---------------- STATE ---------------- */
const fileInput = ref(null)
const fileNames = ref([])

/* ---------------- METHODS ---------------- */
const onFileChange = (e) => {
    const files = Array.from(e.target.files)

    if (!files.length) {
        emit("update:modelValue", props.multiple ? [] : null)
        fileNames.value = []
        return
    }

    fileNames.value = files.map(f => f.name)

    emit(
        "update:modelValue",
        props.multiple ? files : files[0]
    )
}

/* Reset input when model cleared externally */
watch(
    () => props.modelValue,
    (val) => {
        if (!val && fileInput.value) {
            fileInput.value.value = ""
            fileNames.value = []
        }
    }
)

/* ---------------- CLASSES ---------------- */
const inputClass = computed(() => [
    "form-control",
    {
        "form-control-sm": props.size === "sm",
        "form-control-lg": props.size === "lg",
        "is-invalid": !!props.error,
    },
])
</script>




<!-- Usage -->

<!-- Single File -->
<!-- <BaseFileInput
  label="Depot Picture"
  v-model="form.picture"
  accept="image/*"
  help-text="Upload depot image (jpg, png)"
/> -->

<!-- Multiple Files -->

<!-- <BaseFileInput label="Documents" v-model="form.documents" multiple accept=".pdf,.jpg,.png" /> -->
