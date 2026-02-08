<template>
  <BaseContainer heading="Depot Management">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
        Add Depot
      </BaseButton>
    </template>

    <template #body>
      <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Zone Details</th>
            <th>Depot Details</th>

            <th>Capacity</th>
            <th>Cut Off Times</th>
            <th>Contact Person</th>
            <th>Address</th>

            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="mListData.length">
          <tr v-for="(row, i) in mListData" :key="row.id">
            <td>{{ i + 1 }}</td>
            <td>
              <!-- {{ row.zone_id }} -->
              <b> Zone:</b> <br />{{ row?.zone?.code }} ({{ row?.zone?.name }})
              <br /><b>State:</b> <br />{{ row?.zone?.state?.name }} ({{
                row?.zone?.state?.iso_code
              }})
            </td>
            <td>
              <b> Name:</b> <br />{{ row.name }}<br />
              <b> Code:</b><br /> {{ row.code }}
            </td>
            <td>
              <b> Max. : </b><br />{{ row.max_capacity_kg }} kg <br />
              <b>Current :</b><br /> {{ row.current_load_kg }} kg
            </td>
            <td>
              <b>Buyer:</b> <br />{{ row.buyer_cutoff_time }} <br />
              <b>Seller:</b><br /> {{ row.seller_cutoff_time }}
            </td>
            <td>
              <b>Contact Name:</b> <br />{{ row.contact_name }} <br />
              <b>Contact Phone:</b> <br />{{ row.contact_phone }}
              <!-- <br /> <b>Contact Email:</b> <br />{{ row.contact_email }} -->
            </td>
            <td>
              <span v-if="row.address">
                {{ row.address.addr_line1 }}, {{ row.address.addr_line2 }},
                <br /> {{ row.address.city }}, {{ row.address.state }} -
                <br /> {{ row.address.postal_code }}
              </span>
              <span v-else class="text-muted"> {{ row.addr_code || "N/A" }} </span>

            </td>
            <td>
              <span class="badge px-3" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                {{ row.is_active ? "Active" : "Inactive" }}
              </span>
            </td>

            <td class="text-center">
              <BaseButton iconOnly variant="primary me-2" icon="fas fa-edit" @click="openEdit(row)" />
              <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye " @click="showItemById(row.id)" />
              <BaseButton iconOnly variant="secondary me-2" icon="fas fa-list" @click="showDepotOrdersById(row.id)" />

              <!-- <BaseButton
                iconOnly
                variant="danger"
                icon="fas fa-trash"
                @click="deleteItemById(row.id)"
              /> -->
            </td>
          </tr>

        </tbody>
      </table>
    </template>
  </BaseContainer>

  <!-- ADD / EDIT MODAL -->
  <BaseModal ref="aModal" icon="fas fa-warehouse" size="modal-lg">
    <template #title>
      {{ isEdit ? "Edit Depot" : "Add Depot" }}
    </template>

    <form id="newForm" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-6">
          <BaseInput label="Depot Name" v-model="form.name" placeholder="Enter depot name" required />
        </div>
        <div class="col-md-6">
          <BaseAutoCompleteSelect v-model="form.zone_id" :options="zoneData" label="Zone" :label-key="(z) =>
            ` ${z.code}- ${z.name}  | ${z?.state?.name} (${z?.state?.iso_code})`
            " value-key="id" required />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <BaseInput label="Max Capacity (kg)" type="number" step="0.5" v-model="form.max_capacity_kg"
            placeholder="Enter max capacity in kg" required />
        </div>
        <div class="col-md-6">
          <BaseInput label="Current Load (kg)" type="number" step="0.5" v-model="form.current_load_kg"
            placeholder="Enter current load in kg" required />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <BaseInput label="Buyer Cut Off Time" type="time" v-model="form.buyer_cutoff_time"
            placeholder="Enter buyer cut off time" required />
        </div>
        <div class="col-md-6">
          <BaseInput label="Seller Cut Off Time" type="time" v-model="form.seller_cutoff_time"
            placeholder="Enter seller cut off time" required />
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <BaseInput label="Contact Name" v-model="form.contact_name" placeholder="Enter contact person name"
            required />
        </div>
        <div class="col-md-4">
          <BaseInput label="Contact Phone" v-model="form.contact_phone" placeholder="Enter contact phone number" />
        </div>
        <div class="col-md-4">
          <BaseInput label="Contact Email" type="email" v-model="form.contact_email"
            placeholder="Enter contact email" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="border rounded-3 p-3 bg-light">
            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
              <span class="text-muted">
                Depot is
                <b :class="form.is_active ? 'text-success' : 'text-danger'">
                  {{ form.is_active ? "Active" : "Inactive" }}
                </b>
              </span>

              <!-- TOGGLE -->
              <div class="status-toggle" :class="{ active: form.is_active }" @click="form.is_active = !form.is_active">
                <span class="toggle-knob"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="closeModal"> Cancel </BaseButton>
      <BaseButton variant="primary" :loading="uiStore.isLoading" type="submit" form="newForm">
        Save
      </BaseButton>
    </template>
  </BaseModal>




