import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input, RangeSlider } from '../ui'
import { FilterCheckboxGroup } from './filter-checkbox-group'
import axios from 'axios'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='font-bold mb-5' />

      {/* Чекбоксы */}
      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можно собирать' value='1' />
        <FilterCheckbox text='Новинки' value='2' />
      </div>

      {/* Слайдеры */}
      <div className='mt-5 border-y border-y-neutral-100 pt-6 pb-7'>
        <p className='font-bold mt-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
          <Input type='number' placeholder='1000' min={100} max={1000} />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      {/* Фильтры индигриентов */}

      <div>
        <FilterCheckboxGroup
          title='Ингредиенты:'
          className='mt-5'
          items={[
            {
              text: 'Сырный соус',
              value: '11',
            },
            {
              text: 'выфв соус',
              value: '22',
            },
            {
              text: 'Свфывфый соус',
              value: '3',
            },
            {
              text: 'Сырныфывфывй соус',
              value: '4',
            },
            {
              text: 'Сырфывфывный соус',
              value: '5',
            },
            {
              text: 'Сырвфывный соус',
              value: '11',
            },
            {
              text: 'Сырнвфывфыый соус',
              value: '22',
            },
            {
              text: 'Сыр12314ный соус',
              value: '3',
            },
          ]}
          defaultItems={[
            {
              text: 'Сырный соус',
              value: '11',
            },
            {
              text: 'Сырный соус',
              value: '22',
            },
          ]}
          limit={6}
        />
      </div>
    </div>
  )
}
