import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { IFilters } from './use-filters'
import qs from 'qs'

export const useQueryFilters = (filter: IFilters) => {
  const isMounted = useRef(false)
  const router = useRouter()

  const { selectedTypes, selectedSizes, selectedIngredients, prices } = filter

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...prices,
        types: Array.from(selectedTypes),
        sizes: Array.from(selectedSizes),
        ingredients: Array.from(selectedIngredients),
      }

      const query = qs.stringify(params, { arrayFormat: 'comma' })

      router.push(`?${query}`, {
        scroll: false,
      })
    }

    isMounted.current = true
  }, [selectedIngredients, selectedTypes, selectedSizes, prices])
}