</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import router from "@/router";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import {
  fetchDepots,
  createDepot,
  updateDepot,

  deleteDepot,
  fetchZones,
} from "@/core/repos/admin/master/masterRepos.js";
import BaseAutoCompleteSelect from "../../../components/common/inputs/BaseAutoCompleteSelect.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const zoneData = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,
  code: null, // from system
  addr_code: null, // will add later

  zone_id: null,
  name: "",
  max_capacity_kg: "",
  current_load_kg: "",

  buyer_cutoff_time: "",
  seller_cutoff_time: "",

  contact_name: "",
  contact_phone: "",
  contact_email: "",

  is_active: true,
});

function resetForm() {
  form.value = {
    id: null,
    code: null, // from system
    addr_code: null, // will add later
    zone_id: null,

    name: "",
    max_capacity_kg: "",
    current_load_kg: "",

    buyer_cutoff_time: "",
    seller_cutoff_time: "",

    contact_name: "",
    contact_phone: "",
    contact_email: "",

    is_active: true,
  };
}

/* ---------------- INIT ---------------- */
onMounted(async () => {
  await loadList();
});

/* ---------------- API ---------------- */
async function loadList() {
  mListData.value = await fetchDepots();
}

async function loadZones() {
  // chec if already loaded
  if (zoneData.value.length) return;
  zoneData.value = [];
  zoneData.value = await fetchZones({ is_active: true });
}

/* ---------------- MODAL ---------------- */
async function openAdd() {
  isEdit.value = false;
  await loadZones();

  resetForm();
  aModal.value.show();
}

async function openEdit(row) {
  isEdit.value = true;
  await loadZones();

  form.value = { ...row };
  aModal.value.show();
}

function closeModal() {
  aModal.value.hide();
  resetForm();
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  const payload = {
    ...form.value,
    buyer_cutoff_time: to24HourTime(form.value.buyer_cutoff_time),
    seller_cutoff_time: to24HourTime(form.value.seller_cutoff_time),
  };

  await (isEdit.value
    ? updateDepot(form.value.id, payload)
    : createDepot(payload));

  closeModal();
  mListData.value = [];
  loadList();
}


function to24HourTime(time) {
  if (!time) return null;

  // If already HH:mm, return as-is
  if (/^\d{2}:\d{2}$/.test(time)) return time;

  // Handle Date object or datetime-local input
  const d = new Date(`1970-01-01T${time}`);
  if (isNaN(d)) return null;

  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}


/* ---------------- DELETE ---------------- */
async function deleteItemById(id) {
  const confirmed = await showConfirmDialog(
    "Delete Depot",
    "Are you sure you want to delete this depot?",
  );

  if (!confirmed) return;

  await deleteDepot(id);

  mListData.value = []; // Clear the list to force reload
  loadList();
}


// 
async function showItemById(id) {
  // Redirect To Details View have mroe informatiosn from users to orders 

  router.push({ name: "mstdepotdetails", params: { id: id } });

}
async function showDepotOrdersById(id) {
  // Redirect To Details View have mroe informatiosn from users to orders 

  router.push({ name: "mstdepotorders", params: { id: id } });

}

</script>
