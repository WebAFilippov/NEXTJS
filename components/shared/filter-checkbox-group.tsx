'use client'
import React, { useState } from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input, Skeleton } from '../ui'

interface Props {
  title: string
  titleList: string
  items: FilterChecboxProps[]
  limit?: number
  searchInputValue?: string
  onChange?: (id: string) => void
  selected: Set<string>
  loading?: boolean
  className?: string
}

export const FilterCheckboxGroup: React.FC<Props> = ({
  title,
  titleList,
  items,
  limit = 5,
  searchInputValue = 'Поиск...',
  onChange,
  selected,
  loading,
  className,
}) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const list = showAll
    ? items.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )
    : items.slice(0, limit)

  const onChangeSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold my-3'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />)}

        <Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
      </div>
    )
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
            value={item.value}
            name={item.name}
            titleList={titleList}
            key={index}
            endAdornment={item.endAdornment}
            checked={selected.has(item.value)}
            onCheckedChange={() => onChange?.(item.value)}
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
