<script setup lang="ts">
import { Bot, Zap, ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'default' })

useHead({
  title: 'AI OmniSupport — Intelligent Customer Support Platform',
  meta: [
    {
      name: 'description',
      content: 'Multi-tenant AI-powered support platform. Resolve tickets faster, automate responses, and delight customers.',
    },
  ],
})

const features = [
  {
    title: 'AI-First Responses',
    description: 'GPT-4 powered suggestions resolve 60% of tickets without human intervention.',
    icon: Bot,
    iconBg: 'bg-violet/10',
    iconColor: 'text-violet',
  },
  {
    title: 'Lightning Fast',
    description: 'Average first-response time under 30 seconds across all channels.',
    icon: Zap,
    iconBg: 'bg-emerald/10',
    iconColor: 'text-emerald',
  },
  {
    title: 'Enterprise Ready',
    description: 'SOC 2 Type II, GDPR compliant, and role-based access control out of the box.',
    icon: ShieldCheck,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary dark:text-primary-foreground',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative isolate overflow-hidden">
      <!-- Background gradient -->
      <div
        class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 dark:from-background dark:via-violet/5 dark:to-background"
        aria-hidden="true"
      />

      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-36 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <!-- Badge -->
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet dark:border-violet-light/20 dark:bg-violet/20 dark:text-violet-light">
            <span class="h-1.5 w-1.5 rounded-full bg-violet dark:bg-violet-light" />
            Powered by AI · Built for scale
          </div>

          <!-- Headline -->
          <h1 class="text-4xl font-extrabold tracking-tight text-primary dark:text-primary-foreground sm:text-6xl lg:text-7xl">
            Support at
            <span class="bg-gradient-to-r from-violet to-emerald bg-clip-text text-transparent">
              AI speed
            </span>
          </h1>

          <p class="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            AI OmniSupport unifies every customer conversation into one intelligent platform. Automate tier-1 responses, escalate with context, and delight customers 24/7 — all from a single multi-tenant dashboard.
          </p>

          <!-- CTAs -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink
              to="/auth/register"
              class="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg dark:bg-violet dark:hover:bg-violet-dark"
            >
              Sign up as Company
            </NuxtLink>
            <NuxtLink
              to="/demo"
              class="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              View live demo →
            </NuxtLink>
          </div>
        </div>

        <!-- Feature cards -->
        <div class="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="rounded-xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
          >
            <div :class="`mb-4 inline-flex rounded-lg p-2.5 ${feature.iconBg}`">
              <component :is="feature.icon" class="h-5 w-5" :class="feature.iconColor" />
            </div>
            <h3 class="mb-1 font-semibold">{{ feature.title }}</h3>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
