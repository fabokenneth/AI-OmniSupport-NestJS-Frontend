<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
    <!-- Public navigation bar -->
    <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-xl font-bold tracking-tight text-foreground">
            AI<span class="text-violet">Omni</span>Support {{colorMode.value}}
          </span>
        </NuxtLink>

        <!-- Right actions -->
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/auth/login"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 dark:bg-violet dark:hover:bg-violet-dark"
          >
            Get started
          </NuxtLink>

          <!-- Dark mode toggle -->
          <button
            type="button"
            aria-label="Toggle dark mode"
            class="rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            @click="toggleDark"
          >
            <Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-border py-8 text-center text-sm text-muted-foreground">
      © {{ new Date().getFullYear() }} AI OmniSupport. All rights reserved.
    </footer>
  </div>
</template>
