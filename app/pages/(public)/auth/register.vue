<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Building2 } from 'lucide-vue-next'
import { registerSchema } from '@/schemas/auth'
import Button from '@/components/ui/button/Button.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import FormField from '@/components/ui/form/FormField.vue'

definePageMeta({ layout: 'default' })
useHead({ title: 'Register your Company — AI OmniSupport' })

const { defineField, handleSubmit, errors, isSubmitting, setFieldValue } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: { plan: 'starter' as const },
})

const [companyName, companyNameAttrs]       = defineField('companyName')
const [email, emailAttrs]                   = defineField('email')
const [password, passwordAttrs]             = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [plan]                                = defineField('plan')

const apiError = ref<string | null>(null)

const plans = [
  {
    id: 'starter' as const,
    name: 'Starter',
    price: 'Free',
    description: 'Up to 3 agents, 500 tickets/mo',
    badge: undefined,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: '$49/mo',
    description: 'Unlimited agents, 10k tickets/mo',
    badge: 'Popular',
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    price: 'Custom',
    description: 'SLA, SSO, dedicated infra',
    badge: undefined,
  },
]

const submit = handleSubmit(async (values) => {
  apiError.value = null
  try {
    const { data } = await useApi<{ token: string }>('/auth/register', {
      method: 'POST',
      body: {
        companyName: values.companyName,
        email: values.email,
        password: values.password,
        plan: values.plan,
      },
    })
    if (data.value?.token) {
      const token = useCookie('auth_token')
      token.value = data.value.token
      await navigateTo('/dashboard')
    }
  } catch {
    apiError.value = 'Registration failed. Please try again.'
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
  <div class="flex min-h-[calc(100vh-8rem)] items-start justify-center px-4 py-12">
    <div class="w-full max-w-lg space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/10">
          <Building2 class="h-7 w-7 text-violet" />
        </div>
        <h2 class="text-2xl font-bold tracking-tight">Register your Company</h2>
        <p class="mt-1 text-sm text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
      </div>

      <!-- API-level error -->
      <p v-if="apiError" class="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
        {{ apiError }}
      </p>

      <!-- Plan selector (Zod validates the enum, VeeValidate tracks it) -->
      <div>
        <p class="mb-2 text-sm font-medium">Choose a plan</p>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="p in plans"
            :key="p.id"
            type="button"
            :class="[
              'relative rounded-xl border p-4 text-left transition-all',
              plan === p.id
                ? 'border-violet bg-violet/5 ring-2 ring-violet'
                : 'border-border bg-card hover:border-violet/40',
            ]"
            @click="setFieldValue('plan', p.id)"
          >
            <Badge
              v-if="p.badge"
              variant="secondary"
              class="absolute right-2 top-2 bg-violet/10 text-violet text-xs"
            >
              {{ p.badge }}
            </Badge>
            <p class="text-sm font-semibold">{{ p.name }}</p>
            <p class="mt-1 text-lg font-bold">{{ p.price }}</p>
            <p class="mt-1 text-xs leading-snug text-muted-foreground">{{ p.description }}</p>
          </button>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-4" novalidate @submit.prevent="submit">
        <FormField label="Company name" for-id="companyName" :error="errors.companyName">
          <input
            id="companyName"
            v-model="companyName"
            v-bind="companyNameAttrs"
            type="text"
            autocomplete="organization"
            placeholder="Acme Corp"
            :class="inputClass(!!errors.companyName)"
          />
        </FormField>

        <FormField label="Work email" for-id="email" :error="errors.email">
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

        <div class="grid grid-cols-2 gap-3">
          <FormField label="Password" for-id="password" :error="errors.password">
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              autocomplete="new-password"
              placeholder="Min. 8 characters"
              :class="inputClass(!!errors.password)"
            />
          </FormField>

          <FormField label="Confirm password" for-id="confirmPassword" :error="errors.confirmPassword">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"
              type="password"
              autocomplete="new-password"
              placeholder="Repeat password"
              :class="inputClass(!!errors.confirmPassword)"
            />
          </FormField>
        </div>

        <Button
          type="submit"
          class="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-violet dark:hover:bg-violet-dark"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Creating account…' : 'Create Company account' }}
        </Button>
      </form>

      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-medium text-violet hover:underline">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
