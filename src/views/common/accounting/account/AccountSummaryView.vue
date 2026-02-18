<template>
    <BaseContainer heading="Accounting Summary Dashboard" class="mb-4">
        <template #body>
        </template>
    </BaseContainer>
    <!-- ===================================================== -->
    <!-- 1️⃣ PLATFORM ACCOUNTS (ONLY REAL ACCOUNTS FROM DB) -->
    <!-- ===================================================== -->
    <AccountCards title="Platform Accounts" :rows="summary.platform_accounts" />


    <!-- ===================================================== -->
    <!-- 2️⃣ SELLER / BUYER / DELIVERY STATUS TABLES -->
    <!-- ===================================================== -->
    <div class="row mt-4">

        <StatusTable title="Seller Accounts" :rows="summary.seller_accounts" />

        <StatusTable title="Buyer Accounts" :rows="summary.buyer_accounts" />

        <StatusTable title="Delivery Accounts" :rows="summary.delivery_accounts" />

    </div>


    <!-- ===================================================== -->
    <!-- 3️⃣ FINANCIAL SUMMARY (LAST BLOCK) -->
    <!-- ===================================================== -->
    <div class="row mb-4 mt-4">

        <FinancialCard v-for="(card, i) in financialCards" :key="i" :title="card.title" :value="f(card.value)"
            :color="card.color" />

    </div>


</template>

<script setup>

import { ref, onMounted, computed } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import FinancialCard from "@/components/common/accounting/FinancialCard.vue";
import StatusTable from "@/components/common/accounting/StatusTable.vue";
import AccountCards from "@/components/common/accounting/AccountCards.vue";
import { fetchAccountingSummary } from "@/core/repos/admin/common/accountingRepos";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/
const summary = ref({
    financial_summary: {},
    platform_accounts: [],
    seller_accounts: [],
    buyer_accounts: [],
    delivery_accounts: [],
});

/*
|--------------------------------------------------------------------------
| COMPUTED FINANCIAL OBJECT
|--------------------------------------------------------------------------
*/
const fs = computed(() => summary.value.financial_summary || {});

/*
|--------------------------------------------------------------------------
| AUTO GENERATED FINANCIAL CARDS (NO HARDCODE DUPLICATION)
|--------------------------------------------------------------------------
*/
const financialCards = computed(() => [

    // PLATFORM ASSETS / INCOME
    { title: "Platform Revenue", value: fs.value.platform_revenue, color: "success" },
    { title: "Cash Balance", value: fs.value.cash_balance, color: "primary" },
    { title: "Bank Balance", value: fs.value.bank_balance, color: "primary" },

    // PLATFORM PAYABLE
    { title: "Seller Payable", value: fs.value.seller_payable, color: "warning" },
    { title: "Delivery Payable", value: fs.value.delivery_payable, color: "warning" },
    { title: "Buyer Refund", value: fs.value.buyer_refund, color: "danger" },

    // RECEIVABLE FROM MARKET
    { title: "Seller Receivable", value: fs.value.seller_receivable, color: "info" },
    { title: "Delivery Receivable", value: fs.value.delivery_receivable, color: "info" },
    { title: "Buyer Receivable", value: fs.value.buyer_receivable, color: "info" },

    // CORE PLATFORM ACCOUNTS
    { title: "Clearing Balance", value: fs.value.clearing_balance, color: "secondary" },
    { title: "Tax Liability", value: fs.value.tax_liability, color: "danger" },

    // FINAL POSITION
    {
        title: "Net Platform Position",
        value: fs.value.net_platform_position,
        color: (fs.value.net_platform_position ?? 0) < 0 ? "danger" : "success"
    }

]);

/*
|--------------------------------------------------------------------------
| LOAD DATA
|--------------------------------------------------------------------------
*/
onMounted(loadSummary);

async function loadSummary() {
    const data = await fetchAccountingSummary();
    if (!data) return;
    summary.value = data;
}

/*
|--------------------------------------------------------------------------
| FORMAT NUMBER (2 DECIMAL FIXED)
|--------------------------------------------------------------------------
*/
function f(v) {
    return Number(v || 0).toFixed(2);
}

</script>
