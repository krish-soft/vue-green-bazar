<template>
    <li class="nav-item">
        <!-- LINK -->
        <RouterLink v-if="item.to" class="nav-link d-flex align-items-center gap-2" :class="linkClass" :to="item.to">
            <i v-if="item.icon" :class="item.icon"></i>
            <span v-if="!collapsed">{{ item.label }}</span>
        </RouterLink>

        <!-- PARENT -->
        <div v-else>
            <a class="nav-link d-flex align-items-center gap-2" :class="{ active: isActive }" role="button"
                @click.prevent="toggleOpen">
                <i v-if="item.icon" :class="item.icon"></i>
                <span v-if="!collapsed">{{ item.label }}</span>
                <i v-if="!collapsed" class="fas fa-chevron-down ms-auto small" :class="{ rotate: isOpen }"></i>
            </a>

            <ul class="nav flex-column ps-3" v-show="isOpen">
                <SidebarItem v-for="(child, i) in item.children" :key="i" :item="child" :collapsed="collapsed" />
            </ul>
        </div>
    </li>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
    item: Object,
    collapsed: Boolean
});

/* -----------------------
 | ACTIVE MATCH LOGIC
 ----------------------- */
// function matchRoute(item) {
//     if (!item) return false;

//     const mode = item.match || "exact";

//     if (item.to) {
//         const path =
//             typeof item.to === "string"
//                 ? item.to
//                 : route.resolve(item.to).path;

//         if (mode === "exact") return route.path === path;
//         if (mode === "prefix") return route.path.startsWith(path);
//     }

//     if (item.children && mode === "children") {
//         return item.children.some(child => matchRoute(child));
//     }

//     return false;
// }

function resolvePath(to, route) {
    if (!to) return null;

    // string = path
    if (typeof to === "string") return to;

    // object = { name } or { path }
    try {
        return route.resolve(to).path;
    } catch {
        return null;
    }
}

function matchRoute(item) {
    if (!item) return false;

    // ---- DIRECT ROUTE (NAME ONLY) ----
    if (item.to && item.match === "exact") {
        return route.name === item.to.name;
    }

    // ---- PARENT ACTIVE VIA CHILDREN ----
    if (item.children && item.match === "children") {
        return item.children.some(child => matchRoute(child));
    }

    return false;
}



const isActive = computed(() => matchRoute(props.item));

/* -----------------------
 | OPEN STATE (NO BOOTSTRAP)
 ----------------------- */
const isOpen = ref(isActive.value);

watch(isActive, (val) => {
    if (val) isOpen.value = true;
});

function toggleOpen() {
    isOpen.value = !isOpen.value;
}

const linkClass = computed(() => ({
    "text-white": true,
    active: isActive.value
}));
</script>


<style scoped>
/* ===============================
   BASE NAV LINK (YOUR OLD WORKING LOOK)
=============================== */
.nav-link {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px 12px;
    margin-bottom: 4px;

    border-radius: 8px;
    color: rgba(255, 255, 255, 0.88);

    background: transparent;
    line-height: 1.25;
    white-space: normal;
    word-break: break-word;

    transition: background-color 0.15s ease, color 0.15s ease;
}

/* ===============================
   ICON VISIBILITY
=============================== */
.nav-link i {
    min-width: 18px;
    text-align: center;
    color: #d1fae5;
}

/* ===============================
   HOVER (SUBTLE – NO BLUE)
=============================== */
.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff;
}

/* ===============================
   ACTIVE ITEM (CLEAR & VISIBLE)
=============================== */
.nav-link.active {
    background-color: rgba(255, 255, 255, 0.18) !important;
    color: #ffffff !important;
    font-weight: 600;
    position: relative;
}

/* LEFT ACTIVE INDICATOR (KEY VISUAL) */
.nav-link.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 4px;
    border-radius: 4px;
    /* background-color: #bbf7d0; */
    background-color: #df5259;
    /* soft green */
}

/* TOP LEVEL */
.nav>.nav-item>.nav-link.active::before {
    background-color: #86efac;
    /* light green */
}

/* SECOND LEVEL */
.nav.ps-3>.nav-item>.nav-link.active::before {
    background-color: #34d399;
    /* medium green */
}

/* THIRD LEVEL */
.nav.ps-3 .nav.ps-3>.nav-item>.nav-link.active::before {
    background-color: #22c55e;
    /* strong green */
}


/* ===============================
   CHILD LEVEL (LEVEL 2)
=============================== */
.nav.ps-3 {
    padding-left: 0.75rem;
    margin-top: 4px;
    border-left: 1px solid rgba(255, 255, 255, 0.18);
}

.nav.ps-3>.nav-item>.nav-link {
    font-size: 0.95rem;
}

/* ===============================
   SUB-CHILD LEVEL (LEVEL 3)
=============================== */
.nav.ps-3 .nav.ps-3 {
    padding-left: 0.6rem;
    border-left: 1px dashed rgba(255, 255, 255, 0.22);
}

.nav.ps-3 .nav.ps-3>.nav-item>.nav-link {
    font-size: 0.9rem;
}

/* ===============================
   CHEVRON ROTATION
=============================== */
.rotate {
    transform: rotate(180deg);
    transition: transform 0.2s ease;
}

/* ===============================
   KILL BOOTSTRAP BLUE (SAFE)
=============================== */
.nav-pills .nav-link.active,
.nav-pills .nav-link:hover,
.nav-pills .show>.nav-link {
    background-color: inherit !important;
}
</style>


<!-- 
<style scoped>
/* base */
.nav-link {
    color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    transition: background-color 0.15s ease;
}

/* hover */
.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}

/* ACTIVE – parent */
.nav-link.active {
    background-color: rgba(255, 255, 255, 0.15) !important;
    font-weight: 600;
}

/* ACTIVE – child (level 2) */
.nav.ps-3>.nav-item>.nav-link.active {
    background-color: rgba(255, 255, 255, 0.22) !important;
    border-left: 3px solid #bbf7d0;
    /* soft green indicator */
}

/* ACTIVE – sub child (level 3) */
.nav.ps-4>.nav-item>.nav-link.active {
    background-color: rgba(255, 255, 255, 0.28) !important;
    border-left: 3px solid #86efac;
}
</style> -->
