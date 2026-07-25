<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'info'">
      <circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7h.01" />
    </template>
    <template v-else-if="name === 'settings'">
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.6h-4L10.5 6A7 7 0 0 0 9 7.1l-2.4-1-2 3.4L6.7 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1A7 7 0 0 0 10.5 18l.3 2.6h4L15 18a7 7 0 0 0 1.5-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />
    </template>
    <template v-else-if="name === 'bike'">
      <circle cx="6" cy="17" r="4" /><circle cx="18" cy="17" r="4" />
      <path d="m6 17 4-8 3 8h5l-5-8H9M10 6h4" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2" />
    </template>
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </template>
    <template v-else-if="name === 'mountain'">
      <path d="m3 19 6-11 4 7 2-3 6 7H3Z" />
    </template>
    <template v-else-if="name === 'camera'">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3" /><path d="m8 6 1-2h6l1 2" />
    </template>
    <template v-else-if="name === 'coffee'">
      <path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
      <path d="M17 10h2a2 2 0 0 1 0 4h-2M7 4h8" />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="m6 6 12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'chevron'">
      <path d="m7 10 5 5 5-5" />
    </template>
    <template v-else-if="name === 'layers'">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </template>
    <template v-else-if="name === 'star'">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9L12 3Z" />
    </template>
    <template v-else-if="name === 'lock'">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </template>
    <template v-else-if="name === 'share'">
      <circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" />
    </template>
    <template v-else-if="name === 'download'">
      <path d="M12 3v12M7 10l5 5 5-5M5 20h14" />
    </template>
    <template v-else>
      <path d="M4 7h12M13 4l3 3-3 3M20 17H8M11 14l-3 3 3 3" />
    </template>
  </svg>
</template>
