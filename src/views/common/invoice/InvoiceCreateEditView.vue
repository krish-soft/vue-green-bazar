```vue
<template>
    <BaseContainer :heading="isEdit ? 'Edit Invoice' : 'Create Invoice'">

        <template #headerActions>
            <BaseButton variant="primary" @click="submitInvoice">
                {{ isEdit ? "Update Invoice" : "Create Invoice" }}
            </BaseButton>
        </template>

        <template #body>

            <div class="row g-3 mb-4">

                <div class="col-md-3">
                    <BaseInput v-model="form.user_id" label="User ID" type="number" :disabled="isEdit"
                        :required="!isEdit" />
                </div>

                <div class="col-md-3">
                    <BaseInput v-model="form.invoice_date" label="Invoice Date" type="date" required />
                </div>

                <div class="col-md-3">
                    <label class="form-label">Invoice Type</label>
                    <select class="form-control" v-model="form.invoice_type">
                        <option value="sale">Sale</option>
                        <option value="purchase">Purchase</option>
                        <option value="refund">Refund</option>
                        <option value="return">Return</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>

            </div>

            <hr>

            <h5 class="mb-3">Invoice Items</h5>

            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>Item Name</th>
                        <th width="120">Qty</th>
                        <th width="150">Taxable</th>
                        <th width="150">Tax</th>
                        <th width="150">Total</th>
                        <th width="60"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(item, index) in form.items" :key="index">

                        <td>
                            <input class="form-control" v-model="item.item_name" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="item.order_qty" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="item.taxable_amount"
                                @input="calcItem(index)" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="item.tax_amount"
                                @input="calcItem(index)" readonly />
                        </td>

                        <td class="text-end">
                            {{ Number(item.total_amount || 0).toFixed(2) }}
                        </td>

                        <td>
                            <button class="btn btn-danger btn-sm" @click="removeItem(index)">✕</button>
                        </td>

                    </tr>

                </tbody>
            </table>

            <BaseButton variant="info" class="mt-2" @click="addItem">
                + Add Item
            </BaseButton>

            <hr class="my-4">

            <h5 class="mb-3">Extra Charges</h5>

            <table class="table table-bordered">

                <thead class="table-dark">
                    <tr>
                        <th>Charge Name</th>
                        <th width="120">Qty</th>
                        <th width="150">Taxable</th>
                        <th width="150">Tax</th>
                        <th width="150">Total</th>
                        <th width="60"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(charge, index) in form.charges" :key="index">

                        <td>
                            <input class="form-control" v-model="charge.charge_name" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="charge.qty" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="charge.taxable_amount"
                                @input="calcCharge(index)" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="charge.tax_amount"
                                @input="calcCharge(index)" />
                        </td>

                        <td class="text-end">
                            {{ Number(charge.total_amount || 0).toFixed(2) }}
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

            <div class="row justify-content-end">

                <div class="col-md-4">

                    <table class="table table-bordered">

                        <tr>
                            <th>Base Amount</th>
                            <td class="text-end">{{ totals.base }}</td>
                        </tr>
                        <tr>
                            <th>Subtotal [Items + Charges]</th>
                            <td class="text-end">{{ totals.subtotal }}</td>
                        </tr>

                        <tr>
                            <th>Tax</th>
                            <td class="text-end">{{ totals.tax }}</td>
                        </tr>



                        <tr class="table-success">
                            <th>Total</th>
                            <td class="text-end">{{ totals.total }}</td>
                        </tr>

                    </table>

                </div>

            </div>

        </template>
    </BaseContainer>
</template>

<script setup>

import { reactive, computed, onMounted } from "vue"
import { useRoute } from "vue-router"

import BaseContainer from "@/components/common/cards/BaseContainer.vue"
import BaseButton from "@/components/common/buttons/BaseButton.vue"
import BaseInput from "@/components/common/inputs/BaseInput.vue"

import {
    fetchInvoiceDetails,
    createInvoice,
    updateInvoice
} from "@/core/repos/admin/common/invoiceRepos"

const route = useRoute()

const invoiceId = route.params.id
const isEdit = !!invoiceId

const form = reactive({
    user_id: "",
    invoice_date: new Date().toISOString().slice(0, 10),
    invoice_type: "sale",
    items: [],
    charges: []
})

function addItem() {
    form.items.push({
        item_name: "",
        order_qty: 1,
        taxable_amount: 0,
        tax_amount: 0,
        total_amount: 0
    })
}

function removeItem(i) {
    form.items.splice(i, 1)
}

function calcItem(i) {
    const item = form.items[i]
    item.total_amount =
        Number(item.taxable_amount || 0) +
        Number(item.tax_amount || 0)
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

function calcCharge(i) {
    const c = form.charges[i]
    c.total_amount =
        Number(c.taxable_amount || 0) +
        Number(c.tax_amount || 0)
}
const totals = computed(() => {

    let baseAmount = 0
    let itemTax = 0
    let chargeTaxable = 0
    let chargeTax = 0

    // ITEMS
    form.items.forEach(i => {
        baseAmount += Number(i.taxable_amount || 0)
        itemTax += Number(i.tax_amount || 0)
    })

    // CHARGES
    form.charges.forEach(c => {
        chargeTaxable += Number(c.taxable_amount || 0)
        chargeTax += Number(c.tax_amount || 0)
    })

    const subtotal = baseAmount + chargeTaxable
    const tax = itemTax + chargeTax
    const total = subtotal + tax

    return {
        base: baseAmount.toFixed(2),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
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
    form.invoice_type = (data.invoice_type || "sale").toLowerCase()

    form.items = (data.invoice_items || []).map(i => ({
        item_name: i.item_name,
        order_qty: Number(i.order_qty),
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
        items: form.items.map(i => ({
            item_name: i.item_name,
            order_qty: Number(i.order_qty),
            taxable_amount: Number(i.taxable_amount || 0),
            tax_amount: Number(i.tax_amount || 0)
        })),
        charges: form.charges
            .filter(c => c.charge_name !== "")
            .map(c => ({
                charge_name: c.charge_name,
                qty: Number(c.qty || 1),
                taxable_amount: Number(c.taxable_amount || 0),
                tax_amount: Number(c.tax_amount || 0)
            }))
    }

    if (isEdit) {
        await updateInvoice(invoiceId, payload)
    } else {
        await createInvoice(payload)
    }

}

</script>
