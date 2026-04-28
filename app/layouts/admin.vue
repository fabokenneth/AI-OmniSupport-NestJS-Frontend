<script setup lang="ts">
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Users,
  Bot,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'

const colorMode = useColorMode()
const route = useRoute()
const companyStore = useCompanyStore()

const collapsed = ref(false)

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

interface NavItem {
  label: string
  to: string
  icon: typeof LayoutDashboard
  badge?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard',    to: '/dashboard',             icon: LayoutDashboard },
  { label: 'Conversations', to: '/dashboard/conversations', icon: MessageSquare },
  { label: 'Companies',    to: '/dashboard/companies',   icon: Building2 },
  { label: 'Users',        to: '/dashboard/users',       icon: Users },
  { label: 'AI Agents',    to: '/dashboard/agents',      icon: Bot,        badge: 'AI' },
  { label: 'Analytics',   to: '/dashboard/analytics',   icon: BarChart3 },
  { label: 'Settings',    to: '/dashboard/settings',    icon: Settings },
]

const isActive = (to: string) => route.path.startsWith(to)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col border-r border-border bg-surface dark:bg-surface-dark transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      ]"
    >
      <!-- Logo -->
      <div class="flex h-16 shrink-0 items-center border-b border-border px-4">
        <NuxtLink to="/dashboard" class="flex min-w-0 items-center gap-2">
          <Bot class="h-6 w-6 shrink-0 text-violet-DEFAULT" />
          <span
            v-if="!collapsed"
            class="truncate text-sm font-bold tracking-tight text-primary dark:text-primary-foreground"
          >
            AI OmniSupport
          </span>
        </NuxtLink>
        <button
          class="ml-auto rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="collapsed = !collapsed"
        >
          <ChevronLeft v-if="!collapsed" class="h-4 w-4" />
          <ChevronRight v-else class="h-4 w-4" />
        </button>
      </div>

      <!-- Tenant badge -->
      <div v-if="!collapsed && companyStore.current" class="border-b border-border px-4 py-3">
        <p class="truncate text-xs font-medium text-muted-foreground">Tenant</p>
        <p class="truncate text-sm font-semibold">{{ companyStore.current.name }}</p>
      </div>

      <!-- Nav -->
      <nav class="flex-1 space-y-1 overflow-y-auto p-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-primary text-primary-foreground dark:bg-violet-DEFAULT'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ]"
          :title="collapsed ? item.label : undefined"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed" class="flex-1 truncate">{{ item.label }}</span>
          <span
            v-if="!collapsed && item.badge"
            class="rounded bg-violet-DEFAULT/20 px-1.5 py-0.5 text-xs font-semibold text-violet-DEFAULT dark:text-violet-light"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <!-- Bottom actions -->
      <div class="border-t border-border p-2 space-y-1">
        <button
          type="button"
          :title="collapsed ? 'Toggle dark mode' : undefined"
          class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          @click="toggleDark"
        >
          <Sun v-if="colorMode.value === 'dark'" class="h-4 w-4 shrink-0" />
          <Moon v-else class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed">Toggle theme</span>
        </button>
        <button
          type="button"
          :title="collapsed ? 'Sign out' : undefined"
          class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed">Sign out</span>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6 dark:bg-surface-dark">
        <h1 class="text-lg font-semibold capitalize">
          {{ route.meta.title ?? route.path.split('/').at(-1) ?? 'Dashboard' }}
        </h1>
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-medium text-emerald-DEFAULT">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-DEFAULT" />
            AI Online
          </span>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
