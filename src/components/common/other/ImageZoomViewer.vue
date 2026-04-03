<template>
    <!-- Thumbnail -->
    <img :src="src" :width="thumbWidth" class="zoom-thumb" @click="openViewer" />

    <!-- Overlay (CLICK BACKGROUND TO CLOSE) -->
    <div v-if="open" class="zoom-overlay" @click.self="closeViewer">
        <div class="zoom-wrapper" @wheel.prevent="onWheel">
            <!-- ONLY THIS LAYER ZOOMS -->
            <div class="zoom-layer" :style="{ transform: `scale(${zoom})` }">
                <img :src="src" class="zoom-image" />

                <!-- DIAMOND / CROSS PATTERN -->
                <div class="watermark-pattern" :data-text="watermarkText"></div>

                <!-- CENTER + CORNERS WATERMARK -->
                <div class="watermark-center">
                    <span class="watermark-tl">{{ watermarkText }}</span>
                    <span class="watermark-tr">{{ watermarkText }}</span>
                    <span class="watermark-c">{{ watermarkText }}</span>
                    <span class="watermark-bl">{{ watermarkText }}</span>
                    <span class="watermark-br">{{ watermarkText }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    src: { type: String, required: true },
    watermark: { type: String, default: "GREEN BAZAR" },
    thumbWidth: { type: [Number, String], default: 50 }
});

const open = ref(false);
const zoom = ref(1);

const watermarkText = computed(() => props.watermark || "CONFIDENTIAL");

const openViewer = () => {
    zoom.value = 1;        // base size stable
    open.value = true;
};

const closeViewer = () => {
    open.value = false;
};

const onWheel = (e) => {
    zoom.value += e.deltaY < 0 ? 0.1 : -0.1;
    zoom.value = Math.min(Math.max(zoom.value, 0.6), 3);
};
</script>

<style scoped>
/* Thumbnail */
.zoom-thumb {
    cursor: zoom-in;
}

/* Overlay */
.zoom-overlay {
    /* position: fixed; */
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

/* BASE VIEW SIZE */
.zoom-wrapper {
    position: relative;
    width: 80vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

/* ZOOM TARGET */
.zoom-layer {
    position: relative;
    transform-origin: center center;
}

/* Image */
.zoom-image {
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
    display: block;
    user-select: none;
}

/* DIAMOND / CROSS PATTERN */
.watermark-pattern {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.35;
    background-size: 240px 240px;
    background-image:
        repeating-linear-gradient(-45deg,
            rgba(255, 255, 255, 0.25) 0,
            rgba(255, 255, 255, 0.25) 1px,
            transparent 1px,
            transparent 60px),
        repeating-linear-gradient(45deg,
            rgba(255, 255, 255, 0.25) 0,
            rgba(255, 255, 255, 0.25) 1px,
            transparent 1px,
            transparent 60px);
}

/* CENTER + CORNERS WATERMARK */
.watermark-center {
    position: absolute;
    inset: 0;
    pointer-events: none;

    font-size: 34px;
    font-weight: 800;
    letter-spacing: 6px;
    text-transform: uppercase;
    white-space: pre-line;

    color: transparent;
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.75);

    text-shadow:
        0 0 6px rgba(0, 0, 0, 0.85),
        0 0 12px rgba(0, 0, 0, 0.85);

    display: grid;
    grid-template-areas:
        "tl . tr"
        ".  c  ."
        "bl . br";
    padding: 40px;
}

.watermark-tl {
    grid-area: tl;
    align-self: start;
    justify-self: start;
}

.watermark-tr {
    grid-area: tr;
    align-self: start;
    justify-self: end;
}

.watermark-bl {
    grid-area: bl;
    align-self: end;
    justify-self: start;
}

.watermark-br {
    grid-area: br;
    align-self: end;
    justify-self: end;
}

.watermark-c {
    grid-area: c;
    align-self: center;
    justify-self: center;
}
</style>
