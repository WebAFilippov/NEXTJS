import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import { useSet } from 'react-use'
import qs from 'qs'

type IReturnData = {
  querySet: Set<string>
  toggle: (id: string) => void
}

export const useCheckboxFilter = (param: string): IReturnData => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMounted = useRef(false)

  const [querySet, { toggle }] = useSet<string>(new Set(searchParams.get(param)?.split(',') || []))

  useEffect(() => {
    if (isMounted.current) {
      const params = new URLSearchParams(searchParams)
      const query = qs.stringify(
        { ...Object.fromEntries(params), [param]: Array.from(querySet) },
        { arrayFormat: 'comma' },
      )

      router.push(`?${query}`, {
        scroll: false,
      })
    }

    isMounted.current = true
  }, [querySet])

  return useMemo(() => ({ querySet, toggle }), [querySet])
}
