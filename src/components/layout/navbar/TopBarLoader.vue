<template>
    <div v-if="show">
        <!-- TOPBAR MODE : FARM MOTION LINE -->
        <div v-if="onTop" class="topbar-motion">
            <div class="motion-line"></div>
        </div>

        <!-- FULLSCREEN MODE : CENTER FOCUS -->
        <div v-else class="fullscreen-focus">
            <div class="focus-card">
                <div class="focus-symbol"></div>
                <div class="focus-text">Processing…</div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    onTop: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
/* ======================================================
   TOPBAR MODE – VISIBLE FARM MOTION
   ====================================================== */

.topbar-motion {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    overflow: hidden;
    z-index: 1500;
    background-color: #1b4332;
}

.motion-line {
    width: 160%;
    height: 100%;
    background: repeating-linear-gradient(90deg,
            #1a3127 0 18px,
            #90dfbb 18px 36px);
    animation: farm-move 1.2s linear infinite;
}

@keyframes farm-move {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-40%);
    }
}

/* ======================================================
   FULLSCREEN MODE – KEEP BLUR, CLEAN FARM VISUAL
   ====================================================== */

.fullscreen-focus {
    position: fixed;
    inset: 0;
    background: rgba(248, 249, 250, 0.85);
    z-index: 9999;
    display: grid;
    place-items: center;
    pointer-events: all;
}

.focus-card {
    background: #ffffff;
    padding: 2.2rem 3rem;
    border-radius: 1rem;
    box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.08),
        0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

/* ======================================================
   FULLSCREEN MODE – CENTER FOCUS CARD
   ====================================================== */

.fullscreen-focus {
    position: fixed;
    inset: 0;
    background: rgba(248, 249, 250, 0.85);
    z-index: 9999;
    display: grid;
    place-items: center;
    pointer-events: all;
}

.focus-card {
    background: #ffffff;
    padding: 2.2rem 3rem;
    border-radius: 1rem;
    box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.08),
        0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

/* ======================================================
   SYMBOL – FARM / ADMIN METAPHOR
   ====================================================== */

.focus-symbol {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid #2d6a4f;
    border-top-color: transparent;
    animation: slow-turn 2.8s linear infinite;
}

@keyframes slow-turn {
    to {
        transform: rotate(360deg);
    }
}

/* ======================================================
   TEXT
   ====================================================== */

.focus-text {
    font-size: 0.9rem;
    color: #2d6a4f;
    letter-spacing: 0.3px;
}
</style>
