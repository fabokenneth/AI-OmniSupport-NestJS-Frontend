export interface Company {
  id: string
  name: string
  slug: string
  plan: 'starter' | 'pro' | 'enterprise'
  logoUrl?: string
  createdAt: string
}

export const useCompanyStore = defineStore('company', () => {
  const current = ref<Company | null>(null)
  const all = ref<Company[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { $api } = useNuxtApp()

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const data = await $api<Company[]>('/companies')
      all.value = data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load companies'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string) {
    loading.value = true
    error.value = null
    try {
      const data = await $api<Company>(`/companies/${id}`)
      current.value = data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load company'
    } finally {
      loading.value = false
    }
  }

  function setCurrent(company: Company) {
    current.value = company
  }

  function clear() {
    current.value = null
    all.value = []
    error.value = null
  }

  return { current, all, loading, error, fetchAll, fetchById, setCurrent, clear }
})
