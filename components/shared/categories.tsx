'use client'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import React from 'react'

const categories = [
  {
    id: 1,
    name: 'Завтрак',
  },
  {
    id: 2,
    name: 'Пиццы',
  },
  {
    id: 3,
    name: 'Закуски',
  },
  {
    id: 4,
    name: 'Коктейли',
  },
  {
    id: 5,
    name: 'Кофе',
  },
  {
    id: 6,
    name: 'Напитки',
  },
  {
    id: 7,
    name: 'Десерты',
  },
  {
    id: 8,
    name: 'Соусы',
  },
]

interface Props {
  className?: string
}

export const Categories: React.FC<Props> = ({ className }) => {
  const activeId = useCategoryStore((state) => state.activeId)

  return (
    <>
      <div className='inline-flex rounded-2xl gap-1 bg-gray-50 p-1'>
        {categories.map(({ id, name }, index) => (
          <a
            key={index}
            className={cn(
              'h-11 flex items-center px-5 font-bold rounded-2xl',
              activeId === id && 'text-primary bg-white shadow-md shadow-gray-200',
              className,
            )}
            href={`/#${name}`}
          >
            <button>{name}</button>
          </a>
        ))}
      </div>
    </>
  )
}
