<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
});

const visible = ref(false);

onMounted(() => {
  window.requestAnimationFrame(() => {
    visible.value = true;
  });
});
</script>

<template>
  <div
    class="motion-reveal"
    :class="{ 'is-visible': visible }"
    :style="{ '--reveal-delay': `${props.delay * 1000}ms` }"
  >
    <slot />
  </div>
</template>
