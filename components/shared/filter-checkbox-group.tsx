'use client'
import React, { useState } from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'

interface Props {
  title: string
  items: FilterChecboxProps[]
  defaultItems: FilterChecboxProps[]
  limit?: number
  searchInputValue?: string
  defaultValue?: string[]
  onChange?: (checked: string[]) => void
  className?: string
}

export const FilterCheckboxGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  defaultValue,
  limit = 5,
  searchInputValue = 'Поиск...',
  onChange,
  className,
}) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const list = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )
    : defaultItems.slice(0, limit)

  const onChangeSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={className}>
      <p className='font-bold my-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            placeholder={searchInputValue}
            className='bg-gray-50 border-none'
            onChange={onChangeSearchInputValue}
          />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 overflow-auto scrollbar'>
        {list.map((item, index) => (
          <FilterCheckbox
            text={item.text}
            value={item.value}
            name={item.name}
            checked={item.checked}
            key={index}
            endAdornment={item.endAdornment}
            onCheckedChange={(id) => console.log(id)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button className='text-primary mt-3' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
