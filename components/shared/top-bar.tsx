'use client'
import React from 'react'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { cn } from '@/shared/lib/utils'
import { Category } from '@prisma/client'
import { useCategoryStore } from '@/shared/store/category'
import { Title } from './title'
import { Container } from './container'

interface Props {
  categories: Category[]
  className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const { activeId } = useCategoryStore()

  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className='flex items-center justify-between'>
        <Title
          text={categories[activeId - 1].name}
          size='lg'
          className='font-extrabold mb-3 w-[200px]'
        />
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
