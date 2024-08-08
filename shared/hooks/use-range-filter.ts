import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import qs from 'qs'

interface IReturnData {
  range: { priceFrom: number; priceTo: number }
  setRange: React.Dispatch<React.SetStateAction<{ priceFrom: number; priceTo: number }>>
}

export const useRangeFilter = (): IReturnData => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMounted = useRef(false)

  const [range, setRange] = useState<{ priceFrom: number; priceTo: number }>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  })

  useEffect(() => {
    if (isMounted.current) {
      const params = new URLSearchParams(searchParams)
      const query = qs.stringify(
        { ...Object.fromEntries(params), ...range },
        { arrayFormat: 'comma' },
      )

      router.push(`?${query}`, {
        scroll: false,
      })
    }

    isMounted.current = true
  }, [range])

  return useMemo(() => ({ range, setRange }), [range])
}
