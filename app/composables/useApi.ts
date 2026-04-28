type ApiOptions = Omit<
  NonNullable<Parameters<typeof useFetch>[1]>,
  'baseURL' | 'headers' | 'onResponseError'
> & {
  headers?: Record<string, string>
}

export function useApi<T>(endpoint: string, options: ApiOptions = {}) {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token')

  const { headers: optHeaders, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...optHeaders,
  }

  if (token.value) {
    headers['Authorization'] = `Bearer ${token.value}`
  }

  // `as any`: useFetch's internal `T extends void ? unknown : T` conditional type
  // is structurally incompatible with an externally-constructed options object.
  // Type safety is preserved at this function's own call sites.
  return useFetch<T>(`${config.public.apiBase}${endpoint}`, {
    ...rest,
    headers,
    onResponseError({ response }: { response: Response }) {
      if (response.status === 401) {
        token.value = null
        navigateTo('/auth/login')
      }
    },
  } as any)
}
