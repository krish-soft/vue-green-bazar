<template>

    <BaseContainer heading="Unit Management">

        <template #headerActions>     
            <BaseButton variant="primary" icon="fas fa-plus"> Add Unit </BaseButton>
        </template>

        <template #body>
         
              <div class="table-responsive mt-4">
                
              </div>
            
        </template>

    </BaseContainer>



</template>

<script setup>
import BaseContainer from '@/components/common/cards/BaseContainer.vue';
import BaseButton from '@/components/common/buttons/BaseButton.vue';
import { onMounted, ref } from 'vue';
import apiRouteService from '@/services/apiRoutes/apiRouteService';
import { useUIStore } from "@/utils/stores/uiStore";
// Additional script logic for MsUnitView.vue can be added here

var mListData = ref([]);
const uiStore = useUIStore();

onMounted(() => {

    uiStore.isLoading = true;   

 var resp = apiRouteService.getMstUnitList();

 if(resp && resp.isSuccess){
    mListData.value = resp.data;
}

     uiStore.isLoading = false;

});



</script>