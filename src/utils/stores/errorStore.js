import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useErrorStore = defineStore('errorStore', () => {
  const errorMessages = ref([]); // ✅ Make sure this is reactive

  // ✅ Computed property to return the actual errors
  const getErrors = computed(() => errorMessages.value);

  // ✅ Function to update errors
  const setErrorMessages = (messages) => {
    errorMessages.value = messages;
    // console.log("Updated Errors:", errorMessages.value); // Debugging
  };

  return { errorMessages, getErrors, setErrorMessages };
});
