<script setup>
import { useId } from 'vue';
import { languages } from '../locales/languages';
import { useTranslations } from '../composables/useLanguage';
const props = defineProps({ language: { type: String, required: true } });
const emit = defineEmits(['toggle']);
const { tr, localeLoading, localeError } = useTranslations();
const id = `language-${useId()}`;
function changeLanguage(event) {
  const next = event.target.value;
  // Keep the current choice visible until the new dictionary is actually loaded.
  event.target.value = props.language;
  emit('toggle', next);
}
</script>
<template>
  <label class="language-picker" :for="id" data-language-toggle>
    <span class="language-picker-label">{{ tr('Language') }}</span>
    <span class="language-picker-control">
      <select :id="id" :value="language" :disabled="localeLoading" :aria-busy="localeLoading" @change="changeLanguage">
        <option v-for="item in languages" :key="item.code" :value="item.code" :lang="item.code">{{ item.name }}</option>
      </select>
    </span>
    <span v-if="localeError" class="language-error" role="alert">{{ tr('Unable to load this language. Please try again.') }}</span>
  </label>
</template>
