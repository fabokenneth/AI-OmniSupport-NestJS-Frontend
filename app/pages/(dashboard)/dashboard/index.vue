<script setup lang="ts">
import { MessageSquare, CheckCircle2, Clock, Bot } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
  title: 'Dashboard',
})

useHead({ title: 'Dashboard — AI OmniSupport' })

interface StatCard {
  label: string
  value: string
  delta: string
  positive: boolean
  icon: typeof MessageSquare
}

const stats: StatCard[] = [
  { label: 'Open Tickets',      value: '142',   delta: '+12 today',        positive: false, icon: MessageSquare },
  { label: 'Resolved Today',    value: '87',    delta: '+23%',             positive: true,  icon: CheckCircle2 },
  { label: 'Avg. Response',     value: '28s',   delta: '−4s vs last week', positive: true,  icon: Clock },
  { label: 'AI Auto-resolved',  value: '61%',   delta: '+5% this month',   positive: true,  icon: Bot },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Stat cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">{{ stat.label }}</p>
            <p class="mt-1 text-3xl font-bold tracking-tight">{{ stat.value }}</p>
          </div>
          <div class="rounded-lg bg-muted p-2">
            <component :is="stat.icon" class="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <p
          :class="[
            'mt-3 text-xs font-medium',
            stat.positive ? 'text-emerald' : 'text-destructive',
          ]"
        >
          {{ stat.delta }}
        </p>
      </div>
    </div>

    <!-- Placeholder sections -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 class="mb-4 font-semibold">Recent Conversations</h2>
        <div class="space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="h-12 animate-pulse rounded-md bg-muted"
          />
        </div>
      </div>
      <div class="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 class="mb-4 font-semibold">AI Activity</h2>
        <div class="flex h-48 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
          Chart coming soon
        </div>
      </div>
    </div>
  </div>
</template>
