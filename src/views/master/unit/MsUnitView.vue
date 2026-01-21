<template>

    <BaseContainer heading="Unit Management">

        <template #headerActions>     
            <BaseButton variant="primary" icon="fas fa-plus"> Add Unit </BaseButton>
        </template>

        <template #body>
         
          

                 <table id="datatable" class="table table-striped table-bordered">
                    <thead class="table-light">
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in mListData" :key="data.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ data.name }}</td>
                        <td>{{ data.unit }}</td>
                        <td>
                            <span
                            class="badge"
                            :class="data.is_active ? 'bg-success' : 'bg-danger'"
                            >
                            {{ data.is_active ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
                        <td>
                            <BaseButton variant="primary me-1" iconOnly icon="fas fa-edit" @click="editUnit(data.id)" :loading="uiStore.isLoading" />       
                            <BaseButton variant="danger" iconOnly icon="fas fa-trash-alt" @click="deleteUnit(data.id)" :loading="uiStore.isLoading" />
                        </td>
                        </tr>
                    </tbody>
                </table>             
            
        </template>

    </BaseContainer>



</template>
<script setup>
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import apiRouteService from "@/services/apiRoutes/apiRouteService";
import { useUIStore } from "@/utils/stores/uiStore";

// import {
//   initBootstrapDatatable,
//   destroyBootstrapDatatable,
// } from "@/utils/bootstrapDatatable";

const mListData = ref([]);
const uiStore = useUIStore();

onMounted(async () => {
  uiStore.isLoading = true;

  try {
    // ✅ MUST await
    const resp = await apiRouteService.getMstUnitList();

    if (resp && resp.isSuccess) {
      mListData.value = resp.data;

    //   // ✅ wait until v-for finishes rendering
    //   await nextTick();

    //   // ✅ pass ID WITHOUT #
    //   initBootstrapDatatable("datatable");
    }else {
        uiStore.errorMessages= resp.message ;
    }
  } finally {
    uiStore.isLoading = false;
  }
});

// onBeforeUnmount(() => {
//   // ✅ correct ID
//   destroyBootstrapDatatable("datatable");
// });

const editUnit = (id) => {
    console.log("Edit unit with ID:", id);
    // Implement your edit logic here
};

const deleteUnit = (id) => {
    console.log("Delete unit with ID:", id);
    // Implement your delete logic here
};
</script>
