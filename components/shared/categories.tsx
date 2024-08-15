'use client'
import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
  categories: Category[]
  className?: string
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const activeId = useCategoryStore((state) => state.activeId)

  return (
    <>
      <div className='inline-flex rounded-2xl gap-1 bg-gray-50 p-1'>
        {categories.map(({ id, name }) => (
          <a
            key={id}
            className={cn(
              'h-11 flex items-center px-4 font-bold rounded-2xl',
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
