import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'

interface ISearchQuery {
  types: string
  sizes: string
  ingredients: string
  priceFrom: number
  priceTo: number
}

export interface IFilters {
  selectedTypes: Set<string>
  selectedSizes: Set<string>
  selectedIngredients: Set<string>
  prices: Pick<ISearchQuery, 'priceFrom' | 'priceTo'>
}

interface IReturnData extends IFilters {
  toggleTypes: (id: string) => void
  toggleSizes: (id: string) => void
  toggleIngredients: (id: string) => void
  setPrices: (prices: Pick<ISearchQuery, 'priceFrom' | 'priceTo'>) => void
  updatePrice: (price: number[]) => void
}

export const useFilters = (): IReturnData => {
  const searchParams = useSearchParams() as unknown as Map<keyof ISearchQuery, string>

  const [selectedTypes, { toggle: toggleTypes }] = useSet<string>(
    new Set(searchParams.get('types')?.split(',') || []),
  )
  const [selectedSizes, { toggle: toggleSizes }] = useSet<string>(
    new Set(searchParams.get('sizes')?.split(',') || []),
  )
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet<string>(
    new Set(searchParams.get('ingredients')?.split(',') || []),
  )
  const [prices, setPrices] = useState<Pick<ISearchQuery, 'priceFrom' | 'priceTo'>>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  })

  const updatePrice = (price: number[]) => {
    setPrices({ priceFrom: price[0], priceTo: price[1] })
  }

  return useMemo(
    () => ({
      selectedTypes,
      toggleTypes,
      selectedSizes,
      toggleSizes,
      selectedIngredients,
      toggleIngredients,
      prices,
      setPrices,
      updatePrice,
    }),
    [selectedTypes, selectedSizes, selectedIngredients, prices],
  )
}
