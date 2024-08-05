'use client'
import React, { useEffect } from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input, RangeSlider } from '../ui'
import { FilterCheckboxGroup } from './filter-checkbox-group'
import { useFilterIndgredients } from '@/hooks/useFilterIngredients'
import { useSet } from 'react-use'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { ingredients } from '@/prisma/constants'

interface ISearchQuery {
  types: string
  sizes: string
  ingredients: string
  priceFrom: number
  priceTo: number
}

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter()
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
  const [prices, setPrices] = React.useState<Pick<ISearchQuery, 'priceFrom' | 'priceTo'>>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  })

  const updatePrice = (price: number[]) => {
    setPrices({ priceFrom: price[0], priceTo: price[1] })
  }

  const { items: filterIngredients, loading } = useFilterIndgredients()
  const items = filterIngredients.map(({ name, id }) => ({ text: name, value: String(id) }))

  useEffect(() => {
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
  }, [selectedIngredients, selectedTypes, selectedSizes, prices])

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      {/* Чекбоксы типов */}

      <FilterCheckboxGroup
        title='Тип теста:'
        name='types'
        onChange={toggleTypes}
        selected={selectedTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      {/* Чекбоксы размеров */}

      <FilterCheckboxGroup
        title='Размеры:'
        name='sizes'
        onChange={toggleSizes}
        selected={selectedSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Слайдеры */}
      <div className='mt-5 border-y border-y-neutral-100 pt-6 pb-7'>
        <p className='font-bold mt-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            step={10}
            value={prices.priceFrom}
            onChange={(e) => setPrices({ ...prices, priceFrom: Number(e.target.value) })}
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            step={10}
            value={prices.priceTo}
            onChange={(e) => setPrices({ ...prices, priceTo: Number(e.target.value) })}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={updatePrice}
        />
      </div>

      {/* Фильтры индигриентов */}

      <FilterCheckboxGroup
        title='Ингредиенты:'
        className='mt-5'
        name='ingredients'
        limit={6}
        loading={loading}
        onChange={toggleIngredients}
        selected={selectedIngredients}
        items={items}
      />
    </div>
  )
}
