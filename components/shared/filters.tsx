'use client'
import React from 'react'
import { Title } from './title'
import { Input, RangeSlider } from '../ui'
import { FilterCheckboxGroup } from './filter-checkbox-group'
import { useFilterIndgredients } from '@/hooks/use-filter-ingredients'
import { useFilters, useQueryFilters } from '@/hooks'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { items: filterIngredients, loading } = useFilterIndgredients()
  const items = filterIngredients.map(({ name, id }) => ({ text: name, value: String(id) }))

  const filters = useFilters()
  useQueryFilters(filters)

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      {/* Чекбоксы типов */}

      <FilterCheckboxGroup
        title='Тип теста:'
        name='types'
        onChange={filters.toggleTypes}
        selected={filters.selectedTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      {/* Чекбоксы размеров */}

      <FilterCheckboxGroup
        title='Размеры:'
        name='sizes'
        onChange={filters.toggleSizes}
        selected={filters.selectedSizes}
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
            value={filters.prices.priceFrom}
            onChange={(e) =>
              filters.setPrices({ ...filters.prices, priceFrom: Number(e.target.value) })
            }
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            step={10}
            value={filters.prices.priceTo}
            onChange={(e) =>
              filters.setPrices({ ...filters.prices, priceTo: Number(e.target.value) })
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom, filters.prices.priceTo]}
          onValueChange={filters.updatePrice}
        />
      </div>

      {/* Фильтры индигриентов */}

      <FilterCheckboxGroup
        title='Ингредиенты:'
        className='mt-5'
        name='ingredients'
        limit={6}
        loading={loading}
        onChange={filters.toggleIngredients}
        selected={filters.selectedIngredients}
        items={items}
      />
    </div>
  )
}
