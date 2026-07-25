<script setup>
defineProps({
  language: {
    type: String,
    required: true,
  },
});

defineEmits(["toggle"]);
</script>

<template>
  <button
    class="language-toggle"
    type="button"
    data-language-toggle
    :aria-label="
      language === 'ru' ? 'Switch to English' : 'Переключить на русский'
    "
    @click="$emit('toggle')"
  >
    <span :class="{ 'is-active': language === 'ru' }">RU</span>
    <i aria-hidden="true">/</i>
    <span :class="{ 'is-active': language === 'en' }">EN</span>
  </button>
</template>
