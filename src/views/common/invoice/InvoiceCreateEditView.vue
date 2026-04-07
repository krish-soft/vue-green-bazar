<template>

    <BaseContainer :heading="isEdit ? 'Edit Invoice' : 'Create Invoice'">

        <template #headerActions>
            <BaseButton variant="primary" @click="submitInvoice">
                {{ isEdit ? "Update Invoice" : "Create Invoice" }}
            </BaseButton>
        </template>

        <template #body>

            <div class="row">
                <div class="col-md-5">
                    <CustomerSearchComponent v-model="selectedCustomer" required />
                </div>
            </div>

            <div class="row g-3 mb-4">

                <div class="col-md-2">
                    <BaseInput v-model="form.user_id" label="User ID" type="number" readonly :required="!isEdit"
                        :disabled="isEdit" />
                </div>

                <div class="col-md-2">
                    <BaseInput v-model="form.invoice_date" label="Invoice Date" type="date" required />
                </div>

                <div class="col-md-2">
                    <label class="form-label">Invoice Type</label>
                    <select class="form-control" v-model="form.invoice_type" :disabled="isEdit" required>

                        <option value="sales" v-if="isEdit && form.invoice_type === 'sales'">Sales</option>
                        <option value="sales_return">Sales Return</option>
                        <option value="purchase">Purchase</option>
                        <option value="purchase_return">Purchase Return</option>

                    </select>
                </div>

                <div class="col-md-2">
                    <BaseInput v-if="isEdit" v-model="form.invoice_number" label="Invoice Number" type="text"
                        disabled />
                </div>

            </div>

            <hr>

            <h5 class="mb-3">Invoice Items</h5>

            <div class="table-responsive">

                <table class="table table-bordered table-sm align-middle">

                    <thead class="table-dark">
                        <tr>

                            <th style="min-width:200px">Item Name</th>

                            <th width="100">Order Qty</th>
                            <th width="120">Unit Price</th>

                            <th width="100">Ship Qty *</th>
                            <th width="120">Ship Price *</th>

                            <th width="120">Taxable</th>
                            <th width="120">Tax</th>
                            <th width="140">Total</th>

                            <th width="60"></th>

                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in form.items" :key="index">

                            <td>
                                <input class="form-control form-control-sm" v-model="item.item_name" />
                            </td>

                            <td>
                                <input class="form-control form-control-sm order-field" type="number"
                                    v-model.number="item.order_qty" />
                            </td>

                            <td>
                                <input class="form-control form-control-sm order-field" type="number"
                                    v-model.number="item.unit_price" />
                            </td>

                            <td>
                                <input class="form-control form-control-sm ship-field" type="number"
                                    v-model.number="item.ship_qty" @input="recalcItem(index)" />
                            </td>

                            <td>
                                <input class="form-control form-control-sm ship-field" type="number"
                                    v-model.number="item.ship_unit_price" @input="recalcItem(index)" />
                            </td>

                            <td class="text-end">
                                {{ format(item.taxable_amount) }}
                            </td>

                            <td>
                                <input class="form-control form-control-sm" type="number"
                                    v-model.number="item.tax_amount" @input="recalcItem(index)" />
                            </td>

                            <td class="text-end">
                                {{ format(item.total_amount) }}
                            </td>

                            <td>
                                <button class="btn btn-danger btn-sm" @click="removeItem(index)">✕</button>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <BaseButton variant="info" class="mt-2" @click="addItem">
                + Add Item
            </BaseButton>

            <hr class="my-4">

            <h5 class="mb-3">Charges</h5>

            <table class="table table-bordered table-sm">

                <thead class="table-dark">
                    <tr>

                        <th>Charge Name</th>
                        <th width="100">Qty</th>
                        <th width="140">Taxable</th>
                        <th width="120">Tax</th>
                        <th width="140">Total</th>
                        <th width="60"></th>

                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(charge, index) in form.charges" :key="index">

                        <td>
                            <input class="form-control form-control-sm" v-model="charge.charge_name" />
                        </td>

                        <td>
                            <input class="form-control form-control-sm" type="number" v-model.number="charge.qty" />
                        </td>

                        <td>
                            <input class="form-control form-control-sm" type="number"
                                v-model.number="charge.taxable_amount" @input="recalcCharge(index)" />
                        </td>

                        <td>
                            <input class="form-control form-control-sm" type="number" v-model.number="charge.tax_amount"
                                @input="recalcCharge(index)" />
                        </td>

                        <td class="text-end">
                            {{ format(charge.total_amount) }}
                        </td>

                        <td>
                            <button class="btn btn-danger btn-sm" @click="removeCharge(index)">✕</button>
                        </td>

                    </tr>

                </tbody>

            </table>

            <BaseButton variant="info" class="mt-2" @click="addCharge">
                + Add Charge
            </BaseButton>

            <hr class="my-4">

            <div class="row">

                <div class="col-md-6">

                    <label class="form-label">Remarks</label>

                    <textarea class="form-control" rows="5" maxlength="255" v-model="form.remarks" />

                </div>

                <div class="col-md-6">

                    <table class="table table-bordered">

                        <tr>
                            <th>Base Amount</th>
                            <td class="text-end">{{ format(totals.base) }}</td>
                        </tr>

                        <tr>
                            <th>Charges</th>
                            <td class="text-end">{{ format(totals.chargeTaxable) }}</td>
                        </tr>

                        <tr>
                            <th>Subtotal</th>
                            <td class="text-end">{{ format(totals.subtotal) }}</td>
                        </tr>

                        <tr>
                            <th>Tax</th>
                            <td class="text-end">{{ format(totals.tax) }}</td>
                        </tr>

                        <tr class="table-success">
                            <th>Total</th>
                            <td class="text-end fw-bold">₹ {{ format(totals.total) }}</td>
                        </tr>

                    </table>

                </div>

            </div>

        </template>

    </BaseContainer>

