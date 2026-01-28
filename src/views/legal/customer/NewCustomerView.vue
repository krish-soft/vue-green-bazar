<template>

    <div class="row">

        <div class="col-md-5">
            <!--  Add New Customer -->
            <BaseContainer heading="1. Add New Customer">
                <template #body>

                    <form id="userForm" @submit.prevent="submitCustomerForm">

                        <div class="row">

                            <div class="col-md-4">
                                <BaseInput v-model="customerForm.name" label="Customer Name"
                                    placeholder="Enter Customer Name" required />
                            </div>
                            <div class="col-md-4">
                                <BaseAutoCompleteSelect label="Select Role" v-model="customerForm.role"
                                    :options="roleList" label-key="label" value-key="value" placeholder="Select Role"
                                    required />
                            </div>
                            <div class="col-md-4">
                                <BaseInput v-model="customerForm.phone_number" label="Phone Number"
                                    placeholder="Enter Phone Number" required />
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-4">
                                <BaseButton type="submit" form="userForm" variant="secondary">Submit</BaseButton>
                            </div>
                        </div>

                    </form>

                </template>
            </BaseContainer>
        </div>

        <div class="col-md-7">

            <BaseContainer heading="2. Add Address Details">

                <template #body>

                    <form id="addressForm" @submit.prevent="submitAddressFormWithUser">

                        <div class="row">
                            <div class="col-md-6">
                                <CustomerSearchComponent v-model="selectedCustomer" />
                            </div>
                        </div>
                        <AddressComponent v-model="addressForm" form-id="addressForm" />

                        <!-- ✅ BUTTON GOES HERE -->
                        <div class="text-end mt-3">
                            <BaseButton variant="primary" type="submit" form="addressForm" :loading="uiStore.isLoading">
                                Save Address
                            </BaseButton>
                        </div>

                    </form>
                </template>

            </BaseContainer>

        </div>
    </div>

    <!-- Add KYC Details -->

    <BaseContainer heading="3. Add KYC Details" class="mt-4">
        <template #body>


            <form id="kycForm" @submit.prevent="submitKYCForm">

                <div class="row">
                    <div class="col-md-4">
                        <CustomerSearchComponent v-model="selectedCustomer" required />
                    </div>
                </div>

                <!-- KYC FORM FIELDS GO HERE -->
                <div class="row mt-3">
                    <div class="col-md-3">
                        <BaseInput v-model="kycForm.legal_name" label="Legal Name" placeholder="Enter Legal Name"
                            required />
                    </div>
                    <div class="col-md-3">
                        <BaseInput v-model="kycForm.aadhaar_number" label="Aadhaar Number"
                            placeholder="Enter Aadhaar Number" required />
                    </div>
                    <div class="col-md-3">
                        <BaseInput v-model="kycForm.pan_card_number" label="PAN Card Number"
                            placeholder="Enter PAN Card Number" />
                    </div>
                    <div class="col-md-3">
                        <BaseInput v-model="kycForm.dob" label="Date of Birth" type="date" placeholder="Select DOB"
                            required />
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-3">
                        <BaseFileInput label="Select Aadhaar Front Image" v-model="kycFileForm.aadhaar_front_image"
                            accept=".jpg,.jpeg,.png" help-text="Allowed formats: JPG, JPEG, PNG" required />
                    </div>

                    <div class="col-md-3">
                        <BaseFileInput label="Select Aadhaar Back Image" v-model="kycFileForm.aadhaar_back_image"
                            accept=".jpg,.jpeg,.png" help-text="Allowed formats: JPG, JPEG, PNG" required />

                    </div>
                    <div class="col-md-3">
                        <BaseFileInput label="Select PAN Card Image" v-model="kycFileForm.pan_card_image"
                            accept=".jpg,.jpeg,.png" help-text="Allowed formats: JPG, JPEG, PNG" />
                    </div>

                    <div class="col-md-3">
                        <BaseFileInput label="Select Selfie Image" v-model="kycFileForm.selfie_image"
                            accept=".jpg,.jpeg,.png" help-text="Allowed formats: JPG, JPEG, PNG" />

                    </div>

                </div>

                <div class="row mt-3">

                    <!-- ✅ BUTTON GOES HERE -->
                    <div class="text-end mt-3">
                        <BaseButton variant="primary" type="submit" form="kycForm" :loading="uiStore.isLoading">
                            Save KYC Details
                        </BaseButton>
                    </div>
                </div>

            </form>

        </template>

    </BaseContainer>

</template>

<script setup>
import { ref, onMounted } from "vue";


import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import BaseFileInput from "@/components/common/inputs/BaseFileInput.vue";


import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";
import { createCustomer, addCustomerAddress } from "@/core/repos/admin/customer/customerRepos";
import { addKycWithDataFiles } from "@/core/repos/admin/legal/legalRepos";
import AddressComponent from "@/components/common/forms/AddressComponent.vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import CustomerSearchComponent from "@/components/common/forms/CustomerSearchComponent.vue";


const roleList = ref([]);
const uiStore = useUIStore();

const addressForm = ref(null);
const selectedCustomer = ref(null);

function onCustomerSelect(customer) {
    selectedCustomer.value = customer;
}


const customerForm = ref({
    name: "",
    phone_number: "",
    role: "",
});

const customerResetForm = ref({
    name: "",
    phone_number: "",
    role: "",
});


const kycForm = ref({
    legal_name: "",
    aadhaar_number: "",
    pan_card_number: "",
    dob: "",
});


const kycFileForm = ref({
    aadhaar_front_image: "",
    aadhaar_back_image: "",
    pan_card_image: "",
    selfie_image: "",

});


onMounted(loadEnums);

async function loadEnums() {
    const enumsData = await fetchAllEnums(["UserRoleEnum"]);

    if (!enumsData) {
        return;
    }

    roleList.value = enumsData.user_roles;
}

async function submitCustomerForm() {
    // Implement form submission logic here
    const data = await createCustomer(customerForm.value);

    if (data) {
        // Reset the form after successful submission
        customerForm.value = { ...customerResetForm.value };
    }
}


async function submitAddressFormWithUser() {

    addressForm.value.user_id = selectedCustomer.value.id;

    const data = await addCustomerAddress(addressForm.value);

    if (data) {
        // Reset the form after successful submission
        addressForm.value = null;
        selectedCustomer.value = null;
    }
}


async function submitKYCForm() {
    // Implement KYC form submission logic here
    // Use selectedCustomer.value to get the selected customer

    const formData = {
        ...kycForm.value,
        user_id: selectedCustomer.value.id,
    };

    const fileData = {
        aadhaar_front_image: kycFileForm.value.aadhaar_front_image,
        aadhaar_back_image: kycFileForm.value.aadhaar_back_image,
        pan_card_image: kycFileForm.value.pan_card_image,
        selfie_image: kycFileForm.value.selfie_image,
    };

    const data = await addKycWithDataFiles(formData, fileData);
    if (data) {
        // Reset the form after successful submission
        kycForm.value = {
            legal_name: "",
            aadhaar_number: "",
            pan_card_number: "",
            dob: "",
        };

        kycFileForm.value = {
            aadhaar_front_image: "",
            aadhaar_back_image: "",
            pan_card_image: "",
            selfie_image: "",
        };

        selectedCustomer.value = null;
    }
}

</script>