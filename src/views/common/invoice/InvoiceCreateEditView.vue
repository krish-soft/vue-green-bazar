```vue
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
                    <select class="form-control" v-model="form.invoice_type" :disabled="isEdit" required="">
                        <!-- Show SALES only if editing OR existing value is sales -->
                        <option value="sales" v-if="isEdit && form.invoice_type === 'sales'">
                            Sales
                        </option>
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

            <table class="table table-bordered">

                <thead class="table-dark">
                    <tr>
                        <th>Item Name</th>
                        <th width="120">Qty</th>
                        <th width="150">Unit Price</th>
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
                            <input class="form-control" type="number" step="0.01" v-model.number="item.order_qty"
                                @input="recalcItem(index)" />
                        </td>

                        <td>
                            <input class="form-control" type="number" step="0.01" v-model.number="item.unit_price"
                                @input="recalcItem(index)" />
                        </td>

                        <td class="text-end">
                            {{ Number(item.taxable_amount || 0).toFixed(2) }}
                        </td>

                        <td>
                            <input class="form-control" type="number" step="0.01" v-model.number="item.tax_amount"
                                @input="recalcItem(index)" readonly />
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

            <h5 class="mb-3">Charges</h5>
            <span class="text-primary fw-semibold mb-4">[ This value will be added to Platform accounts ]</span>

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
                                @input="recalcCharge(index)" />
                        </td>

                        <td>
                            <input class="form-control" type="number" v-model.number="charge.tax_amount"
                                @input="recalcCharge(index)" />
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

            <div class="row">

                <!-- REMARKS LEFT -->
                <div class="col-md-6">

                    <label class="form-label">Remarks</label>

                    <textarea class="form-control" rows="5" maxlength="255" v-model="form.remarks"
                        placeholder="Add notes or remarks (max 255 characters)"></textarea>

                    <small class="text-muted">
                        {{ form.remarks.length }}/255 characters
                    </small>

                </div>

                <div class="col-md-2">

                </div>


                <!-- TOTALS RIGHT -->
                <div class="col-md-4">

                    <table class="table table-bordered">

                        <tr>
                            <th>Base Amount</th>
                            <td class="text-end"> {{ Number(totals.base).toFixed(2) }}</td>
                        </tr>

                        <tr>
                            <th>Charges</th>
                            <td class="text-end"> {{ signedCharge(totals.chargeTaxable) }}</td>
                        </tr>

                        <tr>
                            <th>Subtotal</th>
                            <td class="text-end">
                                {{
                                    (
                                        Number(totals.base) +
                                        parseFloat(signedCharge(totals.chargeTaxable))
                                    ).toFixed(2)
                                }}
                            </td>
                        </tr>

                        <tr>
                            <th>Tax</th>
                            <td class="text-end"> {{ signedCharge(totals.tax) }}</td>
                        </tr>

                        <tr class="table-success">
                            <th>Total</th>
                            <td class="text-end">
                                <div>
                                    ₹ {{
                                        (
                                            Number(totals.base) +
                                            parseFloat(signedCharge(totals.chargeTaxable)) +
                                            parseFloat(signedCharge(totals.tax))
                                        ).toFixed(2)
                                    }}
                                </div>

                                <div class="small fw-semibold" :class="totalClass">
                                    {{ totalLabel }}
                                </div>
                            </td>
                        </tr>

                    </table>

                    <!-- <table class="table table-bordered">

                        <tr>
                            <th>Base Amount</th>
                            <td class="text-end"> {{ totals.base }}</td>
                        </tr>

                        <tr>
                            <th>Charges</th>
                            <td class="text-end"> {{ totals.chargeTaxable }}</td>
                        </tr>

                        <tr>
                            <th>Subtotal</th>
                            <td class="text-end"> {{ totals.subtotal }}</td>
                        </tr>

                        <tr>
                            <th>Tax</th>
                            <td class="text-end"> {{ totals.tax }}</td>
                        </tr>

                        <tr class="table-success">
                            <th>Total</th>
                            <td class="text-end">
                                <div> {{ totals.total }}</div>
                                <div class="small fw-semibold" :class="totalClass">
                                    {{ totalLabel }}
                                </div>
                            </td>
                        </tr>

                    </table> -->

                    <!-- <table class="table table-bordered">

                        <tr>
                            <th>Base Amount</th>
                            <td class="text-end">{{ totals.base }}</td>
                        </tr>

                        <tr>
                            <th>Charges</th>
                            <td class="text-end">{{ totals.chargeTaxable }}</td>
                        </tr>
                        <tr>
                            <th>Subtotal</th>
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

                    </table> -->

                </div>

                <div class="mt-4 p-4 rounded border bg-light">

                    <div class="fw-bold text-primary mb-2 fs-5">
                        Amount Explanation
                    </div>

                    <div class="fs-6 text-dark" style="line-height:1.6; white-space:pre-line;"
                        v-html="coloredExplanation"></div>

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

import {
    fetchInvoiceDetails,
    createInvoice,
    updateInvoice
} from "@/core/repos/admin/common/invoiceRepos"
import CustomerSearchComponent from "@/components/common/forms/CustomerSearchComponent.vue";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

const route = useRoute()

const invoiceId = route.params.id
const isEdit = !!invoiceId
const selectedCustomer = ref(null);

const form = reactive({
    user_id: "",
    invoice_date: new Date().toISOString().slice(0, 10),
    invoice_type: "sale",
    remarks: "",
    items: [],
    charges: []
})

function addItem() {
    form.items.push({
        item_name: "",
        order_qty: 1,
        unit_price: 0,
        taxable_amount: 0,
        tax_amount: 0,
        total_amount: 0
    })
}

function removeItem(i) {
    form.items.splice(i, 1)
}

watch(() => selectedCustomer.value, (newVal) => {
    if (newVal) {
        form.user_id = newVal.id;

        if (!isEdit) {
            form.invoice_date = new Date().toISOString().slice(0, 10);

            if (newVal.is_buyer) {
                form.invoice_type = "sales"
            } else {
                form.invoice_type = "purchase"
            }
        }
    } else {
        form.user_id = "";
    }
})

function recalcItem(i) {

    const item = form.items[i]

    item.taxable_amount =
        Number(item.order_qty || 0) *
        Number(item.unit_price || 0)

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

function recalcCharge(i) {

    const c = form.charges[i]

    c.total_amount =
        Number(c.taxable_amount || 0) +
        Number(c.tax_amount || 0)

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
        base: base.toFixed(2),
        chargeTaxable: chargeTaxable.toFixed(2),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    }

})

const amountExplanation = computed(() => {

    const type = form.invoice_type

    const base = Number(totals.value.base)
    const tax = Number(totals.value.tax)
    const total = Number(totals.value.total)
    const charges = Number(totals.value.chargeTaxable)

    let explanation = ""

    if (type === "sales") {
        explanation += `Customer will pay ${total.toFixed(2)} (Debit to customer).\n`
    }

    if (type === "sales_return") {
        explanation += `Refund ${total.toFixed(2)} to customer (Credit to customer).\n`
    }

    if (type === "purchase") {
        explanation += `We need to pay ${total.toFixed(2)} to supplier (Credit to supplier).\n`
    }

    if (type === "purchase_return") {
        explanation += `Supplier needs to pay ${total.toFixed(2)} (Debit to supplier).\n`
    }

    if (tax > 0) {
        explanation += `Tax ${tax.toFixed(2)} will be recorded.\n`
    }

    if (charges > 0) {
        explanation += `Charges ${charges.toFixed(2)} handled via platform clearing.\n`
    }

    return explanation
})

const totalLabel = computed(() => {

    const type = form.invoice_type

    if (type === "sales") return "Receivable from Customer"
    if (type === "sales_return") return "Refund to Customer"

    if (type === "purchase") return "Payable to Supplier"
    if (type === "purchase_return") return "Receivable from Supplier"

    return ""
})

const totalClass = computed(() => {

    const type = form.invoice_type

    // Money coming IN
    if (type === "sales" || type === "purchase_return") {
        return "text-success"
    }

    // Money going OUT
    return "text-danger"
})

const coloredExplanation = computed(() => {

    if (!amountExplanation.value) return ""

    return amountExplanation.value.replace(
        /(-?\d+(\.\d+)?)/g,
        '<span class="fw-bold text-success">$1</span>'
    )

})

const signedCharge = (value) => {
    const type = form.invoice_type

    // Charges & tax go OUT in these cases
    if (type === "purchase" || type === "sales_return") {
        return (-Math.abs(Number(value || 0))).toFixed(2)
    }

    return Math.abs(Number(value || 0)).toFixed(2)
}

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

    const confirmed = await showConfirmDialog(
        "Submit Invoice",
        "Are you sure you want to submit this invoice?"
    );

    if (!confirmed) return;


    const payload = {
        user_id: Number(form.user_id),
        invoice_date: form.invoice_date,
        invoice_type: form.invoice_type,
        remarks: form.remarks,

        items: form.items.map(i => ({
            item_name: i.item_name,
            order_qty: Number(i.order_qty),
            unit_price: Number(i.unit_price),
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
