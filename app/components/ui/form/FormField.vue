<script setup lang="ts">
interface Props {
  label: string
  forId: string
  error?: string
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-1">
    <label :for="forId" class="block text-sm font-medium">{{ label }}</label>
    <slot />
    <p v-if="error" class="text-xs text-destructive">{{ error }}</p>
  </div>
</template>
