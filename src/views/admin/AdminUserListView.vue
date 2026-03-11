<template>

    <BaseContainer heading="Admin Users">

        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-user-plus" @click="openCreate">
                Add Admin User
            </BaseButton>
        </template>

        <template #body>

            <table class="table table-bordered table-striped">

                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>User Code</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>User Type</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(row, i) in adminUserList" :key="row.id">

                        <td>{{ i + 1 }}</td>

                        <td>{{ row.user_code }}</td>

                        <td>{{ row.email }}</td>

                        <td>{{ row.name }}</td>

                        <td>{{ row.role }}</td>

                        <td>{{ row.user_type }}</td>

                        <td>
                            <span class="badge px-3" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                                {{ row.is_active ? "Active" : "Inactive" }}
                            </span>
                        </td>

                        <td class="text-center">

                            <div v-if="currentUserId != row.id">

                                <BaseButton iconOnly variant="primary me-2" icon="fas fa-edit" @click="openEdit(row)" />

                                <BaseButton iconOnly variant="danger" icon="fas fa-trash" @click="deleteItem(row)"
                                    :disabled="row.role === 'super_admin'" />
                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </template>

    </BaseContainer>



    <BaseModal ref="aModal" icon="fas fa-user" size="modal-lg">

        <template #title>
            {{ isEdit ? "Edit Admin User" : "Create Admin User" }}
        </template>

        <form id="adminUserForm" @submit.prevent="submitForm">

            <div class="row">

                <div class="col-md-6">
                    <BaseInput label="Name" v-model="adminUserForm.name" required />
                </div>

                <div class="col-md-6">
                    <BaseInput label="Email" v-model="adminUserForm.email" required />
                </div>

                <div class="col-md-6">
                    <BaseInput label="Password" type="password" v-model="adminUserForm.password" />
                </div>


                <div class="col-md-6">

                    <BaseAutoCompleteSelect label="User Role" v-model="adminUserForm.role" :options="roleList"
                        :label-key="'label'" :value-key="'value'" required />

                </div>


                <div class="col-md-6">


                    <BaseAutoCompleteSelect label="User Type" v-model="adminUserForm.user_type" :options="userTypeList"
                        :label-key="'label'" :value-key="'value'" required />

                </div>


                <div class="col-md-12">

                    <label class="form-label">Access Modules</label>

                    <select multiple class="form-control" v-model="adminUserForm.access_modules"
                        :disabled="isSuperAdminEdit">

                        <option v-for="m in appModuleList" :key="m.value" :value="m.value">
                            {{ m.label }}
                        </option>

                    </select>

                </div>



                <div class="col-md-6 mt-3">

                    <div class="border rounded-3 p-3 bg-light">

                        <label class="form-label fw-semibold mb-2">Status</label>

                        <div class="d-flex align-items-center justify-content-between">

                            <span class="text-muted">

                                User is

                                <b :class="adminUserForm.is_active ? 'text-success' : 'text-danger'">
                                    {{ adminUserForm.is_active ? "Active" : "Inactive" }}
                                </b>

                            </span>

                            <div class="status-toggle"
                                :class="{ active: adminUserForm.is_active, disabled: isSelfUser }"
                                @click="toggleStatus">

                                <span class="toggle-knob"></span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">


                <BaseButton variant="secondary" @click="closeModal">
                    Cancel
                </BaseButton>

                <BaseButton type="submit" form="adminUserForm" variant="primary">
                    Save
                </BaseButton>
            </div>

        </form>




    </BaseModal>

</template>



<script setup>

import { ref, onMounted, computed } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";


import {
    fetchAdminUsersList,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser
} from "@/core/repos/admin/common/adminUserRepos";

import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

import { useUserStore } from "../../core/utils/stores/userStore";


const userStore = useUserStore();

const adminUserList = ref([]);

const roleList = ref([]);
const userTypeList = ref([]);
const appModuleList = ref([]);

const aModal = ref(null);

const isEdit = ref(false);

const editingUser = ref(null);

// const currentUserId = userStore.userId;
const currentUserId = computed(() => userStore.userId || null);


const adminUserForm = ref({
    id: null,
    name: "",
    email: "",
    password: "",
    role: null,
    user_type: null,
    access_modules: [],
    is_active: true
});


const isSuperAdminEdit = computed(() => {
    return editingUser.value?.role === "super_admin";
});

const isSelfUser = computed(() => {
    return editingUser.value?.id === currentUserId.value;
});


onMounted(loadList);



async function loadList() {

    adminUserList.value = await fetchAdminUsersList();

    const enums = await fetchAllEnums();

    roleList.value = enums.admin_roles || [];
    userTypeList.value = enums.admin_user_types || [];
    appModuleList.value = enums.app_modules || [];

}



function openCreate() {

    isEdit.value = false;

    editingUser.value = null;

    adminUserForm.value = {
        name: "",
        email: "",
        password: "",
        role: null,
        user_type: null,
        access_modules: [],
        is_active: true
    };

    aModal.value.show();

}



function openEdit(row) {

    isEdit.value = true;

    editingUser.value = row;

    adminUserForm.value = {
        id: row.id,
        name: row.name,
        email: row.email,
        password: "",
        role: row.role,
        user_type: row.user_type,
        access_modules: row.access_modules || [],
        is_active: row.is_active
    };

    aModal.value.show();
}


function closeModal() {
    aModal.value.hide();
}

function toggleStatus() {
    if (isSelfUser.value) return;
    adminUserForm.value.is_active = !adminUserForm.value.is_active;

}

async function submitForm() {

    console.log("FORM DATA", adminUserForm.value);

    const payload = {
        ...adminUserForm.value,
        is_active: !!adminUserForm.value.is_active
    };

    if (!payload.password) {
        delete payload.password;
    }

    if (isEdit.value) {
        await updateAdminUser(adminUserForm.value.id, payload);
    } else {
        await createAdminUser(payload);
    }

    closeModal();

    await loadList();
}


async function deleteItem(row) {

    const ok = await showConfirmDialog(
        "Delete User",
        "Are you sure?"
    );

    if (!ok) return;

    await deleteAdminUser(row.id);

    await loadList();

}

</script>