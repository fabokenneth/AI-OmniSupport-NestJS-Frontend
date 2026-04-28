<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Bot } from 'lucide-vue-next'
import { loginSchema } from '@/schemas/auth'

definePageMeta({ layout: false })
useHead({ title: 'Sign in — AI OmniSupport' })

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs]       = defineField('email')
const [password, passwordAttrs] = defineField('password')

const apiError = ref<string | null>(null)

const submit = handleSubmit(async (values) => {
  apiError.value = null
  try {
    const { data } = await useApi<{ token: string }>('/auth/login', {
      method: 'POST',
      body: values,
    })
    if (data.value?.token) {
      const token = useCookie('auth_token')
      token.value = data.value.token
      await navigateTo('/dashboard')
    }
  } catch {
    apiError.value = 'Invalid email or password.'
  }
})

const inputClass = (hasError: boolean) =>
  [
    'w-full rounded border px-3 py-3 text-base transition-colors',
    'bg-card text-foreground placeholder:text-muted-foreground/40',
    'focus:outline-none focus:ring-2',
    hasError
      ? 'border-destructive focus:ring-destructive/20'
      : 'border-input focus:ring-primary/20',
  ].join(' ')
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/[0.04] to-violet/[0.04] px-4 py-16">

    <!-- Background blur decorations -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-32 -top-20 h-80 w-[512px] rounded-xl bg-primary/5 blur-[60px]" />
      <div class="absolute -bottom-20 -right-32 h-80 w-[512px] rounded-xl bg-violet/5 blur-[60px]" />
      <div class="absolute right-[-100px] top-20 size-96 rounded-xl border border-primary/10 opacity-50" />
      <div class="absolute bottom-20 left-[-100px] size-80 rounded-xl border border-violet/10 opacity-50" />
    </div>

    <!-- Auth container -->
    <div class="flex w-full max-w-[420px] flex-col gap-8">

      <!-- Brand identity -->
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-[0_10px_15px_-3px_rgba(79,70,229,0.25),0_4px_6px_-4px_rgba(79,70,229,0.2)]">
          <Bot class="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 class="text-[36px] font-bold tracking-tight text-foreground">AI-OmniSupport</h1>
        <p class="text-sm text-muted-foreground">Enterprise-grade AI support intelligence</p>
      </div>

      <!-- Login card -->
      <div class="rounded-lg border border-border/30 bg-card p-8 shadow-[0_20px_25px_rgba(0,0,0,0.04)]">

        <!-- Heading -->
        <div class="mb-8 flex flex-col gap-1">
          <h2 class="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h2>
          <p class="text-sm text-muted-foreground">Enter your credentials to access your dashboard</p>
        </div>

        <!-- API-level error -->
        <p v-if="apiError" class="mb-4 rounded bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {{ apiError }}
        </p>

        <!-- Form -->
        <form class="flex flex-col gap-4" novalidate @submit.prevent="submit">

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label
              for="email"
              class="text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/60"
            >
              Email address
            </label>
            <input
              id="email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              autocomplete="email"
              placeholder="name@company.com"
              :class="inputClass(!!errors.email)"
            />
            <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/60"
              >
                Password
              </label>
              <a href="#" class="text-sm text-primary hover:underline">Forgot?</a>
            </div>
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              :class="inputClass(!!errors.password)"
            />
            <p v-if="errors.password" class="text-xs text-destructive">{{ errors.password }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="mt-2 w-full rounded bg-primary py-2.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {{ isSubmitting ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>

        <!-- OR divider -->
        <div class="relative my-8 flex items-center justify-center">
          <div class="absolute inset-x-0 h-px bg-border/30" />
          <span class="relative bg-card px-4 text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground/40">
            Or continue with
          </span>
        </div>

        <!-- Social auth -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex h-11 items-center justify-center gap-2 rounded border border-input text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84-.18-.68z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            class="flex h-11 items-center justify-center gap-2 rounded border border-input text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </button>
        </div>
      </div>

      <!-- Footer links -->
      <div class="flex flex-col items-center gap-4">
        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-semibold text-primary hover:underline">
            Start a free trial
          </NuxtLink>
        </p>
        <div class="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground/40">
          <a href="#" class="transition-colors hover:text-muted-foreground">Privacy Policy</a>
          <span class="h-1 w-1 rounded-full bg-border" />
          <a href="#" class="transition-colors hover:text-muted-foreground">Terms of Service</a>
          <span class="h-1 w-1 rounded-full bg-border" />
          <a href="#" class="transition-colors hover:text-muted-foreground">Contact Support</a>
        </div>
      </div>
    </div>

    <!-- Floating AI badge -->
    <div class="fixed bottom-10 right-10 flex items-center gap-3 rounded-xl border border-white/50 bg-white/70 px-5 py-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur-md dark:border-border/50 dark:bg-card/80">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet">
        <Bot class="h-4 w-4 text-white" />
      </div>
      <div class="flex flex-col">
        <span class="text-[10px] font-bold uppercase tracking-wide text-violet">Powered by Omni-LLM</span>
        <span class="text-xs font-medium text-foreground">99.9% resolution rate</span>
      </div>
    </div>

  </div>
</template>