</template>


<script setup>

import { reactive, computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"

import BaseContainer from "@/components/common/cards/BaseContainer.vue"
import BaseButton from "@/components/common/buttons/BaseButton.vue"
import BaseInput from "@/components/common/inputs/BaseInput.vue"

import CustomerSearchComponent from "@/components/common/forms/CustomerSearchComponent.vue"

import {
    fetchInvoiceDetails,
    createInvoice,
    updateInvoice
} from "@/core/repos/admin/common/invoiceRepos"

const route = useRoute()

const invoiceId = route.params.id
const isEdit = !!invoiceId

const selectedCustomer = ref(null)

const form = reactive({

    user_id: "",
    invoice_date: new Date().toISOString().slice(0, 10),
    invoice_type: "sales",
    remarks: "",

    items: [],
    charges: []

})


function format(v) {
    return Number(v || 0).toFixed(2)
}


function addItem() {

    form.items.push({

        item_name: "",

        order_qty: 1,
        unit_price: 0,

        ship_qty: 1,
        ship_unit_price: 0,

        taxable_amount: 0,
        tax_amount: 0,
        total_amount: 0

    })

}

function removeItem(i) {
    form.items.splice(i, 1)
}


function recalcItem(i) {

    const item = form.items[i]

    const shipQty = Number(item.ship_qty || 0)
    const shipPrice = Number(item.ship_unit_price || 0)
    const tax = Number(item.tax_amount || 0)

    const taxable = shipQty * shipPrice

    item.taxable_amount = taxable
    item.total_amount = taxable + tax

}


function addCharge() {

    form.charges.push({

        charge_name: "",
        qty: 1,
        taxable_amount: 0,
        tax_amount: 0,
        total_amount: 0

    })

}


function removeCharge(i) {
    form.charges.splice(i, 1)
}


function recalcCharge(i) {

    const c = form.charges[i]

    const qty = Number(c.qty || 1)

    const taxable = Number(c.taxable_amount || 0)
    const tax = Number(c.tax_amount || 0)

    c.total_amount = taxable + tax

}


const totals = computed(() => {

    let base = 0
    let chargeTaxable = 0
    let tax = 0

    form.items.forEach(i => {
        base += Number(i.taxable_amount || 0)
        tax += Number(i.tax_amount || 0)
    })

    form.charges.forEach(c => {
        chargeTaxable += Number(c.taxable_amount || 0)
        tax += Number(c.tax_amount || 0)
    })

    const subtotal = base + chargeTaxable
    const total = subtotal + tax

    return {

        base,
        chargeTaxable,
        subtotal,
        tax,
        total

    }

})


onMounted(async () => {

    if (!isEdit) {
        addItem()
        return
    }

    const data = await fetchInvoiceDetails(invoiceId)

    form.user_id = data.user_id
    form.invoice_date = data.invoice_date.slice(0, 10)
    form.invoice_type = data.invoice_type
    form.remarks = data.remarks || ""
    form.invoice_number = data.invoice_number

    form.items = (data.invoice_items || []).map(i => ({

        item_name: i.item_name,

        order_qty: Number(i.order_qty),
        unit_price: Number(i.unit_price),

        ship_qty: Number(i.ship_qty || 0),
        ship_unit_price: Number(i.ship_unit_price || 0),

        taxable_amount: Number(i.taxable_amount),
        tax_amount: Number(i.tax_amount),
        total_amount: Number(i.total_amount)

    }))

    form.charges = (data.invoice_charges || []).map(c => ({

        charge_name: c.charge_name,
        qty: Number(c.qty),

        taxable_amount: Number(c.taxable_amount),
        tax_amount: Number(c.tax_amount),
        total_amount: Number(c.total_amount)

    }))

})


async function submitInvoice() {

    const payload = {

        user_id: Number(form.user_id),
        invoice_date: form.invoice_date,
        invoice_type: form.invoice_type,
        remarks: form.remarks,

        items: form.items.map(i => ({

            item_name: i.item_name,

            order_qty: Number(i.order_qty),
            unit_price: Number(i.unit_price),

            ship_qty: Number(i.ship_qty),
            ship_unit_price: Number(i.ship_unit_price),

            taxable_amount: Number(i.taxable_amount),
            tax_amount: Number(i.tax_amount)

        })),

        charges: form.charges
            .filter(c => c.charge_name !== "")
            .map(c => ({

                charge_name: c.charge_name,
                qty: Number(c.qty),

                taxable_amount: Number(c.taxable_amount),
                tax_amount: Number(c.tax_amount)

            }))

    }

    if (isEdit) {
        await updateInvoice(invoiceId, payload)
    } else {
        await createInvoice(payload)
    }

}

</script>
<style scoped>
.order-field {
    background: #f5f5f5;
}

.ship-field {
    background: #e8f7ee;
    font-weight: 600;
}
</style>