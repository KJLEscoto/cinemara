<script setup lang="ts">
const isComingSoon = true
</script>

<template>
  <main>
    <div v-if="isComingSoon">
      <ComingSoon />
    </div>
    <div v-else>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </main>
</template>
