'use client'
import React from 'react'
import { Title } from './title'
import { Input, RangeSlider } from '../ui'
import { FilterCheckboxGroup } from './filter-checkbox-group'
import { useFilterIndgredients } from '@/shared/hooks/use-filter-ingredients'
import { useCheckboxFilter, useRangeFilter } from '@/shared/hooks'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  // api/ingredients - список ингредиентов
  const { items: filterIngredients, loading } = useFilterIndgredients()
  const items = filterIngredients.map(({ name, id }) => ({ name, value: String(id) }))

  const { querySet: selectedTypes, toggle: toggleTypes } = useCheckboxFilter('types')
  const { querySet: selectedSizes, toggle: toggleSizes } = useCheckboxFilter('sizes')
  const { querySet: selectedIngredients, toggle: toggleIngredients } =
    useCheckboxFilter('ingredients')
  const { range, setRange } = useRangeFilter()

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      {/* Чекбоксы типов */}
      <FilterCheckboxGroup
        title='Тип теста:'
        titleList='types'
        onChange={toggleTypes}
        selected={selectedTypes}
        items={[
          { name: 'Тонкое', value: '1' },
          { name: 'Традиционное', value: '2' },
        ]}
      />

      {/* Чекбоксы размеров */}
      <FilterCheckboxGroup
        title='Размеры:'
        titleList='sizes'
        onChange={toggleSizes}
        selected={selectedSizes}
        items={[
          { name: '20 см', value: '20' },
          { name: '30 см', value: '30' },
          { name: '40 см', value: '40' },
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
            value={range.priceFrom}
            onChange={(e) => setRange({ ...range, priceFrom: Number(e.target.value) })}
          />
          <Input
            type='number'
            placeholder='1000'
            min={0}
            max={1000}
            step={10}
            value={range.priceTo}
            onChange={(e) => setRange({ ...range, priceTo: Number(e.target.value) })}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[range.priceFrom, range.priceTo]}
          onValueChange={(price: number[]) => {
            setRange({ priceFrom: price[0], priceTo: price[1] })
          }}
        />
      </div>

      {/* Фильтры индигриентов */}

      <FilterCheckboxGroup
        title='Ингредиенты:'
        className='mt-5'
        titleList='ingredients'
        limit={6}
        loading={loading}
        onChange={toggleIngredients}
        selected={selectedIngredients}
        items={items}
      />
    </div>
  )
}
