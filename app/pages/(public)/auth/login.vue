<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from '@/schemas/auth'
import FormField from '@/components/ui/form/FormField.vue'

definePageMeta({ layout: 'default' })
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
    'w-full rounded-md border px-3 py-2 text-sm shadow-sm',
    'bg-background placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2',
    hasError
      ? 'border-destructive focus:ring-destructive/30'
      : 'border-input focus:ring-ring',
  ].join(' ')
</script>

<template>
  <div class="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-lg">
      <div class="text-center">
        <h2 class="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p class="mt-1 text-sm text-muted-foreground">Sign in to your dashboard</p>
      </div>

      <!-- API-level error (wrong credentials, network, etc.) -->
      <p v-if="apiError" class="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
        {{ apiError }}
      </p>

      <form class="space-y-4" novalidate @submit.prevent="submit">
        <FormField label="Email" for-id="email" :error="errors.email">
          <input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            autocomplete="email"
            placeholder="you@company.com"
            :class="inputClass(!!errors.email)"
          />
        </FormField>

        <FormField label="Password" for-id="password" :error="errors.password">
          <input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            :class="inputClass(!!errors.password)"
          />
        </FormField>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {{ isSubmitting ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="text-center text-sm text-muted-foreground">
        No account?
        <NuxtLink to="/auth/register" class="font-medium text-violet hover:underline">
          Sign up as Company
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
